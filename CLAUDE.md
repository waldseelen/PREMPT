# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and any other coding
agent working in this repository.

---

# Part 1 — This repository

## 0. Required read order

Read this file first, then the companions in this order, before executing
anything:

1. `CLAUDE.md` — this file: rules that bind a change
2. `ARCHITECTURE.md` — how the system is put together
3. `MEMORY.md` — durable non-obvious facts about how this repo behaves
4. `PROGRESS.md` — current gate status, blockers, session history
5. `TASKS.md` — the work queue; execute only items marked `[ ]`
6. `README.md` — human-facing orientation, read last

Treat 1–5 as one instruction set. Any of the five companions that is missing
gets created on your first session here — see §3.1.

**Read order is not trust order.** When two sources disagree, §4 decides —
live code outranks every document in this list, including this one.

## 1. Project identity

PROMPTER ("Learning OS") is a **client-side-only** React app that compiles a set
of user-selected modules into one large, structured prompt, then hands it off to
an external AI chat tool (ChatGPT, Claude, Gemini, Perplexity). It is a *prompt
compiler*, not a chat client: it never calls an AI API, never streams a
completion, and never sees a response. The single most common wrong assumption
to arrive with is that there is a server somewhere — **there is no backend, no
auth, no database, no API route, and no server-side rendering.** All state lives
in the browser's `localStorage` through Zustand's `persist` middleware, and every
hand-off leaves via a URL query parameter or a clipboard copy.

The app serves two parallel **domains** through one shared engine/compiler
pipeline: **Learning** (deconstruct/understand any concept, 35 modules) and
**Code** (software-engineering prompting, 32 modules). Domains are declarative
descriptors, not branches in the engine — see §5.

**Stack** (verified against `package.json`): React 19 + React DOM 19,
Vite 8 (`@vitejs/plugin-react` 6), Zustand 5 (`persist` middleware),
`lucide-react` 1 and `@icons-pack/react-simple-icons` 13 for icons. Dev
dependencies are ESLint 10 with `eslint-plugin-react-hooks` and
`eslint-plugin-react-refresh`. There is **no** router library, no CSS framework,
no test runner, and no HTTP client — routing is a thin `history.pushState`
wrapper (`src/utils/domainRoute.js`) and styling is hand-written CSS in
`src/index.css`. Every runtime and build dependency is imported by source or by
a config file. The two exceptions are `@types/react` and `@types/react-dom`:
there is no TypeScript in this repo and no `tsconfig`/`jsconfig`, so no build,
lint, or runtime step reads them — they are Vite-scaffold leftovers that only
feed editor IntelliSense.

**Hosting / runtime:** static SPA bundle, deployed on Vercel via Git
integration. `vercel.json` rewrites every path to `/index.html` so the `/learn`
and `/code` deep links resolve (see §12). Runtime is the browser only.

## 2. Commands

```bash
npm run dev        # Vite dev server
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint       # eslint over the whole repo (dist/ is globally ignored — §12)
npm run validate   # node scripts/validate-modules.mjs — module data integrity, per domain
```

These five are the complete script list in `package.json`; there are no others.

**There is no test runner in this repo** — no test script, no test framework in
`devDependencies`, no test files. `npm run validate` is the closest thing to a
correctness gate, and it is narrow: it validates *only* the four module data
files (TR/EN parity, required fields present and non-empty, `layer` within the
domain's enum, duplicate ids, and every `requires` id resolving inside the same
domain). Run it after touching any `src/data/modules_*.json`.

**Documented validation gap:** `scripts/validate-modules.mjs` never opens
`src/engine/presetEngine.js`. A preset whose `forceModules` names a module id
that does not exist in that domain's registry, or whose `override` sets a value
outside that domain's `modeIds`/`levelIds`/`depthIds`/`formatIds`, passes both
`npm run validate` and `npm run lint` and then silently produces a broken or
wrong prompt at runtime. Verify new presets by hand against
`getModuleRegistry(domain, lang)` and the domain descriptor before shipping.

## 3. Document hierarchy — one fact, one home

Each document owns its subject. Link to the owner instead of restating it, and
never assert the same fact in two files. When a duplicated fact goes stale, it
goes stale in every copy at once, and nothing tells you which copy is the lie.

