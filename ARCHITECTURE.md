# 🏛️ PREMPT — Architecture Reference

PREMPT ("Pre-empt bad AI answers before they happen") is a client-side-only React 19 + Vite application. There is **no backend**:
all state lives in the browser (`localStorage` via Zustand's `persist` middleware), and every hand-off to an external AI tool happens either through a URL query parameter or a clipboard copy.

The application compiles a set of user-selected **modules** into one large, structured prompt. It serves a 15-domain parametric prompt engine powered by a **Unified Domain Specification Architecture** (`src/domains/specs/`).

---

## 📌 Unified 15-Domain Spec Architecture & Governance

1. **Domain-Specific Encapsulation (`src/domains/specs/<domainId>Spec.js`):**
   Every domain's UI labels, option sets, prompt compilation headers, and 12 custom presets are encapsulated in one spec file (`src/domains/specs/<domainId>Spec.js`). Parameter option explanations are maintained in the centralized `src/domains/parameterDescriptions.js` contract and validated against each spec's option ids.
2. **Centralized Governance (`src/domains/index.js`):**
   Registration, route mapping (`DOMAIN_ROUTES`), and global fallback of all 15 domains is handled from a single entry point (`src/domains/index.js`).
3. **15 Domains x 12 Presets (180 Total Presets):**
   Every domain contains 12 handcrafted, domain-specific presets with real titles, bilingual descriptions, category icons, `forceModules`, and parameter locks.
4. **Two UI Modes with Progressive Disclosure:**
   The default entry is a mobile-oriented, five-step `DefaultFlow` (domain → recommended preset → user need → parameters → output). It keeps the 15 domains, parameter explanations, and AI actions discoverable without exposing the full module surface at once. The `Advanced` mode preserves the complete workspace: `TopicInput`, `PresetBar`, `ModuleGrid`, `ConfigPanel`, `ActionBar`, and `PreviewPanel`, with the 5-group x 3-domain horizontal navigation bar in the header.

The system enforces a **strict one-way dependency flow**:

```
ui/  →  store/  →  engine/  →  compiler/  →  data/
                       ↑
                   utils/, locales/  (cross-cutting, read by store/engine/compiler/ui)
```

`src/ui/` never computes prompt text, resolves dependencies, or mutates state directly — it only reads Zustand state and calls store actions. All "thinking" (dependency resolution, suggestions, prompt assembly, presets) lives in `src/engine/` and `src/compiler/`.

### Central content ownership

| Concern | Canonical owner | Consumers |
| --- | --- | --- |
| Domain registration, routes, option ids, labels, compiler headers, presets | `src/domains/index.js` and `src/domains/specs/*Spec.js` | Store, engine, compiler, UI |
| Parameter option explanations | `src/domains/parameterDescriptions.js` | `ConfigPanel` → `ParameterSelect`, `ParameterHoverMenu` |
| Domain navigation groups, theme tokens, icon ids | `src/domains/presentation.js`, `src/config/theme.js`, and `src/ui/iconRegistry.js` | `DomainSwitcher`, `Header` |
| Module names, TR/EN descriptions, explanations, prompts, dependencies | `src/data/modules_<domain>_{tr,en}.json` | `moduleRegistry`, `ModuleGrid`, compiler |
| Module hover view-model assembly | `src/ui/moduleHover.js` | `ModuleGrid` |
| Preset lookup and application | `src/engine/presetEngine.js` → domain spec presets | `PresetBar`, store, serialization |
| Suggestion rules | `src/engine/suggestionRules.js` | `intelligenceLayer`, `ModuleGrid` |
| Output target vocabulary and formatter dispatch | `src/config/outputTargets.js`, `src/compiler/formatterRegistry.js` | `ConfigPanel`, persistence, compiler |

---

## 📁 Full File Tree

```text
PREMPT/
├── AGENT.md                          # Pointer stub to CLAUDE.md
├── AGENTS.md                         # Pointer stub to CLAUDE.md
├── ARCHITECTURE.md                   # Structure, boundaries, data flow (this file)
├── CLAUDE.md                         # Canonical rulebook and engineering standards
├── MEMORY.md                         # Durable facts and non-obvious traps
├── PROGRESS.md                       # Sole owner of dates, session history & gate status (✅)
├── TASKS.md                          # Sole owner of work queue and checkboxes ([ ] / [x])
├── README.md                         # User-facing orientation & overview
├── package.json                      # Build & test scripts
├── vite.config.js                    # Vite build config
├── index.html                        # Root HTML mount point
│
├── scripts/
│   ├── validate-modules.mjs          # `npm run validate` — validates 15-domain modules (0 emojis, 0 DAG cycles), 180 presets, defaultConfig, moduleIconRegistry, parameter hover coverage, and output targets
│   ├── validate-ai-routes.mjs        # Validates AI URL encoding, query strategies, and clipboard fallback contracts
│   └── audit-parameter-hover.mjs    # Validates every advanced parameter label/option has TR/EN hover copy
│
└── src/
    ├── main.jsx                      # React root mount
    ├── App.jsx                       # Unified layout orchestrator & root ErrorBoundary
    ├── index.css                     # Primary styling, CSS custom properties, glassmorphism
    │
    ├── domains/                      # Declarative domain specifications & central registry
    │   ├── index.js                    # DOMAINS registry map, DEFAULT_DOMAIN ('learning'), getDomain(id)
    │   ├── presentation.js             # Central domain navigation groups, theme tokens, and icon ids
    │   ├── parameterDescriptions.js    # Bilingual hover explanations for every domain parameter option
    │   └── specs/                      # Unified domain spec files (15 domains)
    │       ├── types.js                # JSDoc type definitions for DomainSpec
    │       ├── learningSpec.js         # Learning spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── codeSpec.js             # Code spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── decisionSpec.js         # Decision spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── academicSpec.js         # Academic spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── philosophySpec.js       # Philosophy spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── problemsolvingSpec.js   # Problem Solving spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── agentarchSpec.js        # Agent Architecture spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── cyberSpec.js            # Cybersecurity spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── blogSpec.js             # Blog spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── imageSpec.js            # Image spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── languageSpec.js         # Language spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── edudesignSpec.js        # Edu Design spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── businessSpec.js         # Business spec (UI, optionSets, compilerTexts, 12 presets)
    │       ├── wellnessSpec.js         # Wellness spec (UI, optionSets, compilerTexts, 12 presets)
    │       └── travelSpec.js           # Travel spec (UI, optionSets, compilerTexts, 12 presets)
    │
    ├── data/                         # Pure module definitions (15 domain pairs: modules_<domain>_{tr,en}.json)
    ├── config/                       # Shared vocabularies used across UI, compiler, and persistence
    │   ├── outputTargets.js          # Single output-target id registry (markdown, claude-xml, openai-json, label-tags)
    │   └── theme.js                  # Theme ids, labels, and transition helper
    ├── engine/                       # Business logic (moduleRegistry, dependencyResolver, suggestionRules, presetEngine)
    ├── compiler/                     # Prompt compilation pipeline and formatter registry
    │   ├── finalPromptAssembler.js   # Dispatches block assembly to target formatters
    │   ├── structureBuilder.js       # Assembles 7-block prompt representation
    │   ├── promptComplexityAnalyzer.js# Computes token estimates (divisor 3.5) and URL length flags
    │   ├── formatterRegistry.js      # Registry mapping hedef ids to formatters
    │   └── formatters/               # Output target renderers
    │       ├── markdown.js           # Standard Markdown format
    │       ├── claudeXml.js          # Claude-optimized XML tag format
    │       ├── openaiJson.js         # OpenAI API system/user payload format
    │       └── labelTags.js          # Labeled tag block format
    ├── store/                        # Zustand store (engineState.js)
    ├── locales/                      # Shared UI strings (i18n.js) & compiler text adapter (compilerTexts.js)
    ├── utils/                        # aiRouter.js, domainRoute.js, statePayload.js
    └── ui/                           # Default wizard and Advanced workspace components
        ├── DefaultFlow.jsx           # Five-step default journey with progressive disclosure
        ├── Header.jsx                # Header title + optional DomainSwitcher + lang/theme controls
        ├── DomainSwitcher.jsx        # Horizontal navigation driven by domains/presentation.js
        ├── ParameterSelect.jsx       # Accessible option dropdown with hover/focus explanations
        ├── ParameterHoverMenu.jsx    # Advanced label hover/focus menu from centralized descriptions
        ├── PresetBar.jsx             # 12-preset per domain rendering with overflow protection
        ├── ModuleGrid.jsx            # Module card grid with centralized module hover model & Lucide icons
        ├── ConfigPanel.jsx           # Dynamic parameter selectors driven by domain specs and descriptions
        ├── TopicInput.jsx            # Topic and domain expertise inputs
        ├── ActionBar.jsx             # Reset, Copy, AI router buttons, Share/Export/Import & Recipes Modal
        ├── PreviewPanel.jsx          # Live prompt preview & token complexity stats
        ├── RecipesPanel.jsx          # Saved recipes management
        ├── PortalTooltip.jsx         # createPortal-based tooltip immune to parent overflow clipping
        ├── moduleIconRegistry.js     # 457-module Lucide icon mapping registry
        └── OnboardingTour.jsx        # Step-by-step interactive onboarding tour (on-demand via Help icon)
```

---

## 🗄️ State Shape (`src/store/engineState.js`)

Single Zustand store with `persist` middleware (`learning-os-engine-storage`):

```js
{
  config: {
    domain,                          // 'learning' | 'code' | 'decision' | ... (15 domains)
    gorunum,                         // 'default' | 'advanced'; UI preference persisted locally only
    konu, alan,                      // topic text, domain expertise text
    seviye, mod, derinlik, format,   // option-set values derived from domain spec
    hedef,                           // output target id ('markdown' | 'claude-xml' | 'openai-json' | 'label-tags')
    monolog, autoResolveDeps,        // booleans
    theme, lang, tourCompleted       // UI environment
  },
  view: 'workspace',                 // Single unified viewport ('workspace')
  selectedModules: [],               // array of module ids (session-only)
  activePreset: null,                // active preset id or null (session-only)
  injectedRules: [],                 // extra constraint lines (session-only)
  dependencyHints: [],               // transitive closure hints (session-only)
  showTour: false,                   // tour visibility (session-only)
  savedRecipes: []                   // saved recipe templates (persisted)
}
```

*Note: `generatedPrompt` is not stored in state; `PreviewPanel.jsx` derives the compiled prompt locally with `useMemo` via `assembleFinalPrompt(state)`.*

---

## 🔗 Prompt Compilation Pipeline

1. **`sortDependencies(selectedModules, domain, lang)`:** Topologically sorts selected modules according to dependency graphs.
2. **`buildPromptStructure(state, sortedModules)`:** Assembles a 7-block structured prompt object (`[ROLE]`, `[GOAL]`, `[CONTEXT]`, `[ACTIVE MODULES]`, `[INSTRUCTIONS]`, `[OUTPUT FORMAT]`, `[CONSTRAINTS/SAFETY]`).
3. **`assembleFinalPrompt(state)`:** Dispatches the structured prompt to the active output formatter (`src/compiler/formatters/` for `markdown`, `claude-xml`, `openai-json`, or `label-tags`) based on `config.hedef`.
4. **`analyzePromptComplexity(state)`:** Computes character count, token estimate (dividing character count by `3.5`), and complexity score for `PreviewPanel`.

---

## 🚀 Build & Validation Commands

```bash
npm run dev        # Starts Vite dev server (port 3000)
npm run build      # Compiles production bundle to dist/
npm run lint       # Runs ESLint code check
npm run validate   # Validates 15-domain modules, presets, parameter hover coverage, presentation, and output-target ids
```
