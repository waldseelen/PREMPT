export const edudesignSpec = {
  "id": "edudesign",
  "route": "edudesign",
  "icon": "🎒",
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
      }
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
        "taxonomy": "Taksonomi",
        "curriculum": "Müfredat",
        "assessment": "Değerlendirme"
      }
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
      "topicHeader": "MÜFREDAT HEDEFİ",
      "levelHeader": "EĞİTİM MODELİ",
      "modeHeader": "PEDAGOJİK YAKLAŞIM",
      "depthHeader": "KAPSAM",
      "formatHeader": "MÜFREDAT FORMATI"
    },
    "en": {
      "topicHeader": "CURRICULUM OBJECTIVE",
      "levelHeader": "EDU MODEL",
      "modeHeader": "PEDAGOGICAL APPROACH",
      "depthHeader": "SCOPE",
      "formatHeader": "CURRICULUM SYNTAX"
    }
  },
  "presets": {
    "blooms-quiz": {
      "id": "blooms-quiz",
      "group": "taxonomy",
      "icon": "🎓",
      "name": {
        "tr": "🎓 Bloom Taksonomisi Quiz",
        "en": "🎓 Bloom's Taxonomy Quiz"
      },
      "desc": {
        "tr": "Hatırlama, Anlama ve Uygulama seviyelerinde sorular türetir.",
        "en": "Generates active recall questions across Bloom taxonomy levels."
      },
      "forceModules": [
        "blooms-taxonomy-spec"
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
      "icon": "📐",
      "name": {
        "tr": "📐 4 Haftalık Bootcamp İskeleti",
        "en": "📐 4-Week Bootcamp Outline"
      },
      "desc": {
        "tr": "Haftalık hedefler ve çıktı matrisleri hazırlar.",
        "en": "Structures weekly outcomes and curriculum milestones."
      },
      "forceModules": [
        "curriculum-outline-spec"
      ],
      "override": {
        "derinlik": "bootcamp",
        "mod": "flipped"
      }
    }
  }
};
