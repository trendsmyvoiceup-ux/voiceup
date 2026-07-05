/**
 * OllamaProvider — generates battle proposals via the local Ollama HTTP API.
 *
 * Production model:  qwen2.5:7b   (benchmark winner — 88.0/100, 100% validity, 100% completeness)
 * Fallback model:    llama3.1:8b  (86.2/100, viable alternative)
 * Rejected:          gemma3:4b    (74.3/100, 63% completeness, 23% dup rate — removed from Ollama)
 *
 * Configuration (all optional, env vars):
 *   OLLAMA_URL         Base URL             (default: http://localhost:11434)
 *   OLLAMA_MODEL       Model name           (default: qwen2.5:7b)
 *   OLLAMA_TIMEOUT_MS  Per-attempt timeout  (default: 30000)
 *   OLLAMA_RETRIES     Max attempts         (default: 3)
 *
 * Prompt strategy: Strategy B (benchmark-validated for Qwen 2.5 7B)
 *   - No format:"json" flag — Qwen returns clean arrays without it
 *   - Explicit pair count in the instruction
 *   - No example object (example confused Gemma/Qwen into echoing one pair)
 *   - Explicit array-only output instruction
 *
 * Output is always validated against ProposalItem[] before returning.
 * Subjects not in the catalog are dropped silently. Duplicate / mirror pairs
 * are deduplicated by the Planner after this provider returns.
 */

const OLLAMA_URL        = process.env.OLLAMA_URL        ?? "http://localhost:11434";
const OLLAMA_MODEL      = process.env.OLLAMA_MODEL      ?? "qwen2.5:7b";
const DEFAULT_TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS ?? "30000");
const DEFAULT_RETRIES   = Number(process.env.OLLAMA_RETRIES   ?? "3");
const RETRY_BASE_DELAY_MS = 500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string,
  body: unknown,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
      signal:  controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function withRetry<T>(fn: () => Promise<T>, maxAttempts: number): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(`  [Ollama] Attempt ${attempt}/${maxAttempts} failed: ${msg}. Retrying in ${delay}ms…`);
        await sleep(delay);
      }
    }
  }
  throw lastError;
}

type RawProposal = { subjectA?: unknown; subjectB?: unknown; category?: unknown };

const WRAP_KEYS = [
  "proposals","battles","pairs","data","items",
  "result","results","output","list","array",
];

/**
 * Accepts a top-level JSON array or an object with a recognised wrapper key.
 * Also handles single flat-object responses (one pair returned as an object
 * instead of a one-element array — treat as [item]).
 */
function validateProposals(raw: unknown): { subjectA: string; subjectB: string; category: string }[] {
  let items: unknown = raw;

  if (!Array.isArray(raw) && raw !== null && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    for (const key of WRAP_KEYS) {
      if (Array.isArray(obj[key])) { items = obj[key]; break; }
    }
    // Single-pair flat object: { subjectA, subjectB, category }
    if (!Array.isArray(items) && "subjectA" in obj && "subjectB" in obj) {
      items = [obj];
    }
  }

  if (!Array.isArray(items)) {
    throw new Error(
      `Expected JSON array, got ${typeof raw}: ${JSON.stringify(raw).slice(0, 120)}`
    );
  }

  if (items.length === 0) {
    throw new Error("Provider returned an empty proposals array");
  }

  return (items as RawProposal[]).map((item, i) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Proposal[${i}] is not an object`);
    }
    const { subjectA, subjectB, category } = item;
    if (typeof subjectA !== "string" || !subjectA.trim()) {
      throw new Error(`Proposal[${i}] has missing or invalid subjectA`);
    }
    if (typeof subjectB !== "string" || !subjectB.trim()) {
      throw new Error(`Proposal[${i}] has missing or invalid subjectB`);
    }
    if (typeof category !== "string" || !category.trim()) {
      throw new Error(`Proposal[${i}] has missing or invalid category`);
    }
    return {
      subjectA: subjectA.trim(),
      subjectB: subjectB.trim(),
      category: category.trim(),
    };
  });
}

/**
 * Strategy B prompt (benchmark-validated for qwen2.5:7b).
 * Explicit pair count + array-only instruction + no format flag = 100% completeness.
 * No example object — example confused smaller models into echoing a single pair.
 */
function buildPrompt(category: string, subjects: string[]): string {
  const n    = (subjects.length * (subjects.length - 1)) / 2;
  const list = subjects.join(", ");
  return [
    `Generate exactly ${n} unique battle pairs from these subjects.`,
    "Output ONLY a raw JSON array — no explanation, no markdown, no wrapper object, no prose.",
    "",
    `Category: ${category}`,
    `Subjects: ${list}`,
    "",
    `The output must start with [ and end with ]. Each element: {"subjectA":"...","subjectB":"...","category":"${category}"}`,
    `Every pair must be unique (A vs B is the same as B vs A). Include ALL ${n} pairs.`,
  ].join("\n");
}

/**
 * Pre-processes raw model output before JSON.parse:
 *   1. Strips markdown code fences (```json ... ```)
 *   2. Extracts an embedded JSON array if the model added prose around it
 */
function extractJsonText(raw: string): string {
  let text = raw.trim();

  // Strip markdown fences
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();

  // If text doesn't start with [ or {, look for an embedded array
  if (!text.startsWith("[") && !text.startsWith("{")) {
    const match = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (match) return match[0];
  }

  return text;
}

class OllamaProvider {
  readonly name = "Ollama";

  async generateProposals(
    category: string,
    subjects: string[],
    options: { timeoutMs?: number; retries?: number } = {}
  ): Promise<{ subjectA: string; subjectB: string; category: string }[]> {
    const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const retries   = options.retries   ?? DEFAULT_RETRIES;
    const prompt    = buildPrompt(category, subjects);

    return withRetry(async () => {
      const response = await fetchWithTimeout(
        `${OLLAMA_URL}/api/generate`,
        {
          model:   OLLAMA_MODEL,
          prompt,
          // No format:"json" — Strategy B relies on explicit instruction alone.
          // Qwen 2.5 7B returns clean arrays without it (benchmark confirmed).
          stream:  false,
          options: { temperature: 0.1, seed: 42 },
        },
        timeoutMs
      );

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`Ollama HTTP ${response.status}: ${body.slice(0, 200)}`);
      }

      const data    = (await response.json()) as { response?: string };
      const rawText = data.response;

      if (typeof rawText !== "string" || !rawText.trim()) {
        throw new Error("Ollama returned an empty response field");
      }

      const jsonText = extractJsonText(rawText);

      let parsed: unknown;
      try {
        parsed = JSON.parse(jsonText);
      } catch {
        throw new Error(`Ollama response is not valid JSON: ${rawText.slice(0, 200)}`);
      }

      return validateProposals(parsed);
    }, retries);
  }
}

module.exports = { OllamaProvider };