| Subject                                        | Owner |
| ---------------------------------------------- | ----- |
| Conventions, patterns, binding rules           | `CLAUDE.md` (this file) |
| Structure, blueprint tree, runtime boundaries  | `ARCHITECTURE.md` |
| Durable non-obvious repo facts                 | `MEMORY.md` |
| Dates, session history, gate status            | `PROGRESS.md` |
| Work queue — phases, tasks, subtasks           | `TASKS.md` |
| Human/GitHub orientation, features, setup      | `README.md` |
| Security findings and rejected-finding ledger  | — |

`AGENT.md` and `AGENTS.md` are intentionally pointer stubs to this file. They
own nothing; do not move a rule into either of them.

Two exclusivity rules fall out of this table and are worth stating outright:

- **`PROGRESS.md` is the only file that carries a date or a ✅.** A line
  anywhere else that would go stale belongs there.
- **`TASKS.md` is the only file that carries `[ ]` / `[x]`.** Do not track work
  with checkboxes in any other document.

A row marked `—` has no owner in this repo; that subject then lives here, once.

### 3.1 Companion documents — create any that is missing

**At the start of your first session in this repository, check which of the five
companion docs exist. For each one that does not, scan the repo and write it.**
Do not ask first; do not stub it with placeholders. Announce which ones you
created.

Rules that bind this pass:

- **Scan before writing.** Read `package.json` and the lockfile, walk the source
  tree, and open the files that carry the answers. Every statement must come
  from something you read — never from a framework's usual layout, the project
  name, or a dependency that is listed but never imported.
- **An empty section is correct; an invented one is not.** On a brand-new repo
  most sections are headers with a one-line "nothing here yet." That is the
  honest state. A guessed architecture is a lie the next agent will build on.
- **Never overwrite a doc that already exists.** If it exists but contradicts
  the code, do not silently rewrite it: report the drift and ask.
- **Respect the ownership table above.** A fact belongs in exactly one of these
  files. When you are about to repeat something, link to its owner instead.

What each file owns:

**`ARCHITECTURE.md`** — structure and runtime boundaries, present tense, no
history and no status. Sections: system shape (including what is deliberately
absent — no backend, no auth, no multi-tenancy; absences prevent more wrong code
than presences) · **blueprint tree** of directories and meaningful files, one
trailing comment each, with generated output marked · data flow traced end to
end for one request, plus the routes that bypass it · layer/dependency rules ·
key subsystems whose behavior is not inferable from one file, each with its
entry point and governing invariant · extension seams and what adding one costs ·
external services and what breaks when each is missing, keys only, never values ·
generated-file source→output pairs.

**`MEMORY.md`** — durable non-obvious facts about how this repo actually
behaves, as a flat bullet list. The test for a line belonging here: *if it would
ever need a date, a ✅, or a version pin, it belongs in `PROGRESS.md` or
`ARCHITECTURE.md` instead.* Good entries are the traps: a helper that returns
`null` on failure so every caller must guard, two enforcement points that must
change together, a dependency that is installed but dead, a surface that looks
CMS-driven but is static. This file rots into a second changelog faster than any
other — keep dates out of it.

**`PROGRESS.md`** — the only file that carries a date or a ✅. Two sections:
`## Current Gate Status` (one row per gate: command, result, when it was last
actually run) and `## Session History` (one dated entry per session, newest
first — what changed, what was verified, what was left open). Never record a
gate as passing without having run that exact command in the current checkout.

**`TASKS.md`** — the only file that carries checkboxes, and the execution source
of truth. Structure: `## Phase N — <name>` → `- [ ] N.M <task>` →
`  - [ ] N.M.x <subtask>`. Each task states its acceptance condition, not just
its title. `[x]` means completed **or intentionally skipped**; never redo or
re-audit a closed item unless it is explicitly reopened. Execute only `[ ]`
items. See §8 for what earns an `[x]`.

**`README.md`** — for humans and GitHub, not for agents: what the project is and
who it is for, feature list, tech stack, setup and run instructions, env-var
table by key with a short description each. No gate status, no session history,
no agent rules — those have owners above.

## 4. Decision order on conflict

