export const academicSpec = {
  "id": "academic",
  "route": "academic",
  "defaultConfig": {
    "seviye": "tez",
    "mod": "reviewer2",
    "derinlik": "lisans",
    "format": "apa"
  },
  "icon": "beaker",
  "category": "academia",
  "layers": [
    "methodology",
    "literature",
    "writing",
    "review",
    "validation"
  ],
  "ui": {
    "tr": {
      "title": "Akademik Araştırma & Metodoloji",
      "subtitle": "Tez, makale ve peer-review süreçlerini akademik titizlikle yönet.",
      "topicLabel": "Araştırma Sorusu / Hipotez",
      "topicPlaceholder": "Yapay zekanın istihdam üzerindeki ampirik etkisi...",
      "domainLabel": "Akademik Disiplin & Metodoloji",
      "domainPlaceholder": "Uygulamalı Ekonometri, Meta-Analiz...",
      "levelLabel": "Çıktı Hedefi",
      "modeLabel": "Hakem Duruşu",
      "depthLabel": "Akademik Seviye",
      "formatLabel": "Yazım Formatı",
      "presetGroups": {
        "research": "Araştırma & Literatür",
        "writing": "Yazım & Metodoloji",
        "review": "Hakem & Denetim"
      }
    },
    "en": {
      "title": "Academic Research & Methodology",
      "subtitle": "Manage thesis, papers, and peer-reviews with rigorous academic standards.",
      "topicLabel": "Research Question / Thesis",
      "topicPlaceholder": "Empirical impact of AI on employment...",
      "domainLabel": "Academic Discipline",
      "domainPlaceholder": "Applied Econometrics, Meta-Analysis...",
      "levelLabel": "Paper Target",
      "modeLabel": "Reviewer Stance",
      "depthLabel": "Academic Rigor",
      "formatLabel": "Format Syntax",
      "presetGroups": {
        "research": "Research & Literature",
        "writing": "Writing & Methodology",
        "review": "Review & Audit"
      }
    }
  },
  "optionSets": {
    "levels": {
      "tez": {
        "tr": "Tez İskeleti",
        "en": "Thesis Outline"
      },
      "hakem": {
        "tr": "Peer-Review Hakem Yanıtı",
        "en": "Peer-Review Response"
      },
      "metodoloji": {
        "tr": "Metodoloji Denetimi",
        "en": "Methodology Audit"
      },
      "tarama": {
        "tr": "Literatür Taraması",
        "en": "Literature Review"
      }
    },
    "modes": {
      "reviewer2": {
        "tr": "Sert Hakem (Reviewer 2)",
        "en": "Strict Reviewer #2"
      },
      "ampirik": {
        "tr": "Ampirik Denetçi",
        "en": "Empirical Auditor"
      },
      "teorisyen": {
        "tr": "Teori Kurucu",
        "en": "Theoretical Synthesizer"
      }
    },
    "depths": {
      "lisans": {
        "tr": "Lisans / Yüksek Lisans",
        "en": "Undergraduate / MSc"
      },
      "doktora": {
        "tr": "Doktora Düzeyi",
        "en": "PhD Level"
      },
      "journal": {
        "tr": "Peer-Reviewed Journal (Q1)",
        "en": "Q1 Peer-Reviewed Journal"
      }
    },
    "formats": {
      "apa": {
        "tr": "APA/IEEE Formatı",
        "en": "APA / IEEE Draft"
      },
      "hakemmatris": {
        "tr": "Hakem Yanıt Matrisi",
        "en": "Reviewer Response Matrix"
      },
      "kunye": {
        "tr": "DOI Künye İskeleti",
        "en": "DOI Citation Outline"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "ARAŞTIRMA HIPOTEZİ",
      "levelHeader": "ÇIKTI HEDEFİ",
      "modeHeader": "HAKEM PERSPEKTİFİ",
      "depthHeader": "AKADEMİK SEVİYE",
      "formatHeader": "YAZIM FORMATI"
    },
    "en": {
      "topicHeader": "RESEARCH HYPOTHESIS",
      "levelHeader": "PAPER TARGET",
      "modeHeader": "REVIEWER STANCE",
      "depthHeader": "ACADEMIC RIGOR",
      "formatHeader": "FORMAT SYNTAX"
    }
  },
  "presets": {
    "reviewer2-audit": {
      "id": "reviewer2-audit",
      "group": "review",
      "name": {
        "tr": "⚔️ Reviewer #2 Stres Testi",
        "en": "⚔️ Reviewer #2 Stress Test"
      },
      "desc": {
        "tr": "Metodolojik zayıflıkları en acımasız hakem gözüyle eleştirir.",
        "en": "Audits paper methodology with strict reviewer eyes."
      },
      "forceModules": [
        "research-question-def",
        "research-question-def"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for reviewer2-audit."
      ]
    },
    "lit-review": {
      "id": "lit-review",
      "group": "research",
      "name": {
        "tr": "📚 Sistematik Literatür Taraması",
        "en": "📚 Systematic Lit Review"
      },
      "desc": {
        "tr": "Mevcut akademik literatürü kronolojik ve teorik sınıflar.",
        "en": "Categorizes academic literature by theoretical frameworks."
      },
      "forceModules": [
        "methodology-triangulation",
        "variable-operationalization"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for lit-review."
      ]
    },
    "thesis-builder": {
      "id": "thesis-builder",
      "group": "writing",
      "name": {
        "tr": "🏛️ Tez & Makale İskeleti",
        "en": "🏛️ Thesis & Paper Outline"
      },
      "desc": {
        "tr": "APA/IEEE formatında hipotez ve bölüm hiyerarşisi kurar.",
        "en": "Structures thesis framework adhering to APA/IEEE."
      },
      "forceModules": [
        "sample-power-analysis",
        "lit-search-strategy"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for thesis-builder."
      ]
    },
    "methodology-audit": {
      "id": "methodology-audit",
      "group": "review",
      "name": {
        "tr": "🔬 İstatistiksel & Ampirik Denetim",
        "en": "🔬 Empirical & Stat Audit"
      },
      "desc": {
        "tr": "Veri setindeki ampirik hataları ve p-hacking riskini tarar.",
        "en": "Audits sample validity and p-hacking risks."
      },
      "forceModules": [
        "variable-operationalization",
        "theoretical-framework"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for methodology-audit."
      ]
    },
    "hypothesis-test": {
      "id": "hypothesis-test",
      "group": "research",
      "name": {
        "tr": "🧪 Hipotez & Değişken Kurgusu",
        "en": "🧪 Hypothesis & Variables"
      },
      "desc": {
        "tr": "Bağımlı/bağımsız değişkenleri ve hipotezleri tanımlar.",
        "en": "Defines dependent, independent, and control variables."
      },
      "forceModules": [
        "quantitative-audit",
        "academic-tone-c2"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for hypothesis-test."
      ]
    },
    "citation-map": {
      "id": "citation-map",
      "group": "research",
      "name": {
        "tr": "🔗 Atıf & DOI Künye Haritası",
        "en": "🔗 Citation & DOI Map"
      },
      "desc": {
        "tr": "Kilit çalışmaları atıf zincirine bağlar.",
        "en": "Maps key foundational papers and DOI citations."
      },
      "forceModules": [
        "qualitative-rigor-check",
        "hedging-claim-calibration"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for citation-map."
      ]
    },
    "abstract-writer": {
      "id": "abstract-writer",
      "group": "writing",
      "name": {
        "tr": "📄 Akademik Abstract (Özet)",
        "en": "📄 Academic Abstract Builder"
      },
      "desc": {
        "tr": "250 kelimelik net yayın özeti tasarlar.",
        "en": "Crafts concise 250-word journal abstract."
      },
      "forceModules": [
        "lit-search-strategy",
        "peer-review-response"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for abstract-writer."
      ]
    },
    "data-validation": {
      "id": "data-validation",
      "group": "review",
      "name": {
        "tr": "📊 Veri Doğrulama & Temizlik",
        "en": "📊 Data Validation Protocol"
      },
      "desc": {
        "tr": "Araştırma verilerinin güvenilirliğini test eder.",
        "en": "Validates dataset integrity and measurement error."
      },
      "forceModules": [
        "lit-gap-identification",
        "major-revision-roadmap"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for data-validation."
      ]
    },
    "theoretical-frame": {
      "id": "theoretical-frame",
      "group": "writing",
      "name": {
        "tr": "🧱 Teorik Çerçeve İnşası",
        "en": "🧱 Theoretical Framework"
      },
      "desc": {
        "tr": "Araştırmanın üzerine oturduğu felsefi altyapı.",
        "en": "Establishes theoretical grounding for thesis."
      },
      "forceModules": [
        "seminal-vs-recent-audit",
        "statistical-validity-audit"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for theoretical-frame."
      ]
    },
    "journal-fit": {
      "id": "journal-fit",
      "group": "writing",
      "name": {
        "tr": "🎯 Q1 Journal Format Adaptasyonu",
        "en": "🎯 Q1 Journal Adaptation"
      },
      "desc": {
        "tr": "Hedef derginin yazım ve üslup standartlarına uyarlar.",
        "en": "Adapts manuscript tone to top Q1 journals."
      },
      "forceModules": [
        "theoretical-framework",
        "external-validity-bounds"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for journal-fit."
      ]
    },
    "peer-response": {
      "id": "peer-response",
      "group": "review",
      "name": {
        "tr": "✉️ Hakem Yanıt Mektubu",
        "en": "✉️ Peer Review Response"
      },
      "desc": {
        "tr": "Hakem eleştirilerine kibar ve bilimsel yanıt matrisi.",
        "en": "Constructs point-by-point response to reviewers."
      },
      "forceModules": [
        "citation-context-check",
        "research-question-def"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for peer-response."
      ]
    },
    "discussion-section": {
      "id": "discussion-section",
      "group": "writing",
      "name": {
        "tr": "🔍 Tartışma & Kısıtlar Bölümü",
        "en": "🔍 Discussion & Limitations"
      },
      "desc": {
        "tr": "Bulguların kısıtlarını ve gelecek çalışmalarını tanımlar.",
        "en": "Articulates study limitations and future research."
      },
      "forceModules": [
        "systematic-review-protocol",
        "variable-operationalization"
      ],
      "override": {
        "derinlik": "orta",
        "format": "apa",
        "mod": "reviewer2"
      },
      "injectRules": [
        "Apply academic domain rule for discussion-section."
      ]
    }
  }
};
