# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

PROMPTER ("Learning OS") is a client-side React app that compiles user-selected modules into a single large, structured prompt for external AI chat tools (ChatGPT, Claude, Gemini, Perplexity). There is no backend — all state lives in `localStorage` via Zustand persistence, and prompts are handed off via URL query params or clipboard copy.

The app serves two parallel **domains** through one shared engine/compiler pipeline: **Learning** (deconstruct/understand any concept) and **Code** (software-engineering prompting). See "Multi-domain architecture" below.

`AGENT.md` and `ARCHITECTURE.md` at the repo root also describe this project's constraints and layout; all three are kept in sync with the actual `src/` structure described below.

## Commands

```bash
npm run dev        # start Vite dev server
npm run build       # production build
npm run preview     # preview the production build
npm run lint         # eslint over the whole repo
npm run validate    # scripts/validate-modules.mjs — checks module JSON integrity, per domain
```

There is no test runner configured in this repo. `npm run validate` is the closest thing to a correctness check for data changes — always run it after touching any `src/data/modules_*.json` file. `validate-modules.mjs` does **not** check preset content (see "Presets" below) — verify new presets by hand.

## Architecture

### Strict layering

The codebase enforces a one-way dependency flow; do not violate it:

```
src/domains/   → declarative per-domain descriptors (layers, option-set ids, route, defaults) — structural facts only
src/ui/        → dumb renderer, reads/writes Zustand state, zero prompt-building logic
src/store/     → Zustand store (engineState.js), the only source of truth for app state
src/engine/    → dependency resolution, intelligence (suggestion) rules, presets — all domain-parameterized
src/compiler/  → turns resolved state into the final prompt string — domain-agnostic pipeline, domain-sourced content
src/data/      → pure data (module definitions, one bilingual pair per domain), no functions/logic
src/utils/     → cross-cutting helpers (AI routing, clipboard, URL<->domain routing, share/recipe payloads)
src/locales/   → UI strings (i18n.js) and compiler-injected strings (compilerTexts.js), both domain-scoped — separate files because one is rendered in JSX, the other is spliced into generated prompt text
```

UI components must never compute prompt text, resolve dependencies, or mutate state directly — they call store actions and render store state. All "thinking" (dependency resolution, suggestions, prompt assembly, presets) belongs in `engine/` and `compiler/`.

### Multi-domain architecture

`src/domains/{learning,code,index}.js` define each domain's `id`, URL `route`, ordered `layers` (module category columns), option-set vocabularies (`modeIds`/`levelIds`/`depthIds`/`formatIds`), and `defaultConfig`. `src/domains/index.js` exports `DOMAINS`, `DOMAIN_ROUTES`, and `getDomain(id)` (falls back to Learning). Everything downstream takes `domain` as a parameter and reads from domain-scoped tables — no per-domain branching in the engine or compiler themselves:

- Module data: `src/data/modules_{en,tr}.json` (Learning) / `modules_code_{en,tr}.json` (Code), loaded via `getModuleRegistry(domain, lang)`.
- UI strings: `i18n[lang].domains[domain]` in `src/locales/i18n.js`, merged over shared top-level chrome by `getTranslation(lang, domain)`.
- Prompt-injected text: `COMPILER_TEXTS[domain][lang]` in `src/locales/compilerTexts.js`.
- Presets: `PRESETS_BY_DOMAIN[domain]` in `src/engine/presetEngine.js`.

Adding a third domain means adding one descriptor file plus its own entries in the four tables above — no other engine or UI code should need to change. See `ARCHITECTURE.md`'s "Multi-Domain Architecture" section for the full picture and a step-by-step table.

### Bilingual data, not translated data

Each domain's `modules_{en,tr}.json` (or `modules_code_{en,tr}.json`) pair are two independent, parallel arrays of module objects (id, icon, name, desc, explain, requires, prompt, layer) loaded via `src/engine/moduleRegistry.js#getModuleRegistry(domain, lang)`. Each pair must stay in lockstep: **identical `id` set, in identical order**; id vocabularies are independent *between* domains. `scripts/validate-modules.mjs` enforces this per domain (parity check, required fields, valid `layer` enum, and that every `requires` id exists) — run `npm run validate` after any edit to any of the four module files, and keep new modules appended to both files of a pair at the same index.

Valid `layer` values are domain-specific, defined in `src/domains/{learning,code}.js`: Learning uses `foundation | mechanism | context | boundaries | application`; Code uses `design | build | comprehend | harden | ship`. These map directly to the category columns rendered in `ModuleGrid.jsx` (`getDomain(domain).layers`, not a hardcoded list).

To add a new module: append one object to both files of the target domain's pair (same position, same `id`), add its `requires` array if it depends on another module's id in the *same* domain, and optionally add a lucide icon mapping in `ModuleGrid.jsx`'s `moduleIcons` map (falls back to a generic `Box` icon otherwise). No UI or engine code changes are needed — the grid, dependency graph, and compiler all read the JSON directly.

