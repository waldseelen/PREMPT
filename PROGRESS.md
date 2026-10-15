# PROGRESS.md

This is the **only** file in this repository that carries a date or a ✅. Gate
results and session history live here and nowhere else — see `CLAUDE.md` §3.

Never record a gate as passing without having run that exact command in the
current checkout (`CLAUDE.md` §7.1).

## Current Gate Status

| Gate | Command | Result | Last actually run |
| --- | --- | --- | --- |
| Lint | `npm run lint` | ✅ PASSED — 0 errors, 0 warnings under `--max-warnings=0` across repository | 2026-10-15 |
| Build | `npm run build` | ✅ PASSED — 43s; all chunks under 500 kB with zero Vite chunk warnings | 2026-10-15 |
| Module, preset, parameter, presentation, hover, and target validation | `npm run validate` | ✅ PASSED — all 15 domains, bilingual modules, 180 presets (including preset.id === key parity), TR/EN option descriptions, 15 presentation registrations, compiler texts completeness, layer categories, and central output targets | 2026-10-15 |
| E2E Test Suite | `node scripts/test-e2e.mjs` | ✅ PASSED — 134/134 tests passing across Tiers 1-4 + Phase 16-17 suites with zero failures | 2026-10-15 |
| Challenger 2 Empirical Stress Test | `node scripts/test-challenger2-stress.mjs` | ✅ PASSED — 34/34 stress tests passing across Suites 1-4 with zero failures | 2026-10-15 |

Notes on the gates themselves (not results):

- **Module, Preset, Parameter, Presentation, and Target Validation:** Validates bilingual module schemas, all domain preset contracts (with duplicate detection and strict id === key parity), every domain parameter hover description, presentation/icon registration, compilerTexts completeness for all modes/formats, category translation coverage, and the central output-target vocabulary across all 15 domains.
- **Build Gate:** Compiles Vite production bundle into `dist/` with functional `manualChunks` code-splitting (`vendor-react`, `vendor-state`, `vendor-icons`, `domain-specs`, `modules-data`). Verified 0 errors and 0 chunk warnings.
- **E2E & Stress Test Gates:** `scripts/test-e2e.mjs` (116 tests) exercises functional workflows, edge cases, deep links, and persistence. `scripts/test-challenger2-stress.mjs` (34 tests) stresses preset eject purity across all 180 presets, URL bounds, DAG cycle resilience, and Rule 13 emoji cleanliness.

## Handoff — gelecek ajanlar için son durum

- **Yapılan:** Phase 16 (`16.1–16.9`, URL/state/payload bütünlüğü) ve Phase 17 (`17.1–17.8`, veri/bilingual/validator
  kapsamı) tamamlandı ve `[x]` işaretlendi. Detaylar aşağıdaki oturum kayıtlarında, bulgu kaynağı `bad.md`'de.
- **Kalan tek faz:** Phase 18 (UI/test/CSS/a11y/bakım borcu) — `TASKS.md`'de 10 açık madde (`18.1–18.10`), kaynağı
  `bad.md` Bölüm C. Yeni işe buradan başla; kapalı maddeleri yeniden açma.
- **Kapılar:** yukarıdaki tablo güncel — hepsi bu checkout'ta koşuldu ve yeşil (`validate` 0 error / 328 warning;
  warning'lerin tamamı envanterli kapsam listesi, detay `PROGRESS.md` Phase 17 kaydında).
- **Çalışma sözleşmesi:** biten her madde için kapıları koş (`lint`, `validate`, `test-e2e`, `stress`, `build`);
  sonucu buraya tek satır + tek tarihli oturum girişi olarak işle; kullanıcı metni değişirse TR+EN birlikte
  (`T1.12.3` parity testi kırılır yoksa); commit/push kullanıcı onaysız yapılmaz.

## Session History

### 2026-10-15 — Phase 17 data / bilingual / validator coverage (17.1–17.8, tamamı)

#### What Changed
1. **label-tags decision + vocab parity (17.3):** removed the unselectable 4th `label-tags` entry from
   `i18n[tr,en].targets` + `targetDescs` (only `src/` references; `ConfigPanel` renders from `OUTPUT_TARGETS`, no UI
   behavior change); `validateOutputTargets` now checks three-way parity `i18n.targets ↔ OUTPUT_TARGETS ↔
   FORMATTERS` (both language blocks, order-sensitive); stale `MEMORY.md` hedef-vocab item and `ARCHITECTURE.md`
   `labelTags.js` tree comment corrected.
