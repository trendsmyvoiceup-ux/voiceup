/**
 * Reviewer agent — deterministic Battle Package review, no AI.
 *
 * Reads an existing Battle Package and writes `review.json` inside it,
 * and updates its own `reviewer` key in `status.json`. Every check is a
 * fixed rule (see `agents/reviewer/CHECKLIST.md`) — same package always
 * produces the same review.
 */

const fs = require("fs");
const path = require("path");
const {
  tryReadJSON,
  tryReadText,
  fileExists,
  isNonEmptyString,
  writeJSON,
  updateStatusKey,
} = require("./fsutil.ts");

const REQUIRED_FILES = [
  "manifest.json",
  "battle.json",
  "status.json",
  "script.txt",
  "caption.txt",
  "hashtags.txt",
  "image_prompt.txt",
  "video_prompt.txt",
];

const REVIEW_APPROVAL_THRESHOLD = 90;

function checkCompleteness(battleDir: string): boolean {
  return REQUIRED_FILES.every((f) => fileExists(path.join(battleDir, f)));
}

function checkJsonFiles(battleDir: string): boolean {
  return ["manifest.json", "battle.json", "status.json"].every(
    (f) => tryReadJSON(path.join(battleDir, f)) !== null
  );
}

function checkDuplicates(battleDir: string): boolean {
  const manifest = tryReadJSON(path.join(battleDir, "manifest.json")) as
    | { files?: unknown }
    | null;
  if (!manifest || !Array.isArray(manifest.files)) return false;
  const files = manifest.files as unknown[];
  return new Set(files).size === files.length;
}

function checkMetadata(battle: Record<string, unknown> | null): boolean {
  if (!battle) return false;
  const subjectA = battle.subjectA as Record<string, unknown> | undefined;
  const subjectB = battle.subjectB as Record<string, unknown> | undefined;
  return (
    isNonEmptyString(battle.id) &&
    isNonEmptyString(battle.category) &&
    isNonEmptyString(battle.visualTheme) &&
    !!subjectA &&
    isNonEmptyString(subjectA.name) &&
    isNonEmptyString(subjectA.mediaLabel) &&
    isNonEmptyString(subjectA.mediaHint) &&
    !!subjectB &&
    isNonEmptyString(subjectB.name) &&
    isNonEmptyString(subjectB.mediaLabel) &&
    isNonEmptyString(subjectB.mediaHint)
  );
}

function checkSlug(battle: Record<string, unknown> | null): boolean {
  if (!battle || !isNonEmptyString(battle.id)) return false;
  return /^[a-z0-9]+(-[a-z0-9]+)*-vs-[a-z0-9]+(-[a-z0-9]+)*$/.test(battle.id as string);
}

function checkTitle(battle: Record<string, unknown> | null): boolean {
  if (!checkMetadata(battle)) return false;
  const subjectA = battle!.subjectA as Record<string, unknown>;
  const subjectB = battle!.subjectB as Record<string, unknown>;
  const title = `${subjectA.name} vs ${subjectB.name}`;
  return title.length >= 3 && title.length <= 80;
}

function checkCaption(battleDir: string): boolean {
  const caption = tryReadText(path.join(battleDir, "caption.txt"));
  if (caption === null) return false;
  const trimmed = caption.trim();
  return trimmed.length >= 10 && trimmed.length <= 300;
}

function checkHashtags(battleDir: string): boolean {
  const raw = tryReadText(path.join(battleDir, "hashtags.txt"));
  if (raw === null) return false;
  const lines = raw.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  return lines.length >= 5 && lines.length <= 10 && lines.every((l) => l.startsWith("#"));
}

function checkPrompts(battleDir: string): boolean {
  const image = tryReadText(path.join(battleDir, "image_prompt.txt"));
  const video = tryReadText(path.join(battleDir, "video_prompt.txt"));
  return !!image && image.trim().length > 10 && !!video && video.trim().length > 10;
}

type Checks = {
  completeness: boolean;
  jsonFiles: boolean;
  duplicates: boolean;
  metadata: boolean;
  slug: boolean;
  title: boolean;
  caption: boolean;
  hashtags: boolean;
  prompts: boolean;
};

// ── Signal quality checks (advisory — do not affect `overall` score) ──────────
// These check whether the battle is well-suited for the Signal Motivation Layer.
// Output as recommendations only; existing packages are unaffected.

function checkClarity(battle: Record<string, unknown> | null): { pass: boolean; note: string } {
  if (!battle) return { pass: false, note: "battle.json missing" };
  const a = (battle.subjectA as Record<string, unknown>)?.name as string | undefined;
  const b = (battle.subjectB as Record<string, unknown>)?.name as string | undefined;
  if (!a || !b) return { pass: false, note: "Subject names missing" };
  if (a.toLowerCase() === b.toLowerCase()) return { pass: false, note: "Subject names are identical" };
  if (a.length < 2 || b.length < 2) return { pass: false, note: "Subject name too short to be recognisable" };
  return { pass: true, note: "Subjects are distinct and recognisable" };
}

