# BAD.md — Olumsuz Bulgular Sentez Raporu (orkestratör girdisi)

Kaynak: 3 paralel alt-ajan incelemesi (A: state/payload/URL, B: bilingual veri/validator, C: UI/test/bakım).
Yöntem: canlı kod okuma + grep + test çalıştırma. Her iddia `dosya:satır` referanslıdır;
doğrulanamayanlar ayrıca işaretlidir. Uydurma bulgu yoktur.
TASKS.md'deki yeni fazlar yalnızca bu dosyadan türetilir.

TASKS.md reset notu: Phase 1–15 `[x]` öğeler bu dosyadan temizlendi;
geçmiş `git log -- TASKS.md` içinde korunur (8495443, 757f385, 1efc7a2, ...).

---

## Bölüm A — Durum / Payload / URL senkronizasyonu

- **A4.1 (yüksek): URL override sanitize bypass — DOĞRULANDI.** `src/App.jsx:70-96` `?seviye/?mod/?derinlik/?format/?konu/?alan`
  ham `setState` ile yazılır, `sanitizePayload` yok. `?share=` (`App.jsx:42`) ve import yolu sanitize eder,
  override yolu etmez. `structureBuilder.js:26-28,56-61` bilinmeyen `mod/format/derinlik`'te sessiz ilk-değere düşer;
  `seviye` serbest metin olarak `[CONTEXT]`'e basılır (`:19-21`, örn. `Level: bogus`).
- **A4.4 (yüksek): `hedef` URL round-trip yapmaz.** Sync efekti (`App.jsx:100-133`) `hedef/lang/share/domain`'i geri yazmaz;
  250ms `replaceState` (`:125`) mevcut `?share/?lang/?hedef/?q`'yu siler. Gönderen `hedef=openai-json` ile paylaşır
  (`ActionBar.jsx:102`, `statePayload.js:21`) → alıcıda uygulanır (`engineState.js:261`) ama URL kopyalanırsa hedef kaybolur.
