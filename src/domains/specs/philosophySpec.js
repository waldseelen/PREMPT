export const philosophySpec = {
  "id": "philosophy",
  "route": "philosophy",
  "defaultConfig": {
    "seviye": "iklem",
    "mod": "sokratik",
    "derinlik": "orta",
    "format": "diyalog"
  },
  "icon": "building-2",
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
      },
      "categories": {
        "logic": "Mantık & Akıl Yürütme",
        "ethics": "Etik & Ahlak Felsefesi",
        "epistemology": "Epistemoloji & Bilgi",
        "thought-experiments": "Düşünce Deneyleri",
        "critique": "Eleştiri & Diyalektik"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
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
        "logic": "Logic & Inquiry",
        "ethics": "Ethics & Dilemma",
        "epistemology": "Epistemology & Being"
      },
      "categories": {
        "logic": "Logic & Reasoning",
        "ethics": "Ethics & Moral Philosophy",
        "epistemology": "Epistemology & Knowledge",
        "thought-experiments": "Thought Experiments",
        "critique": "Critique & Dialectics"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
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
      "mod": {
        "sokratik": "Sen Sokratik sorgulama ustasısın. Karşı tarafın tanımlarındaki çelişkileri açığa çıkarır, aporia (çıkmaz) noktalarını gösterirsin.",
        "stoaci": "Sen Stoacı ve rasyonel bir filozofsundur. Olayları kontrol edilebilir ve edilemez alanlara ayırır, akılcı duruşu temel alırsın.",
        "pozitivist": "Sen bir mantıksal pozitivistsin. Doğrulanamayan metafizik önermeleri ayıklar, kavramsal açıklık ve formel mantık talep edersin.",
        "varoluscu": "Sen varoluşçu bir düşünürsün. Özgürlük, sorumluluk, kaygı ve otantik varoluş ikilemlerini incelersin."
      },
      "derinlik": {
        "temel": "Temel kavramları ve argüman hattını sade felsefi dille açıkla.",
        "orta": "Öncülleri, karşı argümanları ve felsefi gelenekleri dengeli sun.",
        "derin": "Birincil metin titizliğinde, ontolojik ve epistemolojik temelleri eksiksiz incele."
      },
      "format": {
        "diyalog": "Sokratik diyalog ve sorgulama formatında yapılandır.",
        "oncul": "Öncül-Sonuç (Premise-Conclusion) formel mantık dizilimi kullan.",
        "matris": "Etik ve felsefi teorileri karşılaştırma matrisinde göster."
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
      "goalTemplate": "\"{{KONU}}\" felsefi problemini temel kavramlarına, epistemik varsayımlarına ve mantıksal sonuçlarına ayırarak derinlemesine sorgulamak.",
      "constraintsBase": [
        "Öncüller ile sonuç arasındaki mantıksal bağı netleştir.",
        "Safsatalardan (fallacies) ve totolojilerden kesinlikle kaçın.",
        "Karşıt felsefi görüşleri en güçlü halleriyle (steelmanning) ele al."
      ],
      "monologueText": "İÇ SES MODU: Yanıt üretmeden önce (<thinking> tagleri içinde) argümanın gizli ontolojik varsayımlarını sorgula."
    },
    "en": {
      "mod": {
        "sokratik": "You are a master of Socratic elenchus. You expose contradictions in definitions and guide toward productive aporia.",
        "stoaci": "You are a Stoic rationalist. You divide reality into what is within our control and what is not, emphasizing virtue and reason.",
        "pozitivist": "You are a logical positivist. You reject ungrounded metaphysics and enforce strict conceptual clarity and formal verification.",
        "varoluscu": "You are an existential thinker. You explore radical freedom, subjective meaning, anguish, and authentic existence."
      },
      "derinlik": {
        "temel": "Explain core concepts and the main argumentative line in accessible philosophical terms.",
        "orta": "Present premises, counter-arguments, and historical philosophical lineages with balanced depth.",
        "derin": "Conduct exhaustive primary-source level analysis with complete ontological and epistemic deconstruction."
      },
      "format": {
        "diyalog": "Structure as a structured Socratic dialogue and dialectical inquiry.",
        "oncul": "Format as formal premise-conclusion logical arguments.",
        "matris": "Present as a comparative matrix of ethical/philosophical traditions."
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
      "goalTemplate": "To deeply investigate the philosophical problem \"{{KONU}}\" by deconstructing its core concepts, epistemic premises, and logical implications.",
      "constraintsBase": [
        "Make the deductive or inductive chain explicit and valid.",
        "Strictly avoid informal and formal fallacies.",
        "Steelman counter-positions before critiquing them."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before presenting the argument, test for hidden metaphysical assumptions in <thinking> tags."
    }
  },
  "presets": {
    "socratic-aporia": {
      "id": "socratic-aporia",
      "group": "logic",
      "name": {
        "tr": "Sokratik Sorgulama & Aporia",
        "en": "Socratic Aporia Drill"
      },
      "desc": {
        "tr": "Varsayımları çelişkiye düşene kadar diyalogla sorgular.",
        "en": "Deconstructs concepts through Socratic questioning."
      },
      "forceModules": [
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
        "tr": "Etik İklem Karşılaştırması",
        "en": "Ethical Dilemma Matrix"
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
        "tr": "Mantık Hatası Avcısı",
        "en": "Logical Fallacy Hunter"
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
        "tr": "Düşünce Deneyi Simülatörü",
        "en": "Thought Experiment"
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
        "tr": "Epistemik Bilgi Denetimi",
        "en": "Epistemic Knowledge Audit"
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
        "tr": "Faydacı (Utilitarian) Hesap",
        "en": "Utilitarian Calculation"
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
        "tr": "Ödev Ahlakı & Kant Analizi",
        "en": "Kantian Duty Ethics"
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
        "tr": "Varoluşçu Özgürlük & Sorumluluk",
        "en": "Existential Responsibility"
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
        "tr": "Camus & Absürdizm Çerçevesi",
        "en": "Absurdist Frame (Camus)"
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
        "tr": "Stoacı Kontrol İkiliği",
        "en": "Stoic Control Dichotomy"
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
        "tr": "Hermeneutik Yorum Döngüsü",
        "en": "Hermeneutic Circle"
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
        "tr": "Tez-Antitez-Sentez Diyalektiği",
        "en": "Dialectical Synthesis"
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