function checkCuriosity(captionText: string | null): { pass: boolean; note: string } {
  if (!captionText) return { pass: false, note: "No caption" };
  const lower = captionText.toLowerCase().trim();
  const curiosityMarkers = ["or", " vs ", " vs.", "which", "better", "prefer", "?", "pick"];
  const hasCuriosity = curiosityMarkers.some((m) => lower.includes(m));
  return hasCuriosity
    ? { pass: true, note: "Caption contains curiosity-evoking language" }
    : { pass: false, note: "Caption does not clearly frame a binary choice — add 'or', 'which', or a question mark" };
}

function checkNeutrality(
  captionText: string | null,
  battle: Record<string, unknown> | null
): { pass: boolean; note: string } {
  if (!captionText || !battle) return { pass: false, note: "No caption or battle data" };
  const lower = captionText.toLowerCase().trim();
  const subjectA = ((battle.subjectA as Record<string, unknown>)?.name as string ?? "").toLowerCase();
  if (lower.startsWith(subjectA)) {
    return { pass: false, note: `Caption opens with Subject A name ("${subjectA}") — may prime the reader toward A` };
  }
  return { pass: true, note: "Caption opening is neutral with respect to both subjects" };
}

function checkNoManipulation(captionText: string | null): { pass: boolean; note: string } {
  if (!captionText) return { pass: false, note: "No caption" };
  const lower = captionText.toLowerCase();
  const manipulators = ["obviously", "clearly", "everyone knows", "of course", "undeniably", "no contest", "winner"];
  const found = manipulators.find((m) => lower.includes(m));
  return found
    ? { pass: false, note: `Caption contains leading language: "${found}" — remove to preserve signal integrity` }
    : { pass: true, note: "No leading or manipulative language detected" };
}

function checkWordingQuality(captionText: string | null): { pass: boolean; note: string } {
  if (!captionText) return { pass: false, note: "No caption" };
  const trimmed = captionText.trim();
  if (trimmed.length < 20) return { pass: false, note: "Caption is very short — may not provide enough context for voting" };
  if (trimmed.length > 280) return { pass: false, note: "Caption exceeds 280 chars — may be truncated on social platforms" };
  return { pass: true, note: `Caption length (${trimmed.length} chars) is within optimal range` };
}

type SignalQualityChecks = {
  clarity:         { pass: boolean; note: string };
  curiosity:       { pass: boolean; note: string };
  neutrality:      { pass: boolean; note: string };
  noManipulation:  { pass: boolean; note: string };
  wordingQuality:  { pass: boolean; note: string };
};

type SignalQuality = {
  score: number;        // 0–100 advisory score; does not affect `overall`
  checks: SignalQualityChecks;
  recommendations: string[];
};

type Review = {
  overall: number;
  approved: boolean;
  checks: Checks;
  signalQuality: SignalQuality;
  reviewedAt: string;
};

/**
 * Reviews the Battle Package at battleDir, writes review.json inside it,
 * and updates its own `reviewer` key in status.json (status is "approved"
 * or "rejected"). Throws only if battleDir itself does not exist (nowhere
 * to write).
 */
function runReviewer(battleDir: string): Review {
  if (!fs.existsSync(battleDir)) {
    throw new Error(`Battle Package missing: ${battleDir}`);
  }

  const battle = tryReadJSON(path.join(battleDir, "battle.json")) as Record<
    string,
    unknown
  > | null;

  const checks: Checks = {
    completeness: checkCompleteness(battleDir),
    jsonFiles: checkJsonFiles(battleDir),
    duplicates: checkDuplicates(battleDir),
    metadata: checkMetadata(battle),
    slug: checkSlug(battle),
    title: checkTitle(battle),
    caption: checkCaption(battleDir),
    hashtags: checkHashtags(battleDir),
    prompts: checkPrompts(battleDir),
  };

  const values = Object.values(checks);
  const overall = Math.round((values.filter(Boolean).length / values.length) * 100);
  const approved = overall >= REVIEW_APPROVAL_THRESHOLD;

  // Signal quality checks — advisory only, do not affect `overall` or `approved`
  const captionText = tryReadText(path.join(battleDir, "caption.txt")) as string | null;
  const sqChecks: SignalQualityChecks = {
    clarity:        checkClarity(battle),
    curiosity:      checkCuriosity(captionText),
    neutrality:     checkNeutrality(captionText, battle),
    noManipulation: checkNoManipulation(captionText),
    wordingQuality: checkWordingQuality(captionText),
  };
  const sqValues = Object.values(sqChecks);
  const sqScore  = Math.round((sqValues.filter((v) => v.pass).length / sqValues.length) * 100);
  const sqRecs   = sqValues.filter((v) => !v.pass).map((v) => v.note);

  const signalQuality: SignalQuality = {
    score: sqScore,
    checks: sqChecks,
    recommendations: sqRecs,
  };

  const review: Review = {
    overall,
    approved,
    checks,
    signalQuality,
    reviewedAt: new Date().toISOString(),
  };

  writeJSON(path.join(battleDir, "review.json"), review);

  // Reviewer reports its own outcome via status.json, same as every other
  // consumer — but only ever its own "reviewer" key (see fsutil.updateStatusKey).
  if (fileExists(path.join(battleDir, "status.json"))) {
    updateStatusKey(battleDir, "reviewer", approved ? "approved" : "rejected");
  }

  return review;
}

module.exports = { runReviewer, REVIEW_APPROVAL_THRESHOLD };