2. **compilerTexts full coverage (17.4):** `validateCompilerTexts` now checks `derinlik.*` against the spec's own
   `optionSets.depths`, `labels`/`contextLabels` presence, non-empty `monologueText`, and TR/EN structural key parity
   for `mod`/`derinlik`/`format`/`labels`/`contextLabels` — read from the spec's own bundle, not the
   learning-merged `getCompilerTexts` output that masks gaps. Data was complete; gate stays green.
3. **Prompt-token allowlist (17.1):** `validateFile` errors on any `{{TOKEN}}` outside `{{KONU}}`/`{{ALAN}}` in
   `prompt`/`desc`/`explain`; fixed the one offender (`agentarch variable-ingestion-schema` TR+EN rephrased to
   name the variables without literal braces, meaning preserved).
4. **injectRules structural gate, warnings variant (17.2):** missing/empty array and `/^Apply \w+ domain rule for /`
   filler are validator **warnings** (180 flagged: 12 empty `edudesign` + 168 placeholders); present-but-malformed
   values stay errors. Full prose rewrite remains separate human content work (Rule 13). Gate stays green.
5. **Suggestion-gap visibility (17.5):** new `validateSuggestionCoverage` lists the 13 rule-less domains as warnings;
   `ModuleGrid` recommended tab shows a `noRulesHint` note (new TR/EN key) instead of implying engine output.
6. **Icon contract (17.6):** render-source contract restated in `moduleIconRegistry.js` header + validator header +
   `MEMORY.md` (JSON `icon` is inert); `validateModuleIconRegistry` reports 136 orphan mappings as warnings.
7. **Dead option-set branches (17.7):** removed `levelIds/modeIds/depthIds/formatIds` fallback branches from
   `statePayload.js`, `ConfigPanel.jsx`, and the missed third occurrence in `ParameterChipsBar.jsx`; `optionSets` is
   now the single vocabulary source in code and in `CLAUDE.md §5.1` / `MEMORY.md` wording.
8. **getIcon fallback (17.8):** unknown domain icon ids degrade to `Box` (same generic as module icons) instead of
   crashing `DomainSwitcher`; validator checks every `DOMAIN_ICON_IDS` value resolves in `ICONS` (15/15 clean).
9. **Tests:** `T17.2`–`T17.5` e2e (token allowlist file sweep, spec depth/labels/monologue per-domain check, getIcon
   fallback, exact 13-domain rule gap) alongside the earlier `T17.1` targets parity.

#### What Was Verified
- `npm run lint`: 0 errors, 0 warnings.
- `npm run validate`: passed across all 15 domains (0 errors, 328 warnings — all inventoried gap lists).
- `node scripts/test-e2e.mjs`: 134/134 passing (129 existing + 5 new).
- `node scripts/test-challenger2-stress.mjs`: 34/34 passing.
- `npm run build`: success, all chunks under 500 kB.

### 2026-10-15 — Phase 16 URL / State / Payload Integrity (16.1–16.9, tamamı)

#### Background
Development resumed with a full negative-findings pass: `TASKS.md` Phase 1–15 cleared (history kept in
`git log -- TASKS.md`), three parallel review agents swept state/payload/URL, bilingual-data/validator, and
UI/test-maintenance scopes, and the synthesis was recorded in `bad.md` (Sections A/B/C with severities).
`TASKS.md` Phase 16–18 (30 items) was derived from `bad.md` only. This session executed all of Phase 16.

#### What Changed
1. **URL override sanitization (16.1):** `App.jsx` mount effect now routes `?seviye/?mod/?derinlik/?format/?hedef/?konu/?alan`
   through the new `sanitizePayloadWithWarnings` (`src/utils/statePayload.js`, same contract as share/import);
   invalid `?domain/?preset` and unknown `?modules=` ids produce warning toasts instead of silent no-ops/fallbacks.
   New TR/EN strings: `toastUrlParamsFixed`, `toastUnknownPreset`, `toastUnknownModules`. Overrides intentionally do
   not eject `activePreset` (deep links carry `?preset=` + values together; ejecting would break preset round-trips).
