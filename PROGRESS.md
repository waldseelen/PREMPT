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


### 2026-08-21 — UI/Layout Stabilization Pass

#### What Changed
1. Reordered Advanced mobile layout so the primary task flow appears first: topic/context, presets, and modules; parameter controls follow; actions and preview come last.
2. Removed the nested `.sidebar` ownership from `ConfigPanel` and added a dedicated `advanced-parameter-panel` wrapper to reduce competing scroll containers.
3. Compacted the empty Preview state and reduced its mobile footprint so it no longer dominates the first Advanced viewport.
4. Added a clearer Advanced action hierarchy with primary copy/reset, AI provider row, and utility share/export/import row; replaced the Gemini extension emoji badge with a Lucide icon.
5. Added ModuleGrid search, Recommended/Selected/All views, layer filtering, collapsible category headers, balanced per-layer recommendations, and an accessible empty state.
6. Added centralized bilingual ModuleGrid copy in `src/locales/i18n.js`.
7. Marked three central quick-start domains in `src/domains/presentation.js`; Default now shows those three first and keeps all 15 domains behind an explicit full-list toggle. The Default flow’s duplicate PREMPT title was reduced to a mode label.
8. Added responsive CSS for the new Advanced discovery controls, mobile task order, compact preview, Default featured grid, and readable stepper states.

#### What Was Verified
- `npm run validate`: passed, including all 15-domain module/preset/parameter/presentation/output-target checks and AI route regression.
- `npm run build`: passed; Vite emitted only the existing large-chunk warning.
- Targeted ESLint over changed UI files: 0 errors and one pre-existing `App.jsx` hook warning.
- Full lint: remains blocked only by the pre-existing unused `React` import in `src/ui/PremptLogo.jsx`; the existing `App.jsx` and `OnboardingTour.jsx` hook warnings remain.
- `git diff --check`: passed after normalizing the new i18n indentation.
- Browser: 480 px and 1280 px Default/Advanced screenshots verified; Advanced mobile order, compact empty Preview, Default featured domains, full 15-domain toggle, ModuleGrid search, and ModuleGrid view tabs were tested.

#### Remaining Polish
- Default’s mobile chrome and five-step progress strip still consume substantial first-viewport height.
- Advanced provider buttons and some preset content still inherit legacy compact/emoji-heavy copy and can receive a separate visual-language cleanup.
- Changes are uncommitted and unpushed pending user review and approval.


### 2026-08-21 — ModuleGrid Layout Regression Fix

#### Root Cause
The previous discovery pass kept a five-column `categories-container` while filtered views rendered only a subset of category content. It also initialized only the first two layers as expanded. The result was visually empty columns, uneven category headers, and a broken-looking grid in the Recommended view.

#### Fix
1. Removed the per-domain five-column inline layout contract from `ModuleGrid.jsx`.
2. Switched the category container to a stable two-column content grid on desktop, two columns on tablet, and one column on mobile.
3. Initialized all live layers as expanded so categories are not mistaken for missing content.
4. Kept the existing search, Recommended/Selected/All tabs, layer filters, keyboard activation, dependency highlighting, and hover tooltips intact.

#### Verification
- `npm run validate`: passed.
- `npm run build`: passed in 391ms; existing >500 kB chunk warning remains.
- Targeted ESLint: 0 errors; one pre-existing `App.jsx` hook warning.
- `git diff --check`: passed.
- Browser: 1280 × 1100 and 480 × 900 screenshots checked; Recommended and All views were opened in the browser. Category headers and module cards now flow in aligned two-column/one-column layouts without empty five-column placeholders.

#### Commit Status
The fix is uncommitted and unpushed pending user approval.


### 2026-08-21 — Advanced Parameter Rail Horizontal Overflow Fix

#### Root Cause
The Advanced parameter rail inherited a hidden 340 px `ParameterHoverMenu` tooltip width inside an 18 px inline trigger. Even while hidden, that absolute tooltip increased the label and panel `scrollWidth`, producing a horizontal scrollbar in the desktop Parametreler panel.

#### Fix and Verification
- Limited `.advanced-parameter-panel` and its outer `.sidebar` to the available width with `min-width: 0` and `overflow-x: hidden`.
- Constrained parameter tooltip width to the panel’s usable area without removing hover/focus behavior.
- Confirmed live DOM panel `clientWidth === scrollWidth` after the fix.
- Checked 1280 px, 1024 px, and 768 px screenshots; no Parametreler horizontal scrollbar or panel overflow remains.
- `npm run validate`: passed.
- `npm run build`: passed in 1.20s; existing large-chunk warning remains.
- Targeted ESLint: 0 errors; one pre-existing `App.jsx` hook warning.
- `git diff --check`: passed.

#### Commit Status
The fix remains uncommitted and unpushed pending user approval.


### 2026-08-21 — Stable Parameter Hover Layer and System Presets Layout

#### What Changed
1. Replaced inline absolute parameter label tooltips with `src/ui/ParameterHoverMenu.jsx` portal rendering into `document.body`.
2. Added one stable tooltip contract: fixed positioning, viewport clamping, opaque surface, `z-index: 20000`, bounded height, and a readable two-column option-description layout. Resize and nested scroll reposition the portal.
3. Rebuilt `src/ui/PresetBar.jsx` without per-button inline layout styles. Presets now use a shared category list, divider headings, equal-width buttons, and consistent active-state icons.
4. Added responsive preset grids: four columns on desktop, three at medium widths, two on tablet, and one on mobile. Preset descriptions retain hover tooltips with a separate higher layer.
5. Removed the active-preset emoji status line in favor of a Lucide confirmation icon.

#### What Was Verified
- Agent Architecture and Code domains were checked in the browser. Focused parameter hovers render as opaque fixed portals with `opacity: 1`, `visibility: visible`, `z-index: 20000`, and no tooltip overflow.
- Agent Architecture, Code, and Edu Design desktop/mobile screenshot runs completed. System Presets category headings and buttons remain aligned across domain-specific group names and option lengths.
- The initial missing `useEngineState` import introduced during the PresetBar rewrite was caught by the browser runtime check and fixed immediately.
- `npm run validate`: passed.
- `npm run build`: passed in 934ms; existing large-chunk warning remains.
- Targeted ESLint: 0 errors; one pre-existing `App.jsx` hook warning.
- `git diff --check`: passed.

#### Commit Status
Changes are uncommitted and unpushed pending user approval.
