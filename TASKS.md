# TASKS.md

The execution source of truth and the **only** file in this repository that
carries checkboxes (`CLAUDE.md` §3). Execute only `[ ]` items. `[x]` means
completed **or intentionally skipped** — never redo or re-audit a closed item
unless it is explicitly reopened.

Every item below was derived from something read in this repository — a
documented limitation, an audited vulnerability, or a verified mismatch
between a document and the source. Nothing here is speculative feature work.

---

## Phase 1 — Close the preset validation gap

- [x] 1.1 Extend `scripts/validate-modules.mjs` to validate preset contents.
      Acceptance: a preset with a bogus `forceModules` id, an out-of-vocabulary
      `override` value, or an unknown `group` makes `npm run validate` exit
      non-zero with a message naming the domain and preset id.
    - [x] 1.1.1 Import `getPresets` into the validator and resolve module ids from each domain's loaded registry, without hardcoding `learning`/`code`.
    - [x] 1.1.2 Check every `forceModules` id exists in that domain's registry.
    - [x] 1.1.3 Check every `override` key's value against the domain descriptor's `modeIds`/`levelIds`/`depthIds`/`formatIds`.
    - [x] 1.1.4 Check every preset's `group` is defined in `domain.ui[lang].presetGroups` for both languages.
    - [x] 1.1.5 Update the "does not check presets" wording in `CLAUDE.md` §2 and `ARCHITECTURE.md`.
- [x] 1.2 Add a consistency check for the output-target id list.
      Acceptance: `VALID_TARGETS`, `FORMATTERS`, and `TARGET_IDS` are verified to agree by a gate.

---

## Phase 2 — Reconcile `ARCHITECTURE.md` with the source

- [x] 2.1 Remove `generatedPrompt` from the documented state shape.
      Acceptance: `ARCHITECTURE.md` state shape block and `setDomain` description no longer mention `generatedPrompt` (`PreviewPanel.jsx` derives it locally with `useMemo`).
- [x] 2.2 Document `config.hedef` and the output-target formatters.
      Acceptance: `ARCHITECTURE.md` covers `config.hedef`, `src/compiler/formatters/` (`markdown.js`, `claudeXml.js`, `openaiJson.js`, `labelTags.js`), and step 3 of the compile pipeline.
- [x] 2.3 Document the intro/workspace view routing.
      Acceptance: `ARCHITECTURE.md` file tree includes `src/ui/IntroView.jsx` (or records its removal), and state shape includes `view` field plus actions.
- [x] 2.4 Correct the `src/App.css` entry.
      Acceptance: The tree comment notes `src/App.css` is unused Vite scaffold leftovers imported by no file.
- [x] 2.5 Correct the token-estimate figure.
      Acceptance: `ARCHITECTURE.md` states character-to-token divisor is `3.5` (matching `analyzePromptComplexity`), not `4`.
- [x] 2.6 Move the "Recent Changes" log out of `ARCHITECTURE.md`.
      Acceptance: `ARCHITECTURE.md` carries no dated changelog; history is owned exclusively by `PROGRESS.md`.
- [x] 2.7 Update the doc-pointer lines that describe `AGENT.md`.
      Acceptance: `README.md` and `ARCHITECTURE.md` describe `AGENT.md`/`AGENTS.md` as pointer stubs and name `CLAUDE.md` as rules owner.
- [x] 2.8 Correct the validator's "a 3rd domain needs no change here" claim.
      Acceptance: Tree comments and `DOMAIN_FILES` agree across all 15 domains.

---

## Phase 3 — Accessibility and dead code

- [x] 3.1 Add `prefers-reduced-motion` handling.
      Acceptance: `@media (prefers-reduced-motion: reduce)` in `src/index.css` disables/shortens keyframe animations (`lineDraw1`, `lineDraw2`, `fadeInUp`, `fadeInDown`, `floatGlow`) and `.bg-glow-orb`.
- [x] 3.2 Decide the fate of `src/App.css`.
      Acceptance: `src/App.css` is deleted or merged with user approval per `CLAUDE.md` §15.
- [x] 3.3 Confirm whether `design-mockup.html` and `tmp/` should stay in the repo.
      Acceptance: Explicit decision recorded; neither is referenced by the build.

---

