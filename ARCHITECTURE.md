# 🏛️ PREMPT — Architecture Reference

PREMPT ("Pre-empt bad AI answers before they happen") is a client-side-only React 19 + Vite application. There is **no backend**:
all state lives in the browser (`localStorage` via Zustand's `persist` middleware), and every hand-off to an external AI tool happens either through a URL query parameter or a clipboard copy.

The application compiles a set of user-selected **modules** into one large, structured prompt. It serves a 15-domain parametric prompt engine powered by a **Unified Domain Specification Architecture** (`src/domains/specs/`).

---

## 📌 Unified 15-Domain Spec Architecture & Governance

1. **Domain-Specific Encapsulation (`src/domains/specs/<domainId>Spec.js`):**
   Every domain's UI labels, 4-parameter selector buttons, prompt compilation headers, and 12 custom presets are encapsulated into a single spec file (`src/domains/specs/<domainId>Spec.js`).
2. **Centralized Governance (`src/domains/index.js`):**
   Registration, route mapping (`DOMAIN_ROUTES`), and global fallback of all 15 domains is handled from a single entry point (`src/domains/index.js`).
3. **15 Domains x 12 Presets (180 Total Presets):**
   Every domain contains 12 handcrafted, domain-specific presets with real titles, bilingual descriptions, category icons, `forceModules`, and parameter locks.
4. **Single Viewport & Horizontal Navigation:**
   All controls (`TopicInput`, `PresetBar`, `ModuleGrid`, `ConfigPanel`, `ActionBar`, `PreviewPanel`) render in a single unified viewport with a 5-group x 3-domain horizontal navigation bar in the header bar.

The system enforces a **strict one-way dependency flow**:

```
ui/  →  store/  →  engine/  →  compiler/  →  data/
                       ↑
                   utils/, locales/  (cross-cutting, read by store/engine/compiler/ui)
```

`src/ui/` never computes prompt text, resolves dependencies, or mutates state directly — it only reads Zustand state and calls store actions. All "thinking" (dependency resolution, suggestions, prompt assembly, presets) lives in `src/engine/` and `src/compiler/`.

---

## 📁 Full File Tree

```text
PREMPT/
├── AGENT.md                          # Rules for AI coding agents working in this repo
├── ARCHITECTURE.md                   # This file
├── CLAUDE.md                         # Vendor-neutral agent rules & guidelines
├── MEMORY.md                         # Durable facts about codebase behavior
├── PROGRESS.md                       # Gate status and session history
├── TASKS.md                          # Active work queue
├── README.md                         # User-facing overview & sitemap
├── package.json                      # Build & test scripts
├── vite.config.js                    # Vite build config
├── index.html                        # Root HTML mount point
│
├── scripts/
│   └── validate-modules.mjs          # `npm run validate` — validates module JSON schemas across all 15 domains
│
└── src/
    ├── main.jsx                      # React root mount
    ├── App.jsx                       # Unified single viewport layout
    ├── index.css                     # Primary styling, CSS custom properties, glassmorphism, horizontal header bar
    │
    ├── domains/                      # Declarative domain specifications & central registry
    │   ├── index.js                    # DOMAINS registry map, DEFAULT_DOMAIN ('learning'), getDomain(id)
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
    ├── engine/                       # Business logic (moduleRegistry, dependencyResolver, intelligenceLayer, presetEngine)
    ├── compiler/                     # Prompt compilation pipeline (structureBuilder, finalPromptAssembler)
    ├── store/                        # Zustand store (engineState.js)
    ├── locales/                      # UI strings (i18n.js) & compiler text definitions (compilerTexts.js)
    ├── utils/                        # aiRouter.js, domainRoute.js, statePayload.js
    └── ui/                           # Single viewport UI components
        ├── Header.jsx                # Header title + DomainSwitcher bar + lang/theme controls
        ├── DomainSwitcher.jsx        # 5-group x 3-domain horizontal navigation bar
        ├── PresetBar.jsx             # 12-preset per domain rendering with overflow protection
        ├── ModuleGrid.jsx            # Module card grid with prompt injection preview tooltips
        ├── ConfigPanel.jsx           # Dynamic parameter selectors driven by domain specs
        ├── TopicInput.jsx            # Topic and domain expertise inputs
        ├── ActionBar.jsx             # Reset, Copy, AI router buttons, Share/Export/Import
        ├── PreviewPanel.jsx          # Live prompt preview & token complexity stats
        ├── RecipesPanel.jsx          # Saved recipes management
        └── OnboardingTour.jsx        # Step-by-step interactive onboarding tour
```

---

## 🗄️ State Shape (`src/store/engineState.js`)

Single Zustand store with `persist` middleware (`learning-os-engine-storage`):

```js
{
  config: {
    domain,                          // 'learning' | 'code' | 'decision' | ... (15 domains)
    konu, alan,                      // topic text, domain expertise text
    seviye, mod, derinlik, format,   // option-set values derived from domain spec
    monolog, autoResolveDeps,        // booleans
    theme, lang, tourCompleted       // UI environment
  },
  view: 'workspace',                 // Single unified viewport
  selectedModules: [],               // array of module ids
  activePreset: null,                // active preset id or null
  injectedRules: [],                 // extra constraint lines
  generatedPrompt: '',
  dependencyHints: [],               // transitive closure hints
  showTour: false,
  savedRecipes: []                   // saved recipe templates
}
```

---

## 🔗 Prompt Compilation Pipeline

1. **`sortDependencies(selectedModules, domain, lang)`:** Topologically sorts modules according to dependency graphs.
2. **`buildPromptStructure(state, sortedModules)`:** Assembles 7-block structured prompt object (`[ROLE]`, `[GOAL]`, `[CONTEXT]`, `[ACTIVE MODULES]`, `[INSTRUCTIONS]`, `[OUTPUT FORMAT]`, `[CONSTRAINTS/SAFETY]`).
3. **`assembleFinalPrompt(state)`:** Concatenates blocks into final output string.
4. **`analyzePromptComplexity(state)`:** Computes character count, token estimate, and complexity score for `PreviewPanel`.

---

## 🚀 Build & Validation Commands

```bash
npm run dev        # Starts Vite dev server (port 3000)
npm run build      # Compiles production bundle to dist/
npm run lint       # Runs ESLint code check
node scripts/validate-modules.mjs # Validates 15-domain module datasets
```