2. **`hedef` URL round-trip (16.2):** URL-sync effect writes `?hedef=` when non-default and watches `config.hedef`;
   mount reads and validates it — the output target no longer silently drops out of copied URLs.
3. **Preset-rule contamination (16.3):** `serializeState`/`sanitizePayload` now carry `injectedRules` (optional field,
   capped at 2000 chars/line, deduped; legacy payloads sanitize to `[]`); `loadRecipe`/`applySharedState` restore the
   saved rule set instead of leaking the previous session's rules. `toggleModule`/`ejectPreset` preservation kept
   (locked by stress/e2e eject-purity tests); the visible side is a kept-rules badge (`ShieldCheck` +
   `injectedRules.length`) in `ActiveModuleBadgeRow.jsx` with TR/EN `keptRulesBadge` strings, reusing the
   `badge-preset-tag` style (no new CSS).
4. **Share integrity feedback (16.4):** `handleShare` shows `toastShareFail` when encoding yields `''` instead of
   copying a bare `?share=` link with a success toast; JSON import reports `toastImportWarnings` when values were
   corrected (`sanitizePayloadWithWarnings` warnings taxonomy: `unknown-domain`, `dropped-modules`, `invalid-option`,
   `invalid-preset`, `invalid-rules`; `sanitizePayload` keeps its old signature as a `.clean` wrapper, so no caller
   or test broke).
5. **Unknown module ids (16.5):** `setModules` filters unknown ids against the domain registry (valid ids unaffected);
   the `?modules=` path warns naming the dropped ids.
6. **`view`/`gorunum` unification (16.6):** removed the dead `view` field and `enterWorkspace`/`backToIntro`/`startManual`
   actions from `engineState.js` (zero callers; `Header` tour guard simplified to `startTour()`); `loadRecipe` and
   `applySharedState` no longer force `gorunum='advanced'` — the recipient's view preference is preserved via the
   existing `...state.config` spread; stale "Two-view flow" i18n comments corrected (dead `btnOpenWorkspace`/
   `btnStartManual`/`btnBackToIntro` keys left for Phase 18.9 cleanup).
7. **Complexity/target consistency (16.7):** `analyzePromptComplexity(state, { forceTarget })` added;
   `ActionBar` badge measures the markdown representation the AI buttons actually send under `openai-json`
   (previously it measured the JSON payload the user never sees).
8. **Copy-failure feedback (16.8):** `openInAI` accepts optional `onCopyError` (still `console.warn`s); both AI-button
   paths (`handleOpenAI`, Gemini) toast `toastCopyFail` on failure — critical for Claude, where clipboard is the only
   delivery channel. Signature is backward compatible (existing tests/callers unchanged).
9. **Cycle resilience (16.9):** new `withCycleFallback`/`safeSortDependencies` in `dependencyResolver.js`, adopted by
   both compile entry points (`assembleFinalPrompt`, `analyzePromptComplexity`); a corrupt `requires` cycle now
   degrades to registry order instead of crashing render through the app-level `ErrorBoundary`. `topologicalSort`'s
   throwing contract is preserved (stress test + validator rely on it).
10. **Tests:** 13 new `T16.x` tests in `scripts/test-e2e.mjs` — payload rule round-trip, legacy-payload `[]` default,
    warnings taxonomy, recipe rule-restore (stale-rule pollution case), unknown-id filtering, encode-failure `''`,
    hedef fallback, dead-view removal, gorunum preservation, forceTarget parity, copy-error callback (mocked failing
    clipboard), cycle fallback + healthy-data parity.

#### What Was Verified
- `npm run lint`: 0 errors, 0 warnings.
- `npm run validate`: passed across all 15 domains.
- `node scripts/test-e2e.mjs`: 129/129 passing (116 existing + 13 new).
- `node scripts/test-challenger2-stress.mjs`: 34/34 passing (eject-preservation contracts intact).
- `npm run build`: success, all chunks under 500 kB.
- Mid-session incidents, both repaired before gating: an edit briefly dropped `ejectPreset` (restored, covered by
  `T1.9.4`/stress eject tests) and duplicated `startTour` (caught by `npm run lint` `no-dupe-keys`, removed).

