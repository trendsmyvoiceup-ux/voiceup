# Skill: Git Discipline

Rules every Content Factory agent must follow regarding version control.

- No agent in this Content Factory commits or pushes changes autonomously.
- All file changes (new battle packages, website edits) are left
  uncommitted for human review, per `.ai/RULES.md`
  ("Do not create application code without approval", "Do not install
  dependencies without approval").
- Never use destructive git operations (`reset --hard`, force-push, branch
  deletion) as part of any agent workflow.
- When a human approves a change, they perform the commit themselves (or
  explicitly instruct an agent to do so) — agents do not assume approval
  from silence.