## Phase 4 — Centralize content ownership and presentation behavior

- [x] 4.1 Move domain navigation groups, theme tokens, and icon ids into `src/domains/presentation.js` with a shared `src/ui/iconRegistry.js`.
- [x] 4.2 Add bilingual parameter hover descriptions and an accessible `ParameterSelect` listbox.
- [x] 4.3 Remove duplicate preset/rule/formatter ownership and centralize module hover assembly.
- [x] 4.4 Update architecture/agent docs and verify the migration.

---

## Phase 5 — Default / Advanced user flow and AI routing

- [x] 5.1 Add the Default five-step journey.
- [x] 5.2 Add the Advanced mode boundary and local preference.
- [x] 5.3 Add responsive and accessible flow behavior.
- [x] 5.4 Stabilize provider-specific AI routes.
- [x] 5.5 Verify and document the migration.

---

## Phase 6 — Complete advanced parameter hover coverage

- [x] 6.1 Replace partial legacy label-tooltip ownership.
- [x] 6.2 Validate every domain and option in both languages.
- [x] 6.3 Verify Advanced hover and focus behavior.

---

## Phase 7 — UI/Layout Stabilization Pass

- [x] 7.1 Correct Advanced mobile task order and reduce competing scroll ownership.
- [x] 7.2 Reduce Advanced module discovery density.
- [x] 7.3 Improve Default first-decision hierarchy.
- [x] 7.4 Verify responsive visual regression.

---

## Phase 8 — Domain Spec & Compiler Centralization (Kanonik Tek Kaynak)

- [x] 8.1 Taşınabilir ve bağımsız `compilerTexts` bloklarını 15 domain spec'ine entegre et.
      Acceptance: `src/locales/compilerTexts.js` içindeki 13 adet `COMPILER_TEXTS['...'] = COMPILER_TEXTS.learning;` ataması tamamen kaldırılır. Her bir domain spec'i (`src/domains/specs/*Spec.js`) kendi mod, format, derinlik ve rol (`[ROLE]`, `[GOAL]`, `[CONSTRAINTS]`) şablonlarını barındırır. Derleyici (`src/compiler/structureBuilder.js`) domain spec'inden derleme yapar ve Learning rolü diğer domainlere sızmaz.
    - [x] 8.1.1 `learningSpec.js` ve `codeSpec.js` içine `compilerTexts` bloklarını eksiksiz taşı.
    - [x] 8.1.2 Kalan 13 domain spec'ine (`decision`, `academic`, `philosophy`, `problemsolving`, `agentarch`, `cyber`, `blog`, `image`, `language`, `edudesign`, `business`, `wellness`, `travel`) kendi mod ve formatlarına karşılık gelen özgün `compilerTexts` tanımlarını ekle.
    - [x] 8.1.3 `src/locales/compilerTexts.js` dosyasını spec'lerden okuyan dinamik bir köprü/adaptöre dönüştür veya doğrudan spec'leri tüketen compiler pipeline'ı bağla.
- [x] 8.2 Domain spec'leri içine katman (`categories`) ve tur (`tourSteps`) metinlerini ekle.
      Acceptance: 15 domain spec dosyasının `ui.tr` ve `ui.en` nesnelerine `categories: { [layerId]: label }`, `modulesTitle`, `presetsTitle`, `paramsTitle` ve `tourSteps` dizileri eklenir. `ModuleGrid.jsx` katman başlıklarında ham İngilizce key'ler (`"methodology"`, `"literature"` vb.) yerine yerelleştirilmiş başlıklar gösterir.
- [x] 8.3 `src/locales/i18n.js` içindeki kalıntı domain bloklarını temizle.
      Acceptance: `i18n.js` içindeki 560 satırlık `domains.learning` ve `domains.code` nesneleri temizlenir. `i18n.js` sadece uygulama geneli ortak UI dizgilerini (butonlar, modal başlıkları, hata mesajları, hedef açıklamaları) barındırır.
- [x] 8.4 180 Presetin `forceModules` çiftlemelerini ve monoton şablonlarını temizle/zenginleştir.
      Acceptance: 14 domainin ilk presetlerindeki `forceModules: [modA, modA]` çiftlemeleri (`new Set(forceModules).size === forceModules.length`) giderilir. `wellnessSpec.js` `circadian-reset` presetindeki antrenman modülü yerine uyku/sirkadiyen modülleri atanır. 13 yeni domaindeki tekdüze kopyalanmış `override` ve generic `"Apply <domain> domain rule..."` `injectRules` metinleri preset amacına uygun özgün kurallara dönüştürülür.