When sources disagree, trust them in this order:

1. Live code, configs, manifests, scripts, and the current filesystem.
2. The work queue (§3) for what to do next.
3. The progress doc (§3) for current health, blockers, and priorities.
4. Architecture and memory docs (§3) for stable context.
5. `README.md` for user-facing setup.
6. Historical artifacts — build logs, deleted docs, old plans — as background only.

## 5. Architecture

The full picture — file tree, `App.jsx` breakdown, state shape, compilation
pipeline, multi-domain extension table, theming — lives in **`ARCHITECTURE.md`**.
Read it before touching structure. Only the rules-shaped parts live here.

### 5.1 Strict one-way layering

```
ui/  →  store/  →  engine/  →  compiler/  →  data/
                       ↑
                utils/, locales/   (cross-cutting; read by store/engine/compiler/ui)
```

- `src/domains/` — declarative per-domain descriptors (`id`, `route`, ordered
  `layers`, `modeIds`/`levelIds`/`depthIds`/`formatIds`, `defaultConfig`).
  Structural facts only; no translated text, no logic.
- `src/ui/` — dumb renderer. Reads Zustand state, calls store actions, nothing else.
- `src/store/` — `engineState.js`, the single Zustand store and the only source
  of truth for app state.
- `src/engine/` — dependency graph, suggestion rules, presets, module registry.
  All domain-parameterized.
- `src/compiler/` — state → final prompt string. Domain-agnostic pipeline,
  domain-sourced content. `src/compiler/formatters/` renders the block structure
  into the selected output target (`markdown`, `claude-xml`, `openai-json`).
- `src/data/` — pure module data, one bilingual pair per domain. No functions.
- `src/utils/` — cross-cutting helpers (AI routing, clipboard, URL↔domain
  routing, share/recipe payloads). No React, no Zustand imports.
- `src/locales/` — `i18n.js` (strings rendered in JSX) and `compilerTexts.js`
  (strings spliced into generated prompt text). Two files because the two
  audiences are different; do not merge them.

Do not add an import that points backwards through this flow. A UI component
that computes prompt text, resolves dependencies, or mutates state directly is a
layering violation regardless of how small it is.

### 5.2 Bilingual lockstep

Each domain ships two independent, parallel module arrays — not a base file plus
a translation. Learning: `src/data/modules_{en,tr}.json`. Code:
`src/data/modules_code_{en,tr}.json`. Loaded via
`getModuleRegistry(domain, lang)`.

**The two files of a pair must carry an identical `id` set in identical order.**
Append a new module at the same index in both files of the pair. Id vocabularies
are independent *between* domains — a Learning id and a Code id never need to
relate. `npm run validate` enforces parity per domain; nothing enforces it at
runtime, and a drifted pair produces a silently wrong prompt in one language
only.

The same lockstep requirement applies to every other bilingual table:
`i18n[lang].domains[domain]` and `COMPILER_TEXTS[domain][lang]`. A key added to
one language and not the other is a shipped bug in the other language.

### 5.3 Turkish config-key convention

`config` in `src/store/engineState.js` uses Turkish keys as the canonical
internal vocabulary, regardless of the UI language: `konu`, `alan`, `seviye`,
`mod`, `derinlik`, `format`, `hedef`, `monolog`, `autoResolveDeps`, `theme`,
`lang`, `tourCompleted` — plus `domain`. These keys are independent of
`config.lang`, which only selects which JSON/locale files are read for display
and prompt text.

**Match the existing Turkish key names; never introduce an English alias.** Two
names for one field means two code paths that both look correct and disagree.
The option-set *values* are Turkish-derived ids too (`otomatik`, `karma`,
`orta`, `kapsamli`…) and are shared with `COMPILER_TEXTS[domain][lang]` — the id
is the join key, so renaming one breaks the lookup silently.

## 6. Absolute rules for this repository

1. **UI components stay dumb.** No prompt-text computation, no dependency
   resolution, no length/complexity math, no state mutation beyond calling a
   store action. All "thinking" lives in `src/engine/` and `src/compiler/`.
   Without this the layering in §5.1 stops being checkable and the same
   derivation ends up in two places that drift.
   (`src/ui/PreviewPanel.jsx` calls `analyzePromptComplexity`; it does not
   compute stats itself.)
