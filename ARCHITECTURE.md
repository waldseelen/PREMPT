# 🏛️ PROMPTER — Architecture Reference

PROMPTER ("Learning OS") is a client-side-only React 19 + Vite application. There is **no backend**:
all state lives in the browser (`localStorage` via Zustand's `persist` middleware), and every
hand-off to an external AI tool happens either through a URL query parameter or a clipboard copy.

The app compiles a set of user-selected **modules** into one large, structured prompt. It serves two
parallel **domains** today — **Learning** (deconstruct/understand any concept) and **Code**
(software-engineering prompting: design, build, review, harden, ship) — that share one engine/compiler
pipeline through declarative domain descriptors (`src/domains/`). Adding a third domain is meant to be
additive: a new descriptor + its own data/locale/preset files, no engine or UI code changes.

The system enforces a **strict one-way dependency flow**:

```
ui/  →  store/  →  engine/  →  compiler/  →  data/
                       ↑
                   utils/, locales/  (cross-cutting, read by store/engine/compiler/ui)
```

`src/ui/` never computes prompt text, resolves dependencies, or mutates state directly — it only
reads Zustand state and calls store actions. All "thinking" (dependency resolution, suggestions,
prompt assembly, presets) lives in `src/engine/` and `src/compiler/`.

---

## 📁 Full File Tree

```text
PROMPTER/
├── AGENT.md                          # Rules for AI coding agents working in this repo (layering, module-add procedure, hard constraints)
├── ARCHITECTURE.md                   # This file
├── CLAUDE.md                         # Instructions for Claude Code specifically (commands, architecture summary)
├── README.md                         # User-facing project pitch, feature list, quick start
├── package.json                      # Scripts (dev/build/lint/preview/validate) + dependencies
├── package-lock.json                 # Locked dependency tree
├── eslint.config.js                  # Flat ESLint config: js recommended + react-hooks + react-refresh rules
├── vite.config.js                    # Vite build config (React plugin only, no aliases/env wiring)
├── vercel.json                       # SPA rewrite: all paths → /index.html (deep links like /code don't 404 on Vercel)
├── index.html                        # Vite entry HTML — mounts #root, loads /src/main.jsx
│
├── scripts/
│   └── validate-modules.mjs          # `npm run validate` — checks TR/EN parity, required fields, valid `layer` enum,
│                                      #   and non-broken `requires` refs, independently per domain (reads src/domains/index.js
│                                      #   for the domain→layer-set map, so a 3rd domain needs no change here)
│
├── legacy/
│   └── learning-os.html              # Pre-React, single-file prior version. Reference only — NOT part of the build.
│
└── src/
    ├── main.jsx                      # React root: <StrictMode><App /></StrictMode>, imports index.css
    ├── App.jsx                       # Root component — see "App.jsx in detail" below
    ├── App.css                       # Currently near-empty; primary styling lives in index.css
    ├── index.css                     # ALL styling: CSS custom properties (light/dark theme), glassmorphism cards,
    │                                  #   grid layouts, preset/module-card/tooltip styles, responsive breakpoints
    │
    ├── domains/                      # Declarative domain descriptors — structural facts only, no translated text
    │   ├── learning.js                 # Learning domain: id, route ('learn'), layers, modeIds/levelIds/depthIds/formatIds, defaultConfig
    │   ├── code.js                     # Code domain: id, route ('code'), layers, option-set ids, defaultConfig
    │   └── index.js                    # DOMAINS map, DEFAULT_DOMAIN ('learning'), DOMAIN_ROUTES (route→id), getDomain(id) with fallback
    │
    ├── data/                         # Pure data — module definitions. NO functions/logic allowed in these files.
    │   ├── modules_en.json             # Learning domain modules, English (35 modules)
    │   ├── modules_tr.json             # Learning domain modules, Turkish — same id set, same order as modules_en.json
    │   ├── modules_code_en.json        # Code domain modules, English (32 modules)
    │   └── modules_code_tr.json        # Code domain modules, Turkish — same id set, same order as modules_code_en.json
    │
    ├── engine/                       # Business logic: dependency graph, suggestions, presets. Never touches the DOM.
    │   ├── moduleRegistry.js           # getModuleRegistry(domain, lang) / getModuleById(id, domain, lang) — reads data/*.json
    │   ├── dependencyResolver.js       # DependencyGraph class (resolveDependencies = transitive closure, topologicalSort = DAG sort);
    │   │                                #   graphs cached per "domain:lang" key in a Map
    │   ├── intelligenceLayer.js        # getSuggestions(config, selectedModules) → [{id, reasonKey}]; RULES_BY_DOMAIN keeps
    │   │                                #   Learning/Code suggestion rules separate since module ids aren't shared across domains
    │   └── presetEngine.js             # PRESETS_BY_DOMAIN[domain][presetId] = {group, forceModules, override, injectRules};
    │                                    #   getPresets(domain) / applyPreset(presetId, domain)
    │
    ├── compiler/                     # Turns resolved state into the final prompt string. Domain-agnostic pipeline.
    │   ├── structureBuilder.js         # buildPromptStructure(state, sortedModules) → the 7-block object
    │   │                                #   ([ROLE][GOAL][CONTEXT][ACTIVE MODULES][INSTRUCTIONS][OUTPUT FORMAT][CONSTRAINTS/SAFETY]),
    │   │                                #   pulling all label/persona/instruction text from COMPILER_TEXTS[domain][lang]
    │   └── finalPromptAssembler.js     # assembleFinalPrompt(state) — sorts deps, builds structure, concatenates to a string;
    │                                    #   analyzePromptComplexity(state) — same pipeline, returns char/token/complexity stats
    │                                    #   for PreviewPanel without mutating state
    │
    ├── store/
    │   └── engineState.js            # THE single Zustand store (persist middleware). See "State shape" below.
    │
    ├── locales/                      # All user-facing / prompt-facing text. Two files because one renders in JSX,
    │   │                              #   the other is spliced into generated prompt text.
    │   ├── i18n.js                     # UI strings. i18n[lang] = shared top-level chrome (buttons, toasts, tour) +
    │   │                                #   domains: { learning: {...}, code: {...} } (titles, option labels/descriptions,
    │   │                                #   preset names/descriptions/groups, module category titles, suggestion reasons).
    │   │                                #   getTranslation(lang, domain) shallow-merges shared + domain-specific.
    │   └── compilerTexts.js            # COMPILER_TEXTS[domain][lang] = { mod, derinlik, format, labels, contextLabels,
    │                                    #   goalTemplate, constraintsBase, monologueText } — text injected into the
    │                                    #   compiled PROMPT itself (not the UI), read only by structureBuilder.js
    │
    ├── utils/                        # Cross-cutting helpers, no React/Zustand imports.
    │   ├── aiRouter.js                  # AI_STRATEGIES per provider (ChatGPT/Claude/Perplexity/Gemini); copyToClipboard();
    │   │                                #   openInAI() — 4000-char URL-length guard: long prompts open the bare chat URL
    │   │                                #   and copy to clipboard instead of a GET param (avoids URL-limit crashes/popup blockers)
    │   ├── domainRoute.js               # pathToDomain(pathname) / pushDomainRoute(route) — thin History API wrapper for
    │   │                                #   /learn ↔ /code, no router library
    │   └── statePayload.js              # Shared serialization shape for saved recipes, share links, and JSON export/import:
    │                                    #   serializeState(state, {includeTopic}), sanitizePayload(raw, lang) — NEVER throws,
    │                                    #   always returns a payload safe to apply; strips unknown module ids and invalid
    │                                    #   option values; encodePayloadToParam/decodePayloadFromParam (base64 JSON in a URL param)
    │
    └── ui/                            # Pure rendering layer. Reads Zustand state, calls store actions, zero business logic.
        ├── Header.jsx                    # Title/subtitle, Learn|Code domain pill switcher, tour/lang/theme toggle buttons
        ├── ConfigPanel.jsx               # Level/Mode/Depth/Format <select>s, driven by the active domain's option-set ids
        │                                 #   (domain.levelIds/modeIds/depthIds/formatIds) — never a hardcoded list; monologue
        │                                 #   and auto-resolve-deps toggles; hover tooltips per option (levelDescs/modeDescs/etc.)
        ├── PresetBar.jsx                 # Renders getPresets(domain) grouped by their `group` field under labeled headers
        │                                 #   (t.presetGroups), each button showing a hover tooltip from t.presetDescriptions
        │                                 #   (reuses the .module-tooltip CSS component)
        ├── RecipesPanel.jsx              # Save-current-setup / list / load / delete saved recipes (localStorage-only, no backend)
        ├── ModuleGrid.jsx                # Renders the active domain's modules into category columns (getDomain(domain).layers,
        │                                 #   NOT hardcoded), CSS custom property --module-columns driving the grid's column
        │                                 #   count; per-module hover tooltip (name/explain/requires); renders Intelligence
        │                                 #   Layer suggestions and dependency-auto-resolve hints; shows an empty-state hint
        │                                 #   pointing at PresetBar when zero modules are selected
        ├── TopicInput.jsx                # "Topic to learn" / "Domain you're proficient in" free-text inputs (konu/alan)
        ├── ActionBar.jsx                 # Reset / Generate / Copy, 4 AI provider buttons (via aiRouter), and
        │                                 #   Share / Export / Import (via statePayload) — see "Recipes & Sharing" below
        ├── PreviewPanel.jsx              # Shows the generated prompt + live stats (module count, layers used, complexity
        │                                 #   score, token estimate) via analyzePromptComplexity(); URL-length warning banner
        ├── Toast.jsx                     # Lightweight, dependency-free toast notification (success/warn styling)
        ├── OnboardingTour.jsx            # Spotlight-driven first-run tour; steps come from t.tourSteps (domain-scoped)
        └── ErrorBoundary.jsx             # Class component catching render errors so one broken module doesn't blank the whole app
```

---

## ⚙️ `App.jsx` in detail

`App.jsx` is the composition root. It does four things, each in its own `useEffect`:

1. **Mount-time URL handling** — checks `?share=` first (a shared/exported setup takes priority over
   the plain pathname sync: decode → `sanitizePayload` → `applySharedState`, which also pushes the
   matching route). The `?share=` param is stripped from the URL *before* attempting to decode it, so
   a corrupt param never gets stuck re-failing on reload. If there's no share param, it falls back to
   syncing `config.domain` from the current pathname (`pathToDomain`), or normalizes the URL to the
   current domain's route if the path doesn't match a known one.
2. **`popstate` handling** — browser back/forward also switches `config.domain` to match the URL.
3. **First-run tour** — starts `OnboardingTour` on desktop if `config.tourCompleted` is false.
4. **Theme sync** — writes `data-theme="light|dark"` on `<html>`, following the OS preference live when
   `config.theme === 'system'`.

Layout: `Header` → `ErrorBoundary`-wrapped 3-column grid (`ConfigPanel` sidebar / `PresetBar` +
`RecipesPanel` + `ModuleGrid` main / `TopicInput` + `ActionBar` + `PreviewPanel` right sidebar) →
toast stack → `OnboardingTour` overlay.

---

## 🗄️ State shape (`src/store/engineState.js`)

A single Zustand store, `persist`-wrapped (`localStorage` key `learning-os-engine-storage`).

```js
{
  config: {
    domain,                          // 'learning' | 'code' — selects descriptor, registry, compiler texts, i18n bundle
    konu, alan,                      // topic text, "domain you're proficient in" text
    seviye, mod, derinlik, format,   // option-set values; ids are domain-specific (see src/domains/*.js)
    monolog, autoResolveDeps,        // booleans
    theme, lang, tourCompleted       // UI environment — deliberately never shared/exported (see statePayload.js)
  },
  selectedModules: [],               // array of module ids (current domain's vocabulary)
  activePreset: null,                // preset id, or null once the user manually edits selection (breaks preset "purity")
  injectedRules: [],                 // extra constraint lines a preset injected
  generatedPrompt: '',
  dependencyHints: [],               // "auto-resolved X because Y" strings shown transiently
  showTour: false,
  savedRecipes: []                   // sibling of `config`, not inside it — setDomain()/clearAll() never touch it
}
```

Config keys use **Turkish canonical vocabulary** (`konu`, `alan`, `seviye`, `mod`, `derinlik`, `format`,
`monolog`, `autoResolveDeps`) regardless of `config.lang` — this is an internal implementation detail,
independent of which language the UI displays.

Only `config` and `savedRecipes` are persisted (`partialize`); everything else is session-only. A
`migrate` step backfills `config.domain = 'learning'` for pre-multi-domain persisted blobs.

Key actions:
- **`toggleModule` / `setModules`** — mutate `selectedModules`, run `resolveDependencies` if
  `autoResolveDeps` is on, and clear `activePreset` (any manual edit breaks preset purity).
- **`setPreset(presetId)`** — replaces `selectedModules` with the preset's `forceModules` (still passed
  through dependency resolution), merges `override` into `config`, stores `injectRules`.