- [x] 8.5 `philosophySpec.js` ve `src/domains/specs/types.js` tip/şema uyumsuzluklarını düzelt.
      Acceptance: `philosophySpec.js` satır 10'daki `"icon": "building2"` değeri `"building-2"` olarak düzeltilir. `src/domains/specs/types.js` JSDoc sözleşmesi `defaultConfig`, `optionSets`, `presetGroups`, `categories`, `compilerTexts` ve `presets` şemalarını tam tanımlar.
- [x] 8.6 Ölü spec shim dosyalarını sil.
      Acceptance: `src/domains/specs/learning.js` ve `src/domains/specs/code.js` dosyaları hiçbir dosya tarafından import edilmediği doğrulanarak silinir.

---

## Phase 9 — Module Data Integrity & Bilingual Parity

- [x] 9.1 `src/data/modules_blog_en.json` dosyasını eksiksiz İngilizceye çevir.
      Acceptance: `modules_blog_en.json` içindeki Türkçe modül isimleri, kısa açıklamalar (`desc`), detaylı açıklamalar (`explain`) ve prompt metinleri tamamen İngilizceye çevrilir. `npm run validate` dosyada hiçbir Türkçe kalıntı raporlamaz.
- [x] 9.2 Modül JSON şemalarındaki gereksiz ve mükerrer alanları temizle.
      Acceptance: 13 yeni domain JSON dosyalarındaki (`modules_*_{tr,en}.json`) birbirinin kopyası olan `description`, `category` alanları temizlenerek tüm 15 domain modül şeması `[id, icon, name, desc, explain, layer, requires, prompt]` standardına eşitlenir.
- [x] 9.3 13 yeni domain için modül ikonlarını `src/ui/moduleIconRegistry.js` içine kaydet.
      Acceptance: `src/ui/moduleIconRegistry.js` içindeki `MODULE_ICONS` sözlüğü 15 domainin 450+ modülü için uygun `lucide-react` ikon eşleşmelerini içerir; modül kartları jenerik `Box` ikonuna düşmez.

---

## Phase 10 — Durability, Invariants & State Hardening

- [x] 10.1 `topologicalSort` ve bağımlılık çözücüyü `undefined` zehirlenmesine karşı koru.
      Acceptance: `src/engine/dependencyResolver.js` içindeki `topologicalSort` metodu `this.modules[id]` tanımsız olduğunda listeye `undefined` eklemez; `result.filter(Boolean)` döndürür. Bilinmeyen bir ID geçilse dahi `structureBuilder.js` `TypeError: Cannot read properties of undefined (reading 'name')` hatası ile çökmez.
- [x] 10.2 Zustand `engineState.js` rehydrate ve persistence güvenliğini sağla.
      Acceptance: `src/store/engineState.js` Zustand `persist` konfigürasyonuna özel `merge` fonksiyonu eklenir. `localStorage` üzerinde kayıtlı eski `version: 1` state'leri rehydrate edildiğinde yeni eklenen alanlar (`gorunum`, vb.) `undefined` kalmaz; varsayılan değerlerle derin birleştirilir (deep merge).
- [x] 10.3 `saveRecipe` ve tarayıcı ortamlarında güvenli UUID fallback ekle.
      Acceptance: `src/store/engineState.js` içindeki `saveRecipe` eylemi, `crypto.randomUUID` bulunmayan HTTPS dışı veya yerel ağ ortamlarında `Date.now().toString(36) + Math.random().toString(36).slice(2)` fallback'i ile çalışır; `TypeError` fırlatmaz.
- [x] 10.4 `sanitizePayload` girdi hijyeni ve DoS koruması ekle.
      Acceptance: `src/utils/statePayload.js` içinde `konu` ve `alan` metinleri `10000` karakter ile sınırlandırılır (`slice(0, 10000)`). `selectedModules` dizisindeki yinelenen ID'ler `Array.from(new Set(...))` ile ayıklanır. Deprecated `escape`/`unescape` çağrıları `TextEncoder`/`Uint8Array` standart yöntemine taşınır.