2. **No logic in `src/data/*.json`.** Modules are strictly configuration
   objects — `id`, `icon`, `name`, `desc`, `explain`, `requires`, `prompt`,
   `layer`. Never a function, a computed value, or a template expression. The
   validator and the compiler both treat these files as inert data; anything
   else is dropped without a warning.
   (`src/data/modules_en.json`)
3. **No God components.** Split by responsibility along the existing component
   boundaries (`ConfigPanel`, `ModuleGrid`, `PresetBar`, `ActionBar`,
   `PreviewPanel`, `RecipesPanel`, `IntroView`). The test is unrelated concerns
   sharing a file, not a line count — do not merge feature areas back into
   `App.jsx`, which is the composition root and owns only effects and layout.
4. **Do not introduce React Context or Redux.** Zustand is the state manager and
   it already handles `localStorage` persistence via `persist`. A second store
   means two sources of truth for the same config and a persistence layer that
   only covers one of them.
   (`src/store/engineState.js`)
5. **Do not install Tailwind CSS, styled-components, or any CSS framework
   without explicit instruction from the user.** Styling is hand-written CSS in
   `src/index.css`.
6. **Preserve the glassmorphism / `data-theme` custom-property approach.** Theme
   switching works by `App.jsx` writing `data-theme="light|dark"` on `<html>`
   and CSS custom properties resolving against it — light/dark support is
   automatic for anything that uses the tokens. A hardcoded color or an inline
   style bypasses the whole theme engine and looks broken in one mode only.
   (`src/index.css`, theme effect in `src/App.jsx`)
7. **Module pairs stay in lockstep at the same index.** See §5.2. Adding a
   module to one file of a pair and not the other is the single easiest way to
   ship a silently broken language.
8. **A new AI provider is added as an `AI_STRATEGIES` entry, not a branch.**
   The shape is `{ getBaseUrl(), getPromptUrl(prompt) }` and the 4000-character
   URL guard in `openInAI` applies to every provider uniformly. Branching around
   the strategy table means the new provider skips the guard and crashes on long
   prompts.
   (`src/utils/aiRouter.js`)
9. **Keep the URL-length guard's ordering.** In `openInAI`, `window.open` is
   called *synchronously* before the clipboard write. Reordering them — or
   awaiting anything first — puts the popup outside the user-gesture window and
   the browser blocks it.
   (`src/utils/aiRouter.js`)
10. **Extend a domain by adding data, not code.** A new domain is a descriptor in
    `src/domains/` registered in `src/domains/index.js`, plus its own entries in
    four tables: module data, `i18n[lang].domains`, `COMPILER_TEXTS`, and
    `PRESETS_BY_DOMAIN`. If a change requires per-domain branching inside
    `src/engine/` or `src/compiler/`, the descriptor is missing a field — add the
    field instead of the branch.
11. **Do not let prompt templates contradict monologue mode.** When
    `config.monolog` is on, the compiler injects internal-reasoning
    (`<thinking>`) instructions into the constraints block. A module `prompt`
    that tells the model to answer immediately or to skip reasoning fights that
    injection, and the conflict is invisible until you read a generated prompt.
    (`src/compiler/structureBuilder.js`, `monologueText` in
    `src/locales/compilerTexts.js`)
12. **Verify a new preset by hand.** Nothing validates preset contents — see the
    validation gap in §2.
    (`src/engine/presetEngine.js`)
13. **No emoji in UI or AI slop in frontend.** Use lucide-react icons instead of emoji everywhere — labels, presets, specs, domain data. Never auto-generate or use LLM-produced copy for user-facing text; all strings must be curated by a human hand. The frontend is for learning and craft, not AI filler.
    (`src/ui/DomainSwitcher.jsx` uses lucide icons; domain `specs/*.js` use icon IDs not emoji; `src/locales/` contains hand-written copy)

---

# Part 2 — Portable engineering rules

These hold across all my projects. They exist because each one has already been
broken at least once, in this codebase or a sibling.

## 7. Verification and gates

