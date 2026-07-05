/**
 * LLMProvider abstraction layer.
 *
 * The Planner depends only on this interface — never on a concrete provider.
 * Planner mode is controlled by the PLANNER_MODE environment variable:
 *   deterministic   — no LLM, same output every time (default)
 *   local-llm       — Ollama running at OLLAMA_URL
 *   future-cloud    — stub; will throw until implemented
 */

export type PlannerMode = "deterministic" | "local-llm" | "future-cloud";

export type ProposalItem = {
  subjectA: string;
  subjectB: string;
  category: string;
};

export type GenerateOptions = {
  /** Max ms to wait for a single attempt. Provider default used if omitted. */
  timeoutMs?: number;
  /** Total attempts before giving up. Provider default used if omitted. */
  retries?: number;
};

export interface LLMProvider {
  readonly name: string;

  /**
   * Given a category and its subjects, generate all intended battle proposal
   * pairs. Output is validated before returning — throws on schema failure,
   * timeout, or exhausted retries.
   */
  generateProposals(
    category: string,
    subjects: string[],
    options?: GenerateOptions
  ): Promise<ProposalItem[]>;
}

/**
 * Returns the LLMProvider for the given mode, or null for "deterministic"
 * (the Planner handles that path itself without a provider).
 */
function createProvider(mode: PlannerMode): LLMProvider | null {
  if (mode === "deterministic") return null;

  if (mode === "local-llm") {
    const { OllamaProvider } = require("./ollama.ts");
    return new OllamaProvider();
  }

  if (mode === "future-cloud") {
    throw new Error(
      'PlannerMode "future-cloud" is not yet implemented. ' +
        "Set PLANNER_MODE=deterministic or PLANNER_MODE=local-llm."
    );
  }

  throw new Error(
    `Unknown PLANNER_MODE: "${mode}". Valid values: deterministic, local-llm, future-cloud`
  );
}

module.exports = { createProvider };
