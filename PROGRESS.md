# PROGRESS.md

This is the **only** file in this repository that carries a date or a ✅. Gate
results and session history live here and nowhere else — see `CLAUDE.md` §3.

Never record a gate as passing without having run that exact command in the
current checkout (`CLAUDE.md` §7.1).

## Current Gate Status

| Gate | Command | Result | Last actually run |
| --- | --- | --- | --- |
| Lint | `npm run lint` | FAILED — 1 pre-existing `src/ui/PremptLogo.jsx` unused-import error and 2 pre-existing hook warnings in `src/App.jsx` / `src/ui/OnboardingTour.jsx`; changed UX files have 0 errors | 2026-08-21 |
| Build | `npm run build` | ✅ PASSED — 273ms; Vite emitted an existing >500 kB chunk warning | 2026-08-21 |
| Module, preset, parameter, presentation, hover, and target validation | `npm run validate` | ✅ PASSED — all 15 domains, bilingual modules, 180 presets, TR/EN option descriptions, 15 presentation registrations, all 15 × 4 advanced hover menus, and central output targets | 2026-08-21 |

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


### 2026-08-21 — Default / Advanced UX Flow and AI Route Stabilization

#### What Changed
1. Added `src/ui/DefaultFlow.jsx` with a five-step progressive-disclosure journey: domain selection, recommended preset, user need, parameters, and output.
2. Added bilingual flow copy to `src/locales/i18n.js`, with simpler Default parameter language and 15 domain purpose/example descriptions in `src/domains/presentation.js`.
3. Added browser-persisted `config.gorunum` (`default` | `advanced`) as a UI preference only. Share, recipe, and import payloads force the full workspace where appropriate and do not serialize the view preference.
4. Added responsive Default cards, sticky progress/actions, focus-equivalent descriptions, and `prefers-reduced-motion` CSS behavior.
5. Updated `src/utils/aiRouter.js`: ChatGPT, Perplexity, and Gemini use encoded provider-specific query routes; Claude intentionally opens the composer with clipboard fallback because a reliable public query-prefill contract was not verified.
6. Added `scripts/validate-ai-routes.mjs` and connected it to `npm run validate`.

#### Verification
- `npm run validate` passed: all 15 domain/preset/parameter/presentation/output-target checks and AI route regression checks passed.
- `npm run build` passed in approximately 297 ms.
- Targeted ESLint passed with 0 errors and one existing `App.jsx` hook warning.
- Browser smoke checks passed for the 15-domain Default screen, domain hover detail, Travel recommended presets, topic entry, simplified parameter labels, option explanation listbox, Default → Advanced transition, and the full Advanced workspace.
- ChatGPT `?q=` and Perplexity canonical `/search/new?q=` behavior were checked in the public browser. Claude remained login-gated/blank in the public session, so it uses explicit clipboard fallback.

#### Remaining Note
- Full `npm run lint` still fails only on the repository’s pre-existing unused `React` import in `src/ui/PremptLogo.jsx`; it also reports the existing `App.jsx` and `src/ui/OnboardingTour.jsx` hook warnings. No unrelated cleanup was added in this UX change.


### 2026-08-21 — Complete Advanced Parameter Hover Coverage

#### Root Cause
The centralized `parameterDescriptions.js` table already contained TR/EN copy for every live option id, but Advanced `ConfigPanel` label tooltips still read legacy `i18n` `levelDescs`, `modeDescs`, `depthDescs`, and `formatDescs` maps. Those maps were not present for all 15 domains, so domains such as Agent Architecture rendered empty label hover menus even though option-level descriptions existed.

#### What Changed
1. Added `src/ui/ParameterHoverMenu.jsx`, a shared Advanced label hover/focus menu that consumes the live option labels and centralized `getParameterDescription()` results.
2. Rewired all four Advanced ConfigPanel parameter labels to the centralized menu, removing the partial legacy `i18n` description dependency.
3. Added responsive width, upward/downward placement, readable option grids, and `:focus` support so the menu is usable by mouse and keyboard.
4. Added `scripts/audit-parameter-hover.mjs` to compare all 15 domain specs against centralized descriptions, reject missing TR/EN copy, detect stale ids, and detect generic fallback usage. `npm run validate` now runs this audit.
5. Updated `ARCHITECTURE.md` and `TASKS.md` with the new ownership and acceptance contract.

#### Verification
- The audit covered all 15 domains and all four parameter fields. It reported no missing descriptions, no missing language text, no stale ids, no fallback use, and no empty descriptions.
- Browser DOM scan opened all 15 domains and found four non-empty label menus per domain. Option counts matched the live specs: 60 label menus total with no empty descriptions.
- Agent Architecture was specifically checked: `Prompt Tipi` exposes `System Prompt`, `Custom GPT Talimatı`, and `Agent CoT Pipeline`; `Mimarlık Tarzı` exposes `Sıkı Kısıtlayıcı (Guardrail)`, `Chain-of-Thought (CoT)`, and `Few-Shot Eğitimci`, each with domain-specific explanations.
- Keyboard focus made the label tooltip visible (`opacity: 1`, `visibility: visible`), and a real click opened the `Prompt Tipi` listbox with all three option descriptions.
- Targeted ESLint passed with 0 errors.
- `npm run validate` passed, including module/preset/parameter/presentation/output-target checks, the new hover audit, and AI route regression.
- `npm run build` passed in 273 ms; the existing large-chunk warning remains.

#### Commit Status
These hover fixes are currently uncommitted. The previous commit `5b09dd9` remains intact; no new commit or push was made without explicit approval.