### 2026-09-03 — Progressive Unified Workspace Refactor & Preset Hardening (Phase 15, Milestone 1)

#### What Changed
1. **Progressive Unified Workspace Implementation (R1 - R4):**
   - **L0 Intent-First Core:** Replaced the rigid 5-step stepper in `DefaultFlow.jsx` with a single-viewport intent-driven workspace containing `TopicInput.jsx` (hero prompt/topic input with keyboard shortcuts), `HeroPresetSelector.jsx` (top 3 curated hero presets + categorized popover for the remaining 9 presets across all 15 domains), and `ActionBar.jsx` (immediate 1-click execution actions for ChatGPT, Claude, Perplexity, Gemini, Copy, with live token estimation and URL-safety length guards).
   - **L1 Contextual Tuning:** Added interactive parameter chips (`ParameterChip.jsx`, `ParameterChipsBar.jsx`) for `seviye`, `mod`, `derinlik`, `format`, and `hedef`, featuring accessible WAI-ARIA popovers sourcing descriptions from `parameterDescriptions.js` and dispatching live updates to canonical Turkish state keys.
   - **L2 Granular Inspector & Eject Mechanism:** Built `ActiveModuleBadgeRow.jsx` and `CollapsibleInspector.jsx` embedding the 457-module `ModuleGrid.jsx`, topological prerequisite auto-resolution toggle, active constraint rules (`injectedRules`), and token complexity metrics.
   - **Preset Eject / Remix Semantics:** Implemented `ejectPreset()` and preserved `injectedRules` on manual module customization (`toggleModule`, `setModules`) in `src/store/engineState.js`.
   - **Cockpit Mode Toggle:** Added `ModeTogglePill.jsx` to Header enabling instantaneous switching between Progressive Unified view and 3-column Cockpit layout (`layout-grid-3`) with zero state loss.
   - **Design System & Styling:** Pure vanilla CSS in `src/index.css` adhering to existing CSS custom properties and glassmorphism.
   - **Rule 13 Compliance & Bilingual Parity:** 0 Unicode emojis across all files (Lucide icons exclusively) and 100% TR/EN lockstep parity in `src/locales/i18n.js`.

2. **Preset Key/ID Alignment & Final Hardening (Iteration 3):**
   - **Data Alignment in `edudesignSpec.js`:** Fixed line 445 preset id from `"formative-exit-tickets"` to `"diagnostic-exit-ticket"`, strictly aligning with the dictionary key and title.
   - **Resolution Hardening in `engineState.js`:** Updated `setPreset` to resolve target preset by dictionary key or inner `preset.id`, making preset application resilient to key or id invocations.
   - **Validation Gate Extension in `validate-modules.mjs`:** Added assertion checking that `preset.id === presetId` for all 180 presets across all 15 domains, preventing future key/id divergence.

#### What Was Verified
- `npm run lint`: passed with 0 errors and 0 warnings under `--max-warnings=0`.
- `npm run validate`: passed with 0 errors across all 15 domains, 457 modules, and 180 presets (with id === key parity verified).
- `npm run build`: production bundle compiled in 854ms; all chunks under 500 kB with 0 warnings.
- `node scripts/test-e2e.mjs`: passed 116/116 tests across Tiers 1-4 with 0 failures.
- `node scripts/test-challenger2-stress.mjs`: passed 34/34 empirical stress tests across Suites 1-4 with 100% success rate.

### 2026-08-30 — 15 Domain Centralization, System Durability, Tooltip Portals & Production Hardening (Phase 8 - 14)

#### What Changed
1. **Domain Specs & Compiler Centralization (Phase 8):**
   - Centralized all 15 domain specs (`src/domains/specs/*Spec.js`) with rich bilingual `compilerTexts` (mod, format, role/goal template, constraintsBase, monologueText) and `categories` layer mappings.
   - Refactored `src/locales/compilerTexts.js` to dynamically resolve from domain specs; deleted 13 copy-paste fallback assignments.
   - Cleaned all 180 presets: stripped legacy duplicate `forceModules`, sanitized all preset emoji into Lucide icon tokens, and fixed stale module IDs (`wellnessSpec.js`).
   - Cleaned `src/locales/i18n.js` by removing ~560 lines of duplicate domain string blocks.
   - Deleted obsolete compatibility shims `src/domains/specs/learning.js` and `code.js`.

