# Shared Agent Contract

This folder defines how Content Factory agents exchange data with each
other. It is not itself an executable agent — it's the shared contract every
agent's `INPUT_SPEC.md` / `OUTPUT_SPEC.md` refers back to.

See `CONTRACT.md` for the full pipeline and handoff format.

## Design principle

Every agent must be independently executable: given a valid input artifact
on disk, an agent should be able to run on its own (by a human, or later by
an automated runner) without needing to know how its input was produced or
what will consume its output beyond the documented contract.
