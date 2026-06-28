# Tasks

## Format

```
TASK-ID
Status: Not Started | In Progress | Blocked | Done
Objective: what this task achieves
Acceptance criteria: how we know it's done
Notes: context, links, caveats
```

## Current tasks

```
TASK-0005
Status: Not Started
Objective: Rename repository folder to opinion-platform.
Acceptance criteria: Repository folder renamed; all tooling/paths still function; change confirmed before commit.
Notes: Working name only, not the public brand. Pending founder approval to execute.
```

```
TASK-0006
Status: Not Started
Objective: Implement the monorepo folder structure (apps/, agents/, workflows/, packages/, analytics/, infra/, docs/, prompts/, scripts/, assets/, .github/).
Acceptance criteria: Folders created with placeholder/readme content; no application code added; structure matches approved architecture review.
Notes: Structure already proposed and approved in architecture review; not yet executed.
```

```
TASK-0007
Status: Not Started
Objective: Design the domain model (core entities, relationships, vocabulary).
Acceptance criteria: Domain model documented (e.g. in docs/03-ARCHITECTURE.md or a dedicated doc); reviewed and approved before implementation.
Notes: Design only, no code.
```

```
TASK-0008
Status: Not Started
Objective: Design the database model based on the domain model.
Acceptance criteria: Schema/entities documented in docs/04-DATABASE.md; storage technology decision recorded in DECISIONS.md.
Notes: Depends on TASK-0007.
```

```
TASK-0009
Status: Not Started
Objective: Create the MVP app (users compare two entities and vote).
Acceptance criteria: MVP scope explicitly approved; implementation follows approved architecture, domain model, and database model.
Notes: Must not begin before TASK-0006/0007/0008 are complete and approved.
```
