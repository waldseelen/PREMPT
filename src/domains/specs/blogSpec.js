export const blogSpec = {
  "id": "blog",
  "route": "blog",
  "defaultConfig": {
    "seviye": "kisa",
    "mod": "aciklayici",
    "derinlik": "ampirik",
    "format": "writingnotes"
  },
  "icon": "file-text",
  "category": "creation",
  "layers": [
    "triage",
    "evidence",
    "dialectic",
    "structure",
    "anti-patterns"
  ],
  "ui": {
    "tr": {
      "title": "Blog & Editoryal Analiz",
      "subtitle": "BLOG.md esaslı kanıt hiyerarşisi ve Steelman diyalektiği ile yaz.",
      "topicLabel": "Yazı Konusu & Savunulan Tez",
      "topicPlaceholder": "Uzaktan çalışmanın şirket kültürüne ampirik etkisi...",
      "domainLabel": "Hedef Okuyucu & Platform",
      "domainPlaceholder": "Medium, Kıdemli Yöneticiler...",
      "levelLabel": "Yazı Türü",
      "modeLabel": "Yazar Sesi",
      "depthLabel": "Kanıt Modu",
      "formatLabel": "İskelet Formatı",
      "presetGroups": {
        "structure": "Yazı Yapısı & Taslak",
        "dialectic": "Diyalektik & Tezler",
        "style": "Üslup, SEO & Otorite"
      },
      "categories": {
        "triage": "Kitle & Niyet",
        "evidence": "Kanıt & Argüman",
        "dialectic": "Diyalektik & Karşıt Görüş",
        "structure": "Akış & Yapı",
        "anti-patterns": "Klişe & Düzeltme"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
    },
    "en": {
      "title": "Blog & Editorial Architect",
      "subtitle": "Structure articles using BLOG.md evidence hierarchy and steelman dialectics.",
      "topicLabel": "Topic & Core Thesis",
      "topicPlaceholder": "Empirical impact of remote work on company culture...",
      "domainLabel": "Target Audience & Platform",
      "domainPlaceholder": "Medium, Senior Executives...",
      "levelLabel": "Article Scale",
      "modeLabel": "Writer Voice",
      "depthLabel": "Evidence Mode",
      "formatLabel": "Outline Syntax",
      "presetGroups": {
        "structure": "Structure & Outline",
        "dialectic": "Dialectic & Argumentation",
        "style": "Tone, SEO & Authority"
      },
      "categories": {
        "triage": "Audience & Intent",
        "evidence": "Evidence & Arguments",
        "dialectic": "Dialectics & Counter-Views",
        "structure": "Narrative & Structure",
        "anti-patterns": "Anti-Patterns & Polish"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
    }
  },
  "optionSets": {
    "levels": {
      "kisa": {
        "tr": "Kısa Makale (~800k)",
        "en": "Short Article (~800w)"
      },
      "editoryal": {
        "tr": "Editoryal İnceleme (~1800k)",
        "en": "Editorial Review (~1800w)"
      },
      "arastirma": {
        "tr": "Derin Araştırma (~3500k)",
        "en": "Deep Research (~3500w)"
      }
    },
    "modes": {
      "polemik": {
        "tr": "Polemik & Eleştirel",
        "en": "Polemics & Critical"
      },
      "aciklayici": {
        "tr": "Açıklayıcı Editoryal",
        "en": "Explanatory Editorial"
      },
      "deneme": {
        "tr": "Felsefi Deneme",
        "en": "Philosophical Essay"
      }
    },
    "depths": {
      "ampirik": {
        "tr": "Ampirik (Meta-analiz/DOI)",
        "en": "Empirical (Meta-analysis/DOI)"
      },
      "teorik": {
        "tr": "Teorik (Birincil Metin)",
        "en": "Theoretical (Primary Source)"
      },
      "hibrit": {
        "tr": "Hibrit",
        "en": "Hybrid"
      }
    },
    "formats": {
      "writingnotes": {
        "tr": "[YAZIM NOTU] İskelet",
        "en": "[WRITING NOTE] Outline"
      },
      "steelman": {
        "tr": "Steelman Karşı-Taraf",
        "en": "Steelman Opposition File"
      },
      "triyaj": {
        "tr": "Literatür Triyajı Tablosu",
        "en": "Literature Triage Table"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "mod": {
        "polemik": "Sen düşünce lideri ve polemik yazarısın. Statükoyu sarsan, cesur tezler öne süren ve güçlü karşıt argümanları çürüten bir üslup kullanırsın.",
        "aciklayici": "Sen berrak bir teknik ve editoryal yazarsın. Karmaşık fikirleri net metaforlar, kanıtlar ve akıcı bir hikaye kurgusuyla aktarırsın.",
        "deneme": "Sen derinlikli bir deneme ve kültür yazarısın. Olayların arka planındaki insani, felsefi ve tarihsel katmanları işlersin."
      },
      "derinlik": {
        "ampirik": "İçeriği somut veriler, vaka çalışmaları ve istatistiklerle güçlendir.",
        "teorik": "Kavramsal derinlik, düşünce modelleri ve kuramsal arka plan sun.",
        "hibrit": "Hem ampirik verileri hem de güçlü anlatı kurgusunu kusursuz dengele."
      },
      "format": {
        "writingnotes": "Editoryal taslak ve yayın notları formatında yapılandır.",
        "steelman": "Steelman karşılaştırması ve tez-antitez formatında hazırla.",
        "triyaj": "Kitle niyet analizi ve içerik mimarisi formatında sun."
      },
      "labels": {
        "role": "[ROLE]",
        "goal": "[GOAL]",
        "context": "[CONTEXT]",
        "modules": "[ACTIVE MODULES]",
        "instructions": "[INSTRUCTIONS]",
        "format": "[OUTPUT FORMAT]",
        "constraints": "[CONSTRAINTS / SAFETY]"
      },
      "contextLabels": {
        "domain": "Alan:",
        "level": "Seviye:",
        "depthRequirement": "Derinlik Gereksinimi:"
      },
      "goalTemplate": "\"{{KONU}}\" konusunda okuyucuyu derinden yakalayan, kanıt temelli, özgün ve yüksek editoryal kalitede bir içerik mimarisi kurgulamak.",
      "constraintsBase": [
        "Yapay zeka klişelerinden (AI fluff, dolgu cümleler) tamamen kaçın.",
        "Her ana argümanı somut bir örnek veya kanıtla destekle.",
        "Okuyucuya ilk 3 cümlede net bir değer ve kanca (hook) sun."
      ],
      "monologueText": "İÇ SES MODU: İçerik iskeletini oluşturmadan önce (<thinking> tagleri içinde) en güçlü karşı argümanı ve ana tezin zayıf noktalarını test et."
    },
    "en": {
      "mod": {
        "polemik": "You are a thought leader and polemical essayist. You challenge the status quo with bold thesis statements and sharp counter-arguments.",
        "aciklayici": "You are a master technical and editorial writer. You distill complex subjects into lucid prose, evidence, and compelling narrative arcs.",
        "deneme": "You are an insightful long-form essayist. You uncover the cultural, human, and historical layers beneath modern developments."
      },
      "derinlik": {
        "ampirik": "Ground every section with empirical data, case studies, and concrete benchmarks.",
        "teorik": "Provide conceptual rigor, mental models, and deep theoretical context.",
        "hibrit": "Balance rigorous empirical evidence with persuasive narrative momentum."
      },
      "format": {
        "writingnotes": "Format as structured editorial draft with annotations and citations.",
        "steelman": "Structure as a thesis-antithesis-synthesis steelmanning outline.",
        "triyaj": "Format as an audience intent triage and content architecture blueprint."
      },
      "labels": {
        "role": "[ROLE]",
        "goal": "[GOAL]",
        "context": "[CONTEXT]",
        "modules": "[ACTIVE MODULES]",
        "instructions": "[INSTRUCTIONS]",
        "format": "[OUTPUT FORMAT]",
        "constraints": "[CONSTRAINTS / SAFETY]"
      },
      "contextLabels": {
        "domain": "Domain:",
        "level": "Level:",
        "depthRequirement": "Depth Requirement:"
      },
      "goalTemplate": "To architect an engaging, evidence-grounded, original, and highly editorial piece of content on \"{{KONU}}\".",
      "constraintsBase": [
        "Strictly eliminate AI clichés, filler phrasing, and generic platitudes.",
        "Anchor every core claim in concrete examples or data points.",
        "Hook the reader with undeniable value in the opening lines."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before outlining, steelman the opposing viewpoint and stress-test the core premise in <thinking> tags."
    }
  },
  "presets": {
    "blogmd-outline": {
      "id": "blogmd-outline",
      "group": "structure",
      "name": {
        "tr": "BLOG.md Epistemik İskelet",
        "en": "BLOG.md Epistemic Outline"
      },
      "desc": {
        "tr": "Kanıt hiyerarşisi ve editoryal taslak hazırlar.",
        "en": "Generates structured outline with evidence hierarchy."
      },
      "forceModules": [
        "audience-intent-triage"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for blogmd-outline."
      ]
    },
    "steelman-dialectic": {
      "id": "steelman-dialectic",
      "group": "dialectic",
      "name": {
        "tr": "Steelman Karşı-Taraf Analizi",
        "en": "Steelman Opposition File"
      },
      "desc": {
        "tr": "Karşı tezi en güçlü haliyle inşa edip ampirik yanıtlar.",
        "en": "Constructs strongest counter-argument before responding."
      },
      "forceModules": [
        "thesis-sharpener",
        "tone-authority-setter"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for steelman-dialectic."
      ]
    },
    "cliche-purge": {
      "id": "cliche-purge",
      "group": "style",
      "name": {
        "tr": "Klişe & AI Dili Temizleme",
        "en": "AI Fluff & Cliche Purge"
      },
      "desc": {
        "tr": "Yapay zeka kokan süslü lafları ve tonları temizler.",
        "en": "Removes robotic AI phrasing and buzzwords."
      },
      "forceModules": [
        "core-hook-extractor",
        "evidence-hierarchy-audit"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for cliche-purge."
      ]
    },
    "deep-essay": {
      "id": "deep-essay",
      "group": "structure",
      "name": {
        "tr": "Derin Editoryal İnceleme (~2500k)",
        "en": "Deep Editorial Essay"
      },
      "desc": {
        "tr": "Tarihsel ve ampirik kanıtlarla desteklenmiş yazı.",
        "en": "Deep long-form essay with historical context."
      },
      "forceModules": [
        "tone-authority-setter",
        "anecdotal-evidence-test"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for deep-essay."
      ]
    },
    "viral-hook": {
      "id": "viral-hook",
      "group": "style",
      "name": {
        "tr": "Dikkat Çekici Giriş & Hook",
        "en": "Engaging Intro Hook"
      },
      "desc": {
        "tr": "İlk 3 saniyede okuyucuyu yakalayan açılış.",
        "en": "Crafts high-retention hook paragraph."
      },
      "forceModules": [
        "value-prop-alignment",
        "steelman-counter-arg"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for viral-hook."
      ]
    },
    "evidence-triage": {
      "id": "evidence-triage",
      "group": "dialectic",
      "name": {
        "tr": "Kanıt & Literatür Triyajı",
        "en": "Evidence Triage Table"
      },
      "desc": {
        "tr": "Savunulan tezleri ampirik verilerle eşleştirir.",
        "en": "Maps arguments to empirical studies."
      },
      "forceModules": [
        "content-angle-pivot",
        "cognitive-dissonance-hook"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for evidence-triage."
      ]
    },
    "medium-tech": {
      "id": "medium-tech",
      "group": "structure",
      "name": {
        "tr": "Medium / Substack Teknik Yazı",
        "en": "Medium Tech Article"
      },
      "desc": {
        "tr": "Yazılımcılar ve liderler için pratik editoryal.",
        "en": "Technical deep-dive for engineering leads."
      },
      "forceModules": [
        "evidence-hierarchy-audit",
        "outline-builder-notes"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for medium-tech."
      ]
    },
    "storytelling-arc": {
      "id": "storytelling-arc",
      "group": "style",
      "name": {
        "tr": "Anlatı (Storytelling) Mimarisi",
        "en": "Storytelling Narrative Arc"
      },
      "desc": {
        "tr": "Kahramanın yolculuğu kurgusuyla fikir anlatımı.",
        "en": "Frames ideas within narrative storytelling arc."
      },
      "forceModules": [
        "claim-verification-grid",
        "skimmability-formatter"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for storytelling-arc."
      ]
    },
    "seo-authority": {
      "id": "seo-authority",
      "group": "style",
      "name": {
        "tr": "SEO & Otorite Yapılandırması",
        "en": "SEO & Authority Structuring"
      },
      "desc": {
        "tr": "Arama motorları için EEAT kriterlerine uygun.",
        "en": "Optimizes content structure for Google EEAT."
      },
      "forceModules": [
        "data-citation-scrubber",
        "pop-culture-cliche-filter"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for seo-authority."
      ]
    },
    "thought-leadership": {
      "id": "thought-leadership",
      "group": "style",
      "name": {
        "tr": "Sektörel Düşünce Liderliği",
        "en": "Thought Leadership Piece"
      },
      "desc": {
        "tr": "Şirket kurucuları için vizyoner sektör yazısı.",
        "en": "Position founders as industry visionaries."
      },
      "forceModules": [
        "anecdotal-evidence-test",
        "passive-voice-trimmer"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for thought-leadership."
      ]
    },
    "counter-thesis": {
      "id": "counter-thesis",
      "group": "dialectic",
      "name": {
        "tr": "Ezber Bozan Tez Kurgusu",
        "en": "Counter-Intuitive Thesis"
      },
      "desc": {
        "tr": "Genel geçer doğrulara meydan okuyan yaklaşım.",
        "en": "Challenges conventional wisdom with data."
      },
      "forceModules": [
        "expert-quote-integration",
        "audience-intent-triage"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for counter-thesis."
      ]
    },
    "tldr-summary": {
      "id": "tldr-summary",
      "group": "structure",
      "name": {
        "tr": "TL;DR & Yönetici Özeti",
        "en": "Executive TL;DR Summary"
      },
      "desc": {
        "tr": "Acelesi olanlar için 3 maddelik vurucu özet.",
        "en": "Summarizes main take-aways into 3 bullet points."
      },
      "forceModules": [
        "counter-evidence-check",
        "tone-authority-setter"
      ],
      "override": {
        "derinlik": "ampirik",
        "format": "writingnotes",
        "mod": "polemik"
      },
      "injectRules": [
        "Apply blog domain rule for tldr-summary."
      ]
    }
  }
};
