export const codeSpec = {
  "id": "code",
  "route": "code",
  "icon": "💻",
  "category": "tech",
  "layers": [
    "design",
    "build",
    "comprehend",
    "harden",
    "ship"
  ],
  "ui": {
    "tr": {
      "title": "Parametrik Kod Mühendisi",
      "subtitle": "Yazılımı sistematik olarak tasarla, geliştir, incele ve yayına al.",
      "topicLabel": "Yapılacak Görev / Özellik",
      "topicPlaceholder": "API'ye rate limiting ekle, Auth modülünü refactor et...",
      "domainLabel": "Teknoloji Yığınınız",
      "domainPlaceholder": "Node.js + PostgreSQL, React + TypeScript...",
      "levelLabel": "Hedef Olgunluk",
      "modeLabel": "Mühendislik Persona",
      "depthLabel": "Analiz Derinliği",
      "formatLabel": "Kod Çıktı Formatı",
      "presetGroups": {
        "build": "Geliştir & Kur",
        "review": "İncele & Sertleştir",
        "understand": "Anla & Öğren"
      }
    },
    "en": {
      "title": "Parametric Code Engineer",
      "subtitle": "Systematically design, build, review, and ship software.",
      "topicLabel": "Task / Feature to Build",
      "topicPlaceholder": "Add rate limiting to API, Refactor auth module...",
      "domainLabel": "Your Tech Stack",
      "domainPlaceholder": "Node.js + PostgreSQL, React + TypeScript...",
      "levelLabel": "Target Maturity",
      "modeLabel": "Engineering Persona",
      "depthLabel": "Analysis Depth",
      "formatLabel": "Code Output Format",
      "presetGroups": {
        "build": "Geliştir & Kur",
        "review": "İncele & Sertleştir",
        "understand": "Anla & Öğren"
      }
    }
  },
  "optionSets": {
    "levels": {
      "otomatik": {
        "tr": "Otomatik (AI)",
        "en": "Auto (AI)"
      },
      "prototype": {
        "tr": "Prototip (POC)",
        "en": "Prototype (POC)"
      },
      "production": {
        "tr": "Production",
        "en": "Production"
      },
      "hardened": {
        "tr": "Sertleştirilmiş (Hardened)",
        "en": "Hardened"
      }
    },
    "modes": {
      "senior": {
        "tr": "Kıdemli Mühendis",
        "en": "Senior Engineer"
      },
      "reviewer": {
        "tr": "Kod İnceleyici",
        "en": "Code Reviewer"
      },
      "architect": {
        "tr": "Sistem Mimarı",
        "en": "System Architect"
      },
      "pair": {
        "tr": "Eş Programcı",
        "en": "Pair Programmer"
      },
      "security": {
        "tr": "Güvenlik Mühendisi",
        "en": "Security Engineer"
      }
    },
    "depths": {
      "temel": {
        "tr": "Temel Mantık",
        "en": "Basic Logic"
      },
      "orta": {
        "tr": "Orta",
        "en": "Moderate"
      },
      "derin": {
        "tr": "Derin Edge-Case",
        "en": "Deep Edge-Cases"
      },
      "kapsamli": {
        "tr": "Kapsamlı Mimari",
        "en": "Exhaustive Architecture"
      }
    },
    "formats": {
      "explained": {
        "tr": "Açıklamalı Kod",
        "en": "Explained Code"
      },
      "full": {
        "tr": "Tam Çalıştırılabilir Dosya",
        "en": "Full File"
      },
      "diff": {
        "tr": "Unified Diff (+/-)",
        "en": "Unified Diff"
      },
      "stepwise": {
        "tr": "Adım Adım Mimari",
        "en": "Step-by-Step"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "YAZILIM GÖREVİ",
      "levelHeader": "HEDEF OLGUNLUK",
      "modeHeader": "MÜHENDİSLİK PERSONASI",
      "depthHeader": "ANALİZ DERİNLİĞİ",
      "formatHeader": "KOD ÇIKTI FORMATI"
    },
    "en": {
      "topicHeader": "SOFTWARE TASK",
      "levelHeader": "TARGET MATURITY",
      "modeHeader": "ENGINEERING PERSONA",
      "depthHeader": "ANALYSIS DEPTH",
      "formatHeader": "CODE OUTPUT FORMAT"
    }
  },
  "presets": {
    "ship-feature": {
      "id": "ship-feature",
      "group": "build",
      "name": {
        "tr": "🚀 Özellik Yayınla",
        "en": "🚀 Ship Feature"
      },
      "desc": {
        "tr": "Üretime hazır temiz kod ve modül mimarisi yazar.",
        "en": "Writes clean production-ready code with tests."
      },
      "forceModules": [
        "req-clarify",
        "req-clarify"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for ship-feature."
      ]
    },
    "debug": {
      "id": "debug",
      "group": "build",
      "name": {
        "tr": "🐛 Hata Ayıklama",
        "en": "🐛 Debug Issue"
      },
      "desc": {
        "tr": "Hatanın kök nedenini bulur ve PoC düzeltme önerir.",
        "en": "Traces root cause of bug and provides minimal fix."
      },
      "forceModules": [
        "api-design",
        "architecture"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for debug."
      ]
    },
    "refactor": {
      "id": "refactor",
      "group": "build",
      "name": {
        "tr": "🔧 Refactor",
        "en": "🔧 Refactor Code"
      },
      "desc": {
        "tr": "Kod kalitesini artırır, karmaşıklığı azaltır.",
        "en": "Reduces cyclomatic complexity and improves readability."
      },
      "forceModules": [
        "data-model",
        "threat-model"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for refactor."
      ]
    },
    "system-design": {
      "id": "system-design",
      "group": "build",
      "name": {
        "tr": "🧱 Sistem Tasarımı",
        "en": "🧱 System Architecture"
      },
      "desc": {
        "tr": "Ölçeklenebilir mikroservis ve veri mimarisi kurar.",
        "en": "Designs scalable microservices and data pipelines."
      },
      "forceModules": [
        "architecture",
        "scaffold"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for system-design."
      ]
    },
    "perf-tune": {
      "id": "perf-tune",
      "group": "build",
      "name": {
        "tr": "⏱️ Performans Optimize",
        "en": "⏱️ Perf Tuning"
      },
      "desc": {
        "tr": "Bellek sızıntılarını ve CPU darboğazlarını çözer.",
        "en": "Fixes memory leaks and database query bottlenecks."
      },
      "forceModules": [
        "tech-select",
        "observability"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for perf-tune."
      ]
    },
    "modernize": {
      "id": "modernize",
      "group": "build",
      "name": {
        "tr": "🔄 Legacy Modernizasyon",
        "en": "🔄 Modernize Legacy"
      },
      "desc": {
        "tr": "Eski kod tabanını modern standartlara taşır.",
        "en": "Migrates legacy codebases to modern design patterns."
      },
      "forceModules": [
        "concurrency",
        "codebase-map"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for modernize."
      ]
    },
    "code-review": {
      "id": "code-review",
      "group": "review",
      "name": {
        "tr": "🔍 Kod İncelemesi",
        "en": "🔍 Code Review"
      },
      "desc": {
        "tr": "PR incelemesi yapar, anti-pattern avlar.",
        "en": "Audits PRs for anti-patterns and performance risks."
      },
      "forceModules": [
        "threat-model",
        "security"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for code-review."
      ]
    },
    "harden": {
      "id": "harden",
      "group": "review",
      "name": {
        "tr": "🛡️ Güvenlik Sertleştirme",
        "en": "🛡️ Security Hardening"
      },
      "desc": {
        "tr": "Girdi doğrulama ve yetkilendirmeyi sıkılaştırır.",
        "en": "Hardens input validation, SAN, and auth checks."
      },
      "forceModules": [
        "auth-design",
        "edge-cases"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for harden."
      ]
    },
    "security-review": {
      "id": "security-review",
      "group": "review",
      "name": {
        "tr": "🚨 Güvenlik Auditi",
        "en": "🚨 Security Audit"
      },
      "desc": {
        "tr": "XSS, SQLi ve Injection açıklarını tarar.",
        "en": "Scans for OWASP Top 10 vulnerabilities."
      },
      "forceModules": [
        "implement",
        "a11y"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for security-review."
      ]
    },
    "test-strategy": {
      "id": "test-strategy",
      "group": "review",
      "name": {
        "tr": "🧪 Test Stratejisi",
        "en": "🧪 Test Strategy"
      },
      "desc": {
        "tr": "Birim, entegrasyon ve E2E test planı kurgular.",
        "en": "Constructs unit, integration, and E2E test suites."
      },
      "forceModules": [
        "scaffold",
        "patterns"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for test-strategy."
      ]
    },
    "onboard": {
      "id": "onboard",
      "group": "understand",
      "name": {
        "tr": "🧩 Oryantasyon",
        "en": "🧩 Code Base Onboard"
      },
      "desc": {
        "tr": "Yeni geliştiriciler için kod mimarisini haritalandırır.",
        "en": "Maps codebase entry points for new developers."
      },
      "forceModules": [
        "algorithm",
        "commit-pr"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for onboard."
      ]
    },
    "document": {
      "id": "document",
      "group": "understand",
      "name": {
        "tr": "📄 Dokümantasyon",
        "en": "📄 Documentation"
      },
      "desc": {
        "tr": "JSDoc/OpenAPI ve mimari diyagram üretir.",
        "en": "Generates OpenAPI specs and architectural diagrams."
      },
      "forceModules": [
        "idioms",
        "api-design"
      ],
      "override": {
        "derinlik": "orta",
        "format": "explained",
        "mod": "senior"
      },
      "injectRules": [
        "Apply code domain rule for document."
      ]
    }
  }
};
