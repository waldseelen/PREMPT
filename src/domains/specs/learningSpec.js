export const learningSpec = {
  "id": "learning",
  "route": "learning",
  "icon": "graduation-cap",
  "category": "mind",
  "layers": [
    "foundation",
    "mechanism",
    "context",
    "boundaries",
    "application"
  ],
  "ui": {
    "tr": {
      "title": "Parametrik Öğrenme Mühendisi",
      "subtitle": "Herhangi bir konuyu sistematik olarak parçala, analiz et, öğren.",
      "topicLabel": "Öğrenilecek Konu",
      "topicPlaceholder": "Transformer Mimarisi, Otonom Sinir Sistemi...",
      "domainLabel": "Hakim Olduğunuz Alan",
      "domainPlaceholder": "Yazılım Mühendisliği, Elektrik Devreleri...",
      "levelLabel": "Bilgi Seviyesi",
      "modeLabel": "Öğrenme Modu",
      "depthLabel": "Analiz Derinliği",
      "formatLabel": "Çıktı Formatı",
      "presetGroups": {
        "understand": "Anla",
        "analyze": "Analiz Et",
        "apply": "Uygula"
      }
    },
    "en": {
      "title": "Parametric Learning Engineer",
      "subtitle": "Systematically deconstruct, analyze, and learn any topic.",
      "topicLabel": "Topic to Learn",
      "topicPlaceholder": "Transformer Architecture, Autonomic Nervous System...",
      "domainLabel": "Your Domain Expertise",
      "domainPlaceholder": "Software Engineering, Electrical Circuits...",
      "levelLabel": "Knowledge Level",
      "modeLabel": "Learning Mode",
      "depthLabel": "Analysis Depth",
      "formatLabel": "Output Format",
      "presetGroups": {
        "understand": "Anla",
        "analyze": "Analiz Et",
        "apply": "Uygula"
      }
    }
  },
  "optionSets": {
    "levels": {
      "otomatik": {
        "tr": "Otomatik (AI)",
        "en": "Auto (AI)"
      },
      "acemi": {
        "tr": "Acemi (5 Yaş)",
        "en": "Novice (ELI5)"
      },
      "orta": {
        "tr": "Orta",
        "en": "Intermediate"
      },
      "ileri": {
        "tr": "İleri",
        "en": "Advanced"
      },
      "uzman": {
        "tr": "Uzman",
        "en": "Expert"
      }
    },
    "modes": {
      "karma": {
        "tr": "Karma (Adaptif)",
        "en": "Mixed (Adaptive)"
      },
      "feynman": {
        "tr": "Feynman",
        "en": "Feynman"
      },
      "sistem": {
        "tr": "Sistem Analizi",
        "en": "System Analysis"
      },
      "sokratik": {
        "tr": "Sokratik",
        "en": "Socratic"
      },
      "ilkeler": {
        "tr": "Birinci İlkeler",
        "en": "First Principles"
      }
    },
    "depths": {
      "temel": {
        "tr": "Temel Özet",
        "en": "Basic Summary"
      },
      "orta": {
        "tr": "Orta",
        "en": "Moderate"
      },
      "derin": {
        "tr": "Derinlemesine",
        "en": "Deep"
      },
      "kapsamli": {
        "tr": "Kapsamlı (Exhaustive)",
        "en": "Comprehensive"
      }
    },
    "formats": {
      "markdown": {
        "tr": "Markdown",
        "en": "Markdown"
      },
      "tablo": {
        "tr": "Tablo Ağırlıklı",
        "en": "Table Heavy"
      },
      "ders": {
        "tr": "Ders Notu",
        "en": "Lecture Notes"
      },
      "quiz": {
        "tr": "Quiz Destekli",
        "en": "With Quizzes"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "ÖĞRENME HEDEFİ",
      "levelHeader": "BİLGİ SEVİYESİ",
      "modeHeader": "PEDAGOJİK MOD",
      "depthHeader": "ANALİZ DERİNLİĞİ",
      "formatHeader": "ÇIKTI FORMATI"
    },
    "en": {
      "topicHeader": "LEARNING OBJECTIVE",
      "levelHeader": "KNOWLEDGE LEVEL",
      "modeHeader": "PEDAGOGICAL MODE",
      "depthHeader": "ANALYSIS DEPTH",
      "formatHeader": "OUTPUT FORMAT"
    }
  },
  "presets": {
    "hizli": {
      "id": "hizli",
      "group": "understand",
      "name": {
        "tr": "⚡ Hızlı Özet",
        "en": "⚡ Fast Summary"
      },
      "desc": {
        "tr": "Konunun özünü hızlıca, gereksiz detaya girmeden özetler.",
        "en": "Summarizes key essence quickly."
      },
      "forceModules": [
        "eli5",
        "eli5"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for hizli."
      ]
    },
    "temeller": {
      "id": "temeller",
      "group": "understand",
      "name": {
        "tr": "🧱 Temeller",
        "en": "🧱 Foundations"
      },
      "desc": {
        "tr": "Birinci ilkelerden sağlam bir temel kurar.",
        "en": "Establishes core foundations from first principles."
      },
      "forceModules": [
        "kalibrasyon",
        "sirasi"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for temeller."
      ]
    },
    "pratik": {
      "id": "pratik",
      "group": "understand",
      "name": {
        "tr": "⚡ Pratik Uygulama",
        "en": "⚡ Practical Application"
      },
      "desc": {
        "tr": "80/20 kuralıyla gerçek dünya benzetmelerine odaklanır.",
        "en": "Applies 80/20 rule to practical real-world scenarios."
      },
      "forceModules": [
        "onkosul",
        "nedensellik"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for pratik."
      ]
    },
    "yaratici": {
      "id": "yaratici",
      "group": "understand",
      "name": {
        "tr": "✨ Yaratıcı Sentez",
        "en": "✨ Creative Synthesis"
      },
      "desc": {
        "tr": "Disiplinler arası zihinsel modelleri birleştirir.",
        "en": "Combines cross-disciplinary mental models."
      },
      "forceModules": [
        "sirasi",
        "diagram"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for yaratici."
      ]
    },
    "derin": {
      "id": "derin",
      "group": "analyze",
      "name": {
        "tr": "🔬 Derin Analiz",
        "en": "🔬 Deep Analysis"
      },
      "desc": {
        "tr": "Konuyu temel ilkelerine kadar söker ve karşıt görüşleri işler.",
        "en": "Deconstructs topic down to first principles and trade-offs."
      },
      "forceModules": [
        "pareto",
        "simulasyon"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for derin."
      ]
    },
    "arastirmaci": {
      "id": "arastirmaci",
      "group": "analyze",
      "name": {
        "tr": "📖 Araştırmacı",
        "en": "📖 Researcher"
      },
      "desc": {
        "tr": "Tarihsel bağlam ve akademik teorilerle sunar.",
        "en": "Presents historical context and scholarly frameworks."
      },
      "forceModules": [
        "ontoloji",
        "kontrast"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for arastirmaci."
      ]
    },
    "hata": {
      "id": "hata",
      "group": "analyze",
      "name": {
        "tr": "💥 Hata Ayıklama",
        "en": "💥 Debug & Edge Cases"
      },
      "desc": {
        "tr": "Tek nokta arızalarını ve nerede çöktüğünü inceler.",
        "en": "Audits single points of failure and edge cases."
      },
      "forceModules": [
        "nedensellik",
        "esleme"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for hata."
      ]
    },
    "karsilastir": {
      "id": "karsilastir",
      "group": "analyze",
      "name": {
        "tr": "⚖️ Karşılaştır & Karar Ver",
        "en": "⚖️ Compare & Decide"
      },
      "desc": {
        "tr": "Alternatifleri yapılandırılmış şekilde karşılaştırır.",
        "en": "Compares alternatives systematically with recommendation."
      },
      "forceModules": [
        "mental",
        "yanilgilar"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for karsilastir."
      ]
    },
    "sinav": {
      "id": "sinav",
      "group": "apply",
      "name": {
        "tr": "🎯 Sınav Hazırlık",
        "en": "🎯 Exam Prep"
      },
      "desc": {
        "tr": "Hatırlama odaklı sorularla sınava hazırlar.",
        "en": "Prepares for exams via active recall questions."
      },
      "forceModules": [
        "mekanizma",
        "kirilma"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for sinav."
      ]
    },
    "muhendis": {
      "id": "muhendis",
      "group": "apply",
      "name": {
        "tr": "🛠️ Mühendis Yaklaşımı",
        "en": "🛠️ Engineer Stance"
      },
      "desc": {
        "tr": "Sıfırdan nasıl inşa edileceğini ve mimari kararları anlatır.",
        "en": "Explains architecture decisions and engineering trade-offs."
      },
      "forceModules": [
        "diagram",
        "celiski"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for muhendis."
      ]
    },
    "tam": {
      "id": "tam",
      "group": "apply",
      "name": {
        "tr": "📦 Tam Paket",
        "en": "📦 Full Package"
      },
      "desc": {
        "tr": "Konuyu en kapsamlı şekilde ele alır.",
        "en": "Cover the topic in an exhaustive, all-inclusive manner."
      },
      "forceModules": [
        "insa",
        "uzman"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for tam."
      ]
    },
    "mulakat": {
      "id": "mulakat",
      "group": "apply",
      "name": {
        "tr": "🎙️ Mülakat Hazırlığı",
        "en": "🎙️ Interview Drill"
      },
      "desc": {
        "tr": "Sesli anlatabilme becerisi ve mülakat sorularına odaklanır.",
        "en": "Drills technical interview questions and verbal explanations."
      },
      "forceModules": [
        "tersine",
        "meta"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for mulakat."
      ]
    }
  }
};
