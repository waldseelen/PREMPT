export const travelSpec = {
  "id": "travel",
  "route": "travel",
  "defaultConfig": {
    "seviye": "yerel",
    "mod": "rehber",
    "derinlik": "dengeli",
    "format": "gunluk"
  },
  "icon": "plane",
  "category": "life",
  "layers": [
    "curation",
    "route",
    "culture",
    "logistics",
    "budget"
  ],
  "ui": {
    "tr": {
      "title": "Seyahat & Deneyim Tasarımı",
      "subtitle": "Anti-turist yerel rotalar ve lojistik optimizasyonu.",
      "topicLabel": "Gidilecek Şehir / Ülke & Süre",
      "topicPlaceholder": "Tokyo, 7 Gün...",
      "domainLabel": "Seyahat Tarzı & Bütçe",
      "domainPlaceholder": "Gurme & Kültür odaklı, Orta Bütçe, Yürüyüş sever...",
      "levelLabel": "Planlama Modu",
      "modeLabel": "Gezgin Personası",
      "depthLabel": "Tempo",
      "formatLabel": "Rota Formatı",
      "presetGroups": {
        "curation": "Rota & Keşif",
        "logistics": "Ulaşım & Lojistik",
        "culture": "Kültür & Bütçe"
      }
    },
    "en": {
      "title": "Travel & Experience Architect",
      "subtitle": "Curate anti-tourist local routes and logistics optimization.",
      "topicLabel": "Destination & Duration",
      "topicPlaceholder": "Tokyo, 7 Days...",
      "domainLabel": "Travel Style & Budget",
      "domainPlaceholder": "Foodie & Culture focused, Moderate budget, Walking lover...",
      "levelLabel": "Planning Mode",
      "modeLabel": "Traveler Persona",
      "depthLabel": "Pacing",
      "formatLabel": "Itinerary Format",
      "presetGroups": {
        "curation": "Itinerary & Discovery",
        "logistics": "Transport & Logistics",
        "culture": "Culture & Budget"
      }
    }
  },
  "optionSets": {
    "levels": {
      "yerel": {
        "tr": "Anti-Turist (Yerel Rota)",
        "en": "Anti-Tourist (Local Gems)"
      },
      "lojistik": {
        "tr": "Lojistik & Ulaşım",
        "en": "Logistics & Transit"
      },
      "gorgu": {
        "tr": "Kültürel Görgü Kuralları",
        "en": "Cultural Etiquette"
      },
      "butce": {
        "tr": "Bütçe & Harcama",
        "en": "Budget & Cost Hack"
      }
    },
    "modes": {
      "gurme": {
        "tr": "Yerel Gurme",
        "en": "Local Foodie"
      },
      "kulturtarih": {
        "tr": "Kültür & Tarih Avcısı",
        "en": "Culture & History Hunter"
      },
      "slow": {
        "tr": "Yavaş Gezgin (Slow)",
        "en": "Slow Traveler"
      }
    },
    "depths": {
      "yavas": {
        "tr": "Yavaş & Dinlendirici",
        "en": "Relaxed & Slow"
      },
      "dengeli": {
        "tr": "Dengeli Tempo",
        "en": "Balanced Tempo"
      },
      "yogun": {
        "tr": "Yoğun (Her Anı Dolu)",
        "en": "Packed Itinerary"
      }
    },
    "formats": {
      "saatlik": {
        "tr": "Saatlik Rota Şeması",
        "en": "Hourly Itinerary Table"
      },
      "bolge": {
        "tr": "Bölge Harita Listesi",
        "en": "District Map List"
      },
      "butcetablo": {
        "tr": "Bütçe & Ulaşım Tablosu",
        "en": "Budget & Transit Table"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "SEYAHAT ROTASI",
      "levelHeader": "PLANLAMA MODU",
      "modeHeader": "GEZGİN PERSONASI",
      "depthHeader": "TEMPO",
      "formatHeader": "ROTA FORMATI"
    },
    "en": {
      "topicHeader": "TRAVEL DESTINATION",
      "levelHeader": "PLANNING MODE",
      "modeHeader": "TRAVELER PERSONA",
      "depthHeader": "PACING",
      "formatHeader": "ITINERARY FORMAT"
    }
  },
  "presets": {
    "anti-tourist-route": {
      "id": "anti-tourist-route",
      "group": "curation",
      "name": {
        "tr": "🗺️ Anti-Turist Yerel Gizli Rota",
        "en": "🗺️ Anti-Tourist Local Gem Route"
      },
      "desc": {
        "tr": "Turist tuzaklarından uzak yerel mekanlar.",
        "en": "Bypasses tourist traps to reveal authentic local spots."
      },
      "forceModules": [
        "cur-anti-tourist-trap-filter",
        "cur-anti-tourist-trap-filter"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for anti-tourist-route."
      ]
    },
    "transit-logistics": {
      "id": "transit-logistics",
      "group": "logistics",
      "name": {
        "tr": "🚌 Ulaşım & Lojistik Planı",
        "en": "🚌 Transit & Logistics Plan"
      },
      "desc": {
        "tr": "Pas kartlar, trenler ve bavul lojistiği.",
        "en": "Maps city passes, train lines, and luggage options."
      },
      "forceModules": [
        "cur-local-hidden-gem-route",
        "cur-niche-interest-customizer"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for transit-logistics."
      ]
    },
    "cultural-etiquette": {
      "id": "cultural-etiquette",
      "group": "culture",
      "name": {
        "tr": "⛩️ Kültürel Görgü & Bahşiş Rehberi",
        "en": "⛩️ Cultural Etiquette Guide"
      },
      "desc": {
        "tr": "Yazısız yerel görgü kuralları ve gelenekler.",
        "en": "Teaches unwritten social norms and tipping rules."
      },
      "forceModules": [
        "cur-culinary-foodie-itinerary",
        "rte-walking-distance-transit-opt"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for cultural-etiquette."
      ]
    },
    "budget-hacks": {
      "id": "budget-hacks",
      "group": "culture",
      "name": {
        "tr": "💡 Bütçe & Harcama Optimize Rehberi",
        "en": "💡 Travel Budget Hacks"
      },
      "desc": {
        "tr": "Ucuz bilet ve tasarruflu konaklama.",
        "en": "Saves money on transit, meals, and booking."
      },
      "forceModules": [
        "cur-niche-interest-customizer",
        "rte-day-trip-hub-spoke-model"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for budget-hacks."
      ]
    },
    "foodie-trail": {
      "id": "foodie-trail",
      "group": "curation",
      "name": {
        "tr": "🍜 Yerel Gurme & Lezzet Rotası",
        "en": "🍜 Local Foodie & Culinary Trail"
      },
      "desc": {
        "tr": "Sokak lezzetleri ve otantik restoranlar.",
        "en": "Curates authentic local street food joints."
      },
      "forceModules": [
        "cur-slow-travel-immersion",
        "cul-local-etiquette-taboos"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for foodie-trail."
      ]
    },
    "slow-travel": {
      "id": "slow-travel",
      "group": "curation",
      "name": {
        "tr": "☕ Yavaş & Dinlendirici Şehir Gezisi",
        "en": "☕ Slow & Relaxed City Exploration"
      },
      "desc": {
        "tr": "Koşturmacasız, kafe ve park odaklı gezi.",
        "en": "Relaxed cafe-hopping and neighborhood walks."
      },
      "forceModules": [
        "cur-family-accessible-curation",
        "cul-festival-seasonal-event-align"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for slow-travel."
      ]
    },
    "history-trail": {
      "id": "history-trail",
      "group": "curation",
      "name": {
        "tr": "🏛️ Tarih & Müze Keşif Rotası",
        "en": "🏛️ History & Museum Trail"
      },
      "desc": {
        "tr": "Tarihi yapılar ve sanatsal rotalar.",
        "en": "Explores historical landmarks and art galleries."
      },
      "forceModules": [
        "rte-walking-distance-transit-opt",
        "log-packing-capsule-wardrobe"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for history-trail."
      ]
    },
    "packing-checklist": {
      "id": "packing-checklist",
      "group": "logistics",
      "name": {
        "tr": "🧳 Bavul & Ekipman Hazırlık Listesi",
        "en": "🧳 Packing & Gear Checklist"
      },
      "desc": {
        "tr": "İklime uygun eksiksiz bavul envanteri.",
        "en": "Climate-tailored minimalist packing list."
      },
      "forceModules": [
        "rte-day-by-day-geographical-clustering",
        "log-travel-insurance-health-prep"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for packing-checklist."
      ]
    },
    "safety-scam-shield": {
      "id": "safety-scam-shield",
      "group": "culture",
      "name": {
        "tr": "🛡️ Güvenlik & Dolandırıcılık Kalkanı",
        "en": "🛡️ Tourist Safety & Scam Shield"
      },
      "desc": {
        "tr": "Yaygın dolandırıcılık yöntemlerine dikkat.",
        "en": "Alerts traveler to local scams and safe zones."
      },
      "forceModules": [
        "rte-scenic-roadtrip-pitstops",
        "bdg-daily-expense-categorizer"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for safety-scam-shield."
      ]
    },
    "photo-viewpoints": {
      "id": "photo-viewpoints",
      "group": "curation",
      "name": {
        "tr": "📸 Fotoğraf & Manzara Noktaları",
        "en": "📸 Scenic Photo Viewpoints"
      },
      "desc": {
        "tr": "En iyi manzara ve gün batımı noktaları.",
        "en": "Pinpoints golden-hour photography spots."
      },
      "forceModules": [
        "rte-day-trip-hub-spoke-model",
        "bdg-city-pass-attraction-roi"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for photo-viewpoints."
      ]
    },
    "family-friendly": {
      "id": "family-friendly",
      "group": "logistics",
      "name": {
        "tr": "👨‍👩‍👧 Çocuklu Aile Seyahat Planı",
        "en": "👨‍👩‍👧 Family & Kid-Friendly Plan"
      },
      "desc": {
        "tr": "Çocuklar için dinlenme molalı rota.",
        "en": "Paced itinerary with playground breaks for kids."
      },
      "forceModules": [
        "rte-pace-fatigue-management",
        "cur-anti-tourist-trap-filter"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for family-friendly."
      ]
    },
    "nightlife-events": {
      "id": "nightlife-events",
      "group": "culture",
      "name": {
        "tr": "🌃 Gece Hayatı & Etkinlik Rehberi",
        "en": "🌃 Nightlife & Live Events Guide"
      },
      "desc": {
        "tr": "Canlı müzik ve akşam etkinlikleri.",
        "en": "Recommends live jazz bars and evening events."
      },
      "forceModules": [
        "rte-weather-contingency-indoor-plan",
        "cur-niche-interest-customizer"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for nightlife-events."
      ]
    }
  }
};