1. **Never record a gate as passing without running that exact command in the
   current checkout.** Quote the output or say you did not run it. A ✅ that no
   machine produced decays into fiction the moment a dependency shifts.
2. **A gate's current result lives in exactly one file** (§3). Do not restate it
   here, in the README, or in a session note.
3. **Never add a lint-suppression comment** (`eslint-disable`, `@ts-ignore`,
   `# noqa`). Fix the violation or report it. Zero suppressions in a tree is an
   invariant worth keeping, not a coincidence.
4. **Never edit the ruleset to get past one file.** Changing lint or compiler
   config is a deliberate decision made with the user, not a way around an error.
5. **Do not run a bulk autofix to clear a backlog.** Report what the linter
   finds first; a repo-wide `--fix` produces a diff nobody can review.
6. **Report error and warning counts separately.** Under `--max-warnings=0` a
   warning fails the command, so "it passes except for warnings" is not a thing.
7. **A test count is not evidence.** Before citing "N tests passing", check what
   they assert. A test that mocks away the system under test — a suite mocking a
   module the repo no longer depends on, a stub that always resolves — is
   theater, and it passes forever.
8. **Name what your validator does not cover.** If a check script validates
   file A but not the config in file B, say so where the script is documented.
   Silent gaps are where runtime breakage hides.
9. **A known-broken gate gets documented, not worked around.** Record the cause,
   why it is not your change's fault, and what a real fix looks like. Do not
   downgrade a dependency or rewrite rules to make the symptom disappear.
10. **If validation cannot run locally, say exactly why** and record it in the
    progress doc — and in the work queue if it becomes work.

## 8. Definition of done

1. **A cross-cutting fix requires grepping every other occurrence of what you
   replaced, not just the cited `file:line`.** Fix all of them or explicitly
   list which remain and why. One call site fixed while its siblings keep the
   old broken code is a partial mitigation — do not report it as done.
2. **A value derived from the same inputs in more than one place must be
   computed by one shared function**, imported everywhere it is needed. Two
   independent implementations of the same rule drift the moment one is touched
   and the other is not.
3. **Paired contracts must be grepped in both directions.** Event dispatch ↔
   listener, parallel data files that must stay in lockstep, two independent
   copies of an auth check, a generated file and its source. These fail with
   zero error, warning, or visual sign — the action just silently does nothing.
4. **Never report a batch action as a blanket success if any item was silently
   skipped.** State what happened per item-class — completed vs. skipped and
   why — instead of one message covering all of them.
5. **A task is complete only once traced end to end**: every other call site of
   the same operation checked, and the affected user flow reasoned through with
   concrete inputs, or exercised in a browser. "A diff exists at the cited line"
   is not completion.
6. **If full verification was not possible, say so explicitly** rather than
   marking it done anyway.

## 9. Working method

1. **Trace the affected flow before editing:** route/entrypoint → component →
   helper/query → type/schema → external service. Edit after you have seen the
   whole chain, not after you have found the first plausible line.
2. **Keep the change as small as possible while still closing the task.** Do not
   quietly expand into unrelated cleanup. Many files contain older or unused
   patterns that should not be mass-cleaned unless that is the task.
3. **Never present a guess as a fact.** Write assumptions, risks, open
   questions, and TODOs explicitly.
4. **When code and documentation disagree, trust the code and document the
   drift.** Stale docs are poisoned context: an agent reading a wrong
   architecture file writes wrong code with full confidence.
5. **Label scaffolding as partial, never complete.** A feature that exists only
   as placeholders, demo data, or a `501` is not a feature. Do not advertise
   placeholder routes as working.
6. **Never collapse current state into target state.** If the repo is mid-
   migration, call the current system what it is and the intended one what it
   is. Do not describe a migration as finished unless you finished it.
7. **If you touch a scaffolded feature, either finish the user-visible path end
   to end or record the remaining gap** in the work queue.
8. **Read the rejected-findings ledger before reporting anything as a finding.**
   Items already investigated and refuted are recorded with their reasons (§3).
   Re-reporting them is noise that costs a review cycle every time. If you
   disagree with a rejection, argue against the recorded reason — do not re-file
   the finding as new.
9. **`[x]` means completed *or intentionally skipped*.** Do not redo, re-audit,
   or re-report a closed item unless it has been explicitly reopened.