- [x] 10.5 `analyzePromptComplexity` boş dönüş şemasını tam sözleşmeyle eşitle.
      Acceptance: `src/compiler/promptComplexityAnalyzer.js` prompt veya konu boş olduğunda `{ tokens: 0, complexityScore: 0, layersUsed: 0, chars: 0, isTooLongForUrl: false, moduleCount: 0 }` tam nesnesini döner.

---

## Phase 11 — UI, Tooltip Portals & Responsive Layout Stabilization

- [x] 11.1 Tablet ve orta ekranlarda (769px – 1100px) 100vh body scroll kilidini çöz.
      Acceptance: `src/index.css` içindeki `html, body { overflow-y: auto !important; height: auto !important; }` kuralı `@media (max-width: 1100px)` kırılımına uygulanır. 769px–1100px arası ekranlarda alt satıra kayan `.right-sidebar` (Aksiyonlar ve Önizleme) kaydırılarak erişilebilir olur.
- [x] 11.2 Modül ve Preset tooltiplerini portal mimarisine taşıyarak scroll kırpılmasını (clipping) önle.
      Acceptance: `src/ui/ModuleGrid.jsx` ve `src/ui/PresetBar.jsx` içerisindeki `.module-tooltip` ve `.preset-tooltip` bileşenleri yerel `position: absolute` yerine `createPortal` tabanlı, viewport taşmasını denetleyen bir portal katmanına bağlanır; `.categories-container` ve `.main-content`'in `overflow: hidden` sınırlarında kesilmez.
- [x] 11.3 İç içe çakışan scroll konteynerlarını (scroll trapping) ve standart dışı `zoom: 0.8`'i temizle.
      Acceptance: `src/index.css` içindeki standart dışı `body { zoom: 0.8; }` kuralı kaldırılır. `.advanced-container .module-discovery .categories-container` iç scrollu ile `.main-content` arasındaki fare tekeri kilitlenmesi optimize edilir.
- [x] 11.4 `DefaultFlow.jsx` mobil ilerleme çubuğu taşmasını (horizontal overflow) düzelt.
      Acceptance: `.default-flow-progress` 375px–430px mobil ekranlarda yatay scrollbar oluşturmaz; esnek/kompakt ızgarayla sığar.
- [x] 11.5 `DefaultFlow` ve `Header` arasındaki çift başlık israfını (first-viewport crowding) gider.
      Acceptance: Default modda üst üste binen global Header ve DefaultFlow başlığı sadeleştirilir; mobilde ilk ekranda etkileşimli kart alanı genişletilir.
- [x] 11.6 `ParameterHoverMenu.jsx` dokunmatik / mobil outside-click desteği ekle.
      Acceptance: Mobilde `Info` ikonuna tıklandığında açılan portal tooltipi, dışarı dokunulduğunda (`pointerdown` outside listener) temiz şekilde kapanır.

---

## Phase 12 — Design System, Rule 13 (Emoji Cleanup) & Dead Code Removal

- [x] 12.1 Kural 13 uyarınca tüm emojileri kod tabanından temizle ve Lucide ikonlarıyla değiştir.
      Acceptance: `src/domains/specs/*.js` dosyalarındaki preset adlarından (`⚡ Hızlı Özet`, `🚀 Özellik Yayınla`, `🧱 Temeller` vb.), `src/locales/i18n.js` brand başlıklarından, `src/ui/ActionBar.jsx` toast bildirimlerinden ve `ModuleGrid.jsx` rozetlerindeki unicode `✓` karakterlerinden emojiler tamamen temizlenir; yerlerine semantik `Lucide` ikonları ve i18n metinleri kullanılır.
- [x] 12.2 `src/ui/PremptLogo.jsx` ESLint hatasını ve hook uyarılarını düzelt.
      Acceptance: `PremptLogo.jsx` satır 1'deki gereksiz `import React from 'react';` silinir. `App.jsx` ve `OnboardingTour.jsx` içindeki React Hook dependency uyarıları düzeltilir. `npm run lint` 0 hata ve 0 uyarı ile geçer (`--max-warnings=0`).