- **A4.1b: `?hedef=` hiç okunmaz** (`App.jsx`'de satır yok); `?domain=` sessiz learning fallback (`domains/index.js:41-46`);
  `?preset=` geçersizse sessiz no-op (`engineState.js:146-176`); `?lang=` whitelist'li (`App.jsx:90`) — tek temiz yol.
- **A2.1/A2.3 (yüksek): preset-kural bulaşması.** `toggleModule` preset'i koparır ama `injectedRules`'u korur
  (`engineState.js:138-143`); kurallar `PRESET RULE:` olarak prompt'a gömülür (`structureBuilder.js:72-74`).
  `serializeState` kural setini payload'a koymaz (`statePayload.js:12-32`); `loadRecipe`/`applySharedState`
  `injectedRules` yazmaz (`engineState.js:217-271`) → Tarif-B yüklenince Tarif-A kuralları prompt'ta kalır.
- **A4.6 (orta): `?modules=` ham id tutar, derleyici düşürür.** `resolveDependencies` bilinmeyeni sette tutar
  (`dependencyResolver.js:14-31`), `topologicalSort` sonuca almaz (`:52-54`) → chip'te seçili, prompt'ta yok.
- **A3.1/A3.2 (orta): sessiz default + capsiz payload.** `fallbackOrValid` geçersiz enum'ları uyarısız default'a çeker
  (`statePayload.js:61-79`); yalnızca `konu/alan` 10000-char slice (`:80-81`), genel length cap yok;
  `encodePayloadToParam === ''` ise `ActionBar.jsx:100-111` bozuk linki başarı toast'ıyla kopyalar.
- **A5 (orta): `view`/`gorunum` ikiliği.** `view` session-only (`engineState.js:53-58,311`), render tüketicisi yok
  (`App.jsx:179` `gorunum`'a bakar; `Header.jsx:11-28` `view`'u yalnızca tour koşulunda okur). `backToIntro` çağrıcısı
  bulunamadı. Tarif/paylaşım `gorunum='advanced'` zorlar (`:234,264`) → alıcı tercihi ezilir, kalıcı olur (persistli).
- **A6.1 (orta): `topologicalSort` throw yakalanmaz** (`dependencyResolver.js:39`; çağıranlar `useMemo` içinde try/catch'siz,
  tek kurtarıcı App `ErrorBoundary`).
- **A7.2/A7.3 (orta-düşük): ölçüm tutarsızlığı.** `analyzePromptComplexity` `forceTarget:markdown`'u yok sayar
  (`finalPromptAssembler.js:40` vs `ActionBar.jsx:35-36,66-67`); eşikler 3800 (encoded) vs 4000 (ham URL) vs 2000 (share).
- **A8.1 (orta): kopya hatası sessiz** (`aiRouter.js:93-95` yalnızca `console.warn`; özellikle Claude tek-yol pano iken
  kullanıcı sonuç göremez).

## Bölüm B — Bilingual veri / spec / validator

- **B1.2 (yüksek): ikamesiz token sızıntısı.** `modules_agentarch_{tr,en}.json` `variable-ingestion-schema` prompt'unda
  `{{USER_INPUT}}/{{DOMAIN_CONTEXT}}/{{MAX_TOKENS}}`; derleyici yalnızca `{{KONU}}` (`:33`) + `{{ALAN}}` (`:48`) ikame eder →
  nihai prompt'ta literal token kalır. Validator token vocab bakmıyor.
- **B2.3 (yüksek): `injectRules` yapısal boşluğu.** 14 domain'de tüm kurallar `Apply <domain> domain rule for <x>.` placeholder;
  `edudesign/*` 12 preset'te `injectRules: []`. `validatePreset` (`validate-modules.mjs:164-211`) bu alanı hiç denetlemez.
  Boş array sessizce atlanır; placeholder EN cümle TR prompt'a `PRESET RULE:` ile gömülür (`structureBuilder.js:73`).
- **B1.1 (orta): `icon` alanı atıl.** Hiçbir render kodu okumuyor (`ModuleGrid.jsx:206,272` `getModuleIcon(mod.id)` kullanır;
  `moduleHover.js:9` üretilir ama tooltip'te okunmaz). Validator emoji yasağını denetler ama değerin etkisi yok →
  yeni modüle `icon` yazmak ikon vermez, `MODULE_ICONS` girişi gerekir. (MEMORY.md:46-50 doğru anlatır.)
- **B2.4 (orta): `compilerTexts` kör nokta + kirli merge.** Validator yalnızca `mod/format/goalTemplate-{{KONU}}/constraintsBase`
  bakar (`:237-273`); `derinlik/labels/contextLabels/monologueText` + TR/EN yapısal parity yok. `getCompilerTexts`
  (`compilerTexts.js:17-25`) learning'i merge eder (örn. `academic/tr` 7 `derinlik` anahtarı taşır); `Object.hasOwn`
  (`structureBuilder.js:56-61`) gelecekte yanlış-domain metni seçebilir. Bugünkü veri temiz, kapı açık.
- **B2.5 (orta): 13 domain önerisiz.** `suggestionRules.js:78-86` yalnızca learning+code; `ModuleGrid.jsx:36-39`
  yoksa layer-başına-ilk-2 fallback → "Önerilen" sekmesi 13 domain'de kesit liste. Validator bakmıyor.
- **B3.1 (orta): `label-tags` ıraksaması + stale MEMORY.** `VALID_TARGETS`/`TARGET_IDS` stringleri kodda yok (grep 0);
  `OUTPUT_TARGETS` (3) + `FORMATTERS` (3) + validator (`:354-378`) mutabık — MEMORY.md:73-78 eski. Yeni ıraksama:
  `i18n.targets/targetDescs` 4. hedef `label-tags` ilan eder (`i18n.js:82,88,260,266`) ama seçilemez;
  `labelTags.js` formatter değil yardımcı harita; ARCHITECTURE.md:100-108 formatter gibi listeler.
- **B2.1 (düşük-orta): `levelIds/modeIds/depthIds/formatIds` hiçbir spec'te yok** (15 spec anahtarları
  `[id,route,defaultConfig,icon,category,layers,ui,optionSets,compilerTexts,presets]`); `ConfigPanel.jsx:23-26` ve
  `statePayload.js:56-59` geri-doldurur, `resolveOptionIds` dalı (`:49-54`) ölü kod. Dokümanlar varmış gibi anlatır.
- **B3.2 (düşük-orta): `getIcon` fallback'siz** (`iconRegistry.js:31-33` `undefined`; bugün 15/15 çözülür ama validator
  `ICONS` varlığı bakmaz → yanlış id `DomainSwitcher.jsx:39`'da render crash).
- **B5: validator boşluk haritası.** Kapsanmayanlar: TR/EN semantik parity, prompt-token vocab, `requires` duplicate,
  `injectRules`, `derinlik/labels/monologueText`, ikon-id çözümü, `i18n.targets↔OUTPUT_TARGETS`, formatter çıktı metni,
  `sanitizePayload` mantığı, migrate/merge, eşik tutarlılığı, tüm `src/ui/*`. `npm run validate` veri-şekil kapısıdır,
  davranış kapısı değildir.
- **B6 (orta): "sadece veri" iddiası eksik.** `engine/compiler`'da domain dalı yok (doğrulandı) ama yeni domain yine kod ister:
  `moduleRegistry.js:1-48` statik import+`REGISTRIES`, `domains/index.js` kayıt, `presentation.js`,
  `parameterDescriptions.js`, `suggestionRules.js` (yoksa önerisiz), `iconRegistry.js`.

## Bölüm C — UI / test / bakım / drift

- **C1.1 (yüksek): test kapısı yok.** `package.json:6-12`'de `test` scripti yok, test frameworkü yok, `.github/` yok (CI yok),
  coverage yok. Testler yalnızca manuel `node scripts/...` ile koşar.
- **C1.2 (orta-yüksek): mock-theater öğeleri.** `test-e2e.mjs:28-66` window/localStorage/clipboard mock; `T2.2.3:876-882`
  mock'a yazıp mock'tan okur (gerçek `copyToClipboard` fallback zinciri çalışmaz). `stress:58-79` `window.open` mock.
  `T2.6.1-3:1035-1067` sentetik 2-3 düğümlü sahte modüller (gerçek 457 DAG ayrıca taranır — o kısım gerçek).
  **Sıfır React render/a11y testi** — 6 ana panel kapsam dışı. Sayılar doğru (116/116, 34/34 bu oturumda geçti) ama kapsam abartılmamalı.
- **C1.3 (orta): eşik üçlüsü testlerle betonlaşmış** — 2000/3800/4000 (C-A7 ile aynı kök).
- **C2.1/C2.2 (orta): katmanlama kural-drift.** `ui/` → `compiler/` 4 dosyada (`ActionBar, CollapsibleInspector, DefaultFlow,
  PreviewPanel`); `ui/` → `engine/` 4 dosyada (`ModuleGrid, ActiveModuleBadgeRow, PresetBar, HeroPresetSelector`).
  `ARCHITECTURE.md:157` + CLAUDE.md §6.1 istisnayı parantezde aklar ama §5.1 lafzı "never computes" der → denetlenemez kural.
  `ModuleGrid.jsx:36-39` UI-gömülü öneri politikası engine'den ayrı drift edebilir.
- **C2.3 (orta): `App.jsx:92-96` store action bypass** (doğrudan `setState`; A4.1'in UI ayağı) + `ActionBar.jsx:77,79`
  doğrudan `localStorage` yazımı (store/persist bypass).
- **C3.1 (orta): tanımsız keyframes.** `drawerFadeIn` 3 sitede kullanılır (`index.css:3864,4116,4312`), tanım 0 →
  animasyonlar sessizce çalışmaz. Tersi ölü tanımlar: `fadeInUp/FadeInDown` (`:1010,1014`) hiç kullanılmaz.
- **C3.3 (orta): z-index enflasyonu** (30 bildirim; toast 1000000 vs portal-tooltip 999999; hover `!important` yükseltmeler
  §14.2'ye aykırı yama tipi). Merkezi ölçek yok.
- **C3.4 (orta): ~50+ hardcoded renk** (`#fff`, `rgba(...)` özellikle `!important` tooltip bloklarında `:1304-1382`) →
  light/dark'ta tek-mod kırığı riski (§6.6 yasağı).
- **C3.5 (orta-yüksek): light `--text-muted #a1a1aa` / bg → 2.39:1, WCAG AA 4.5 altında; 15+ sitede kullanım.**
- **C3.2/C4 (düşük-orta): ölü kod fosilleri.** `intro-*`/`.footer` CSS (`index.css:1121-1129`) JSX'te 0 referans;
  `backToIntro` çağrısız (`engineState.js:100`); `Header.jsx:51` ölü ternary (iki dal aynı); CLAUDE.md §6.3 `IntroView`
  sayar (dosya yok); `design-mockup.html`, `scratch_*`, `legacy/learning-os.html` kökte durur.
- **C5 drift tablosu:** CLAUDE.md §5.2/§5.3 "iki domain" dili (gerçek 15); §2 "no test files" (1450+621 satır test var);
  MEMORY.md `App.css`/`tmp/` (ikisi de yok); MEMORY.md share-`replaceState` koruması (`App.jsx:34-46`'da yok, tek
  `replaceState :125`'te); ARCHITECTURE.md ağacında 7 yeni UI bileşeni eksik.
- **C6 a11y:** `PortalTooltip.jsx:19-33` `role=tooltip` yok, `aria-describedby` bağlantısı yok, `pointer-events:none`;
  Toast `role=alert`+`aria-live=polite` çelişkisi, 3sn kaybolma (`App.jsx:170-176`); `ModuleGrid.jsx:236-243` div-olarak-button.
- **C7:** `@types/*` ölü (TS yok — kaldırılması risksiz); `SiOpenaigym` ChatGPT butonunda marka-şüpheli (doğrulanamadı).

## Öncelik sıralaması (orkestratör TASKS.md'ye bu sırayla yazsın)

P0: URL-sanitize (A4.1) · hedef round-trip (A4.4) · eşik tekilleştirme (A7.3/C1.3) · light kontrast (C3.5) · drawerFadeIn+ölü CSS (C3.1/C3.2)
P1: preset-kural bulaşması (A2) · paylaşım bütünlük bildirimi (A3) · token allowlist (B1.2) · injectRules kapısı (B2.3) ·
  label-tags kararı (B3.1) · compilerTexts tam-kapsam (B2.4) · test scripti+CI (C1.1/C1.4)
P2: view/gorunum tekilleştirme (A5) · ölçüm tutarlılığı (A7.2) · kopya-hatası toast (A8.1) · döngü dayanıklılığı (A6.1) ·
  öneri-boşluğu görünürlüğü (B2.5) · katmanlama kural netliği (C2.1/C2.2) · tooltip/odak a11y (C6) · ölü kod/drift temizliği (C4/C5) · @types kaldırma (C7)
