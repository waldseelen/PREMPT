import { DEFAULT_DOMAIN, getDomain } from '../domains/index.js';

// UI strings. Chrome shared across domains (buttons, toasts, tour, footer,
// badge, etc.) lives at the top level. Everything that varies by domain
// (titles, option-set labels/descriptions, presets, module categories) lives
// under i18n[lang].domains[domainId] and is shallow-merged over the top
// level by getTranslation(lang, domain) — domain keys win on collision.
export const i18n = {
 tr: {
 badge: 'PROMPTER',
 monologLabel: 'İç Ses (Reasoning) Modu',
 autoResolveLabel: 'Otomatik Bağımlılık Çözme',
 monologDesc: 'Yapay zekanın arka plandaki düşünme adımlarını (reasoning) tetikleyerek daha mantıklı ve tutarlı yanıtlar üretmesini sağlar.',
 autoResolveDesc: 'Seçtiğiniz bir modülün çalışması için gereken diğer modülleri otomatik olarak belirler ve listeye ekler.',
 selectAll: 'Tümünü Seç',
 clearAll: 'Temizle',
 reqsLabel: 'Gereksinimler',
 btnCopy: 'Kopyala',
 btnReset: 'Sıfırla',
 toastSuccess: 'Prompt başarıyla oluşturuldu!',
 toastNeedTopic: 'Lütfen öğrenmek istediğiniz konuyu girin.',
 toastNeedModule: 'Lütfen en az bir modül seçin.',
 toastNeedPrompt: 'Önce bir konu girip en az bir modül seçmelisiniz.',
 toastCopied: 'Panoya kopyalandı!',
 toastCopyFail: 'Kopyalama başarısız oldu.',
 toastUrlLimit: 'Prompt çok uzun! URL sınırına takılmamak için panoya kopyalayıp yönlendiriyoruz...',
 toastOpening: 'Yapay Zeka açılıyor...',
 toastReset: 'Tüm ayarlar sıfırlandı.',
 toastTargetTextOnly: 'OpenAI JSON hedefi yalnızca kopyalama içindir; AI butonları için Markdown metni gönderiliyor.',
 previewTitle: 'Prompt Önizleme',
 previewChars: 'Karakter',
 previewTokens: 'Token',
 previewModules: 'modül',
 previewWarning: 'Uyarı: Bu prompt URL üzerinden taşınamayacak kadar uzun (>4000 karakter). Doğrudan AI butonlarına tıkladığınızda önce panoya kopyalanacak, ardından AI sayfası boş açılacaktır. Oraya yapıştırmanız (Ctrl+V) gerekecektir.',
 previewEmpty: 'Bir konu girip modül seçtiğinizde prompt burada canlı olarak görünecek.',
 footer: 'Tüm veriler tarayıcınızda (Local Storage) kalır, hiçbir sunucuya gönderilmez.',

 // Two-view flow (intro <-> workspace) & Tier B target-format selector —
 // shared chrome, not domain-specific.
 btnOpenWorkspace: 'Çalışma alanını aç',
 btnStartManual: 'Modülleri kendim seçeceğim',
 btnBackToIntro: 'Konuyu değiştir',
 targetLabel: 'Prompt Sözdizimi',
 targets: {
   markdown: 'Markdown',
   'claude-xml': 'Claude XML',
   'openai-json': 'OpenAI JSON'
 },
 targetDescs: {
   markdown: 'Markdown: Başlıklı, düz metin. Her AI sohbetine doğrudan yapıştırılabilir.',
   'claude-xml': "Claude XML: Blokları <role>/<instructions> gibi etiketlere sarar. Yine yapıştırılabilir düz metindir.",
   'openai-json': 'OpenAI JSON: Sistem mesajı JSON nesnesi üretir. Sohbete yapıştırılamaz; yalnızca kopyalama/API kullanımı içindir.'
 },

 // Recipes & Sharing (domain'e özgü değil, paylaşılan chrome)
 recipesTitle: 'Kayıtlı Tarifler',
 recipeNamePlaceholder: 'Tarif adı...',
 btnSaveRecipe: 'Kaydet',
 btnLoadRecipe: 'Yükle',
 btnDeleteRecipe: 'Sil',
 recipesEmpty: 'Henüz kayıtlı tarif yok. Mevcut ayarları ve modülleri kaydetmek için "Kaydet"e tıklayın.',
 toastRecipeSaved: 'Tarif kaydedildi!',
 toastRecipeDeleted: 'Tarif silindi.',
 toastRecipeNeedName: 'Lütfen bir isim girin.',
 btnShare: 'Paylaş',
 toastShareCopied: 'Paylaşım linki panoya kopyalandı!',
 toastShareLong: 'Link kopyalandı, ancak konu/alan metni uzun olduğu için bazı platformlarda kırpılabilir.',
 btnExport: 'Dışa Aktar',
 btnImport: 'İçe Aktar',
 toastImportSuccess: 'Ayarlar içe aktarıldı!',
 toastImportFail: 'Geçersiz veya bozuk dosya.',

 // New Intelligence & UI Strings
 systemIntelligence: 'Sistem Zekası:',
 presetAppliedDesc: 'modu uygulandı. Derinlik ve mod konfigürasyonu en iyi pratiklere göre kilitlendi. Öğrenme kuralları motora enjekte edildi.',
 autoResolved: 'Otomatik eklendi',
 aiSuggestion: 'AI Önerisi',
 clickToAdd: 'Eklemek için tıkla',
 suggestAdd: 'kapsamı genişletmek için eklenebilir.',
 statModules: 'Modül',
 statLayers: 'Katman Derinliği',
 statComplexity: 'Karmaşıklık Skoru',
 emptyStateHint: 'Henüz modül seçmedin. Yukarıdaki hazır şablonlardan biriyle hızlıca başlayabilir veya aşağıdan elle modül seçebilirsin.',
 tour: {
    btnSkip: 'Geç',
    btnNext: 'Sonraki',
    btnBack: 'Geri',
    btnFinish: 'Bitir',
    btnReplay: 'Kullanım Turu'
  },
  domains: {
    learning: {
      switchLabel: 'Öğren',
      title: 'Parametrik Prompt Mühendisi',
      subtitle: 'Herhangi bir konuyu sistematik olarak parçala, analiz et, öğren.',
      topicLabel: 'Öğrenilecek Konu',
      topicPlaceholder: 'Transformer Mimarisi, Otonom Sinir Sistemi...',
      domainLabel: 'Hakim Olduğunuz Alan',
      domainPlaceholder: 'Yazılım Mühendisliği, Elektrik Devreleri...',
      levelLabel: 'Bilgi Seviyesi',
      modeLabel: 'Öğrenme Modu',
      depthLabel: 'Analiz Derinliği',
      formatLabel: 'Çıktı Formatı',
      levels: {
        otomatik: 'Otomatik (AI Belirler)',
        acemi: 'Acemi',
        orta: 'Orta',
        ileri: 'İleri',
        uzman: 'Uzman'
      },
      modes: {
        karma: 'Karma (Adaptif)',
        feynman: 'Feynman',
        sistem: 'Sistem Analizi',
        sokratik: 'Sokratik',
        ilkeler: 'Birinci İlkeler'
      },
      depths: {
        orta: 'Orta',
        temel: 'Temel',
        derin: 'Derin',
        kapsamli: 'Kapsamlı'
      },
      formats: {
        markdown: 'Markdown',
        tablo: 'Tablo Ağırlıklı',
        ders: 'Ders Notu',
        quiz: 'Quiz Destekli'
      },
      levelDescs: {
        otomatik: 'Otomatik: AI seviyeyi konunun karmaşıklığına göre kendisi ayarlar.',
        acemi: 'Acemi: Teknik terim kullanmadan, en basit benzetmelerle anlatır.',
        orta: 'Orta: Temel kavramları ve yaygın pratik kullanımları içerir.',
        ileri: 'İleri: Derinlemesine teknik ayrıntılara, matematiksel/yapısal modellere yer verir.',
        uzman: 'Uzman: Sektörel standartlarda, ileri düzey akademik ve teknik terminoloji kullanır.'
      },
      modeDescs: {
        karma: 'Karma: Konunun ihtiyacına göre pedagojik yöntemleri harmanlar.',
        feynman: 'Feynman: Karmaşık konuları 5 yaşındaki bir çocuğa anlatır gibi basitleştirir.',
        sistem: 'Sistem Analizi: Girdiler, çıktılar, geri beslemeler ve alt sistemleri inceler.',
        sokratik: 'Sokratik: Sorular ve sorgulamalar üzerinden kritik düşünmeyi teşvik eder.',
        ilkeler: 'Birinci İlkeler: Varsayımları yıkarak konuyu en temel kanıtlanmış gerçeklerine indirger.'
      },
      depthDescs: {
        temel: 'Temel: Temel kavramları ve genel resmi hızlıca özetler.',
        orta: 'Orta: Standart ana hatları ve mekanizmaları açıklar.',
        derin: 'Derin: Alt bileşenleri, örnekleri ve detaylı işleyişi ele alır.',
        kapsamli: 'Kapsamlı: Uç durumları, sınırları, tarihçeyi ve tüm detayları kapsar.'
      },
      formatDescs: {
        markdown: 'Markdown: Başlıklar, listeler ve kod bloklarıyla temiz bir hiyerarşi sunar.',
        tablo: 'Tablo Ağırlıklı: Karşılaştırmalı matrisler ve verileri tablolar halinde düzenler.',
        ders: 'Ders Notu: Müfredat formatında adım adım akademik bir akış sunar.',
        quiz: 'Quiz Destekli: Konu anlatımının sonuna pekiştirici soru ve cevaplar ekler.'
      },
      presetsTitle: 'Hazır Şablonlar',
      paramsTitle: 'Parametreler',
      presets: {
        hizli: 'Hızlı Özet',
        derin: 'Derin Analiz',
        sinav: 'Sınav Hazırlık',
        muhendis: 'Mühendis Yaklaşımı',
        tam: 'Tam Paket',
        arastirmaci: 'Araştırmacı',
        temeller: 'Temeller',
        pratik: 'Pratik Uygulama',
        hata: 'Hata Ayıklama',
        yaratici: 'Yaratıcı Sentez',
        karsilastir: 'Karşılaştır & Karar Ver',
        mulakat: 'Mülakat Hazırlığı'
      },
      presetGroups: {
        understand: 'Anla',
        analyze: 'Analiz Et',
        apply: 'Uygula'
      },
      presetDescriptions: {
        hizli: 'Konunun özünü hızlıca, gereksiz detaya girmeden özetler.',
        derin: 'Konuyu temel ilkelerine kadar söker, karşıt görüşleri ve varsayımları da işler.',
        sinav: 'Hatırlama odaklı sorularla ve aralıklı tekrar mantığıyla sınava hazırlar.',
        muhendis: 'Sıfırdan nasıl inşa edileceğini, mimari kararları ve mühendislik ödünleşimlerini anlatır.',
        tam: 'Konuyu hiçbir taşı yerinde bırakmadan, en kapsamlı şekilde ele alır.',
        arastirmaci: 'Akademik bir araştırmacı gibi tarihsel bağlam ve rakip teorilerle sunar.',
        temeller: 'Hiçbir ileri konuya geçmeden önce, birinci ilkelerden sağlam bir temel kurar.',
        pratik: "80/20 kuralıyla en pratik, gerçek dünya benzetmelerine odaklanır.",
        hata: 'Tek nokta arızalarını ve bu kavramın ne zaman/neden çöktüğünü inceler.',
        yaratici: 'Disiplinler arası zihinsel modelleri birleştirip yaratıcı senaryolar üretir.',
        karsilastir: 'Alternatifleri yapılandırılmış şekilde karşılaştırır, net bir tavsiyeyle sonuçlandırır.',
        mulakat: 'Konuyu sesli anlatabilme becerisini ve olası mülakat sorularına hazırlanmayı hedefler.'
      },
      modulesTitle: 'Öğrenme Modülleri',
      categories: {
        foundation: 'Temeller & Giriş',
        mechanism: 'İşleyiş & Simülasyon',
        context: 'Bağlantılar',
        boundaries: 'Sınırlar & Riskler',
        application: 'Pratik & Gelişim'
      },
      suggestionReasons: {
        quizNeedsFoundations: 'Quiz seçtiniz; sağlam bir temel için önce bunu ekleyin.',
        basicNeedsMentalModel: 'Temel derinlik seçili; akılda kalıcı bir zihinsel model anlamayı hızlandırır.',
        lectureNeedsPrereqs: 'Ders Notu formatı seçili; ön koşulları netleştirmek akışı daha sağlam kurar.',
        expertNeedsBoundaries: 'Uzman seviyesi seçili; sınır koşullarını ve varsayımları da görmelisiniz.',
        firstPrinciplesNeedsMisconceptions: 'Birinci İlkeler modundasınız; yaygın yanılgıları sorgulamak bu yaklaşımı tamamlar.'
      },
      tourSteps: [
        {
          title: "PROMPTER'a Hoş Geldiniz!",
          content: "Yapay zekadan en derinlikli ve yapılandırılmış yanıtları almak için tasarlanmış gelişmiş parametrik prompt mühendisine adım attınız. Bu kısa turda arayüzü hızlıca tanıyalım.",
          selector: "body"
        },
        {
          title: "Öğren ↔ Kod Geçişi",
          content: "Sol üstteki bu geçiş menüsüyle Öğren ve Kod modları arasında anında geçiş yapabilirsiniz — ikisi de aynı motoru kullanır ama modülleri, parametreleri ve üretilen promptlar tamamen farklıdır.",
          selector: ".domain-switch"
        },
        {
          title: "1. Parametre Konfigürasyonu",
          content: "Buradan yapay zekanın bilgi seviyesini, öğrenme modunu (Feynman, Sokratik vb.), analiz derinliğini ve çıktı formatını ayarlayabilirsiniz. İç Ses (Reasoning) modunu açarak AI'ın arka plandaki düşünme adımlarını tetikleyebilirsiniz.",
          selector: ".sidebar"
        },
        {
          title: "2. Öğrenme Modülleri",
          content: "Modülleri (Analoji, Kodlama, Quiz vb.) tek tek ekleyip çıkarabilirsiniz. Yeşil onay işareti, bir modülün başka seçili bir modül tarafından ön koşul olarak otomatik eklendiğini; AI rozeti ise önerilen isteğe bağlı bir modülü gösterir.",
          selector: ".main-content"
        },
        {
          title: "3. Canlı Prompt ve Gönderim",
          content: "Sağda promptunuz seçtiğiniz her modülle birlikte anında derlenir. Kopyalayın veya doğrudan ChatGPT, Claude, Gemini ya da Perplexity'ye gönderin; mevcut kurulumu Paylaş/Dışa Aktar ile de saklayabilirsiniz.",
          selector: ".right-sidebar"
        }
      ]
    },
    code: {
      switchLabel: 'Kod',
      title: 'Parametrik Kod Mühendisi',
      subtitle: "Yazılımı sistematik olarak tasarla, geliştir, incele ve yayına al.",
      topicLabel: 'Yapılacak Görev / Özellik',
      topicPlaceholder: "API'ye rate limiting ekle, Auth modülünü refactor et...",
      domainLabel: 'Teknoloji Yığınınız / Alan',
      domainPlaceholder: 'Node.js + PostgreSQL, React + TypeScript...',
      levelLabel: 'Hedef Olgunluk',
      modeLabel: 'Mühendislik Persona',
      depthLabel: 'Analiz Derinliği',
      formatLabel: 'Kod Çıktı Formatı',
      levels: {
        otomatik: 'Otomatik (AI Belirler)',
        prototype: 'Prototip',
        production: 'Production',
        hardened: 'Sertleştirilmiş'
      },
      modes: {
        senior: 'Kıdemli Mühendis',
        reviewer: 'Kod İnceleyici',
        architect: 'Mimar',
        pair: 'Eş Programlama',
        security: 'Güvenlik Mühendisi'
      },
      depths: {
        orta: 'Orta',
        temel: 'Temel',
        derin: 'Derin',
        kapsamli: 'Kapsamlı'
      },
      formats: {
        explained: 'Açıklamalı',
        full: 'Tam Dosya',
        diff: 'Diff',
        stepwise: 'Adım Adım'
      },
      levelDescs: {
        otomatik: 'Otomatik: AI olgunluk beklentisini görevin karmaşıklığına göre ayarlar.',
        prototype: 'Prototip: Hız önceliklidir; production sertleştirmesi değil, çalışan bir kanıt konsepti hedeflenir.',
        production: 'Production: Sağlam, test edilmiş, sürdürülebilir, yayına hazır kod.',
        hardened: "Sertleştirilmiş: Güvenlik, ölçek ve edge case'ler için denetlenmiş production kod."
      },
      modeDescs: {
        senior: 'Kıdemli Mühendis: Kod kalitesini, sürdürülebilirliği ve doğru ödünleşimleri önceliklendirir.',
        reviewer: 'Kod İnceleyici: Doğruluk, tasarım ve okunabilirliği eleştirel gözle değerlendirir.',
        architect: 'Mimar: Sistemleri bileşenlere ayırır ve uzun vadeli yapısal kararları gerekçelendirir.',
        pair: 'Eş Programlama: Düşünce sürecini paylaşır, alternatifleri birlikte tartışır.',
        security: 'Güvenlik Mühendisi: Her kod parçasını bir saldırganın gözünden değerlendirir.'
      },
      depthDescs: {
        temel: 'Temel: Sadece temel yaklaşımı ve sonucu verir, ayrıntıya girmez.',
        orta: 'Orta: Ana mantığı ve önemli tasarım kararlarını açıklar.',
        derin: "Derin: Edge case'leri, alternatifleri ve gerekçeleri örneklerle ele alır.",
        kapsamli: "Kapsamlı: Hiçbir edge case, risk veya alternatifi atlamaz."
      },
      formatDescs: {
        explained: 'Açıklamalı: Her önemli bloğun hemen altında kısa açıklamalarla kod verir.',
        full: 'Tam Dosya: Kesilmemiş, tam ve çalıştırılabilir dosya içeriğini verir.',
        diff: 'Diff: Değişikliği unified diff formatında (+/- satırlarıyla) sunar.',
        stepwise: 'Adım Adım: Çözümü adım adım, her adımı açıklayarak inşa eder.'
      },
      presetsTitle: 'Hazır Şablonlar',
      paramsTitle: 'Parametreler',
      presets: {
        'ship-feature': 'Özellik Yayınla',
        'code-review': 'Kod İncelemesi',
        debug: 'Hata Ayıklama',
        refactor: 'Refactor',
        'system-design': 'Sistem Tasarımı',
        onboard: 'Oryantasyon',
        harden: 'Sertleştirme',
        document: 'Dokümantasyon',
        'security-review': 'Güvenlik İncelemesi',
        'test-strategy': 'Test Stratejisi',
        'perf-tune': 'Performans',
        modernize: 'Legacy Modernizasyon'
      },
      presetGroups: {
        build: 'Geliştir',
        'review-harden': 'İncele & Sağlamlaştır',
        understand: 'Anla'
      },
      presetDescriptions: {
        'ship-feature': 'Netleştirilmiş gereksinimlerden çalışan, test edilmiş bir özellik teslim eder.',
        'code-review': 'Kodu güvenlik ve performans açısından inceleyip net bir onay/red kararıyla biter.',
        debug: 'Kök nedeni kanıtla doğrulamadan çözüm önermez, iz sürme ve regresyon testi ister.',
        refactor: 'Davranışı bozmadan kodu iyileştirir, değişikliği diff olarak sunar.',
        'system-design': 'Mimariyi, API sözleşmesini ve veri modelini birlikte, gerekçeli kararlarla tasarlar.',
        onboard: 'Yeni bir katkıcının ilk saatini optimize eden bir kod tabanı haritası ve okuma sırası sunar.',
        harden: 'Saldırgan gibi düşünerek güvenlik açıklarını ve uç durumları avlar.',
        document: 'Kodu çalıştırabilen ama zihnini okuyamayan bir okuyucu için belgeler.',
        'security-review': 'Tehdit modellemeden altyapı güvenliğine, uçtan uca bir güvenlik denetimi yapar.',
        'test-strategy': 'Kapsam sayısını değil, gerçekten regresyon yakalayacak testleri tasarlar.',
        'perf-tune': 'Önce darboğazı profille bulur, sonra somut bir performans iyileştirmesi önerir.',
        modernize: 'Legacy kodu davranışını koruyarak, adım adım modern hale getirir.'
      },
      modulesTitle: 'Kod Modülleri',
      categories: {
        design: 'Tasarım',
        build: 'Geliştirme',
        comprehend: 'Kavrama',
        harden: 'Sertleştirme',
        ship: 'Yayınlama'
      },
      suggestionReasons: {
        implementNeedsTests: 'Implementasyon/hata ayıklama seçili; testler olmadan doğruluğu kanıtlayamazsınız.',
        architectureNeedsApiDesign: 'Mimari seçili; arayüz sözleşmesini de netleştirmelisiniz.',
        architectureNeedsThreatModel: 'Mimari seçili; olası saldırı yüzeylerini de haritalamalısınız.',
        hardenedNeedsSecurity: 'Sertleştirilmiş seviye seçili; güvenlik ve uç durum denetimi şart.',
        migrationNeedsTests: 'Göç/modernizasyon seçili; davranışın korunduğunu testlerle doğrulamalısınız.'
      },
      tourSteps: [
        {
          title: "PROMPTER'a Hoş Geldiniz! (Kod Modu)",
          content: "Yapay zekadan yapılandırılmış, production'a hazır mühendislik promptları almak için tasarlanmış parametrik kod mühendisine adım attınız. Bu kısa turda arayüzü hızlıca tanıyalım.",
          selector: "body"
        },
        {
          title: "Öğren ↔ Kod Geçişi",
          content: "Sol üstteki bu geçiş menüsüyle Öğren ve Kod modları arasında anında geçiş yapabilirsiniz — ikisi de aynı motoru kullanır ama modülleri, parametreleri ve üretilen promptlar tamamen farklıdır.",
          selector: ".domain-switch"
        },
        {
          title: "1. Parametre Konfigürasyonu",
          content: "Buradan hedef olgunluğu (Prototip, Production, Sertleştirilmiş), mühendislik personasını (Kıdemli, İnceleyici, Mimar vb.), analiz derinliğini ve kod çıktı formatını ayarlayabilirsiniz. İç Ses modunu açarak AI'ın arka plandaki düşünme adımlarını tetikleyebilirsiniz.",
          selector: ".sidebar"
        },
        {
          title: "2. Kod Modülleri",
          content: "Modülleri (Gereksinimler, Mimari, Testler, Güvenlik vb.) tek tek ekleyip çıkarabilirsiniz. Yeşil onay işareti, bir modülün başka seçili bir modülün ön koşulu olarak otomatik eklendiğini; AI rozeti ise önerilen isteğe bağlı bir modülü gösterir.",
          selector: ".main-content"
        },
        {
          title: "3. Canlı Prompt ve Gönderim",
          content: "Sağda promptunuz seçtiğiniz her modülle birlikte anında derlenir. Kopyalayın veya doğrudan ChatGPT, Claude, Gemini ya da Perplexity'ye gönderin; mevcut kurulumu Paylaş/Dışa Aktar ile de saklayabilirsiniz.",
          selector: ".right-sidebar"
        }
      ]
    }
  }
 },
 en: {
 badge: 'PROMPTER',
 monologLabel: 'Internal Monologue (Reasoning)',
 autoResolveLabel: 'Auto-Resolve Dependencies',
 monologDesc: "Triggers the AI's background thinking/reasoning steps, enabling it to produce more logical and consistent responses.",
 autoResolveDesc: "Automatically detects and activates other modules required by your selected modules.",
 selectAll: 'Select All',
 clearAll: 'Clear All',
 reqsLabel: 'Requires',
 btnCopy: 'Copy',
 btnReset: 'Reset',
 toastSuccess: 'Prompt generated successfully!',
 toastNeedTopic: 'Please enter a topic to learn.',
 toastNeedModule: 'Please select at least one module.',
 toastNeedPrompt: 'Enter a topic and select at least one module first.',
 toastCopied: 'Copied to clipboard!',
 toastCopyFail: 'Failed to copy.',
 toastUrlLimit: 'Prompt is too long! To avoid URL limits, we copied it to your clipboard...',
 toastOpening: 'Opening AI...',
 toastReset: 'All settings reset.',
 toastTargetTextOnly: 'The OpenAI JSON target is copy-only; sending Markdown text to the AI button instead.',
 previewTitle: 'Prompt Preview',
 previewChars: 'Chars',
 previewTokens: 'Tokens',
 previewModules: 'modules',
 previewWarning: 'Warning: This prompt is too long to be passed via URL (>4000 chars). It will be copied to your clipboard and the AI page will open blank. You will need to paste it (Ctrl+V) there.',
 previewEmpty: 'The prompt will appear live here once you enter a topic and select modules.',
 footer: 'All data stays in your browser (Local Storage), nothing is sent to any server.',

 // Two-view flow (intro <-> workspace) & Tier B target-format selector —
 // shared chrome, not domain-specific.
 btnOpenWorkspace: 'Open workspace',
 btnStartManual: "I'll pick modules myself",
 btnBackToIntro: 'Change topic',
 targetLabel: 'Prompt Syntax',
 targets: {
   markdown: 'Markdown',
   'claude-xml': 'Claude XML',
   'openai-json': 'OpenAI JSON'
 },
 targetDescs: {
   markdown: 'Markdown: Headed plain text. Pastes directly into any AI chat.',
   'claude-xml': 'Claude XML: Wraps blocks in tags like <role>/<instructions>. Still plain, pasteable text.',
   'openai-json': "OpenAI JSON: Produces a system-message JSON object. Not pasteable into chat — copy/API use only."
 },

 // Recipes & Sharing (not domain-specific, shared chrome)
 recipesTitle: 'Saved Recipes',
 recipeNamePlaceholder: 'Recipe name...',
 btnSaveRecipe: 'Save',
 btnLoadRecipe: 'Load',
 btnDeleteRecipe: 'Delete',
 recipesEmpty: 'No saved recipes yet. Click "Save" to store the current settings and modules.',
 toastRecipeSaved: 'Recipe saved!',
 toastRecipeDeleted: 'Recipe deleted.',
 toastRecipeNeedName: 'Please enter a name.',
 btnShare: 'Share',
 toastShareCopied: 'Share link copied to clipboard!',
 toastShareLong: 'Link copied, but it may get truncated on some platforms since the topic/domain text is long.',
 btnExport: 'Export',
 btnImport: 'Import',
 toastImportSuccess: 'Settings imported!',
 toastImportFail: 'Invalid or corrupted file.',

 // New Intelligence & UI Strings
 systemIntelligence: 'System Intelligence:',
 presetAppliedDesc: 'mode applied. Depth and format locked to best practices. Learning rules injected into engine.',
 autoResolved: 'Auto-resolved',
 aiSuggestion: 'AI Suggestion',
 clickToAdd: 'Click to add',
 suggestAdd: 'recommended for better context.',
 statModules: 'Modules',
 statLayers: 'Layers Deep',
 statComplexity: 'Complexity Score',
 emptyStateHint: "You haven't selected any modules yet. Start quickly with one of the presets above, or pick modules manually below.",
 tour: {
    btnSkip: 'Skip',
    btnNext: 'Next',
    btnBack: 'Back',
    btnFinish: 'Finish',
    btnReplay: 'Quick Tour'
  },
  domains: {
    learning: {
      switchLabel: 'Learn',
      title: 'Parametric Prompt Engineer',
      subtitle: 'Systematically deconstruct, analyze, and learn any topic.',
      topicLabel: 'Topic to Learn',
      topicPlaceholder: 'Transformer Architecture, Autonomic Nervous System...',
      domainLabel: 'Your Domain Expertise',
      domainPlaceholder: 'Software Engineering, Electrical Circuits...',
      levelLabel: 'Knowledge Level',
      modeLabel: 'Learning Mode',
      depthLabel: 'Analysis Depth',
      formatLabel: 'Output Format',
      levels: {
        otomatik: 'Auto (AI decides)',
        acemi: 'Novice',
        orta: 'Intermediate',
        ileri: 'Advanced',
        uzman: 'Expert'
      },
      modes: {
        karma: 'Mixed (Adaptive)',
        feynman: 'Feynman',
        sistem: 'System Analysis',
        sokratik: 'Socratic',
        ilkeler: 'First Principles'
      },
      depths: {
        orta: 'Moderate',
        temel: 'Basic',
        derin: 'Deep',
        kapsamli: 'Comprehensive'
      },
      formats: {
        markdown: 'Markdown',
        tablo: 'Table Heavy',
        ders: 'Lecture Notes',
        quiz: 'With Quizzes'
      },
      levelDescs: {
        otomatik: 'Auto: AI determines the explanation level based on topic complexity.',
        acemi: 'Novice: Explains simply using basic analogies, avoiding technical jargon.',
        orta: 'Intermediate: Covers main concepts and common practical applications.',
        ileri: 'Advanced: Introduces technical details, mathematical/structural models.',
        uzman: 'Expert: Utilizes high-level academic and professional industry terminology.'
      },
      modeDescs: {
        karma: 'Mixed: Blends pedagogical methods adaptively based on topic needs.',
        feynman: 'Feynman: Explains complex ideas simply as if teaching a 5-year-old child.',
        sistem: 'System Analysis: Examines inputs, outputs, feedbacks, and subsystems.',
        sokratik: 'Socratic: Prompts critical thinking through guiding questions.',
        ilkeler: 'First Principles: Deconstructs topic down to its most fundamental truths.'
      },
      depthDescs: {
        temel: 'Basic: Summarizes core concepts and the high-level big picture.',
        orta: 'Moderate: Details standard outlines and mechanisms.',
        derin: 'Deep: Investigates sub-components, examples, and detailed inner workings.',
        kapsamli: 'Comprehensive: Explores edge cases, limits, history, and exhaustive details.'
      },
      formatDescs: {
        markdown: 'Markdown: Organized hierarchy using headers, lists, and code blocks.',
        tablo: 'Table Heavy: Arranges comparisons and datasets in structured tables.',
        ders: 'Lecture Notes: Formats in academic curriculum style step-by-step.',
        quiz: 'With Quizzes: Adds interactive exercises and tests to consolidate learning.'
      },
      presetsTitle: 'Quick Presets',
      paramsTitle: 'Parameters',
      presets: {
        hizli: 'Quick Summary',
        derin: 'Deep Analysis',
        sinav: 'Exam Prep',
        muhendis: 'Engineering',
        tam: 'Full Package',
        arastirmaci: 'Researcher',
        temeller: 'Foundations',
        pratik: 'Practical App',
        hata: 'Debugging',
        yaratici: 'Creative Synth',
        karsilastir: 'Compare & Decide',
        mulakat: 'Interview Prep'
      },
      presetGroups: {
        understand: 'Understand',
        analyze: 'Analyze',
        apply: 'Apply'
      },
      presetDescriptions: {
        hizli: 'Summarizes the essence of the topic quickly, without unnecessary detail.',
        derin: 'Breaks the topic down to first principles, including opposing views and assumptions.',
        sinav: 'Prepares for exams with recall-focused questions and spaced-repetition logic.',
        muhendis: 'Explains how to build this from scratch, focusing on architecture and engineering tradeoffs.',
        tam: 'Covers the topic as exhaustively as possible, leaving nothing out.',
        arastirmaci: 'Presents the topic like an academic researcher, with historical context and competing theories.',
        temeller: 'Builds a solid foundation from first principles before touching any advanced topic.',
        pratik: 'Focuses on the most practical, real-world analogies using the 80/20 rule.',
        hata: 'Examines single points of failure and exactly when/why this concept breaks down.',
        yaratici: 'Combines cross-disciplinary mental models to produce creative scenarios.',
        karsilastir: 'Structures a comparison of the alternatives and ends with a clear recommendation.',
        mulakat: 'Prepares you to explain the topic out loud, anticipating likely interview questions.'
      },
      modulesTitle: 'Learning Modules',
      categories: {
        foundation: 'Foundations & Intro',
        mechanism: 'Mechanics & Sim',
        context: 'Connections',
        boundaries: 'Limits & Risks',
        application: 'Practice & Growth'
      },
      suggestionReasons: {
        quizNeedsFoundations: 'You selected Quiz; add this first for a solid foundation.',
        basicNeedsMentalModel: 'Basic depth selected; a memorable mental model speeds up understanding.',
        lectureNeedsPrereqs: 'Lecture Notes format selected; clarifying prerequisites makes the flow more solid.',
        expertNeedsBoundaries: 'Expert level selected; you should also see the boundary conditions and assumptions.',
        firstPrinciplesNeedsMisconceptions: "You're in First Principles mode; questioning common misconceptions completes this approach."
      },
      tourSteps: [
        {
          title: "Welcome to PROMPTER!",
          content: "You have entered the advanced parametric prompt engineer designed to get the most structured and deep responses from AI. Let's take a quick tour of the interface.",
          selector: "body"
        },
        {
          title: "Learn ↔ Code Switch",
          content: "Use this switcher, top-left, to jump between Learning and Code mode at any time — both share the same engine, but each has its own modules, parameters, and generated prompts.",
          selector: ".domain-switch"
        },
        {
          title: "1. Parameter Configuration",
          content: "Here you can adjust the AI's knowledge level, learning mode (Feynman, Socratic, etc.), analysis depth, and output format. Toggle Internal Monologue (Reasoning) to activate the AI's background thinking steps.",
          selector: ".sidebar"
        },
        {
          title: "2. Learning Modules",
          content: "Add or remove individual modules (Analogy, Coding, Quiz, etc.) here. A green checkmark means a module was auto-added as a prerequisite of another selected module; an AI badge marks an optional suggested module.",
          selector: ".main-content"
        },
        {
          title: "3. Live Prompt & Hand-off",
          content: "Your prompt compiles instantly on the right as you select modules. Copy it or send it directly to ChatGPT, Claude, Gemini, or Perplexity — you can also save the current setup via Share/Export.",
          selector: ".right-sidebar"
        }
      ]
    },
    code: {
      switchLabel: 'Code',
      title: 'Parametric Code Engineer',
      subtitle: 'Systematically design, build, review, and ship software.',
      topicLabel: 'Task / Feature to Build',
      topicPlaceholder: 'Add rate limiting to the API, Refactor the auth module...',
      domainLabel: 'Your Tech Stack / Domain',
      domainPlaceholder: 'Node.js + PostgreSQL, React + TypeScript...',
      levelLabel: 'Target Maturity',
      modeLabel: 'Engineering Persona',
      depthLabel: 'Analysis Depth',
      formatLabel: 'Code Output Format',
      levels: {
        otomatik: 'Auto (AI decides)',
        prototype: 'Prototype',
        production: 'Production',
        hardened: 'Hardened'
      },
      modes: {
        senior: 'Senior Engineer',
        reviewer: 'Code Reviewer',
        architect: 'Architect',
        pair: 'Pair Programmer',
        security: 'Security Engineer'
      },
      depths: {
        orta: 'Moderate',
        temel: 'Basic',
        derin: 'Deep',
        kapsamli: 'Comprehensive'
      },
      formats: {
        explained: 'Explained',
        full: 'Full File',
        diff: 'Diff',
        stepwise: 'Step-by-Step'
      },
      levelDescs: {
        otomatik: "Auto: AI adjusts maturity expectations to the task's complexity.",
        prototype: 'Prototype: Optimizes for speed — a working proof of concept, not production hardening.',
        production: 'Production: Solid, tested, maintainable code ready to ship.',
        hardened: 'Hardened: Production code audited for security, scale, and edge cases.'
      },
      modeDescs: {
        senior: 'Senior Engineer: Prioritizes code quality, maintainability, and sound tradeoffs.',
        reviewer: 'Code Reviewer: Critically evaluates correctness, design, and readability.',
        architect: 'Architect: Decomposes systems into components and justifies long-term structural decisions.',
        pair: 'Pair Programmer: Shares reasoning and discusses alternatives collaboratively.',
        security: "Security Engineer: Evaluates every piece of code through an attacker's mindset."
      },
      depthDescs: {
        temel: 'Basic: Gives only the core approach and result, skips the detail.',
        orta: 'Moderate: Explains the main logic and key design decisions.',
        derin: 'Deep: Covers edge cases, alternatives, and rationale with examples.',
        kapsamli: 'Comprehensive: Leaves no edge case, risk, or alternative unexamined.'
      },
      formatDescs: {
        explained: 'Explained: Code with short explanations directly under each significant block.',
        full: 'Full File: Complete, uncut, runnable file content — no fragments or placeholders.',
        diff: 'Diff: The change presented as a unified diff (+/- lines).',
        stepwise: 'Step-by-Step: Builds the solution incrementally, explaining what and why at each step.'
      },
      presetsTitle: 'Quick Presets',
      paramsTitle: 'Parameters',
      presets: {
        'ship-feature': 'Ship Feature',
        'code-review': 'Code Review',
        debug: 'Debug',
        refactor: 'Refactor',
        'system-design': 'System Design',
        onboard: 'Onboard',
        harden: 'Harden',
        document: 'Document',
        'security-review': 'Security Review',
        'test-strategy': 'Test Strategy',
        'perf-tune': 'Performance',
        modernize: 'Legacy Modernization'
      },
      presetGroups: {
        build: 'Build',
        'review-harden': 'Review & Harden',
        understand: 'Understand'
      },
      presetDescriptions: {
        'ship-feature': 'Delivers a working, tested feature from a clarified requirement.',
        'code-review': 'Reviews code for security and performance, ending in an explicit approve/reject verdict.',
        debug: "Won't propose a fix until the root cause is confirmed with evidence; includes a regression test.",
        refactor: 'Improves the code without changing behavior, presented as a diff.',
        'system-design': 'Designs architecture, API contract, and data model together, justifying every decision.',
        onboard: "Maps the codebase and reading order to optimize a new contributor's first hour.",
        harden: 'Thinks like an attacker to hunt down security holes and edge cases.',
        document: 'Documents for a reader who can run the code but not read your mind.',
        'security-review': 'Runs an end-to-end security pass, from threat modeling to infrastructure hardening.',
        'test-strategy': 'Designs tests that would actually catch regressions, not just raise coverage numbers.',
        'perf-tune': 'Profiles the actual bottleneck first, then proposes a concrete performance fix.',
        modernize: "Modernizes legacy code incrementally while preserving its external behavior."
      },
      modulesTitle: 'Code Modules',
      categories: {
        design: 'Design',
        build: 'Build',
        comprehend: 'Comprehend',
        harden: 'Harden',
        ship: 'Ship'
      },
      suggestionReasons: {
        implementNeedsTests: "Implementation/debugging selected; you can't prove correctness without tests.",
        architectureNeedsApiDesign: 'Architecture selected; you should also nail down the interface contract.',
        architectureNeedsThreatModel: 'Architecture selected; you should also map the potential attack surface.',
        hardenedNeedsSecurity: 'Hardened level selected; a security and edge-case pass is essential.',
        migrationNeedsTests: 'Migration/modernization selected; you need tests to prove behavior is preserved.'
      },
      tourSteps: [
        {
          title: "Welcome to PROMPTER! (Code Mode)",
          content: "You have entered the parametric code engineer designed to get structured, production-ready engineering prompts from AI. Let's take a quick tour of the interface.",
          selector: "body"
        },
        {
          title: "Learn ↔ Code Switch",
          content: "Use this switcher, top-left, to jump between Learning and Code mode at any time — both share the same engine, but each has its own modules, parameters, and generated prompts.",
          selector: ".domain-switch"
        },
        {
          title: "1. Parameter Configuration",
          content: "Here you can adjust the target maturity (Prototype, Production, Hardened), engineering persona (Senior, Reviewer, Architect, etc.), analysis depth, and code output format. Toggle Internal Monologue to activate the AI's background reasoning steps.",
          selector: ".sidebar"
        },
        {
          title: "2. Code Modules",
          content: "Add or remove individual modules (Requirements, Architecture, Tests, Security, etc.) here. A green checkmark means a module was auto-added as a prerequisite of another selected module; an AI badge marks an optional suggested module.",
          selector: ".main-content"
        },
        {
          title: "3. Live Prompt & Hand-off",
          content: "Your prompt compiles instantly on the right as you select modules. Copy it or send it directly to ChatGPT, Claude, Gemini, or Perplexity — you can also save the current setup via Share/Export.",
          selector: ".right-sidebar"
        }
      ]
    }
  }
 }
};


export function getTranslation(lang, domain = DEFAULT_DOMAIN) {
  const base = i18n[lang] || i18n.en;
  const domainDef = getDomain(domain);
  const domainStrings = domainDef?.ui?.[lang] || domainDef?.uiStrings?.[lang] || base.domains?.[domain] || base.domains?.[DEFAULT_DOMAIN] || {};
  return { ...base, ...domainStrings };
}
