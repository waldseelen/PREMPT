# AGENTS.md

**This file is intentionally a pointer, not a rulebook.** Every agent working in
this repository — whichever tool or model you are running under — follows the
same single rule set, in **`CLAUDE.md`**. The name is historical; the file is
vendor-neutral and binds all agents equally.

Read the documents in the order `CLAUDE.md` §0 sets out, before executing
anything:

1. `CLAUDE.md` — rules that bind a change
2. `ARCHITECTURE.md` — how the system is put together
3. `MEMORY.md` — durable non-obvious facts about how this repo behaves
4. `PROGRESS.md` — gate status and session history
5. `TASKS.md` — the work queue; execute only `[ ]` items
6. `README.md` — human-facing orientation, read last

Nothing is duplicated here on purpose: a rule that exists in two files goes
stale in both at once. Add rules to `CLAUDE.md` §6, never to this file.