## 10. Architecture invariants

1. **Respect the repository's one-way dependency flow.** Layers are declared in
   §5; do not add an import that points backwards through them.
2. **UI components stay dumb.** No business logic, no derived-value computation,
   no direct state mutation beyond dispatching an action. All "thinking" lives
   in the engine/service/lib layer.
3. **Data files contain data.** Never put functions, logic, or computed values
   inside a JSON/config module that is loaded as pure configuration.
4. **No God components.** Split by responsibility using the existing component
   boundaries. The test is unrelated concerns living in one file, not a line
   count — size is the smell that makes you look, not the verdict.
5. **Extend through the existing seam.** When a pattern already exists — a
   strategy object per provider, a registry, a per-domain descriptor — add to it
   rather than branching around it.
6. **Do not introduce a competing dependency or paradigm without approval.** No
   second state manager, no second styling system, no second HTTP client, no
   second date library. Use what is already here.
7. **Never edit generated output.** Edit the source and regenerate. Generated
   files are listed in §5.

## 11. Data and persistence

1. **Never hard-delete user history.** Use soft-delete or archive fields
   (`active: false`, `deleted_at`, `archived: true`). Historical records and
   relations must stay intact.
2. **Server-only credentials must never be reachable from the client.** Keep the
   admin/service-role client in a server-only module, and never expose a service
   key under a client-visible env prefix.
3. **Any new cloud table or sync flow assumes user-scoped rows and enforced
   access rules from the start** — not as a follow-up hardening pass.
4. **Do not add a direct client read/write path around the server layer** when
   security rules deny direct client access. The shortcut is the vulnerability.
5. **Match the id type as it actually exists, not as it was designed.** If ids
   are a `number | string` union because of legacy rows, never validate with
   `Number(id)` and never sort with `a.id - b.id` — both silently reject or
   `NaN` the other half. Use the repo's shared validator and comparator.
6. **A value that round-trips through a client control arrives as a string.**
   Look up the real entity and use its native id; do not coerce the raw control
   value.
7. **Any new outbound fetch to a user-supplied URL applies the repo's SSRF
   guard**: reject non-http(s) schemes, localhost and internal TLDs, private,
   loopback and link-local ranges, and the cloud metadata address.
8. **Security headers are centralized**, not duplicated per route.

## 12. Load-bearing configuration

Some config exists because removing it causes a *silent* failure — the build
succeeds, nothing errors, and the output is quietly wrong.

1. **Label load-bearing config at the site**, with the failure it prevents.
2. **A cleanup or dependency pass never removes labeled config**, however
   redundant it looks.
3. **Before deleting any flag, override, or resolution field, find out what it
   prevents.** "Nothing broke when I removed it" is only evidence if you checked
   the artifact, not just the exit code.

Real cases in this repo:

- **`vercel.json`'s catch-all rewrite to `/index.html`.** The app has no router
  library; `/learn` and `/code` are real URL paths pushed with the History API
  and served by the same single-page bundle. Remove the rewrite and the build
  still succeeds, the dev server still works, and only *deployed* deep links and
  hard refreshes on `/code` 404.
- **`globalIgnores(['dist'])` in `eslint.config.js`.** Without it `npm run lint`
  walks the production bundle and reports on minified generated output, which
  makes the gate unusable rather than failing loudly.
- **`config.hedef` is deliberately NOT part of any domain's `defaultConfig`**
  (`src/store/engineState.js`). `setDomain()` spreads
  `...targetDomain.defaultConfig` over `config`; adding `hedef` to a descriptor
  would silently reset the user's chosen output target on every Learn↔Code
  switch. The source carries this comment at the site — keep it.
- **`version: 1` + `migrate` in the `persist` options**
  (`src/store/engineState.js`). Zustand's rehydrate replaces the whole top-level
  `config` object rather than deep-merging it, so a pre-multi-domain persisted
  blob would rehydrate with `config.domain === undefined`. The migrate step
  backfills it. Nothing errors without this — the app just loads into an
  undefined domain.