- [x] 12.3 Ölü kodları, ölü stilleri ve kalıntı assetleri projeden temizle.
      Acceptance: `src/App.css` (185 satır ölü stil), `src/ui/IntroView.jsx`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, kök dizindeki scratch dosyaları (`scratch_*.cjs`, `scratch_*.ps1`) silinir.
- [x] 12.4 `RecipesPanel.jsx` bileşenini kullanıcı arayüzüne (ActionBar modal veya drawer) bağla.
      Acceptance: `RecipesPanel.jsx` ölü kod durumundan çıkarılır; `ActionBar.jsx` üzerindeki "Kayıtlı Tarifler" butonu/modalı ile kullanıcıların tarayıcıya kaydettiği şablonları listelemesi, yüklemesi ve silmesi sağlanır.

---

## Phase 13 — Validation Gates & Performance / Bundle Optimization

- [x] 13.1 `scripts/validate-modules.mjs` doğrulama kapısını genişlet.
      Acceptance: `npm run validate` komutu şunları doğrular ve hata durumunda sıfır olmayan kodla çıkar:
    - [x] 13.1.1 15 domainin tüm presetlerinde `forceModules` içinde tekrar eden ID bulunmadığını (`Set` boyutu kontrolü).
    - [x] 13.1.2 Her domain spec'inin `compilerTexts` bloklarında tüm `optionSets.modes` ve `optionSets.formats` anahtarlarının tanımlı olduğunu.
    - [x] 13.1.3 `spec.layers` içindeki her katmanın `spec.ui.tr.categories` ve `spec.ui.en.categories` altında çevirisinin bulunduğunu.
    - [x] 13.1.4 `spec.icon` anahtarının `DOMAIN_ICON_IDS` ve `iconRegistry.js` ile birebir eşleştiğini.
    - [x] 13.1.5 Tüm `modules_*_en.json` dosyalarında Türkçe metin kalıntısı olmadığını.
    - [x] 13.1.6 Modül JSON nesnelerinde `category` veya `description` gibi gereksiz şema fazlalıkları bulunmadığını.
- [x] 13.2 `vite.config.js` içine Rollup `manualChunks` ekleyerek bundle uyarısını çöz.
      Acceptance: `vite.config.js` build konfigürasyonunda `vendor-react` (`react`, `react-dom`, `zustand`), `vendor-icons` (`lucide-react`, `@icons-pack/react-simple-icons`), `domain-specs` ve `modules-data` chunk'ları ayrıştırılır; `npm run build` çıktısında hiçbir tekil JS chunk'ı 500 kB sınırını aşmaz.
- [x] 13.3 `PROGRESS.md` ve `ARCHITECTURE.md` dosyalarını son doğrulama durumlarıyla güncelle.
      Acceptance: Tüm kapılar (`npm run validate`, `npm run build`, `npm run lint`) çalıştırılır; gerçek çıktıları `PROGRESS.md` dosyasına session kaydı olarak işlenir; `ARCHITECTURE.md` güncel tek kaynak mimarisine göre güncellenir.

---

## Phase 14 — Final UI Polish & Visual Chrome Normalization

- [x] 14.1 Mobil stepper/header yüksekliğini ve arayüz kalıntılarını normalize et.
      Acceptance: Mobile stepper/header yüksekliği optimize edilir, provider/preset emoji ve legacy metinler normalize edilir, ilk ekranda gereksiz alan israfı kalmaz.

---

## Phase 15 — Progressive Unified Workspace Refactor & Preset Hardening

- [x] 15.1 Intent-First Unified Core Workspace (L0 Layer - R1)
      Acceptance: Replace rigid 5-step stepper in `DefaultFlow.jsx` with unified single-viewport intent-driven view (`TopicInput`, 3 Hero Presets per domain via `HeroPresetSelector` + 9 expandable presets, `ActionBar` with 1-click execution actions for ChatGPT, Claude, Perplexity, Gemini, Copy, live token estimation and URL-length safety guards, preserving deep-link query parameters and pathname routing).
    - [x] 15.1.1 Build `TopicInput.jsx` with prominent hero input, keyboard shortcuts (Ctrl+Enter / Cmd+Enter).
    - [x] 15.1.2 Build `HeroPresetSelector.jsx` with 3 hero action cards and categorized popover (`understand`, `analyze`, `apply`) for remaining 9 presets.
    - [x] 15.1.3 Integrate live token complexity badge & URL safety indicator in `ActionBar.jsx`.
    - [x] 15.1.4 Preserve deep-link parameters (`?preset=...`, `?modules=...`, `?konu=...`, `?share=...`) and pathname routing.
