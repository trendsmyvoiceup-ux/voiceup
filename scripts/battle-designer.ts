/**
 * Battle Designer agent — first real (non-stub) implementation.
 *
 * Deterministic only: no LLM, no randomness. Given a proposal from
 * `output/proposals/<slug>.json`, it generates a complete Battle Package
 * (`output/battles/<slug>/`) using fixed templates — same input always
 * produces the same output.
 */

const fs = require("fs");
const path = require("path");

type Proposal = {
  subjectA: string;
  subjectB: string;
  category: string;
  title: string;
  rationale: string;
};

const CATEGORY_THEME: Record<string, string> = {
  Technology: "tech",
  Lifestyle: "lifestyle",
  Entertainment: "entertainment",
  "Pop Culture": "entertainment",
  Food: "food",
};

function themeFor(category: string): string {
  return CATEGORY_THEME[category] ?? "tech";
}

function cleanTag(s: string): string {
  return s.replace(/[^a-zA-Z0-9]/g, "");
}

function buildScript(subjectA: string, subjectB: string, category: string): string {
  return [
    "[Hook]",
    `${subjectA} or ${subjectB}. Pick one.`,
    "",
    "[Setup]",
    `Two sides of ${category.toLowerCase()}. Only one wins your vote.`,
    "",
    "[CTA]",
    "Tap the link, pick your side, see where the community lands.",
    "This is a community signal — not a scientific poll.",
  ].join("\n");
}

function buildCaption(subjectA: string, subjectB: string): string {
  return `${subjectA} vs ${subjectB} — which side are you actually on? Tap to vote and see the community signal so far. 👀`;
}

function buildHashtags(subjectA: string, subjectB: string, category: string): string[] {
  return [
    `#${cleanTag(subjectA)}Vs${cleanTag(subjectB)}`,
    `#Team${cleanTag(subjectA)}`,
    `#Team${cleanTag(subjectB)}`,
    `#${cleanTag(category)}`,
    "#PickASide",
    "#OpinionPlatform",
  ];
}

function buildImagePrompt(subjectA: string, subjectB: string, category: string): string {
  return (
    `Split-screen abstract composition, left half cool indigo gradient tones ` +
    `representing ${subjectA}, right half warm rose gradient tones representing ` +
    `${subjectB}, a glowing circular "VS" badge centered on the seam between them, ` +
    `minimal premium mobile-app aesthetic, no real logos or brand marks, no ` +
    `readable text other than the VS badge, high contrast, dark background, ` +
    `vertical 9:16 aspect ratio suitable for a TikTok cover frame. Category: ${category}.`
  );
}

function buildVideoPrompt(subjectA: string, subjectB: string): string {
  return [
    "NOTE: Video generation is out of scope for this version. This file is a",
    "placeholder for the future video generation step.",
    "",
    "Intended prompt (not yet executed): A 6-10 second vertical video opening",
    `on the split-screen VS composition for ${subjectA} vs ${subjectB}, with the`,
    "two sides subtly pulsing, ending on a clear call-to-action frame directing",
    "the viewer to tap the link and vote. No real brand logos or copyrighted",
    "footage.",
  ].join("\n");
}

function writeText(filePath: string, content: string) {
  fs.writeFileSync(filePath, content.endsWith("\n") ? content : content + "\n");
}

function writeJSON(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

/**
 * Reads output/proposals/<slug>.json and writes a complete Battle Package
 * to output/battles/<slug>/. Returns the battle directory path.
 */
function runBattleDesigner(slug: string, proposalPath: string, battlesDir: string): string {
  if (!fs.existsSync(proposalPath)) {
    throw new Error(`Proposal missing: ${proposalPath}`);
  }
  const proposal: Proposal = JSON.parse(fs.readFileSync(proposalPath, "utf-8"));
  const { subjectA, subjectB, category } = proposal;
  const visualTheme = themeFor(category);

  const battleDir = path.join(battlesDir, slug);
  if (!fs.existsSync(battleDir)) {
    fs.mkdirSync(battleDir, { recursive: true });
  }

  const files = [
    "manifest.json",
    "battle.json",
    "status.json",
    "script.txt",
    "caption.txt",
    "hashtags.txt",
    "image_prompt.txt",
    "video_prompt.txt",
  ];

  writeJSON(path.join(battleDir, "manifest.json"), {
    slug,
    schemaVersion: 1,
    createdFrom: path.relative(path.join(battlesDir, ".."), proposalPath),
    files,
  });

  writeJSON(path.join(battleDir, "battle.json"), {
    id: slug,
    subjectA: { name: subjectA, mediaLabel: subjectA, mediaHint: category },
    subjectB: { name: subjectB, mediaLabel: subjectB, mediaHint: category },
    category,
    visualTheme,
  });

  writeJSON(path.join(battleDir, "status.json"), {
    website: { status: "pending", updatedAt: null },
    publisher: { status: "pending", updatedAt: null },
  });

  writeText(path.join(battleDir, "script.txt"), buildScript(subjectA, subjectB, category));
  writeText(path.join(battleDir, "caption.txt"), buildCaption(subjectA, subjectB));
  writeText(
    path.join(battleDir, "hashtags.txt"),
    buildHashtags(subjectA, subjectB, category).join("\n")
  );
  writeText(
    path.join(battleDir, "image_prompt.txt"),
    buildImagePrompt(subjectA, subjectB, category)
  );
  writeText(path.join(battleDir, "video_prompt.txt"), buildVideoPrompt(subjectA, subjectB));

  return battleDir;
}

module.exports = { runBattleDesigner, buildScript, buildCaption, buildHashtags, buildImagePrompt, buildVideoPrompt, themeFor };
