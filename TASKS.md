# TASKS.md

The execution source of truth and the **only** file in this repository that
carries checkboxes (`CLAUDE.md` §3). Execute only `[ ]` items. `[x]` means
completed **or intentionally skipped** — never redo or re-audit a closed item
unless it is explicitly reopened.

> Reset: Phase 1–15 tamamlananlar temizlendi, geçmiş `git log -- TASKS.md` içinde korunur.
> Aşağıdaki fazlar yalnızca `bad.md` bulgularından türetildi.
>
> Gelecek ajanlara not: Phase 16 (`16.1–16.9`), Phase 17 (`17.1–17.8`) ve Phase 18 (`18.1–18.10`)
> tamamlandı — açık madde kalmadı. Yeni iş `PROGRESS.md` Handoff bölümünden devam eder.

---

## Phase 16 — URL / state / payload bütünlüğü (bad.md Bölüm A)

- [x] 16.1 URL override'larını sanitize et (A4.1).
      Acceptance: `App.jsx` mount override bloğu ham `setState` yerine alan-whitelist + `sanitizePayload`
      eşdeğeri doğrulamadan geçer; geçersiz `?mod/?format/?seviye/?derinlik` domain-default'a düşer ve kullanıcıya
      bildirilir; `?hedef=` ya desteklenir ya da dokümante şekilde yok sayılır; `?konu/?alan` 10000 sınırına uyar.
  - [x] 16.1.1 `?seviye/?mod/?derinlik/?format/?konu/?alan` için doğrulama yolu ekle (share/import yoluyla aynı sözleşme).
  - [x] 16.1.2 Geçersiz `?domain/?preset/?modules` durumlarında sessiz no-op yerine toast/uyarı göster.
- [x] 16.2 `hedef`'i URL kanonik durumuna dahil et (A4.4).
      Acceptance: sync efekti `hedef != 'markdown'` iken `?hedef=` yazar, mount onu okur; paylaşım → kopyalanan
      URL → yeniden açma döngüsünde `config.hedef` korunur (openai-json round-trip testi).
- [x] 16.3 Preset-kural bulaşmasını kapat (A2.1–A2.3).
      Acceptance: `toggleModule` müdahalesinde `injectedRules` ya temizlenir ya da "özel kurallar korundu" rozetiyle
      açıkça gösterilir (karar kayıtlı); `serializeState` + `loadRecipe` + `applySharedState` kural setini taşır/sıfırlar;
      Tarif-B yükleme sonrası prompt'ta Tarif-A kuralı kalmaz (testli).
- [x] 16.4 Paylaşım bütünlük bildirimi (A3.1–A3.2).
      Acceptance: `sanitizePayload` düşürdüğü/ikame ettiği alanlar için `warnings[]` döner; share/import akışı bunları
      toast/liste ile gösterir; `encodePayloadToParam === ''` ise paylaşım hata toast'ı verir, bozuk link kopyalanmaz.
- [x] 16.5 `?modules=` ham-id ıraksamasını kapat (A4.6).
      Acceptance: bilinmeyen modül id'si state'te tutulmaz veya UI'da "bilinmeyen modül atlandı" olarak işaretlenir;
      chip/URL ile prompt içeriği birebir eşleşir.
- [x] 16.6 `view`/`gorunum` ikiliğini tekilleştir (A5).
      Acceptance: `view` ya kaldırılır ya render'a bağlanır; `Header` tour-mantığı `gorunum`'a taşınır; tarif/paylaşım
      alıcının `gorunum` tercihini zorlamaz; ölü `backToIntro`/intro yorumları temizlenir.
- [x] 16.7 Derleyici ölçüm tutarlılığı (A7.2).
      Acceptance: `analyzePromptComplexity` `forceTarget` parametresi alır; `ActionBar` ölçümü gönderilen temsille yapar.
- [x] 16.8 Kopya-hatası geri bildirimi (A8.1).
      Acceptance: pano yazımı başarısız olursa kullanıcıya hata toast'ı gösterilir (özellikle Claude yolu).
- [x] 16.9 Döngüsel-bağımlılık dayanıklılığı (A6.1).
      Acceptance: `sortDependencies` throw'u assemble/analyze katmanında yakalanır, panel hata durumunu gösterir,
      uygulama düşmez (yapay döngülü registry testi).

---

## Phase 17 — Veri / bilingual / validator kapsamı (bad.md Bölüm B)

- [x] 17.1 Prompt-token allowlist (B1.2).
      Acceptance: `structureBuilder`'ın ikame ettiği `{{KONU}}`/`{{ALAN}}` dışında `{{...}}` içeren modül prompt'u
      `npm run validate`'de hata verir (agentarch `variable-ingestion-schema` için istisna kararı kayıtlı);
      tarama tek fonksiyonda, TR/EN ayrı raporlanır.
- [x] 17.2 `injectRules` yapısal kapısı (B2.3).
      Acceptance: validator `injectRules` array-oluşunu, boş-olmamasını ve placeholder-regex
      (`/^Apply \w+ domain rule for /`) yakalamasını ekler; 168 placeholder + 12 boş `edudesign` listelenir ve
      gerçek kurallarla değiştirilince kapı yeşile döner.
- [x] 17.3 `label-tags` kararı + vocab parity (B3.1).
      Acceptance: ya `i18n.targets/targetDescs`'ten `label-tags` çıkarılır ya 4. formatter eklenip `OUTPUT_TARGETS`
      4'lenir; validator `i18n.targets ↔ OUTPUT_TARGETS ↔ FORMATTERS` üçlü parity denetler; `MEMORY.md:73-78` ve
      `ARCHITECTURE.md` formatter listesi düzeltilir.
