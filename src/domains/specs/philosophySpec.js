export const philosophySpec = {
  "id": "philosophy",
  "route": "philosophy",
  "icon": "building2",
  "category": "academia",
  "layers": [
    "logic",
    "ethics",
    "epistemology",
    "thought-experiments",
    "critique"
  ],
  "ui": {
    "tr": {
      "title": "Felsefe & Etik Sorgulayıcı",
      "subtitle": "Etik ikilemleri ve felsefi mantık hatalarını disiplinle denetle.",
      "topicLabel": "Felsefi Problem / Etik İklem",
      "topicPlaceholder": "Otonom araçların kaza anındaki etik tercih mekanizması...",
      "domainLabel": "Felsefi Okul / Bağlam",
      "domainPlaceholder": "Faydaılıcık (Utilitarianism) vs Ödev Ahlakı (Deontoloji)...",
      "levelLabel": "Problem Tipi",
      "modeLabel": "Filozof Persona",
      "depthLabel": "Analiz Derinliği",
      "formatLabel": "Felsefi Format",
      "presetGroups": {
        "logic": "Mantık & Sorgulama",
        "ethics": "Etik & İklem",
        "epistemology": "Epistemoloji & Varlık"
      }
    },
    "en": {
      "title": "Philosophy & Ethics Auditor",
      "subtitle": "Audit ethical dilemmas and logical fallacies with analytical discipline.",
      "topicLabel": "Philosophical Dilemma",
      "topicPlaceholder": "Ethical decision-making algorithm for autonomous vehicles...",
      "domainLabel": "Philosophical Tradition",
      "domainPlaceholder": "Utilitarianism vs Deontology...",
      "levelLabel": "Problem Type",
      "modeLabel": "Philosopher Persona",
      "depthLabel": "Depth Level",
      "formatLabel": "Philosophical Syntax",
      "presetGroups": {
        "logic": "Mantık & Sorgulama",
        "ethics": "Etik & İklem",
        "epistemology": "Epistemoloji & Varlık"
      }
    }
  },
  "optionSets": {
    "levels": {
      "iklem": {
        "tr": "Etik İklem Analizi",
        "en": "Ethical Dilemma Audit"
      },
      "epistemik": {
        "tr": "Epistemik İnceleme",
        "en": "Epistemic Audit"
      },
      "deney": {
        "tr": "Düşünce Deneyi",
        "en": "Thought Experiment"
      },
      "mantik": {
        "tr": "Mantık Hatası Avı",
        "en": "Logical Fallacy Audit"
      }
    },
    "modes": {
      "sokratik": {
        "tr": "Sokratik Sorgulayıcı",
        "en": "Socratic Questioner"
      },
      "stoaci": {
        "tr": "Stoacı / Akılcı",
        "en": "Stoic Rationalist"
      },
      "pozitivist": {
        "tr": "Mantıksal Pozitivist",
        "en": "Logical Positivist"
      },
      "varoluscu": {
        "tr": "Varoluşçu",
        "en": "Existentialist"
      }
    },
    "depths": {
      "temel": {
        "tr": "Popüler Felsefe",
        "en": "Introductory"
      },
      "orta": {
        "tr": "Standart Analiz",
        "en": "Standard Analytical"
      },
      "derin": {
        "tr": "Birincil Metin Düzeyi",
        "en": "Primary Source Level"
      }
    },
    "formats": {
      "diyalog": {
        "tr": "Sokratik Diyalog",
        "en": "Socratic Dialogue"
      },
      "oncul": {
        "tr": "Öncül-Sonuç (Premise-Conclusion)",
        "en": "Premise-Conclusion Spec"
      },
      "matris": {
        "tr": "Etik Karşılaştırma Matrisi",
        "en": "Ethical Comparison Matrix"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "FELSEFİ İKLEM",
      "levelHeader": "PROBLEM TİPİ",
      "modeHeader": "FILOZOF PERSONASI",
      "depthHeader": "ANALİZ DERİNLİĞİ",
      "formatHeader": "FELSEFİ FORMAT"
    },
    "en": {
      "topicHeader": "PHILOSOPHICAL DILEMMA",
      "levelHeader": "PROBLEM TYPE",
      "modeHeader": "PHILOSOPHER PERSONA",
      "depthHeader": "DEPTH LEVEL",
      "formatHeader": "PHILOSOPHICAL SYNTAX"
    }
  },
  "presets": {
    "socratic-aporia": {
      "id": "socratic-aporia",
      "group": "logic",
      "name": {
        "tr": "🏛️ Sokratik Sorgulama & Aporia",
        "en": "🏛️ Socratic Aporia Drill"
      },
      "desc": {
        "tr": "Varsayımları çelişkiye düşene kadar diyalogla sorgular.",
        "en": "Deconstructs concepts through Socratic questioning."
      },
      "forceModules": [
        "fallacy-detector",
        "fallacy-detector"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for socratic-aporia."
      ]
    },
    "ethical-matrix": {
      "id": "ethical-matrix",
      "group": "ethics",
      "name": {
        "tr": "⚖️ Etik İklem Karşılaştırması",
        "en": "⚖️ Ethical Dilemma Matrix"
      },
      "desc": {
        "tr": "Faydacılık vs Deontoloji açılarını matriste kıyaslar.",
        "en": "Compares Utilitarianism vs Deontology in matrix."
      },
      "forceModules": [
        "syllogism-validator",
        "formal-validity-test"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for ethical-matrix."
      ]
    },
    "fallacy-hunter": {
      "id": "fallacy-hunter",
      "group": "logic",
      "name": {
        "tr": "🔍 Mantık Hatası Avcısı",
        "en": "🔍 Logical Fallacy Hunter"
      },
      "desc": {
        "tr": "Argümandaki Strawman ve Ad Hominem hatalarını bulur.",
        "en": "Scans text for informal logical fallacies."
      },
      "forceModules": [
        "premise-deconstruction",
        "utilitarian-calculus"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for fallacy-hunter."
      ]
    },
    "thought-exp": {
      "id": "thought-exp",
      "group": "logic",
      "name": {
        "tr": "🧪 Düşünce Deneyi Simülatörü",
        "en": "🧪 Thought Experiment"
      },
      "desc": {
        "tr": "Trolley Problem veya Kavanozdaki Beyin senaryoları.",
        "en": "Simulates classic philosophy thought experiments."
      },
      "forceModules": [
        "formal-validity-test",
        "care-ethics-perspective"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for thought-exp."
      ]
    },
    "epistemic-audit": {
      "id": "epistemic-audit",
      "group": "epistemology",
      "name": {
        "tr": "👁️ Epistemik Bilgi Denetimi",
        "en": "👁️ Epistemic Knowledge Audit"
      },
      "desc": {
        "tr": "Bilginin kaynağını ve gerekçelendirilmesini inceler.",
        "en": "Audits justification and source of knowledge claims."
      },
      "forceModules": [
        "informal-fallacy-purge",
        "socratic-aporia"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for epistemic-audit."
      ]
    },
    "utilitarian-calc": {
      "id": "utilitarian-calc",
      "group": "ethics",
      "name": {
        "tr": "📊 Faydacı (Utilitarian) Hesap",
        "en": "📊 Utilitarian Calculation"
      },
      "desc": {
        "tr": "Toplam fayda ve acı dengesini hesaplar.",
        "en": "Weighs net utility for greatest number."
      },
      "forceModules": [
        "modal-logic-check",
        "empiricism-vs-rationalism"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for utilitarian-calc."
      ]
    },
    "deontological-duty": {
      "id": "deontological-duty",
      "group": "ethics",
      "name": {
        "tr": "📜 Ödev Ahlakı & Kant Analizi",
        "en": "📜 Kantian Duty Ethics"
      },
      "desc": {
        "tr": "Evrenselleştirilebilirlik ve koşulsuz buyruk testi.",
        "en": "Tests actions via Categorical Imperative."
      },
      "forceModules": [
        "utilitarian-calculus",
        "ship-of-theseus-paradox"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for deontological-duty."
      ]
    },
    "existential-choice": {
      "id": "existential-choice",
      "group": "epistemology",
      "name": {
        "tr": "🌌 Varoluşçu Özgürlük & Sorumluluk",
        "en": "🌌 Existential Responsibility"
      },
      "desc": {
        "tr": "Sartre & Beauvoir çerçevesinde otantik seçim.",
        "en": "Analyzes radical freedom and bad faith."
      },
      "forceModules": [
        "deontological-screen",
        "prisoner-dilemma-matrix"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for existential-choice."
      ]
    },
    "existential-absurd": {
      "id": "existential-absurd",
      "group": "epistemology",
      "name": {
        "tr": "🎭 Camus & Absürdizm Çerçevesi",
        "en": "🎭 Absurdist Frame (Camus)"
      },
      "desc": {
        "tr": "Anlamsızlık karşısında başkaldırı ve yaşam.",
        "en": "Examines rebellion in an indifferent universe."
      },
      "forceModules": [
        "virtue-ethics-audit",
        "dialectic-synthesis"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for existential-absurd."
      ]
    },
    "stoic-dichotomy": {
      "id": "stoic-dichotomy",
      "group": "ethics",
      "name": {
        "tr": "🛡️ Stoacı Kontrol İkiliği",
        "en": "🛡️ Stoic Control Dichotomy"
      },
      "desc": {
        "tr": "Kontrol edilebilir vs edilemez unsurları ayırır.",
        "en": "Separates internal control from external events."
      },
      "forceModules": [
        "care-ethics-perspective",
        "genealogy-deconstruction"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for stoic-dichotomy."
      ]
    },
    "hermeneutic-circle": {
      "id": "hermeneutic-circle",
      "group": "logic",
      "name": {
        "tr": "🔄 Hermeneutik Yorum Döngüsü",
        "en": "🔄 Hermeneutic Circle"
      },
      "desc": {
        "tr": "Parça ve bütün arasındaki anlam ilişkisini çözer.",
        "en": "Interprets part-whole text context relationships."
      },
      "forceModules": [
        "rawlsian-veil-ignorance",
        "fallacy-detector"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for hermeneutic-circle."
      ]
    },
    "dialectical-triad": {
      "id": "dialectical-triad",
      "group": "logic",
      "name": {
        "tr": "⚖️ Tez-Antitez-Sentez Diyalektiği",
        "en": "⚖️ Dialectical Synthesis"
      },
      "desc": {
        "tr": "Hegel diyalektiği ile zıt fikirleri sentezdir.",
        "en": "Synthesizes thesis and antithesis into higher truth."
      },
      "forceModules": [
        "ethical-dilemma-resolver",
        "formal-validity-test"
      ],
      "override": {
        "derinlik": "orta",
        "format": "diyalog",
        "mod": "sokratik"
      },
      "injectRules": [
        "Apply philosophy domain rule for dialectical-triad."
      ]
    }
  }
};
