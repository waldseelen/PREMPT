export const cyberSpec = {
  "id": "cyber",
  "route": "cyber",
  "defaultConfig": {
    "seviye": "stride",
    "mod": "redteam",
    "derinlik": "orta",
    "format": "threat-model"
  },
  "icon": "shield",
  "category": "tech",
  "layers": [
    "threat",
    "appsec",
    "audit",
    "pentest",
    "compliance"
  ],
  "ui": {
    "tr": {
      "title": "Siber Güvenlik & Tehdit Modelleme",
      "subtitle": "STRIDE tehdit modelleri ve OWASP zafiyet denetimleri kurgula.",
      "topicLabel": "Tehdit Modellenecek Sistem / Kod",
      "topicPlaceholder": "OAuth 2.0 + JWT Auth Sunucusu...",
      "domainLabel": "Altyapı & Çalışma Ortamı",
      "domainPlaceholder": "AWS EKS, Public Facing REST API...",
      "levelLabel": "Denetim Modu",
      "modeLabel": "Siber Persona",
      "depthLabel": "Denetim Derinliği",
      "formatLabel": "Güvenlik Çıktısı",
      "presetGroups": {
        "threat": "Tehdit & Mimari",
        "appsec": "Uygulama Güvenliği",
        "pentest": "Saldırı & Uyum"
      }
    },
    "en": {
      "title": "Cybersecurity & Threat Architect",
      "subtitle": "Construct STRIDE threat models and OWASP security audits.",
      "topicLabel": "System / Code to Audit",
      "topicPlaceholder": "OAuth 2.0 + JWT Auth Server...",
      "domainLabel": "Infrastructure Environment",
      "domainPlaceholder": "AWS EKS, Public Facing REST API...",
      "levelLabel": "Audit Mode",
      "modeLabel": "Cyber Persona",
      "depthLabel": "Audit Depth",
      "formatLabel": "Security Syntax",
      "presetGroups": {
        "threat": "Threat & Architecture",
        "appsec": "Application Security",
        "pentest": "Offensive & Compliance"
      }
    }
  },
  "optionSets": {
    "levels": {
      "stride": {
        "tr": "STRIDE Tehdit Modelleme",
        "en": "STRIDE Threat Model"
      },
      "owasp": {
        "tr": "OWASP Top 10 Audit",
        "en": "OWASP Top 10 Audit"
      },
      "redteam": {
        "tr": "Red Team Pen-Test",
        "en": "Red Team Pen-Test"
      },
      "zerotrust": {
        "tr": "Zero Trust Spec",
        "en": "Zero Trust Spec"
      }
    },
    "modes": {
      "red": {
        "tr": "Etik Hacker (Red Team)",
        "en": "Ethical Hacker (Red Team)"
      },
      "blue": {
        "tr": "Sistem Savunucusu (Blue)",
        "en": "System Defender (Blue Team)"
      },
      "auditor": {
        "tr": "Uyum Denetçisi",
        "en": "Compliance Auditor"
      }
    },
    "depths": {
      "yuzey": {
        "tr": "Yüzey Taraması",
        "en": "Surface Scan"
      },
      "standart": {
        "tr": "Standart Audit",
        "en": "Standard Audit"
      },
      "derin": {
        "tr": "Derin Exploitation / PoC",
        "en": "Deep Exploitation / PoC"
      }
    },
    "formats": {
      "stridematris": {
        "tr": "STRIDE Tehdit Matrisi",
        "en": "STRIDE Threat Matrix"
      },
      "owaspenvanter": {
        "tr": "OWASP Zafiyet Raporu",
        "en": "OWASP Audit Report"
      },
      "pentestsenaryo": {
        "tr": "Pen-Test Saldırı Senaryosu",
        "en": "Pen-Test Attack Scenario"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "HEDEF SİSTEM",
      "levelHeader": "DENETİM MODU",
      "modeHeader": "SİBER PERSONA",
      "depthHeader": "DENETİM DERİNLİĞİ",
      "formatHeader": "GÜVENLİK ÇIKTISI"
    },
    "en": {
      "topicHeader": "TARGET SYSTEM",
      "levelHeader": "AUDIT MODE",
      "modeHeader": "CYBER PERSONA",
      "depthHeader": "AUDIT DEPTH",
      "formatHeader": "SECURITY SYNTAX"
    }
  },
  "presets": {
    "stride-threat": {
      "id": "stride-threat",
      "group": "threat",
      "name": {
        "tr": "🛡️ STRIDE Tehdit Modellemesi",
        "en": "🛡️ STRIDE Threat Model"
      },
      "desc": {
        "tr": "Spoofing, Tampering ve Elevation vektörlerini haritalandırır.",
        "en": "Maps threat vectors using STRIDE framework."
      },
      "forceModules": [
        "stride-threat-model",
        "stride-threat-model"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for stride-threat."
      ]
    },
    "owasp-top10": {
      "id": "owasp-top10",
      "group": "appsec",
      "name": {
        "tr": "⚠️ OWASP Top 10 Audit",
        "en": "⚠️ OWASP Top 10 Audit"
      },
      "desc": {
        "tr": "Web/API mimarisini en yaygın 10 zafiyete karşı tarar.",
        "en": "Audits system against OWASP top vulnerabilities."
      },
      "forceModules": [
        "attack-surface-mapping",
        "data-flow-diagram-audit"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for owasp-top10."
      ]
    },
    "redteam-scenario": {
      "id": "redteam-scenario",
      "group": "pentest",
      "name": {
        "tr": "⚔️ Red Team Saldırı Senaryosu",
        "en": "⚔️ Red Team Attack Scenario"
      },
      "desc": {
        "tr": "Etik hacker gözüyle sızma testi senaryosu.",
        "en": "Simulates ethical hacker breach techniques."
      },
      "forceModules": [
        "threat-actor-profiling",
        "owasp-top10-scanner"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for redteam-scenario."
      ]
    },
    "zero-trust-audit": {
      "id": "zero-trust-audit",
      "group": "threat",
      "name": {
        "tr": "🔐 Zero-Trust Mimari Denetimi",
        "en": "🔐 Zero-Trust Architecture Audit"
      },
      "desc": {
        "tr": "Mikro-segmentasyon ve sürekli doğrulama.",
        "en": "Verifies zero trust network microsegmentation."
      },
      "forceModules": [
        "data-flow-diagram-audit",
        "api-security-checklist"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for zero-trust-audit."
      ]
    },
    "blueteam-hardening": {
      "id": "blueteam-hardening",
      "group": "appsec",
      "name": {
        "tr": "🧱 Blue Team Sistem Sertleştirme",
        "en": "🧱 Blue Team System Hardening"
      },
      "desc": {
        "tr": "Sunucu ve OS güvenlik yapılandırması.",
        "en": "Hardens OS, Nginx, and cloud instances."
      },
      "forceModules": [
        "dread-risk-scoring",
        "zero-trust-architecture"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for blueteam-hardening."
      ]
    },
    "incident-response": {
      "id": "incident-response",
      "group": "pentest",
      "name": {
        "tr": "🚨 Olay Müdahale (Incident Response)",
        "en": "🚨 Incident Response Playbook"
      },
      "desc": {
        "tr": "Veri ihlali anında karantina ve analiz adımları.",
        "en": "Outlines containment steps during a security breach."
      },
      "forceModules": [
        "attack-tree-construction",
        "network-segmentation-audit"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for incident-response."
      ]
    },
    "api-security-audit": {
      "id": "api-security-audit",
      "group": "appsec",
      "name": {
        "tr": "🔑 API Auth & Token Denetimi",
        "en": "🔑 API Auth & Token Audit"
      },
      "desc": {
        "tr": "OAuth 2.0, JWT ve BOLA zafiyetlerini tarar.",
        "en": "Audits JWT validation, BOLA, and rate limiting."
      },
      "forceModules": [
        "owasp-top10-scanner",
        "pentest-scenario-builder"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for api-security-audit."
      ]
    },
    "social-engineering": {
      "id": "social-engineering",
      "group": "pentest",
      "name": {
        "tr": "🎣 Phishing & Sosyal Mühendislik",
        "en": "🎣 Phishing & Social Eng Prep"
      },
      "desc": {
        "tr": "Çalışan farkındalık ve oltalama testi.",
        "en": "Prepares phishing simulation and awareness drills."
      },
      "forceModules": [
        "input-validation-spec",
        "privilege-escalation-check"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for social-engineering."
      ]
    },
    "compliance-pci-gdpr": {
      "id": "compliance-pci-gdpr",
      "group": "pentest",
      "name": {
        "tr": "📜 KVKK & ISO 27001 Uyum Raporu",
        "en": "📜 ISO 27001 & GDPR Audit"
      },
      "desc": {
        "tr": "Veri gizliliği ve yasal mevzuat uyumu.",
        "en": "Verifies data privacy compliance and audit logs."
      },
      "forceModules": [
        "auth-authz-hardener",
        "iso27001-gap-analysis"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for compliance-pci-gdpr."
      ]
    },
    "malware-reverse": {
      "id": "malware-reverse",
      "group": "threat",
      "name": {
        "tr": "🧪 Zararlı Yazılım Analiz İskeleti",
        "en": "🧪 Malware Analysis Spec"
      },
      "desc": {
        "tr": "Statik ve dinamik malware inceleme protokolü.",
        "en": "Sets up static/dynamic malware sandbox analysis."
      },
      "forceModules": [
        "api-security-checklist",
        "supply-chain-risk-audit"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for malware-reverse."
      ]
    },
    "cloud-iam-audit": {
      "id": "cloud-iam-audit",
      "group": "threat",
      "name": {
        "tr": "☁️ Cloud IAM & S3 İzin Denetimi",
        "en": "☁️ Cloud IAM & S3 Bucket Audit"
      },
      "desc": {
        "tr": "AWS/GCP IAM aşırı yetkilendirme taraması.",
        "en": "Audits overly permissive IAM policies in cloud."
      },
      "forceModules": [
        "secrets-management-audit",
        "stride-threat-model"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for cloud-iam-audit."
      ]
    },
    "supply-chain-risk": {
      "id": "supply-chain-risk",
      "group": "appsec",
      "name": {
        "tr": "📦 Tedarik Zinciri (SCA) Riski",
        "en": "📦 Supply Chain Software Risk"
      },
      "desc": {
        "tr": "NPM/Pip bağımlılıklarındaki zafiyet taraması.",
        "en": "Audits open-source dependencies for vulnerability."
      },
      "forceModules": [
        "memory-safety-checker",
        "data-flow-diagram-audit"
      ],
      "override": {
        "derinlik": "orta",
        "format": "stridematris",
        "mod": "red"
      },
      "injectRules": [
        "Apply cyber domain rule for supply-chain-risk."
      ]
    }
  }
};
