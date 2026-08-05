export interface Module {
  id: string;
  icon: string;
  name: string;
  category: string;
  description: string;
  layer: 1 | 2 | 3;
  requires: string[];
  prompt: string;
}

export interface DomainData {
  tr: Module[];
  en: Module[];
}

export const premptDomainsData: Record<string, DomainData> = {
  // ---------------------------------------------------------------------------
  // 1. DECISION (Karar Alma & Zihinsel Modeller)
  // ---------------------------------------------------------------------------
  decision: {
    tr: [
      {
        id: "decision-framing",
        icon: "🎯",
        name: "Karar Çerçeveleme",
        category: "foundation",
        description: "Karar probleminin sınırlarını, varsayımlarını ve temel sorusunu net bir şekilde tanımlar.",
        layer: 1,
        requires: [],
        prompt: "Karar problemini netleştir ve çerçevele: Çözülmeye çalışılan asıl sorun nedir? Bu kararın kapsamı, zaman ufku ve değiştirilemez sınır parametreleri (constraints) nelerdir? Soruyu yeniden ifade ederek yanlış bir problemi çözme riskini ortadan kaldır."
      },
      {
        id: "core-objectives",
        icon: "📌",
        name: "Temel Hedefler",
        category: "foundation",
        description: "Başarı ölçütlerini ve vazgeçilemez hedefleri hiyerarşik olarak belirler.",
        layer: 1,
        requires: ["decision-framing"],
        prompt: "Bu karardan beklenen temel hedefleri (must-haves) ve ikincil arzuları (nice-to-haves) hiyerarşik olarak listele. Her hedef için somut ve ölçülebilir bir başarı metriği tanımla."
      },
      {
        id: "boundary-conditions",
        icon: "🚧",
        name: "Sınır Koşulları",
        category: "foundation",
        description: "Kararın ihlal edemeyeceği bütçe, etik, yasal ve zaman limitlerini koyar.",
        layer: 1,
        requires: ["decision-framing"],
        prompt: "Kararın mutlak sınır koşullarını belirle: Bütçe, zaman, yasal/etik sınırlar ve teknolojik imkansızlıklar nelerdir? Bu sınırları aşan çözümleri elenecek alternatifler olarak işaretle."
      },
      {
        id: "stakeholder-mapping",
        icon: "👥",
        name: "Paydaş Haritalama",
        category: "foundation",
        description: "Karardan etkilenen ve kararı etkileyen aktörleri analiz eder.",
        layer: 1,
        requires: ["core-objectives"],
        prompt: "Karardan etkilenen ana paydaşları, yetki düzeylerini ve kazanç/kayıp beklentilerini haritalandır. Karar sürecine kimlerin dahil edilmesi gerektiğini ve direnç odaklarını belirle."
      },
      {
        id: "information-audit",
        icon: "🔍",
        name: "Bilgi Denetimi",
        category: "foundation",
        description: "Mevcut verileri, eksik bilgileri ve bilinmeyenleri sınıflandırır.",
        layer: 1,
        requires: ["decision-framing"],
        prompt: "Bilgi envanterini çıkart: (a) Ne biliyoruz (doğrulanmış veri)? (b) Ne bilmiyoruz (bilinen eksikler)? (c) Neyi bilemeyiz (belirsizlikler)? Eksik bilgileri tamamlamanın maliyet/fayda oranını değerlendir."
      },
      {
        id: "reversibility-check",
        icon: "🔄",
        name: "Geri Döndürülebilirlik",
        category: "foundation",
        description: "Kararın Tip 1 (tek yönlü kapı) mi yoksa Tip 2 (çift yönlü kapı) mi olduğunu belirler.",
        layer: 1,
        requires: ["boundary-conditions"],
        prompt: "Kararın geri döndürülebilirliğini analiz et (Jeff Bezos Tek/Çift Yönlü Kapı testi): Bu karar yanlış çıkarsa geri dönmenin maliyeti nedir? Hızlı karar verilmesi gereken esnek bir karar mı, yoksa yavaş ve derin analiz gerektiren stratejik bir karar mı?"
      },
      {
        id: "second-order-thinking",
        icon: "🔮",
        name: "İkinci Derece Etkiler",
        category: "analysis",
        description: "Kararın dolaylı sonuçlarını ve domino etkilerini haritalandırır.",
        layer: 2,
        requires: ["decision-framing"],
        prompt: "İkinci ve üçüncü derece etkileri analiz et: Doğrudan sonucun ötesinde, 6 ay ve 2 yıl sonra ne gibi kelebek etkileri ortaya çıkacak? Sistemdeki diğer aktörler bu karara nasıl tepki verecek (perverse incentives)?"
      },
      {
        id: "inversion-method",
        icon: "🙃",
        name: "Tersine Çevirme (Inversion)",
        category: "analysis",
        description: "Başarıya odaklanmak yerine felaketi engelleme perspektifi getirir.",
        layer: 2,
        requires: ["decision-framing"],
        prompt: "Sorunu tersine çevir (Inversion): Başarılı olmaya çalışmak yerine, bu kararın TAM BİR FELAKETLE sonuçlanması için ne yapılması gerekirdi? Bu felaket senaryolarını tek tek listele ve her birinden kaçınma yollarını tasarla."
      },
      {
        id: "matrix-2x2",
        icon: "📐",
        name: "2x2 Karar Matrisi",
        category: "analysis",
        description: "Alternatifleri iki kritik eksende görselleştirip önceliklendirir.",
        layer: 2,
        requires: ["core-objectives"],
        prompt: "Alternatifleri 2x2 matriste konumlandır (Örn: Etki vs. Çaba veya Risk vs. Getiri). Her kadrandaki opsiyonları açıkça tanımla ve sol üst / sağ üst öncelik dengesini kur."
      },
      {
        id: "causal-loop-mapping",
        icon: "♾️",
        name: "Neden-Sonuç Döngüsü",
        category: "analysis",
        description: "Sistemik geri besleme (feedback loop) dinamiklerini inceler.",
        layer: 2,
        requires: ["second-order-thinking"],
        prompt: "Karar alanındaki güçlendirici (reinforcing) ve dengeleyici (balancing) geri besleme döngülerini çıkar. Hangi eylemin kartopu etkisi yaratacağını, hangisinin sistemi doygunluğa ulaştıracağını göster."
      },
      {
        id: "scenario-planning",
        icon: "🗺️",
        name: "Senaryo Planlaması",
        category: "analysis",
        description: "En iyi, en kötü ve en olası geleceklere göre kararı test eder.",
        layer: 2,
        requires: ["decision-framing"],
        prompt: "Üç farklı gelecek senaryosu oluştur: (a) İyimser (Bull), (b) Baz Senaryo (Base), (c) Kötümser (Bear). Seçilen kararın her üç senaryodaki performansını ve dayanıklılığını kıyasla."
      },
      {
        id: "expected-value-calc",
        icon: "📊",
        name: "Beklenen Değer Analizi",
        category: "analysis",
        description: "Olasılıklar ve finansal/operasyonel çıktılarla olasılıksal hesaplama yapar.",
        layer: 2,
        requires: ["information-audit"],
        prompt: "Olasılıksal beklenen değeri hesapla: Her bir alternatif için olası çıktıları (%) olasılık ağırlıkları ile çarp ($EV = \\sum (p_i \\times v_i)$). Kararın negatif kuyruk riskini (tail risk) görünür kıl."
      },
      {
        id: "opportunity-cost-audit",
        icon: "⚖️",
        name: "Fırsat Maliyeti",
        category: "tradeoff",
        description: "Vazgeçilen en iyi alternatifin getirisini ölçer.",
        layer: 2,
        requires: ["matrix-2x2"],
        prompt: "Bu kararı alarak VAZGEÇTİĞİMİZ en iyi alternatif nedir? Sermaye, zaman ve insan kaynağının bu seçeneğe bağlanmasıyla feda edilen fırsat maliyetini nicel olarak hesapla."
      },
      {
        id: "trade-off-dilemma",
        icon: "🔀",
        name: "Ödünleşme (Trade-Off) Analizi",
        category: "tradeoff",
        description: "Çatışan iki iyi veya iki kötü seçenek arasında açık seçim yaptırır.",
        layer: 2,
        requires: ["matrix-2x2"],
        prompt: "Karardaki temel ödünleşmeyi (trade-off) açıkça yaz: Hızdan mı, kaliteden mi, bütçeden mi yoksa esneklikten mi ödün veriyoruz? Bedelsiz bir kazanım olmadığını varsayarak, kabul edilen negatif yan etkiyi tanımla."
      },
      {
        id: "regret-minimization",
        icon: "⏳",
        name: "Pişmanlık Minimizasyonu",
        category: "tradeoff",
        description: "Uzun vadeli perspektifle pişmanlığı en aza indiren seçeneği bulur.",
        layer: 2,
        requires: ["reversibility-check"],
        prompt: "80 yaşına geldiğinde geriye dönüp baktığını hayal et (Jeff Bezos Regret Minimization Framework): Bu kararı almamak mı seni daha çok pişman eder, yoksa deneyip başarısız olmak mı?"
      },
      {
        id: "skin-in-the-game",
        icon: "🛡️",
        name: "Sorumluluk Payı (Skin in the Game)",
        category: "tradeoff",
        description: "Kararı alanların riskten doğrudan etkilenme derecesini ölçer.",
        layer: 2,
        requires: ["stakeholder-mapping"],
        prompt: "Karar alıcıların ve tavsiye verenlerin riskteki payını (Nassim Taleb - Skin in the Game) sorgula: Karar başarısız olursa bedelini kim ödeyecek? Çıkar çatışmalarını ve asimetrik riskleri ortaya çıkar."
      },
      {
        id: "resource-cap-analysis",
        icon: "🔋",
        name: "Kaynak Limiti Analizi",
        category: "tradeoff",
        description: "Enerji, bütçe ve odak kapasitesinin sınırlarını değerlendirir.",
        layer: 2,
        requires: ["opportunity-cost-audit"],
        prompt: "Mevcut bant genişliği ve kaynak sınırlarını incele: Kararın uygulanması organizasyonun veya bireyin ana odağını dağıtacak mı? Sürdürülebilir sınırların aşılıp aşılmadığını kontrol et."
      },
      {
        id: "option-value-pricing",
        icon: "🏷️",
        name: "Opsiyon Değeri",
        category: "tradeoff",
        description: "Gelecekte yeni seçenekler yaratma yeteneğini fiyatlandırır.",
        layer: 2,
        requires: ["expected-value-calc"],
        prompt: "Bu kararın gelecekte yeni opsiyonlar kapısını açıp açmadığını değerlendir: Karar bizi tek bir patikaya mı mahkum ediyor, yoksa gelecekte pivot etme esnekliği kazandırıyor mu?"
      },
      {
        id: "confirmation-bias-strip",
        icon: "🧹",
        name: "Doğrulama Yanlılığı Temizliği",
        category: "biases",
        description: "Sadece mevcut inancı destekleyen verileri seçme eğilimini kırar.",
        layer: 3,
        requires: ["inversion-method"],
        prompt: "Doğrulama yanlılığını (Confirmation Bias) filtrele: Kararın YANLIŞ olduğunu kanıtlayan en güçlü 3 veriyi veya argümanı bul. Bu karşıt deliller neden göz ardı edilmiş olabilir?"
      },
      {
        id: "sunk-cost-filter",
        icon: "🗑️",
        name: "Batık Maliyet Temizliği",
        category: "biases",
        description: "Geçmiş harcamaları karardan tamamen izole eder.",
        layer: 3,
        requires: ["reversibility-check"],
        prompt: "Geçmişte harcanan zaman, para ve emeği (Sunk Cost) analizden tamamen çıkar. Eğer bu projeye/karara BUGÜN SIFIRDAN başlasaydın, aynı yatırımı yapar mıydın?"
      },
      {
        id: "availability-heuristic-check",
        icon: "🧠",
        name: "Erişilebilirlik Yanlılığı Testi",
        category: "biases",
        description: "Son yaşanan veya akılda kalıcı olayların kararı çarpıtmasını engeller.",
        layer: 3,
        requires: ["information-audit"],
        prompt: "Kararın yakın zamanda yaşanmış, duygusal veya akılda kalıcı tek bir olaydan etkilenip etkilenmediğini saptar. Veri setinin istatistiksel temsil gücünü kontrol et."
      },
      {
        id: "survivorship-bias-shield",
        icon: "🛟",
        name: "Mümessillik (Survivorship) Kalkanı",
        category: "biases",
        description: "Görünmeyen başarısızlık verilerini görünür kılar.",
        layer: 3,
        requires: ["scenario-planning"],
        prompt: "Başarı hikayelerine odaklanarak elenen/başarısız olan çoğunluğu (Survivorship Bias) unutmadığından emin ol. Görünmez olan başarısızlık örneklerini incele."
      },
      {
        id: "framing-effect-neutralizer",
        icon: "🖼️",
        name: "Çerçeveleme Nötrleme",
        category: "biases",
        description: "Soru veya seçeneğin sunuluş biçiminden kaynaklanan sapmaları siler.",
        layer: 3,
        requires: ["decision-framing"],
        prompt: "Karar metnini tamamen nötr bir dille, hem %90 başarı hem de %10 başarısızlık oranı üzerinden iki farklı şekilde yazarak sunum yanılsamasını ortadan kaldır."
      },
      {
        id: "groupthink-deconstruct",
        icon: "🗣️",
        name: "Grup Düşüncesi Yıkımı",
        category: "biases",
        description: "Konsensüs baskısını kırarak Şeytanın Avukatlığı rolünü işletir.",
        layer: 3,
        requires: ["stakeholder-mapping"],
        prompt: "Grup düşüncesine (Groupthink) karşı 'Şeytanın Avukatı' rolünü üstlen. Ekibin veya çoğunluğun sorgulamadan kabul ettiği temel varsayımı bul ve acımasızca çürüt."
      },
      {
        id: "pre-mortem-analysis",
        icon: "💀",
        name: "Pre-Mortem Analizi",
        category: "execution",
        description: "Geleceğe gidip projenin patladığını varsayarak nedenleri önceden çözer.",
        layer: 3,
        requires: ["second-order-thinking", "confirmation-bias-strip"],
        prompt: "Pre-Mortem Çalışması yap: Şimdi 2 yıl sonrasındayız ve bu karar KORKUNÇ BİR BAŞARISIZLIKLA sonuçlandı. Otopsi raporunu yaz: Bizi bu felakete götüren ana nedenler sırasıyla neydi ve bunları bugünden nasıl engelleriz?"
      },
      {
        id: "trigger-metrics",
        icon: "🚨",
        name: "Tetikleyici Metrikler",
        category: "execution",
        description: "Kararın gidişatını izleyen otomatik erken uyarı sinyalleri kurar.",
        layer: 3,
        requires: ["boundary-conditions"],
        prompt: "Kararın uygulanma sürecinde takip edilecek 3 erken uyarı sinyali (Trigger Metrics) tanımla. Hangi sayısal değer aşıldığında B Planı devreye girecek?"
      },
      {
        id: "kill-switch-criteria",
        icon: "🛑",
        name: "İptal Protokolü (Kill Switch)",
        category: "execution",
        description: "Kararı ne zaman ve nasıl zararsızca durduracağının koşullarını koyar.",
        layer: 3,
        requires: ["reversibility-check"],
        prompt: "Kararı tamamen iptal etmek için koşulsuz 'Kill Switch' şartlarını belirle: Hangi bütçe aşımında, zaman kaybında veya performans düşüşünde projeyi durduracağız?"
      },
      {
        id: "feedback-loop-design",
        icon: "🔁",
        name: "Geri Bildirim Mekanizması",
        category: "execution",
        description: "Kararın sonuçlarını ölçen düzenli gözden geçirme döngüsü kurar.",
        layer: 3,
        requires: ["pre-mortem-analysis"],
        prompt: "Karar sonrası izleme döngüsü (Feedback Loop) tasarla: 30, 90 ve 180. günlerde hangi metrikler denetlenecek ve öğrenilen dersler sisteme nasıl aktarılacak?"
      },
      {
        id: "decision-journaling",
        icon: "📓",
        name: "Karar Günlüğü Protokolü",
        category: "execution",
        description: "Karar anındaki zihinsel durumu ve gerekçeleri gelecekteki analiz için kaydeder.",
        layer: 3,
        requires: ["decision-framing"],
        prompt: "Karar anındaki varsayımları, ruh halini ve beklenen olasılıkları içeren Karar Günlüğü (Decision Log) şablonunu doldur. Gelecekte sonucun şans mı yoksa doğru analiz mi olduğunu tespit et."
      },
      {
        id: "post-mortem-review",
        icon: "🔬",
        name: "Post-Mortem İnceleme",
        category: "execution",
        description: "Uygulama tamamlandıktan sonra beklenti ile gerçekleşeni karşılaştırır.",
        layer: 3,
        requires: ["feedback-loop-design"],
        prompt: "Post-Mortem değerlendirmesi yap: Tahmin edilen çıktılar ile gerçekleşen çıktılar arasındaki sapmayı ölç. Karar verme algoritmasındaki sistematik hatayı bul."
      }
    ],
    en: [
      {
        id: "decision-framing",
        icon: "🎯",
        name: "Decision Framing",
        category: "foundation",
        description: "Defines the core boundaries, assumptions, and central question of the decision problem.",
        layer: 1,
        requires: [],
        prompt: "Clarify and frame the decision problem: What is the actual core problem to solve? What are the scope, time horizon, and non-negotiable constraint parameters? Reframe the question to avoid solving the wrong problem."
      },
      {
        id: "core-objectives",
        icon: "📌",
        name: "Core Objectives",
        category: "foundation",
        description: "Hierarchically establishes success metrics and non-negotiable goals.",
        layer: 1,
        requires: ["decision-framing"],
        prompt: "Hierarchically list primary non-negotiable objectives (must-haves) and secondary desires (nice-to-haves). Define a concrete, measurable success metric for each objective."
      },
      {
        id: "boundary-conditions",
        icon: "🚧",
        name: "Boundary Conditions",
        category: "foundation",
        description: "Sets hard budget, ethical, legal, and operational limits.",
        layer: 1,
        requires: ["decision-framing"],
        prompt: "Determine the absolute boundary conditions: What are the budget, time, legal/ethical limits, and technological impossibilities? Mark any solution violating these boundaries as disqualified."
      },
      {
        id: "stakeholder-mapping",
        icon: "👥",
        name: "Stakeholder Mapping",
        category: "foundation",
        description: "Analyzes actors affected by and influencing the decision.",
        layer: 1,
        requires: ["core-objectives"],
        prompt: "Map key stakeholders, their authority levels, and gain/loss expectations. Identify who must be included in the decision process and locate potential points of resistance."
      },
      {
        id: "information-audit",
        icon: "🔍",
        name: "Information Audit",
        category: "foundation",
        description: "Classifies known data, missing information, and irreducible uncertainties.",
        layer: 1,
        requires: ["decision-framing"],
        prompt: "Conduct an information audit: (a) What do we know (verified data)? (b) What do we not know (known gaps)? (c) What can we not know (uncertainties)? Evaluate the cost/benefit ratio of gathering missing data."
      },
      {
        id: "reversibility-check",
        icon: "🔄",
        name: "Reversibility Assessment",
        category: "foundation",
        description: "Determines whether the decision is Type 1 (one-way door) or Type 2 (two-way door).",
        layer: 1,
        requires: ["boundary-conditions"],
        prompt: "Assess decision reversibility (Jeff Bezos One-Way vs. Two-Way door test): What is the unwinding cost if this decision is wrong? Is this a flexible decision requiring rapid action, or a strategic one requiring deep analysis?"
      },
      {
        id: "second-order-thinking",
        icon: "🔮",
        name: "Second-Order Thinking",
        category: "analysis",
        description: "Maps indirect consequences and ripple effects over time.",
        layer: 2,
        requires: ["decision-framing"],
        prompt: "Analyze second- and third-order effects: Beyond immediate outcomes, what butterfly effects will emerge in 6 months and 2 years? How will other system actors react (perverse incentives)?"
      },
      {
        id: "inversion-method",
        icon: "🙃",
        name: "Inversion Method",
        category: "analysis",
        description: "Shifts perspective from seeking success to systematically avoiding failure.",
        layer: 2,
        requires: ["decision-framing"],
        prompt: "Invert the problem: Instead of trying to succeed, what would guarantee COMPLETE DISASTER for this decision? List these failure modes and design proactive measures to prevent each one."
      },
      {
        id: "matrix-2x2",
        icon: "📐",
        name: "2x2 Decision Matrix",
        category: "analysis",
        description: "Visualizes and prioritizes alternatives across two critical axes.",
        layer: 2,
        requires: ["core-objectives"],
        prompt: "Position alternatives on a 2x2 matrix (e.g., Impact vs. Effort or Risk vs. Return). Clearly define options in each quadrant and balance priorities toward high-value quadrants."
      },
      {
        id: "causal-loop-mapping",
        icon: "♾️",
        name: "Causal Loop Mapping",
        category: "analysis",
        description: "Examines systemic feedback dynamics and snowball effects.",
        layer: 2,
        requires: ["second-order-thinking"],
        prompt: "Map reinforcing and balancing feedback loops in the decision space. Highlight actions that generate snowball effects versus those leading to system equilibrium."
      },
      {
        id: "scenario-planning",
        icon: "🗺️",
        name: "Scenario Planning",
        category: "analysis",
        description: "Tests decision resilience across best, worst, and baseline futures.",
        layer: 2,
        requires: ["decision-framing"],
        prompt: "Develop three distinct future scenarios: (a) Bull, (b) Base, and (c) Bear. Compare the performance and structural resilience of the decision across all three scenarios."
      },
      {
        id: "expected-value-calc",
        icon: "📊",
        name: "Expected Value Calculation",
        category: "analysis",
        description: "Computes probabilistic outcomes weighted by financial/operational impact.",
        layer: 2,
        requires: ["information-audit"],
        prompt: "Calculate probabilistic expected value: Multiply possible outcomes by probability weights ($EV = \\sum (p_i \\times v_i)$). Explicitly expose negative tail risks."
      },
      {
        id: "opportunity-cost-audit",
        icon: "⚖️",
        name: "Opportunity Cost Audit",
        category: "tradeoff",
        description: "Quantifies the foregone return of the next best alternative.",
        layer: 2,
        requires: ["matrix-2x2"],
        prompt: "Identify the single best alternative FOREGONE by making this decision. Quantify the opportunity cost of tying up capital, time, and focus in this option."
      },
      {
        id: "trade-off-dilemma",
        icon: "🔀",
        name: "Trade-Off Analysis",
        category: "tradeoff",
        description: "Forces explicit choices between competing priorities.",
        layer: 2,
        requires: ["matrix-2x2"],
        prompt: "Explicitly state the primary trade-off: Are we sacrificing speed, quality, budget, or flexibility? Assuming no free lunch, define the accepted negative side effect."
      },
      {
        id: "regret-minimization",
        icon: "⏳",
        name: "Regret Minimization",
        category: "tradeoff",
        description: "Selects options that minimize long-term regret from a multi-decade perspective.",
        layer: 2,
        requires: ["reversibility-check"],
        prompt: "Project yourself to age 80 looking back (Jeff Bezos Regret Minimization Framework): Will you regret NOT making this decision more than trying and failing?"
      },
      {
        id: "skin-in-the-game",
        icon: "🛡️",
        name: "Skin in the Game",
        category: "tradeoff",
        description: "Evaluates whether decision-makers bear direct consequences of failure.",
        layer: 2,
        requires: ["stakeholder-mapping"],
        prompt: "Examine decision-maker exposure (Nassim Taleb - Skin in the Game): Who bears the downside cost if this decision fails? Uncover conflicts of interest and asymmetric risk allocation."
      },
      {
        id: "resource-cap-analysis",
        icon: "🔋",
        name: "Resource Bandwidth Cap",
        category: "tradeoff",
        description: "Assesses limits of cognitive bandwidth, budget, and operational capacity.",
        layer: 2,
        requires: ["opportunity-cost-audit"],
        prompt: "Evaluate bandwidth and resource limits: Will executing this decision dilute the core focus of the organization or individual? Verify whether sustainable capacity thresholds are breached."
      },
      {
        id: "option-value-pricing",
        icon: "🏷️",
        name: "Option Value Assessment",
        category: "tradeoff",
        description: "Prices the ability to unlock future downstream strategic choices.",
        layer: 2,
        requires: ["expected-value-calc"],
        prompt: "Evaluate whether this decision unlocks future options: Does it trap us on a single rigid path or confer strategic flexibility to pivot later?"
      },
      {
        id: "confirmation-bias-strip",
        icon: "🧹",
        name: "Confirmation Bias Purge",
        category: "biases",
        description: "Eliminates selective filtering of data supporting pre-existing beliefs.",
        layer: 3,
        requires: ["inversion-method"],
        prompt: "Strip confirmation bias: Find the 3 strongest pieces of evidence or arguments proving this decision is WRONG. Explain why this disconfirming evidence was previously ignored."
      },
      {
        id: "sunk-cost-filter",
        icon: "🗑️",
        name: "Sunk Cost Sanitizer",
        category: "biases",
        description: "Isolates decision analysis from non-recoverable past investments.",
        layer: 3,
        requires: ["reversibility-check"],
        prompt: "Completely excise past spent time, money, and emotional energy (Sunk Cost). If you were entering this situation FRESH TODAY, would you make this exact investment?"
      },
      {
        id: "availability-heuristic-check",
        icon: "🧠",
        name: "Availability Bias Check",
        category: "biases",
        description: "Prevents recent or emotionally vivid events from distorting risk estimates.",
        layer: 3,
        requires: ["information-audit"],
        prompt: "Detect if the decision is unduly distorted by a recent, vivid, or memorable event. Verify the statistical representativeness of the underlying sample data."
      },
      {
        id: "survivorship-bias-shield",
        icon: "🛟",
        name: "Survivorship Bias Shield",
        category: "biases",
        description: "Exposes unseen failure data hidden behind success stories.",
        layer: 3,
        requires: ["scenario-planning"],
        prompt: "Ensure focus on success stories does not blind you to the invisible majority of failures (Survivorship Bias). Systematically analyze the unobserved failure graveyard."
      },
      {
        id: "framing-effect-neutralizer",
        icon: "🖼️",
        name: "Framing Effect Neutralizer",
        category: "biases",
        description: "Removes distortions caused by how options or data are phrased.",
        layer: 3,
        requires: ["decision-framing"],
        prompt: "Rewrite the decision prompt neutrally in two contrasting ways—framed around a 90% success rate vs. a 10% failure rate—to eliminate presentation bias."
      },
      {
        id: "groupthink-deconstruct",
        icon: "🗣️",
        name: "Groupthink Deconstruction",
        category: "biases",
        description: "Breaks consensus pressure by enforcing a Devil's Advocate role.",
        layer: 3,
        requires: ["stakeholder-mapping"],
        prompt: "Enforce a formal 'Devil's Advocate' stance against groupthink. Identify the core consensus assumption accepted without challenge and rigorously dismantle it."
      },
      {
        id: "pre-mortem-analysis",
        icon: "💀",
        name: "Pre-Mortem Analysis",
        category: "execution",
        description: "Assumes future catastrophic failure to pre-emptively fix flaws.",
        layer: 3,
        requires: ["second-order-thinking", "confirmation-bias-strip"],
        prompt: "Conduct a Pre-Mortem: Assume it is 2 years in the future and this decision was a CATASTROPHIC FAILURE. Write the autopsy report: What exact root causes led to disaster, and how do we prevent them today?"
      },
      {
        id: "trigger-metrics",
        icon: "🚨",
        name: "Trigger Metrics Protocol",
        category: "execution",
        description: "Sets quantitative early warning indicators to monitor execution.",
        layer: 3,
        requires: ["boundary-conditions"],
        prompt: "Define 3 early warning trigger metrics to monitor during execution. Specify exact threshold numbers that automatically mandate executing Plan B."
      },
      {
        id: "kill-switch-criteria",
        icon: "🛑",
        name: "Kill Switch Criteria",
        category: "execution",
        description: "Establishes non-negotiable conditions for terminating the initiative.",
        layer: 3,
        requires: ["reversibility-check"],
        prompt: "Define unconditional 'Kill Switch' criteria: At what exact threshold of budget overrun, timeline delay, or underperformance will this initiative be terminated immediately?"
      },
      {
        id: "feedback-loop-design",
        icon: "🔁",
        name: "Feedback Loop Architecture",
        category: "execution",
        description: "Establishes systematic post-decision review cadences.",
        layer: 3,
        requires: ["pre-mortem-analysis"],
        prompt: "Design a post-decision feedback loop cadence: Specify metrics to audit at 30, 90, and 180 days, and establish a mechanism to feed learnings back into the engine."
      },
      {
        id: "decision-journaling",
        icon: "📓",
        name: "Decision Journaling",
        category: "execution",
        description: "Captures baseline assumptions and state of mind for future auditing.",
        layer: 3,
        requires: ["decision-framing"],
        prompt: "Complete a Decision Log template capturing baseline assumptions, emotional state, and assessed probabilities at the moment of decision to separate outcome luck from decision quality later."
      },
      {
        id: "post-mortem-review",
        icon: "🔬",
        name: "Post-Mortem Review",
        category: "execution",
        description: "Compares actual results with initial predictions to refine heuristics.",
        layer: 3,
        requires: ["feedback-loop-design"],
        prompt: "Conduct a Post-Mortem evaluation: Measure variance between predicted and actual outcomes. Identify systematic bias or calibration errors in the decision algorithm."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. ACADEMIC (Akademik & Araştırma)
  // ---------------------------------------------------------------------------
  academic: {
    tr: [
      {
        id: "research-question-def",
        icon: "🎯",
        name: "Araştırma Sorusu Tanımı",
        category: "methodology",
        description: "Açık, odaklı, cevabı ampirik olarak verilebilir bir akademik araştırma sorusu kurar.",
        layer: 1,
        requires: [],
        prompt: "Araştırma sorusunu (Research Question) FINER (Feasible, Interesting, Novel, Ethical, Relevant) kriterlerine göre yapılandır. Sorunun sınırlarını belirle ve alt hipotezleri ($H_0, H_1$) türet."
      },
      {
        id: "methodology-triangulation",
        icon: "📐",
        name: "Metodolojik Çaprazlama",
        category: "methodology",
        description: "Veri güvenilirliğini artırmak için çoklu araştırma yöntemlerini harmanlar.",
        layer: 1,
        requires: ["research-question-def"],
        prompt: "Araştırma deseninde Metodolojik Çaprazlama (Triangulation) tasarla: Nicel ve nitel veri toplama tekniklerini nasıl entegre edeceğini ve yöntemler arası sapmaları nasıl dengeleyeceğini açıkla."
      },
      {
        id: "sample-power-analysis",
        icon: "📊",
        name: "Örneklem Güç Analizi",
        category: "methodology",
        description: "İstatistiksel anlamlılık için gerekli minimum örneklem büyüklüğünü hesaplar.",
        layer: 1,
        requires: ["methodology-triangulation"],
        prompt: "Örneklem evrenini ve seçim tekniğini tanımla. İstatistiksel Güç Analizi (Power Analysis - $\\alpha = 0.05, 1-\\beta = 0.80$) için etki büyüklüğü (effect size) varsayımlarını gerekçelendir."
      },
      {
        id: "variable-operationalization",
        icon: "🔬",
        name: "Değişken Operasyonelleştirme",
        category: "methodology",
        description: "Soyut kavramları ölçülebilir bağımsız, bağımlı ve kontrol değişkenlerine dönüştürür.",
        layer: 2,
        requires: ["research-question-def"],
        prompt: "Çalışmadaki tüm konseptleri operasyonel hale getir: Bağımlı, bağımsız, aracı (mediator) ve düzenleyici (moderator) değişkenleri tanımla. Ölçüm ölçeklerini (Likert, sürekli, nominal) belirt."
      },
      {
        id: "quantitative-audit",
        icon: "🔢",
        name: "Nicel Yöntem Denetimi",
        category: "methodology",
        description: "Ekonometrik ve istatistiksel modellerin varsayımsal uygunluğunu denetler.",
        layer: 2,
        requires: ["sample-power-analysis"],
        prompt: "Nicel veri analizi planını denetle: Seçilen istatistiksel testlerin (ANOVA, Regression, SEM) normallik, eşvaryanslılık (homoscedasticity) ve çoklu doğrusallık (multicollinearity) varsayımlarını test et."
      },
      {
        id: "qualitative-rigor-check",
        icon: "🗣️",
        name: "Nitel Titizlik Testi",
        category: "methodology",
        description: "Gömülü teori, fenomenoloji veya içerik analizinde aktarılabilirlik ve güvenilirlik sağlar.",
        layer: 2,
        requires: ["variable-operationalization"],
        prompt: "Nitel metodolojinin titizliğini (Lincoln & Guba kriterleri) doğrula: İnanılırlık (credibility), aktarılabilirlik (transferability), tutarlılık (dependability) ve teyit edilebilirlik (confirmability) protokollerini yaz."
      },
      {
        id: "lit-search-strategy",
        icon: "🔎",
        name: "Literatür Tarama Stratejisi",
        category: "literature",
        description: "Web of Science, Scopus ve PubMed üzerinde sistematik arama dizgileri oluşturur.",
        layer: 1,
        requires: ["research-question-def"],
        prompt: "Sistematik literatür taraması için Boole operatörlü (AND, OR, NOT) arama dizgilerini tasarla. Dahil etme (inclusion) ve hariç tutma (exclusion) kriterlerini PRISMA standartlarına göre yaz."
      },
      {
        id: "lit-gap-identification",
        icon: "🕳️",
        name: "Literatürdeki Boşluk (Gap) Tespiti",
        category: "literature",
        description: "Mevcut akademik birikimdeki çelişki, eksiklik ve incelenmemiş alanları ortaya çıkarır.",
        layer: 2,
        requires: ["lit-search-strategy"],
        prompt: "Mevcut literatürdeki 'Araştırma Boşluğu'nu (Research Gap) tanımla: Bu çalışma metodolojik bir eksikliği mi, çelişkili bulguları mı yoksa yeni bir bağlamı mı adresliyor?"
      },
      {
        id: "seminal-vs-recent-audit",
        icon: "📚",
        name: "Klasik vs. Güncel Literatür Dengesi",
        category: "literature",
        description: "Kök teoriler ile son 3 yıla ait makaleler arasındaki oran dengesini kurar.",
        layer: 2,
        requires: ["lit-search-strategy"],
        prompt: "Atıf matrisini denetle: Çalışmanın temellerini oluşturan temel teorik makaleler (seminal papers) ile son 3 yılda yayımlanan güncel makaleler arasındaki tarihsel dengeyi optimize et."
      },
      {
        id: "theoretical-framework",
        icon: "🏛️",
        name: "Teorik Çerçeve Kurulumu",
        category: "literature",
        description: "Çalışmayı akademik disiplinin ana kuramsal modellerine bağlar.",
        layer: 2,
        requires: ["lit-gap-identification"],
        prompt: "Araştırmanın teorik omurgasını inşa et: Hangi ana kuram(lar) üzerine inşa ediliyor? Teorinin temel kabulleri ile araştırmanın hipotezleri arasındaki mantıksal bağı kur."
      },
      {
        id: "citation-context-check",
        icon: "🔗",
        name: "Atıf Bağlamı Doğrulaması",
        category: "literature",
        description: "Atıf yapılan kaynakların iddiasının doğru aktarılıp aktarılmadığını kontrol eder.",
        layer: 2,
        requires: ["seminal-vs-recent-audit"],
        prompt: "Atıf bağlamı denetimi yap: Metin içinde atıf yapılan makalelerin orijinal bulgularının bağlamından koparılmadan, doğru bir akademik tarafsızlıkla yansıtıldığını doğrula."
      },
      {
        id: "systematic-review-protocol",
        icon: "📋",
        name: "Sistematik Derleme Protokolü",
        category: "literature",
        description: "PRISMA veya Cochrane standartlarında bir derleme mimarisi sunar.",
        layer: 3,
        requires: ["lit-gap-identification"],
        prompt: "PRISMA uyumlu Sistematik Derleme Protokolü yaz: Veri çıkarma formunu, makale seçim akış şemasını ve yayın yanlılığı (publication bias) değerlendirme yöntemini kodla."
      },
      {
        id: "academic-tone-c2",
        icon: "✍️",
        name: "Akademik Dil Elevasyonu (CEFR C2)",
        category: "writing",
        description: "Metni resmi, kesin, tarafsız ve üst düzey akademik terminolojiye yükseltir.",
        layer: 1,
        requires: [],
        prompt: "Metnin dilini CEFR C2 akademik seviyesine yükselt: Gayriresmi ifadeleri, jargon dışı jargonları sil. Pasif ve aktif çatı dengesini kurarak tarafsız ve otoriter bir ton sağla."
      },
      {
        id: "passive-active-balancer",
        icon: "⚖️",
        name: "Etken/Edilgen Çatı Dengesi",
        category: "writing",
        description: "Metodoloji ve bulgular bölümlerinde edat ve çatı kullanımını optimize eder.",
        layer: 2,
        requires: ["academic-tone-c2"],
        prompt: "Metindeki çatı yapısını bölüm standartlarına göre ayarla: Metodolojide edilgen (passive voice) kullanımı korurken, giriş ve tartışma bölümlerinde etken (active voice) odağı artır."
      },
      {
        id: "cohesion-transitional-flow",
        icon: "🌊",
        name: "Metin İçi Mantıksal Akış",
        category: "writing",
        description: "Paragraflar arası akademik geçiş bağlaçları ile akıcılığı sağlar.",
        layer: 2,
        requires: ["academic-tone-c2"],
        prompt: "Paragraf geçişlerini ve mantıksal akışı (Cohesion & Coherence) güçlendir: Fikirler arası nedensellik, karşıtlık ve ekleme bağlaçlarını akademik normlara göre düzenle."
      },
      {
        id: "hedging-claim-calibration",
        icon: "🛡️",
        name: "İddia Kalibrasyonu (Hedging)",
        category: "writing",
        description: "Aşırı kesin ifadeleri ihtiyatlı ve bilimsel üsluba dönüştürür.",
        layer: 2,
        requires: ["academic-tone-c2"],
        prompt: "İddiaların dozajını kalibre et (Hedging): Kesinlik bildiren aşırı genellemeleri (örn. 'kanıtlamıştır', 'kesindir') bilimsel ihtiyat bildiren kalıplara ('veriler işaret etmektedir', 'koşullara bağlı olarak suggest eder') dönüştür."
      },
      {
        id: "abstract-distillation",
        icon: "🧪",
        name: "Özet (Abstract) Distilasyonu",
        category: "writing",
        description: "Özeti IMRaD (Giriş, Yöntem, Bulgular, Tartışma) formatında tam 250 kelimede sıkar.",
        layer: 2,
        requires: ["academic-tone-c2"],
        prompt: "IMRaD yapısına tam uyumlu 200-250 kelimelik Özet yaz: Arka plan (1 cümle), Amaç/Soru (1 cümle), Yöntem (2 cümle), Temel Bulgular (2 cümle), Özgün Katkı/Çıkarım (1 cümle)."
      },
      {
        id: "discussion-implication-craft",
        icon: "💡",
        name: "Tartışma ve Çıkarımlar",
        category: "writing",
        description: "Bulguları teorik ve pratik doğurgularıyla sentezleyen tartışma yazımı.",
        layer: 3,
        requires: ["hedging-claim-calibration"],
        prompt: "Tartışma (Discussion) bölümünü kurgula: Bulguları literatürdeki mevcut çalışmalarla karşılaştır, beklenmeyen sonuçları teorik olarak açıkla ve politika/uygulama çıkarımlarını yaz."
      },
      {
        id: "peer-review-response",
        icon: "📨",
        name: "Hakem Eleştirisi Yanıtı",
        category: "review",
        description: "Hakem yorumlarına profesyonel, yapıcı ve nokta atışı yanıt matrisi hazırlar.",
        layer: 2,
        requires: ["research-question-def"],
        prompt: "Hakem eleştirilerine yanıt matrisi (Response to Reviewers) oluştur: Her bir eleştiriyi alıntıla, verilen yanıtı, yapılan revizyonu ve makaledeki sayfa/satır numarasını tablo halinde yaz."
      },
      {
        id: "reviewer-critique-deconstruct",
        icon: "🔍",
        name: "Hakem Yorumu Ayrıştırma",
        category: "review",
        description: "Sert veya muğlak hakem yorumlarının altındaki metodolojik talebi çözer.",
        layer: 2,
        requires: ["peer-review-response"],
        prompt: "Muğlak veya sert Hakem Yorumunu parçalarına ayır: Hakemin asıl metodolojik veya teorik endişesi nedir? Yanıt verirken savunmacı tondan kaçınıp bilimsel kanıtı öne çıkar."
      },
      {
        id: "counter-argument-fortification",
        icon: "🏰",
        name: "Karşıt Argüman Tahkimatı",
        category: "review",
        description: "Potansiyel hakem itirazlarını makale içine önceden yerleştirir.",
        layer: 3,
        requires: ["reviewer-critique-deconstruct"],
        prompt: "Makaleye yönelik olası 3 majör hakem itirazını öngör ve bu itirazları metnin 'Sınırlılıklar' veya 'Tartışma' bölümünde önceden çürüterek tahkimat sağla."
      },
      {
        id: "major-revision-roadmap",
        icon: "🗺️",
        name: "Majör Revizyon Yol Haritası",
        category: "review",
        description: "Kapsamlı yeniden derleme gerektiren kararlar için adım adım iş planı çıkarır.",
        layer: 3,
        requires: ["peer-review-response"],
        prompt: "Majör Revizyon (Major Revision) kararı için eylem planı oluştur: Yeni veri analizi, literatür eklemeleri ve yeniden yazım adımlarını öncelik ve zaman eksenine oturt."
      },
      {
        id: "editor-letter-drafting",
        icon: "✉️",
        name: "Editör Kapak Yazısı (Cover Letter)",
        category: "review",
        description: "Dergi editörünü çalışmanın özgünlüğü ve uygunluğuna ikna eden mektup.",
        layer: 3,
        requires: ["major-revision-roadmap"],
        prompt: "Dergi Editörüne gönderilecek profesyonel Kapak Yazısı (Cover Letter) taslağı oluştur: Çalışmanın derginin kapsamı ile uyumunu ve literatüre getirdiği yeniliği vurgula."
      },
      {
        id: "double-blind-anonymizer",
        icon: "🎭",
        name: "Çift Kör Anonimleştirme",
        category: "review",
        description: "Metindeki tüm öz atıf ve kimlik ifşa eden unsurları temizler.",
        layer: 1,
        requires: [],
        prompt: "Metni Çift Kör (Double-Blind) hakem değerlendirmesine uygun hale getir: Yazar isimleri, kurum bilgileri, proje fon kodları ve öz-atıf izlerini tamamen anonimleştir."
      },
      {
        id: "statistical-validity-audit",
        icon: "📉",
        name: "İstatistiksel Geçerlilik Denetimi",
        category: "validation",
        description: "Veri analizindeki metodolojik hataları ve varsayım ihlallerini tespit eder.",
        layer: 3,
        requires: ["quantitative-audit"],
        prompt: "İstatistiksel geçerliliği denetle: Tip I ve Tip II hata risklerini, serbestlik derecelerini ve etki büyüklüklerinin ($R^2$, Cohen's $d$) doğru raporlanıp raporlanmadığını tarafsızca incele."
      },
      {
        id: "p-hacking-duster",
        icon: "🧹",
        name: "p-Hacking ve HARKing Temizliği",
        category: "validation",
        description: "Sonuca göre hipotez yazma veya veriyle oynama izlerini engeller.",
        layer: 3,
        requires: ["statistical-validity-audit"],
        prompt: "Çalışmayı p-Hacking ve HARKing (Hypothesizing After Results are Known) risklerine karşı tarafsızca denetle. Hipotezlerin veri toplanmadan önce kurulduğunu ve veri ayıklama olmadığını teyit et."
      },
      {
        id: "construct-validity-check",
        icon: "🧩",
        name: "Yapı Geçerliliği Testi",
        category: "validation",
        description: "Ölçüm araçlarının teorik konsepti ne derece temsil ettiğini doğrular.",
        layer: 2,
        requires: ["variable-operationalization"],
        prompt: "Ölçüm araçlarının Yapı Geçerliliğini (Construct Validity) doğrula: Yakınsak (convergent) ve ayırt edici (discriminant) geçerlilik metriklerini (AVE, CR) analiz et."
      },
      {
        id: "external-validity-bounds",
        icon: "🌐",
        name: "Dış Geçerlilik ve Genellenebilirlik",
        category: "validation",
        description: "Bulguların farklı evren ve bağlamlara aktarılabilirlik sınırlarını koyar.",
        layer: 3,
        requires: ["construct-validity-check"],
        prompt: "Çalışmanın Dış Geçerlilik (External Validity) sınırlarını açıkça koy: Bulgular hangi popülasyon, coğrafya ve zaman dilimi için geçerlidir? Aşırı genellemeleri engelle."
      },
      {
        id: "ethical-board-compliance",
        icon: "⚖️",
        name: "Etik Kurul Uyum Protokolü",
        category: "validation",
        description: "Aydınlatılmış onam, veri gizliliği ve zarar vermeme ilkelerini denetler.",
        layer: 1,
        requires: ["research-question-def"],
        prompt: "Etik Kurul Onay standartlarını kontrol et: İnsan/hayvan denek kullanımı, aydınlatılmış onam (informed consent), KVKK/GDPR uyumu ve veri saklama prosedürlerini doğrula."
      },
      {
        id: "reproducibility-checklist",
        icon: "🔄",
        name: "Tekrarlanabilirlik (Reproducibility) Kontrolü",
        category: "validation",
        description: "Açık bilim standartlarında kod, veri ve analiz protokolü eksiksizliği sağlar.",
        layer: 3,
        requires: ["statistical-validity-audit"],
        prompt: "Tekrarlanabilirlik Kontrol Listesini doldur: Başka bir araştırmacının aynı veri seti ve kodlar (R/Python/Stata) ile birebir aynı sonuçları elde edip edemeyeceğini doğrula."
      }
    ],
    en: [
      {
        id: "research-question-def",
        icon: "🎯",
        name: "Research Question Definition",
        category: "methodology",
        description: "Formulates a clear, focused, and empirically answerable academic research question.",
        layer: 1,
        requires: [],
        prompt: "Structure the primary research question according to FINER criteria (Feasible, Interesting, Novel, Ethical, Relevant). Define exact bounds and derive operational hypotheses ($H_0, H_1$)."
      },
      {
        id: "methodology-triangulation",
        icon: "📐",
        name: "Methodological Triangulation",
        category: "methodology",
        description: "Combines multiple research methods to increase empirical validity.",
        layer: 1,
        requires: ["research-question-def"],
        prompt: "Design methodological triangulation: Explain how quantitative and qualitative data collection techniques will be integrated to offset single-method bias."
      },
      {
        id: "sample-power-analysis",
        icon: "📊",
        name: "Sample Power Analysis",
        category: "methodology",
        description: "Calculates minimum sample size required for statistical significance.",
        layer: 1,
        requires: ["methodology-triangulation"],
        prompt: "Define the sample frame and sampling technique. Justify effect size assumptions for Statistical Power Analysis (e.g., $\\alpha = 0.05, 1-\\beta = 0.80$)."
      },
      {
        id: "variable-operationalization",
        icon: "🔬",
        name: "Variable Operationalization",
        category: "methodology",
        description: "Translates abstract constructs into measurable independent, dependent, and control variables.",
        layer: 2,
        requires: ["research-question-def"],
        prompt: "Operationalize all study constructs: Define dependent, independent, mediating, and moderating variables. Specify exact measurement scales (Likert, continuous, nominal)."
      },
      {
        id: "quantitative-audit",
        icon: "🔢",
        name: "Quantitative Method Audit",
        category: "methodology",
        description: "Audits econometric and statistical models for underlying assumption compliance.",
        layer: 2,
        requires: ["sample-power-analysis"],
        prompt: "Audit the quantitative analysis plan: Verify assumptions of statistical tests (ANOVA, Regression, SEM) including normality, homoscedasticity, and multicollinearity."
      },
      {
        id: "qualitative-rigor-check",
        icon: "🗣️",
        name: "Qualitative Rigor Check",
        category: "methodology",
        description: "Ensures trustworthiness and auditability in grounded theory or qualitative analysis.",
        layer: 2,
        requires: ["variable-operationalization"],
        prompt: "Verify qualitative methodology rigor using Lincoln & Guba standards: Document protocols for credibility, transferability, dependability, and confirmability."
      },
      {
        id: "lit-search-strategy",
        icon: "🔎",
        name: "Literature Search Strategy",
        category: "literature",
        description: "Creates systematic Boolean search strings for Web of Science, Scopus, and PubMed.",
        layer: 1,
        requires: ["research-question-def"],
        prompt: "Construct systematic literature search strings using Boolean operators (AND, OR, NOT). Draft inclusion and exclusion criteria following PRISMA protocols."
      },
      {
        id: "lit-gap-identification",
        icon: "🕳️",
        name: "Literature Gap Identification",
        category: "literature",
        description: "Uncovers contradictions, deficiencies, and unexamined areas in current scholarship.",
        layer: 2,
        requires: ["lit-search-strategy"],
        prompt: "Identify the exact Research Gap in current literature: Specify whether the study addresses a methodological limitation, contradictory findings, or a novel context."
      },
      {
        id: "seminal-vs-recent-audit",
        icon: "📚",
        name: "Seminal vs. Recent Audit",
        category: "literature",
        description: "Balances foundational theoretical papers with recent high-impact publications.",
        layer: 2,
        requires: ["lit-search-strategy"],
        prompt: "Audit the citation matrix: Optimize the balance between foundational theoretical literature (seminal papers) and recent publications from the past 3 years."
      },
      {
        id: "theoretical-framework",
        icon: "🏛️",
        name: "Theoretical Framework Design",
        category: "literature",
        description: "Anchors the study within core disciplinary theoretical paradigms.",
        layer: 2,
        requires: ["lit-gap-identification"],
        prompt: "Build the study's theoretical backbone: Identify the primary theory/theories and articulate the logical link between theoretical premises and proposed hypotheses."
      },
      {
        id: "citation-context-check",
        icon: "🔗",
        name: "Citation Context Verification",
        category: "literature",
        description: "Verifies cited sources are accurately represented without context distortion.",
        layer: 2,
        requires: ["seminal-vs-recent-audit"],
        prompt: "Audit citation contexts: Verify that cited works are accurately represented in their original intent and context without misinterpretation or selective bias."
      },
      {
        id: "systematic-review-protocol",
        icon: "📋",
        name: "Systematic Review Protocol",
        category: "literature",
        description: "Establishes a PRISMA/Cochrane-compliant systematic review architecture.",
        layer: 3,
        requires: ["lit-gap-identification"],
        prompt: "Draft a PRISMA-compliant Systematic Review Protocol: Include data extraction templates, study flow diagrams, and publication bias assessment methods."
      },
      {
        id: "academic-tone-c2",
        icon: "✍️",
        name: "Academic Tone Elevation (CEFR C2)",
        category: "writing",
        description: "Elevates prose to formal, precise, objective, C2-level academic prose.",
        layer: 1,
        requires: [],
        prompt: "Elevate prose to CEFR C2 academic standard: Eliminate informal phrasing and non-standard jargon. Balance passive and active voice to maintain an authoritative, objective tone."
      },
      {
        id: "passive-active-balancer",
        icon: "⚖️",
        name: "Voice & Stance Balancer",
        category: "writing",
        description: "Optimizes active vs. passive voice across paper sections.",
        layer: 2,
        requires: ["academic-tone-c2"],
        prompt: "Calibrate voice across manuscript sections: Maintain objective passive voice in methodology while deploying direct active voice in the introduction and discussion."
      },
      {
        id: "cohesion-transitional-flow",
        icon: "🌊",
        name: "Cohesion & Flow Refiner",
        category: "writing",
        description: "Enhances paragraph transitions and logical discourse markers.",
        layer: 2,
        requires: ["academic-tone-c2"],
        prompt: "Strengthen paragraph cohesion and logical transitions: Refine causal, contrastive, and additive academic discourse markers between key arguments."
      },
      {
        id: "hedging-claim-calibration",
        icon: "🛡️",
        name: "Claim Calibration (Hedging)",
        category: "writing",
        description: "Converts overstatements into epistemically cautious academic claims.",
        layer: 2,
        requires: ["academic-tone-c2"],
        prompt: "Calibrate claim strength (Hedging): Replace categorical overstatements (e.g., 'proves that') with epistemically sound scientific hedging (e.g., 'data suggests that under condition X')."
      },
      {
        id: "abstract-distillation",
        icon: "🧪",
        name: "Abstract Distillation",
        category: "writing",
        description: "Compresses paper essence into a strict 250-word IMRaD abstract.",
        layer: 2,
        requires: ["academic-tone-c2"],
        prompt: "Draft a 200-250 word Abstract strictly adhering to IMRaD format: Background (1 sentence), Objective (1 sentence), Methods (2 sentences), Key Results (2 sentences), Implications (1 sentence)."
      },
      {
        id: "discussion-implication-craft",
        icon: "💡",
        name: "Discussion & Implications",
        category: "writing",
        description: "Synthesizes empirical findings with broader theoretical and practical implications.",
        layer: 3,
        requires: ["hedging-claim-calibration"],
        prompt: "Structure the Discussion section: Contextualize findings against existing literature, provide theoretical explanations for unexpected results, and articulate clear policy/practical implications."
      },
      {
        id: "peer-review-response",
        icon: "📨",
        name: "Peer Review Response Matrix",
        category: "review",
        description: "Constructs a rigorous point-by-point author response matrix.",
        layer: 2,
        requires: ["research-question-def"],
        prompt: "Construct a formal Response to Reviewers matrix: Quote each reviewer comment, articulate the revision rationale, and cite exact page/line numbers where edits were implemented."
      },
      {
        id: "reviewer-critique-deconstruct",
        icon: "🔍",
        name: "Reviewer Critique Deconstruction",
        category: "review",
        description: "Deconstructs harsh or ambiguous reviewer comments into actionable edits.",
        layer: 2,
        requires: ["peer-review-response"],
        prompt: "Deconstruct ambiguous reviewer critiques: Identify the core methodological or theoretical concern beneath harsh language and formulate an objective, evidence-based response."
      },
      {
        id: "counter-argument-fortification",
        icon: "🏰",
        name: "Counter-Argument Fortification",
        category: "review",
        description: "Pre-empts potential referee objections within the text body.",
        layer: 3,
        requires: ["reviewer-critique-deconstruct"],
        prompt: "Anticipate 3 major reviewer objections and pre-emptively address them within the manuscript's Limitations or Discussion section to fortify the argument."
      },
      {
        id: "major-revision-roadmap",
        icon: "🗺️",
        name: "Major Revision Roadmap",
        category: "review",
        description: "Establishes a structured execution roadmap for major manuscript overhauls.",
        layer: 3,
        requires: ["peer-review-response"],
        prompt: "Develop an execution roadmap for a Major Revision decision: Prioritize re-analysis, additional literature integration, and structural rewrites across a strict timeline."
      },
      {
        id: "editor-letter-drafting",
        icon: "✉️",
        name: "Editor Cover Letter Crafting",
        category: "review",
        description: "Drafts a compelling submission cover letter to journal editors.",
        layer: 3,
        requires: ["major-revision-roadmap"],
        prompt: "Draft a professional Journal Cover Letter emphasizing the study's alignment with journal scope, novelty, and broad scientific significance."
      },
      {
        id: "double-blind-anonymizer",
        icon: "🎭",
        name: "Double-Blind Anonymization",
        category: "review",
        description: "Strips all self-citations and identifying metadata for peer review.",
        layer: 1,
        requires: [],
        prompt: "Anonymize the manuscript for double-blind peer review: Strip author names, institutional affiliations, grant funding details, and self-identifying citation markers."
      },
      {
        id: "statistical-validity-audit",
        icon: "📉",
        name: "Statistical Validity Audit",
        category: "validation",
        description: "Audits data analysis for methodological flaws and assumption breaches.",
        layer: 3,
        requires: ["quantitative-audit"],
        prompt: "Audit statistical validity: Evaluate Type I and Type II error risks, degrees of freedom, and verify that effect sizes ($R^2$, Cohen's $d$) are reported completely."
      },
      {
        id: "p-hacking-duster",
        icon: "🧹",
        name: "p-Hacking & HARKing Audit",
        category: "validation",
        description: "Screens analysis for post-hoc hypothesis fitting and data dredging.",
        layer: 3,
        requires: ["statistical-validity-audit"],
        prompt: "Screen the paper for p-hacking and HARKing risks: Verify hypotheses were pre-registered or formulated prior to analysis and confirm absence of selective data trimming."
      },
      {
        id: "construct-validity-check",
        icon: "🧩",
        name: "Construct Validity Test",
        category: "validation",
        description: "Verifies that measurement scales accurately reflect intended theoretical concepts.",
        layer: 2,
        requires: ["variable-operationalization"],
        prompt: "Evaluate Construct Validity: Analyze convergent and discriminant validity metrics (e.g., AVE, composite reliability) to confirm measurement instrument fidelity."
      },
      {
        id: "external-validity-bounds",
        icon: "🌐",
        name: "External Validity & Generalizability",
        category: "validation",
        description: "Defines population and contextual boundaries for findings.",
        layer: 3,
        requires: ["construct-validity-check"],
        prompt: "Define External Validity boundaries: Specify exact population, geographical, and temporal limits for findings to guard against unwarranted generalizations."
      },
      {
        id: "ethical-board-compliance",
        icon: "⚖️",
        name: "Ethical Board Compliance",
        category: "validation",
        description: "Audits protocol compliance with IRB, human subjects, and data privacy norms.",
        layer: 1,
        requires: ["research-question-def"],
        prompt: "Verify IRB ethical compliance: Confirm protocols for human/animal subject consent, data anonymization, and regulatory data privacy (GDPR/IRB) standards."
      },
      {
        id: "reproducibility-checklist",
        icon: "🔄",
        name: "Reproducibility Protocol",
        category: "validation",
        description: "Ensures open science compliance with complete code, data, and protocol specs.",
        layer: 3,
        requires: ["statistical-validity-audit"],
        prompt: "Complete an Open Science Reproducibility Checklist: Confirm that raw data, analysis scripts (R/Python/Stata), and execution logs are fully documented for replication."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. PHILOSOPHY (Felsefe & Etik)
  // ---------------------------------------------------------------------------
  philosophy: {
    tr: [
      {
        id: "fallacy-detector",
        icon: "🔍",
        name: "Safsata Tespit Motoru",
        category: "logic",
        description: "Argümanlardaki kayıtlı mantıksal safsataları (fallacies) tespit eder.",
        layer: 1,
        requires: [],
        prompt: "Metindeki mantıksal safsataları (Ad Hominem, Straw Man, False Dilemma, Begging the Question) tespit et. Her safsatanın çıkarım zincirini nasıl bozduğunu göster."
      },
      {
        id: "syllogism-validator",
        icon: "⚖️",
        name: "Kıyas (Syllogism) Doğrulayıcı",
        category: "logic",
        description: "Tümdenelimsel kıyasların biçimsel geçerliliğini denetler.",
        layer: 1,
        requires: ["fallacy-detector"],
        prompt: "Argümanı standart kıyas yapısına dönüştür: Büyük Öncül, Küçük Öncül ve Sonuç. Çıkarımın biçimsel olarak geçerli (valid) ve içerik olarak doğru (sound) olup olmadığını test et."
      },
      {
        id: "premise-deconstruction",
        icon: "🧩",
        name: "Öncül Ayrıştırma",
        category: "logic",
        description: "Gizli ve söylenmemiş (enthymeme) öncülleri açığa çıkarır.",
        layer: 2,
        requires: ["syllogism-validator"],
        prompt: "Argümanın dayanmakta olduğu gizli/örtük öncülleri (enthymemes) açığa çıkar. Bu gizli kabullerin yanlışlanabilirliğini test et."
      },
      {
        id: "formal-validity-test",
        icon: "📐",
        name: "Sembolik Mantık Testi",
        category: "logic",
        description: "Önermeler mantığı ile ($P \\rightarrow Q$) tutarlılık analizi yapar.",
        layer: 2,
        requires: ["syllogism-validator"],
        prompt: "Argümanı sembolik mantık diline çevir ($P \\rightarrow Q, \\neg Q \\vdash \\neg P$). Modus Ponens veya Modus Tollens kurallarının doğru uygulanıp uygulanmadığını kontrol et."
      },
      {
        id: "informal-fallacy-purge",
        icon: "🧹",
        name: "Kayıt Dışı Safsata Temizliği",
        category: "logic",
        description: "İçeriksel ve retoriksel saptırmaları temizler.",
        layer: 2,
        requires: ["fallacy-detector"],
        prompt: "İçeriksel (informal) safsataları temizle: Yanıltıcı benzetmeleri, otoriteye başvurma (Ad Verecundiam) ve duygusal ajitasyon unsurlarını metinden tamamen süz."
      },
      {
        id: "modal-logic-check",
        icon: "🌌",
        name: "Kipsel (Modal) Mantık Analizi",
        category: "logic",
        description: "Zorunluluk, olasılık ve imkan kavramlarının kurgusunu denetler.",
        layer: 3,
        requires: ["formal-validity-test"],
        prompt: "Kipsel mantık (Modal Logic) süzgecinden geçir: Önermelerin 'zorunlu olarak mı doğru' ($\\Box P$), yoksa 'mümkün dünyalarda mı doğru' ($\\Diamond P$) olduğunu ayrıştır."
      },
      {
        id: "utilitarian-calculus",
        icon: "🧮",
        name: "Faydacı (Utilitarian) Hesaplama",
        category: "ethics",
        description: "Eylemin net mutluluk ve acı bilançosunu ölçer (Jeremy Bentham / J.S. Mill).",
        layer: 1,
        requires: [],
        prompt: "Faydacı etik (Utilitarianism) açısından analiz et: Eylemin tüm etkilenen aktörlerde yaratacağı toplam hazzı ve acıyı (hedonic calculus) kıyasla. Net toplumsal faydayı hesapla."
      },
      {
        id: "deontological-screen",
        icon: "Ö",
        name: "Ödev Etiği (Kantian) Testi",
        category: "ethics",
        description: "Koşulsuz Buyruk (Categorical Imperative) ve evrenselleştirilebilirlik testi.",
        layer: 1,
        requires: [],
        prompt: "Kant'ın Ödev Etiği ve Koşulsuz Buyruk (Categorical Imperative) süzgecini uygula: (a) Bu eylemin maksimi evrensel bir yasa olabilir mi? (b) İnsanlar araç olarak mı, yoksa amaç olarak mı görülüyor?"
      },
      {
        id: "virtue-ethics-audit",
        icon: "🏛️",
        name: "Erdem Etiği Denetimi",
        category: "ethics",
        description: "Eylemin karakter, erdem ve altın orta (Aristoteles) ilkelerine uygunluğunu inceler.",
        layer: 2,
        requires: ["utilitarian-calculus", "deontological-screen"],
        prompt: "Aristotelesçi Erdem Etiği açısından değerlendir: Eylem hangi erdemleri (cesaret, adalet, ölçülülük) sergiliyor? Aşırılık ile eksiklik arasındaki 'Altın Orta' (Golden Mean) nerededir?"
      },
      {
        id: "care-ethics-perspective",
        icon: "🤝",
        name: "Bakım Etiği (Ethics of Care)",
        category: "ethics",
        description: "İlişkiler, bağımlılıklar ve empati odaklı etik yaklaşım getirir.",
        layer: 2,
        requires: ["virtue-ethics-audit"],
        prompt: "Bakım Etiği (Ethics of Care) lensini uygula: Soyut kurallar yerine, karar alanındaki bağımlılık ilişkilerini, kırılgan grupları ve empati sorumluluklarını ön plana çıkar."
      },
      {
        id: "rawlsian-veil-ignorance",
        icon: "🙈",
        name: "Rawlsian Bilgisizlik Peçesi",
        category: "ethics",
        description: "Toplumsal konumunu bilmeden adil düzen tasarlama (John Rawls).",
        layer: 2,
        requires: ["deontological-screen"],
        prompt: "John Rawls'un 'Bilgisizlik Peçesi' (Veil of Ignorance) testini yap: Topluluktaki konumunu (zengin/fakir, güçlü/zayıf) bilmeseydin, bu karar veya kuralı adil kabul eder miydin?"
      },
      {
        id: "ethical-dilemma-resolver",
        icon: "🔀",
        name: "Etik İkilem Çözücü",
        category: "ethics",
        description: "Çatışan etik teoriler arasında karar matrisi kurar.",
        layer: 3,
        requires: ["utilitarian-calculus", "deontological-screen"],
        prompt: "Etik ikilemi çöz: Faydacı sonuçlar ile Deontolojik ilkeler çatıştığında, ortaya çıkan trajik ödünleşmeyi tanımla ve etik gerekçelendirmeyi sun."
      },
      {
        id: "socratic-aporia",
        icon: "🏛️",
        name: "Sokratik Aporia Çıkmazı",
        category: "epistemology",
        description: "Sorgulama ile muhatabı bilgiçlik yanılsamasından çıkarıp aporyaya sokar.",
        layer: 1,
        requires: [],
        prompt: "Sokratik yöntemi uygula: Doğrudan yanıt vermek yerine, muhatabın tanımındaki çelişkileri görünür kılacak 3 ardışık soru sorarak onu 'Aporia' (çıkmaz) durumuna getir."
      },
      {
        id: "justification-trilemma",
        icon: "🔺",
        name: "Münchhausen Trilemması",
        category: "epistemology",
        description: "Bilginin temellendirilmesindeki 3 imkansızlığı (dogmatizm, döngüsellik, sonsuz gerileme) denetler.",
        layer: 2,
        requires: ["socratic-aporia"],
        prompt: "Münchhausen Trilemması denetimi yap: Doğrulama zinciri nereye dayanıyor? (a) Sonsuz gerileme mi (regress)? (b) Döngüsel kanıtlama mı (circularity)? (c) Dogmatik kabullenme mi?"
      },
      {
        id: "radical-skepticism-filter",
        icon: "🤔",
        name: "Radikal Şüphecilik (Cartesian)",
        category: "epistemology",
        description: "Tüm duyu verilerini ve kabulleri Kartezyen şüpheye tabi tutar.",
        layer: 2,
        requires: ["socratic-aporia"],
        prompt: "Descartes'ın Radikal Şüphecilik süzgecini uygula: Bu iddia tamamen yanıltıcı bir duyu verisi veya illüzyon olabilir mi? Şüphe duyulamayacak sarsılmaz çekirdek nedir?"
      },
      {
        id: "empiricism-vs-rationalism",
        icon: "⚖️",
        name: "Ampirizm vs. Rasyonalizm",
        category: "epistemology",
        description: "Bilginin kaynağını (deneyim mi, doğuştan akıl mı) ayrıştırır.",
        layer: 2,
        requires: ["justification-trilemma"],
        prompt: "Bilgi iddiasını ayrıştır: Bu sonuç ampirik gözleme mi (a posteriori) yoksa saf akıl yürütmeye mi (a priori) dayanıyor? İki kaynak arasındaki epistemik uyumsuzlukları bul."
      },
      {
        id: "coherentism-check",
        icon: "🕸️",
        name: "Bağdaşımcılık (Coherentism) Testi",
        category: "epistemology",
        description: "İddianın mevcut inanç ağıyla mantıksal ağ uyumunu doğrula.",
        layer: 3,
        requires: ["justification-trilemma"],
        prompt: "Epistemik Bağdaşımcılık (Coherentism) testi yap: Yeni önerme, önceden kabul edilmiş sarsılmaz inançlar ağıyla mantıksal olarak çelişmeden eklemlenebiliyor mu?"
      },
      {
        id: "epistemic-humility-test",
        icon: "🌾",
        name: "Epistemik Mütevazılık",
        category: "epistemology",
        description: "Cahillik sınırlarını ve bilinemezcilik (agnostisizm) alanlarını haritalandırır.",
        layer: 3,
        requires: ["socratic-aporia"],
        prompt: "Epistemik mütevazılık sınırını çiz: Modellerin ve insan zihninin doğası gereği KESİNLİKLE BİLEMEYECEĞİ alanları tanımla. Cehalet marjinini kabul et."
      },
      {
        id: "ship-of-theseus-paradox",
        icon: "⛵",
        name: "Theseus'un Gemisi Paradoksu",
        category: "thought-experiments",
        description: "Kimlik, süreklilik ve öz kavramlarını sorgulatan düşünce deneyi.",
        layer: 1,
        requires: [],
        prompt: "Theseus'un Gemisi paradoksunu sisteme/kavrama uygula: Bir sistemin tüm parçaları zamanla değiştirildiğinde, o sistem hala 'aynı' sistem midir? Özü (essence) tanımla."
      },
      {
        id: "trolley-problem-variation",
        icon: "🚃",
        name: "Tramvay Problemi Varyasyonları",
        category: "thought-experiments",
        description: "Müdahale etme ile seyirci kalma arasındaki sorumluluk etiği deneyi.",
        layer: 2,
        requires: ["ship-of-theseus-paradox"],
        prompt: "Tramvay Problemi kurgusunu karar problemine uyarla: Edilgen kalarak felakete izin vermek ile aktif müdahale ederek yan hasar yaratmak arasındaki ahlaki sorumluluğu tartış."
      },
      {
        id: "newcomb-paradox-audit",
        icon: "📦",
        name: "Newcomb Paradoksu",
        category: "thought-experiments",
        description: "Özgür irade ile kusursuz öngörü arasındaki karar teorisi paradoksu.",
        layer: 2,
        requires: ["ship-of-theseus-paradox"],
        prompt: "Newcomb Paradoksu analizi yap: Karar alıcının seçimi deterministik bir öngörü algoritmasıyla çakıştığında; baskın strateji mi yoksa beklenen fayda mı seçilmeli?"
      },
      {
        id: "prisoner-dilemma-matrix",
        icon: "🚔",
        name: "Mahkum İkilemi ve Oyun Teorisi",
        category: "thought-experiments",
        description: "Bireysel rasyonellik ile kolektif çıkar çatışması deneyi.",
        layer: 2,
        requires: ["trolley-problem-variation"],
        prompt: "Mahkum İkilemi (Prisoner's Dilemma) matrisini kur: Aktörlerin bencil rasyonelliği nasıl kolektif felakete (Nash Dengesi) yol açıyor? İtiraf/İşbirliği dinamiklerini göster."
      },
      {
        id: "experience-machine-test",
        icon: "🔌",
        name: "Deneyim Makinesi (Nozick)",
        category: "thought-experiments",
        description: "Simüle edilmiş mutluluk ile gerçeklik arasındaki değer tercihi.",
        layer: 3,
        requires: ["trolley-problem-variation"],
        prompt: "Robert Nozick'in Deneyim Makinesi testini uygula: Sahte fakat kusursuz bir simülasyon mu, yoksa acı dolu ama gerçek bir deneyim mi? Gerçekliğin özsel değerini sorgula."
      },
      {
        id: "mary-color-scientist",
        icon: "🎨",
        name: "Meryem'in Odası (Qualia)",
        category: "thought-experiments",
        description: "Fiziksel bilgi ile öznel deneyim (Qualia) arasındaki fark.",
        layer: 3,
        requires: ["ship-of-theseus-paradox"],
        prompt: "Frank Jackson'ın 'Meryem Odası' düşünce deneyini uygula: Te Teorik/fiziksel bilgi, birinci şahıs öznel deneyimin (Qualia) yerini tutabilir mi? Bilgi eksikliğini saptar."
      },
      {
        id: "dialectic-synthesis",
        icon: "☯️",
        name: "Hegelci Diyalektik Sentez",
        category: "critique",
        description: "Tez ve antitezi daha üst bir sentezde (Aufhebung) birleştirir.",
        layer: 2,
        requires: ["premise-deconstruction"],
        prompt: "Hegelci Diyalektik metodu uygula: (a) Tez iddialarını sun. (b) Antitez zıtlıklarını çıkar. (c) Her ikisini de aşan ve kapsayan üst düzey Sentezi (Aufhebung) inşa et."
      },
      {
        id: "steelman-construction",
        icon: "🛡️",
        name: "Steelman (En Güçlü Karşıtlık)",
        category: "critique",
        description: "Karşı tarafın argümanını zayıflatmak yerine olabilecek en güçlü haliyle kurar.",
        layer: 2,
        requires: ["dialectic-synthesis"],
        prompt: "Karşıt argümanı 'Steelman' tekniğiyle yeniden inşa et: Karşı tarafın savunmasını onun bile yapamadığı kadar güçlü, tutarlı ve sarsılmaz bir mantıkla yeniden yaz, sonra eleştir."
      },
      {
        id: "immanent-critique",
        icon: "🔬",
        name: "İçsel Eleştiri (Immanent Critique)",
        category: "critique",
        description: "Sistemi dışarıdan değil, kendi kendi koyduğu kurallarla içeriden vurur.",
        layer: 3,
        requires: ["steelman-construction"],
        prompt: "İçsel Eleştiri (Immanent Critique) yap: Metni dış değerlerle değil, sistemin kendi kabul ettiği temel ilkelere sadık kalarak, kendi içindeki çelişkileri üzerinden çürüt."
      },
      {
        id: "genealogy-deconstruction",
        icon: "📜",
        name: "Soybilimsel (Foucault/Nietzsche) Dekonstrüksiyon",
        category: "critique",
        description: "Kavramların tarihsel ve iktidar odaklı kökenlerini açığa çıkarır.",
        layer: 3,
        requires: ["immanent-critique"],
        prompt: "Kavramın Soybilimsel (Genealogical) dekonstrüksiyonunu yap: 'Evrensel ve doğal' sanılan bu kavram hangi tarihsel güç mücadelelerinin ve iktidar ilişkilerinin ürünüdür?"
      },
      {
        id: "paradigm-shift-detector",
        icon: "💥",
        name: "Paradigma Değişimi (Kuhn)",
        category: "critique",
        description: "Mevcut modelin çözemediği anomalileri tespit ederek paradigma değişimini öngörür.",
        layer: 3,
        requires: ["dialectic-synthesis"],
        prompt: "Thomas Kuhn'un Paradigma Değişimi modelini uygula: Mevcut düşünce modelinin halı altına süpürdüğü anomalileri bir araya getir ve devrimsel paradigma kırılmasını tanımla."
      },
      {
        id: "metaphysical-presupposition",
        icon: "🌌",
        name: "Metafizik Önkabuller Denetimi",
        category: "critique",
        description: "Varoluş, zaman ve nedensellik hakkındaki temel metafiziksel kabulleri sorgular.",
        layer: 3,
        requires: ["premise-deconstruction"],
        prompt: "Düşüncenin temelindeki Metafizik Önkabulleri (Varsayılan ontoloji, nedensellik modeli, zaman algısı) sorgula. Bu kabuller değişirse sonuç nasıl değişir?"
      }
    ],
    en: [
      {
        id: "fallacy-detector",
        icon: "🔍",
        name: "Logical Fallacy Detector",
        category: "logic",
        description: "Identifies formal and informal logic fallacies within arguments.",
        layer: 1,
        requires: [],
        prompt: "Detect logical fallacies in the text (Ad Hominem, Straw Man, False Dilemma, Begging the Question). Show precisely how each breaks the deductive chain."
      },
      {
        id: "syllogism-validator",
        icon: "⚖️",
        name: "Syllogism Validator",
        category: "logic",
        description: "Audits formal validity and soundness of deductive syllogisms.",
        layer: 1,
        requires: ["fallacy-detector"],
        prompt: "Reconstruct the argument into standard syllogistic form: Major Premise, Minor Premise, and Conclusion. Test whether inference is formally valid and sound."
      },
      {
        id: "premise-deconstruction",
        icon: "🧩",
        name: "Premise Deconstruction",
        category: "logic",
        description: "Exposes unstated hidden premises and implicit enthymemes.",
        layer: 2,
        requires: ["syllogism-validator"],
        prompt: "Expose hidden/implicit premises (enthymemes) underpinning the argument. Rigorously test the falsifiability of these unstated assumptions."
      },
      {
        id: "formal-validity-test",
        icon: "📐",
        name: "Symbolic Logic Test",
        category: "logic",
        description: "Performs formal propositional logic checks ($P \\rightarrow Q$).",
        layer: 2,
        requires: ["syllogism-validator"],
        prompt: "Translate argument into symbolic propositional logic ($P \\rightarrow Q, \\neg Q \\vdash \\neg P$). Verify valid application of inference rules like Modus Ponens or Modus Tollens."
      },
      {
        id: "informal-fallacy-purge",
        icon: "🧹",
        name: "Informal Fallacy Purge",
        category: "logic",
        description: "Strips semantic distortions, false equivalences, and rhetorical ploys.",
        layer: 2,
        requires: ["fallacy-detector"],
        prompt: "Purge informal fallacies: Strip misleading analogies, appeals to false authority (Ad Verecundiam), and emotional manipulation markers from prose."
      },
      {
        id: "modal-logic-check",
        icon: "🌌",
        name: "Modal Logic Audit",
        category: "logic",
        description: "Evaluates propositions across dimensions of necessity and possibility.",
        layer: 3,
        requires: ["formal-validity-test"],
        prompt: "Evaluate through Modal Logic: Distinguish whether propositions hold as necessary truths ($\\Box P$) or merely contingent truths across possible worlds ($\\Diamond P$)."
      },
      {
        id: "utilitarian-calculus",
        icon: "🧮",
        name: "Utilitarian Hedonic Calculus",
        category: "ethics",
        description: "Measures net aggregate pleasure versus pain across affected populations.",
        layer: 1,
        requires: [],
        prompt: "Analyze via Utilitarian Ethics (Bentham/Mill): Quantify total pleasure and pain generated across all affected actors (hedonic calculus). Compute net social utility."
      },
      {
        id: "deontological-screen",
        icon: "Ö",
        name: "Kantian Deontological Screen",
        category: "ethics",
        description: "Tests actions against the Categorical Imperative and universalizability.",
        layer: 1,
        requires: [],
        prompt: "Apply Kantian Deontology and Categorical Imperative tests: (a) Can the underlying maxim be willed as a universal law? (b) Are humans treated as ends or merely as means?"
      },
      {
        id: "virtue-ethics-audit",
        icon: "🏛️",
        name: "Virtue Ethics Audit",
        category: "ethics",
        description: "Evaluates moral character traits and Aristotelian Golden Mean alignment.",
        layer: 2,
        requires: ["utilitarian-calculus", "deontological-screen"],
        prompt: "Evaluate via Aristotelian Virtue Ethics: What character virtues (courage, temperance, justice) are expressed? Identify the 'Golden Mean' between deficiency and excess."
      },
      {
        id: "care-ethics-perspective",
        icon: "🤝",
        name: "Ethics of Care Analysis",
        category: "ethics",
        description: "Focuses on relational duties, interdependence, and vulnerability.",
        layer: 2,
        requires: ["virtue-ethics-audit"],
        prompt: "Apply an Ethics of Care framework: Foreground relational interdependencies, vulnerable groups, and empathetic responsibilities over abstract rules."
      },
      {
        id: "rawlsian-veil-ignorance",
        icon: "🙈",
        name: "Rawlsian Veil of Ignorance",
        category: "ethics",
        description: "Evaluates justice by stripping knowledge of personal societal status.",
        layer: 2,
        requires: ["deontological-screen"],
        prompt: "Apply John Rawls's 'Veil of Ignorance' test: Would you accept this decision or rule as fair if you had no knowledge of your personal status or place in society?"
      },
      {
        id: "ethical-dilemma-resolver",
        icon: "🔀",
        name: "Ethical Dilemma Resolution",
        category: "ethics",
        description: "Resolves irreconcilable trade-offs between competing normative frameworks.",
        layer: 3,
        requires: ["utilitarian-calculus", "deontological-screen"],
        prompt: "Resolve the ethical dilemma: Where Utilitarian outcomes conflict with Deontological duties, articulate the tragic trade-off and provide a principled resolution."
      },
      {
        id: "socratic-aporia",
        icon: "🏛️",
        name: "Socratic Aporia Engine",
        category: "epistemology",
        description: "Drives interlocutors into productive epistemic perplexity via dialectic questioning.",
        layer: 1,
        requires: [],
        prompt: "Deploy the Socratic Method: Ask 3 consecutive probing questions exposing internal contradictions in definitions to guide the user into productive 'Aporia'."
      },
      {
        id: "justification-trilemma",
        icon: "🔺",
        name: "Münchhausen Trilemma",
        category: "epistemology",
        description: "Exposes ultimate justification limits: infinite regress, circularity, or dogmatism.",
        layer: 2,
        requires: ["socratic-aporia"],
        prompt: "Audit via Münchhausen Trilemma: Where does the chain of justification stop? (a) Infinite regress? (b) Circular reasoning? (c) Dogmatic axiomatic assumption?"
      },
      {
        id: "radical-skepticism-filter",
        icon: "🤔",
        name: "Cartesian Radical Skepticism",
        category: "epistemology",
        description: "Subjects all sensory data and assumptions to methodical doubt.",
        layer: 2,
        requires: ["socratic-aporia"],
        prompt: "Apply Cartesian Radical Skepticism: Could this claim be an artifact of sensory deception or systemic illusion? Identify the indubitable core remaining."
      },
      {
        id: "empiricism-vs-rationalism",
        icon: "⚖️",
        name: "Empiricism vs. Rationalism",
        category: "epistemology",
        description: "Separates claims grounded in sensory experience versus pure a priori reasoning.",
        layer: 2,
        requires: ["justification-trilemma"],
        prompt: "Dissect knowledge sources: Is the conclusion derived a posteriori (sensory observation) or a priori (pure reason)? Uncover epistemic friction between the two."
      },
      {
        id: "coherentism-check",
        icon: "🕸️",
        name: "Epistemic Coherentism Test",
        category: "epistemology",
        description: "Verifies how seamlessly claims integrate into web of belief networks.",
        layer: 3,
        requires: ["justification-trilemma"],
        prompt: "Conduct an Epistemic Coherentism check: Does the proposition mesh consistently into the existing web of justified beliefs without generating logical friction?"
      },
      {
        id: "epistemic-humility-test",
        icon: "🌾",
        name: "Epistemic Humility Audit",
        category: "epistemology",
        description: "Maps the absolute limits of human knowability and model bounds.",
        layer: 3,
        requires: ["socratic-aporia"],
        prompt: "Enforce epistemic humility: Define domain areas that are fundamentally UNKNOWABLE due to cognitive or model limits. Explicitly bound the margin of ignorance."
      },
      {
        id: "ship-of-theseus-paradox",
        icon: "⛵",
        name: "Ship of Theseus Paradox",
        category: "thought-experiments",
        description: "Examines identity, persistence, and essence through continuous replacement.",
        layer: 1,
        requires: [],
        prompt: "Apply the Ship of Theseus paradox: If all component parts of a system are replaced over time, does numerical identity persist? Define its true essence."
      },
      {
        id: "trolley-problem-variation",
        icon: "🚃",
        name: "Trolley Problem Dynamics",
        category: "thought-experiments",
        description: "Explores active intervention versus passive omission moral responsibility.",
        layer: 2,
        requires: ["ship-of-theseus-paradox"],
        prompt: "Adapt the Trolley Problem: Analyze moral culpability in allowing disaster through passive omission versus actively intervening and creating collateral harm."
      },
      {
        id: "newcomb-paradox-audit",
        icon: "📦",
        name: "Newcomb's Paradox Audit",
        category: "thought-experiments",
        description: "Explores decision theory tension between dominant choice and expected utility.",
        layer: 2,
        requires: ["ship-of-theseus-paradox"],
        prompt: "Analyze via Newcomb's Paradox: When individual choice conflicts with a predictive algorithm, should one optimize for dominance strategy or expected utility?"
      },
      {
        id: "prisoner-dilemma-matrix",
        icon: "🚔",
        name: "Prisoner's Dilemma Matrix",
        category: "thought-experiments",
        description: "Models conflict between individual rationality and collective welfare.",
        layer: 2,
        requires: ["trolley-problem-variation"],
        prompt: "Construct a Prisoner's Dilemma matrix: Show how rational individual self-interest leads to collective sub-optimal outcomes (Nash Equilibrium)."
      },
      {
        id: "experience-machine-test",
        icon: "🔌",
        name: "Nozick's Experience Machine",
        category: "thought-experiments",
        description: "Tests preference for genuine reality over simulated hedonism.",
        layer: 3,
        requires: ["trolley-problem-variation"],
        prompt: "Apply Nozick's Experience Machine thought experiment: Contrast perfect simulated pleasure against authentic but flawed reality. Evaluate the intrinsic value of truth."
      },
      {
        id: "mary-color-scientist",
        icon: "🎨",
        name: "Mary the Color Scientist (Qualia)",
        category: "thought-experiments",
        description: "Explores the gap between physical information and subjective qualia.",
        layer: 3,
        requires: ["ship-of-theseus-paradox"],
        prompt: "Apply Jackson's 'Mary's Room' thought experiment: Determine if complete physical knowledge accounts for subjective first-person experience (Qualia)."
      },
      {
        id: "dialectic-synthesis",
        icon: "☯️",
        name: "Hegelian Dialectic Synthesis",
        category: "critique",
        description: "Reconciles thesis and antithesis into a higher-order synthesis (Aufhebung).",
        layer: 2,
        requires: ["premise-deconstruction"],
        prompt: "Execute Hegelian Dialectic: (a) Formulate the Thesis. (b) Derive the opposing Antithesis. (c) Construct the higher-level Synthesis (Aufhebung) preserving truths of both."
      },
      {
        id: "steelman-construction",
        icon: "🛡️",
        name: "Steelman Construction",
        category: "critique",
        description: "Rebuilds opposition arguments into their most formidable form.",
        layer: 2,
        requires: ["dialectic-synthesis"],
        prompt: "Construct a 'Steelman' of the opposing view: Rebuild the counter-argument in its most logical, unassailable form before offering critique."
      },
      {
        id: "immanent-critique",
        icon: "🔬",
        name: "Immanent Critique",
        category: "critique",
        description: "Critiques a system internally using its own premises and values.",
        layer: 3,
        requires: ["steelman-construction"],
        prompt: "Perform Immanent Critique: Evaluate the text strictly through its own stated axioms and internal logic, exposing self-contradictions from within."
      },
      {
        id: "genealogy-deconstruction",
        icon: "📜",
        name: "Genealogical Deconstruction",
        category: "critique",
        description: "Uncovers historical power dynamics shaping foundational concepts.",
        layer: 3,
        requires: ["immanent-critique"],
        prompt: "Execute a Foucault/Nietzsche Genealogical Deconstruction: Uncover what power struggles and historical contingencies generated concepts assumed to be 'natural'."
      },
      {
        id: "paradigm-shift-detector",
        icon: "💥",
        name: "Kuhnian Paradigm Shift",
        category: "critique",
        description: "Identifies accumulated anomalies signaling an impending paradigm shift.",
        layer: 3,
        requires: ["dialectic-synthesis"],
        prompt: "Apply Thomas Kuhn's Paradigm Shift framework: Aggregate anomalies ignored by the dominant paradigm and characterize the emerging revolutionary shift."
      },
      {
        id: "metaphysical-presupposition",
        icon: "🌌",
        name: "Metaphysical Presupposition Audit",
        category: "critique",
        description: "Interrogates underlying assumptions regarding existence, causality, and time.",
        layer: 3,
        requires: ["premise-deconstruction"],
        prompt: "Interrogate foundational Metaphysical Presuppositions (ontology, causality model, nature of time). Demonstrate how altering these axioms changes the conclusion."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 4. PROBLEMSOLVING (Yaratıcı Problem Çözme & TRIZ)
  // ---------------------------------------------------------------------------
  problemsolving: {
    tr: [
      {
        id: "root-cause-5-whys",
        icon: "🕵️",
        name: "Kök Neden (5 Neden) Analizi",
        category: "deconstruction",
        description: "Yüzeysel semptomların ötesine geçip sorunun kök nedenine iner.",
        layer: 1,
        requires: [],
        prompt: "5 Neden (5 Whys) tekniğini uygula: Probleme 'Neden?' sorusunu ardışık 5 kez sorarak semptomları soyup kök nedene (root cause) ulaş."
      },
      {
        id: "problem-boundary-def",
        icon: "🎯",
        name: "Problem Sınır Tespiti",
        category: "deconstruction",
        description: "Neyin problem dahilinde, neyin dışında olduğunu netleştirir.",
        layer: 1,
        requires: ["root-cause-5-whys"],
        prompt: "Problemin sınırlarını çiz (In-Scope / Out-of-Scope): Neyi çözmeye çalışıyoruz, neyi kesinlikle çözmeye çalışmıyoruz? Kapsam kaymasını önle."
      },
      {
        id: "functional-analysis",
        icon: "⚙️",
        name: "Fonksiyonel Sistem Analizi",
        category: "deconstruction",
        description: "Sistemi bileşenlerine ve fonksiyonel ilişkilerine ayırır.",
        layer: 2,
        requires: ["problem-boundary-def"],
        prompt: "Sistemin Fonksiyonel Analizini yap: Bileşenleri 'Özne - Eylem - Nesne' olarak ayrıştır. Hangi fonksiyon yetersiz, hangisi aşırı, hangisi zararlı?"
      },
      {
        id: "constraint-mapping",
        icon: "🧱",
        name: "Kısıt Haritalama (TOC)",
        category: "deconstruction",
        description: "Goldratt Kısıtlar Teorisi ile sistemi yavaşlatan darboğazı bulur.",
        layer: 2,
        requires: ["problem-boundary-def"],
        prompt: "Kısıtlar Teorisini (Theory of Constraints) uygula: Tüm sistemin akış hızını sınırlayan TEK ana darboğazı (bottleneck) tespit et ve ona odaklan."
      },
      {
        id: "issue-tree-breakdown",
        icon: "🌳",
        name: "Sorun Ağacı (MECE) Ayrıştırma",
        category: "deconstruction",
        description: "Problemi karşılıklı ayrışık, toplamda kapsayıcı alt parçalara böler.",
        layer: 2,
        requires: ["root-cause-5-whys"],
        prompt: "Problemi MECE (Mutually Exclusive, Collectively Exhaustive) prensibiyle bir Sorun Ağacına (Issue Tree) böl. Hiçbir alt nedeni çakıştırma ve açık bırakma."
      },
      {
        id: "system-component-map",
        icon: "🗺️",
        name: "Sistem Bileşen Haritası",
        category: "deconstruction",
        description: "Alt sistemler ve çevre etkileşimlerini haritalandırır.",
        layer: 2,
        requires: ["functional-analysis"],
        prompt: "Sistemin üst sistem (supersystem), mevcut sistem ve alt sistem (subsystem) düzeylerindeki bileşenler arası malzeme, enerji ve bilgi akışlarını haritalandır."
      },
      {
        id: "triz-contradiction-matrix",
        icon: "⚡",
        name: "TRIZ Çelişki Matrisi",
        category: "triz",
        description: "İki parametre arasındaki teknik veya fiziksel çelişkiyi çözer.",
        layer: 2,
        requires: ["functional-analysis"],
        prompt: "TRIZ Çelişki Matrisini uygula: İyileştirilmek istenen parametre (örn: Hız) ile bozulan parametre (örn: Ağırlık) arasındaki çelişkiyi tanımla ve TRIZ'in 40 İnovasyon İlkesinden uygun olanları seç."
      },
      {
        id: "triz-ideality-operator",
        icon: "✨",
        name: "TRIZ İdeal Nihai Sonuç (IFR)",
        category: "triz",
        description: "Sistem karmaşıklığını ve maliyetini sıfırlayarak ideal çözüme ulaşır.",
        layer: 2,
        requires: ["triz-contradiction-matrix"],
        prompt: "İdeal Nihai Sonucu (Ideal Final Result - IFR) tanımla: Sistem veya mekanizma karmaşıklık, maliyet ve alan eklemeden fonksiyonu KENDİ KENDİNE nasıl yerine getirebilir?"
      },
      {
        id: "triz-resource-inventory",
        icon: "🎒",
        name: "TRIZ Kaynak Envanteri",
        category: "triz",
        description: "Sistemde ve çevrede atıl duran gizli kaynakları keşfeder.",
        layer: 2,
        requires: ["triz-ideality-operator"],
        prompt: "TRIZ Kaynak Analizi yap: Çevredeki atık ısı, yerçekimi, alan, zaman veya malzeme gibi ÜCRETSİZ ve GİZLİ kaynakları çözüme nasıl dahil edebilirsin?"
      },
      {
        id: "triz-substance-field",
        icon: "🧲",
        name: "TRIZ Madde-Alan (Su-Field) Analizi",
        category: "triz",
        description: "İki madde ve bir alan arasındaki etkileşimi modelleyip iyileştirir.",
        layer: 3,
        requires: ["triz-contradiction-matrix"],
        prompt: "Madde-Alan (Su-Field) Analizi yap: Problemi $S_1$ (Madde 1), $S_2$ (Madde 2) ve $F$ (Alan) olarak modelle. Zararlı veya yetersiz etkileşimi ortadan kaldıracak yeni bir alan ekle."
      },
      {
        id: "triz-evolution-lines",
        icon: "📈",
        name: "TRIZ Sistem Evrim Eğrileri",
        category: "triz",
        description: "Teknolojinin evrimleşme kalıplarına (S-Eğrisi) göre geleceği öngörür.",
        layer: 3,
        requires: ["triz-ideality-operator"],
        prompt: "Teknolojik sistemin Evrim Eğrilerini (Lines of System Evolution) incele: Sistem şu an S-Eğrisinin neresinde? Esnekliğe, dinamizme veya mikro-seviyeye geçiş adımını belirle."
      },
      {
        id: "triz-su-field-analysis",
        icon: "🌀",
        name: "TRIZ Standart Çözümler",
        category: "triz",
        description: "TRIZ'in 76 standart çözüm kalıbını probleme uygular.",
        layer: 3,
        requires: ["triz-substance-field"],
        prompt: "TRIZ'in 76 Standart Çözümünden en uygun 3 tanesini seçip sisteme entegre et: Madde ekleme/çıkarma, alan dönüştürme veya aşama değiştirme ilkelerini dene."
      },
      {
        id: "de-bono-6-hats",
        icon: "🎩",
        name: "de Bono 6 Düşünme Şapkası",
        category: "lateral",
        description: "Probleme altı farklı duygusal ve rasyonel açıdan bakar.",
        layer: 1,
        requires: [],
        prompt: "6 Düşünme Şapkasını sırayla giy: Beyaz (Veri), Kırmızı (Duygu), Siyah (Risk), Sarı (Fayda), Yeşil (Yaratıcılık), Mavi (Süreç Yönetimi). Her şapka altındaki çıktıları ayrıştır."
      },
      {
        id: "random-word-stimulus",
        icon: "🎲",
        name: "Rastgele Sözcük / Uyarıcı",
        category: "lateral",
        description: "Zihni alışılmış düşünme kalıplarından çıkarmak için rastgele bağlantı kurar.",
        layer: 2,
        requires: ["de-bono-6-hats"],
        prompt: "Rastgele Uyarıcı (Random Entry) tekniği uygula: Problemle alakası olmayan rastgele bir nesne/sözcük seç ve bu sözcüğün özelliklerini problem alanına zorla bağlayarak radikal fikir üret."
      },
      {
        id: "provocation-po",
        icon: "💥",
        name: "Provokasyon (PO) Tekniği",
        category: "lateral",
        description: "Absürt ve mantıksız durumlar hayal ederek yeni fikir kanalları açar.",
        layer: 2,
        requires: ["de-bono-6-hats"],
        prompt: "Provokasyon (PO) cümlesi kur: Gerçekliği tamamen sarsan absürt bir mantık dışı iddia ortaya at (Örn: 'Arabanın tekerlekleri kare olsun'). Bu provokasyondan kaçış köprüsü (stepping stone) kurarak pratik fikir üret."
      },
      {
        id: "analogical-transfer",
        icon: "🧬",
        name: "Biyotaklit ve Biyoloji Analojisi",
        category: "lateral",
        description: "Doğadaki ve farklı disiplinlerdeki çözümleri probleme uyarlar.",
        layer: 2,
        requires: ["de-bono-6-hats"],
        prompt: "Biyotaklit (Biomimicry) veya disiplinler arası analoji kur: Doğadaki hangi canlı veya mekanizma bu problemi evrimsel süreçte zaten çözdü? Çözümü sisteme transfer et."
      },
      {
        id: "perspective-reversal",
        icon: "🔄",
        name: "Perspektif Tersine Çevirme",
        category: "lateral",
        description: "Problemi rakibin, müşterinin veya nesnenin gözünden görür.",
        layer: 2,
        requires: ["de-bono-6-hats"],
        prompt: "Perspektif Değiştir: Problemi çözülmek istenen NESNENİN veya RAKİBİN gözünden birinci şahıs diliyle anlat ('Ben bir veri paketiyim ve...' veya 'Ben bu sistemim ve...')."
      },
      {
        id: "cross-domain-pollination",
        icon: "🐝",
        name: "Çapraz Disiplin Tozlaşması",
        category: "lateral",
        description: "Tamamen farklı bir sektördeki çözüm mimarisini probleme uyarlar.",
        layer: 3,
        requires: ["analogical-transfer"],
        prompt: "Çapraz Disiplin Tozlaşması yap: Problemi uzay havacılığı, derin deniz biyolojisi veya video oyunu tasarımı ilkeleriyle yeniden çözmeyi dene."
      },
      {
        id: "scamper-substitute",
        icon: "🔄",
        name: "SCAMPER - Substitute (Yer Değiştir)",
        category: "scamper",
        description: "Malzeme, insan veya süreç bileşenlerini yenileriyle değiştirir.",
        layer: 1,
        requires: [],
        prompt: "SCAMPER - Substitute (Yer Değiştir): Bu sistemde kullanılan malzemeleri, insanları, adımları veya enerji kaynağını ne ile değiştirebilirsin?"
      },
      {
        id: "scamper-combine-adapt",
        icon: "🧩",
        name: "SCAMPER - Combine & Adapt (Birleştir & Uyarla)",
        category: "scamper",
        description: "Farklı fonksiyonları birleştirir ve dış çözümleri uyarlar.",
        layer: 1,
        requires: ["scamper-substitute"],
        prompt: "SCAMPER - Combine & Adapt: Başka hangi ürün, hizmet veya süreci bu sistemle birleştirebilirsin? Başka bir alandaki çözümü buraya nasıl uyarlarsın?"
      },
      {
        id: "scamper-modify-magnify",
        icon: "🔍",
        name: "SCAMPER - Modify & Magnify (Değiştir & Büyüt)",
        category: "scamper",
        description: "Bileşenlerin boyutunu, frekansını veya önemini abartır/küçültür.",
        layer: 2,
        requires: ["scamper-combine-adapt"],
        prompt: "SCAMPER - Modify/Magnify/Minify: Sistemin bir özelliğini 100 kat büyütürsen veya tamamen mikron seviyesine küçültürsen ne olur?"
      },
      {
        id: "scamper-put-other-use",
        icon: "♻️",
        name: "SCAMPER - Put to Other Use (Başka Amaçla Kullan)",
        category: "scamper",
        description: "Atıkları veya mevcut sistemi farklı bir pazarda/işlevde değerlendirir.",
        layer: 2,
        requires: ["scamper-modify-magnify"],
        prompt: "SCAMPER - Put to Other Use: Bu sistem veya onun ürettiği atık çıktılar tamamen farklı bir sektörde veya pazar segmentinde ne amaçla kullanılabilir?"
      },
      {
        id: "scamper-eliminate-reverse",
        icon: "✂️",
        name: "SCAMPER - Eliminate & Reverse (Yok Et & Ters Çevir)",
        category: "scamper",
        description: "Gereksiz parçaları çıkarır ve adımların sırasını tersine çevirir.",
        layer: 2,
        requires: ["scamper-put-other-use"],
        prompt: "SCAMPER - Eliminate & Rearrange: Sistemin en karmaşık görünen adımını tamamen SİL. Sıralamayı tam tersine çevirirsen ne gerçekleşir?"
      },
      {
        id: "scamper-full-matrix",
        icon: "🎛️",
        name: "SCAMPER Tam Operatör Matrisi",
        category: "scamper",
        description: "Tüm SCAMPER adımlarını tek bir fikir üretme matrisinde birleştirir.",
        layer: 3,
        requires: ["scamper-eliminate-reverse"],
        prompt: "Tüm SCAMPER operatörlerini kapsayan 7 maddelik yenilikçi fikir matrisini üret ve en radikal 3 fikri filtrele."
      },
      {
        id: "morphological-matrix",
        icon: "📊",
        name: "Morfolojik Analiz Matrisi",
        category: "evaluation",
        description: "Parametreler ve seçenekler matrisinden yeni konfigürasyonlar türetir.",
        layer: 2,
        requires: ["issue-tree-breakdown"],
        prompt: "Morfolojik Analiz Matrisi oluştur: Sistemin boyutlarını (Eksenler) ve her boyutun alt seçeneklerini yaz. Seçenekleri rastgele kombinleyerek beklenmedik çözümler türet."
      },
      {
        id: "solution-feasibility-grid",
        icon: "🎯",
        name: "Çözüm Uygulanabilirlik Matrisi",
        category: "evaluation",
        description: "Fikirleri Etki, Maliyet ve Süre açısından puanlar.",
        layer: 2,
        requires: ["morphological-matrix"],
        prompt: "Üretilen tüm çözümleri Uygulanabilirlik Matrisinde (Etki vs. Kolaylık) derecelendir. Hızlı kazanımları (Quick Wins) ve stratejik hamleleri ayrıştır."
      },
      {
        id: "failure-mode-effect",
        icon: "⚠️",
        name: "FMEA Hata Modları Analizi",
        category: "evaluation",
        description: "Olası başarısızlıkların risk öncelik puanını (RPN) hesaplar.",
        layer: 3,
        requires: ["solution-feasibility-grid"],
        prompt: "FMEA (Failure Mode and Effects Analysis) yap: Çözümün olası hata modlarını, Şiddet (S), Olasılık (O) ve Tespit Edilebilirlik (D) skorlarıyla Risk Öncelik Sayısına ($RPN = S \\times O \\times D$) dönüştür."
      },
      {
        id: "trade-off-optimization",
        icon: "⚖️",
        name: "Çok Kriterli Optimizasyon",
        category: "evaluation",
        description: "Çatışan hedefler arasında AHP (Analytic Hierarchy Process) analizi yapar.",
        layer: 3,
        requires: ["solution-feasibility-grid"],
        prompt: "Çok Kriterli Karar Verme (MCDM) uygula: Çözüm alternatiflerini ağırlıklandırılmış kriterlere göre matriste puanlayıp en optimum seçeneği matematiksel olarak seç."
      },
      {
        id: "pilot-experiment-design",
        icon: "🧪",
        name: "Pilot Deney Tasarımı",
        category: "evaluation",
        description: "Çözümü en düşük maliyet ve riskle sahada test edecek pilot protokolü kurar.",
        layer: 3,
        requires: ["failure-mode-effect"],
        prompt: "Çözüm için düşük riskli Pilot Deney Tasarımı yaz: Hipotezi test edecek minimum ölçekli protokolü, kontrol grubunu ve başarı kriterini tanımla."
      },
      {
        id: "solution-impact-matrix",
        icon: "🚀",
        name: "Çözüm Etki Haritası",
        category: "evaluation",
        description: "Çözümün uzun vadeli sistemik dönüşüm potansiyelini raporlar.",
        layer: 3,
        requires: ["solution-feasibility-grid"],
        prompt: "Çözümün uzun vadeli etki ve değer haritasını çıkar: Uygulama sonrası sistemin kazanacağı yeni yetenekleri ve kaldırılacak karmaşıklıkları özetle."
      }
    ],
    en: [
      {
        id: "root-cause-5-whys",
        icon: "🕵️",
        name: "Root Cause (5 Whys) Analysis",
        category: "deconstruction",
        description: "Drills beneath surface symptoms to uncover underlying root causes.",
        layer: 1,
        requires: [],
        prompt: "Execute 5 Whys technique: Ask 'Why?' five consecutive times to strip away symptoms and pinpoint the fundamental root cause."
      },
      {
        id: "problem-boundary-def",
        icon: "🎯",
        name: "Problem Boundary Definition",
        category: "deconstruction",
        description: "Clarifies exact in-scope and out-of-scope problem bounds.",
        layer: 1,
        requires: ["root-cause-5-whys"],
        prompt: "Define problem boundaries (In-Scope vs. Out-of-Scope): Clarify precisely what is being solved and what is explicitly excluded to prevent scope creep."
      },
      {
        id: "functional-analysis",
        icon: "⚙️",
        name: "Functional System Analysis",
        category: "deconstruction",
        description: "Deconstructs a system into components and functional interactions.",
        layer: 2,
        requires: ["problem-boundary-def"],
        prompt: "Perform Functional Analysis: Break system components into Subject-Action-Object pairs. Identify insufficient, redundant, or harmful functions."
      },
      {
        id: "constraint-mapping",
        icon: "🧱",
        name: "Constraint Mapping (TOC)",
        category: "deconstruction",
        description: "Applies Goldratt's Theory of Constraints to isolate system bottlenecks.",
        layer: 2,
        requires: ["problem-boundary-def"],
        prompt: "Apply Theory of Constraints (TOC): Identify the single primary bottleneck constraining total system throughput and focus analysis exclusively on it."
      },
      {
        id: "issue-tree-breakdown",
        icon: "🌳",
        name: "Issue Tree (MECE) Breakdown",
        category: "deconstruction",
        description: "Decomposes problems into mutually exclusive, collectively exhaustive branches.",
        layer: 2,
        requires: ["root-cause-5-whys"],
        prompt: "Deconstruct the problem into a MECE (Mutually Exclusive, Collectively Exhaustive) Issue Tree. Ensure zero overlaps and zero unexamined logical gaps."
      },
      {
        id: "system-component-map",
        icon: "🗺️",
        name: "System Component Mapping",
        category: "deconstruction",
        description: "Maps interactions across supersystems, main systems, and subsystems.",
        layer: 2,
        requires: ["functional-analysis"],
        prompt: "Map material, energy, and information flows across supersystem, core system, and subsystem boundaries."
      },
      {
        id: "triz-contradiction-matrix",
        icon: "⚡",
        name: "TRIZ Contradiction Matrix",
        category: "triz",
        description: "Resolves engineering contradictions without compromised trade-offs.",
        layer: 2,
        requires: ["functional-analysis"],
        prompt: "Apply the TRIZ Contradiction Matrix: Identify the improving parameter vs. worsening parameter trade-off and select relevant Inventive Principles from TRIZ."
      },
      {
        id: "triz-ideality-operator",
        icon: "✨",
        name: "TRIZ Ideal Final Result (IFR)",
        category: "triz",
        description: "Drives systems toward zero cost and complexity while retaining pure function.",
        layer: 2,
        requires: ["triz-contradiction-matrix"],
        prompt: "Define the Ideal Final Result (IFR): How can the system perform the required function BY ITSELF without adding cost, space, or complexity?"
      },
      {
        id: "triz-resource-inventory",
        icon: "🎒",
        name: "TRIZ Resource Inventory",
        category: "triz",
        description: "Uncovers idle internal and environmental resources for problem resolution.",
        layer: 2,
        requires: ["triz-ideality-operator"],
        prompt: "Conduct a TRIZ Resource Audit: Identify free, idle, or wasted resources (waste heat, gravity, space, time, materials) to solve the problem."
      },
      {
        id: "triz-substance-field",
        icon: "🧲",
        name: "TRIZ Substance-Field (Su-Field)",
        category: "triz",
        description: "Models and transforms substance-field interactions to fix system flaws.",
        layer: 3,
        requires: ["triz-contradiction-matrix"],
        prompt: "Perform Su-Field Analysis: Model the system as $S_1$ (Substance 1), $S_2$ (Substance 2), and $F$ (Field). Introduce a new field or substance to neutralize harmful interactions."
      },
      {
        id: "triz-evolution-lines",
        icon: "📈",
        name: "TRIZ System Evolution Lines",
        category: "triz",
        description: "Forecasts technological evolution paths along S-curves.",
        layer: 3,
        requires: ["triz-ideality-operator"],
        prompt: "Analyze System Evolution Lines: Locate the system's position on its S-curve and project its next evolutionary jump toward dynamism or miniaturization."
      },
      {
        id: "triz-su-field-analysis",
        icon: "🌀",
        name: "TRIZ Standard Solutions",
        category: "triz",
        description: "Applies TRIZ 76 Standard Solutions to eliminate system flaws.",
        layer: 3,
        requires: ["triz-substance-field"],
        prompt: "Select and apply 3 relevant TRIZ Standard Solutions (from the 76 standards) to transform system structure and eliminate chronic failure modes."
      },
      {
        id: "de-bono-6-hats",
        icon: "🎩",
        name: "de Bono 6 Thinking Hats",
        category: "lateral",
        description: "Systematically explores problems from six distinct cognitive perspectives.",
        layer: 1,
        requires: [],
        prompt: "Apply 6 Thinking Hats sequentially: White (Data), Red (Emotion), Black (Risk), Yellow (Value), Green (Creativity), Blue (Process Control). Segregate outputs accordingly."
      },
      {
        id: "random-word-stimulus",
        icon: "🎲",
        name: "Random Stimulus Technique",
        category: "lateral",
        description: "Forces unexpected connections by introducing random unrelated words.",
        layer: 2,
        requires: ["de-bono-6-hats"],
        prompt: "Execute Random Entry: Select an entirely unrelated object/word and forcibly bridge its attributes to the problem domain to generate breakthrough ideas."
      },
      {
        id: "provocation-po",
        icon: "💥",
        name: "Provocation (PO) Operator",
        category: "lateral",
        description: "Formulates absurd statements to open new lateral thinking pathways.",
        layer: 2,
        requires: ["de-bono-6-hats"],
        prompt: "Formulate a Provocation (PO): State an absurd, reality-defying hypothesis (e.g., 'PO: Cars have square wheels'). Use this as a stepping stone to derive practical innovations."
      },
      {
        id: "analogical-transfer",
        icon: "🧬",
        name: "Biomimicry & Analogy Transfer",
        category: "lateral",
        description: "Transfers evolutionary and cross-industry solutions to the target domain.",
        layer: 2,
        requires: ["de-bono-6-hats"],
        prompt: "Apply Biomimicry or cross-industry analogy: Identify how natural organisms or distant industries solved an identical functional problem and transfer the mechanism."
      },
      {
        id: "perspective-reversal",
        icon: "🔄",
        name: "Perspective Reversal",
        category: "lateral",
        description: "Views the problem through the first-person perspective of system objects.",
        layer: 2,
        requires: ["de-bono-6-hats"],
        prompt: "Invert perspective: Describe the problem in first-person prose from the perspective of the object or opponent ('I am a data packet moving through this node...')."
      },
      {
        id: "cross-domain-pollination",
        icon: "🐝",
        name: "Cross-Domain Pollination",
        category: "lateral",
        description: "Imports architectural models from radically unrelated fields.",
        layer: 3,
        requires: ["analogical-transfer"],
        prompt: "Execute Cross-Domain Pollination: Solve the target problem using structural principles imported from aerospace, deep-sea biology, or game design."
      },
      {
        id: "scamper-substitute",
        icon: "🔄",
        name: "SCAMPER - Substitute",
        category: "scamper",
        description: "Replaces system materials, components, or process steps.",
        layer: 1,
        requires: [],
        prompt: "Apply SCAMPER - Substitute: What materials, steps, people, or energy sources in this system can be substituted with alternatives?"
      },
      {
        id: "scamper-combine-adapt",
        icon: "🧩",
        name: "SCAMPER - Combine & Adapt",
        category: "scamper",
        description: "Blends multiple functions and adapts external solutions.",
        layer: 1,
        requires: ["scamper-substitute"],
        prompt: "Apply SCAMPER - Combine & Adapt: What external services or functions can be merged into this system? How can external frameworks be adapted here?"
      },
      {
        id: "scamper-modify-magnify",
        icon: "🔍",
        name: "SCAMPER - Modify & Magnify",
        category: "scamper",
        description: "Exaggerates or minimizes dimensions, frequency, and scale.",
        layer: 2,
        requires: ["scamper-combine-adapt"],
        prompt: "Apply SCAMPER - Modify/Magnify/Minify: What happens if a core attribute is magnified 100x or shrunk down to micro-scale?"
      },
      {
        id: "scamper-put-other-use",
        icon: "♻️",
        name: "SCAMPER - Put to Other Use",
        category: "scamper",
        description: "Repurposes system outputs or waste streams for alternate markets.",
        layer: 2,
        requires: ["scamper-modify-magnify"],
        prompt: "Apply SCAMPER - Put to Other Use: How can this system or its waste outputs be repurposed for a completely different industry or market segment?"
      },
      {
        id: "scamper-eliminate-reverse",
        icon: "✂️",
        name: "SCAMPER - Eliminate & Reverse",
        category: "scamper",
        description: "Excises non-essential elements and reverses step sequences.",
        layer: 2,
        requires: ["scamper-put-other-use"],
        prompt: "Apply SCAMPER - Eliminate & Reverse: Completely excise the single most complex process step. What happens if sequence order is completely reversed?"
      },
      {
        id: "scamper-full-matrix",
        icon: "🎛️",
        name: "SCAMPER Full Operator Matrix",
        category: "scamper",
        description: "Combines all 7 SCAMPER operators into a comprehensive idea matrix.",
        layer: 3,
        requires: ["scamper-eliminate-reverse"],
        prompt: "Synthesize a 7-point SCAMPER matrix covering all operators and extract the top 3 breakthrough candidate concepts."
      },
      {
        id: "morphological-matrix",
        icon: "📊",
        name: "Morphological Analysis Matrix",
        category: "evaluation",
        description: "Explores unexpected solution configurations across parameter grids.",
        layer: 2,
        requires: ["issue-tree-breakdown"],
        prompt: "Construct a Morphological Analysis Matrix: Map key system parameters against sub-options. Combine sub-options systematically to discover novel configurations."
      },
      {
        id: "solution-feasibility-grid",
        icon: "🎯",
        name: "Solution Feasibility Grid",
        category: "evaluation",
        description: "Plots solutions across Impact vs. Effort axes.",
        layer: 2,
        requires: ["morphological-matrix"],
        prompt: "Score candidate solutions on a Feasibility Matrix (Impact vs. Effort). Segregate Quick Wins from high-leverage strategic initiatives."
      },
      {
        id: "failure-mode-effect",
        icon: "⚠️",
        name: "FMEA Failure Mode Analysis",
        category: "evaluation",
        description: "Calculates Risk Priority Numbers ($RPN = S \\times O \\times D$) for proposed solutions.",
        layer: 3,
        requires: ["solution-feasibility-grid"],
        prompt: "Conduct FMEA (Failure Mode and Effects Analysis): Score Severity (S), Occurrence (O), and Detection (D) to compute Risk Priority Numbers ($RPN = S \\times O \\times D$)."
      },
      {
        id: "trade-off-optimization",
        icon: "⚖️",
        name: "Multi-Criteria Decision Analysis",
        category: "evaluation",
        description: "Applies weighted MCDA scoring across competing options.",
        layer: 3,
        requires: ["solution-feasibility-grid"],
        prompt: "Perform Multi-Criteria Decision Analysis (MCDA): Score candidates against weighted evaluation metrics to mathematically select the optimal path."
      },
      {
        id: "pilot-experiment-design",
        icon: "🧪",
        name: "Pilot Experiment Protocol",
        category: "evaluation",
        description: "Designs low-cost, low-risk field trials to test solution validity.",
        layer: 3,
        requires: ["failure-mode-effect"],
        prompt: "Design a low-risk Pilot Experiment Protocol: Define minimum test scope, control baseline metrics, and quantitative success gates."
      },
      {
        id: "solution-impact-matrix",
        icon: "🚀",
        name: "Solution Impact Mapping",
        category: "evaluation",
        description: "Maps long-term systemic transformations generated by implementation.",
        layer: 3,
        requires: ["solution-feasibility-grid"],
        prompt: "Map long-term systemic impact: Summarize new operational capabilities unlocked and systemic complexity eliminated post-implementation."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 5. AGENTARCH (Meta-Prompt & AI Agent Tasarımı)
  // ---------------------------------------------------------------------------
  agentarch: {
    tr: [
      {
        id: "persona-role-definition",
        icon: "🎭",
        name: "Persona & Rol Mimarisi",
        category: "persona",
        description: "AI ajanının uzmanlık alanını, sınırlarını ve temel karakterini tanımlar.",
        layer: 1,
        requires: [],
        prompt: "Ajan personasını inşa et: 'Sen [Disiplin] alanında [Yıl] deneyime sahip Kıdemli bir [Rol]sün.' Ajanın uzmanlık sınırlarını, çalışma felsefesini ve kabul etmediği rolleri belirle."
      },
      {
        id: "epistemic-stance-setting",
        icon: "🧠",
        name: "Epistemik Duruş Ayarı",
        category: "persona",
        description: "Ajanın bilgiye yaklaşımını (şüpheci, otoriter, sokratik) belirler.",
        layer: 1,
        requires: ["persona-role-definition"],
        prompt: "Ajanın epistemik duruşunu ayarla: Emin olmadığı konularda spekülasyon yapmak yerine 'Bilmiyorum' deme veya ek veri isteme oranını %100'e kilitle. Halüsinasyon toleransını sıfırla."
      },
      {
        id: "tone-register-locking",
        icon: "🎙️",
        name: "Ton ve Sicil Kilitleme",
        category: "persona",
        description: "Üslubu (resmi, samimi, teknik, özlü) ve yasaklı kelimeleri sabitler.",
        layer: 1,
        requires: ["persona-role-definition"],
        prompt: "İletişim tonunu sabitle: [Teknik / Kurumsal / Sokratik]. Nezaket dolgu maddelerini ('Harika bir soru!', 'Elbette yardım edebilirim') kesin olarak yasakla. Doğrudan sonuca odaklan."
      },
      {
        id: "domain-expert-profile",
        icon: "🎓",
        name: "Alan Uzmanı Profili",
        category: "persona",
        description: "Ajana ilgili sektörün terminoloji ve düşünme jargonu kütüphanesini yükler.",
        layer: 2,
        requires: ["persona-role-definition"],
        prompt: "Ajana sektörel mental modeller ve terminoloji yükle: [Sektör/Disiplin] alanının C2 düzey jargonu ve standart kabul görmüş referans çerçeveleri üzerinden düşünmesini sağla."
      },
      {
        id: "cognitive-bias-override",
        icon: "🛠️",
        name: "Bilişsel Sapma Aşma",
        category: "persona",
        description: "LLM'lerin varsayılan kullanıcıyı onaylama (sycophancy) eğilimini kırar.",
        layer: 2,
        requires: ["epistemic-stance-setting"],
        prompt: "Yalakalık (Sycophancy) engelleyici ekle: Kullanıcı yanlış veya hatalı bir önerme sunduğunda, kullanıcıyı onaylamak yerine hatayı kibarca ama acımasızca düzeltme talimatı ver."
      },
      {
        id: "adaptive-persona-shift",
        icon: "🔄",
        name: "Dinamik Persona Geçişi",
        category: "persona",
        description: "Görevin aşamasına göre ajanın mod değiştirmesini sağlar.",
        layer: 3,
        requires: ["domain-expert-profile"],
        prompt: "Ajan için dinamik mod anahtarı kurgula: Analiz aşamasında 'Analitik Eleştirmen', çözüm aşamasında 'Yaratıcı Mimar' moduna otomatik geçiş protokolü yaz."
      },
      {
        id: "cot-step-by-step",
        icon: "🔗",
        name: "Chain-of-Thought (CoT) Enjeksiyonu",
        category: "cot",
        description: "Ajanın yanıt vermeden önce adım adım düşünmesini zorunlu kılar.",
        layer: 1,
        requires: [],
        prompt: "CoT (Chain-of-Thought) Zorunluluğu: Nihai cevabı vermeden önce, düşünce sürecini `<thinking>` blokları içinde adım adım (Step 1, Step 2, Step 3) yürüt. Doğrudan cevaba geçme."
      },
      {
        id: "tree-of-thought-prompt",
        icon: "🌳",
        name: "Tree-of-Thoughts (ToT) Mimarisi",
        category: "cot",
        description: "Ajanın aynı anda 3 farklı düşünce patikası geliştirip kıyaslamasını sağlar.",
        layer: 2,
        requires: ["cot-step-by-step"],
        prompt: "Tree-of-Thoughts (ToT) protokolünü çalıştır: Problem için 3 farklı çözüm patikası ($T_1, T_2, T_3$) oluştur. Her patikanın fizibilitesini değerlendir ve en yüksek skoru alan patikayı seç."
      },
      {
        id: "self-reflection-loop",
        icon: "🪞",
        name: "Öz-Yansıtma (Self-Correction) Döngüsü",
        category: "cot",
        description: "Ajanın kendi ürettiği çıktıyı sunmadan önce denetlemesini sağlar.",
        layer: 2,
        requires: ["cot-step-by-step"],
        prompt: "Kendi Kendini Denetleme (Self-Reflection) döngüsü ekle: Çıktıyı kullanıcıya sunmadan önce `<criticism>` bloğunda mantıksal hatalara karşı tarafsızca incele ve gerekiyorsa düzelt."
      },
      {
        id: "verification-step-injection",
        icon: "✅",
        name: "Ara Doğrulama Adımı",
        category: "cot",
        description: "Matematiksel ve mantıksal hesaplamalarda ara adımları teyit ettirir.",
        layer: 2,
        requires: ["cot-step-by-step"],
        prompt: "Her mantıksal veya matematiksel adımla birlikte bir 'Ara Teyit' (Sanity Check) yap: Yapılan varsayım bir sonraki adımı destekliyor mu?"
      },
      {
        id: "path-divergence-evaluation",
        icon: "🔀",
        name: "Patika Sapma Değerlendirmesi",
        category: "cot",
        description: "ToT sürecinde elenen alternatiflerin elenme gerekçelerini raporlar.",
        layer: 3,
        requires: ["tree-of-thought-prompt"],
        prompt: "Düşünce ağacında (ToT) seçilmeyen alternatif patikaların neden elendiğini kısa ve net gerekçelerle raporla. Mantıksal kör noktaları görünür kıl."
      },
      {
        id: "reasoning-depth-governor",
        icon: "🎛️",
        name: "Düşünme Derinliği Valfi",
        category: "cot",
        description: "Karmaşıklığa göre CoT derinliğini dinamik olarak ayarlar.",
        layer: 3,
        requires: ["self-reflection-loop"],
        prompt: "Görevin zorluk derecesine göre akıl yürütme derinliğini dinamik ayarla: Basit soruda doğrudan yanıt, karmaşık soruda 5 katmanlı CoT analizi çalıştır."
      },
      {
        id: "hallucination-guardrail",
        icon: "🛡️",
        name: "Halüsinasyon Korkuluğu",
        category: "guardrails",
        description: "Uydurma veri ve kaynak üretimini kesin kısıtlarla engeller.",
        layer: 1,
        requires: [],
        prompt: "Sıkı Gerçeklik Kuralı: Sadece verilen bağlamdaki veya %100 emin olunan doğrulanmış olguları kullan. Emin olunmayan isim, tarih, URL veya istatistikleri ASLA üretme."
      },
      {
        id: "output-format-locking",
        icon: "🔒",
        name: "Çıktı Formatı Kilitleme",
        category: "guardrails",
        description: "Çıktıyı strictly JSON, XML veya Markdown şablonuna zorlar.",
        layer: 1,
        requires: ["hallucination-guardrail"],
        prompt: "Çıktı formatını strict JSON olarak kilitle. Yanıtın başlangıcında veya sonunda hiçbir açıklama metni, 'İşte JSON çıktınız:' gibi giriş cümlesi OLMADAN doğrudan `{` ile başlat."
      },
      {
        id: "forbidden-phrase-filter",
        icon: "🚫",
        name: "Yasaklı Kelime / Kalıp Filtresi",
        category: "guardrails",
        description: "AI klşelerini ve istenmeyen ifadeleri kara listeye alır.",
        layer: 2,
        requires: ["output-format-locking"],
        prompt: "Yasaklı Kalıplar Kara Listesi: 'Bir yapay zeka modeli olarak...', 'Delve into', 'Tapestry', 'In conclusion' kalıplarını kullanmayı BİRADAN İTİBAREN YASAKLA."
      },
      {
        id: "claim-source-attribution",
        icon: "📌",
        name: "Kaynak Dayandırma Zorunluluğu",
        category: "guardrails",
        description: "Her iddianın bağlamdaki spesifik bir paragrafa/veriye dayanmasını sağlar.",
        layer: 2,
        requires: ["hallucination-guardrail"],
        prompt: "Her bilgi iddiasının yanına bağlam referansı ekle `[Metin ID / Sayfa]`. Bağlamda karşılığı olmayan hiçbir iddiayı yanıta dahil etme."
      },
      {
        id: "safety-policy-aligner",
        icon: "⚖️",
        name: "Güvenlik ve Hizmet Politikası Hizalaması",
        category: "guardrails",
        description: "Güvenlik ihlali durumlarında ajanın güvenli reddetme protokolü.",
        layer: 2,
        requires: ["forbidden-phrase-filter"],
        prompt: "Güvenlik veya etik sınır ihlallerinde ajanın önceden tanımlanmış nötr ve profesyonel reddetme şablonunu çalıştırmasını sağla."
      },
      {
        id: "boundary-breach-fallback",
        icon: "🚨",
        name: "Sınır İhlali Yedek Protokolü",
        category: "guardrails",
        description: "Format veya içerik bozulduğunda ajanın kendini güvenli moda alması.",
        layer: 3,
        requires: ["safety-policy-aligner"],
        prompt: "Format kilidi kırıldığında veya beklenmeyen girdi alındığında ajanın otomatik olarak `ERROR_CODE_FALLBACK` çıktısı verip temiz duruma geçmesini sağla."
      },
      {
        id: "few-shot-exemplar-design",
        icon: "💡",
        name: "Few-Shot Örnek Tasarımı",
        category: "fewshot",
        description: "Ajanın doğru girdi-çıktı kalıbını anlaması için ideal örnekler sunar.",
        layer: 1,
        requires: [],
        prompt: "Sisteme 2 adet kusursuz Few-Shot örneği ekle:\nInput: [Örnek Girdi]\nOutput: [İdeal Çıktı]. Ajanın bu kalıbı %100 oranında taklit etmesini sağla."
      },
      {
        id: "edge-case-few-shot",
        icon: "🧩",
        name: "Sınır Durum (Edge Case) Örneği",
        category: "fewshot",
        description: "Ajanın hatalı veya eksik girdilerde nasıl davranacağını gösterir.",
        layer: 2,
        requires: ["few-shot-exemplar-design"],
        prompt: "Hatalı/eksik girdi senaryolarını içeren Edge-Case Few-Shot örneği ekle. Ajanın bu durumda nasıl eksik bilgi talep edeceğini göster."
      },
      {
        id: "negative-example-contrast",
        icon: "❌",
        name: "Negatif Örnek Zıtlığı",
        category: "fewshot",
        description: "Ajanın 'yapmaması gereken' çıktı örneğini göstererek sınır çizer.",
        layer: 2,
        requires: ["few-shot-exemplar-design"],
        prompt: "Zıtlık oluşturmak için 1 adet 'YANLIŞ ÇIKTI' (Negative Example) örneği koy ve altındaki gerekçede nelerin hatalı olduğunu açıkla."
      },
      {
        id: "dynamic-context-exemplar",
        icon: "🔄",
        name: "Dinamik Bağlam Örneği",
        category: "fewshot",
        description: "Değişen parametrelere göre adapte olan örnek yapısı sunar.",
        layer: 2,
        requires: ["few-shot-exemplar-design"],
        prompt: "Girdi değişkenlerine göre adapte olan parametrik Few-Shot şablonu kurgula."
      },
      {
        id: "format-strictness-examples",
        icon: "📐",
        name: "Format Katılığı Örnekleri",
        category: "fewshot",
        description: "Şema uyumluluğunu gösteren ayrıntılı kod/JSON örnekleri.",
        layer: 2,
        requires: ["few-shot-exemplar-design"],
        prompt: "Karmaşık JSON veri yapılarını eksiksiz dolduran şema odaklı Few-Shot örneği yaz."
      },
      {
        id: "multi-turn-few-shot-chain",
        icon: "💬",
        name: "Çok Tur Düzeyli Örnek Diyalog",
        category: "fewshot",
        description: "Ajanın çoklu konuşma turlarında bağlamı nasıl koruyacağını gösterir.",
        layer: 3,
        requires: ["edge-case-few-shot"],
        prompt: "3 turlu diyalog geçmişi içeren Çok Tur Düzeyli (Multi-Turn) Few-Shot örneği tasarla. Ajanın hafıza takibini göster."
      },
      {
        id: "variable-ingestion-schema",
        icon: "📥",
        name: "Değişken Alım Şeması",
        category: "orchestration",
        description: "Sistem promptuna parametrik degiskenlerin (`{{variable}}`) nasil besleneceğini belirler.",
        layer: 1,
        requires: [],
        prompt: "Prompt değişkenlerini tanımla: `{{USER_INPUT}}`, `{{DOMAIN_CONTEXT}}`, `{{MAX_TOKENS}}`. Değişkenlerin boş gelmesi durumunda varsayılan değer atama mantığını kur."
      },
      {
        id: "multi-agent-handoff",
        icon: "🤝",
        name: "Çoklu Ajan Devir (Handoff) Protokolü",
        category: "orchestration",
        description: "Ajanın görevi tamamlayıp diğer ajana hangi verilerle devredeceğini tanımlar.",
        layer: 2,
        requires: ["variable-ingestion-schema"],
        prompt: "Devir Protokolü (Handoff Protocol): İşlem bittiğinde çıktıyı bir sonraki ajana devretmek için `NEXT_AGENT: [Agent_Name]` ve `PAYLOAD: [JSON Data]` formatında devir bloğu üret."
      },
      {
        id: "task-decomposition-router",
        icon: "🔀",
        name: "Görev Bölümleme Yönlendiricisi",
        category: "orchestration",
        description: "Büyük problemleri alt görevlere bölüp paralel ajanlara dağıtır.",
        layer: 2,
        requires: ["multi-agent-handoff"],
        prompt: "Görev Bölümleyici (Task Router): Ana talebi 3 bağımsız alt göreve böl ve her birini ilgili uzman ajana yönlendirecek orkestrasyon planı çıkar."
      },
      {
        id: "state-persistence-prompt",
        icon: "💾",
        name: "Durum Koruma (State Persistence) Protokolü",
        category: "orchestration",
        description: "Turlar arası durum bilgisini JSON state nesnesinde günceller.",
        layer: 3,
        requires: ["multi-agent-handoff"],
        prompt: "Diyalog durumunu (State Object) her tur sonunda güncelle: `<state>{\"completed_steps\": [], \"pending_steps\": [], \"variables\": {}}</state>`."
      },
      {
        id: "response-aggregation-spec",
        icon: "📑",
        name: "Yanıt Toplama ve Sentez Özelliği",
        category: "orchestration",
        description: "Farklı ajanlardan gelen çıktıları çelişkisiz tek bir çıktıda birleştirir.",
        layer: 3,
        requires: ["task-decomposition-router"],
        prompt: "Farklı ajanlardan gelen ham yanıtları al, çelişkili noktaları çöz ve kullanıcıya tek bir tutarlı rapor halinde sentezle."
      },
      {
        id: "zero-api-prompt-compiler",
        icon: "⚡",
        name: "PREMPT Sıfır-API Derleyici Şablonu",
        category: "orchestration",
        description: "Tüm aktif modülleri deterministik tek bir mega-prompta derler.",
        layer: 3,
        requires: ["response-aggregation-spec"],
        prompt: "Seçilen tüm aktif modül talimatlarını öncelik sırasına göre sırala, çakışan talimatları bastır ve harici AI modellerine verilecek nihai mega-promptu inşa et."
      }
    ],
    en: [
      {
        id: "persona-role-definition",
        icon: "🎭",
        name: "Persona & Role Architecture",
        category: "persona",
        description: "Establishes agent expertise, domain boundaries, and foundational identity.",
        layer: 1,
        requires: [],
        prompt: "Build agent persona: 'You are a Senior [Role] with [X] years of experience in [Domain].' Clearly define operational limits, working philosophy, and disclaimed roles."
      },
      {
        id: "epistemic-stance-setting",
        icon: "🧠",
        name: "Epistemic Stance Calibration",
        category: "persona",
        description: "Sets agent stance toward uncertainty, speculation, and unknowable facts.",
        layer: 1,
        requires: ["persona-role-definition"],
        prompt: "Calibrate epistemic stance: Set uncertainty tolerance to zero. Force the agent to explicitly state 'I don't know' or request data rather than speculate on unverified facts."
      },
      {
        id: "tone-register-locking",
        icon: "🎙️",
        name: "Tone & Register Lock",
        category: "persona",
        description: "Locks communication style and strictly forbids conversational fluff.",
        layer: 1,
        requires: ["persona-role-definition"],
        prompt: "Lock communication tone: [Technical / Corporate / Socratic]. Absolutely ban conversational filler ('Great question!', 'Sure, I can help!') and move straight to technical execution."
      },
      {
        id: "domain-expert-profile",
        icon: "🎓",
        name: "Domain Expert Profile",
        category: "persona",
        description: "Injects domain jargon, conceptual frameworks, and mental models into agent persona.",
        layer: 2,
        requires: ["persona-role-definition"],
        prompt: "Inject domain-specific mental models and terminology: Force the agent to reason through C2-level domain jargon and standard industry frameworks."
      },
      {
        id: "cognitive-bias-override",
        icon: "🛠️",
        name: "Sycophancy Override",
        category: "persona",
        description: "Overrides default LLM tendency to agree with flawed user premises.",
        layer: 2,
        requires: ["epistemic-stance-setting"],
        prompt: "Inject Sycophancy Override: Instruct the agent to politely but firmly correct flawed user premises or false assumptions rather than validating them."
      },
      {
        id: "adaptive-persona-shift",
        icon: "🔄",
        name: "Dynamic Persona Shift",
        category: "persona",
        description: "Enables agent to shift operational modes based on task lifecycle phase.",
        layer: 3,
        requires: ["domain-expert-profile"],
        prompt: "Establish dynamic mode switching: Automatically transition the agent from 'Analytical Auditor' during discovery to 'Creative Architect' during synthesis."
      },
      {
        id: "cot-step-by-step",
        icon: "🔗",
        name: "Chain-of-Thought (CoT) Injection",
        category: "cot",
        description: "Forces step-by-step explicit reasoning before delivering final output.",
        layer: 1,
        requires: [],
        prompt: "Enforce Chain-of-Thought (CoT): Conduct explicit step-by-step reasoning inside `<thinking>` blocks prior to emitting final answers."
      },
      {
        id: "tree-of-thought-prompt",
        icon: "🌳",
        name: "Tree-of-Thoughts (ToT) Architecture",
        category: "cot",
        description: "Generates and evaluates 3 parallel reasoning paths before selecting the optimum.",
        layer: 2,
        requires: ["cot-step-by-step"],
        prompt: "Execute Tree-of-Thoughts (ToT): Generate 3 parallel problem-solving paths ($T_1, T_2, T_3$), evaluate feasibility of each, and select the highest-scoring path."
      },
      {
        id: "self-reflection-loop",
        icon: "🪞",
        name: "Self-Reflection & Correction Loop",
        category: "cot",
        description: "Requires agent to self-audit generated responses prior to final output.",
        layer: 2,
        requires: ["cot-step-by-step"],
        prompt: "Embed a Self-Correction loop: Intercept output inside `<criticism>` blocks to audit for logical fallacies or hallucinated steps before releasing final prose."
      },
      {
        id: "verification-step-injection",
        icon: "✅",
        name: "Intermediate Verification Step",
        category: "cot",
        description: "Injects explicit sanity checks at each step of complex calculations.",
        layer: 2,
        requires: ["cot-step-by-step"],
        prompt: "Inject intermediate sanity checks at every logical or mathematical transition step to verify that premises logically support downstream steps."
      },
      {
        id: "path-divergence-evaluation",
        icon: "🔀",
        name: "Path Divergence Report",
        category: "cot",
        description: "Documents explicit reasons for rejecting alternative reasoning branches.",
        layer: 3,
        requires: ["tree-of-thought-prompt"],
        prompt: "Document explicit elimination rationale for discarded ToT reasoning branches to render logical decision-making completely transparent."
      },
      {
        id: "reasoning-depth-governor",
        icon: "🎛️",
        name: "Reasoning Depth Governor",
        category: "cot",
        description: "Dynamically modulates CoT reasoning depth based on query complexity.",
        layer: 3,
        requires: ["self-reflection-loop"],
        prompt: "Dynamically modulate reasoning depth: Deploy direct concise outputs for trivial queries while triggering 5-stage CoT analysis for multi-faceted problems."
      },
      {
        id: "hallucination-guardrail",
        icon: "🛡️",
        name: "Hallucination Guardrail",
        category: "guardrails",
        description: "Strictly prevents fabrication of unverified facts, citations, or data.",
        layer: 1,
        requires: [],
        prompt: "Enforce Strict Groundedness: Restrict outputs exclusively to provided context or 100% verified facts. NEVER fabricate names, dates, URLs, or empirical statistics."
      },
      {
        id: "output-format-locking",
        icon: "🔒",
        name: "Output Format Locking",
        category: "guardrails",
        description: "Locks output strictly to JSON, XML, or Markdown schemas without markdown clutter.",
        layer: 1,
        requires: ["hallucination-guardrail"],
        prompt: "Lock output format strictly to valid JSON. Start directly with `{` without conversational preambles or postscripts like 'Here is your JSON:'."
      },
      {
        id: "forbidden-phrase-filter",
        icon: "🚫",
        name: "Forbidden Phrase Blacklist",
        category: "guardrails",
        description: "Blacklists ubiquitous AI clichés and meta-commentary.",
        layer: 2,
        requires: ["output-format-locking"],
        prompt: "Enforce Blacklist: Strictly forbid stock AI phrases including 'As an AI model...', 'Delve into', 'Tapestry', and 'In conclusion'."
      },
      {
        id: "claim-source-attribution",
        icon: "📌",
        name: "Claim Grounding Attribution",
        category: "guardrails",
        description: "Forces every factual claim to carry explicit context attributions.",
        layer: 2,
        requires: ["hallucination-guardrail"],
        prompt: "Require explicit context citations `[Context ID / Page]` for every factual assertion. Exclude any claim lacking direct context support."
      },
      {
        id: "safety-policy-aligner",
        icon: "⚖️",
        name: "Safety & Policy Alignment",
        category: "guardrails",
        description: "Executes standard neutral refusal protocols upon encountering unsafe prompts.",
        layer: 2,
        requires: ["forbidden-phrase-filter"],
        prompt: "Ensure the agent executes predefined, neutral, professional refusal templates whenever safety or policy boundaries are challenged."
      },
      {
        id: "boundary-breach-fallback",
        icon: "🚨",
        name: "Boundary Breach Fallback Protocol",
        category: "guardrails",
        description: "Triggers clean fallback output if format or guardrails are violated.",
        layer: 3,
        requires: ["safety-policy-aligner"],
        prompt: "Configure fallback triggers: If format rules break or malformed input is received, output `ERROR_CODE_FALLBACK` and gracefully reset agent state."
      },
      {
        id: "few-shot-exemplar-design",
        icon: "💡",
        name: "Few-Shot Exemplar Design",
        category: "fewshot",
        description: "Provides gold-standard input-output pairs to guide model performance.",
        layer: 1,
        requires: [],
        prompt: "Provide 2 gold-standard Few-Shot exemplars:\nInput: [Sample Input]\nOutput: [Ideal Output]. Instruct the model to mirror this exact structure."
      },
      {
        id: "edge-case-few-shot",
        icon: "🧩",
        name: "Edge-Case Few-Shot Exemplar",
        category: "fewshot",
        description: "Demonstrates correct handling of incomplete, malformed, or ambiguous inputs.",
        layer: 2,
        requires: ["few-shot-exemplar-design"],
        prompt: "Include an edge-case Few-Shot example containing malformed/incomplete input, illustrating how the agent gracefully requests missing information."
      },
      {
        id: "negative-example-contrast",
        icon: "❌",
        name: "Negative Exemplar Contrast",
        category: "fewshot",
        description: "Shows anti-patterns and explicit examples of prohibited output formats.",
        layer: 2,
        requires: ["few-shot-exemplar-design"],
        prompt: "Provide 1 explicit 'Negative Example' showing flawed output, annotated with explanations detailing why it breaches performance standards."
      },
      {
        id: "dynamic-context-exemplar",
        icon: "🔄",
        name: "Dynamic Context Exemplar",
        category: "fewshot",
        description: "Constructs variable-driven few-shot templates for dynamic payloads.",
        layer: 2,
        requires: ["few-shot-exemplar-design"],
        prompt: "Construct a parametric Few-Shot template that dynamically adapts based on incoming prompt variable payloads."
      },
      {
        id: "format-strictness-examples",
        icon: "📐",
        name: "Format Strictness Exemplars",
        category: "fewshot",
        description: "Demonstrates complete schema population for multi-nested JSON structures.",
        layer: 2,
        requires: ["few-shot-exemplar-design"],
        prompt: "Provide a detailed Few-Shot exemplar illustrating complete schema population for complex multi-nested JSON structures."
      },
      {
        id: "multi-turn-few-shot-chain",
        icon: "💬",
        name: "Multi-Turn Dialogue Exemplar",
        category: "fewshot",
        description: "Illustrates context maintenance across multi-turn conversational exchanges.",
        layer: 3,
        requires: ["edge-case-few-shot"],
        prompt: "Design a multi-turn Few-Shot exemplar spanning 3 conversation turns to demonstrate context tracking across extended exchanges."
      },
      {
        id: "variable-ingestion-schema",
        icon: "📥",
        name: "Variable Ingestion Schema",
        category: "orchestration",
        description: "Defines parametric variable (`{{variable}}`) injection architecture.",
        layer: 1,
        requires: [],
        prompt: "Define system variable injection schema: `{{USER_INPUT}}`, `{{DOMAIN_CONTEXT}}`, `{{MAX_TOKENS}}`. Establish default fallback behavior for empty variables."
      },
      {
        id: "multi-agent-handoff",
        icon: "🤝",
        name: "Multi-Agent Handoff Protocol",
        category: "orchestration",
        description: "Formats standardized handoff payloads for agent-to-agent transitions.",
        layer: 2,
        requires: ["variable-ingestion-schema"],
        prompt: "Configure Handoff Protocol: At task completion, generate handoff payloads structured as `NEXT_AGENT: [Agent_Name]` and `PAYLOAD: [JSON Data]`."
      },
      {
        id: "task-decomposition-router",
        icon: "🔀",
        name: "Task Decomposition Router",
        category: "orchestration",
        description: "Decomposes complex goals into parallel tasks routed to specialized agents.",
        layer: 2,
        requires: ["multi-agent-handoff"],
        prompt: "Task Decomposition Router: Break primary goals into 3 sub-tasks and map each to specialized downstream agent profiles."
      },
      {
        id: "state-persistence-prompt",
        icon: "💾",
        name: "State Persistence Protocol",
        category: "orchestration",
        description: "Maintains turn-by-turn state in a structured state tracking object.",
        layer: 3,
        requires: ["multi-agent-handoff"],
        prompt: "Maintain execution state: Update a persistent `<state>{\"completed_steps\": [], \"pending_steps\": [], \"variables\": {}}</state>` object at each turn."
      },
      {
        id: "response-aggregation-spec",
        icon: "📑",
        name: "Response Aggregation & Synthesis",
        category: "orchestration",
        description: "Aggregates raw outputs from multiple agents into a unified final output.",
        layer: 3,
        requires: ["task-decomposition-router"],
        prompt: "Aggregate raw outputs from multi-agent sub-tasks, resolve contradictory claims, and synthesize into a single cohesive response."
      },
      {
        id: "zero-api-prompt-compiler",
        icon: "⚡",
        name: "PREMPT Zero-API Compiler Template",
        category: "orchestration",
        description: "Compiles active modules into a single deterministic master prompt.",
        layer: 3,
        requires: ["response-aggregation-spec"],
        prompt: "Sort active module instructions by topological depth, suppress conflicting constraints, and compile the final zero-API master prompt payload."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 6. CYBER (Siber Güvenlik & Tehdit Modelleme)
  // ---------------------------------------------------------------------------
  cyber: {
    tr: [
      {
        id: "stride-threat-model",
        icon: "🛡️",
        name: "STRIDE Tehdit Modellemesi",
        category: "threat",
        description: "Sistemi STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, EoP) kalkanından geçirir.",
        layer: 1,
        requires: [],
        prompt: "STRIDETehdit Modellemesi yap: Mimariyi Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service ve Elevation of Privilege vektörleri üzerinden denetle."
      },
      {
        id: "attack-surface-mapping",
        icon: "🗺️",
        name: "Saldırı Yüzeyi Haritalama",
        category: "threat",
        description: "Dışa açık tüm uç noktaları, portları ve API girişlerini tespit eder.",
        layer: 1,
        requires: ["stride-threat-model"],
        prompt: "Saldırı Yüzeyini (Attack Surface) haritalandır: Dışa açık tüm API endpoint'lerini, açık portları, veri giriş formlarını ve üçüncü taraf entegrasyon noktalarını listele."
      },
      {
        id: "threat-actor-profiling",
        icon: "🥷",
        name: "Tehdit Aktörü Profilleme",
        category: "threat",
        description: "Betimlenen sistemi hedef alabilecek aktörlerin yetenek ve motivasyonunu modeller.",
        layer: 2,
        requires: ["stride-threat-model"],
        prompt: "Olası Tehdit Aktörlerini profille: Senaryodaki rakip (Script Kiddie, APT, Insider Threat, State-Sponsored) motivasyonunu, kaynağını ve olası saldırı patikasını belirle."
      },
      {
        id: "data-flow-diagram-audit",
        icon: "🔄",
        name: "Veri Akış Diyagramı (DFD) Denetimi",
        category: "threat",
        description: "Güvenlik sınırları (trust boundaries) arasındaki veri geçişlerini inceler.",
        layer: 2,
        requires: ["attack-surface-mapping"],
        prompt: "Veri Akış Diyagramını (DFD Level 1) denetle: Güvenlik Sınırlarını (Trust Boundaries) kesen veri geçişlerinde şifreleme ve kimlik doğrulama eksiklerini bul."
      },
      {
        id: "dread-risk-scoring",
        icon: "📊",
        name: "DREAD Risk Puanlama",
        category: "threat",
        description: "Tehditleri DREAD (Damage, Reproducibility, Exploitability, Affected Users, Discoverability) skoruyla önceliklendirir.",
        layer: 2,
        requires: ["stride-threat-model"],
        prompt: "Tehditleri DREAD modeliyle puanla: Hasar Potansiyeli, Tekrarlanabilirlik, Sömürülebilirlik, Etkilenen Kullanıcılar ve Keşfedilebilirlik değerlerine 1-10 arası skor ver."
      },
      {
        id: "attack-tree-construction",
        icon: "🌲",
        name: "Saldırı Ağacı (Attack Tree) İnşası",
        category: "threat",
        description: "Kök hedefe ulaşmak için gereken bağımlı ve alternatif saldırı adımlarını ağaç yapısında modeller.",
        layer: 3,
        requires: ["attack-surface-mapping"],
        prompt: "Kök hedef için Saldırı Ağacı (Attack Tree) oluştur: AND/OR mantıksal kapılarıyla saldırganın adımlarını ve her bir adımın maliyet/zorluk seviyesini modelle."
      },
      {
        id: "owasp-top10-scanner",
        icon: "🐛",
        name: "OWASP Top 10 Taraması",
        category: "appsec",
        description: "Uygulamayı en kritik 10 web güvenliği zafiyetine karşı denetler.",
        layer: 1,
        requires: [],
        prompt: "OWASP Top 10 (Injection, Broken Auth, Sensitive Data Exposure, XXE, Broken Access Control, Misconfig, XSS, Insecure Deserialization, Vulnerable Components, Insufficient Logging) denetimi yap."
      },
      {
        id: "input-validation-spec",
        icon: "🧼",
        name: "Girdi Doğrulama ve Sanitizasyon",
        category: "appsec",
        description: "SQLi, XSS ve Command Injection risklerini sıfırlayan girdi filtreleme kuralı.",
        layer: 1,
        requires: ["owasp-top10-scanner"],
        prompt: "Strict Input Validation spesifikasyonu yaz: Beyaz liste (allowlist) tabanlı girdi doğrulama, parametreli sorgu (prepared statements) ve HTML/SQL kaçış (escaping) kurallarını koy."
      },
      {
        id: "auth-authz-hardener",
        icon: "🔑",
        name: "Kimlik Doğrulama ve Yetkilendirme Sıkılaştırma",
        category: "appsec",
        description: "OAuth2, JWT, RBAC/ABAC ve MFA güvenlik mimarisini sertleştirir.",
        layer: 2,
        requires: ["owasp-top10-scanner"],
        prompt: "AuthN/AuthZ mimarisini sertleştir: JWT imzalama güvenliği, token ömrü, RBAC/ABAC rol denetimleri ve BOLA/IDOR zafiyetlerini engelleyici kontrol mekanizması yaz."
      },
      {
        id: "api-security-checklist",
        icon: "🔌",
        name: "API Güvenlik Kontrol Listesi",
        category: "appsec",
        description: "OWASP API Security Top 10 standartlarına uyumu denetler.",
        layer: 2,
        requires: ["owasp-top10-scanner"],
        prompt: "OWASP API Security Top 10 denetimi yap: Rate limiting, CORS politikaları, API gateway güvenlik katmanı ve hassas veri sızıntı alanlarını denetle."
      },
      {
        id: "secrets-management-audit",
        icon: "🔐",
        name: "Hassas Veri ve Gizli Anahtar Yönetimi",
        category: "appsec",
        description: "Kod tabanında ve CI/CD süreçlerinde sızdırılan API key ve şifre Taraması.",
        layer: 2,
        requires: ["auth-authz-hardener"],
        prompt: "Secrets Management denetimi yap: Kodda hardcoded unutulmuş API key, private key ve veritabanı parolalarını tespit et. HashiCorp Vault veya KMS entegrasyonu yaz."
      },
      {
        id: "memory-safety-checker",
        icon: "🧠",
        name: "Bellek Güvenliği ve Buffer Overflow Taraması",
        category: "appsec",
        description: "C/C++ ve düşük seviyeli dillerde bellek sızıntısı ve overflow Taraması.",
        layer: 3,
        requires: ["input-validation-spec"],
        prompt: "Bellek Güvenliği (Memory Safety) analizi yap: Buffer Overflow, Use-After-Free ve Memory Leak risklerini tespit edip Rust/RAII gibi güvenli bellek yaklaşımlarına geçiş sağla."
      },
      {
        id: "zero-trust-architecture",
        icon: "🏰",
        name: "Zero-Trust (Sıfır Güven) Mimarisi",
        category: "audit",
        description: "'Asla güvenme, her zaman doğrula' prensibini ağ ve kimlik katmanına uygular.",
        layer: 1,
        requires: [],
        prompt: "Zero-Trust Mimari prensiplerini uygula: 'Never Trust, Always Verify'. İç ve dış ağ ayrımını kaldırarak her istekte sürekli kimlik doğrulama ve en düşük yetki (PoLP) kuralı koy."
      },
      {
        id: "log-audit-trail-spec",
        icon: "📜",
        name"SIEM ve İz Kaydı (Audit Trail) Şartnamesi",
        category: "audit",
        description: "Adli bilişim ve olay müdahalesi için değiştirilemez log altyapısı kurar.",
        layer: 2,
        requires: ["zero-trust-architecture"],
        prompt: "SIEM ve Log Audit Trail mimarisi tasarla: Değiştirilemez (append-only) log kaydı, log bütünlüğü (HMAC), hassas veri maskeleme (PII masking) ve zaman damgası standartlarını belirle."
      },
      {
        id: "identity-access-review",
        icon: "👤",
        name: "Erişim Yetkileri ve Privileged Access (PAM)",
        category: "audit",
        description: "Aşırı yetkili hesapları ve atıl kullanıcı erişimlerini temizler.",
        layer: 2,
        requires: ["zero-trust-architecture"],
        prompt: "PAM (Privileged Access Management) ve En Düşük Yetki (Principle of Least Privilege) denetimi yap: Yetki yükseltme (escalation) yollarını ve yetkisiz admin hesaplarını temizle."
      },
      {
        id: "network-segmentation-audit",
        icon: "🧱",
        name: "Ağ Segmentasyonu ve Mikro-Bölümleme",
        category: "audit",
        description: "Yanal ilerlemeyi (lateral movement) engellemek için ağ güvenliğini böler.",
        layer: 2,
        requires: ["zero-trust-architecture"],
        prompt: "Ağ Segmentasyonu ve Mikro-Bölümleme (Micro-segmentation) denetimi yap: DMZ, Prod ve Dev ortamları arasındaki güvenlik duvarı kurallarını ve izole VLAN yapılarını tasarla."
      },
      {
        id: "crypto-cipher-suite-check",
        icon: "🔒",
        name: "Kriptografi ve Kripto Standartları Denetimi",
        category: "audit",
        description: "Zayıf algoritmaları (MD5, SHA1, DES) ayıklayıp güncel TLS/AES standartlarını zorlar.",
        layer: 3,
        requires: ["zero-trust-architecture"],
        prompt: "Kriptografik Denetim yap: Zayıf algoritmaları (MD5, SHA1, RC4, DES) sistemden temizle. TLS 1.3, AES-256-GCM ve Kuantum Sonrası Kriptografi (PQC) hazırlık planı sun."
      },
      {
        id: "incident-response-readiness",
        icon: "🚨",
        name: "Olay Müdahale (Incident Response) Hazırlığı",
        category: "audit",
        description: "NIST SP 800-61 standartlarında siber olay müdahale planı oluşturur.",
        layer: 3,
        requires: ["log-audit-trail-spec"],
        prompt: "NIST SP 800-61 uyumlu Olay Müdahale Planı (IRP) yaz: Hazırlık, Tespit, Sınırlandırma (Containment), Eradike Etme, İyileştirme ve Ders Çıkarma adımlarını detaylandır."
      },
      {
        id: "pentest-scenario-builder",
        icon: "🎯",
        name: "Sızma Testi Senaryo Kurucu",
        category: "pentest",
        description: "Etik hacker gözüyle hedef sisteme özel sızma testi adımları yazar.",
        layer: 2,
        requires: ["attack-surface-mapping"],
        prompt: "Hedef sisteme özel Sızma Testi (Penetration Test) Senaryosu tasarla: Bilgi Toplama, Keşif, Zafiyet Taraması, Istismar (Exploitation) ve Post-Exploitation adımlarını simüle et."
      },
      {
        id: "social-engineering-vectors",
        icon: "🎣",
        name: "Sosyal Mühendislik Vektörleri",
        category: "pentest",
        description: "Oltalama (Phishing) ve insan odaklı siber tehditleri simüle eder.",
        layer: 2,
        requires: ["pentest-scenario-builder"],
        prompt: "Sosyal Mühendislik ve Phishing simülasyon senaryosu yaz: Hedef odaklı oltalama (Spear Phishing), credential harvesting ve insan faktörüne dayalı sızma vektörlerini analiz et."
      },
      {
        id: "exploit-payload-analysis",
        icon: "💣",
        name: "İstismar (Exploit) ve Payload Analizi",
        category: "pentest",
        description: "Zafiyetin çalıştırılabilir kodla istismar edilme potansiyelini inceler.",
        layer: 3,
        requires: ["pentest-scenario-builder"],
        prompt: "Zafiyetin istismar (Exploitation) dinamiklerini incele: PoC (Proof of Concept) payload mantığını analiz et ve bu payload'u engelleyecek YARA / Snort kurallarını yaz."
      },
      {
        id: "privilege-escalation-check",
        icon: "📈",
        name: "Yetki Yükseltme (PrivEsc) Yolları",
        category: "pentest",
        description: "Düşük yetkili hesaptan root/SYSTEM yetkisine geçiş yollarını tespit eder.",
        layer: 3,
        requires: ["pentest-scenario-builder"],
        prompt: "Yetki Yükseltme (Privilege Escalation) vektörlerini denetle: Linux (SUID, Sudoers, Kernel Exploit) ve Windows (Token Impersonation, Unquoted Service Path) açıklarını tara."
      },
      {
        id: "lateral-movement-pathway",
        icon: "↔️",
        name: "Yanal İlerleme (Lateral Movement) Analizi",
        category: "pentest",
        description: "Ağ içinde makineden makineye sıçrama yollarını engeller.",
        layer: 3,
        requires: ["exploit-payload-analysis"],
        prompt: "Yanal İlerleme (Lateral Movement) patikalarını haritalandır: Pass-the-Hash, Pass-the-Ticket (Kerberos) ve SSH anahtar atlamalarını engelleyecek sertleştirme tedbirlerini al."
      },
      {
        id: "egress-filtering-test",
        icon: "📤",
        name: "Ağ Dışa Akış (Egress) ve Veri Sızıntısı Testi",
        category: "pentest",
        description: "Zararlı yazılımın komuta kontrol (C2) sunucusuyla iletişimini keser.",
        layer: 3,
        requires: ["privilege-escalation-check"],
        prompt: "Ağ Dışa Akış (Egress Filtering) kontrollerini test et: Tünelleme (DNS Tunneling, ICMP Exfiltration) ve C2 (Command & Control) veri sızıntı kanallarını engelle."
      },
      {
        id: "iso27001-gap-analysis",
        icon: "📋",
        name: "ISO 27001 / NIST CSF Boşluk Analizi",
        category: "compliance",
        description: "Siber güvenlik yönetim sistemini uluslararası standartlara göre kıyaslar.",
        layer: 1,
        requires: [],
        prompt: "ISO/IEC 27001:2022 Annex A veya NIST Cybersecurity Framework (CSF) boşluk analizi yap: Mevcut kontrollerin standartla uyum oranını ve eksik politika maddelerini çıkar."
      },
      {
        id: "gdpr-data-privacy-spec",
        icon: "🇪🇺",
        name: "KVKK / GDPR Veri Mahremiyeti Standartları",
        category: "compliance",
        description: "Kişisel verilerin işlenmesi, anonimleştirilmesi ve silinmesi protokolü.",
        layer: 1,
        requires: ["iso27001-gap-analysis"],
        prompt: "KVKK / GDPR Veri Koruma Standartlarını uygula: Veri Minimizasyonu, Anonimleştirme/Pseudonymization, Unutulma Hakkı ve Veri İhlal Bildirimi (72 saat) süreçlerini doğrula."
      },
      {
        id: "soc2-type2-controls",
        icon: "📜",
        name: "SOC 2 Type II Güvenilirlik İlkeleri",
        category: "compliance",
        description: "Güvenlik, Kullanılabilirlik ve Gizlilik ilkelerine operasyonel uyum denetimi.",
        layer: 2,
        requires: ["iso27001-gap-analysis"],
        prompt: "SOC 2 Type II Güvenilirlik Hizmet Kriterlerine (Trust Services Criteria) göre denetle: Güvenlik, Kullanılabilirlik, İşleme Bütünlüğü, Gizlilik ve Mahremiyet kanıtlarını listele."
      },
      {
        id: "supply-chain-risk-audit",
        icon: "🔗",
        name: "Tedarik Zinciri Güvenlik Denetimi",
        category: "compliance",
        description: "Üçüncü taraf kütüphanelerin ve tedarikçilerin güvenlik riskini ölçer.",
        layer: 2,
        requires: ["iso27001-gap-analysis"],
        prompt: "Tedarik Zinciri Risk Analizi (Supply Chain Risk Audit) yap: SBOM (Software Bill of Materials) çıkar, bağımlılıklardaki zafiyetleri (Dependabot/Snyk) ve açık kaynak risklerini tara."
      },
      {
        id: "vulnerability-remediation",
        icon: "🩹",
        name: "Zafiyet Yamalama ve Düzeltme (Remediation)",
        category: "compliance",
        description: "Tespit edilen zafiyetlerin kapatılması için öncelikli yama planı sunar.",
        layer: 3,
        requires: ["soc2-type2-controls"],
        prompt: "Tespit edilen zafiyetler için Kökten Düzeltme (Remediation) Reçetesi yaz: CVSS skoruna göre önceliklendir, geçici çözüm (workaround) ve kalıcı kod düzeltmesini (patch) sun."
      },
      {
        id: "ransomware-resilience-check",
        icon: "☣️",
        name: "Fidye Yazılımı (Ransomware) Dayanıklılığı",
        category: "compliance",
        description: "Sistemin Ransomware saldırılarına karşı yedekleme ve kurtarma direncini test eder.",
        layer: 3,
        requires: ["vulnerability-remediation"],
        prompt: "Ransomware Dayanıklılık Testi yap: 3-2-1 Yedekleme Kuralı, çevrimdışı/değiştirilemez (immutable) yedekleme ve sistem imajından hızlı geri dönme (RTO/RPO) sürelerini doğrula."
      }
    ],
    en: [
      {
        id: "stride-threat-model",
        icon: "🛡️",
        name: "STRIDE Threat Modeling",
        category: "threat",
        description: "Audits systems against the full STRIDE threat categories.",
        layer: 1,
        requires: [],
        prompt: "Perform STRIDE Threat Modeling: Audit system architecture across Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege."
      },
      {
        id: "attack-surface-mapping",
        icon: "🗺️",
        name: "Attack Surface Mapping",
        category: "threat",
        description: "Identifies and maps all exposed endpoints, open ports, and API vectors.",
        layer: 1,
        requires: ["stride-threat-model"],
        prompt: "Map the system Attack Surface: Catalog all public endpoints, open network ports, input fields, and third-party API integration points."
      },
      {
        id: "threat-actor-profiling",
        icon: "🥷",
        name: "Threat Actor Profiling",
        category: "threat",
        description: "Models capabilities, resources, and motivations of adversary profiles.",
        layer: 2,
        requires: ["stride-threat-model"],
        prompt: "Profile potential Threat Actors: Analyze motivations, technical capabilities, and likely attack pathways for Script Kiddies, Insider Threats, APTs, and State-Sponsored actors."
      },
      {
        id: "data-flow-diagram-audit",
        icon: "🔄",
        name: "Data Flow Diagram (DFD) Audit",
        category: "threat",
        description: "Audits data transitions across system trust boundaries.",
        layer: 2,
        requires: ["attack-surface-mapping"],
        prompt: "Audit Level 1 Data Flow Diagrams (DFDs): Identify encryption and authentication gaps where data flows traverse Trust Boundaries."
      },
      {
        id: "dread-risk-scoring",
        icon: "📊",
        name: "DREAD Risk Scoring",
        category: "threat",
        description: "Prioritizes threats using the DREAD scoring model.",
        layer: 2,
        requires: ["stride-threat-model"],
        prompt: "Score threats using DREAD: Assign 1-10 scores for Damage Potential, Reproducibility, Exploitability, Affected Users, and Discoverability."
      },
      {
        id: "attack-tree-construction",
        icon: "🌲",
        name: "Attack Tree Construction",
        category: "threat",
        description: "Models multi-stage dependent and alternate attack pathways to root goals.",
        layer: 3,
        requires: ["attack-surface-mapping"],
        prompt: "Construct an Attack Tree for root target compromise: Model attack sub-goals using AND/OR logic gates and assign cost/complexity attributes to steps."
      },
      {
        id: "owasp-top10-scanner",
        icon: "🐛",
        name: "OWASP Top 10 Security Audit",
        category: "appsec",
        description: "Audits applications against the top 10 web application vulnerabilities.",
        layer: 1,
        requires: [],
        prompt: "Audit application against OWASP Top 10 vulnerabilities (Injection, Broken Auth, Sensitive Data Exposure, XXE, Broken Access Control, Misconfig, XSS, etc.)."
      },
      {
        id: "input-validation-spec",
        icon: "🧼",
        name: "Input Validation & Sanitization",
        category: "appsec",
        description: "Defines strict input filtering to neutralize SQLi, XSS, and Injection risks.",
        layer: 1,
        requires: ["owasp-top10-scanner"],
        prompt: "Write Strict Input Validation Specs: Enforce allowlist validation, prepared statements for database queries, and context-aware output encoding."
      },
      {
        id: "auth-authz-hardener",
        icon: "🔑",
        name: "AuthN & AuthZ Hardening",
        category: "appsec",
        description: "Hardens authentication, authorization, JWT handling, and access controls.",
        layer: 2,
        requires: ["owasp-top10-scanner"],
        prompt: "Harden AuthN/AuthZ architecture: Secure JWT signing/expiration, enforce fine-grained RBAC/ABAC controls, and mitigate BOLA/IDOR vulnerabilities."
      },
      {
        id: "api-security-checklist",
        icon: "🔌",
        name: "API Security Audit",
        category: "appsec",
        description: "Audits endpoints against OWASP API Security Top 10 standards.",
        layer: 2,
        requires: ["owasp-top10-scanner"],
        prompt: "Audit endpoints against OWASP API Security Top 10: Check rate limiting, CORS configuration, API gateway authentication, and sensitive data exposure."
      },
      {
        id: "secrets-management-audit",
        icon: "🔐",
        name: "Secrets Management Audit",
        category: "appsec",
        description: "Detects hardcoded secrets and enforces secure vault management.",
        layer: 2,
        requires: ["auth-authz-hardener"],
        prompt: "Audit secrets management: Scan codebases for hardcoded API keys, private keys, and database credentials. Enforce HashiCorp Vault or KMS integration."
      },
      {
        id: "memory-safety-checker",
        icon: "🧠",
        name: "Memory Safety & Buffer Overflow",
        category: "appsec",
        description: "Identifies low-level memory leaks, pointer flaws, and buffer overflows.",
        layer: 3,
        requires: ["input-validation-spec"],
        prompt: "Audit memory safety: Identify buffer overflow, use-after-free, and memory leak vulnerabilities, recommending safe memory patterns (Rust/RAII)."
      },
      {
        id: "zero-trust-architecture",
        icon: "🏰",
        name: "Zero-Trust Architecture Spec",
        category: "audit",
        description: "Applies 'Never Trust, Always Verify' across networks and identities.",
        layer: 1,
        requires: [],
        prompt: "Apply Zero-Trust Architecture principles: 'Never Trust, Always Verify'. Eliminate implicit network trust and enforce continuous identity verification and least privilege (PoLP)."
      },
      {
        id: "log-audit-trail-spec",
        icon: "📜",
        name: "SIEM & Audit Trail Spec",
        category: "audit",
        description: "Designs tamper-evident logging infrastructure for forensics and incident response.",
        layer: 2,
        requires: ["zero-trust-architecture"],
        prompt: "Specify SIEM & Audit Trail Architecture: Enforce append-only immutable logs, cryptographic log integrity (HMAC), PII masking, and unified NTP timestamping."
      },
      {
        id: "identity-access-review",
        icon: "👤",
        name: "Privileged Access Management (PAM)",
        category: "audit",
        description: "Audits account permissions and enforces Principle of Least Privilege.",
        layer: 2,
        requires: ["zero-trust-architecture"],
        prompt: "Audit Privileged Access Management (PAM): Eliminate privilege escalation vectors, orphan accounts, and unneeded administrator permissions."
      },
      {
        id: "network-segmentation-audit",
        icon: "🧱",
        name: "Network Micro-Segmentation",
        category: "audit",
        description: "Segments network zones to block lateral adversary movement.",
        layer: 2,
        requires: ["zero-trust-architecture"],
        prompt: "Audit network micro-segmentation: Review firewall rules, DMZ isolation, and VLAN boundaries to prevent lateral movement across environments."
      },
      {
        id: "crypto-cipher-suite-check",
        icon: "🔒",
        name: "Cryptographic Standards Audit",
        category: "audit",
        description: "Phases out weak ciphers and enforces modern TLS/AES standards.",
        layer: 3,
        requires: ["zero-trust-architecture"],
        prompt: "Audit cryptographic implementations: Deprecate legacy ciphers (MD5, SHA1, DES, RC4) and enforce TLS 1.3, AES-256-GCM, and Post-Quantum Cryptography (PQC) readiness."
      },
      {
        id: "incident-response-readiness",
        icon: "🚨",
        name: "Incident Response Readiness",
        category: "audit",
        description: "Develops incident response plans following NIST SP 800-61.",
        layer: 3,
        requires: ["log-audit-trail-spec"],
        prompt: "Draft a NIST SP 800-61 compliant Incident Response Plan (IRP): Detail steps for Preparation, Detection & Analysis, Containment, Eradication, Recovery, and Post-Incident lessons."
      },
      {
        id: "pentest-scenario-builder",
        icon: "🎯",
        name: "Penetration Testing Scenario Builder",
        category: "pentest",
        description: "Designs ethical hacking exploitation scenarios customized to target systems.",
        layer: 2,
        requires: ["attack-surface-mapping"],
        prompt: "Build an ethical Penetration Testing Scenario: Detail Reconnaissance, Vulnerability Discovery, Exploitation, and Post-Exploitation phases."
      },
      {
        id: "social-engineering-vectors",
        icon: "🎣",
        name: "Social Engineering Vectors",
        category: "pentest",
        description: "Simulates phishing and human-centric security breach scenarios.",
        layer: 2,
        requires: ["pentest-scenario-builder"],
        prompt: "Develop Social Engineering & Spear Phishing simulation vectors: Analyze credential harvesting, pretexting, and human-element entry points."
      },
      {
        id: "exploit-payload-analysis",
        icon: "💣",
        name: "Exploit & Payload Analysis",
        category: "pentest",
        description: "Analyzes executable payload mechanics to author detection signatures.",
        layer: 3,
        requires: ["pentest-scenario-builder"],
        prompt: "Analyze exploit payload mechanics: Evaluate Proof of Concept (PoC) code and author defensive YARA / Snort detection signatures."
      },
      {
        id: "privilege-escalation-check",
        icon: "📈",
        name: "Privilege Escalation Audit",
        category: "pentest",
        description: "Identifies pathways from low-privilege access to root/SYSTEM authority.",
        layer: 3,
        requires: ["pentest-scenario-builder"],
        prompt: "Audit Privilege Escalation vectors: Scan for Linux (SUID bits, sudoers misconfigurations) and Windows (Token Impersonation, Unquoted Service Paths) flaws."
      },
      {
        id: "lateral-movement-pathway",
        icon: "↔️",
        name: "Lateral Movement Pathway Analysis",
        category: "pentest",
        description: "Maps and blocks internal lateral pivoting across networked hosts.",
        layer: 3,
        requires: ["exploit-payload-analysis"],
        prompt: "Map Lateral Movement pathways: Design defensive controls against Pass-the-Hash, Pass-the-Ticket (Kerberos), and SSH key pivoting."
      },
      {
        id: "egress-filtering-test",
        icon: "📤",
        name: "Egress Filtering & Data Exfiltration",
        category: "pentest",
        description: "Tests egress controls against C2 tunneling and covert data leaks.",
        layer: 3,
        requires: ["privilege-escalation-check"],
        prompt: "Audit Egress Filtering controls: Test network boundaries against covert exfiltration channels including DNS Tunneling, ICMP leaks, and C2 beacons."
      },
      {
        id: "iso27001-gap-analysis",
        icon: "📋",
        name: "ISO 27001 / NIST CSF Gap Analysis",
        category: "compliance",
        description: "Evaluates information security management against international frameworks.",
        layer: 1,
        requires: [],
        prompt: "Perform ISO/IEC 27001:2022 or NIST CSF Gap Analysis: Evaluate baseline control coverage and document missing policy/technical controls."
      },
      {
        id: "gdpr-data-privacy-spec",
        icon: "🇪🇺",
        name: "GDPR / Data Privacy Specification",
        category: "compliance",
        description: "Audits data minimisation, pseudonymisation, and regulatory compliance.",
        layer: 1,
        requires: ["iso27001-gap-analysis"],
        prompt: "Enforce GDPR / Data Privacy Compliance: Audit Data Minimization, Pseudonymization, Right to be Forgotten protocols, and 72-hour breach notification readiness."
      },
      {
        id: "soc2-type2-controls",
        icon: "📜",
        name: "SOC 2 Type II Trust Criteria Audit",
        category: "compliance",
        description: "Audits operational effectiveness across Security, Availability, and Confidentiality.",
        layer: 2,
        requires: ["iso27001-gap-analysis"],
        prompt: "Audit against SOC 2 Type II Trust Services Criteria: Document operational evidence across Security, Availability, Processing Integrity, and Confidentiality."
      },
      {
        id: "supply-chain-risk-audit",
        icon: "🔗",
        name: "Software Supply Chain Audit",
        category: "compliance",
        description: "Audits third-party open-source dependencies and SBOM risks.",
        layer: 2,
        requires: ["iso27001-gap-analysis"],
        prompt: "Perform Software Supply Chain Risk Audit: Generate Software Bill of Materials (SBOM), scan open-source dependencies for known vulnerabilities (CVEs), and audit vendor risks."
      },
      {
        id: "vulnerability-remediation",
        icon: "🩹",
        name: "Vulnerability Remediation Plan",
        category: "compliance",
        description: "Prioritizes vulnerability patching based on CVSS metrics and operational risk.",
        layer: 3,
        requires: ["soc2-type2-controls"],
        prompt: "Formulate a Vulnerability Remediation Roadmap: Prioritize flaws by CVSS score, providing immediate operational workarounds and permanent patch code snippets."
      },
      {
        id: "ransomware-resilience-check",
        icon: "☣️",
        name: "Ransomware Resilience Audit",
        category: "compliance",
        description: "Evaluates backup immutability, disaster recovery, and RTO/RPO targets.",
        layer: 3,
        requires: ["vulnerability-remediation"],
        prompt: "Conduct a Ransomware Resilience Audit: Verify 3-2-1 backup architecture, offline/immutable storage enforcement, and bare-metal recovery time objectives (RTO/RPO)."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 7. BLOG (Blog & Editoryal Analiz - BLOG.md Spec)
  // ---------------------------------------------------------------------------
  blog: {
    tr: [
      {
        id: "audience-intent-triage",
        icon: "🎯",
        name: "Kitle ve Niyet Triyajı",
        category: "triage",
        description: "Okuyucunun arama niyetini (Search Intent) ve uzmanlık seviyesini belirler.",
        layer: 1,
        requires: [],
        prompt: "Hedef kitle ve arama niyeti (Search Intent) triyajı yap: Okuyucu kim? (Yeni başlayan, uygulayıcı, karar verici). Aradığı şey bilgi mi (informational), çözüm mü (transactional) yoksa karşılaştırma mı?"
      },
      {
        id: "thesis-sharpener",
        icon: "🗡️",
        name: "Tez ve Ana Fikir Keskinleştirici",
        category: "triage",
        description: "Yazının tek bir güçlü, savunulabilir ve radikal iddiasını belirler.",
        layer: 1,
        requires: ["audience-intent-triage"],
        prompt: "Yazının Ana İddiasını (Thesis Statement) keskinleştir: Yazı tek bir cümleyle neyi savunuyor? Jenerik ve herkesin bildiği doğrular yerine aykırı veya özgün açıyı (unique angle) ön plana çıkar."
      },
      {
        id: "core-hook-extractor",
        icon: "🪝",
        name: "Kritik Çengel (Hook) Çıkarıcı",
        category: "triage",
        description: "İlk 3 saniyede okuyucunun dikkatini kilitleyen çengeller tasarlar.",
        layer: 1,
        requires: ["thesis-sharpener"],
        prompt: "Giriş paragrafı için 3 alternatif Çengel (Hook) oluştur: (a) Şaşırtıcı bir istatistik, (b) Zihinsel bir paradoks veya counter-intuitive soru, (c) Doğrudan yüksek gerilimli mikro-hikaye."
      },
      {
        id: "tone-authority-setter",
        icon: "🎙️",
        name: "Ton ve Otorite Ayarlayıcı",
        category: "triage",
        description: "Metnin editoryal duruşunu (pragmatik, samimi, akademik) ayarlar.",
        layer: 2,
        requires: ["audience-intent-triage"],
        prompt: "Editoryal tonu ayarla: Konu uzmanı ama kibirsiz, pragmatik ve doğrudan sadede gelen 'Senior Editor' üslubu kur. Pazarlamacı (salesy) dili tamamen reddet."
      },
      {
        id: "value-prop-alignment",
        icon: "💎",
        name: "Değer Önerisi Hizalaması",
        category: "triage",
        description: "Okuyucunun yazıyı okuduktan sonra kazanacağı somut çıktıyı netleştirir.",
        layer: 2,
        requires: ["thesis-sharpener"],
        prompt: "Okuyucunun 'Bu yazıyı okumak bana ne kazandıracak?' sorusuna yanıt ver: Okuma sonunda cebinde götüreceği 3 somut uygulanabilir çıktıyı (actionable takeaways) tanımla."
      },
      {
        id: "content-angle-pivot",
        icon: "🔄",
        name: "İçerik Açısı (Angle) Pivotu",
        category: "triage",
        description: "Sıradan bir konuyu radikal ve özgün bir perspektife kaydırır.",
        layer: 2,
        requires: ["core-hook-extractor"],
        prompt: "İçerik açısını kaydır: Sektördeki 100 benzer blog yazısından farklı olarak, bu konuyu hangi radikal veya unutulmuş lens arkasından inceleyeceğiz?"
      },
      {
        id: "evidence-hierarchy-audit",
        icon: "📊",
        name: "Kanıt Hiyerarşisi Denetimi (BLOG.md)",
        category: "evidence",
        description: "İddiaları SAĞLAM, KÜÇÜLDÜ, TARTIŞMALI, BİLİNMİYOR veya ÇÖKTÜ olarak etiketler.",
        layer: 2,
        requires: ["thesis-sharpener"],
        prompt: "BLOG.md Kanıt Hiyerarşisi denetimi yap: Yazıdaki tüm iddiaları incele ve her birini etiketle: [SAĞLAM] (doğrulanmış ampirik veri), [KÜÇÜLDÜ] (sınırlı geçerlilik), [TARTIŞMALI] (akademik anlaşmazlık), [BİLİNMİYOR] (yeterli veri yok), [ÇÖKTÜ] (yanlışlanmış iddia)."
      },
      {
        id: "claim-verification-grid",
        icon: "🔍",
        name: "İddia Doğrulama Matrisi",
        category: "evidence",
        description: "Soyut iddiaları somut vaka çalışmaları ve istatistiklerle destekler.",
        layer: 2,
        requires: ["evidence-hierarchy-audit"],
        prompt: "İddia Doğrulama Matrisi kur: Metindeki her soyut tez için en az 1 adet ampirik veri, vaka çalışması veya sektör örneği eşleştir."
      },
      {
        id: "data-citation-scrubber",
        icon: "🧹",
        name: "Veri ve Atıf Ayıklayıcı",
        category: "evidence",
        description: "Tarihi geçmiş, kaynağı belirsiz veya uydurma istatistikleri temizler.",
        layer: 2,
        requires: ["claim-verification-grid"],
        prompt: "İstatistik ve veri temizliği yap: Kaynağı gösterilmeyen tüm 'araştırmalara göre' veya 'uzmanlar diyor ki' gibi yuvarlak lafları sil. Yerine spesifik rapor ve yıl ismi koy."
      },
      {
        id: "anecdotal-evidence-test",
        icon: "📖",
        name: "Anekdotsal Kanıt Testi",
        category: "evidence",
        description: "Tekil hikayelerin genelleme gibi sunulmasını engeller.",
        layer: 2,
        requires: ["evidence-hierarchy-audit"],
        prompt: "Anekdotsal kanıt kontrolü yap: Kişisel deneyim veya tekil başarı hikayelerinin sistematik bir kural gibi sunulup sunulmadığını denetle."
      },
      {
        id: "expert-quote-integration",
        icon: "💬",
        name: "Uzman Görüşü ve Alıntı Entegrasyonu",
        category: "evidence",
        description: "Alanında otorite isimlerin nitelikli görüşlerini metne yedirir.",
        layer: 3,
        requires: ["data-citation-scrubber"],
        prompt: "Metne tanınmış sektör uzmanlarının veya akademisyenlerin 2 adet doğrudan, yüksek etki gücüne sahip alıntısını entegre et."
      },
      {
        id: "counter-evidence-check",
        icon: "⚖️",
        name: "Karşıt Kanıt Taraması",
        category: "evidence",
        description: "Savunulan teze zıt ampirik verileri açıkça kabul eder ve tartışır.",
        layer: 3,
        requires: ["claim-verification-grid"],
        prompt: "Savunulan teze zıt düşen en güçlü ampirik veriyi tespit et ve metin içinde bu karşıt kanıtı adil bir şekilde tartışarak tezini güçlendir."
      },
      {
        id: "steelman-counter-arg",
        icon: "🛡️",
        name: "Karşıt Görüşü Steelman Etme",
        category: "dialectic",
        description: "Okuyucunun olası itirazlarını samimiyetle ve en güçlü haliyle ele alır.",
        layer: 2,
        requires: ["thesis-sharpener"],
        prompt: "Okuyucunun aklına gelecek en büyük 2 itirazı 'Steelman' ederek yazının içine yerleştir: Karşı argümanı haklı yönleriyle kabul et, ardından ana tezin neden hala geçerli olduğunu göster."
      },
      {
        id: "dialectic-synthesis-flow",
        icon: "☯️",
        name: "Diyalektik Akış (Tez-Antitez-Sentez)",
        category: "dialectic",
        description: "Yazıyı yüzeysel bir listeden derin bir diyalektik anlatıya dönüştürür.",
        layer: 2,
        requires: ["steelman-counter-arg"],
        prompt: "Yazının ana gövdesini diyalektik akışla kurgula: (a) Yaygın Kabul (Tez), (b) Kırılma Noktası ve İtiraz (Antitez), (c) Yeni Bütüncül Yaklaşım (Sentez)."
      },
      {
        id: "nuance-injector",
        icon: "🎨",
        name: "Nüans Enjektörü",
        category: "dialectic",
        description: "Siyah-beyaz anlatıları gri alanlar ve koşullu geçerlilikle zenginleştirir.",
        layer: 2,
        requires: ["dialectic-synthesis-flow"],
        prompt: "Metne nüans kat: 'Bu yaklaşım her zaman çalışır' demek yerine, hangi koşullarda (bağlam, ölçek, bütçe) İŞLEMEDİĞİNİ gösteren gri alanları ekle."
      },
      {
        id: "cognitive-dissonance-hook",
        icon: "⚡",
        name: "Bilişsel Çelişki Kurgusu",
        category: "dialectic",
        description: "Okuyucunun mevcut kabullerini sarsarak merak uyandırır.",
        layer: 3,
        requires: ["steelman-counter-arg"],
        prompt: "Bilişsel Çelişki (Cognitive Dissonance) yarat: Okuyucunun doğru bildiği bir uygulamanın aslında ona nasıl zarar verdiğini göstererek zihinsel bir kıvılcım çak."
      },
      {
        id: "paradox-resolution-narrative",
        icon: "🧩",
        name: "Paradox Çözüm Anlatısı",
        category: "dialectic",
        description: "Sektörel bir çelişkiyi veya paradoksu çözüme kavuşturan hikaye dizilimi.",
        layer: 3,
        requires: ["dialectic-synthesis-flow"],
        prompt: "Konunun göbeğindeki sektörel paradoksu tanımla ve yazının sonunda bu paradoksu çözen zihinsel modeli sun."
      },
      {
        id: "multiple-perspectives-grid",
        icon: "🌐",
        name: "Çoklu Perspektif Matrisi",
        category: "dialectic",
        description: "Konuyu geliştirici, yönetici ve müşteri gözünden eşzamanlı değerlendirir.",
        layer: 3,
        requires: ["nuance-injector"],
        prompt: "Konuyu 3 farklı aktörün (Örn: Geliştirici, CEO, Müşteri) penceresinden aynı anda değerlendiren çok katmanlı bir analiz paragrafı ekle."
      },
      {
        id: "outline-builder-notes",
        icon: "📝",
        name: "Taslak Mimarı ve YAZIM NOTU (BLOG.md)",
        category: "structure",
        description: "Her alt başlığa [YAZIM NOTU: Ton/Amaç] direktifleri ekleyerek taslağı kurar.",
        layer: 1,
        requires: [],
        prompt: "BLOG.md standartlarında Taslak (Outline) oluştur: Her H2 ve H3 alt başlığının altına dikli parantez içinde `[YAZIM NOTU: Bu bölümde X verisi verilecek, ton sert olacak ve Y klisesinden kaçınılacak]` talimatı ekle."
      },
      {
        id: "section-transition-pacing",
        icon: "⏱️",
        name: "Bölüm Geçişleri ve Tempo (Pacing)",
        category: "structure",
        description: "Uzun metinlerde okuyucunun kopmasını engelleyen ritmik geçişler kurar.",
        layer: 2,
        requires: ["outline-builder-notes"],
        prompt: "Bölüm geçişlerini ve okuma temposunu düzenle: Uzun ve derin analiz paragraflarının ardından kısa, vurucu ve özetleyici tek cümlelik geçişler yerleştir."
      },
      {
        id: "pyramid-principle",
        icon: "🔺",
        name: "Piramit İlkesi (Minto Pyramid)",
        category: "structure",
        description: "Önce ana sonucu/çözümü söyler, ardından destekleyici nedenlere inip detayı verir.",
        layer: 2,
        requires: ["outline-builder-notes"],
        prompt: "McKinsey Piramit İlkesini (Minto Pyramid Principle) uygula: Her paragrafın ve bölümün İLK cümlesinde ana mesajı/sonucu ver, ardından gelen cümlelerde kanıt ve detaylandır."
      },
      {
        id: "skimmability-formatter",
        icon: "👀",
        name: "Gözle Taranabilirlik (Skimmability) Formatı",
        category: "structure",
        description: "Kalın vurgular, maddeler ve çağrı kutuları (callout) ile taranabilirlik sağlar.",
        layer: 2,
        requires: ["section-transition-pacing"],
        prompt: "Metni gözle taranabilir yap: Yalnızca anahtar kavramları **koyu** yaz, uzun listeleri maddelere böl ve en kritik mesajı `> Callout Kutusu` içine al."
      },
      {
        id: "key-takeaway-distiller",
        icon: "💡",
        name: "Özet Notlar (TL;DR) Kutusu",
        category: "structure",
        description: "Yazının başında veya sonunda 3 maddelik yönetici özeti çıkarır.",
        layer: 2,
        requires: ["pyramid-principle"],
        prompt: "Yazının hemen girişine '3 Cümlede Özet (TL;DR)' kutusu ekle. Acelesi olan okuyucunun ana fikri 5 saniyede almasını sağla."
      },
      {
        id: "article-closure-callout",
        icon: "🚀",
        name: "Kapanış ve Eylem Çağrısı (CTA)",
        category: "structure",
        description: "Satış odaklı olmayan, entelektüel bir tartışma veya eylem çağrısı tasarlar.",
        layer: 3,
        requires: ["key-takeaway-distiller"],
        prompt: "Kapanış bölümünü kurgula: Pazarlamacı CTA'ları yerine, okuyucuyu kendi sistemini sorgulamaya davet eden entelektüel bir kapanış sorusu veya uygulama adımı yaz."
      },
      {
        id: "pop-culture-cliche-filter",
        icon: "🚫",
        name: "Pop-Kültür ve AI Klişe Filtresi",
        category: "anti-patterns",
        description: "'Game-changer', 'Revolutionary', 'Delve', 'Unpack' gibi klişeleri bıçak gibi keser.",
        layer: 2,
        requires: ["tone-authority-setter"],
        prompt: "Metinden tüm pazarlama klişelerini ve AI jargonu lafları temizle: 'Oyunun kurallarını değiştiren', 'Devrim niteliğinde', 'Derinlemesine incelemek', 'Gelecek burada' gibi lafları tamamen sil."
      },
      {
        id: "ai-jargon-slasher",
        icon: "⚔️",
        name: "Yapay Zeka Metin İzleri Temizliği",
        category: "anti-patterns",
        description: "LLM metinlerinin karakteristik bağlaçlarını ve simetrik yapısını kırar.",
        layer: 2,
        requires: ["pop-culture-cliche-filter"],
        prompt: "AI yapaylığını sil: 'Öte yandan', 'Sonuç olarak', 'Bununla birlikte' gibi aşırı kullanılan bağlaçları azalt. Paragraf uzunluklarını insan ritmine uygun şekilde rasgeleleştir."
      },
      {
        id: "fluff-sentence-remover",
        icon: "✂️",
        name: "Laf Kalabalığı (Fluff) Budayıcı",
        category: "anti-patterns",
        description: "Anlama katkısı sağlamayan tüm dolgu cümlelerini çıkarır.",
        layer: 2,
        requires: ["ai-jargon-slasher"],
        prompt: "Sıkı Metin Budaması: Sıfır bilgi değeri taşıyan, sadece yer kaplayan tüm dolgu cümlelerini sil. Metni en az %20 oranında kısaltarak yoğunlaştır."
      },
      {
        id: "passive-voice-trimmer",
        icon: "🧹",
        name: "Edilgen Dili Etken Dile Çevirme",
        category: "anti-patterns",
        description: "Yazının enerjisini düşüren edilgen cümleleri doğrudan etken eylemlere dönüştürür.",
        layer: 2,
        requires: ["fluff-sentence-remover"],
        prompt: "Cümlelerdeki edilgen (passive) çatıları aktif ve canlı etken eylemlere dönüştür. (Örn: 'Sistem tarafından hata yapıldı' -> 'Sistem hata yaptı')."
      },
      {
        id: "clickbait-de-escalator",
        icon: "🧯",
        name: "Tık Tuzağı (Clickbait) Nötrleme",
        category: "anti-patterns",
        description: "Aşırı abartılı başlık ve iddiaları editoryal dürüstlük seviyesine çeker.",
        layer: 3,
        requires: ["pop-culture-cliche-filter"],
        prompt: "Başlık ve alt başlıklardaki tık tuzağı (clickbait) abartılarını temizle. Başlığı yazının GERÇEKTEN sunduğu içerikle %100 dürüst seviyeye hizala."
      },
      {
        id: "repetition-purger",
        icon: "🔄",
        name: "Tekrar ve Tautology Temizliği",
        category: "anti-patterns",
        description: "Farklı kelimelerle aynı şeyi söyleyen yinelenen paragrafları siler.",
        layer: 3,
        requires: ["fluff-sentence-remover"],
        prompt: "Metindeki fikir tekrarlarını (Tautology) ve farklı kelimelerle aynı düşünceyi geveleyen tüm paragrafları tespit edip tek bir güçlü cümleye indirge."
      }
    ],
    en: [
      {
        id: "audience-intent-triage",
        icon: "🎯",
        name: "Audience & Intent Triage",
        category: "triage",
        description: "Diagnoses search intent and reader expertise profiles.",
        layer: 1,
        requires: [],
        prompt: "Triage audience profile and search intent: Is the reader a beginner, practitioner, or decision-maker? Are they seeking informational background, practical solutions, or comparative analysis?"
      },
      {
        id: "thesis-sharpener",
        icon: "🗡️",
        name: "Thesis Statement Sharpener",
        category: "triage",
        description: "Sharpens the article into a single, highly defensible, non-obvious core claim.",
        layer: 1,
        requires: ["audience-intent-triage"],
        prompt: "Sharpen the core thesis statement: What singular, non-obvious claim does this article defend? Reject generic advice in favor of a unique, opinionated angle."
      },
      {
        id: "core-hook-extractor",
        icon: "🪝",
        name: "Attention Hook Crafting",
        category: "triage",
        description: "Crafts high-impact opening hooks designed to lock reader attention in 3 seconds.",
        layer: 1,
        requires: ["thesis-sharpener"],
        prompt: "Construct 3 opening hook variations: (a) Counter-intuitive empirical statistic, (b) Provocative paradox question, or (c) High-tension narrative micro-scene."
      },
      {
        id: "tone-authority-setter",
        icon: "🎙️",
        name: "Editorial Tone & Authority",
        category: "triage",
        description: "Establishes a pragmatic, authoritative 'Senior Editor' voice free of sales fluff.",
        layer: 2,
        requires: ["audience-intent-triage"],
        prompt: "Establish editorial voice: Adopt an authoritative, pragmatic 'Senior Editor' tone that gets straight to the point while stripping out salesy fluff."
      },
      {
        id: "value-prop-alignment",
        icon: "💎",
        name: "Value Proposition Alignment",
        category: "triage",
        description: "Explicitly defines concrete reader takeaways and actionable value.",
        layer: 2,
        requires: ["thesis-sharpener"],
        prompt: "Answer the reader's 'So What?': Explicitly define 3 concrete, actionable takeaways the reader will retain after finishing the piece."
      },
      {
        id: "content-angle-pivot",
        icon: "🔄",
        name: "Content Angle Pivot",
        category: "triage",
        description: "Pivots conventional topics toward a radical, memorable editorial angle.",
        layer: 2,
        requires: ["core-hook-extractor"],
        prompt: "Pivot the content angle: Differentiate from 100 generic articles by reframing the topic through an unexpected, rigorous perspective."
      },
      {
        id: "evidence-hierarchy-audit",
        icon: "📊",
        name: "Evidence Hierarchy Audit (BLOG.md)",
        category: "evidence",
        description: "Tags all claims as SOLID, DIMINISHED, CONTESTED, UNKNOWN, or COLLAPSED.",
        layer: 2,
        requires: ["thesis-sharpener"],
        prompt: "Execute BLOG.md Evidence Hierarchy audit: Audit every claim and tag it explicitly as [SOLID] (verified empirical data), [DIMINISHED] (limited scope), [CONTESTED] (scholarly debate), [UNKNOWN] (insufficient data), or [COLLAPSED] (falsified claim)."
      },
      {
        id: "claim-verification-grid",
        icon: "🔍",
        name: "Claim Verification Grid",
        category: "evidence",
        description: "Pairs every abstract assertion with concrete empirical data or case studies.",
        layer: 2,
        requires: ["evidence-hierarchy-audit"],
        prompt: "Build a Claim Verification Grid: Pair every abstract assertion in the text with at least one piece of empirical data, case study, or real-world evidence."
      },
      {
        id: "data-citation-scrubber",
        icon: "🧹",
        name: "Data Citation Scrubber",
        category: "evidence",
        description: "Purges vague attributions ('studies show') and inserts precise sources.",
        layer: 2,
        requires: ["claim-verification-grid"],
        prompt: "Scrub data citations: Eliminate vague phrases like 'research proves' or 'experts say'. Replace them with specific study names, authors, and publication years."
      },
      {
        id: "anecdotal-evidence-test",
        icon: "📖",
        name: "Anecdotal Evidence Test",
        category: "evidence",
        description: "Prevents isolated personal anecdotes from being framed as systemic truths.",
        layer: 2,
        requires: ["evidence-hierarchy-audit"],
        prompt: "Audit anecdotal evidence: Ensure isolated personal experiences or single case studies are not presented as universal systemic rules."
      },
      {
        id: "expert-quote-integration",
        icon: "💬",
        name: "Expert Quote Integration",
        category: "evidence",
        description: "Weaves high-authority domain quotes directly into prose.",
        layer: 3,
        requires: ["data-citation-scrubber"],
        prompt: "Integrate 2 direct, high-impact quotes from recognized domain authorities or academic researchers to reinforce key arguments."
      },
      {
        id: "counter-evidence-check",
        icon: "⚖️",
        name: "Counter-Evidence Review",
        category: "evidence",
        description: "Transparently addresses empirical data contradicting the central thesis.",
        layer: 3,
        requires: ["claim-verification-grid"],
        prompt: "Identify the single strongest piece of empirical evidence contradicting the main thesis and address it directly to strengthen article credibility."
      },
      {
        id: "steelman-counter-arg",
        icon: "🛡️",
        name: "Steelman Opposition Arguments",
        category: "dialectic",
        description: "Addresses key reader counter-arguments in their strongest possible form.",
        layer: 2,
        requires: ["thesis-sharpener"],
        prompt: "Steelman the top 2 reader objections within the text: Present opposing arguments in their strongest form before demonstrating why the primary thesis holds."
      },
      {
        id: "dialectic-synthesis-flow",
        icon: "☯️",
        name: "Dialectic Narrative Flow",
        category: "dialectic",
        description: "Structures body text into Thesis-Antithesis-Synthesis progression.",
        layer: 2,
        requires: ["steelman-counter-arg"],
        prompt: "Structure body prose into a dialectic progression: (a) Conventional Wisdom (Thesis), (b) The Flaw & Tension (Antithesis), (c) The Higher-Order Framework (Synthesis)."
      },
      {
        id: "nuance-injector",
        icon: "🎨",
        name: "Nuance & Context Injector",
        category: "dialectic",
        description: "Replaces absolute statements with nuanced context boundaries.",
        layer: 2,
        requires: ["dialectic-synthesis-flow"],
        prompt: "Inject nuanced scope limits: Replace sweeping claims ('This works every time') with explicit boundary conditions detailing where and when the approach fails."
      },
      {
        id: "cognitive-dissonance-hook",
        icon: "⚡",
        name: "Cognitive Dissonance Hook",
        category: "dialectic",
        description: "Sparks curiosity by exposing flaws in comfortable industry assumptions.",
        layer: 3,
        requires: ["steelman-counter-arg"],
        prompt: "Generate cognitive dissonance: Show how a comfortable industry best practice actively harms readers, sparking urgency to learn the alternative."
      },
      {
        id: "paradox-resolution-narrative",
        icon: "🧩",
        name: "Paradox Resolution Narrative",
        category: "dialectic",
        description: "Frames article narrative around resolving a central domain paradox.",
        layer: 3,
        requires: ["dialectic-synthesis-flow"],
        prompt: "Frame the article around a core domain paradox and guide the reader toward a mental model that reconciles the contradiction."
      },
      {
        id: "multiple-perspectives-grid",
        icon: "🌐",
        name: "Multi-Perspective Analysis",
        category: "dialectic",
        description: "Evaluates topics across practitioner, executive, and customer viewpoints.",
        layer: 3,
        requires: ["nuance-injector"],
        prompt: "Incorporate a multi-perspective analysis evaluating the topic simultaneously through the lenses of practitioners, executives, and end-users."
      },
      {
        id: "outline-builder-notes",
        icon: "📝",
        name: "Outline Builder with [WRITING NOTES]",
        category: "structure",
        description: "Constructs outlines with explicit bracketed [WRITING NOTE] directives (BLOG.md).",
        layer: 1,
        requires: [],
        prompt: "Build an outline following BLOG.md specs: Beneath every H2/H3 header, insert bracketed directives `[WRITING NOTE: Target data X, maintain tone Y, avoid cliché Z]`."
      },
      {
        id: "section-transition-pacing",
        icon: "⏱️",
        name: "Section Transition Pacing",
        category: "structure",
        description: "Optimizes reading rhythm by alternating deep analysis with punchy bridges.",
        layer: 2,
        requires: ["outline-builder-notes"],
        prompt: "Optimize section transitions and pacing: Follow dense analytical paragraphs with short, punchy summary transition statements."
      },
      {
        id: "pyramid-principle",
        icon: "🔺",
        name: "Minto Pyramid Principle",
        category: "structure",
        description: "Leads paragraphs with core conclusions followed by supporting evidence.",
        layer: 2,
        requires: ["outline-builder-notes"],
        prompt: "Apply Minto Pyramid Principle: State the core takeaway in the FIRST sentence of each section before providing supporting evidence and detail."
      },
      {
        id: "skimmability-formatter",
        icon: "👀",
        name: "Skimmability Formatting",
        category: "structure",
        description: "Enhances visual scanning using bolding, bulleting, and callout boxes.",
        layer: 2,
        requires: ["section-transition-pacing"],
        prompt: "Format for high skimmability: Bold key concepts sparingly, break long sequences into bullet lists, and isolate core takeaways inside `> Callout Blocks`."
      },
      {
        id: "key-takeaway-distiller",
        icon: "💡",
        name: "TL;DR Executive Summary",
        category: "structure",
        description: "Distills full article value into a top-of-page 3-bullet summary.",
        layer: 2,
        requires: ["pyramid-principle"],
        prompt: "Distill a top-of-page '3-Bullet Executive Summary (TL;DR)' box enabling skim readers to grasp core value instantly."
      },
      {
        id: "article-closure-callout",
        icon: "🚀",
        name: "Intellectual Call-to-Action",
        category: "structure",
        description: "Crafts thought-provoking closing reflections instead of sales pitches.",
        layer: 3,
        requires: ["key-takeaway-distiller"],
        prompt: "Craft a closing intellectual reflection: Replace pushy sales CTAs with a compelling question forcing readers to audit their current workflow."
      },
      {
        id: "pop-culture-cliche-filter",
        icon: "🚫",
        name: "Buzzword & Cliché Filter",
        category: "anti-patterns",
        description: "Excises marketing buzzwords like 'game-changer', 'revolutionary', and 'delve'.",
        layer: 2,
        requires: ["tone-authority-setter"],
        prompt: "Purge buzzwords and marketing clichés: Completely strip out 'game-changer', 'revolutionary', 'delve into', 'unpack', and 'tapestry'."
      },
      {
        id: "ai-jargon-slasher",
        icon: "⚔️",
        name: "AI Writing Pattern Purge",
        category: "anti-patterns",
        description: "Strips obvious LLM transitional markers and sentence symmetry.",
        layer