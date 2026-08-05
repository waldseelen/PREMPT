export const problemsolvingSpec = {
  "id": "problemsolving",
  "route": "problemsolving",
  "icon": "⚡",
  "category": "mind",
  "layers": [
    "deconstruction",
    "triz",
    "lateral",
    "scamper",
    "evaluation"
  ],
  "ui": {
    "tr": {
      "title": "Yaratıcı Problem Çözme & TRIZ",
      "subtitle": "Tıkanılan anlarda radikal ve inovatif çözümler türet.",
      "topicLabel": "Çözülecek Tıkanıklık / Çelişki",
      "topicPlaceholder": "Yazılım hem daha hızlı çalışmalı hem daha az bellek harcamalı...",
      "domainLabel": "Mevcut Sistem / Ürün Yapısı",
      "domainPlaceholder": "Node.js microservice mimarisi...",
      "levelLabel": "Problem Metodolojisi",
      "modeLabel": "İnovatör Rolü",
      "depthLabel": "Çözüm Derinliği",
      "formatLabel": "İnovasyon Formatı",
      "presetGroups": {
        "triz": "TRIZ Metodolojisi",
        "scamper": "İnovasyon Operatörü",
        "rootcause": "Kök Neden & Analiz"
      }
    },
    "en": {
      "title": "Creative Problem Solving & TRIZ",
      "subtitle": "Generate radical innovative solutions using proven frameworks.",
      "topicLabel": "Contradiction / Bottleneck",
      "topicPlaceholder": "Software must run faster yet consume less memory...",
      "domainLabel": "Current System Architecture",
      "domainPlaceholder": "Node.js microservice architecture...",
      "levelLabel": "Problem Methodology",
      "modeLabel": "Innovator Role",
      "depthLabel": "Solution Depth",
      "formatLabel": "Innovation Format",
      "presetGroups": {
        "triz": "TRIZ Metodolojisi",
        "scamper": "İnovasyon Operatörü",
        "rootcause": "Kök Neden & Analiz"
      }
    }
  },
  "optionSets": {
    "levels": {
      "triz": {
        "tr": "TRIZ Çelişki Matrisi",
        "en": "TRIZ Contradiction Matrix"
      },
      "scamper": {
        "tr": "SCAMPER İnovasyon",
        "en": "SCAMPER Operator"
      },
      "hats": {
        "tr": "de Bono 6 Şapka",
        "en": "de Bono 6 Hats"
      },
      "whys5": {
        "tr": "Kök Neden (5-Whys)",
        "en": "Root Cause (5-Whys)"
      }
    },
    "modes": {
      "radikal": {
        "tr": "Radikal İnovatör",
        "en": "Radical Innovator"
      },
      "mimar": {
        "tr": "Sistem Mühendisi",
        "en": "Systems Engineer"
      },
      "yanal": {
        "tr": "Yanal Düşünür (Lateral)",
        "en": "Lateral Thinker"
      },
      "yikici": {
        "tr": "Yıkıcı (Disruptor)",
        "en": "Market Disruptor"
      }
    },
    "depths": {
      "temel": {
        "tr": "Yüzeysel Fikir",
        "en": "Quick Idea"
      },
      "orta": {
        "tr": "Standart İnovasyon",
        "en": "Standard Innovation"
      },
      "derin": {
        "tr": "Radikal Çözüm",
        "en": "Radical Solution"
      },
      "kapsamli": {
        "tr": "Sistemik Dönüşüm",
        "en": "Systemic Transformation"
      }
    },
    "formats": {
      "scampertablo": {
        "tr": "SCAMPER Operatör Listesi",
        "en": "SCAMPER Operator List"
      },
      "trizmatris": {
        "tr": "TRIZ İlke Matrisi",
        "en": "TRIZ Principle Matrix"
      },
      "hatscikti": {
        "tr": "6 Şapka Çıktı Raporu",
        "en": "6 Hats Output Report"
      },
      "balikkilcigi": {
        "tr": "Balık Kılçığı Diyagramı",
        "en": "Fishbone Diagram Spec"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "TIRANLIK / ÇELİŞKİ",
      "levelHeader": "METODOLOJİ",
      "modeHeader": "İNOVATÖR ROLÜ",
      "depthHeader": "ÇÖZÜM DERİNLİĞİ",
      "formatHeader": "İNOVASYON FORMATI"
    },
    "en": {
      "topicHeader": "CONTRADICTION / BOTTLENECK",
      "levelHeader": "METHODOLOGY",
      "modeHeader": "INNOVATOR ROLE",
      "depthHeader": "SOLUTION DEPTH",
      "formatHeader": "INNOVATION FORMAT"
    }
  },
  "presets": {
    "triz-solver": {
      "id": "triz-solver",
      "group": "triz",
      "name": {
        "tr": "⚡ TRIZ Çelişki Çözücü",
        "en": "⚡ TRIZ Contradiction Solver"
      },
      "desc": {
        "tr": "İki zıt istek arasındaki çelişkiyi TRIZ ile çözer.",
        "en": "Resolves physical contradictions via 40 TRIZ principles."
      },
      "forceModules": [
        "root-cause-5-whys",
        "root-cause-5-whys"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for triz-solver."
      ]
    },
    "scamper-storm": {
      "id": "scamper-storm",
      "group": "scamper",
      "name": {
        "tr": "💡 SCAMPER İnovasyon Fırtınası",
        "en": "💡 SCAMPER Operator Storm"
      },
      "desc": {
        "tr": "Değiştir, Birleştir, Uyarla mercekleriyle yeniler.",
        "en": "Reinvents using Substitute, Combine, Adapt operators."
      },
      "forceModules": [
        "problem-boundary-def",
        "constraint-mapping"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for scamper-storm."
      ]
    },
    "root-cause": {
      "id": "root-cause",
      "group": "rootcause",
      "name": {
        "tr": "🔍 5-Whys Kök Neden Analizi",
        "en": "🔍 5-Whys Root Cause Audit"
      },
      "desc": {
        "tr": "Problemi 5 soruyla temel kök nedenine indirger.",
        "en": "Drills down 5 levels to uncover true root cause."
      },
      "forceModules": [
        "functional-analysis",
        "triz-contradiction-matrix"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for root-cause."
      ]
    },
    "six-hats": {
      "id": "six-hats",
      "group": "rootcause",
      "name": {
        "tr": "🎩 6 Şapka Sistem Denetimi",
        "en": "🎩 6 Thinking Hats Audit"
      },
      "desc": {
        "tr": "360 derece farklı bakış açılarıyla inceleme.",
        "en": "Audits problem from 6 distinct cognitive angles."
      },
      "forceModules": [
        "constraint-mapping",
        "triz-substance-field"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for six-hats."
      ]
    },
    "lateral-jump": {
      "id": "lateral-jump",
      "group": "scamper",
      "name": {
        "tr": "🔀 Yanal Düşünce Sıçraması",
        "en": "🔀 Lateral Thinking Jump"
      },
      "desc": {
        "tr": "Varsayımları yıkarak radikal çözümler üretir.",
        "en": "Breaks assumptions via lateral provocation."
      },
      "forceModules": [
        "issue-tree-breakdown",
        "de-bono-6-hats"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for lateral-jump."
      ]
    },
    "first-principles": {
      "id": "first-principles",
      "group": "triz",
      "name": {
        "tr": "🧱 Birinci İlkelerle Yıkım",
        "en": "🧱 First Principles Deconstruct"
      },
      "desc": {
        "tr": "Problemi en temel fiziksel doğrularına ayırır.",
        "en": "Deconstructs system down to atomic truths."
      },
      "forceModules": [
        "system-component-map",
        "analogical-transfer"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for first-principles."
      ]
    },
    "morphological-matrix": {
      "id": "morphological-matrix",
      "group": "scamper",
      "name": {
        "tr": "🧩 Morfolojik Analiz Matrisi",
        "en": "🧩 Morphological Analysis"
      },
      "desc": {
        "tr": "Parametre kombinasyonlarından yeni fikirler türetir.",
        "en": "Combines parameters systematically into new solutions."
      },
      "forceModules": [
        "triz-contradiction-matrix",
        "scamper-substitute"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for morphological-matrix."
      ]
    },
    "bottleneck-audit": {
      "id": "bottleneck-audit",
      "group": "rootcause",
      "name": {
        "tr": "⏳ Darboğaz & Kısıtlar Teorisi",
        "en": "⏳ Theory of Constraints Audit"
      },
      "desc": {
        "tr": "Akışı yavaşlatan ana kısıtı tespit eder.",
        "en": "Identifies primary throughput bottleneck."
      },
      "forceModules": [
        "triz-ideality-operator",
        "scamper-put-other-use"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for bottleneck-audit."
      ]
    },
    "inversion-thinking": {
      "id": "inversion-thinking",
      "group": "triz",
      "name": {
        "tr": "🔄 Tersine Düşünme (Inversion)",
        "en": "🔄 Inversion Thinking Drill"
      },
      "desc": {
        "tr": "Nasıl başarısız olunacağını kurgulayıp önler.",
        "en": "Figures out how to fail, then avoids those actions."
      },
      "forceModules": [
        "triz-resource-inventory",
        "morphological-matrix"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for inversion-thinking."
      ]
    },
    "analogy-transfer": {
      "id": "analogy-transfer",
      "group": "scamper",
      "name": {
        "tr": "🌉 Sektörler Arası Benzetme",
        "en": "🌉 Cross-Domain Analogy"
      },
      "desc": {
        "tr": "Başka sektördeki çözümü kendi alanına adapte eder.",
        "en": "Transfers solutions from unrelated industries."
      },
      "forceModules": [
        "triz-substance-field",
        "trade-off-optimization"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for analogy-transfer."
      ]
    },
    "failure-fmea": {
      "id": "failure-fmea",
      "group": "rootcause",
      "name": {
        "tr": "⚠️ FMEA Hata Türleri Analizi",
        "en": "⚠️ FMEA Failure Mode Analysis"
      },
      "desc": {
        "tr": "Hata modlarının şiddetini ve olasılığını puanlar.",
        "en": "Scores severity and occurrence of failure modes."
      },
      "forceModules": [
        "triz-evolution-lines",
        "root-cause-5-whys"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for failure-fmea."
      ]
    },
    "solution-scoring": {
      "id": "solution-scoring",
      "group": "rootcause",
      "name": {
        "tr": "🎯 Çözüm Derecelendirme Matrisi",
        "en": "🎯 Solution Scoring Matrix"
      },
      "desc": {
        "tr": "Fikirleri fizibilite ve etkiye göre sıralar.",
        "en": "Ranks solution ideas by effort vs impact."
      },
      "forceModules": [
        "triz-su-field-analysis",
        "constraint-mapping"
      ],
      "override": {
        "derinlik": "orta",
        "format": "scampertablo",
        "mod": "radikal"
      },
      "injectRules": [
        "Apply problemsolving domain rule for solution-scoring."
      ]
    }
  }
};