- **`setDomain(domainId)`** — the *only* action that resets selection state: keeps
  `konu/alan/lang/theme/monolog/autoResolveDeps`, resets `seviye/mod/derinlik/format` to the target
  domain's `defaultConfig`, clears `selectedModules/activePreset/injectedRules/generatedPrompt/
  dependencyHints`, and pushes the matching URL route. This is deliberate: it's what makes "Learn ↔
  Code" a clean switch instead of carrying over a nonsensical module selection.
- **`saveRecipe` / `loadRecipe` / `deleteRecipe`** and **`applySharedState`** — the recipes/sharing
  actions. They deliberately **do not call `setDomain`**: `setDomain`'s entire purpose is to *wipe*
  state on a manual switch, which is the opposite of "restore a saved/shared setup." Each calls
  `pushDomainRoute` itself so the URL still matches after loading.

---

## 🔗 Prompt compilation pipeline

`assembleFinalPrompt(state)` (`src/compiler/finalPromptAssembler.js`) is the single entry point:

1. **`sortDependencies(selectedModules, domain, lang)`** (`dependencyResolver.js`) — topologically
   sorts the selection so prerequisites render before dependents. Throws on a circular dependency.
2. **`buildPromptStructure(state, sortedModules)`** (`structureBuilder.js`) — assembles an ordered
   object with 7 keys: `[ROLE]`, `[GOAL]`, `[CONTEXT]`, `[ACTIVE MODULES]`, `[INSTRUCTIONS]`,
   `[OUTPUT FORMAT]`, `[CONSTRAINTS / SAFETY]`. Every label and every piece of persona/instruction text
   comes from `COMPILER_TEXTS[domain][lang]` — this function has zero per-domain branching itself.
3. The blocks are concatenated (`"LABEL\ncontent\n\n"` per block) into the final string.

`analyzePromptComplexity(state)` runs the identical pipeline (steps 1–2) to derive character count,
a ~4-chars-per-token estimate, and a `complexityScore` for `PreviewPanel`, without mutating state or
writing to `generatedPrompt`.

---

## 🧭 Multi-Domain Architecture

Both domains share one 7-block compiler skeleton and one engine pipeline; only the *content* feeding
them is domain-sourced. To add a domain:

| What | Where |
|---|---|
| Structural shape (id, route, layers, option-set ids, defaultConfig) | new file in `src/domains/`, registered in `src/domains/index.js` |
| Module data (bilingual, parallel arrays) | new `src/data/modules_<domain>_{en,tr}.json` pair |
| UI strings, preset names/descriptions/groups, suggestion reasons | `i18n[lang].domains.<domain>` in `src/locales/i18n.js` |
| Prompt-injected text (persona, goal template, base constraints) | `COMPILER_TEXTS.<domain>` in `src/locales/compilerTexts.js` |
| Presets | `PRESETS_BY_DOMAIN.<domain>` in `src/engine/presetEngine.js` |

No change is needed in `src/ui/`, `src/engine/dependencyResolver.js`, `src/engine/moduleRegistry.js`,
or `src/compiler/` — all of them already take `domain` as a parameter and read from the tables above.

**Validation gap to know about:** `scripts/validate-modules.mjs` only validates the module data files
(TR/EN parity, required fields, valid `layer`, non-broken `requires`) — it does **not** look inside
`presetEngine.js`. A preset's `forceModules` id that doesn't exist in that domain's registry, or an
`override` value outside that domain's option-set vocabulary, will not fail `npm run validate` or
`npm run lint`; it will silently produce a broken or wrong prompt at runtime. Check new presets by hand
(or a throwaway script) against `getModuleRegistry(domain, lang)` and the domain's `modeIds/levelIds/
depthIds/formatIds` before shipping them.

---

## 💾 Recipes, Sharing, Export/Import

All three features share one serialization shape (`src/utils/statePayload.js`), differing only in
where the payload ends up:

| Feature | Storage | Includes `konu`/`alan`? | Entry point |
|---|---|---|---|
| Saved Recipe | `savedRecipes` in `localStorage` | No — a reusable template | `RecipesPanel.jsx` → `saveRecipe`/`loadRecipe` |
| Share Link | `?share=<base64 JSON>` URL param | Yes — a frozen specific setup | `ActionBar.jsx` → `handleShare` / `App.jsx` mount effect |
| JSON Export/Import | Downloaded `.json` file | Yes | `ActionBar.jsx` → `handleExport`/`handleImportFile` |

`theme`, `lang`, and `tourCompleted` are **never** included in any payload — they're the *recipient's*
environment, not part of a shared setup.

`sanitizePayload(raw, lang)` is the safety net for all state that came from outside the current
session (a stale share link, a hand-edited export, a recipe referencing a since-removed module id): it
never throws, always resolves an unknown/invalid `domain` to the fallback domain, filters
`selectedModules` down to ids that actually exist in that domain's registry, and falls back any
invalid `mod`/`seviye`/`derinlik`/`format`/`activePreset` to that domain's defaults.

---

## 🎨 Theming & CSS

Pure CSS, no Tailwind/styled-components. `index.css` defines light/dark custom properties, toggled via
`data-theme` on `<html>` (set by `App.jsx`'s theme effect). Notable patterns:
- `.categories-container`'s `grid-template-columns` reads a CSS custom property
  (`--module-columns`, set inline by `ModuleGrid.jsx` from `getDomain(domain).layers.length`) instead
  of a hardcoded column count, so a domain with a different number of layers doesn't break the grid.
  Mobile/tablet breakpoints still override it with a literal column count by design (predictability on
  small screens matters more there than domain-generality).
- `.module-tooltip` / `.tooltip-title` / `.tooltip-explain` is a reusable hover-tooltip component,
  originally built for module cards and reused as-is by `PresetBar.jsx`'s preset tooltips.

---

## 🚀 Build, Lint, Validate

```bash
npm run dev        # Vite dev server
npm run build       # production build (dist/)
npm run preview     # preview the production build
npm run lint         # eslint over the whole repo
npm run validate    # scripts/validate-modules.mjs — module data integrity, per domain
```

There is no test runner configured. `npm run validate` is the closest thing to a correctness check for
data changes — always run it after touching any `src/data/modules_*.json` file. Deployment is via
Vercel's Git integration (`vercel.json` SPA rewrite): every push to `master` triggers a production
build automatically.

---

## 📜 Recent Changes

A running log of notable work, most recent first. See `git log` for full commit bodies.

- **`652ba27` — Add 5 new presets, preset tooltips, grouping, and empty-state hint.**
  Code domain gained *Test Strategy*, *Performance*, *Legacy Modernization*; Learning gained *Compare &
  Decide* and *Interview Prep* (12 presets per domain now). Every preset carries a structural `group`
  (Code: build / review-harden / understand; Learning: understand / analyze / apply) so `PresetBar`
  clusters them under labeled headers instead of a flat button row. Added `presetDescriptions` (i18n,
  both languages) surfaced as hover tooltips, reusing the module-card tooltip component. `ModuleGrid`
  now shows an empty-state hint pointing at presets when zero modules are selected.
- **`a47e2bd` — Add Security Review preset for the Code domain.**
  Bundles the three new security-design modules with the pre-existing `security`/`supply-chain`
  modules into one preset (`mod: security`, `seviye: hardened`).
- **`23d7095` — Add 3 security-design Code modules, fix module-card text overflow.**
  New modules: *Threat Modeling (STRIDE)*, *Authentication & Authorization Design* (design layer),
  *Container & Infrastructure Security* (harden layer) — 32 modules total in the Code domain now. Also
  fixed long module names overflowing their grid cell (`overflow-wrap: break-word`) and made
  `.categories-container`'s column count a CSS custom property instead of a hardcoded `5`.
- **`47ae564` — Deepen Learning and Code domains (package "A").**
  Gave `intelligenceLayer.js` suggestions a `reasonKey` + human-readable "why" text (i18n, per domain
  per language) instead of one generic message. Added 5 Code modules (concurrency, observability,
  cicd, supply-chain, a11y). Fixed `structureBuilder.js`'s `[CONTEXT]` block always printing English
  labels regardless of `lang`.
- **`1fc52c2` — Add saved recipes, shareable links, and JSON export/import (package "B").**
  Introduced the whole Recipes/Sharing feature set described above: `statePayload.js`,
  `RecipesPanel.jsx`, and the Share/Export/Import row in `ActionBar.jsx`.
- **`fc5c618` — Add Code domain: second equal domain alongside Learning.**
  The multi-domain architecture itself: `src/domains/`, domain-parameterized engine/compiler,
  `domainRoute.js`, the `/learn` ↔ `/code` pill switcher, and the initial 24-module Code dataset.

All of the above landed on `master` and is live in production (Vercel, auto-deployed on push).
