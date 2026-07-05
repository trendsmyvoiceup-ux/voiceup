/**
 * OpenAIProvider — OpenAI API (future implementation).
 *
 * Set PLANNER_MODE=future-cloud once this provider is wired up.
 * Currently a stub that throws on any call.
 */

class OpenAIProvider {
  readonly name = "OpenAI";

  generateProposals(
    _category: string,
    _subjects: string[],
    _options?: unknown
  ): Promise<never> {
    return Promise.reject(
      new Error(
        "OpenAIProvider is not yet implemented. " +
          "Set PLANNER_MODE=deterministic or PLANNER_MODE=local-llm."
      )
    );
  }
}

module.exports = { OpenAIProvider };