- [x] 17.4 `compilerTexts` tam-kapsam denetimi (B2.4).
      Acceptance: `derinlik.*`, `labels`, `contextLabels`, `monologueText` ve TR/EN yapısal parity validator'a eklenir;
      learning-fallback'a güvenen yeni domain validasyondan geçemez (own-bundle eksikse hata).
- [x] 17.5 Öneri-boşluğu görünürlüğü (B2.5).
      Acceptance: 13 kural-kapsanmayan domain ya `SUGGESTION_RULES`'a kurallar eklenerek kapatılır ya `ModuleGrid`
      fallback'i "öneri yok" diye etiketlenir; `npm run validate` çıktısında hangi domain'in önerisiz olduğu görülür.
- [x] 17.6 `icon` atıllığı + ikon kaydı sözleşmesi (B1.1).
      Acceptance: ya modül JSON `icon` alanı kaldırılır/kullanılır ya da "ikon `MODULE_ICONS`'tan gelir" dokümanda tek
      kaynaktan yazılır; yeni modülde `MODULE_ICONS` girişi validator tarafından denetlenir.
- [x] 17.7 Ölü option-set dallarını netleştir (B2.1).
      Acceptance: `levelIds/modeIds/depthIds/formatIds` ya speclere eklenir ya `ConfigPanel`/`statePayload` fallback
      dalları + doküman anlatımı sadeleştirilir ("çift-kaynak" riski kapatılır).
- [x] 17.8 `getIcon` güvenli hale getir (B3.2).
      Acceptance: bilinmeyen ikon id'si `undefined` yerine güvenli fallback döner veya validator `ICONS` varlığını
      denetler; yanlış id render crash'i yapmaz (testli).

---

## Phase 18 — Test / eşik / CSS / a11y / bakım borcu (bad.md Bölüm C)

- [x] 18.1 Eşik üçlüsünü tek sabite bağla (A7.3 + C1.3).
      Acceptance: 2000/3800/4000 yerine `src/config/` altında tek limit modülü; üç tüketici (`finalPromptAssembler`,
      `aiRouter`, `ActionBar`) oradan import eder; üç eşiğin tutarlılığını çapraz kontrol eden test eklenir, e2e+stress geçer.
- [x] 18.2 `test` scripti + CI kapısı (C1.1 + C1.4).
      Acceptance: `package.json`'a `test` scripti eklenir (e2e + stress koşar, exit kodu yayılır); `.github/workflows/`
      altında `lint + validate + test` koşan workflow eklenir; validator kapsam-dışı listesi dokümanda adlandırılır (§7.8).
- [x] 18.3 Mock-theater temizliği (C1.2).
      Acceptance: clipboard/popup testleri gerçek `copyToClipboard` fallback zincirini ve `openInAI` sıralama sözleşmesini
      çalıştırır (sadece mock-kendi-kendini-doğrulama kalmaz); sentetik-DAG testleri gerçek registry taramasıyla birlikte
      işaretlenir; UI/render/a11y için en az duman testi eklenir veya eksiklik `PROGRESS.md`'de kayıtlı borç olur.
- [x] 18.4 Light-mode kontrast onarımı (C3.5).
      Acceptance: `--text-muted` (light) kontrastı ≥4.5:1 olur (hesap + manuel tur); placeholder ve ikincil metinler dahil.
- [x] 18.5 CSS animasyon + ölü stil temizliği (C3.1–C3.2).
      Acceptance: `drawerFadeIn` ya tanımlanır ya üç kullanım silinir; ölü `intro-*`/`.footer` CSS'i silinir;
      `grep drawerFadeIn` tanım+kullanım eşleşir; build+lint geçer.
- [x] 18.6 z-index + hardcoded renk borcu (C3.3–C3.4).
      Acceptance: merkezi z-index ölçeği/token tanımlanır, hover `!important` yükseltmeler kaldırılır; `!important`
      tooltip bloklarındaki hardcoded renkler tema token'larına taşınır (light/dark görsel tur).
- [x] 18.7 Tooltip + odak a11y (C6 + C2.5).
      Acceptance: `PortalTooltip` `role="tooltip"` + `aria-describedby` ile tetikleyiciye bağlanır; modül kartı gerçek
      `<button>` olur; Toast `role/alert` çelişkisi giderilir; modal focus-trap/geri-dönüş odağı doğrulanır.
- [x] 18.8 Katmanlama kuralını denetlenebilir yaz (C2.1–C2.3).
      Acceptance: CLAUDE.md §5.1 "ui salt-okunur compiler çağrısı yapabilir, engine yazma yolu kullanamaz" şeklinde
      netleşir veya istisna §5.1'e taşınır; `App.jsx` override + `ActionBar` storage yazımı action'lara taşınır;
      `ModuleGrid` UI-gömülü öneri politikası engine'e taşınır veya karar kayıtlanır.
- [x] 18.9 Ölü kod + doküman-drift temizliği (C4–C5).
      Acceptance: `Header.jsx:51` ölü ternary, `backToIntro`/intro yorumları, kök scratch/mockup/legacy dosyaları için
      "silindi/tutuldu-gerekçesi" kararı kayıtlı ve uygulanmış; CLAUDE.md §5.2/§5.3 15-domain gerçekliğine güncellenir;
      §2 test scriptlerini anlatır; MEMORY.md `App.css`/`tmp`/share-`replaceState` satırları düzeltilir;
      ARCHITECTURE.md ağacı 7 yeni UI bileşenini içerir.
- [x] 18.10 Ölü bağımlılık + marka kontrolü (C7).
      Acceptance: `@types/*` kaldırılır (build+lint geçer); `SiOpenaigym` ChatGPT buton markası doğrulanır/düzeltilir.