- **The `forceTarget: 'markdown'` override in `src/ui/ActionBar.jsx`'s AI
  buttons.** The `openai-json` output target produces an API payload, not
  pasteable chat text; without the override the AI deep-link buttons would
  URL-encode a JSON blob into a chat query. Paired with the comment in
  `src/compiler/formatters/openaiJson.js` — the two must change together.

## 13. Time, locale, and accessibility

1. **Never derive "today" from `new Date().toISOString()` or any raw local/UTC
   value.** Go through the repo's single date helper. Raw dates drift by a day
   at night for anyone not on UTC.
2. **One date choke-point, not a repeated inline expression.** If the same date
   extraction appears at several call sites, it becomes one exported function.
3. **All user-facing strings go through i18n**, and every locale file is updated
   in the same change. A missing key in the second locale is a shipped bug.
4. **Use full-path namespaced keys** exactly as the locale files nest them.
5. **Respect `prefers-reduced-motion`** in every animation.
6. **Never unmount or route-suppress a global layout component without
   verifying both viewports.** Responsive containers (`sm:hidden` /
   `hidden sm:block`) must cover mobile and desktop with no dead zone where
   nothing renders.

## 14. UI contracts

1. **Prefer the repo's existing utility classes and design tokens over inline
   styles or hardcoded colors**, so light/dark support stays automatic.
2. **`z-index` only ranks within the nearest ancestor stacking context.**
   `position` + `z-index`, `opacity < 1`, `transform`, `filter`, and
   `backdrop-filter` each create one. Raising a descendant's z-index cannot make
   it outrank anything outside an ancestor that already has one — fix the
   ancestor.
3. **Motion stays consistent with the repo's central motion config.** Do not
   introduce a one-off duration or easing curve at a call site.

## 15. Changes that need approval first

Ask the user and wait before:

- Schema, migration, or data-layer model changes.
- Changing route structure or deleting existing pages.
- Adding or reshaping a global store's contract.
- Changing global CSS, design tokens, or the styling framework config.
- Adding, removing, or upgrading a dependency.
- Any `git commit`, `git push`, branch creation, or PR.
- Anything that touches production data, deployment settings, or secrets.

Repo-specific additions to that list:

- The persisted state contract: the `localStorage` key
  `learning-os-engine-storage`, the `partialize` allowlist, or the `persist`
  `version`/`migrate` pair in `src/store/engineState.js`. Changing any of them
  invalidates or corrupts every existing user's saved setup and recipes.
- The share/recipe payload shape in `src/utils/statePayload.js`
  (`PAYLOAD_VERSION`, the serialized field set). Old share links and exported
  JSON files in the wild are decoded by this exact shape.
- The domain descriptors in `src/domains/` — `layers`, `route`, and the
  option-set id lists are the join keys for module data, i18n, compiler text,
  and presets simultaneously.
- `vercel.json` and `index.html` (deployment surface).

## 16. Reporting work

1. **One dated entry per session**, in the progress doc named in §3 — and
   nowhere else. Session notes scattered across files become parallel
   changelogs that contradict each other.
2. **Update gate status only if you ran a gate**, in the one file that owns it.
3. **Report outcomes faithfully.** If tests fail, say so and include the output.
   If a step was skipped, say that. When something is done and verified, state
   it plainly without hedging.

## 17. Environment notes (Windows)

1. Two shells are available and they take different syntax. Use PowerShell 7 for
   Windows tooling and `git`; use Bash only for POSIX scripts. Do not mix them.
2. Prefer absolute paths. Do not prefix commands with `cd`.
3. Interactive flags do not work here: no `git rebase -i`, no `git add -i`, no
   command that opens an editor or prompts on stdin.
4. Use dedicated file/search tools rather than shell `grep`/`cat`/`sed`.
5. Long-lived processes (dev servers, watchers) are started through the launch
   config, not as a foreground shell command.

---

## Doc trust note

Everything in Part 1 was written against this repository's source tree and is
expected to be re-verified whenever it looks wrong. If a statement here
contradicts the code, **the code wins** — fix this file in the same change and
say what drifted.

Part 2 is shared across projects and is edited at the canonical copy
(`DEV/CLAUDE.template.md`), then re-synced. Do not fork it in place: a copied
rule file that gets locally patched is how the same rule ends up saying two
different things in two repos.
