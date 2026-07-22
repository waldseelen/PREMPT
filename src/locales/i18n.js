import { DEFAULT_DOMAIN } from '../domains/index.js';

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
 btnGenerate: 'Prompt Üret',
 btnCopy: 'Kopyala',
 btnReset: 'Sıfırla',
 toastSuccess: 'Prompt başarıyla oluşturuldu!',
 toastNeedTopic: 'Lütfen öğrenmek istediğiniz konuyu girin.',
 toastNeedModule: 'Lütfen en az bir modül seçin.',
 toastNeedPrompt: 'Önce prompt oluşturmalısınız.',
 toastCopied: 'Panoya kopyalandı!',
 toastCopyFail: 'Kopyalama başarısız oldu.',
 toastUrlLimit: 'Prompt çok uzun! URL sınırına takılmamak için panoya kopyalayıp yönlendiriyoruz...',
 toastOpening: 'Yapay Zeka açılıyor...',
 toastReset: 'Tüm ayarlar sıfırlandı.',
 previewTitle: 'Prompt Önizleme',
 previewChars: 'Karakter',
 previewTokens: 'Token',
 previewModules: 'modül',
 previewWarning: 'Uyarı: Bu prompt URL üzerinden taşınamayacak kadar uzun (>4000 karakter). Doğrudan AI butonlarına tıkladığınızda önce panoya kopyalanacak, ardından AI sayfası boş açılacaktır. Oraya yapıştırmanız (Ctrl+V) gerekecektir.',
 previewEmpty: 'Sol taraftan ayarları yapıp "Prompt Oluştur" butonuna tıklayın...',
 footer: 'Tüm veriler tarayıcınızda (Local Storage) kalır, hiçbir sunucuya gönderilmez.',

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
        yaratici: 'Yaratıcı Sentez'
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
          title: "1. Parametre Konfigürasyonu",
          content: "Buradan yapay zekanın bilgi seviyesini, öğrenme modunu (Feynman, Sokratik vb.), analiz derinliğini ve çıktı formatını ayarlayabilirsiniz. İç Ses (Reasoning) modunu açarak AI'ın arka plandaki düşünme adımlarını tetikleyebilirsiniz.",
          selector: ".sidebar"
        },
        {
          title: "2. Şablonlar ve Öğrenme Modülleri",
          content: "Üstteki hazır şablonlarla tek tıkla en iyi ayarları yükleyebilir, altındaki modülleri (Analoji, Kodlama, Quiz vb.) tek tek seçerek promptunuzun hangi öğrenme başlıklarını içereceğini belirleyebilirsiniz.",
          selector: ".main-content"
        },
        {
          title: "3. Konu Girişi ve Üretim",
          content: "Öğrenmek istediğiniz konuyu ve bildiğiniz uzmanlık alanını yazıp 'Prompt Üret' butonuna tıklayın. Oluşan promptu kopyalayarak ChatGPT, Claude veya Gemini gibi AI modellerine doğrudan yapıştırabilirsiniz.",
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
        document: 'Dokümantasyon'
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
          title: "1. Parametre Konfigürasyonu",
          content: "Buradan hedef olgunluğu (Prototip, Production, Sertleştirilmiş), mühendislik personasını (Kıdemli, İnceleyici, Mimar vb.), analiz derinliğini ve kod çıktı formatını ayarlayabilirsiniz. İç Ses modunu açarak AI'ın arka plandaki düşünme adımlarını tetikleyebilirsiniz.",
          selector: ".sidebar"
        },
        {
          title: "2. Şablonlar ve Kod Modülleri",
          content: "Üstteki hazır şablonlarla (Özellik Yayınla, Kod İncelemesi, Hata Ayıklama vb.) tek tıkla en iyi ayarları yükleyebilir, altındaki modülleri (Gereksinimler, Mimari, Testler, Güvenlik vb.) tek tek seçerek promptunuzun neleri kapsayacağını belirleyebilirsiniz.",
          selector: ".main-content"
        },
        {
          title: "3. Görev Girişi ve Üretim",
          content: "Yapmak istediğiniz görevi/özelliği ve teknoloji yığınınızı yazıp 'Prompt Üret' butonuna tıklayın. Oluşan promptu kopyalayarak ChatGPT, Claude veya Gemini gibi AI modellerine doğrudan yapıştırabilirsiniz.",
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
 btnGenerate: 'Generate Prompt',
 btnCopy: 'Copy',
 btnReset: 'Reset',
 toastSuccess: 'Prompt generated successfully!',
 toastNeedTopic: 'Please enter a topic to learn.',
 toastNeedModule: 'Please select at least one module.',
 toastNeedPrompt: 'You need to generate a prompt first.',
 toastCopied: 'Copied to clipboard!',
 toastCopyFail: 'Failed to copy.',
 toastUrlLimit: 'Prompt is too long! To avoid URL limits, we copied it to your clipboard...',
 toastOpening: 'Opening AI...',
 toastReset: 'All settings reset.',
 previewTitle: 'Prompt Preview',
 previewChars: 'Chars',
 previewTokens: 'Tokens',
 previewModules: 'modules',
 previewWarning: 'Warning: This prompt is too long to be passed via URL (>4000 chars). It will be copied to your clipboard and the AI page will open blank. You will need to paste it (Ctrl+V) there.',
 previewEmpty: 'Configure settings on the left and click "Generate Prompt"...',
 footer: 'All data stays in your browser (Local Storage), nothing is sent to any server.',

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
        yaratici: 'Creative Synth'
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
          title: "1. Parameter Configuration",
          content: "Here you can adjust the AI's knowledge level, learning mode (Feynman, Socratic, etc.), analysis depth, and output format. Toggle Internal Monologue (Reasoning) to activate the AI's background thinking steps.",
          selector: ".sidebar"
        },
        {
          title: "2. Presets & Learning Modules",
          content: "Apply quick presets at the top or select individual learning modules (Analogy, Coding, Quiz, etc.) below to define exactly what learning categories your prompt will cover.",
          selector: ".main-content"
        },
        {
          title: "3. Topic Input & Generation",
          content: "Type the topic you want to learn and your expertise, then click 'Generate Prompt'. Copy the generated prompt and paste it directly into AI models like ChatGPT, Claude, or Gemini.",
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
        document: 'Document'
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
          title: "1. Parameter Configuration",
          content: "Here you can adjust the target maturity (Prototype, Production, Hardened), engineering persona (Senior, Reviewer, Architect, etc.), analysis depth, and code output format. Toggle Internal Monologue to activate the AI's background reasoning steps.",
          selector: ".sidebar"
        },
        {
          title: "2. Presets & Code Modules",
          content: "Apply quick presets at the top (Ship Feature, Code Review, Debug, etc.) or select individual code modules (Requirements, Architecture, Tests, Security, etc.) below to define exactly what your prompt covers.",
          selector: ".main-content"
        },
        {
          title: "3. Task Input & Generation",
          content: "Describe the task or feature you want to build and your tech stack, then click 'Generate Prompt'. Copy the generated prompt and paste it directly into AI models like ChatGPT, Claude, or Gemini.",
          selector: ".right-sidebar"
        }
      ]
    }
  }
 }
};

export function getTranslation(lang, domain = DEFAULT_DOMAIN) {
 const base = i18n[lang] || i18n.en;
 // Mirrors getDomain()'s fallback (src/domains/index.js) so an unrecognized
 // domain — e.g. corrupted/stale localStorage — degrades to the same
 // domain everywhere instead of leaving `t.levels`/`t.modes`/etc. undefined
 // while getDomain() has already fallen back to Learning's option-set ids.
 const domainStrings = base.domains?.[domain] || base.domains?.[DEFAULT_DOMAIN] || {};
 return { ...base, ...domainStrings };
}
