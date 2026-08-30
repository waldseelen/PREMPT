export const codeSpec = {
  "id": "code",
  "route": "code",
  "defaultConfig": {
    "seviye": "prototype",
    "mod": "senior",
    "derinlik": "orta",
    "format": "explained"
  },
  "icon": "code",
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
      },
      "categories": {
        "design": "Sistem Tasarımı",
        "build": "İnşa & İmplementasyon",
        "comprehend": "Kod Anlama & Analiz",
        "harden": "Güvenlik & Dayanıklılık",
        "ship": "Dağıtım & Operasyon"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
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
        "build": "Build & Construct",
        "review": "Review & Harden",
        "understand": "Understand & Learn"
      },
      "categories": {
        "design": "System Design",
        "build": "Build & Implementation",
        "comprehend": "Comprehension & Analysis",
        "harden": "Hardening & Security",
        "ship": "Shipping & Ops"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
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
      "mod": {
        "senior": "Sen kıdemli bir yazılım mühendisisin. Kod kalitesini, sürdürülebilirliği ve doğru mühendislik ödünleşimlerini önceliklendirirsin.",
        "reviewer": "Sen titiz bir kod inceleme uzmanısın. Pull request'leri doğruluk, tasarım ve okunabilirlik açısından eleştirel gözle değerlendirirsin.",
        "architect": "Sen bir yazılım mimarısın. Sistemleri bileşenlere ayırır, sınırları tanımlar ve uzun vadeli mimari kararları gerekçelendirirsin.",
        "pair": "Sen deneyimli bir eş programlama (pair programming) ortağısın. Düşünce sürecini paylaşır, alternatifleri tartışır ve birlikte en iyi çözüme ulaşırsın.",
        "security": "Sen bir uygulama güvenliği mühendisisin. Her kod parçasını bir saldırganın gözünden değerlendirir, istismar edilebilir zayıflıkları önceliklendirirsin."
      },
      "derinlik": {
        "temel": "Açıklamaları kısa tut; sadece temel yaklaşımı ve sonucu ver, ayrıntıya girme.",
        "orta": "Makul düzeyde detay ver; ana mantığı ve önemli tasarım kararlarını açıkla, aşırı ayrıntıya boğma.",
        "derin": "Kapsamlı bir analiz yap; edge case'leri, alternatifleri ve gerekçeleri örneklerle destekle.",
        "kapsamli": "Mümkün olan en derin ve kapsamlı analizi yap; hiçbir edge case'i, riski veya alternatifi atlama."
      },
      "format": {
        "explained": "Kodu, her önemli bloğun hemen altında kısa açıklamalarla birlikte ver.",
        "full": "Kesilmemiş, tam ve çalıştırılabilir dosya içeriğini ver; parça veya yer tutucu kullanma.",
        "diff": "Değişikliği unified diff formatında (+/- satırlarıyla) sun.",
        "stepwise": "Çözümü adım adım, her adımda ne yapıldığını ve nedenini açıklayarak ilerlet."
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
      "goalTemplate": "\"{{KONU}}\" görevini doğru, sürdürülebilir ve production'a hazır bir mühendislik çözümüyle tamamlamak.",
      "constraintsBase": [
        "Doğrudan çözüme gir, gereksiz giriş cümlesi yazma.",
        "Varsayımda bulunduğun her yerde bunu açıkça belirt, sessizce varsayma.",
        "Kodu her zaman çalışır ve eksiksiz ver; '...geri kalanı burada' gibi yer tutucu bırakma."
      ],
      "monologueText": "İÇ SES MODU: Kod yazmadan veya bir karar vermeden önce, en az 3 alternatif yaklaşımı (<thinking> tagleri içerisinde) değerlendir ve en iyisini seç. Ancak nihai kullanıcı çıktısına bu iç sesi yansıtma."
    },
    "en": {
      "mod": {
        "senior": "You are a senior software engineer. You prioritize code quality, maintainability, and sound engineering tradeoffs.",
        "reviewer": "You are a meticulous code review specialist. You evaluate pull requests critically for correctness, design, and readability.",
        "architect": "You are a software architect. You decompose systems into components, define boundaries, and justify long-term architectural decisions.",
        "pair": "You are an experienced pair-programming partner. You share your reasoning, discuss alternatives, and work toward the best solution together.",
        "security": "You are an application security engineer. You evaluate every piece of code through an attacker's mindset, prioritizing exploitable weaknesses."
      },
      "derinlik": {
        "temel": "Keep it brief; give only the core approach and result, skip the detail.",
        "orta": "Provide a moderate level of detail; explain the main logic and key design decisions without over-explaining.",
        "derin": "Perform a thorough analysis; support edge cases, alternatives, and rationale with examples.",
        "kapsamli": "Perform the most exhaustive analysis possible; do not skip any edge case, risk, or alternative."
      },
      "format": {
        "explained": "Present the code with short explanations directly under each significant block.",
        "full": "Provide the complete, uncut, runnable file content; no fragments or placeholders.",
        "diff": "Present the change as a unified diff (+/- lines).",
        "stepwise": "Build the solution step by step, explaining what is done and why at each step."
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
      "goalTemplate": "To complete the task \"{{KONU}}\" with a correct, maintainable, production-ready engineering solution.",
      "constraintsBase": [
        "Get straight to the solution, no unnecessary preamble.",
        "Explicitly flag every assumption you make — never assume silently.",
        "Always give complete, runnable code; never leave '...rest of the implementation here' placeholders."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before writing code or making a decision, evaluate at least 3 alternative approaches using your internal monologue (<thinking> tags) and select the best one. Do not show this internal monologue in the final output."
    }
  },
  "presets": {
    "ship-feature": {
      "id": "ship-feature",
      "group": "build",
      "name": {
        "tr": "Özellik Yayınla",
        "en": "Ship Feature"
      },
      "desc": {
        "tr": "Üretime hazır temiz kod ve modül mimarisi yazar.",
        "en": "Writes clean production-ready code with tests."
      },
      "forceModules": [
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
        "tr": "Hata Ayıklama",
        "en": "Debug Issue"
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
        "tr": "Refactor",
        "en": "Refactor Code"
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
        "tr": "Sistem Tasarımı",
        "en": "System Architecture"
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
        "tr": "Performans Optimize",
        "en": "Perf Tuning"
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
        "tr": "Legacy Modernizasyon",
        "en": "Modernize Legacy"
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
        "tr": "Kod İncelemesi",
        "en": "Code Review"
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
        "tr": "Güvenlik Sertleştirme",
        "en": "Security Hardening"
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
        "tr": "Güvenlik Auditi",
        "en": "Security Audit"
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
        "tr": "Test Stratejisi",
        "en": "Test Strategy"
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
        "tr": "Oryantasyon",
        "en": "Code Base Onboard"
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
        "tr": "Dokümantasyon",
        "en": "Documentation"
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
