export const wellnessSpec = {
  "id": "wellness",
  "route": "wellness",
  "defaultConfig": {
    "seviye": "antrenman",
    "mod": "koc",
    "derinlik": "haftalik",
    "format": "program"
  },
  "icon": "heart",
  "category": "life",
  "layers": [
    "workout",
    "circadian",
    "nutrition",
    "adaptation",
    "habits"
  ],
  "ui": {
    "tr": {
      "title": "Sağlık, Form & Sirkadiyen Ops",
      "subtitle": "Kişiselleştirilmiş antrenman ve sirkadiyen ritim optimizasyonu.",
      "topicLabel": "Kişisel Form / Sağlık Hedefi",
      "topicPlaceholder": "Kas kütlesi artırma ve uyku kalitesini yükseltme...",
      "domainLabel": "Yaşam Tarzı & Kısıtlar",
      "domainPlaceholder": "Masa başı iş, 3 gün 45dk spor imkanı, bel fıtığı...",
      "levelLabel": "Odak Alanı",
      "modeLabel": "Wellness Personası",
      "depthLabel": "Rutin Derinliği",
      "formatLabel": "Wellness Formatı",
      "presetGroups": {
        "workout": "Spor & Performans",
        "sleep": "Uyku & Sirkadiyen",
        "habits": "Alışkanlık & Beslenme"
      },
      "categories": {
        "workout": "Antrenman & Hareket",
        "circadian": "Sirkadiyen & Uyku",
        "nutrition": "Beslenme & Biyokimya",
        "adaptation": "Stres & Adaptasyon",
        "habits": "Alışkanlık & Sürdürülebilirlik"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
    },
    "en": {
      "title": "Wellness, Fitness & Circadian Ops",
      "subtitle": "Personalized workout blueprints and circadian rhythm optimization.",
      "topicLabel": "Fitness / Wellness Goal",
      "topicPlaceholder": "Hypertrophy and sleep quality optimization...",
      "domainLabel": "Lifestyle & Constraints",
      "domainPlaceholder": "Desk job, 3 days 45min gym access, lower back pain...",
      "levelLabel": "Focus Area",
      "modeLabel": "Wellness Persona",
      "depthLabel": "Routine Depth",
      "formatLabel": "Wellness Syntax",
      "presetGroups": {
        "workout": "Fitness & Performance",
        "sleep": "Sleep & Circadian",
        "habits": "Habits & Nutrition"
      },
      "categories": {
        "workout": "Movement & Training",
        "circadian": "Circadian & Sleep",
        "nutrition": "Nutrition & Biochemistry",
        "adaptation": "Stress & Adaptation",
        "habits": "Habit Systems"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
    }
  },
  "optionSets": {
    "levels": {
      "antrenman": {
        "tr": "Antrenman İskeleti",
        "en": "Workout Blueprint"
      },
      "sirkadiyen": {
        "tr": "Sirkadiyen Ritim & Uyku",
        "en": "Circadian Sleep Reset"
      },
      "beslenme": {
        "tr": "Makro & Beslenme",
        "en": "Nutrition & Macro Strategy"
      },
      "sakatlik": {
        "tr": "Sakatlık Adaptasyonu",
        "en": "Injury Adaptation"
      }
    },
    "modes": {
      "biohacker": {
        "tr": "Biyohacker Koç",
        "en": "Biohacker Coach"
      },
      "fizyoterapist": {
        "tr": "Fizyoterapist",
        "en": "Physical Therapist"
      },
      "habit": {
        "tr": "Alışkanlık Mimarı",
        "en": "Habit Architect"
      }
    },
    "depths": {
      "temel": {
        "tr": "Temel Rutin",
        "en": "Basic Routine"
      },
      "haftalik": {
        "tr": "Standart Haftalık Plan",
        "en": "Standard Weekly Plan"
      },
      "biohacking": {
        "tr": "Derin Biyohacking",
        "en": "Deep Biohacking Spec"
      }
    },
    "formats": {
      "haftaliktablo": {
        "tr": "Haftalık Program Tablosu",
        "en": "Weekly Program Table"
      },
      "sirkadiyencart": {
        "tr": "Sirkadiyen Zaman Çizelgesi",
        "en": "Circadian Timeline"
      },
      "makrohesap": {
        "tr": "Makro Dağılım Hesabı",
        "en": "Macro Distribution Spec"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "mod": {
        "biohacker": "Sen kanıta dayalı biyohacking ve fizyoloji koçusun. Sirkadiyen ritim, mitokondriyal sağlık, biyobelirteçler ve uyku optimizasyonunu birleştirirsin.",
        "fizyoterapist": "Sen spor fizyoterapisti ve hareket uzmanısın. Postür düzeltme, sakatlık önleme, progressive overload ve mobilite protokolleri tasarlarsın.",
        "habit": "Sen davranış bilimcisi ve alışkanlık mimarısısın. Mikro-adımlar, tetikleyici zincirleri ve sürdürülebilir yaşam tarzı dönüşümleri kurgularsın."
      },
      "derinlik": {
        "temel": "Temel günlük rutin ve uygulanabilir 3 ana prensip sun.",
        "haftalik": "Haftalık antrenman, beslenme ve toparlanma (recovery) planı oluştur.",
        "biohacking": "Biyobelirteçler, takviye protokolleri, sirkadiyen ışık döngüleri ve ileri toparlanma yöntemleri içeren tam rehber hazırla."
      },
      "format": {
        "haftaliktablo": "Haftalık program ve takip tablosu formatında yapılandır.",
        "sirkadiyencart": "24 Saatlik sirkadiyen zamanlama çizelgesi şeklinde sun.",
        "makrohesap": "Beslenme ve makro/mikro besin hesaplama şeması formatında hazırla."
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
      "goalTemplate": "\"{{KONU}}\" hedefi doğrultusunda biyomekanik, sirkadiyen ritim ve beslenme ilkelerine dayalı sürdürülebilir bir sağlık protokolü geliştirmek.",
      "constraintsBase": [
        "Tüm önerileri insan fizyolojisi ve bilimsel literatüre dayandır.",
        "Aşırı katı, sürdürülemez ve sakatlık riski taşıyan programlardan kaçın.",
        "Toparlanma (uyku ve dinlenme) sürecini antrenman kadar önceliklendir."
      ],
      "monologueText": "İÇ SES MODU: Protokolü yazmadan önce (<thinking> tagleri içinde) aşırı antrenman (overtraining) ve sakatlık risk faktörlerini denetle."
    },
    "en": {
      "mod": {
        "biohacker": "You are an evidence-based physiology and biohacking coach. You optimize circadian timing, mitochondrial health, and biomarker metrics.",
        "fizyoterapist": "You are a sports physiotherapist and movement specialist. You design progressive overload, mobility, and injury prevention frameworks.",
        "habit": "You are a behavioral scientist and habit architect. You design low-friction habit loops, environmental cues, and sustainable routines."
      },
      "derinlik": {
        "temel": "Provide core daily routine and 3 actionable foundational principles.",
        "haftalik": "Build a comprehensive 7-day movement, nutrition, and recovery schedule.",
        "biohacking": "Deliver an advanced biomarker, supplementation, circadian photobiology, and recovery protocol."
      },
      "format": {
        "haftaliktablo": "Format as a weekly routine and accountability matrix.",
        "sirkadiyencart": "Structure as a 24-hour circadian timing protocol.",
        "makrohesap": "Format as an analytical macro/micro-nutrient calculation breakdown."
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
      "goalTemplate": "To engineer a science-backed, sustainable wellness and recovery protocol based on physiology and circadian biology for \"{{KONU}}\".",
      "constraintsBase": [
        "Ground all recommendations in peer-reviewed physiological science.",
        "Avoid unsustainable extremes and high-risk biomechanical prescriptions.",
        "Prioritize sleep and nervous system recovery on equal footing with exertion."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before detailing protocols, evaluate overtraining risks and metabolic fatigue factors in <thinking> tags."
    }
  },
  "presets": {
    "circadian-reset": {
      "id": "circadian-reset",
      "group": "sleep",
      "name": {
        "tr": "Sirkadiyen Ritim & Uyku Sıfırlama",
        "en": "Circadian Sleep Reset"
      },
      "desc": {
        "tr": "Işık maruziyeti ve melatonin zamanlamasını optimize eder.",
        "en": "Optimizes light exposure and sleep timing."
      },
      "forceModules": [
        "cir-morning-sunlight-anchor",
        "cir-blue-light-melatonin-prep"
      ],
      "override": {
        "seviye": "sirkadiyen",
        "mod": "biohacker",
        "derinlik": "biohacking",
        "format": "sirkadiyencart"
      },
      "injectRules": [
        "Align sleep-wake timing with photobiology and natural light exposure intervals.",
        "Structure core body temperature and meal timing protocols."
      ]
    },
    "hypertrophy-plan": {
      "id": "hypertrophy-plan",
      "group": "workout",
      "name": {
        "tr": "Antrenman & Hipertrofi Programı",
        "en": "Workout & Hypertrophy Plan"
      },
      "desc": {
        "tr": "Kas kütlesi artırıcı haftalık antrenman.",
        "en": "Structures weekly progressive overload routines."
      },
      "forceModules": [
        "wrk-rpe-rir-intensity-guide",
        "wrk-zone2-cardio-protocol"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for hypertrophy-plan."
      ]
    },
    "sustainable-habit": {
      "id": "sustainable-habit",
      "group": "habits",
      "name": {
        "tr": "Sürdürülebilir Alışkanlık Mimarı",
        "en": "Sustainable Habit Stack"
      },
      "desc": {
        "tr": "Tükenmişlik riski olmayan mikro-alışkanlıklar.",
        "en": "Builds low-friction daily habits."
      },
      "forceModules": [
        "wrk-hypertrophy-split-design",
        "cir-morning-sunlight-anchor"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for sustainable-habit."
      ]
    },
    "macro-nutrition": {
      "id": "macro-nutrition",
      "group": "habits",
      "name": {
        "tr": "Makro & Beslenme Stratejisi",
        "en": "Macro Nutrition Strategy"
      },
      "desc": {
        "tr": "Protein, karbonhidrat ve kalori dengesi.",
        "en": "Calculates macro split tailored to activity."
      },
      "forceModules": [
        "wrk-zone2-cardio-protocol",
        "cir-caffeine-half-life-cutoff"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for macro-nutrition."
      ]
    },
    "injury-prevention": {
      "id": "injury-prevention",
      "group": "workout",
      "name": {
        "tr": "Sakatlık Önleme & Mobilite",
        "en": "Injury Prevention & Mobility"
      },
      "desc": {
        "tr": "Eklem sağlığı ve esneklik egzersizleri.",
        "en": "Improves joint mobility and fixes muscle imbalances."
      },
      "forceModules": [
        "wrk-mobility-joint-prep",
        "nut-macro-distribution-calculator"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for injury-prevention."
      ]
    },
    "dopamine-detox": {
      "id": "dopamine-detox",
      "group": "habits",
      "name": {
        "tr": "Dopamin Detoksu & Odaklanma",
        "en": "Dopamine Detox Protocol"
      },
      "desc": {
        "tr": "Dijital ekran bağımlılığını azaltma adımları.",
        "en": "Resets reward pathways from screen overstimulation."
      },
      "forceModules": [
        "wrk-hiit-tabata-structure",
        "nut-gut-microbiome-fiber-mix"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for dopamine-detox."
      ]
    },
    "stress-cortisol": {
      "id": "stress-cortisol",
      "group": "sleep",
      "name": {
        "tr": "Stres & Kortizol Yönetimi",
        "en": "Stress & Cortisol Balance"
      },
      "desc": {
        "tr": "Nefes egzersizleri ve sinir sistemi regülasyonu.",
        "en": "Regulates autonomic nervous system through breathwork."
      },
      "forceModules": [
        "cir-morning-sunlight-anchor",
        "adp-injury-deload-protocol"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for stress-cortisol."
      ]
    },
    "posture-ergonomics": {
      "id": "posture-ergonomics",
      "group": "workout",
      "name": {
        "tr": "Postür & Masa Başı Ergonomi",
        "en": "Desk Posture & Ergonomics"
      },
      "desc": {
        "tr": "Boyun ve bel ağrılarını önleyici rutin.",
        "en": "Fixes forward head posture and lower back pain."
      },
      "forceModules": [
        "cir-blue-light-melatonin-prep",
        "adp-active-recovery-session"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for posture-ergonomics."
      ]
    },
    "fasting-protocol": {
      "id": "fasting-protocol",
      "group": "habits",
      "name": {
        "tr": "Aralıklı Oruç (Fasting) Protokolü",
        "en": "Intermittent Fasting Protocol"
      },
      "desc": {
        "tr": "Otofaji ve insülin duyarlılığı planı.",
        "en": "Schedules 16:8 fasting windows safely."
      },
      "forceModules": [
        "cir-temperature-sleep-cooling",
        "hab-habit-stacking-atomic"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for fasting-protocol."
      ]
    },
    "mindful-meditation": {
      "id": "mindful-meditation",
      "group": "sleep",
      "name": {
        "tr": "Zihinsel Dayanıklılık & Nefes",
        "en": "Mindful Resilience Drill"
      },
      "desc": {
        "tr": "Zihinsel berraklık ve kaygı düşürme.",
        "en": "Reduces anxiety via box breathing routines."
      },
      "forceModules": [
        "cir-caffeine-half-life-cutoff",
        "hab-relapse-prevention-plan"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for mindful-meditation."
      ]
    },
    "cardio-vo2max": {
      "id": "cardio-vo2max",
      "group": "workout",
      "name": {
        "tr": "VO2 Max & Kondisyon Planı",
        "en": "VO2 Max Conditioning"
      },
      "desc": {
        "tr": "Kalp-damar sağlığı için Zone 2 kardiyo.",
        "en": "Builds Zone-2 aerobic base and VO2 max."
      },
      "forceModules": [
        "cir-circadian-meal-timing",
        "wrk-progressive-overload-plan"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for cardio-vo2max."
      ]
    },
    "evening-wind-down": {
      "id": "evening-wind-down",
      "group": "sleep",
      "name": {
        "tr": "Akşam Uykuya Geçiş Rutini",
        "en": "Evening Wind-Down Routine"
      },
      "desc": {
        "tr": "Derin REM uykusuna hazırlık rehberi.",
        "en": "Prepares brain for deep restorative REM sleep."
      },
      "forceModules": [
        "cir-jet-lag-shift-resync",
        "wrk-zone2-cardio-protocol"
      ],
      "override": {
        "derinlik": "haftalik",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for evening-wind-down."
      ]
    }
  }
};