### Dependency resolution is a DAG, not a flat list

`src/engine/dependencyResolver.js` builds a `DependencyGraph` from each module's `requires` array, cached in a `Map` keyed by `` `${domain}:${lang}` `` (not fixed per-language singletons — adding a domain needs no change here):
- `resolveDependencies(ids, domain, lang)` — transitive closure (fixed-point loop) of required modules, used to auto-add prerequisites when `config.autoResolveDeps` is on.
- `sortDependencies(ids, domain, lang)` — topological sort so prerequisites render before dependents in the final prompt; throws on circular dependencies.

Both the store (`toggleModule`, `setPreset`, `setModules` in `engineState.js`) and the compiler (`finalPromptAssembler.js`) call into this graph, always passing `state.config.domain` — resolution happens on selection, sorting happens at compile time.

### State shape uses Turkish field names regardless of UI language

`config` in `engineState.js` uses `domain` (`'learning' | 'code'`) plus Turkish keys (`konu`, `alan`, `seviye`, `mod`, `derinlik`, `format`, `monolog`, `autoResolveDeps`, `theme`, `lang`, `tourCompleted`) as the canonical internal vocabulary — the Turkish keys are independent of `config.lang`, which only controls which JSON/locale files are read for display and prompt text. When touching config, match the existing Turkish key names rather than introducing English aliases. `setDomain(domainId)` is the only action that resets `seviye/mod/derinlik/format`/selection state (to the target domain's `defaultConfig`) — recipe/share/import restore actions deliberately avoid calling it, since their job is to restore state, not wipe it.

### Prompt compilation pipeline

`assembleFinalPrompt(state)` in `src/compiler/finalPromptAssembler.js` is the single entry point:
1. `sortDependencies(state.selectedModules, state.config.domain, state.config.lang)` — topologically orders `state.selectedModules`
2. `buildPromptStructure` (`structureBuilder.js`) — assembles a `{ [ROLE]: ..., [GOAL]: ..., [CONTEXT]: ..., [ACTIVE MODULES]: ..., [INSTRUCTIONS]: ..., [OUTPUT FORMAT]: ..., [CONSTRAINTS / SAFETY]: ... }` object, pulling labels/mode/depth/format/context text from `COMPILER_TEXTS[domain][lang]` and injecting preset rules + monologue instructions into constraints
3. Blocks are concatenated into the final string

`analyzePromptComplexity` runs the same pipeline to derive char/token estimates and a complexity score for `PreviewPanel`, without mutating state.

### Presets are config + module bundles, not templates

`src/engine/presetEngine.js#PRESETS_BY_DOMAIN[domain]` maps a preset id to `{ group, forceModules, override (config fields), injectRules }`. `group` is a structural clustering key (e.g. Code: `build`/`review-harden`/`understand`) whose translated label lives in `i18n[lang].domains[domain].presetGroups` — used by `PresetBar.jsx` to render presets under labeled headers instead of a flat row. Applying a preset (`setPreset` in the store) replaces `selectedModules` with the preset's forced modules (still passed through dependency resolution), merges `override` into `config`, and stores `injectRules` for the compiler to append as constraints. Manually toggling a module afterward clears `activePreset` (`toggleModule` treats any manual change as breaking preset purity).

**Validation gap:** `npm run validate` does not check inside presets. When adding a preset, manually verify every `forceModules` id exists in `getModuleRegistry(domain, lang)` for that domain, and every `override` value is valid for that domain's `modeIds`/`levelIds`/`depthIds`/`formatIds` — a mismatch here silently produces a broken prompt at runtime instead of failing a check.

### Recipes, sharing, and export/import share one payload shape

`src/utils/statePayload.js` (`serializeState`/`sanitizePayload`/`encodePayloadToParam`/`decodePayloadFromParam`) backs three features: saved recipes (`RecipesPanel.jsx`, localStorage, no topic text), share links (`?share=` URL param, `ActionBar.jsx` + `App.jsx` mount effect), and JSON export/import (`ActionBar.jsx`). `sanitizePayload` never throws — it resolves an invalid domain/module id/option value to a safe default, which matters because all three sources can carry stale or hand-edited data. `theme`/`lang`/`tourCompleted` are deliberately never included in any payload (recipient's environment, not part of a shared setup).

### AI hand-off has a URL-length guard

`src/utils/aiRouter.js#openInAI` checks prompt length against a 4000-char threshold before choosing between a GET-parameterized URL (`?q=`/`?prompt=`) per provider vs. opening the bare chat URL and copying the prompt to the clipboard instead (to avoid browser URL-limit crashes and popup blockers — the `window.open` call happens synchronously before the clipboard write for this reason). Any new AI provider integration should follow the same `AI_STRATEGIES` strategy-object shape (`getBaseUrl`, `getPromptUrl`).

### Legacy reference

`legacy/learning-os.html` is a self-contained single-file prior version of this app (pre-React, pre-multi-domain). It's kept for reference only — not part of the build.
