export const edudesignSpec = {
  "id": "edudesign",
  "route": "edudesign",
  "defaultConfig": {
    "seviye": "mufredat",
    "mod": "bloom",
    "derinlik": "modul",
    "format": "hafta"
  },
  "icon": "backpack",
  "category": "academia",
  "layers": [
    "taxonomy",
    "curriculum",
    "assessment",
    "engagement",
    "rubrics"
  ],
  "ui": {
    "tr": {
      "title": "Eğitmen & Müfredat Mimarisi",
      "subtitle": "Bloom taksonomisi ve rubric ölçekleriyle müfredat tasarla.",
      "topicLabel": "Öğretilecek Konu / Kurs",
      "topicPlaceholder": "Python ile Veri Bilimine Giriş...",
      "domainLabel": "Öğrenci Profili & Süre",
      "domainPlaceholder": "Sıfırdan Başlayanlar, 4 Haftalık Bootcamp...",
      "levelLabel": "Eğitim Modeli",
      "modeLabel": "Pedagojik Yaklaşım",
      "depthLabel": "Kapsam",
      "formatLabel": "Müfredat Formatı",
      "presetGroups": {
        "taxonomy": "Taksonomi",
        "curriculum": "Müfredat",
        "assessment": "Değerlendirme"
      },
      "categories": {
        "taxonomy": "Öğrenme Taksonomisi",
        "curriculum": "Müfredat & Modüller",
        "assessment": "Ölçme & Değerlendirme",
        "engagement": "Etkileşim & Pekiştirme",
        "rubrics": "Değerlendirme Kriterleri"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
    },
    "en": {
      "title": "Edu-Design & Pedagogy Architect",
      "subtitle": "Design curricula and rubrics using Bloom's taxonomy.",
      "topicLabel": "Course / Topic to Teach",
      "topicPlaceholder": "Intro to Data Science with Python...",
      "domainLabel": "Student Profile & Duration",
      "domainPlaceholder": "Complete Beginners, 4-Week Bootcamp...",
      "levelLabel": "Edu Model",
      "modeLabel": "Pedagogical Approach",
      "depthLabel": "Scope",
      "formatLabel": "Curriculum Syntax",
      "presetGroups": {
        "taxonomy": "Taxonomy",
        "curriculum": "Curriculum",
        "assessment": "Assessment"
      },
      "categories": {
        "taxonomy": "Learning Taxonomy",
        "curriculum": "Curriculum & Modules",
        "assessment": "Assessment & Feedback",
        "engagement": "Engagement & Retention",
        "rubrics": "Rubrics & Criteria"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
    }
  },
  "optionSets": {
    "levels": {
      "mufredat": {
        "tr": "Müfredat İskeleti",
        "en": "Curriculum Outline"
      },
      "rubric": {
        "tr": "Rubric (Puanlama Anahtarı)",
        "en": "Scoring Rubric"
      },
      "active": {
        "tr": "Active Recall Quiz",
        "en": "Active Recall Quiz"
      },
      "ders": {
        "tr": "Ders Planı",
        "en": "Lesson Plan"
      }
    },
    "modes": {
      "bloom": {
        "tr": "Bloom Taksonomisi",
        "en": "Bloom's Taxonomy"
      },
      "flipped": {
        "tr": "Ters-Yüz Sınıf (Flipped)",
        "en": "Flipped Classroom"
      },
      "gamified": {
        "tr": "Gamification & Oyunlaştırma",
        "en": "Gamified Learning"
      }
    },
    "depths": {
      "atolye": {
        "tr": "1 Saatlik Atölye",
        "en": "1-Hour Workshop"
      },
      "modul": {
        "tr": "1 Haftalık Modül",
        "en": "1-Week Module"
      },
      "bootcamp": {
        "tr": "Tam Bootcamp",
        "en": "Full Bootcamp"
      }
    },
    "formats": {
      "hafta": {
        "tr": "Haftalık Müfredat Tablosu",
        "en": "Weekly Curriculum Table"
      },
      "rubricmatris": {
        "tr": "Rubric Derecelendirme Matrisi",
        "en": "Rubric Evaluation Matrix"
      },
      "bloomsoru": {
        "tr": "Bloom Soru Seti",
        "en": "Bloom Question Set"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "mod": {
        "bloom": "Sen Bloom Taksonomisi ve müfredat tasarım uzmanısın. Hedefleri hatırlama düzeyinden yaratma ve değerlendirme basamaklarına yapılandırırsın.",
        "flipped": "Sen Ters Yüz Öğrenme (Flipped Classroom) mimarısısın. Teorik bilgiyi bağımsız çalışmaya, sınıf içi zamanı ise aktif problem çözmeye odaklarsın.",
        "gamified": "Sen oyunlaştırılmış eğitim ve motivasyon tasarımcısısın. İlerleme döngüleri, geri bildirim sistemleri ve mikro-kazanımlarla öğrenmeyi sürükleyici kılarsın."
      },
      "derinlik": {
        "atolye": "Kısa süreli atölye veya mikro-öğrenme modülü formatında hazırla.",
        "modul": "Haftalık kazanımları ve değerlendirme kriterlerini içeren tam modül tasarla.",
        "bootcamp": "Kapsamlı, proje tabanlı ve uçtan uca yoğun eğitim programı oluştur."
      },
      "format": {
        "hafta": "Hafta hafta ilerleyen müfredat planı formatında yapılandır.",
        "rubricmatris": "Ölçme ve değerlendirme rubrik matrisi şeklinde hazırla.",
        "bloomsoru": "Bloom basamaklarına göre kademeli soru ve görev seti formatında sun."
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
      "goalTemplate": "\"{{KONU}}\" için pedagojik olarak yapılandırılmış, ölçülebilir kazanımlara ve etkili değerlendirme mekanizmalarına sahip bir müfredat tasarlamak.",
      "constraintsBase": [
        "Her öğrenme hedefini ölçülebilir eylem fiilleriyle tanımla.",
        "Teorik anlatım ile aktif uygulama arasındaki dengeyi koru.",
        "Öğrencinin ilerlemesini doğrulayan somut değerlendirme kriterleri koy."
      ],
      "monologueText": "İÇ SES MODU: Müfredatı oluşturmadan önce (<thinking> tagleri içinde) öğrencinin yaşayabileceği bilişsel aşırı yüklenme (cognitive overload) noktalarını belirle."
    },
    "en": {
      "mod": {
        "bloom": "You are an instructional designer specialized in Bloom's Taxonomy. You scaffold learning from foundational recall up to evaluation and synthesis.",
        "flipped": "You are a flipped classroom architect. You delegate passive knowledge transfer to prep-work and reserve active time for collaborative problem solving.",
        "gamified": "You are a gamification and educational engagement designer. You engineer progression loops, micro-achievements, and feedback loops."
      },
      "derinlik": {
        "atolye": "Format as a focused workshop or micro-learning module.",
        "modul": "Design a structured multi-week module with assessment rubrics.",
        "bootcamp": "Build an intensive, project-driven, comprehensive bootcamp program."
      },
      "format": {
        "hafta": "Structure as a week-by-week curriculum syllabus.",
        "rubricmatris": "Format as an analytical assessment rubric matrix.",
        "bloomsoru": "Present as a tiered question and task bank mapped to cognitive levels."
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
      "goalTemplate": "To design a pedagogically sound, outcome-based, and highly engaging learning curriculum for \"{{KONU}}\".",
      "constraintsBase": [
        "Formulate every learning objective with measurable action verbs.",
        "Balance conceptual exposition with active deliberate practice.",
        "Define unambiguous rubric criteria for student evaluation."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before structuring the syllabus, audit potential cognitive overload bottlenecks in <thinking> tags."
    }
  },
  "presets": {
    "blooms-quiz": {
      "id": "blooms-quiz",
      "group": "taxonomy",
      "icon": "zap",
      "name": {
        "tr": "Bloom Taksonomisi Quiz",
        "en": "Bloom's Taxonomy Quiz"
      },
      "desc": {
        "tr": "Hatırlama, Anlama ve Uygulama seviyelerinde sorular türetir.",
        "en": "Generates active recall questions across Bloom taxonomy levels."
      },
      "forceModules": [
        "tax-blooms-question-matrix",
        "tax-higher-order-prompting"
      ],
      "override": {
        "derinlik": "modul",
        "mod": "bloom",
        "format": "bloomsoru"
      }
    },
    "curriculum-outline": {
      "id": "curriculum-outline",
      "group": "curriculum",
      "icon": "zap",
      "name": {
        "tr": "4 Haftalık Bootcamp İskeleti",
        "en": "4-Week Bootcamp Outline"
      },
      "desc": {
        "tr": "Haftalık hedefler ve çıktı matrisleri hazırlar.",
        "en": "Structures weekly outcomes and curriculum milestones."
      },
      "forceModules": [
        "cur-competency-based-map",
        "cur-scaffolding-chunking"
      ],
      "override": {
        "derinlik": "bootcamp",
        "mod": "flipped",
        "format": "hafta"
      }
    },
    "ubd-backward-design": {
      "id": "ubd-backward-design",
      "group": "curriculum",
      "icon": "zap",
      "name": {
        "tr": "UbD Geriye Dönük Müfredat Tasarımı",
        "en": "UbD Backward Curriculum Design"
      },
      "desc": {
        "tr": "Önce nihai hedef ve değerlendirmeyi, ardından öğrenme etkinliklerini kurgular.",
        "en": "Designs learning goals backwards from desired final outcomes and evidence."
      },
      "forceModules": [
        "cur-backward-design-ubd",
        "cur-competency-based-map",
        "ass-authentic-task-assessment"
      ],
      "override": {
        "derinlik": "modul",
        "mod": "bloom",
        "format": "hafta"
      }
    },
    "dok-rigor-matrix": {
      "id": "dok-rigor-matrix",
      "group": "taxonomy",
      "icon": "zap",
      "name": {
        "tr": "Webb DOK Bilişsel Derinlik Matrisi",
        "en": "Webb's DOK Rigor Matrix"
      },
      "desc": {
        "tr": "Soruları ve görevleri 4 farklı bilişsel derinlik seviyesinde hizalar.",
        "en": "Aligns tasks and questions across 4 Depth of Knowledge levels."
      },
      "forceModules": [
        "tax-depth-of-knowledge-dok",
        "tax-higher-order-prompting",
        "ass-summative-capstone-spec"
      ],
      "override": {
        "derinlik": "modul",
        "mod": "bloom",
        "format": "bloomsoru"
      }
    },
    "flipped-classroom-suite": {
      "id": "flipped-classroom-suite",
      "group": "curriculum",
      "icon": "zap",
      "name": {
        "tr": "Ters-Yüz Sınıf (Flipped) Paketi",
        "en": "Flipped Classroom Instruction Suite"
      },
      "desc": {
        "tr": "Ders öncesi bireysel hazırlık ve sınıf içi akran etkileşimini yapılandırır.",
        "en": "Structures pre-class preparation and in-class peer collaboration."
      },
      "forceModules": [
        "eng-flipper-classroom-prep",
        "eng-peer-instruction-think-pair",
        "ass-formative-exit-ticket"
      ],
      "override": {
        "derinlik": "atolye",
        "mod": "flipped",
        "format": "hafta"
      }
    },
    "gamified-engagement-loop": {
      "id": "gamified-engagement-loop",
      "group": "curriculum",
      "icon": "zap",
      "name": {
        "tr": "Oyunlaştırılmış Öğrenme Döngüsü",
        "en": "Gamified Learning & Reward Loop"
      },
      "desc": {
        "tr": "Öğrenci motivasyonunu artırmak için puan, rozet ve senaryo dilemmaları kurar.",
        "en": "Boosts motivation via points, badges, and scenario-based dilemmas."
      },
      "forceModules": [
        "eng-gamification-loop",
        "eng-active-recall-drill",
        "eng-case-study-dilemma-builder"
      ],
      "override": {
        "derinlik": "modul",
        "mod": "gamified",
        "format": "bloomsoru"
      }
    },
    "analytical-rubric-builder": {
      "id": "analytical-rubric-builder",
      "group": "assessment",
      "icon": "zap",
      "name": {
        "tr": "Dereceli Değerlendirme Rubric'i",
        "en": "Analytical Scoring Rubric"
      },
      "desc": {
        "tr": "Ödev ve projeler için şeffaf performans kriterleri ve puan matrisi üretir.",
        "en": "Generates clear performance criteria and scoring rubrics for assignments."
      },
      "forceModules": [
        "rub-holistic-analytical-rubric",
        "rub-objective-performance-criteria",
        "rub-mastery-threshold-matrix"
      ],
      "override": {
        "derinlik": "modul",
        "mod": "bloom",
        "format": "rubricmatris"
      }
    },
    "socratic-seminar-kit": {
      "id": "socratic-seminar-kit",
      "group": "curriculum",
      "icon": "zap",
      "name": {
        "tr": "Sokratik Seminer & Tartışma Kiti",
        "en": "Socratic Seminar Discussion Kit"
      },
      "desc": {
        "tr": "Kritik düşünmeyi tetikleyen derin soru dizileri ve tartışma kuralları hazırlar.",
        "en": "Drafts deep questioning sequences and protocols for critical seminars."
      },
      "forceModules": [
        "eng-socratic-seminar-guide",
        "tax-higher-order-prompting",
        "ass-peer-self-eval-protocol"
      ],
      "override": {
        "derinlik": "atolye",
        "mod": "bloom",
        "format": "bloomsoru"
      }
    },
    "spaced-interleaving-plan": {
      "id": "spaced-interleaving-plan",
      "group": "curriculum",
      "icon": "clock",
      "name": {
        "tr": "Aralıklı Tekrar & Serpiştirilmiş Müfredat",
        "en": "Spaced Retrieval & Interleaving Plan"
      },
      "desc": {
        "tr": "Kalıcı hafıza için konuları zaman içine yayar ve çapraz tekrar eder.",
        "en": "Schedules topic review across intervals to build long-term retention."
      },
      "forceModules": [
        "cur-interleaving-spaced-curriculum",
        "cur-scaffolding-chunking",
        "eng-active-recall-drill"
      ],
      "override": {
        "derinlik": "bootcamp",
        "mod": "bloom",
        "format": "hafta"
      }
    },
    "authentic-capstone-eval": {
      "id": "authentic-capstone-eval",
      "group": "assessment",
      "icon": "zap",
      "name": {
        "tr": "Otantik Değerlendirme & Capstone Projesi",
        "en": "Authentic Assessment & Capstone Project"
      },
      "desc": {
        "tr": "Gerçek dünya problemleri üzerinden final projesi ve değerlendirme ölçütleri kurar.",
        "en": "Constructs real-world capstone projects and authentic evaluation criteria."
      },
      "forceModules": [
        "ass-authentic-task-assessment",
        "ass-summative-capstone-spec",
        "rub-exemplar-anchor-papers"
      ],
      "override": {
        "derinlik": "bootcamp",
        "mod": "bloom",
        "format": "rubricmatris"
      }
    },
    "diagnostic-exit-ticket": {
      "id": "diagnostic-exit-ticket",
      "group": "assessment",
      "icon": "zap",
      "name": {
        "tr": "Ön Bilgi Teşhisi & Formatif Çıkış Kartı",
        "en": "Diagnostic Prior Knowledge & Exit Ticket"
      },
      "desc": {
        "tr": "Ders başında hazırbulunuşluğu, ders sonunda ise kazanımı hızlıca ölçer.",
        "en": "Assesses readiness before lessons and checks learning outcomes at exit."
      },
      "forceModules": [
        "ass-diagnostic-prior-knowledge",
        "ass-formative-exit-ticket",
        "rub-constructive-feedback-bank"
      ],
      "override": {
        "derinlik": "atolye",
        "mod": "bloom",
        "format": "bloomsoru"
      }
    },
    "universal-udl-scaffolding": {
      "id": "universal-udl-scaffolding",
      "group": "curriculum",
      "icon": "zap",
      "name": {
        "tr": "Evrensel Öğrenme Tasarımı (UDL) & İskeletleşme",
        "en": "Universal Design for Learning (UDL) & Scaffolding"
      },
      "desc": {
        "tr": "Farklı öğrenme stillerine uyarlamalı erişilebilir müfredat yapısı kurar.",
        "en": "Creates accessible, adaptive learning structures for diverse learner needs."
      },
      "forceModules": [
        "cur-universal-learning-design",
        "tax-psychomotor-skill-scaffolding",
        "cur-cross-disciplinary-bridge"
      ],
      "override": {
        "derinlik": "modul",
        "mod": "bloom",
        "format": "hafta"
      }
    }
  }
};
