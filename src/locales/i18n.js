import { DEFAULT_DOMAIN, getDomain } from '../domains/index.js';

// UI strings. Chrome shared across domains (buttons, toasts, tour, footer,
// badge, recipes, target syntax, etc.) lives at the top level.
// Domain-specific UI strings (titles, labels, optionSets, categories, presetGroups)
// live inside src/domains/specs/*Spec.js and are merged dynamically by getTranslation(lang, domain).
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
    toastNeedTopic: 'Lütfen konuyu girin.',
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

    // Common panel titles (fallback if domain spec does not provide)
    modulesTitle: 'Modüller (Module Blocks)',
    presetsTitle: 'Uzman Hazır Şablonları (System Presets)',
    paramsTitle: 'Parametreler',
    moduleFilterEmpty: 'Arama kriterine uygun modül bulunamadı.',

    // Two-view flow (intro <-> workspace) & Tier B target-format selector
    btnOpenWorkspace: 'Çalışma alanını aç',
    btnStartManual: 'Modülleri kendim seçeceğim',
    btnBackToIntro: 'Konuyu değiştir',
    flow: {
      brandTitle: 'PREMPT — Parametric Prompting Operating System',
      brandTagline: 'Kötü AI yanıtlarını daha oluşmadan önle.',
      modeDefault: 'Standart',
      modeAdvanced: 'Kokpit',
      steps: ['Alan', 'Başlangıç', 'İhtiyaç', 'Ayarlar', 'Hazır'],
      chooseDomainTitle: 'Bugün hangi alanda çalışmak istiyorsun?',
      chooseDomainDesc: 'Bir alan seç; PREMPT geri kalan adımları senin için sadeleştirsin.',
      recommendedDomains: 'Hızlı başlangıçlar',
      showAllDomains: 'Tüm alanları göster',
      showFeaturedDomains: 'Önerilenleri göster',
      recommendedPresetsTitle: 'Sana uygun başlangıçlar',
      recommendedPresetsDesc: 'Bir başlangıç seç, sonra istersen ayarları birlikte şekillendirelim.',
      showAllPresets: 'Tüm presetleri göster',
      hidePresets: 'Daha az göster',
      topicTitle: 'İhtiyacını anlat',
      topicDesc: 'Ne üretmek, çözmek veya öğrenmek istiyorsun?',
      parametersTitle: 'Yanıtı şekillendir',
      parametersDesc: 'Varsayılanları kullanabilir veya her seçeneği kendi amacına göre ayarlayabilirsin.',
      outputTitle: 'Promptun hazır',
      outputDesc: 'Promptu kopyala, paylaş veya seçtiğin AI çalışma alanına gönder.',
      continue: 'Devam et',
      back: 'Geri',
      useDefaults: 'Varsayılanlarla devam et',
      startAdvanced: 'Gelişmiş görünüme geç',
      preview: 'Prompt önizlemesi',
      showPreview: 'Önizlemeyi göster',
      hidePreview: 'Önizlemeyi gizle',
      presetHint: 'Bir başlangıç seçmeden devam etmek için Gelişmiş görünüme geçebilirsin.'
    },
    targetLabel: 'Prompt Sözdizimi',
    targets: {
      markdown: 'Markdown',
      'claude-xml': 'Claude XML',
      'openai-json': 'OpenAI JSON',
      'label-tags': 'Etiket Blokları'
    },
    targetDescs: {
      markdown: 'Markdown: Başlıklı, düz metin. Her AI sohbetine doğrudan yapıştırılabilir.',
      'claude-xml': 'Claude XML: Blokları <role>/<instructions> gibi etiketlere sarar. Yapıştırılabilir düz metindir.',
      'openai-json': 'OpenAI JSON: Sistem mesajı JSON nesnesi üretir. API ve kopyalama amaçlıdır.',
      'label-tags': 'Etiket Blokları: [ROLE] ve [GOAL] gibi açık etiket blokları kullanır.'
    },

    // Recipes & Sharing
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

    // Intelligence & UI Strings
    systemIntelligence: 'Sistem Zekası:',
    presetAppliedDesc: 'şablonu uygulandı. Derinlik, mod ve parametreler kilitlendi.',
    autoResolved: 'Otomatik eklendi',
    aiSuggestion: 'AI Önerisi',
    clickToAdd: 'Eklemek için tıkla',
    suggestAdd: 'kapsamı genişletmek için eklenebilir.',
    statModules: 'Modül',
    statLayers: 'Katman Derinliği',
    statComplexity: 'Karmaşıklık Skoru',
    emptyStateHint: 'Henüz modül seçmedin. Yukarıdaki hazır şablonlardan biriyle hızlıca başlayabilir veya aşağıdan elle modül seçebilirsin.',
    moduleSearchPlaceholder: 'Modül ara...',
    moduleViewRecommended: 'Önerilen',
    moduleViewSelected: 'Seçilenler',
    moduleViewAll: 'Tümü',
    moduleCategoryAll: 'Tüm kategoriler',
    moduleCollapse: 'Kategoriyi daralt',
    moduleExpand: 'Kategoriyi genişlet',

    // Progressive Unified Workspace
    activeModulesSummary: 'Aktif Modüller',
    modulesActiveLabel: 'Modül Aktif',
    selectedModules: 'Seçili Modüller',
    removeModule: 'kaldır',
    removeModuleAria: '{{name}} modülünü kaldır',
    ejectPresetTooltip: 'Şablon kilidini aç (özelleştirilebilir bağımsız bloklara dönüştür)',
    ejectBtn: 'Özelleştir',
    expandInspector: 'Blokları Düzenle',
    collapseInspector: 'Blokları Daralt',
    inspectorTitle: 'Modül Denetçisi',
    activeConstraintRules: 'Aktif Şablon Kuralı',
    viewModeLabel: 'Çalışma Alanı Görünümü',
    modeUnified: 'Standart',
    modeCockpit: 'Kokpit',
    contextualTuning: 'Bağlamsal Ayarlar',
    heroPresetsTitle: 'Öne Çıkan Şablonlar',
    morePresetsBtn: 'Diğer Şablonlar',
    morePresetsTitle: 'Tüm Şablonlar',
    urlSafe: 'URL Güvenli',
    urlExceeded: 'URL Sınırı Aşıldı (Kopyalanacak)',
    topicHeroHint: 'Konuyu girip Enter tuşuna basarak hızlıca kopyalayabilirsiniz.',

    tour: {
      btnSkip: 'Geç',
      btnNext: 'Sonraki',
      btnBack: 'Geri',
      btnFinish: 'Bitir',
      btnReplay: 'Kullanım Turu'
    },
    tourSteps: [
      {
        title: 'PREMPT Parametrik Motora Hoş Geldiniz',
        desc: 'Yapay zeka modellerinden deterministik, yüksek kaliteli yanıtlar almak için tasarlanmış modüler mimariyi keşfedin.',
        selector: 'body'
      },
      {
        title: '15 Uzmanlık Alanı',
        desc: 'Mühendislikten akademik yazıma, stratejiden eğitime 15 farklı alana tek tıkla geçiş yapabilirsiniz.',
        selector: '.domain-switcher-container'
      },
      {
        title: 'Parametreler ve Ayarlar',
        desc: 'Persona, derinlik, format ve iç akıl yürütme (reasoning) anahtarlarını bu panelden yapılandırın.',
        selector: '.sidebar'
      },
      {
        title: 'Konu, Şablonlar ve Modüller',
        desc: 'Konunuzu girin, uzman hazır şablonlarını seçin veya 457 modül bloğunu dilediğiniz gibi birleştirin.',
        selector: '.main-content'
      },
      {
        title: 'Canlı Önizleme ve AI Aktarımı',
        desc: 'Oluşturulan promptu anlık olarak inceleyin ve ChatGPT, Claude, Gemini veya Perplexity ortamına tek tıkla aktarın.',
        selector: '.right-sidebar'
      }
    ]
  },
  en: {
    badge: 'PROMPTER',
    monologLabel: 'Internal Monologue (Reasoning)',
    autoResolveLabel: 'Auto-Resolve Dependencies',
    monologDesc: "Triggers the AI's background thinking/reasoning steps, enabling it to produce more logical and consistent responses.",
    autoResolveDesc: 'Automatically detects and activates other modules required by your selected modules.',
    selectAll: 'Select All',
    clearAll: 'Clear All',
    reqsLabel: 'Requires',
    btnCopy: 'Copy',
    btnReset: 'Reset',
    toastSuccess: 'Prompt generated successfully!',
    toastNeedTopic: 'Please enter a topic.',
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

    // Common panel titles (fallback if domain spec does not provide)
    modulesTitle: 'Module Blocks',
    presetsTitle: 'System Presets',
    paramsTitle: 'Parameters',
    moduleFilterEmpty: 'No modules found matching your search.',

    // Two-view flow (intro <-> workspace) & Tier B target-format selector
    btnOpenWorkspace: 'Open workspace',
    btnStartManual: "I'll pick modules myself",
    btnBackToIntro: 'Change topic',
    flow: {
      brandTitle: 'PREMPT — Parametric Prompting Operating System',
      brandTagline: 'Pre-empt bad AI answers before they happen.',
      modeDefault: 'Standard',
      modeAdvanced: 'Cockpit',
      steps: ['Domain', 'Start', 'Need', 'Settings', 'Ready'],
      chooseDomainTitle: 'What would you like to work on today?',
      chooseDomainDesc: 'Choose a domain and PREMPT will simplify the rest of the journey.',
      recommendedDomains: 'Quick starts',
      showAllDomains: 'Show all domains',
      showFeaturedDomains: 'Show recommendations',
      recommendedPresetsTitle: 'Recommended starting points',
      recommendedPresetsDesc: 'Choose a starting point, then shape the details if you want.',
      showAllPresets: 'Show all presets',
      hidePresets: 'Show fewer',
      topicTitle: 'Describe what you need',
      topicDesc: 'What do you want to create, solve, or learn?',
      parametersTitle: 'Shape the response',
      parametersDesc: 'Use the defaults or tune each option for your goal.',
      outputTitle: 'Your prompt is ready',
      outputDesc: 'Copy, share, or send the prompt to your chosen AI workspace.',
      continue: 'Continue',
      back: 'Back',
      useDefaults: 'Continue with defaults',
      startAdvanced: 'Open Advanced mode',
      preview: 'Prompt preview',
      showPreview: 'Show preview',
      hidePreview: 'Hide preview',
      presetHint: 'To continue without a starting point, open Advanced mode.'
    },
    targetLabel: 'Prompt Syntax',
    targets: {
      markdown: 'Markdown',
      'claude-xml': 'Claude XML',
      'openai-json': 'OpenAI JSON',
      'label-tags': 'Label Tags'
    },
    targetDescs: {
      markdown: 'Markdown: Headed plain text. Pastes directly into any AI chat.',
      'claude-xml': 'Claude XML: Wraps blocks in tags like <role>/<instructions>. Still plain, pasteable text.',
      'openai-json': 'OpenAI JSON: Produces a system-message JSON object. API and copy use only.',
      'label-tags': 'Label Tags: Uses bracketed tag blocks like [ROLE] and [GOAL].'
    },

    // Recipes & Sharing
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

    // Intelligence & UI Strings
    systemIntelligence: 'System Intelligence:',
    presetAppliedDesc: 'template applied. Depth, mode, and parameters are locked.',
    autoResolved: 'Auto-resolved',
    aiSuggestion: 'AI Suggestion',
    clickToAdd: 'Click to add',
    suggestAdd: 'recommended for better context.',
    statModules: 'Modules',
    statLayers: 'Layers Deep',
    statComplexity: 'Complexity Score',
    emptyStateHint: "You haven't selected any modules yet. Start quickly with one of the presets above, or pick modules manually below.",
    moduleSearchPlaceholder: 'Search modules...',
    moduleViewRecommended: 'Recommended',
    moduleViewSelected: 'Selected',
    moduleViewAll: 'All',
    moduleCategoryAll: 'All categories',
    moduleCollapse: 'Collapse category',
    moduleExpand: 'Expand category',

    // Progressive Unified Workspace
    activeModulesSummary: 'Active Modules',
    modulesActiveLabel: 'Modules Active',
    selectedModules: 'Selected Modules',
    removeModule: 'remove',
    removeModuleAria: 'Remove module {{name}}',
    ejectPresetTooltip: 'Unlock preset into independent customizable blocks',
    ejectBtn: 'Customize',
    expandInspector: 'Customize Blocks',
    collapseInspector: 'Collapse Blocks',
    inspectorTitle: 'Module Inspector',
    activeConstraintRules: 'Active Preset Rules',
    viewModeLabel: 'Workspace View',
    modeUnified: 'Standard',
    modeCockpit: 'Cockpit',
    contextualTuning: 'Contextual Tuning',
    heroPresetsTitle: 'Hero Presets',
    morePresetsBtn: 'More Presets',
    morePresetsTitle: 'All Presets',
    urlSafe: 'URL Safe',
    urlExceeded: 'URL Limit Exceeded (Will Copy)',
    topicHeroHint: 'Type your topic and press Enter to quickly compile or copy.',

    tour: {
      btnSkip: 'Skip',
      btnNext: 'Next',
      btnBack: 'Back',
      btnFinish: 'Finish',
      btnReplay: 'Quick Tour'
    },
    tourSteps: [
      {
        title: 'Welcome to PREMPT Engine',
        desc: 'Explore the modular architecture engineered to extract deterministic, high-rigor outputs from AI models.',
        selector: 'body'
      },
      {
        title: '15 Specialized Domains',
        desc: 'Seamlessly switch across 15 domains ranging from software engineering to academic research and strategy.',
        selector: '.domain-switcher-container'
      },
      {
        title: 'Parameters & Controls',
        desc: 'Configure personas, analysis depths, output formats, and internal reasoning monologues.',
        selector: '.sidebar'
      },
      {
        title: 'Topic, Presets & Modules',
        desc: 'Define your subject, apply curated system presets, or combine from 457 modular prompt blocks.',
        selector: '.main-content'
      },
      {
        title: 'Live Preview & AI Dispatch',
        desc: 'Inspect the compiled prompt in real-time and export directly to ChatGPT, Claude, Gemini, or Perplexity.',
        selector: '.right-sidebar'
      }
    ]
  }
};

export function getTranslation(lang = 'tr', domain = DEFAULT_DOMAIN) {
  const base = i18n[lang] || i18n.tr;
  const domainDef = getDomain(domain);
  const domainStrings = domainDef?.ui?.[lang] || domainDef?.ui?.tr || {};
  return { ...base, ...domainStrings };
}
