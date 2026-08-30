# PROGRESS.md

This is the **only** file in this repository that carries a date or a ✅. Gate
results and session history live here and nowhere else — see `CLAUDE.md` §3.

Never record a gate as passing without having run that exact command in the
current checkout (`CLAUDE.md` §7.1).

## Current Gate Status

| Gate | Command | Result | Last actually run |
| --- | --- | --- | --- |
| Lint | `npm run lint` | ✅ PASSED — 0 errors, 0 warnings across the entire repository | 2026-08-30 |
| Build | `npm run build` | ✅ PASSED — 755ms; all chunks under 500 kB with zero Vite chunk warnings | 2026-08-30 |
| Module, preset, parameter, presentation, hover, and target validation | `npm run validate` | ✅ PASSED — all 15 domains, bilingual modules, 180 presets, TR/EN option descriptions, 15 presentation registrations, compiler texts completeness, layer categories, and central output targets | 2026-08-30 |

Notes on the gates themselves (not results):

- **Module, Preset, Parameter, Presentation, and Target Validation:** Validates bilingual module schemas, all domain preset contracts (with duplicate detection), every domain parameter hover description, presentation/icon registration, compilerTexts completeness for all modes/formats, category translation coverage, and the central output-target vocabulary across all 15 domains.
- **Build Gate:** Compiles Vite production bundle into `dist/` with functional `manualChunks` code-splitting (`vendor-react`, `vendor-state`, `vendor-icons`, `domain-specs`, `modules-data`). Verified 0 errors and 0 chunk warnings.

## Session History

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

#### What Was Verified
- `npm run lint`: passed with 0 errors and 0 warnings.
- `npm run validate`: passed across all 15 domains, 457 modules, 180 presets, parameter descriptions, compiler texts, category translations, presentation mappings, and output targets.
- `npm run build`: compiled in 755ms with 0 chunk size warnings.
