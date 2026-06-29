/**
 * Small shared filesystem/string helpers used by every Content Factory
 * script. Pulled out to remove duplicated readJSON/writeJSON/slugify
 * implementations across planner.ts, battle-designer.ts, reviewer.ts,
 * publisher.ts, and run-pipeline.ts. Deliberately minimal — this is a
 * utility module, not a framework.
 */

const fs = require("fs");
const path = require("path");

function readJSON(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function tryReadJSON(filePath: string): unknown | null {
  try {
    return readJSON(filePath);
  } catch {
    return null;
  }
}

function readText(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

function tryReadText(filePath: string): string | null {
  try {
    return readText(filePath);
  } catch {
    return null;
  }
}

function writeJSON(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

function writeText(filePath: string, content: string) {
  fs.writeFileSync(filePath, content.endsWith("\n") ? content : content + "\n");
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

/**
 * Updates only the caller's own key in a Battle Package's status.json —
 * never touches any other consumer's key. Shared by every agent that
 * needs to report its own status (Reviewer, Website, Publisher, and any
 * future consumer).
 */
function updateStatusKey(battleDir: string, agentName: string, status: string) {
  const statusPath = path.join(battleDir, "status.json");
  const current = readJSON(statusPath) as Record<string, unknown>;
  current[agentName] = { status, updatedAt: new Date().toISOString() };
  writeJSON(statusPath, current);
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function isNonEmptyString(v: unknown): boolean {
  return typeof v === "string" && v.trim().length > 0;
}

module.exports = {
  readJSON,
  tryReadJSON,
  readText,
  tryReadText,
  writeJSON,
  writeText,
  ensureDir,
  fileExists,
  slugify,
  isNonEmptyString,
  updateStatusKey,
};
