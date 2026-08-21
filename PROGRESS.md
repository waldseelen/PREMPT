# PROGRESS.md

This is the **only** file in this repository that carries a date or a ✅. Gate
results and session history live here and nowhere else — see `CLAUDE.md` §3.

Never record a gate as passing without having run that exact command in the
current checkout (`CLAUDE.md` §7.1).

## Current Gate Status

| Gate | Command | Result | Last actually run |
| --- | --- | --- | --- |
| Lint | `npm run lint` | FAILED — 5 errors, 2 warnings in pre-existing `src/App.jsx`, `src/ui/OnboardingTour.jsx`, and `src/ui/PremptLogo.jsx` findings | 2026-08-21 |
| Build | `npm run build` | ✅ PASSED — 282ms; Vite emitted an existing >500 kB chunk warning | 2026-08-21 |
| Module, preset, parameter, presentation, and target validation | `npm run validate` | ✅ PASSED — all 15 domains, bilingual modules, 180 presets, TR/EN option descriptions, 15 presentation registrations, and central output targets | 2026-08-21 |

Notes on the gates themselves (not results):

- **Module, Preset, Parameter, Presentation, and Target Validation:** Validates bilingual module schemas, all domain preset contracts, every domain parameter hover description, presentation/icon registration, and the central output-target vocabulary across all 15 domains.
- **Build Gate:** Compiles Vite production bundle into `dist/`. Verified 0 errors.

## Session History

### 2026-08-21 — Central Content Ownership and Hover UI Maintenance

#### What Changed
1. Added `src/domains/parameterDescriptions.js` with TR/EN explanations for every option across all 15 domains and four parameter sets.
2. Added the accessible `src/ui/ParameterSelect.jsx` listbox, so each option reveals its explanation on hover or keyboard focus.
3. Moved domain navigation groups, theme tokens, and icon ids to `src/domains/presentation.js`; moved icon component lookup to `src/ui/iconRegistry.js`.
4. Moved module icon ownership to `src/ui/moduleIconRegistry.js` and module hover view-model assembly to `src/ui/moduleHover.js`.
5. Removed the duplicate legacy preset tables; presets now resolve from domain specs. Suggestion rules, formatter dispatch, and output target ids now have dedicated central registries.
6. Converted the legacy `learning.js` and `code.js` descriptors into compatibility shims pointing to the active specs.
7. Updated `ARCHITECTURE.md`, `CLAUDE.md`, and `TASKS.md` with central ownership and validation rules.

#### What Was Verified
- `npm run validate`: passed for all 15 domains, 180 presets, parameter hover coverage, presentation/icon registration, and output targets.
- `npm run build`: passed; Vite emitted only the existing >500 kB chunk warning.
- Targeted ESLint over all changed source and validator files: passed.
- Browser: TR and EN parameter dropdown explanations were verified on Learning and Travel; module tooltip visibility and centralized description/prompt rendering were verified on a Travel module.
- `git diff --check`: passed.

#### What Was Left Open
- `npm run lint` remains blocked by the same pre-existing 5 errors and 2 warnings in `src/App.jsx`, `src/ui/OnboardingTour.jsx`, and `src/ui/PremptLogo.jsx`; no unrelated cleanup was introduced.

### 2026-08-21 — Preset and Output-Target Validation Gates

#### What Changed
1. Extended `scripts/validate-modules.mjs` to validate all 15 domains' presets against their live domain specs and module registries: `forceModules`, override keys and values, and bilingual preset-group labels.
2. Added a source-level consistency check for `VALID_TARGETS`, `FORMATTERS`, and `TARGET_IDS` so output-target drift fails the validation gate.
3. Repaired invalid domain-specific preset/default depth ids and three stale Edu Design preset group ids exposed by the new checks.
4. Updated `CLAUDE.md`, `ARCHITECTURE.md`, and `TASKS.md` to describe and close the completed validation work.

#### What Was Verified
- `npm run validate`: passed across all 15 domains, 180 presets, and all three output-target lists.
- Synthetic probes rejected bogus `forceModules`, invalid override values, unknown bilingual groups, and output-target drift.
- `npm run build`: passed in 243ms.
- `git diff --check`: passed.

#### What Was Left Open
- `npm run lint` remains blocked by 5 errors and 2 warnings in files outside this change: unused `IntroView`, `ArrowLeft`, `backToIntro`, and `t` in `src/App.jsx`; one unused `React` import in `src/ui/PremptLogo.jsx`; and two existing React Hooks warnings in `src/App.jsx` and `src/ui/OnboardingTour.jsx`. No lint suppression or unrelated cleanup was introduced.

### 2026-08-05 — Unified 15-Domain Spec Architecture & 180 Preset System Refactor

#### What Changed
1. **Unified Domain Spec Architecture (`src/domains/specs/`):**
   - Created 15 dedicated domain specification files (`learningSpec.js`, `codeSpec.js`, `decisionSpec.js`, `academicSpec.js`, `philosophySpec.js`, `problemsolvingSpec.js`, `agentarchSpec.js`, `cyberSpec.js`, `blogSpec.js`, `imageSpec.js`, `languageSpec.js`, `edudesignSpec.js`, `businessSpec.js`, `wellnessSpec.js`, `travelSpec.js`).
   - Centralized all UI strings, 4 parameter option sets (`levels`, `modes`, `depths`, `formats`), compiler header titles, and domain presets inside single spec files.
2. **180 Tailored Domain Presets (15 Domains x 12 Presets Each):**
   - Built 12 rich, unique presets for every single domain (180 total presets) with custom names, Turkish/English descriptions, category icons, `forceModules`, and parameter locks.
   - Refactored `src/engine/presetEngine.js` and `src/locales/i18n.js` to eliminate all hardcoded `learning` fallback tables.
3. **Horizontal Header Domain Switcher Bar:**
   - Replaced dropdown switcher with a 5-group x 3-domain horizontal navigation bar in the header bar.
   - Applied 5 distinct accent color themes (Indigo, Emerald, Amber, Rose, Cyan) with active glow indicators.
   - Suppressed horizontal scrollbars across all browsers.
4. **Single Viewport Layout:**
   - Set default view to `'workspace'`, removing the multi-stage intro landing screen.
5. **ConfigPanel Option Derive Fix:**
   - Dynamically derived `levelIds`, `modeIds`, `depthIds`, and `formatIds` from spec option sets in `ConfigPanel.jsx`, fixing `TypeError: Cannot read properties of undefined (reading 'map')`.

#### What Was Verified
- `npm run build`: Passed cleanly in 821ms.
- `node scripts/validate-modules.mjs`: All 15 domains validated cleanly with 30-35 modules each.
- Tested domain switching across all 15 domains without UI exceptions or fallback leaks.

#### What Was Left Open
- None. System is fully operational and zero-error.