- [x] 15.2 Contextual Tuning via Interactive Parameter Chips (L1 Layer - R2)
      Acceptance: Replace static `<select>` form dropdowns in default configuration with inline, keyboard- and touch-accessible parameter chips (`ParameterChip.jsx`, `ParameterChipsBar.jsx`) for `seviye`, `mod`, `derinlik`, `format`, and `hedef`, displaying option labels and bilingual descriptions from `parameterDescriptions.js`, dispatching compiler updates to canonical Turkish state keys in real time.
    - [x] 15.2.1 Build accessible `ParameterChip.jsx` with WAI-ARIA popover and focus trap/keyboard navigation.
    - [x] 15.2.2 Build `ParameterChipsBar.jsx` reading and setting canonical Turkish keys in `engineState.js`.
    - [x] 15.2.3 Ensure full TR/EN bilingual parity for option labels and descriptions.
- [x] 15.3 Collapsible Granular Inspector & Eject Mechanism (L2 Layer - R3)
      Acceptance: Provide accessible accordion/drawer (`CollapsibleInspector.jsx`, `ActiveModuleBadgeRow.jsx`) summarizing active modules in a compact badge row, embedding 457-module DAG grid (`ModuleGrid.jsx`), topological prerequisite auto-resolution toggle, active constraint rules (`injectedRules`), token complexity metrics, "Eject / Remix" behavior preserving injectedRules on module modification, and `ModeTogglePill` in Header switching smoothly between Progressive and 3-column Cockpit mode with zero state loss.
    - [x] 15.3.1 Build `ActiveModuleBadgeRow.jsx` summarizing selected modules and eject trigger.
    - [x] 15.3.2 Build `CollapsibleInspector.jsx` embedding `ModuleGrid`, DAG auto-resolve toggle, injectedRules list, and token metrics.
    - [x] 15.3.3 Implement `ejectPreset` in `engineState.js` and preserve `injectedRules` during manual edits and overrides.
    - [x] 15.3.4 Add `ModeTogglePill.jsx` to Header for instantaneous switching between Progressive and Cockpit modes.
- [x] 15.4 Design System, Rule 13, and Bilingual Compliance (R4)
      Acceptance: Pure vanilla CSS in `src/index.css` respecting theme CSS custom properties and glassmorphism, zero external CSS/UI frameworks, strict Rule 13 compliance (zero Unicode emoji; Lucide-react exclusively), 100% TR/EN lockstep parity in `i18n.js` and domain specs, and responsive mobile/tablet layout (`100dvh`, touch outside-click support, no horizontal scroll).
    - [x] 15.4.1 Implement vanilla CSS styles in `src/index.css` for chips, popovers, badges, inspector, and responsive layouts.
    - [x] 15.4.2 Enforce Rule 13 zero-emoji compliance across all UI components, toasts, and presets.
    - [x] 15.4.3 Synchronize 100% TR/EN bilingual parity in `src/locales/i18n.js`.
    - [x] 15.4.4 Ensure responsive mobile and tablet viewport support with `100dvh` and touch outside-click handlers.
- [x] 15.5 Preset Key/ID Alignment & Final Hardening (Iteration 3)
      Acceptance: Align `edudesignSpec.js:445` preset id (`diagnostic-exit-ticket`), harden `engineState.js` `setPreset` to resolve by both key and inner id, and extend `scripts/validate-modules.mjs` with `preset.id === presetKey` invariant across all 15 domains.
    - [x] 15.5.1 Fix `src/domains/specs/edudesignSpec.js:445` preset id to `"diagnostic-exit-ticket"`.
    - [x] 15.5.2 Harden `src/store/engineState.js` `setPreset` to resolve by dictionary key or inner `preset.id`.
    - [x] 15.5.3 Extend `scripts/validate-modules.mjs` `validatePreset` to assert `preset.id === presetKey`.
    - [x] 15.5.4 Verify all quality gates (`lint`, `validate`, `build`, `test-e2e.mjs`, `test-challenger2-stress.mjs`).