2. **Module Data Integrity & Bilingual Parity (Phase 9):**
   - Completely translated `src/data/modules_blog_en.json` (30 blog modules: `name`, `desc`, `explain`, `prompt`) with idiomatic English.
   - Cleaned redundant `category` and `description` properties across all 30 module JSON files to strictly adhere to the canonical schema `[id, icon, name, desc, explain, layer, requires, prompt]`.
   - Built a comprehensive 457-module Lucide icon registry in `src/ui/moduleIconRegistry.js` via `scripts/generate-module-icons.mjs`, eliminating generic `Box` fallbacks.

3. **Durability, Invariants & State Hardening (Phase 10):**
   - Added undefined guard to `topologicalSort` in `src/engine/dependencyResolver.js`.
   - Added deep merge persistence logic and safe UUID fallbacks to `src/store/engineState.js`.
   - Hardened `src/utils/statePayload.js` with length caps (10,000 chars), Set deduplication, and modern `TextEncoder`/`TextDecoder` Base64 encoding.
   - Guarded `analyzePromptComplexity` in `src/compiler/finalPromptAssembler.js` with a full-schema default fallback.

4. **UI, Tooltip Portals & Responsive Layout Fixes (Phase 11):**
   - Created `src/ui/PortalTooltip.jsx` using `ReactDOM.createPortal` and integrated it into `ModuleGrid.jsx`, `PresetBar.jsx`, and `ConfigPanel.jsx`, completely eliminating tooltip clipping in scrollable containers.
   - Fixed the 769px–1100px body scroll lock in `src/index.css` by applying `overflow-y: auto !important` and `height: auto !important`.
   - Removed non-standard `body { zoom: 0.8; }` from `src/index.css`.
   - Fixed mobile progress bar (`.default-flow-progress`) horizontal overflow and streamlined DefaultFlow header to eliminate duplicate branding.
   - Added mobile touch outside-click support to `src/ui/ParameterHoverMenu.jsx`.

5. **Design System, Rule 13 Emoji Cleanup & Dead Code Removal (Phase 12):**
   - Strictly enforced Rule 13: sanitized all emojis from specs, UI components, and toasts (`ActionBar.jsx`, `ModuleGrid.jsx`, `edudesignSpec.js`).
   - Fixed React Hook dependency warnings in `src/App.jsx` and `src/ui/OnboardingTour.jsx`.
   - Removed unused `React` import from `src/ui/PremptLogo.jsx`.
   - Deleted dead files: `src/App.css`, `src/ui/IntroView.jsx`, `src/assets/hero.png`, `src/assets/react.svg`.
   - Connected `src/ui/RecipesPanel.jsx` into the UI via an accessible modal in `ActionBar.jsx`.

6. **Validation Gates & Bundle Optimization (Phase 13 & 14):**
   - Extended `scripts/validate-modules.mjs` with checks for preset `forceModules` duplicates, compilerTexts completeness across modes/formats, category translation coverage, and obsolete schema properties.
   - Optimized `vite.config.js` with functional `manualChunks` splitting (`vendor-react`, `vendor-state`, `vendor-icons`, `domain-specs`, `modules-data`), bringing all bundle chunks under 500 kB.

7. **3-Agent UI/UX Teamwork Audit Remediation:**
   - Replaced raw emoji in `ModuleGrid.jsx` tooltips with `getModuleIcon` Lucide components (Rule 13).
   - Added `--border-strong` token to dark (`rgba(255,255,255,0.18)`) and light (`rgba(0,0,0,0.14)`) themes.
   - Raised `.toast-container` z-index to `1000000` above modal overlays.
   - Added `tourSteps` to `src/locales/i18n.js` (TR/EN) and restored `OnboardingTour.jsx`.
   - Added WCAG AA high-contrast text to bright `DomainSwitcher` active pills.
   - Added 3-column tablet grid (`repeat(3, minmax(0, 1fr))`) for `.categories-container` on 769px–1100px viewports.
   - Added `100dvh` dynamic viewport height support to `body` and `.app`.
   - Migrated `ConfigPanel.jsx` inline tooltips to `PortalTooltip`.
   - Standardized `ActionBar.jsx` AI buttons, aligned Gemini badge, and added `maxHeight` / `overflowY` to modals.
   - Removed double tooltip `title` attribute from `PresetBar.jsx` and redundant back button from `DefaultFlow.jsx`.
   - Restructured `ErrorBoundary.jsx` styling and theme variables.

