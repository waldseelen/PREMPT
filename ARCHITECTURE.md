# 🏛️ Architecture Overview

PROMPTER is designed with a strict separation of concerns, ensuring that the UI remains a dumb renderer while the core logic is handled by a dedicated engine. The app serves two equal, parallel **domains** — Learning (deconstructing/understanding concepts) and Code (software-engineering prompting) — that share the same engine/compiler pipeline via domain descriptors; see [Multi-Domain Architecture](#-multi-domain-architecture) below.

## 📁 Directory Structure

```text
src/
 ├── ui/             # Pure UI rendering layer (Components, Pages, Modals)
 ├── engine/         # Prompt compilation and intelligence layer
 ├── compiler/       # Assembly of final prompts (DAG traversal, String interpolation)
 ├── data/           # Data-driven definitions (Modules, Presets) — per domain
 ├── domains/        # Declarative domain descriptors (layers, option-set ids, route, defaults)
 ├── store/          # Global state management (Zustand)
 ├── utils/          # Helpers (AI Routing, Clipboard, URL <-> domain routing)
 ├── locales/         # i18n.js (UI strings) + compilerTexts.js (prompt role/goal/constraint text), both domain-scoped
 ├── App.jsx         # Root component, Theme Controller & domain/URL sync
 └── index.css       # Core styling & Theme variables
```

## ⚙️ Core Layers

### 1. The Engine & Compiler (`src/engine/` & `src/compiler/`)
This is the brain of the application. It never touches the DOM.
- **Dependency Resolver**: Iterates recursively over the selected modules to find and inject required dependencies using Topological Sort.
- **Structure Builder**: Assembles the final string. It injects the system role, formatting rules, user depth/level parameters, internal monologue commands, and concatenates the selected module prompts in a deterministic order.
- **Intelligence Layer**: Uses a Declarative Rules Engine to suggest modules to the user based on their current configuration.

### 2. The Data Layer (`src/data/modules_{en,tr}.json` + `src/data/modules_code_{en,tr}.json`)
Modules live in parallel, bilingual JSON files — one pair per domain (Learning: `modules_en.json` /
`modules_tr.json`; Code: `modules_code_en.json` / `modules_code_tr.json`) — loaded via
`src/engine/moduleRegistry.js` (`getModuleRegistry(domain, lang)` / `getModuleById(id, domain, lang)`).
Each language pair must stay in sync: identical `id` set in identical order. `id` vocabularies are
independent between domains (no cross-domain checks). Modules are strictly data objects — no logic
is executed here.
```javascript
{
    id: 'mekanizma',
    icon: '⚙️',
    name: 'Mekanizma',
    desc: 'Girdi → Süreç → Çıktı',
    explain: 'Sistemin nasıl çalıştığını adım adım açıklar.',
    requires: ['ontoloji'], // Dependency definition
    prompt: `MEKANİZMA\nSistemin çalışma mekanizmasını...`,
    layer: 'mechanism'     // one of the active domain's layer ids (src/domains/*.js)
}
```
This data-driven approach means adding a new feature/module requires exactly zero changes to the UI or Engine logic.

**Validation:** run `npm run validate` (`scripts/validate-modules.mjs`) to guard against silent
drift — for each domain's file pair independently, it checks TR/EN parity (same ids, same order),
required fields, that `layer` is one of that domain's `src/domains/*.js` layer ids, and that every
`requires` entry points to an existing module within the same domain.

### 3. State Management (`src/store/engineState.js`)
Powered by **Zustand**.
- Holds the `config` object (Domain, Topic, Level, Mode, Depth, Format, Theme, Monologue, Auto-Resolve, Lang).
  `config.domain` selects which domain descriptor, module registry, compiler text bundle, and i18n
  strings are active (`'learning'` or `'code'`).
- Holds `selectedModules` array.
- `setDomain(domainId)` switches domains: keeps `konu`/`alan`/`lang`/`theme`/`monolog`/`autoResolveDeps`,
  resets `seviye`/`mod`/`derinlik`/`format` to the target domain's `defaultConfig`, clears
  `selectedModules`/`activePreset`/`generatedPrompt`/`dependencyHints`, and pushes the matching URL
  route (`/learn` or `/code`) via `src/utils/domainRoute.js`.
- Handled with the `persist` middleware (only `config` is persisted), synced to `localStorage`. A
  `migrate` step backfills `config.domain = 'learning'` for pre-multi-domain persisted state.

### 4. UI Layer (`src/ui/`)
- **`App.jsx`**: Acts as the layout wrapper, dynamically modifies the `<html data-theme="X">` attribute based on OS system preferences, and syncs the URL path (`/learn`, `/code`) to `config.domain` on mount and on `popstate` (browser back/forward) via `src/utils/domainRoute.js` — no router library, just the History API. Includes Error Boundaries to prevent unhandled graph errors.
- **`Header.jsx`**: Renders the Learn|Code domain pill switcher alongside the lang/theme controls.
- **`ModuleGrid.jsx`**: Renders the active domain's module data into interactive cards, grouped into the active domain's layer columns (`getDomain(config.domain).layers`) rather than a hardcoded list. Handles hover events to show requirements and tooltips.
- **`ConfigPanel.jsx` / `PresetBar.jsx`**: Render their `<select>` options / preset buttons from the active domain's descriptor (`modeIds`/`levelIds`/`depthIds`/`formatIds`) and preset registry (`getPresets(config.domain)`), not hardcoded lists.
- **`ActionBar.jsx`**: Triggers the engine compiler and talks to the AI Router.
- **`Toast.jsx`**: A custom, lightweight notification system.

## 🧭 Multi-Domain Architecture

PROMPTER compiles prompts for two domains through one unchanged 7-block compiler skeleton
(`[ROLE][GOAL][CONTEXT][ACTIVE MODULES][INSTRUCTIONS][OUTPUT FORMAT][CONSTRAINTS]`, built by
`src/compiler/structureBuilder.js`). Only the content feeding that skeleton is domain-sourced —
the pipeline itself has no per-domain branching.

- **`src/domains/{learning,code,index}.js`** — the single source of truth for each domain's shape:
  `id`, URL `route`, ordered `layers` (module category columns), the option-set vocabularies
  (`modeIds`/`levelIds`/`depthIds`/`formatIds`) shared between `ConfigPanel` `<select>`s and
  `COMPILER_TEXTS`, and `defaultConfig` applied on domain switch. `src/domains/index.js` exports
  `DOMAINS`, `DOMAIN_ROUTES` (route segment → domain id), and `getDomain(id)`. Adding a third domain
  means adding one descriptor file here plus its data/locale/preset entries below — no engine or UI
  code changes.
- **`src/data/modules_{en,tr}.json`** (Learning) / **`src/data/modules_code_{en,tr}.json`** (Code) —
  module data, loaded per-domain by `moduleRegistry.js`.
- **`src/locales/compilerTexts.js`** — `COMPILER_TEXTS[domain][lang]` supplies the `[ROLE]` persona
  text, `[GOAL]` template, depth/format instruction text, and base `[CONSTRAINTS]`, read by
  `structureBuilder.js`.
- **`src/locales/i18n.js`** — `i18n[lang].domains[domain]` holds everything UI-visible that varies by
  domain (titles, labels, option descriptions, preset names, module category titles); shared chrome
  (buttons, toasts, tour, footer) stays at the top level. `getTranslation(lang, domain)`
  shallow-merges the two.
- **`src/engine/presetEngine.js`** — `PRESETS_BY_DOMAIN[domain]` maps preset id to
  `{ forceModules, override, injectRules }`; `getPresets(domain)` / `applyPreset(presetId, domain)`.
- **`src/engine/moduleRegistry.js`** and **`src/engine/dependencyResolver.js`** — both take a
  `domain` parameter (registries and dependency graphs are cached per `"domain:lang"` key).
- **`src/utils/domainRoute.js`** — `pathToDomain(pathname)` and `pushDomainRoute(route)`, a thin
  wrapper over the plain History API (`pushState`/`popstate`) used for `/learn` ↔ `/code` — no
  router library.
- **`vercel.json`** — SPA rewrite (`/(.*) → /index.html`) so a hard refresh or deep link on `/code`
  doesn't 404 on Vercel's static host; Vite's dev server already falls back to `index.html`
  automatically, so this gap only shows up in production hosting.

## 🔗 AI Router (`src/utils/aiRouter.js`)
Handles the translation of the generated prompt into actionable endpoints using a Strategy Pattern:
- Generates GET parameterized URLs for Gemini, ChatGPT, Claude, and Perplexity using provider-specific strategies.
- Intercepts URLs that are too long, gracefully copying to the clipboard synchronously to bypass popup blockers, and opening the base chat interface.
