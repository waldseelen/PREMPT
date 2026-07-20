# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

PROMPTER ("Learning OS") is a client-side React app that compiles user-selected learning modules into a single large, structured prompt for external AI chat tools (ChatGPT, Claude, Gemini, Perplexity). There is no backend — all state lives in `localStorage` via Zustand persistence, and prompts are handed off via URL query params or clipboard copy.

`AGENT.md` and `ARCHITECTURE.md` at the repo root also describe this project's constraints and layout; both are kept in sync with the actual `src/ui/` + `src/store/engineState.js` structure described below.

## Commands

```bash
npm run dev        # start Vite dev server
npm run build       # production build
npm run preview     # preview the production build
npm run lint         # eslint over the whole repo
npm run validate    # scripts/validate-modules.mjs — checks module JSON integrity
```

There is no test runner configured in this repo. `npm run validate` is the closest thing to a correctness check for data changes — always run it after touching `src/data/modules_*.json`.

## Architecture

### Strict layering

The codebase enforces a one-way dependency flow; do not violate it:

```
src/ui/        → dumb renderer, reads/writes Zustand state, zero prompt-building logic
src/store/     → Zustand store (engineState.js), the only source of truth for app state
src/engine/    → dependency resolution, intelligence (suggestion) rules, presets
src/compiler/  → turns resolved state into the final prompt string
src/data/      → pure data (module definitions), no functions/logic
src/utils/     → cross-cutting helpers (AI routing, clipboard)
src/locales/   → UI strings (i18n.js) and compiler-injected strings (compilerTexts.js) — separate files because one is rendered in JSX, the other is spliced into generated prompt text
```

UI components must never compute prompt text, resolve dependencies, or mutate state directly — they call store actions and render store state. All "thinking" (dependency resolution, suggestions, prompt assembly) belongs in `engine/` and `compiler/`.

### Bilingual data, not translated data

`src/data/modules_en.json` and `src/data/modules_tr.json` are two independent, parallel arrays of module objects (id, icon, name, desc, explain, requires, prompt, layer) loaded via `src/engine/moduleRegistry.js#getModuleRegistry(lang)`. They must stay in lockstep: **identical `id` set, in identical order**. `scripts/validate-modules.mjs` enforces this (parity check, required fields, valid `layer` enum, and that every `requires` id exists) — run `npm run validate` after any edit to either file, and keep new modules appended to both files at the same index.

Valid `layer` values: `foundation | mechanism | context | boundaries | application`. These map directly to the category columns rendered in `ModuleGrid.jsx`.

To add a new module: append one object to each of `modules_en.json` and `modules_tr.json` (same position, same `id`), add its `requires` array if it depends on another module's id, and optionally add a lucide icon mapping in `ModuleGrid.jsx`'s `moduleIcons` map (falls back to a generic `Box` icon otherwise). No UI or engine code changes are needed — the grid, dependency graph, and compiler all read the JSON directly.

### Dependency resolution is a DAG, not a flat list

`src/engine/dependencyResolver.js` builds a `DependencyGraph` per language (cached module-level singletons `graphTR`/`graphEN`) from each module's `requires` array:
- `resolveDependencies` — transitive closure (BFS-ish fixed-point loop) of required modules, used to auto-add prerequisites when `config.autoResolveDeps` is on.
- `sortDependencies` — topological sort so prerequisites render before dependents in the final prompt; throws on circular dependencies.

Both the store (`toggleModule`, `setPreset`, `setModules` in `engineState.js`) and the compiler (`finalPromptAssembler.js`) call into this graph — resolution happens on selection, sorting happens at compile time.

### State shape uses Turkish field names regardless of UI language

`config` in `engineState.js` uses Turkish keys (`konu`, `alan`, `seviye`, `mod`, `derinlik`, `format`, `monolog`, `autoResolveDeps`, `theme`, `lang`, `tourCompleted`) as the canonical internal vocabulary — this is independent of `config.lang`, which only controls which JSON/locale files are read for display and prompt text. When touching config, match the existing Turkish key names rather than introducing English aliases.

### Prompt compilation pipeline

`assembleFinalPrompt(state)` in `src/compiler/finalPromptAssembler.js` is the single entry point:
1. `sortDependencies` — topologically orders `state.selectedModules`
2. `buildPromptStructure` (`structureBuilder.js`) — assembles a `{ [ROLE]: ..., [GOAL]: ..., [CONTEXT]: ..., [ACTIVE MODULES]: ..., [INSTRUCTIONS]: ..., [OUTPUT FORMAT]: ..., [CONSTRAINTS / SAFETY]: ... }` object, pulling labels/mode/depth/format text from `COMPILER_TEXTS[lang]` and injecting preset rules + monologue instructions into constraints
3. Blocks are concatenated into the final string

`analyzePromptComplexity` runs the same pipeline to derive char/token estimates and a complexity score for `PreviewPanel`, without mutating state.

### Presets are config + module bundles, not templates

`src/engine/presetEngine.js#PRESETS` maps a preset id to `{ forceModules, override (config fields), injectRules }`. Applying a preset (`setPreset` in the store) replaces `selectedModules` with the preset's forced modules (still passed through dependency resolution), merges `override` into `config`, and stores `injectRules` for the compiler to append as constraints. Manually toggling a module afterward clears `activePreset` (`toggleModule` treats any manual change as breaking preset purity).

### AI hand-off has a URL-length guard

`src/utils/aiRouter.js#openInAI` checks prompt length against a 4000-char threshold before choosing between a GET-parameterized URL (`?q=`/`?prompt=`) per provider vs. opening the bare chat URL and copying the prompt to the clipboard instead (to avoid browser URL-limit crashes and popup blockers — the `window.open` call happens synchronously before the clipboard write for this reason). Any new AI provider integration should follow the same `AI_STRATEGIES` strategy-object shape (`getBaseUrl`, `getPromptUrl`).

### Legacy reference

`legacy/learning-os.html` is a self-contained single-file prior version of this app (pre-React). It's kept for reference only — not part of the build.