8. **Advanced Mode White Screen & Tour Lifecycle Fix:**
   - Eliminated render-time `setState` calls in `OnboardingTour.jsx` causing React render loops.
   - Removed automatic tour auto-start from `App.jsx` and converted `OnboardingTour` to strictly on-demand via the Header Help icon (`HelpCircle`).
   - Wrapped root application in `ErrorBoundary` to prevent any subcomponent error from causing a blank white screen.
   - Added `useShallow` to `DomainSwitcher.jsx` and `OnboardingTour.jsx` for rock-solid state subscriptions.

9. **5-Stream Deep Audit Remediation (42 Findings Resolved):**
   - **Stream 1 (Data & Parity):** Translated 25 modules in `modules_blog_en.json` (`AUD-C01`), fixed `defaultConfig` ID drift across 11 domain specs (`AUD-H01`), cleaned 878 raw Unicode emojis from data catalogs to semantic string IDs (`AUD-M02`), fixed English explain strings for `ornekler` and `uzman` in `modules_en.json` (`AUD-M10`), and added `moduleFilterEmpty` in `i18n.js` (`AUD-M09`).
   - **Stream 2 (Compiler & Routing):** Protected `getDomain`, `getFormatter`, `openInAI`, and `structureBuilder` against object prototype collisions via `Object.hasOwn` (`AUD-H02`), updated `structureBuilder.js` to `replaceAll('{{ALAN}}')` (`AUD-M05`), passed `injectedRules` into `analyzePromptComplexity` in `PreviewPanel.jsx` (`AUD-H05`), standardized URL length limits with `encodeURIComponent` (`AUD-M04`), trimmed whitespace from topic inputs (`AUD-L05`), and added `'noopener,noreferrer'` to `window.open` (`AUD-L02`).
   - **Stream 3 (State & Lifecycle):** Added 250ms debouncing and `try...catch` wrapper to `history.replaceState` in `App.jsx` (`AUD-H04`), reset `activePreset`, `injectedRules`, and `dependencyHints` in `setModules` action (`AUD-M01`), consolidated duplicate `useEngineState` calls in `ActionBar.jsx` (`AUD-L09`), and added a "Reset Data & Reload" storage purge button in `ErrorBoundary.jsx` (`AUD-M08`).
   - **Stream 4 (UI/UX & Accessibility):** Replaced emoji in `edudesignSpec.js` (`AUD-H03`), enforced WCAG AA compliant text color (`#090d16`) on bright domain pills in `DomainSwitcher.jsx` (`AUD-H06`), tuned ChatGPT/Claude/Perplexity button backgrounds for >4.5:1 AA contrast (`AUD-H07`), added `onFocus`/`onBlur` keyboard tooltip triggers to `ModuleGrid.jsx` cards (`AUD-H08`), mapped all 136 missing modules in `moduleIconRegistry.js` (593 total mapped, 0 falling back to Box) (`AUD-M03`), enabled keyboard focus with `tabIndex={0}` on `PreviewPanel.jsx` (`AUD-M11`), and balanced mobile utility actions grid to 2x2 symmetrical columns (`AUD-M12`).
   - **Stream 5 (Validation Gates):** Extended `scripts/validate-modules.mjs` with `validateDefaultConfig` assertion, DAG circular dependency DFS detection, Rule 13 emoji assertion on all JSON data files, and `validateModuleIconRegistry` 100% module coverage assertion (`AUD-M13`).

#### What Was Verified
- `npm run lint`: passed with 0 errors and 0 warnings.
- `npm run validate`: passed across all 15 domains, 457 modules (0 emojis, 100% Lucide icon registry mapping, 0 cycles), 180 presets, 60 parameter axes, compiler texts, category translations, presentation mappings, and output targets.
- `npm run build`: compiled in 851ms with 0 chunk size warnings.
