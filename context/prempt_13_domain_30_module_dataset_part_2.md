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
    ]
  },

  // ---------------------------------------------------------------------------
  // 8. IMAGE (Görsel & Sanat - Midjourney, Flux.1, DALL-E 3, SDXL)
  // ---------------------------------------------------------------------------
  image: {
    tr: [
      {
        id: "medium-oil-painting",
        icon: "🎨",
        name: "Yağlı Boya & Tuval Estetiği",
        category: "medium",
        description: "Görsele klasik impasto yağlı boya dokusu ve fırça darbeleri kazandırır.",
        layer: 1,
        requires: [],
        prompt: "Stili Klasik Yağlı Boya olarak ayarla: İmpasto tekniği, belirgin fırça darbeleri (heavy brush strokes), tuval dokusu ve zengin yağlı boya katmanları detayını ekle."
      },
      {
        id: "medium-3d-octane",
        icon: "💎",
        name: "3D Octane Render Motoru",
        category: "medium",
        description: "Fotogerçekçi 3D cam, metal ve ray-traced ışık kırılmaları kurgular.",
        layer: 1,
        requires: ["medium-oil-painting"],
        prompt: "Stili 3D Octane Render olarak ayarla: Ultra gerçekçi 3D modelleme, Cinema4D, ray-traced cam ve krom yüzeyler, subsurface scattering ve 8K detay ekle."
      },
      {
        id: "medium-cinematic-film",
        icon: "📷",
        name: "35mm Analog Film Fotoğrafçılığı",
        category: "medium",
        description: "Nostaljik Kodak 35mm film greni ve otantik lens karakteri ekler.",
        layer: 1,
        requires: [],
        prompt: "Görseli Kodak Portra 400 35mm analog film çekimi olarak tasarla: Hafif film greni (film grain), doğal renk paleti, 50mm f/1.4 lens bokeh ve otantik nostalji kat."
      },
      {
        id: "medium-cyberpunk-vector",
        icon: "👾",
        name: "Vektörel Siberpunk Estetiği",
        category: "medium",
        description: "Keskin hatlı, siberpunk neon vurgulu vektörel illüstrasyon üretir.",
        layer: 2,
        requires: ["medium-oil-painting"],
        prompt: "Stili Grafik Vektör & Siberpunk olarak belirle: Keskin illüstrasyon hatları, düz renk alanları, parlak neon vurgular ve çizgi roman mürekkep detayları ekle."
      },
      {
        id: "medium-watercolor-wash",
        icon: "🖌️",
        name: "Suluboya ve Botanik Dokusu",
        category: "medium",
        description: "Şeffaf suluboya katmanları ve pamuklu kağıt emiciliği sağlar.",
        layer: 2,
        requires: ["medium-oil-painting"],
        prompt: "Stili Suluboya (Watercolor Wash) yap: Islak üzerine ıslak tekniği, şeffaf renk katmanları, kenar mürekkep dağılmaları ve dokulu pamuk kağıt hissi ver."
      },
      {
        id: "medium-hyperreal-macro",
        icon: "🔬",
        name: "Hiper-Gerçekçi Makro Çekim",
        category: "medium",
        description: "Gözle görülmeyen mikroskobik yüzey detaylarını odaklayarak büyütür.",
        layer: 3,
        requires: ["medium-cinematic-film"],
        prompt: "Makro Fotoğrafçılık lensi kur: 100mm Macro f/2.8 ile mikroskobik detaylar, su damlaları, doku gözenekleri ve aşırı dar alan derinliği (shallow DOF) tanımla."
      },
      {
        id: "composition-rule-of-thirds",
        icon: "📐",
        name: "Üçte Bir Kuralı & Çerçeveleme",
        category: "composition",
        description: "Ana nesneyi ızgara kesişim noktalarına yerleştirerek dinamizm sağlar.",
        layer: 1,
        requires: [],
        prompt: "Kompozisyonu Üçte Bir Kuralına (Rule of Thirds) göre kurgula: Ana konuyu sol veya sağ dikey çizgi kesişimine oturt, negatif alan (negative space) dengesini sağla."
      },
      {
        id: "composition-golden-ratio",
        icon: "🐚",
        name: "Altın Oran ve Fibonacci Sarmalı",
        category: "composition",
        description: "Görsel elemanları Fibonacci sarmalı boyunca doğal bir akışa dizer.",
        layer: 2,
        requires: ["composition-rule-of-thirds"],
        prompt: "Kompozisyonu Altın Oran (Golden Ratio / Fibonacci Spiral) boyunca düzenle: Gözün görselde gezinmesini sağlayacak kavisli ve dengeli eleman dizilimi kur."
      },
      {
        id: "composition-low-angle",
        icon: "🦅",
        name: "Dramatik Alt Açı (Worm's-Eye)",
        category: "composition",
        description: "Kamerayı aşağıya koyarak objeye anıtsal ve heybetli bir boyut katar.",
        layer: 2,
        requires: ["composition-rule-of-thirds"],
        prompt: "Kamera açısını Aşırı Alt Açı (Low-Angle / Worm's-eye view) yap: Konuyu görkemli, anıtsal ve hakim gösterecek geniş açı perspektif kırılması ekle."
      },
      {
        id: "composition-isometric-grid",
        icon: "📦",
        name: "İzometrik Mimari Izgara",
        category: "composition",
        description: "Sahneyi 45 derece izometrik perspektiften diorama gibi kurgular.",
        layer: 2,
        requires: ["composition-rule-of-thirds"],
        prompt: "Kompozisyonu 3D İzometrik Perspektif (Isometric Grid) olarak kur: Sahneyi 45 derece açıdan mini bir diorama kutusu gibi eksiksiz ve ortogonal görselleştir."
      },
      {
        id: "composition-leading-lines",
        icon: "🛣️",
        name: "Yönlendirici Çizgiler & Derinlik",
        category: "composition",
        description: "Yol, ray veya mimari hatlarla odağı merkeze doğru çeker.",
        layer: 2,
        requires: ["composition-rule-of-thirds"],
        prompt: "Yönlendirici Çizgiler (Leading Lines) ekle: Perspektif kaçış noktasına doğru uzanan yollar, koridorlar veya ışık huzmeleriyle izleyici gözünü konuya yönlendir."
      },
      {
        id: "composition-symmetry-balance",
        icon: "🪞",
        name: "Bilateral Simetri ve Denge",
        category: "composition",
        description: "Mükemmel dikey simetri ile hipnotik ve huzurlu bir düzen yaratır.",
        layer: 3,
        requires: ["composition-golden-ratio"],
        prompt: "Kusursuz Bilateral Simetri kur: Kadrajı tam ortadan ikiye bölen Wes Anderson tarzı merkeze odaklı denge ve mimari simetri oluştur."
      },
      {
        id: "lighting-volumetric-rays",
        icon: "☀️",
        name: "Hacimsel Işık Hüzmeleri (God Rays)",
        category: "lighting",
        description: "Tozlu veya sisli havadan süzülen dramatik güneş ışığı huzmeleri ekler.",
        layer: 1,
        requires: [],
        prompt: "Işıklandırmayı Hacimsel Işık Hüzmeleri (Volumetric God Rays) olarak ayarla: Pencereden veya ağaç dalları arasından süzülen belirgin sisli ışık hüzmeleri ekle."
      },
      {
        id: "lighting-cinematic-rim",
        icon: "🌟",
        name: "Dramatik Kenar Işığı (Rim Light)",
        category: "lighting",
        description: "Objeyi arka plandan ayırmak için arkasından parlak kontür ışığı verir.",
        layer: 2,
        requires: ["lighting-volumetric-rays"],
        prompt: "Arka plana parlak Kenar Işığı (Rim Lighting / Backlight) yerleştir: Konunun saç ve omuz hatlarını parlak bir kontür çizgisiyle karanlık fondan ayır."
      },
      {
        id: "lighting-golden-hour",
        icon: "🌅",
        name: "Altın Saat Sıcak Işığı",
        category: "lighting",
        description: "Gün batımı öncesinin yumuşak, uzun gölgeli altın rengi ışımasını verir.",
        layer: 2,
        requires: ["lighting-volumetric-rays"],
        prompt: "Aydınlatmayı Altın Saat (Golden Hour) yap: Alçak açıdan gelen ılık turuncu/altın ışık, uzun yumuşak gölgeler ve sıcak renk doygunluğu tanımla."
      },
      {
        id: "lighting-neon-cyber-glow",
        icon: "🔴",
        name: "İkili Neon Siber Parıltı",
        category: "lighting",
        description: "Zıt mavi ve pembe neon ışıklarla sahneye siberpunk ışıması katar.",
        layer: 2,
        requires: ["lighting-volumetric-rays"],
        prompt: "İkili Neon Işıklandırma (Dual Neon Glow - Cyan & Magenta) ekle: Yüzeylerde zıt neon yansımaları, ıslak asfalt parıltıları ve yüksek doygunluklu renk zıtlığı kur."
      },
      {
        id: "lighting-chiaroscuro-contrast",
        icon: "🌗",
        name: "Chiaroscuro Yüksek Karşıtlık",
        category: "lighting",
        description: "Caravaggio tarzı karanlık ve aydınlık arasında sert kontrast yaratır.",
        layer: 2,
        requires: ["lighting-volumetric-rays"],
        prompt: "Chiaroscuro aydınlatma tekniği uygula: Derin zifiri siyah gölgeler ile tek bir noktadan gelen sert nokta ışık (spotlight) arasında dramatik kontrast oluştur."
      },
      {
        id: "lighting-bioluminescent",
        icon: "🍄",
        name: "Biyolüminesans Doğal Parıltı",
        category: "lighting",
        description: "Mavi-yeşil ışık saçan organik organizma ve mantar parıltıları ekler.",
        layer: 3,
        requires: ["lighting-neon-cyber-glow"],
        prompt: "Biyolüminesans (Bioluminescent Ambient Light) aydınlatma kur: Karanlık ortamda kendiliğinden mavi-yeşil ışık yayan organik bitkiler, mantarlar ve deniz canlıları parıltısı ver."
      },
      {
        id: "atmosphere-fog-mist",
        icon: "🌫️",
        name: "Yoğun Sis ve Atmosferik Derinlik",
        category: "atmosphere",
        description: "Derinlik hissi veren katmanlı sis ve gizemli atmosfer kurgular.",
        layer: 1,
        requires: [],
        prompt: "Atmosfere Yoğun Katmanlı Sis (Heavy Fog & Mist) ekle: Arka plandaki objelerin siste silikleştiği derinlik katan (aerial perspective) gizemli bir hava yarat."
      },
      {
        id: "atmosphere-surreal-dream",
        icon: "☁️",
        name: "Sürreal Düşsel Dinamikler",
        category: "atmosphere",
        description: "Magritte veya Dali tarzı yerçekimine aykırı sürrealist öğeler katar.",
        layer: 2,
        requires: ["atmosphere-fog-mist"],
        prompt: "Atmosferi Sürreal ve Düşsel (Surreal Dreamscape) yap: Havada süzülen adalar, eriyen saatler veya imkansız gökyüzü renkleriyle Dali ve Magritte tarzı düşsel öğeler ekle."
      },
      {
        id: "atmosphere-dystopian-decay",
        icon: "🏭",
        name: "Ütopik/Distopik Endüstriyel Çürüme",
        category: "atmosphere",
        description: "Terk edilmiş, paslı ve doğa tarafından geri alınan kıyamet sonrası hava.",
        layer: 2,
        requires: ["atmosphere-fog-mist"],
        prompt: "Distopik Pas ve Çürüme Dokusu (Post-Apocalyptic Decay) ver: Sarmaşıklarla kaplanmış terk edilmiş beton yapılar, paslı metaller ve kasvetli puslu hava ekle."
      },
      {
        id: "atmosphere-ethereal-fantasy",
        icon: "✨",
        name: "Ruhani Fantastik Parıltı",
        category: "atmosphere",
        description: "Büyülü toz tanecikleri ve masalsı ışık haleleri oluşturur.",
        layer: 2,
        requires: ["atmosphere-fog-mist"],
        prompt: "Etrafı Ruhani Fantastik (Ethereal Fantasy Sparkles) hava ile kapla: Havada süzülen altın toz tanecikleri, yumuşak parıltı haleleri (bloom effect) ve masalsı atmosfer kat."
      },
      {
        id: "atmosphere-retro-synthwave",
        icon: "🌇",
        name: "80'ler Retro Synthwave Havası",
        category: "atmosphere",
        description: "Mor gökyüzü, tel kafes ızgara ve 80'ler nostaljisi kurgular.",
        layer: 2,
        requires: ["atmosphere-fog-mist"],
        prompt: "80'ler Synthwave / Outrun atmosferi yarat: Mor ve morötesi gün batımı gökyüzü, ufuktaki tel kafes ızgara (wireframe grid) ve retro-fütüristik estetik ver."
      },
      {
        id: "atmosphere-film-noir",
        icon: "🕵️",
        name: "Kasvetli Film Noir Gizemi",
        category: "atmosphere",
        description: "Siyah-beyaz, jaluzi gölgeleri ve yağmurlu gece caddeleri atmosferi.",
        layer: 3,
        requires: ["atmosphere-dystopian-decay"],
        prompt: "Kasvetli Film Noir atmosferi oluştur: Islak sokaklar, jaluzilerden süzülen çizgili gölgeler, tren dumanı ve karanlık suç anlatısı estetiği kur."
      },
      {
        id: "parameters-midjourney-v6",
        icon: "⚙️",
        name: "Midjourney v6 Parametre Bayrakları",
        category: "parameters",
        description: "Midjourney v6 için fotogerçekçilik ve metin işleme parametrelerini ekler.",
        layer: 1,
        requires: [],
        prompt: "Promptun sonuna Midjourney v6 parametrelerini ekle: `--v 6.0 --style raw --q 2` komutlarıyla ham fotogerçekçilik ve yüksek detay seviyesine kilitlen."
      },
      {
        id: "parameters-aspect-ratio",
        icon: "📐",
        name: "En-Boy Oranı Ayarı (--ar 16:9)",
        category: "parameters",
        description: "Sinematik veya dikey ekranlar için kadraj oranını sabitler.",
        layer: 1,
        requires: ["parameters-midjourney-v6"],
        prompt: "Görsel format parametresini tanımla: Sinematik manzara için `--ar 16:9` veya dikey mobil için `--ar 9:16` en-boy oranını prompt sonuna yerleştir."
      },
      {
        id: "parameters-negative-prompt",
        icon: "🚫",
        name: "Negatif Prompt Filtreleme",
        category: "parameters",
        description: "İstenmeyen bozulmaları, fazla parmakları ve bulanıklığı engeller.",
        layer: 2,
        requires: ["parameters-midjourney-v6"],
        prompt: "Negatif Prompt / Exclude filtresini ekle: `--no blur, watermark, deformed hands, extra limbs, low resolution, oversaturated, signature` parametresi koy."
      },
      {
        id: "parameters-chaos-stylize",
        icon: "🎛️",
        name: "Chaos & Stylize Kontrolü",
        category: "parameters",
        description: "Görselin sürpriz varyasyonunu ve sanatsal özgürlük dozajını ayarlar.",
        layer: 2,
        requires: ["parameters-aspect-ratio"],
        prompt: "Sanatsal özgürlük ve varyasyon parametrelerini ayarla: `--stylize 250 --chaos 15` ekleyerek estetik kaliteyi yükseltip hafif kreatif sürprizlere izin ver."
      },
      {
        id: "parameters-flux-guidance",
        icon: "⚡",
        name: "Flux.1 Guidance & Steps Tuning",
        category: "parameters",
        description: "Flux.1 modelleri için adımları ve metin takip katılığı ayarlar.",
        layer: 3,
        requires: ["parameters-negative-prompt"],
        prompt: "Flux.1 Model ayarlarını kodla: `Guidance Scale: 3.5`, `Inference Steps: 35` ve `Prompt Strength: 0.85` ile tam metin sadakati ve yüksek detay üret."
      },
      {
        id: "parameters-sdxl-refiner",
        icon: "🔧",
        name: "SDXL Refiner & LoRA Ağırlıkları",
        category: "parameters",
        description: "Stable Diffusion XL için refiner ve özel stil LoRA ağırlığı tanımlar.",
        layer: 3,
        requires: ["parameters-flux-guidance"],
        prompt: "SDXL & LoRA parametrelerini bağla: `<lora:detail_enhancer:0.65>`, `Base Denoise: 0.8`, `Refiner Switch: 0.2` ekleyerek mikroskobik doku kalitesini artır."
      }
    ],
    en: [
      {
        id: "medium-oil-painting",
        icon: "🎨",
        name: "Oil Painting & Canvas Medium",
        category: "medium",
        description: "Applies classical impasto oil paint texture and visible brush stroke aesthetics.",
        layer: 1,
        requires: [],
        prompt: "Set artistic medium to Classical Oil Painting: Specify impasto technique, visible heavy brush strokes, rich layered oil paint, and subtle canvas texture."
      },
      {
        id: "medium-3d-octane",
        icon: "💎",
        name: "3D Octane Render Engine",
        category: "medium",
        description: "Renders photorealistic 3D glass, polished chrome, and ray-traced optics.",
        layer: 1,
        requires: ["medium-oil-painting"],
        prompt: "Set medium to 3D Octane Render: Specify ultra-realistic 3D modeling, Cinema4D, ray-traced glass and chrome surfaces, subsurface scattering, and 8K resolution."
      },
      {
        id: "medium-cinematic-film",
        icon: "📷",
        name: "35mm Analog Film Photography",
        category: "medium",
        description: "Injects nostalgic Kodak 35mm film grain and authentic lens characteristics.",
        layer: 1,
        requires: [],
        prompt: "Design image as Kodak Portra 400 35mm Analog Film Shot: Include fine organic film grain, natural color science, 50mm f/1.4 lens bokeh, and vintage nostalgia."
      },
      {
        id: "medium-cyberpunk-vector",
        icon: "👾",
        name: "Cyberpunk Vector Aesthetic",
        category: "medium",
        description: "Produces crisp-lined vector illustration with vivid cyberpunk neon accents.",
        layer: 2,
        requires: ["medium-oil-painting"],
        prompt: "Set style to Graphic Vector & Cyberpunk: Incorporate clean vector outlines, flat color blocks, vivid neon highlights, and comic book ink detailing."
      },
      {
        id: "medium-watercolor-wash",
        icon: "🖌️",
        name: "Watercolor Wash & Botanical",
        category: "medium",
        description: "Creates translucent watercolor layers and textured cotton paper absorption.",
        layer: 2,
        requires: ["medium-oil-painting"],
        prompt: "Set medium to Watercolor Wash: Apply wet-on-wet technique, delicate translucent color layers, bleeding ink edges, and heavy cold-pressed cotton paper texture."
      },
      {
        id: "medium-hyperreal-macro",
        icon: "🔬",
        name: "Hyper-Realistic Macro Shot",
        category: "medium",
        description: "Magnifies microscopic surface textures with extreme shallow depth of field.",
        layer: 3,
        requires: ["medium-cinematic-film"],
        prompt: "Configure Macro Photography Spec: Use 100mm Macro f/2.8 settings to reveal microscopic surface details, water droplets, skin pores, and ultra-shallow depth of field."
      },
      {
        id: "composition-rule-of-thirds",
        icon: "📐",
        name: "Rule of Thirds Framing",
        category: "composition",
        description: "Positions subjects along grid intersections for visual balance and dynamism.",
        layer: 1,
        requires: [],
        prompt: "Structure composition using Rule of Thirds: Position the primary focal point along grid intersection lines while leaving balanced negative space."
      },
      {
        id: "composition-golden-ratio",
        icon: "🐚",
        name: "Golden Ratio & Fibonacci Spiral",
        category: "composition",
        description: "Arranges visual elements along a natural logarithmic Fibonacci spiral.",
        layer: 2,
        requires: ["composition-rule-of-thirds"],
        prompt: "Arrange elements along the Golden Ratio (Fibonacci Spiral): Create a seamless visual flow guiding the viewer's eye along organic golden spiral curves."
      },
      {
        id: "composition-low-angle",
        icon: "🦅",
        name: "Dramatic Low-Angle View",
        category: "composition",
        description: "Places camera low looking up to grant subjects monumental scale and power.",
        layer: 2,
        requires: ["composition-rule-of-thirds"],
        prompt: "Set camera angle to Extreme Low-Angle (Worm's-eye view): Emphasize monumental scale, power, and architectural dominance with wide-angle perspective distortion."
      },
      {
        id: "composition-isometric-grid",
        icon: "📦",
        name: "Isometric Architectural Grid",
        category: "composition",
        description: "Renders scenes from a 45-degree orthographic diorama perspective.",
        layer: 2,
        requires: ["composition-rule-of-thirds"],
        prompt: "Frame composition as a 3D Isometric Projection: Render the scene from a clean 45-degree angle resembling a detailed miniature diorama box."
      },
      {
        id: "composition-leading-lines",
        icon: "🛣️",
        name: "Leading Lines & Depth",
        category: "composition",
        description: "Uses roads, railways, or architectural lines to pull focus toward vanishing points.",
        layer: 2,
        requires: ["composition-rule-of-thirds"],
        prompt: "Incorporate Leading Lines: Use converging roads, corridors, or light beams to draw the viewer's focal attention directly toward the central horizon."
      },
      {
        id: "composition-symmetry-balance",
        icon: "🪞",
        name: "Bilateral Symmetry & Balance",
        category: "composition",
        description: "Establishes hypnotic center-weighted architectural symmetry.",
        layer: 3,
        requires: ["composition-golden-ratio"],
        prompt: "Enforce Flawless Bilateral Symmetry: Create a center-weighted, Wes Anderson-style architectural composition with perfectly mirrored left-right visual balance."
      },
      {
        id: "lighting-volumetric-rays",
        icon: "☀️",
        name: "Volumetric God Rays",
        category: "lighting",
        description: "Injects dramatic sunbeams cutting through atmospheric haze and mist.",
        layer: 1,
        requires: [],
        prompt: "Set lighting to Volumetric Rays (God Rays): Render distinct sunbeams filtering through dusty air, window blinds, or dense forest foliage."
      },
      {
        id: "lighting-cinematic-rim",
        icon: "🌟",
        name: "Dramatic Rim Lighting",
        category: "lighting",
        description: "Places strong backlight to separate subjects from dark backgrounds with glowing contours.",
        layer: 2,
        requires: ["lighting-volumetric-rays"],
        prompt: "Position intense Rim Lighting (Backlight): Outline the subject's silhouette, hair, and edges with a bright glowing contour line against dark background."
      },
      {
        id: "lighting-golden-hour",
        icon: "🌅",
        name: "Golden Hour Warm Glow",
        category: "lighting",
        description: "Casts low-sun warm golden light and soft elongated shadows.",
        layer: 2,
        requires: ["lighting-volumetric-rays"],
        prompt: "Apply Golden Hour Lighting: Cast warm golden-orange low-angle sunlight, long soft shadows, and high ambient color warmth across the scene."
      },
      {
        id: "lighting-neon-cyber-glow",
        icon: "🔴",
        name: "Dual Neon Cyber Glow",
        category: "lighting",
        description: "Bathes scene in contrasting cyan and magenta neon illumination.",
        layer: 2,
        requires: ["lighting-volumetric-rays"],
        prompt: "Incorporate Dual Neon Lighting (Cyan & Magenta): Cast vivid contrasting neon reflections on wet asphalt and reflective glass surfaces."
      },
      {
        id: "lighting-chiaroscuro-contrast",
        icon: "🌗",
        name: "Chiaroscuro High Contrast",
        category: "lighting",
        description: "Creates Caravaggio-esque extreme contrast between pitch darkness and harsh light.",
        layer: 2,
        requires: ["lighting-volumetric-rays"],
        prompt: "Apply Chiaroscuro Lighting technique: Create intense contrast between deep pitch-black shadows and a single harsh spotlight illuminating key details."
      },
      {
        id: "lighting-bioluminescent",
        icon: "🍄",
        name: "Bioluminescent Organic Glow",
        category: "lighting",
        description: "Casts soft cyan-green light emitted by self-luminous organic organisms.",
        layer: 3,
        requires: ["lighting-neon-cyber-glow"],
        prompt: "Set lighting to Bioluminescent Ambient Glow: Illuminate dark environments with self-luminous cyan and teal light emitted by glowing fungi, flora, and marine life."
      },
      {
        id: "atmosphere-fog-mist",
        icon: "🌫️",
        name: "Heavy Fog & Atmospheric Mist",
        category: "atmosphere",
        description: "Generates atmospheric depth through layered fog and mysterious haze.",
        layer: 1,
        requires: [],
        prompt: "Inject Heavy Atmospheric Fog & Mist: Establish strong aerial perspective where background elements fade mystery into dense layered fog."
      },
      {
        id: "atmosphere-surreal-dream",
        icon: "☁️",
        name: "Surreal Dreamscape Dynamics",
        category: "atmosphere",
        description: "Incorporates Magritte or Dali-esque gravity-defying surrealist elements.",
        layer: 2,
        requires: ["atmosphere-fog-mist"],
        prompt: "Set mood to Surreal Dreamscape: Integrate floating islands, melting geometry, or impossible sky colors inspired by Salvador Dali and René Magritte."
      },
      {
        id: "atmosphere-dystopian-decay",
        icon: "🏭",
        name: "Dystopian Industrial Decay",
        category: "atmosphere",
        description: "Creates post-apocalyptic overgrown concrete and rusted industrial textures.",
        layer: 2,
        requires: ["atmosphere-fog-mist"],
        prompt: "Apply Dystopian Industrial Decay texture: Render overgrown vine-covered concrete ruins, rusted steel girders, and gloomy overcast post-apocalyptic haze."
      },
      {
        id: "atmosphere-ethereal-fantasy",
        icon: "✨",
        name: "Ethereal Fantasy Sparkles",
        category: "atmosphere",
        description: "Coats environment with magical floating dust particles and soft bloom halos.",
        layer: 2,
        requires: ["atmosphere-fog-mist"],
        prompt: "Infuse atmosphere with Ethereal Fantasy Glow: Add floating golden dust motes, soft bloom lens halos, and enchanted fairy-tale atmosphere."
      },
      {
        id: "atmosphere-retro-synthwave",
        icon: "🌇",
        name: "80s Retro Synthwave Vibe",
        category: "atmosphere",
        description: "Establishes a purple sunset outrun aesthetic with perspective grid lines.",
        layer: 2,
        requires: ["atmosphere-fog-mist"],
        prompt: "Build an 80s Synthwave / Outrun Atmosphere: Render a vibrant purple/magenta sunset sky, distant wireframe vector grids, and retro-futuristic nostalgia."
      },
      {
        id: "atmosphere-film-noir",
        icon: "🕵️",
        name: "Gritty Film Noir Mystery",
        category: "atmosphere",
        description: "Constructs a moody black-and-white atmosphere with venetian blind shadows.",
        layer: 3,
        requires: ["atmosphere-dystopian-decay"],
        prompt: "Construct a moody Film Noir Atmosphere: Use high-contrast monochrome tones, wet rain-slicked streets, venetian blind shadows, and cigarette smoke haze."
      },
      {
        id: "parameters-midjourney-v6",
        icon: "⚙️",
        name: "Midjourney v6 Flag Protocol",
        category: "parameters",
        description: "Applies Midjourney v6 photorealism and raw style flags to prompt tail.",
        layer: 1,
        requires: [],
        prompt: "Append Midjourney v6 parameter flags to prompt end: `--v 6.0 --style raw --q 2` to lock photorealistic rendering and maximum detail generation."
      },
      {
        id: "parameters-aspect-ratio",
        icon: "📐",
        name: "Aspect Ratio Tuning (--ar 16:9)",
        category: "parameters",
        description: "Locks aspect ratios for cinematic landscape or vertical mobile viewports.",
        layer: 1,
        requires: ["parameters-midjourney-v6"],
        prompt: "Define viewport aspect ratio flag: Append `--ar 16:9` for cinematic widescreen or `--ar 9:16` for vertical mobile viewports."
      },
      {
        id: "parameters-negative-prompt",
        icon: "🚫",
        name: "Negative Prompt Filtering",
        category: "parameters",
        description: "Excludes unwanted anatomical flaws, blur, signatures, and extra limbs.",
        layer: 2,
        requires: ["parameters-midjourney-v6"],
        prompt: "Add Negative Prompt exclusion parameters: Append `--no blur, watermark, deformed hands, extra limbs, low resolution, oversaturated, signature`."
      },
      {
        id: "parameters-chaos-stylize",
        icon: "🎛️",
        name: "Chaos & Stylize Control",
        category: "parameters",
        description: "Balances artistic aesthetic quality against creative randomness.",
        layer: 2,
        requires: ["parameters-aspect-ratio"],
        prompt: "Calibrate stylization and variance flags: Set `--stylize 250 --chaos 15` to boost aesthetic fidelity while maintaining controlled creative novelty."
      },
      {
        id: "parameters-flux-guidance",
        icon: "⚡",
        name: "Flux.1 Guidance & Steps Tuning",
        category: "parameters",
        description: "Configures Flux.1 guidance scales and step counts for prompt adherence.",
        layer: 3,
        requires: ["parameters-negative-prompt"],
        prompt: "Configure Flux.1 generation parameters: Set `Guidance Scale: 3.5`, `Inference Steps: 35`, and `Prompt Strength: 0.85` for precise text adherence."
      },
      {
        id: "parameters-sdxl-refiner",
        icon: "🔧",
        name: "SDXL Refiner & LoRA Weights",
        category: "parameters",
        description: "Injects SDXL refiner pass and LoRA detail weights for micro-textures.",
        layer: 3,
        requires: ["parameters-flux-guidance"],
        prompt: "Configure SDXL & LoRA Weights: Add `<lora:detail_enhancer:0.65>`, `Base Denoise: 0.8`, and `Refiner Switch: 0.2` for micro-texture synthesis."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 9. LANGUAGE (Dil, Çeviri & Nüans)
  // ---------------------------------------------------------------------------
  language: {
    tr: [
      {
        id: "loc-cultural-adaptation",
        icon: "🌍",
        name: "Kültürel Bağlam Lokalizasyonu",
        category: "localization",
        description: "Metni hedef kültürün sosyal değerlerine ve duyarlılıklarına göre uyarlar.",
        layer: 1,
        requires: [],
        prompt: "Metni sadece kelime kelime çevirme; hedef kültürün sosyal normlarına, mizah anlayışına ve değer yargılarına göre tam Kültürel Lokalizasyon (Adaptation) uygula."
      },
      {
        id: "loc-idiomatic-transcreation",
        icon: "🎭",
        name: "Deyimsel Transkreasyon (Kreatif Çeviri)",
        category: "localization",
        description: "Deyimleri doğrudan çevirmek yerine hedef dildeki tam duygusal karşılığını bulur.",
        layer: 1,
        requires: ["loc-cultural-adaptation"],
        prompt: "Metne Transkreasyon (Transcreation) uygula: Kaynak dildeki deyim ve atasözlerini birebir çevirmek yerine, hedef dilde aynı etkiyi yaratan kültürel eşdeğerlerini koy."
      },
      {
        id: "loc-dialect-regional-register",
        icon: "🗺️",
        name: "Bölgesel Diyalekt ve Ağız Kalibrasyonu",
        category: "localization",
        description: "Metni spesifik bir coğrafi diyalekte (Örn: Amerikan vs. İngiliz İngilizcesi) kilitler.",
        layer: 2,
        requires: ["loc-cultural-adaptation"],
        prompt: "Bölgesel diyalekt ayarı yap: Metni [Amerikan / İngiliz / Avustralya] İngilizcesinin spesifik yazım, kelime ve dilbilgisi normlarına (%100 lokal sıklık) hizala."
      },
      {
        id: "loc-brand-voice-translation",
        icon: "🏷️",
        name: "Marka Tonu ve Ses Hizalaması",
        category: "localization",
        description: "Çeviride markanın kurumsal kişiliğini ve arketipik tonunu korur.",
        layer: 2,
        requires: ["loc-cultural-adaptation"],
        prompt: "Çeviride Marka Sesini (Brand Voice) koru: Markanın [Yenilikçi / Samimi / Otoriter] kurumsal arketipik tonunu hedef dilin pazarlama terminolojisine aktar."
      },
      {
        id: "loc-taboo-etiquette-check",
        icon: "🛡️",
        name: "Kültürel Tabu ve Etiket Denetimi",
        category: "localization",
        description: "Hedef kültürde hakaret veya potansiyel gaf sayılabilecek unsurları engeller.",
        layer: 2,
        requires: ["loc-cultural-adaptation"],
        prompt: "Kültürel Tabu ve Etiket Denetimi yap: Metinde hedef kültürün dini, politik veya sosyal hassasiyetlerini zedeleyebilecek potansiyel gafları tespit et ve düzelt."
      },
      {
        id: "loc-slang-colloquial-fit",
        icon: "🗣️",
        name: "Güncel Argo ve Sokak Dili Adaptörü",
        category: "localization",
        description: "Metne hedef dildeki doğal, modern sokak söylemlerini enjekte eder.",
        layer: 3,
        requires: ["loc-idiomatic-transcreation"],
        prompt: "Z-Kuşağı veya modern sokak dili adaptasyonu yap: Hedef dilde yapay durmayan, güncel ve otantik popüler jargon/argo karşılıklarını doğal akışta kullan."
      },
      {
        id: "reg-academic-c2-elevation",
        icon: "🎓",
        name: "CEFR C2 Akademik Seviye Yükseltme",
        category: "register",
        description: "Metni en üst düzey formal akademik terminoloji ve yapıya taşır.",
        layer: 1,
        requires: [],
        prompt: "Metnin dil seviyesini CEFR C2 Akademik düzeyine yükselt: Basit fiil ve sıfatları kaldır; yerlerine C2 seviyesinde formal, kesin ve bilimsel kelimeler koy."
      },
      {
        id: "reg-diplomatic-courtesy-tone",
        icon: "🕊️",
        name: "Diplomatik & Resmi Zarafet Tonu",
        category: "register",
        description: "Üslubu nazik, keskin hatları yumuşatılmış diplomatik bir tona getirir.",
        layer: 2,
        requires: ["reg-academic-c2-elevation"],
        prompt: "Diplomatik Ton (Tactful & Courteous Register) uygula: Sert talepleri ve direkt eleştirileri profesyonel ve diplomatik bir nezaketle yeniden kaleme al."
      },
      {
        id: "reg-casual-conversational-flow",
        icon: "☕",
        name: "Doğal Konuşma Dili (Casual Conversational)",
        category: "register",
        description: "Metindeki kasıntı ve resmi havayı atıp samimi bir sohbet tonu verir.",
        layer: 2,
        requires: ["reg-academic-c2-elevation"],
        prompt: "Metni Doğal Konuşma Dilinde (Casual Conversational) yeniden yaz: Resmi dili kır, kısaltmaları (contractions) kullan ve bir dostla kahve içerken konuşur gibi akıcı yap."
      },
      {
        id: "reg-executive-brevity-style",
        icon: "💼",
        name: "Üst Yönetici (Executive) Özet Stili",
        category: "register",
        description: "Laf kalabalığını atıp doğrudan karara yönelik vurucu ve özgün dil sunar.",
        layer: 2,
        requires: ["reg-academic-c2-elevation"],
        prompt: "Üst Yönetici Dili (Executive Brevity) uygula: Tüm süslü paragrafları sil; doğrudan eyleme ve karara odaklı, net, kısa ve vurucu bir dil kur."
      },
      {
        id: "reg-archaic-literary-voice",
        icon: "📜",
        name: "Edebi ve Dönemsel Anlatı Dili",
        category: "register",
        description: "Metne klasik 19. yüzyıl edebiyatı veya epik anlatı havası verir.",
        layer: 3,
        requires: ["reg-academic-c2-elevation"],
        prompt: "Metne Klasik Edebi Ton (Literary / Period Voice) kazandır: 19. yüzyıl romancıları veya epik anlatıcılar gibi zengin betimlemeler ve edebi üslup kullan."
      },
      {
        id: "reg-jargon-simplifier",
        icon: "💡",
        name: "Teknik Jargon Sadeleştirici (Feynman)",
        category: "register",
        description: "Karmaşık teknik terimleri 12 yaşındaki birinin anlayacağı dile çevirir.",
        layer: 3,
        requires: ["reg-casual-conversational-flow"],
        prompt: "Feynman Tekniği ile sadeleştir: Ağır teknik terminolojiyi çıkar; konuyu 12 yaşındaki bir çocuğa veya teknik dışı bir yöneticiye anlatır gibi sade analojilerle ifade et."
      },
      {
        id: "flu-rhythm-cadence-refiner",
        icon: "🎶",
        name: "Cümle Ritmi ve Müzikalite (Cadence)",
        category: "fluency",
        description: "Kısa ve uzun cümleleri harmanlayarak okuma akışına müzikal bir ritim katar.",
        layer: 1,
        requires: [],
        prompt: "Cümle Ritmini ve Müzikalitesini (Cadence & Prose Rhythm) düzenle: Hep aynı boyuttaki monoton cümle yapısını kır; kısa, orta ve uzun cümleleri ritmik bir akışla diz."
      },
      {
        id: "flu-active-voice-conversion",
        icon: "⚡",
        name: "Etken Fiil ve Dinamizm Enjeksiyonu",
        category: "fluency",
        description: "Edilgen (passive) cümleleri dinamik etken (active) eylemlere çevirir.",
        layer: 2,
        requires: ["flu-rhythm-cadence-refiner"],
        prompt: "Metindeki hantal edilgen (passive voice) yapıları sil: Tüm cümleleri güçlü etken fiillerle (active voice) yeniden kurarak metnin enerjisini yükselt."
      },
      {
        id: "flu-redundancy-slasher",
        icon: "✂️",
        name: "Gereksiz Kelime ve Pleonasm Temizliği",
        category: "fluency",
        description: "Anlama katkı sağlamayan zayıf zarfları ve kelime tekrarlarını budar.",
        layer: 2,
        requires: ["flu-rhythm-cadence-refiner"],
        prompt: "Kelime İsrafını (Redundancy & Pleonasm) buda: Metindeki 'very', 'really', 'actually' gibi zayıf zarfları ve aynı anlama gelen ikileme kelimeleri tamamen sil."
      },
      {
        id: "flu-transitional-cohesion",
        icon: "🔗",
        name: "Mantıksal Bağlaçlar ve Akıcılık",
        category: "fluency",
        description: "Paragraflar arasına kusursuz akademik geçiş bağlaçları yerleştirir.",
        layer: 2,
        requires: ["flu-rhythm-cadence-refiner"],
        prompt: "Paragraf Geçişlerini ve Mantıksal Cohesion'ı güçlendir: Düşünceler arasındaki zıtlık, nedensellik ve ekleme bağlaçlarını doğal ve pürüzsüz hale getir."
      },
      {
        id: "flu-vocabulary-precision",
        icon: "🎯",
        name: "Kelime Seçim Hassasiyeti (Precision)",
        category: "fluency",
        description: "Genel kelimeleri bağlama tam uyan spesifik nüanslı kelimelerle değiştirir.",
        layer: 2,
        requires: ["flu-rhythm-cadence-refiner"],
        prompt: "Lexical Precision (Kelime Hassasiyeti) uygula: 'Good', 'bad', 'big' gibi jenerik sıfatlar yerine bağlamın tam duygu ve şiddetini veren nüanslı kelimeler seç."
      },
      {
        id: "flu-readability-score-optimizer",
        icon: "📊",
        name: "Flesch-Kincaid Okunabilirlik Optimizasyonu",
        category: "fluency",
        description: "Metnin okunabilirlik skorunu hedef kitle karmaşıklığına göre ayarlar.",
        layer: 3,
        requires: ["flu-redundancy-slasher"],
        prompt: "Metnin Flesch-Kincaid Okunabilirlik Skorunu optimize et: Cümle karmaşıklığını hedef kitlenin okuma seviyesine (Grade 8-12) göre tam olarak kalibre et."
      },
      {
        id: "idm-phrasal-verb-harmonizer",
        icon: "🧩",
        name: "Phrasal Verb ve Kalıp Uyumlayıcı",
        category: "idioms",
        description: "İngilizce phrasal verb'leri zorlama olmadan doğal akışta harmanlar.",
        layer: 1,
        requires: [],
        prompt: "Phrasal Verb ve Collocation kullanımını doğallaştır: Metne yapay durmayan, anadili İngilizce olanların günlük hayatta tercih ettiği doğal öbekleşmeleri yerleştir."
      },
      {
        id: "idm-metaphor-naturalizer",
        icon: "🎨",
        name: "Metefer ve Benzetme Doğallaştırıcı",
        category: "idioms",
        description: "Eğreti duran benzetmeleri hedef dildeki zarif metaforlara çevirir.",
        layer: 2,
        requires: ["idm-phrasal-verb-harmonizer"],
        prompt: "Metafor ve Benzetmeleri (Simile) hedef dilin estetiğine göre doğallaştır: Göze batan çeviri kokan benzetmeleri çıkarıp daha zarif ve akılda kalıcı metaforlar kur."
      },
      {
        id: "idm-false-friends-filter",
        icon: "⚠️",
        name: "Yalancı Eşdeğer (False Friends) Düzeltici",
        category: "idioms",
        description: "Farklı dillerde benzer görünen ama anlamı farklı kelime gaflarını siler.",
        layer: 2,
        requires: ["idm-phrasal-verb-harmonizer"],
        prompt: "Yalancı Eşdeğerler (False Friends / False Cognates) taraması yap: Şeklen benzeyen ancak farklı dillerde tamamen farklı anlama gelen kelime hatalarını düzelt."
      },
      {
        id: "idm-proverbial-equivalents",
        icon: "📜",
        name: "Kültürlerarası Atasözü Eşleştirici",
        category: "idioms",
        description: "Kaynak atasözünün hedef kültürdeki birebir hikmet karşılığını bulur.",
        layer: 2,
        requires: ["idm-phrasal-verb-harmonizer"],
        prompt: "Atasözleri ve Özdeyişler için tam Kültürlerarası Eşdeğer bul: Kelime kelime tercüme etmek yerine hedef kültürün tarihsel hafızasındaki aynı hikmeti veren atasözünü yerleştir."
      },
      {
        id: "idm-nuance-spectrum-mapper",
        icon: "🌈",
        name: "Kelime Nüans ve Yan Anlam Spektrumu",
        category: "idioms",
        description: "Benzer anlamlı kelimelerin pozitif/negatif yan anlamlarını (connotation) çözer.",
        layer: 3,
        requires: ["idm-metaphor-naturalizer"],
        prompt: "Kelime Yan Anlam (Connotation vs. Denotation) Spektrumu çıkar: Seçilen kelimenin taşıdığı gizli duygusal tonu (pozitif, negatif, nötr) analiz et ve tam duyguya göre değiştir."
      },
      {
        id: "idm-humor-pun-translator",
        icon: "🃏",
        name: "Mizah ve Kelime Oyunu Transkreasyonu",
        category: "idioms",
        description: "Çevrilmesi imkansız esprileri hedef dilde yeniden icat eder.",
        layer: 3,
        requires: ["idm-proverbial-equivalents"],
        prompt: "Mizah ve Kelime Oyunlarını (Puns / Wordplay) Transkreasyon ile yeniden üret: Çevrildiğinde anlamını yitiren nükte ve espriyi hedef dilin olanaklarıyla sıfırdan kurgula."
      },
      {
        id: "ped-socratic-tutor-mode",
        icon: "🏛️",
        name: "Sokratik Dil Eğitmeni Modu",
        category: "pedagogy",
        description: "Doğrudan cevabı vermeyip yönlendirici sorularla dili öğreten eğitmen.",
        layer: 1,
        requires: [],
        prompt: "Sokratik Dil Öğretmeni rolüne geç: Kullanıcının dil hatasını doğrudan düzeltme; hatayı kendisinin bulmasını sağlayacak yönlendirici 2 ipucu sorusu sor."
      },
      {
        id: "ped-error-correction-feedback",
        icon: "📝",
        name: "Ayrıntılı Hata Analizi ve Geri Bildirim",
        category: "pedagogy",
        description: "Gramo-sentaktik hataları tablo halinde kural açıklamasıyla sunar.",
        layer: 2,
        requires: ["ped-socratic-tutor-mode"],
        prompt: "Girdi metnine Ayrıntılı Dilbilgisi ve Sentaks Analizi yap: Hatalı Kısım | Doğru Kullanım | Dilbilgisi Kuralı ve Nedeni şeklinde tablo halinde raporla."
      },
      {
        id: "ped-spaced-recall-builder",
        icon: "🗂️",
        name: "Anki Flashcard & Aralıklı Tekrar Kartı",
        category: "pedagogy",
        description: "Metindeki zor kelimelerden Anki formatında flashcard seti üretir.",
        layer: 2,
        requires: ["ped-socratic-tutor-mode"],
        prompt: "Metindeki hedef kelimelerden Anki Flashcard seti oluştur: Front: [Kelime + Örnek Cümledeki Boşluk] | Back: [Tanım + İpucu + IPA Telaffuz] formatında yaz."
      },
      {
        id: "ped-contextual-cloze-creator",
        icon: "🧩",
        name: "Bağlamsal Boşluk Doldurma Alıştırması",
        category: "pedagogy",
        description: "Metni kelime dağarcığını test eden boşluk doldurma testine dönüştürür.",
        layer: 2,
        requires: ["ped-socratic-tutor-mode"],
        prompt: "Metinden Bağlamsal Boşluk Doldurma (Cloze Test) Egzersizi üret: Hedef kelimeleri çıkarıp yerlerine numaralandırılmış boşluklar koy ve en alta çoktan seçmeli opsiyonlar ekle."
      },
      {
        id: "ped-pronunciation-ipa-guide",
        icon: "🗣️",
        name: "IPA Telaffuz ve Vurgu Rehberi",
        category: "pedagogy",
        description: "Zor kelimelerin Uluslararası Fonetik Alfabe (IPA) okunuşlarını ve vurgularını verir.",
        layer: 3,
        requires: ["ped-error-correction-feedback"],
        prompt: "Zor kelimeler için Uluslararası Fonetik Alfabe (IPA) Telaffuz Rehberi hazırla: Kelimenin IPA transkripsiyonunu, hece vurgusunu (syllable stress) ve ses kaydını taklit eden phonetic okunuşunu sun."
      },
      {
        id: "ped-immersion-scenario-roleplay",
        icon: "🎭",
        name: "İnteraktif Dilde Rol Yapma (Roleplay)",
        category: "pedagogy",
        description: "Kullanıcıyı gerçek hayat senaryolarında dilde pratik yapmaya davet eder.",
        layer: 3,
        requires: ["ped-socratic-tutor-mode"],
        prompt: "İnteraktif Dil Rol Yapma (Roleplay) Senaryosu başlat: Sen [İş Görüşmecisi / Otel Resepsiyonisti / Garson] ol; kullanıcı ile belirtilen seviyede diyalog başlat ve her turda mini dönüt ver."
      }
    ],
    en: [
      {
        id: "loc-cultural-adaptation",
        icon: "🌍",
        name: "Cultural Context Localization",
        category: "localization",
        description: "Adapts prose to target culture social norms, humor, and values.",
        layer: 1,
        requires: [],
        prompt: "Do not translate literally; perform complete Cultural Localization adapting text to target culture social norms, humor, and underlying value systems."
      },
      {
        id: "loc-idiomatic-transcreation",
        icon: "🎭",
        name: "Idiomatic Transcreation",
        category: "localization",
        description: "Re-creates idioms and creative phrasing with equivalent target culture emotional resonance.",
        layer: 1,
        requires: ["loc-cultural-adaptation"],
        prompt: "Execute Transcreation: Re-create source idioms, metaphors, and wordplay using culturally authentic equivalents that produce identical emotional resonance."
      },
      {
        id: "loc-dialect-regional-register",
        icon: "🗺️",
        name: "Regional Dialect Calibration",
        category: "localization",
        description: "Locks text to specific geographical dialects (e.g., US vs. UK English).",
        layer: 2,
        requires: ["loc-cultural-adaptation"],
        prompt: "Calibrate regional dialect: Enforce strict compliance with [US / UK / Australian] spelling, vocabulary, and grammatical conventions."
      },
      {
        id: "loc-brand-voice-translation",
        icon: "🏷️",
        name: "Brand Voice Alignment",
        category: "localization",
        description: "Preserves corporate brand identity and personality archetypes across languages.",
        layer: 2,
        requires: ["loc-cultural-adaptation"],
        prompt: "Maintain Brand Voice across translation: Adapt the company's [Innovative / Warm / Authoritative] brand archetype into target market terminology."
      },
      {
        id: "loc-taboo-etiquette-check",
        icon: "🛡️",
        name: "Cultural Taboo & Etiquette Audit",
        category: "localization",
        description: "Screens text for potential cultural gaffes, offensive idioms, or taboo references.",
        layer: 2,
        requires: ["loc-cultural-adaptation"],
        prompt: "Audit for Cultural Taboos & Etiquette: Detect and eliminate phrasing that could offend religious, political, or social sensitivities in the target region."
      },
      {
        id: "loc-slang-colloquial-fit",
        icon: "🗣️",
        name: "Modern Colloquial & Slang Adaptor",
        category: "localization",
        description: "Injects authentic, contemporary slang and informal expressions.",
        layer: 3,
        requires: ["loc-idiomatic-transcreation"],
        prompt: "Adapt modern slang & informal register: Inject authentic, non-stilted contemporary colloquial expressions popular among native speakers."
      },
      {
        id: "reg-academic-c2-elevation",
        icon: "🎓",
        name: "CEFR C2 Academic Elevation",
        category: "register",
        description: "Elevates prose to formal, precise C2-level academic standard.",
        layer: 1,
        requires: [],
        prompt: "Elevate register to CEFR C2 Academic standard: Replace basic verbs and adjectives with precise, formal C2-level vocabulary and complex syntactic structures."
      },
      {
        id: "reg-diplomatic-courtesy-tone",
        icon: "🕊️",
        name: "Diplomatic & Formal Tact",
        category: "register",
        description: "Refreshes prose into tactful, courteous, and diplomatically polished tone.",
        layer: 2,
        requires: ["reg-academic-c2-elevation"],
        prompt: "Apply Diplomatic Register (Tactful & Courteous): Reframe direct demands or sharp criticisms into polished, courteous diplomatic phrasing."
      },
      {
        id: "reg-casual-conversational-flow",
        icon: "☕",
        name: "Natural Conversational Register",
        category: "register",
        description: "Strips stiffness to establish a warm, natural conversational cadence.",
        layer: 2,
        requires: ["reg-academic-c2-elevation"],
        prompt: "Rewrite in Natural Conversational style: Strip formal stiffness, deploy natural contractions, and write with the warm flow of an engaging coffee chat."
      },
      {
        id: "reg-executive-brevity-style",
        icon: "💼",
        name: "Executive Brevity & Directness",
        category: "register",
        description: "Strips fluff to deliver concise, action-oriented executive prose.",
        layer: 2,
        requires: ["reg-academic-c2-elevation"],
        prompt: "Apply Executive Brevity: Eliminate narrative preamble; deploy concise, punchy, action-oriented language optimized for C-suite decision-makers."
      },
      {
        id: "reg-archaic-literary-voice",
        icon: "📜",
        name: "Literary & Period Narrative Style",
        category: "register",
        description: "Infuses prose with rich 19th-century literary descriptions and epic voice.",
        layer: 3,
        requires: ["reg-academic-c2-elevation"],
        prompt: "Infuse Classic Literary Voice: Use elaborate cadence, rich descriptive metaphors, and evocative prose styling reminiscent of 19th-century classic literature."
      },
      {
        id: "reg-jargon-simplifier",
        icon: "💡",
        name: "Technical Jargon De-escalator",
        category: "register",
        description: "Simplifies dense technical terms into accessible plain language (Feynman).",
        layer: 3,
        requires: ["reg-casual-conversational-flow"],
        prompt: "De-escalate technical jargon using the Feynman Technique: Strip dense acronyms and explain complex mechanics using clear analogies accessible to a 12-year-old."
      },
      {
        id: "flu-rhythm-cadence-refiner",
        icon: "🎶",
        name: "Sentence Cadence & Rhythm Polish",
        category: "fluency",
        description: "Varies sentence length to create musical, engaging prose rhythm.",
        layer: 1,
        requires: [],
        prompt: "Refine Sentence Cadence & Rhythm: Break monotonous sentence lengths by alternating short punchy declarations with elegant, flowing compound structures."
      },
      {
        id: "flu-active-voice-conversion",
        icon: "⚡",
        name: "Active Voice Dynamic Injector",
        category: "fluency",
        description: "Converts passive sentence constructions into dynamic active verbs.",
        layer: 2,
        requires: ["flu-rhythm-cadence-refiner"],
        prompt: "Convert passive voice to dynamic Active Voice: Eliminate weak passive constructions and rephrase sentences with energetic action verbs."
      },
      {
        id: "flu-redundancy-slasher",
        icon: "✂️",
        name: "Conciseness & Redundancy Purge",
        category: "fluency",
        description: "Prunes weak adverbs, filler phrases, and pleonastic word pairs.",
        layer: 2,
        requires: ["flu-rhythm-cadence-refiner"],
        prompt: "Purge Redundancy & Pleonasm: Strip weak adverbs ('very', 'really', 'actually') and redundant word pairings to tighten prose density."
      },
      {
        id: "flu-transitional-cohesion",
        icon: "🔗",
        name: "Discourse Markers & Flow Refiner",
        category: "fluency",
        description: "Smooths paragraph transitions with natural academic discourse markers.",
        layer: 2,
        requires: ["flu-rhythm-cadence-refiner"],
        prompt: "Strengthen Discourse Cohesion: Refine transitional phrases between paragraphs to ensure seamless logical contrast, causality, and narrative progression."
      },
      {
        id: "flu-vocabulary-precision",
        icon: "🎯",
        name: "Lexical Precision Calibration",
        category: "fluency",
        description: "Replaces generic terms with precise, contextually nuanced vocabulary.",
        layer: 2,
        requires: ["flu-rhythm-cadence-refiner"],
        prompt: "Calibrate Lexical Precision: Replace generic adjectives ('good', 'bad', 'big') with highly specific vocabulary matching exact contextual nuances."
      },
      {
        id: "flu-readability-score-optimizer",
        icon: "📊",
        name: "Flesch-Kincaid Readability Tuner",
        category: "fluency",
        description: "Tunes readability metrics to match intended target audience grade levels.",
        layer: 3,
        requires: ["flu-redundancy-slasher"],
        prompt: "Optimize Flesch-Kincaid Readability score: Adjust sentence length and syllabic complexity to match target reader grade levels (Grade 8-12)."
      },
      {
        id: "idm-phrasal-verb-harmonizer",
        icon: "🧩",
        name: "Phrasal Verb & Collocation Harmonizer",
        category: "idioms",
        description: "Harmonizes natural phrasal verbs and native speaker collocations.",
        layer: 1,
        requires: [],
        prompt: "Harmonize Phrasal Verbs & Collocations: Ensure natural word partnerships and idiomatic verb combinations native speakers use naturally."
      },
      {
        id: "idm-metaphor-naturalizer",
        icon: "🎨",
        name: "Metaphor & Simile Naturalizer",
        category: "idioms",
        description: "Replaces translated tropes with elegant target-language metaphors.",
        layer: 2,
        requires: ["idm-phrasal-verb-harmonizer"],
        prompt: "Naturalize Metaphors & Similes: Replace awkward direct translations of tropes with culturally resonant, elegant target-language imagery."
      },
      {
        id: "idm-false-friends-filter",
        icon: "⚠️",
        name: "False Friends & Cognates Filter",
        category: "idioms",
        description: "Corrects deceptive cognates that look similar across dfferent languages but mean different things.",
        layer: 2,
        requires: ["idm-phrasal-verb-harmonizer"],
        prompt: "Screen for False Friends (False Cognates): Identify and fix deceptive terms that look similar across languages but carry divergent meanings."
      },
      {
        id: "idm-proverbial-equivalents",
        icon: "📜",
        name: "Proverbial Cross-Cultural Matcher",
        category: "idioms",
        description: "Maps source proverbs to equivalent ancestral wisdom sayings in the target language.",
        layer: 2,
        requires: ["idm-phrasal-verb-harmonizer"],
        prompt: "Find Proverbial Equivalents: Replace word-for-word proverb translations with matching ancestral wisdom sayings native to the target culture."
      },
      {
        id: "idm-nuance-spectrum-mapper",
        icon: "🌈",
        name: "Lexical Connotation Spectrum Mapper",
        category: "idioms",
        description: "Maps emotional connotations and sub-textual tones of near-synonyms.",
        layer: 3,
        requires: ["idm-metaphor-naturalizer"],
        prompt: "Map Lexical Connotations: Analyze underlying emotional tones (positive, negative, neutral) of candidate synonyms and select the exact fit."
      },
      {
        id: "idm-humor-pun-translator",
        icon: "🃏",
        name: "Humor & Wordplay Transcreation",
        category: "idioms",
        description: "Re-invents untranslatable puns and jokes using target language linguistic mechanics.",
        layer: 3,
        requires: ["idm-proverbial-equivalents"],
        prompt: "Transcreate Humor & Puns: Re-invent untranslatable puns or wordplay using target-language linguistic mechanisms to preserve comedic impact."
      },
      {
        id: "ped-socratic-tutor-mode",
        icon: "🏛️",
        name: "Socratic Language Coach",
        category: "pedagogy",
        description: "Guides language acquisition via probing questions rather than passive corrections.",
        layer: 1,
        requires: [],
        prompt: "Adopt Socratic Language Coach mode: Rather than giving direct answers, ask 2 guiding questions enabling the learner to discover their own linguistic error."
      },
      {
        id: "ped-error-correction-feedback",
        icon: "📝",
        name: "Granular Error & Grammar Auditor",
        category: "pedagogy",
        description: "Provides structured feedback tables detailing syntactic errors and rules.",
        layer: 2,
        requires: ["ped-socratic-tutor-mode"],
        prompt: "Generate Granular Error Correction Matrix: Format as a table: [Error | Correction | Underlying Grammar Rule & Explanation]."
      },
      {
        id: "ped-spaced-recall-builder",
        icon: "🗂️",
        name: "Anki Flashcard Generator",
        category: "pedagogy",
        description: "Compiles vocabulary from text into Anki-ready spaced repetition flashcards.",
        layer: 2,
        requires: ["ped-socratic-tutor-mode"],
        prompt: "Build Anki Spaced Repetition Flashcards: Format as Front: [Target Word + Context Sentence Gap] | Back: [Definition + IPA + Usage Hint]."
      },
      {
        id: "ped-contextual-cloze-creator",
        icon: "🧩",
        name: "Contextual Cloze Drill Builder",
        category: "pedagogy",
        description: "Transforms reading prose into gap-fill exercises testing vocabulary retention.",
        layer: 2,
        requires: ["ped-socratic-tutor-mode"],
        prompt: "Create Contextual Cloze Drills: Strip target vocabulary from prose, replace with numbered gaps, and supply multiple-choice distractors below."
      },
      {
        id: "ped-pronunciation-ipa-guide",
        icon: "🗣️",
        name: "Phonetic IPA & Accent Guide",
        category: "pedagogy",
        description: "Provides International Phonetic Alphabet (IPA) transcriptions and stress markers.",
        layer: 3,
        requires: ["ped-error-correction-feedback"],
        prompt: "Generate IPA Pronunciation Guide: Provide International Phonetic Alphabet transcriptions, primary syllable stress markers, and phonetic approximation hints."
      },
      {
        id: "ped-immersion-scenario-roleplay",
        icon: "🎭",
        name: "Interactive Immersion Roleplay",
        category: "pedagogy",
        description: "Engages users in real-world conversational roleplay scenarios with feedback.",
        layer: 3,
        requires: ["ped-socratic-tutor-mode"],
        prompt: "Initiate Interactive Immersion Roleplay: Assume character as [Interviewer / Hotel Desk / Server] and guide a multi-turn conversation providing targeted mini-feedback."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 10. EDUDESIGN (Eğitmen & Müfredat Tasarımı)
  // ---------------------------------------------------------------------------
  edudesign: {
    tr: [
      {
        id: "tax-blooms-question-matrix",
        icon: "🧠",
        name: "Bloom Taksonomisi Soru Matrisi",
        category: "taxonomy",
        description: "Hatırlama'dan Yaratma'ya Bloom basamaklarına uygun sorular üretir.",
        layer: 1,
        requires: [],
        prompt: "Bloom Taksonomisine göre soru matrisi oluştur: Hatırlama, Anlama, Uygulama, Analiz, Değerlendirme ve Yaratma basamaklarının her biri için 1'er adet ölçme sorusu türet."
      },
      {
        id: "tax-depth-of-knowledge-dok",
        icon: "📊",
        name: "Webb DOK Bilişsel Derinlik Hizalaması",
        category: "taxonomy",
        description: "Görevleri DOK Seviye 1 (Hatırlama) ile Seviye 4 (Genişletilmiş Düşünme) arasında derecelendirir.",
        layer: 1,
        requires: ["tax-blooms-question-matrix"],
        prompt: "Öğrenme görevlerini Webb'in DOK (Depth of Knowledge) modeline göre hizala: DOK 1 (Recall) düzeyindeki basit görevleri DOK 3 (Strategic) ve DOK 4 (Extended Thinking) seviyesine yükselt."
      },
      {
        id: "tax-solo-taxonomy-aligner",
        icon: "🧱",
        name: "SOLO Taksonomisi Yapısal Değerlendirme",
        category: "taxonomy",
        description: "Öğrenci yanıtlarını Tek Yönlü'den İlişkisel ve Soyutlanmış Düzeye sınıflandırır.",
        layer: 2,
        requires: ["tax-blooms-question-matrix"],
        prompt: "Öğrenme çıktılarını SOLO (Structure of Observed Learning Outcome) taksonomisine göre değerlendir: Yanıtları Tek Yönlü (Unistructural), Çok Yönlü (Multistructural), İlişkisel (Relational) ve Genişletilmiş Soyut (Extended Abstract) olarak kodla."
      },
      {
        id: "tax-affective-domain-goals",
        icon: "❤️",
        name: "Krathwohl Duรับsal Alan Hedefleri",
        category: "taxonomy",
        description: "Öğrencinin tutum, değer verme ve karakterize etme gelişimini planlar.",
        layer: 2,
        requires: ["tax-blooms-question-matrix"],
        prompt: "Duyuşsal Alan (Affective Domain - Krathwohl) hedefleri koy: Öğrencinin konuyu sadece zihnen değil; Alma, Tepkide Bulunma, Değer Verme ve Bir Değer Sistemiyle Karakterize Etme süreçlerini tasarla."
      },
      {
        id: "tax-psychomotor-skill-scaffolding",
        icon: "✋",
        name: "Psikomotor Beceri İskeletleme (Dave)",
        category: "taxonomy",
        description: "Fiziksel ve pratik becerilerin taklitten doğallaşmaya gelişim haritası.",
        layer: 2,
        requires: ["tax-blooms-question-matrix"],
        prompt: "Psikomotor Beceri Gelişim Haritası çıkar (Dave Taksonomisi): Taklit Etme (Imitation), Manipülasyon, Hassasiyet (Precision), Eklemleme ve Doğallaşma (Naturalization) adımlarını kurgula."
      },
      {
        id: "tax-higher-order-prompting",
        icon: "🎯",
        name: "Üst Düzey Düşünme Soru Üretici",
        category: "taxonomy",
        description: "Ezberci soruları eleştirel düşünmeyi tetikleyen açık uçlu sorulara dönüştürür.",
        layer: 3,
        requires: ["tax-depth-of-knowledge-dok"],
        prompt: "Ezberci (Low-order) soruları sil: Yerine öğrencide hipotez kurma, varsayımları sorgulama ve alternatif üretmeyi zorunlu kılan 3 adet Üst Düzey Düşünme (HOTS) sorusu ekle."
      },
      {
        id: "cur-backward-design-ubd",
        icon: "🎯",
        name: "Tersine Müfredat Tasarımı (UbD)",
        category: "curriculum",
        description: "Wiggins & McTighe UbD modeliyle önce hedef ve kanıtı, sonra etkinlikleri planlar.",
        layer: 1,
        requires: [],
        prompt: "Understanding by Design (UbD - Tersine Tasarım) metodunu uygula: (Aşama 1) İstenen Büyük Fikir ve Çıktıları belirle -> (Aşama 2) Kabul edilebilir Değerlendirme Kanıtlarını koy -> (Aşama 3) Öğrenme Deneyimlerini planla."
      },
      {
        id: "cur-scaffolding-chunking",
        icon: "🧩",
        name: "Bilişsel Yük & Mikro-Bölümleme (Chunking)",
        category: "curriculum",
        description: "Karmaşık konuları bilişsel aşırı yüklenmeyi önleyecek küçük parçalara böler.",
        layer: 2,
        requires: ["cur-backward-design-ubd"],
        prompt: "Bilişsel Yük Teorisini (Cognitive Load Theory) uygula: Konuyu 10-15 dakikalık sindirilebilir Mikro-Bölümlere (Chunking) ayır ve aralara bilgi işleme mola yapıları koy."
      },
      {
        id: "cur-interleaving-spaced-curriculum",
        icon: "🔄",
        name: "Aralıklı & Çapraz Öğrenme Takvimi",
        category: "curriculum",
        description: "Unutmayı engellemek için konuları zaman içine yayan aralıklı tekrar planı hazırlar.",
        layer: 2,
        requires: ["cur-backward-design-ubd"],
        prompt: "Aralıklı ve Çapraz Öğrenme (Spaced & Interleaved Retrieval) takvimi kurgula: Konuları blok halinde öğretmek yerine, geçmiş konuları sonraki haftalara serpiştiren sarmal müfredat haritası yaz."
      },
      {
        id: "cur-cross-disciplinary-bridge",
        icon: "🌉",
        name: "Disiplinlerarası Proje Bağlantısı",
        category: "curriculum",
        description: "Dersi matematik, tarih veya sanat gibi farklı disiplinlerle evlendirir.",
        layer: 2,
        requires: ["cur-backward-design-ubd"],
        prompt: "Disiplinlerarası (Cross-Disciplinary) bağlantı kur: Bu ders konusunu [Matematik / Etik / Tarih / Kodlama] ile birleştiren gerçek hayat STEM/STEAM projesi tasarla."
      },
      {
        id: "cur-competency-based-map",
        icon: "🗺️",
        name: "Yetkinlik Tabanlı Beceri Haritası",
        category: "curriculum",
        description: "Zaman bazlı ders yerine somut beceri kazanımına dayalı ilerleme haritası.",
        layer: 2,
        requires: ["cur-backward-design-ubd"],
        prompt: "Yetkinlik Tabanlı Müfredat (Competency-Based Learning) haritası oluştur: Her modül için öğrencinin göstermesi gereken somut 'Yapabilir' (Can-Do) kriterlerini ve mikro-rozet yetkinliklerini tanımla."
      },
      {
        id: "cur-universal-learning-design",
        icon: "♿",
        name: "Evrensel Öğrenme Tasarımı (UDL)",
        category: "curriculum",
        description: "Görsel, işitsel ve kinestetik farklılıklara erişilebilir kapsayıcı ders mimarisi.",
        layer: 3,
        requires: ["cur-scaffolding-chunking"],
        prompt: "Evrensel Öğrenme Tasarımı (UDL - Universal Design for Learning) uygula: (a) Çoklu Sunum Yolları (Görsel/İşitsel/Metin), (b) Çoklu İfade Yolları ve (c) Çoklu Katılım Yöntemlerini derse entegre et."
      },
      {
        id: "ass-formative-exit-ticket",
        icon: "🎟️",
        name: "Biçimlendirici Çıkış Bilteti (Exit Ticket)",
        category: "assessment",
        description: "Ders sonunda 2 dakikalık anlık anlama denetimi ve çıkış kartı soruları.",
        layer: 1,
        requires: [],
        prompt: "Ders sonu Biçimlendirici Değerlendirme (Formative Exit Ticket) tasarla: Öğrencinin 'Bugün öğrendiğim en kritik şey', 'Hala kafamı karıştıran nokta' ve 1 adet uygulama sorusundan oluşan 2 dakikalık denetim yaz."
      },
      {
        id: "ass-summative-capstone-spec",
        icon: "🏆",
        name: "Özetleyici Bitirme (Capstone) Şartnamesi",
        category: "assessment",
        description: "Dönem sonu için tüm becerileri sentezleyen kapsamlı proje şartnamesi.",
        layer: 2,
        requires: ["ass-formative-exit-ticket"],
        prompt: "Özetleyici Bitirme Projesi (Summative Capstone Project) Şartnamesi yaz: Proje teslim kriterlerini, kısıtları, sunum formatını ve değerlendirme ağırlıklarını belirle."
      },
      {
        id: "ass-authentic-task-assessment",
        icon: "💼",
        name: "Gerçek Hayat Özgün Değerlendirmesi",
        category: "assessment",
        description: "Teorik sınav yerine sektördeki gerçek bir problemi çözdüren görev kurgular.",
        layer: 2,
        requires: ["ass-formative-exit-ticket"],
        prompt: "Özgün Değerlendirme Görevi (Authentic Task) tasarla: Öğrenciyi kağıt-kalem sınavı yerine, gerçek bir müşteriye veya kuruma profesyonel bir ürün/çözüm sunar rolde konumlandır."
      },
      {
        id: "ass-item-analysis-distractor",
        icon: "📝",
        name: "Çoktan Seçmeli Çeldirici Titizlik Testi",
        category: "assessment",
        description: "Test sorularındaki çeldiricilerin (distractors) kalitesini ve çeldirme gücünü denetler.",
        layer: 2,
        requires: ["ass-formative-exit-ticket"],
        prompt: "Çoktan Seçmeli Soru Bankası Titizlik Denetimi yap: Sorulardaki şıkların uzunluk eşitliğini, çeldiricilerin (distractors) mantıksal kavrayış zayıflıklarını ölçme gücünü kontrol et."
      },
      {
        id: "ass-diagnostic-prior-knowledge",
        icon: "🔍",
        name: "Ön Bilgi Teşhis Envanteri (Diagnostic)",
        category: "assessment",
        description: "Ünite öncesi öğrencilerin kavram yanılgılarını ve hazırbulunuşluğunu ölçer.",
        layer: 2,
        requires: ["ass-formative-exit-ticket"],
        prompt: "Ünite Başı Teşhis Sınavı (Diagnostic Prior-Knowledge Audit) oluştur: Öğrencilerin yaygın kavram yanılgılarını (misconceptions) ve eksik ön koşul bilgilerini açığa çıkaracak 5 soru yaz."
      },
      {
        id: "ass-peer-self-eval-protocol",
        icon: "🤝",
        name: "Akran ve Öz-Değerlendirme Protokolü",
        category: "assessment",
        description: "Öğrencilerin birbirini ve kendilerini objektif değerlendirme mekanizması.",
        layer: 3,
        requires: ["ass-authentic-task-assessment"],
        prompt: "Akran ve Öz-Değerlendirme (Peer & Self-Assessment) Protokolü kurgula: Öğrencilerin arkadaşlarına yapıcı geri bildirim vermesini ve kendi süreçlerini metakognitif olarak değerlendirmesini sağlayan form yaz."
      },
      {
        id: "eng-gamification-loop",
        icon: "🎮",
        name: "Oyunlaştırılmış Öğrenme Döngüsü",
        category: "engagement",
        description: "Puan, rozet, liderlik tablosu ve görev mekanikleri ile motivasyonu artırır.",
        layer: 1,
        requires: [],
        prompt: "Ders içeriğine Oyunlaştırma (Gamification Architecture) entegre et: Görev zincirleri (quests), tecrübe puanı (XP), seviye atlama ve mikro-rozet mekanikleriyle öğrenme motivasyonunu yükselt."
      },
      {
        id: "eng-socratic-seminar-guide",
        icon: "🗣️",
        name: "Sokratik Seminer Tartışma Rehberi",
        category: "engagement",
        description: "Sınıf içi derin grup tartışması için metin odaklı Sokratik sorgulama kurgular.",
        layer: 2,
        requires: ["eng-gamification-loop"],
        prompt: "Sokratik Seminer Tartışma Rehberi tasarla: Öğrencilerin öğretmen merkezli değil, kendi aralarında metin üzerinden derin tartışma yürütecekleri açılış, genişleme ve kapanış sorularını yaz."
      },
      {
        id: "eng-active-recall-drill",
        icon: "⚡",
        name: "Aktif Hatırlama Egzersiz Motoru",
        category: "engagement",
        description: "Pasif okuma yerine bilgiyi zihinden çekmeye zorlayan alıştırma düzeni.",
        layer: 2,
        requires: ["eng-gamification-loop"],
        prompt: "Aktif Hatırlama (Active Recall) antrenmanı kurgula: Öğrenciyi notları tekrar okumaktan alıkoyup, bilgiyi zihninden sıfırdan çağırmaya zorlayacak 5 hızlı hatırlama sorusu yaz."
      },
      {
        id: "eng-case-study-dilemma-builder",
        icon: "📖",
        name: "Vaka Analizi & Etik İklem Senaryosu",
        category: "engagement",
        description: "Öğrencileri gerçek bir şirket veya olay ikileminin içine atan senaryo.",
        layer: 2,
        requires: ["eng-gamification-loop"],
        prompt: "Gerçek Vaka İkilemi (Case Study Dilemma) yaz: Öğrenciyi net bir doğrusu olmayan, iki kötü veya iki iyi seçenek arasında karar vermek zorunda bırakan senaryoya yerleştir."
      },
      {
        id: "eng-flipper-classroom-prep",
        icon: "🔄",
        name: "Ters-Yüz Sınıf (Flipped Classroom) Planı",
        category: "engagement",
        description: "Evde içerik tüketimi, sınıfta aktif uygulama ve problem çözme planı.",
        layer: 2,
        requires: ["eng-gamification-loop"],
        prompt: "Ters-Yüz Sınıf (Flipped Classroom) mimarisi kur: (Ev Görevi) Okuma/video izleme hazırlığı -> (Sınıf İçi) Direkt problem çözme, mentörlük ve işbirlikli pratik adımlarını yaz."
      },
      {
        id: "eng-peer-instruction-think-pair",
        icon: "💬",
        name: "Düşün-Eşleş-Paylaş (Think-Pair-Share)",
        category: "engagement",
        description: "Bireysel düşünme, akranla tartışma ve sınıfla paylaşma adımlı ders akışı.",
        layer: 3,
        requires: ["eng-socratic-seminar-guide"],
        prompt: "Think-Pair-Share (Düşün-Eşleş-Paylaş) İkna Egzersizi kurgula: Çelişkili bir konsept sorusu ver; öğrencilerin önce tek başına düşünmesini, sonra akranını ikna etmesini sağlayan akış yaz."
      },
      {
        id: "rub-holistic-analytical-rubric",
        icon: "📊",
        name: "Analitik Değerlendirme Rubriği",
        category: "rubrics",
        description: "Kriterleri 4 seviyede (Yetersiz, Geliştirilmeli, Başarılı, Mükemmel) detaylandıran rubrik.",
        layer: 1,
        requires: [],
        prompt: "Çok Kriterli Analitik Rubrik (Analytic Rubric) oluştur: Performansı 4 ana kriter üzerinden, 4 başarı seviyesinde (1-Yetersiz, 2-Gelişmekte, 3-Yetkin, 4-Mükemmel) somut davranışsal ifadelerle matris olarak yaz."
      },
      {
        id: "rub-single-point-rubric",
        icon: "🎯",
        name: "Tek Nokta (Single-Point) Rubriği",
        category: "rubrics",
        description: "Merkeze başarı standardını koyup sağa geliştirme, sola övgü alanı açar.",
        layer: 2,
        requires: ["rub-holistic-analytical-rubric"],
        prompt: "Single-Point Rubric (Tek Nokta Rubriği) tasarla: Sol Kolon: [Geliştirilmesi Gereken Alanlar] | Orta Kolon: [HEDEF BAŞARI STANDARDI] | Sağ Kolon: [Standardı Aşan Özgün Yanlar] şeklinde düzenle."
      },
      {
        id: "rub-objective-performance-criteria",
        icon: "🔍",
        name: "Somut Gözlemlenebilir Performans Ölçütleri",
        category: "rubrics",
        description: "Öznel değerlendirmeleri kaldırıp yerine sayısal ve somut kanıt kriterleri koyar.",
        layer: 2,
        requires: ["rub-holistic-analytical-rubric"],
        prompt: "Rubrikteki tüm muğlak sıfatları ('iyi yazılmış', 'güzel sunum') sil: Yerine 'en az 3 ampirik kaynak içeren', 'hata oranı %5'in altında olan' gibi somut gözlemlenebilir kanıt kriterleri koy."
      },
      {
        id: "rub-exemplar-anchor-papers",
        icon: "🥇",
        name: "Örnek Çıktı (Anchor Papers) Matrisi",
        category: "rubrics",
        description: "Altın, Gümüş ve Bronz seviyedeki örnek öğrenci çalışmalarını betimler.",
        layer: 2,
        requires: ["rub-holistic-analytical-rubric"],
        prompt: "Örnek Çıktı (Anchor Exemplars) tanımları yaz: Mükemmel (Altın), Ortalama (Gümüş) ve Yetersiz (Bronz) seviyedeki örnek öğrenci ödevlerinin niteliksel farklarını açıkça betimle."
      },
      {
        id: "rub-constructive-feedback-bank",
        icon: "💬",
        name: "Yapıcı Geri Bildirim İfade Bankası",
        category: "rubrics",
        description: "Öğretmenin hızlıca kullanabileceği geliştirici geri bildirim cümleleri üretir.",
        layer: 3,
        requires: ["rub-single-point-rubric"],
        prompt: "Öğretmen için Yapıcı Geri Bildirim Bankası (Actionable Feedback Bank) oluştur: Öğrencinin zayıf kaldığı alanlar için incitmeyen ama gelişimi net gösteren 5 hazır geri bildirim kalıbı yaz."
      },
      {
        id: "rub-mastery-threshold-matrix",
        icon: "🏁",
        name: "Standart Tabanlı Ustalık (Mastery) Eşiği",
        category: "rubrics",
        description: "Öğrencinin bir sonraki konuya geçmesi için gereken ustalık kriterini koyar.",
        layer: 3,
        requires: ["rub-objective-performance-criteria"],
        prompt: "Ustalık Tabanlı Geçiş Eşiği (Mastery Threshold) belirle: Öğrencinin 'geçti' sayılması ve sonraki üniteye erişmesi için minimum %80 performans göstermesi gereken vazgeçilmez temel becerileri kilitle."
      }
    ],
    en: [
      {
        id: "tax-blooms-question-matrix",
        icon: "🧠",
        name: "Bloom's Taxonomy Cognitive Matrix",
        category: "taxonomy",
        description: "Constructs questions across all six Bloom cognitive levels from Remember to Create.",
        layer: 1,
        requires: [],
        prompt: "Construct a Bloom's Taxonomy Question Matrix: Draft 1 target assessment question for each level: Remember, Understand, Apply, Analyze, Evaluate, and Create."
      },
      {
        id: "tax-depth-of-knowledge-dok",
        icon: "📊",
        name: "Webb's DOK Rigor Calibration",
        category: "taxonomy",
        description: "Ranks and elevates tasks across Webb's Depth of Knowledge levels 1 to 4.",
        layer: 1,
        requires: ["tax-blooms-question-matrix"],
        prompt: "Align learning tasks to Webb's Depth of Knowledge (DOK): Elevate basic DOK 1 (Recall) tasks into DOK 3 (Strategic Thinking) and DOK 4 (Extended Thinking) investigations."
      },
      {
        id: "tax-solo-taxonomy-aligner",
        icon: "🧱",
        name: "SOLO Taxonomy Structural Evaluator",
        category: "taxonomy",
        description: "Classifies student responses from Unistructural to Extended Abstract levels.",
        layer: 2,
        requires: ["tax-blooms-question-matrix"],
        prompt: "Evaluate learning outcomes via SOLO Taxonomy: Classify target understanding levels across Unistructural, Multistructural, Relational, and Extended Abstract stages."
      },
      {
        id: "tax-affective-domain-goals",
        icon: "❤️",
        name: "Krathwohl's Affective Domain Goals",
        category: "taxonomy",
        description: "Designs learning goals targeting student attitudes, values, and characterization.",
        layer: 2,
        requires: ["tax-blooms-question-matrix"],
        prompt: "Formulate Affective Domain Learning Objectives (Krathwohl): Map growth across Receiving, Responding, Valuing, Organizing, and Characterizing by a Value System."
      },
      {
        id: "tax-psychomotor-skill-scaffolding",
        icon: "✋",
        name: "Psychomotor Skill Scaffolding (Dave)",
        category: "taxonomy",
        description: "Maps physical skill progression from imitation to naturalized mastery.",
        layer: 2,
        requires: ["tax-blooms-question-matrix"],
        prompt: "Map Psychomotor Skill Scaffolding (Dave's Taxonomy): Outline progression steps through Imitation, Manipulation, Precision, Articulation, and Naturalization."
      },
      {
        id: "tax-higher-order-prompting",
        icon: "🎯",
        name: "Higher-Order Thinking Generator",
        category: "taxonomy",
        description: "Converts rote recall questions into critical thinking open-ended prompts.",
        layer: 3,
        requires: ["tax-depth-of-knowledge-dok"],
        prompt: "Replace rote recall prompts: Generate 3 Higher-Order Thinking Skills (HOTS) questions requiring students to construct hypotheses, question assumptions, and evaluate trade-offs."
      },
      {
        id: "cur-backward-design-ubd",
        icon: "🎯",
        name: "Backward Curriculum Design (UbD)",
        category: "curriculum",
        description: "Applies Wiggins & McTighe UbD framework: desired results -> assessment -> learning plan.",
        layer: 1,
        requires: [],
        prompt: "Apply Understanding by Design (UbD) Backward Design: (Stage 1) Identify Desired Results & Big Ideas -> (Stage 2) Determine Assessment Evidence -> (Stage 3) Design Learning Experiences."
      },
      {
        id: "cur-scaffolding-chunking",
        icon: "🧩",
        name: "Cognitive Load & Micro-Chunking",
        category: "curriculum",
        description: "Chunks complex concepts into digestible micro-lessons to prevent cognitive overload.",
        layer: 2,
        requires: ["cur-backward-design-ubd"],
        prompt: "Apply Cognitive Load Theory: Structure topic delivery into 10-15 minute digestible Micro-Chunks interleaved with cognitive processing breaks."
      },
      {
        id: "cur-interleaving-spaced-curriculum",
        icon: "🔄",
        name: "Interleaved & Spaced Schedule",
        category: "curriculum",
        description: "Distributes learning topics across time with interleaved practice to maximize retention.",
        layer: 2,
        requires: ["cur-backward-design-ubd"],
        prompt: "Architect an Interleaved & Spaced Curriculum Schedule: Re-arrange linear topics into a spiral curriculum map revisiting prior concepts at strategic intervals."
      },
      {
        id: "cur-cross-disciplinary-bridge",
        icon: "🌉",
        name: "Cross-Disciplinary Project Builder",
        category: "curriculum",
        description: "Connects core subjects with complementary STEM/STEAM disciplines.",
        layer: 2,
        requires: ["cur-backward-design-ubd"],
        prompt: "Design a Cross-Disciplinary STEM/STEAM Unit: Integrate the primary subject with complementary concepts from [Mathematics / Ethics / History / Coding]."
      },
      {
        id: "cur-competency-based-map",
        icon: "🗺️",
        name: "Competency-Based Skill Matrix",
        category: "curriculum",
        description: "Replaces seat-time progression with concrete competency mastery criteria.",
        layer: 2,
        requires: ["cur-backward-design-ubd"],
        prompt: "Build a Competency-Based Learning Map: Replace seat-time requirements with explicit 'Can-Do' mastery statements and micro-credential skill thresholds."
      },
      {
        id: "cur-universal-learning-design",
        icon: "♿",
        name: "Universal Design for Learning (UDL)",
        category: "curriculum",
        description: "Ensures accessible learning via multiple means of representation and engagement.",
        layer: 3,
        requires: ["cur-scaffolding-chunking"],
        prompt: "Implement Universal Design for Learning (UDL): Incorporate (a) Multiple Means of Representation, (b) Multiple Means of Action & Expression, and (c) Multiple Means of Engagement."
      },
      {
        id: "ass-formative-exit-ticket",
        icon: "🎟️",
        name: "Formative Exit Ticket Generator",
        category: "assessment",
        description: "Creates 2-minute end-of-class formative comprehension check tickets.",
        layer: 1,
        requires: [],
        prompt: "Design a Formative Exit Ticket: Include 3 quick checks: 'Core takeaway today', 'Single remaining point of confusion', and 1 rapid application question."
      },
      {
        id: "ass-summative-capstone-spec",
        icon: "🏆",
        name: "Summative Capstone Project Spec",
        category: "assessment",
        description: "Authorizes comprehensive capstone project specifications synthesizing course goals.",
        layer: 2,
        requires: ["ass-formative-exit-ticket"],
        prompt: "Draft a Summative Capstone Project Specification: Define project deliverables, operational constraints, submission formats, and evaluation rubrics."
      },
      {
        id: "ass-authentic-task-assessment",
        icon: "💼",
        name: "Authentic Task Assessment Design",
        category: "assessment",
        description: "Replaces standardized tests with real-world professional problem-solving tasks.",
        layer: 2,
        requires: ["ass-formative-exit-ticket"],
        prompt: "Design an Authentic Performance Assessment: Position students in a real-world professional role solving an actual client problem instead of taking a paper test."
      },
      {
        id: "ass-item-analysis-distractor",
        icon: "📝",
        name: "Multiple-Choice Distractor Rigor",
        category: "assessment",
        description: "Audits test items to ensure distractors target common conceptual errors.",
        layer: 2,
        requires: ["ass-formative-exit-ticket"],
        prompt: "Audit Multiple-Choice Question Quality: Check option length balance and ensure distractors explicitly target common student misconceptions rather than trick syntax."
      },
      {
        id: "ass-diagnostic-prior-knowledge",
        icon: "🔍",
        name: "Diagnostic Prior-Knowledge Audit",
        category: "assessment",
        description: "Uncovers student misconceptions and prerequisite readiness prior to units.",
        layer: 2,
        requires: ["ass-formative-exit-ticket"],
        prompt: "Create a Pre-Unit Diagnostic Assessment: Draft 5 diagnostic questions designed to expose student misconceptions and missing prerequisite knowledge."
      },
      {
        id: "ass-peer-self-eval-protocol",
        icon: "🤝",
        name: "Peer & Self-Assessment Protocol",
        category: "assessment",
        description: "Establishes metacognitive rubrics for peer review and self-reflection.",
        layer: 3,
        requires: ["ass-authentic-task-assessment"],
        prompt: "Construct a Peer & Self-Assessment Protocol: Provide structured rubrics enabling students to give constructive peer feedback and self-evaluate metacognitively."
      },
      {
        id: "eng-gamification-loop",
        icon: "🎮",
        name: "Gamified Learning Loop Mechanics",
        category: "engagement",
        description: "Injects quests, XP points, and level progression to drive intrinsic motivation.",
        layer: 1,
        requires: [],
        prompt: "Integrate Gamification Architecture: Design quest lines, experience points (XP), level progression, and micro-badges to boost engagement."
      },
      {
        id: "eng-socratic-seminar-guide",
        icon: "🗣️",
        name: "Socratic Seminar Discussion Guide",
        category: "engagement",
        description: "Facilitates student-led text-centered group inquiry and discussion.",
        layer: 2,
        requires: ["eng-gamification-loop"],
        prompt: "Structure a Socratic Seminar Guide: Formulate opening, clarification, and closing questions that foster student-led, text-centered group inquiry."
      },
      {
        id: "eng-active-recall-drill",
        icon: "⚡",
        name: "Active Recall Flashcard Engine",
        category: "engagement",
        description: "Replaces passive reading with forced memory retrieval practice.",
        layer: 2,
        requires: ["eng-gamification-loop"],
        prompt: "Build an Active Recall Drill: Replace passive review with 5 forced-retrieval prompts compelling students to reconstruct core concepts from memory."
      },
      {
        id: "eng-case-study-dilemma-builder",
        icon: "📖",
        name: "Case-Based Dilemma Scenario",
        category: "engagement",
        description: "Places learners inside complex real-world organizational dilemmas.",
        layer: 2,
        requires: ["eng-gamification-loop"],
        prompt: "Write a Real-World Case Dilemma: Place learners in a complex scenario forcing a choice between competing priorities with no easy right answer."
      },
      {
        id: "eng-flipper-classroom-prep",
        icon: "🔄",
        name: "Flipped Classroom Pre-Work Blueprint",
        category: "engagement",
        description: "Shifts direct instruction to pre-work, reserving class time for active practice.",
        layer: 2,
        requires: ["eng-gamification-loop"],
        prompt: "Blueprint a Flipped Classroom Sequence: Define asynchronous pre-class content acquisition and map synchronous class time strictly to collaborative problem-solving."
      },
      {
        id: "eng-peer-instruction-think-pair",
        icon: "💬",
        name: "Think-Pair-Share Scripting",
        category: "engagement",
        description: "Structures individual reflection, peer debate, and class synthesis steps.",
        layer: 3,
        requires: ["eng-socratic-seminar-guide"],
        prompt: "Script a Peer Instruction (Think-Pair-Share) exercise: Present a conceptual challenge, mandate individual reflection, and guide peer-to-peer persuasive debate."
      },
      {
        id: "rub-holistic-analytical-rubric",
        icon: "📊",
        name: "Multi-Tier Analytical Rubric",
        category: "rubrics",
        description: "Generates multi-criteria scoring rubrics across 4 performance tiers.",
        layer: 1,
        requires: [],
        prompt: "Construct a Multi-Tier Analytical Rubric: Map performance across 4 evaluation criteria and 4 achievement levels (Unsatisfactory, Developing, Proficient, Exemplary)."
      },
      {
        id: "rub-single-point-rubric",
        icon: "🎯",
        name: "Single-Point Rubric Generator",
        category: "rubrics",
        description: "Focuses on central target standards flanked by areas for growth and mastery.",
        layer: 2,
        requires: ["rub-holistic-analytical-rubric"],
        prompt: "Create a Single-Point Rubric: Format as Left Column: [Concerns / Areas for Growth] | Center Column: [TARGET MASTERY STANDARD] | Right Column: [Exceeds Standards]."
      },
      {
        id: "rub-objective-performance-criteria",
        icon: "🔍",
        name: "Observable Performance Criteria",
        category: "rubrics",
        description: "Replaces subjective adjectives with measurable behavioral evidence.",
        layer: 2,
        requires: ["rub-holistic-analytical-rubric"],
        prompt: "Purge subjective adjectives ('good', 'well-written'): Replace with concrete observable performance evidence (e.g., 'includes 3 peer-reviewed citations')."
      },
      {
        id: "rub-exemplar-anchor-papers",
        icon: "🥇",
        name: "Exemplar Anchor Paper Matrix",
        category: "rubrics",
        description: "Describes qualitative benchmarks for Gold, Silver, and Bronze student work.",
        layer: 2,
        requires: ["rub-holistic-analytical-rubric"],
        prompt: "Draft Exemplar Anchor Paper Descriptions: Articulate explicit qualitative distinctions separating Gold (Exemplary), Silver (Proficient), and Bronze (Developing) student work."
      },
      {
        id: "rub-constructive-feedback-bank",
        icon: "💬",
        name: "Actionable Feedback Bank Generator",
        category: "rubrics",
        description: "Compiles reusable, growth-oriented feedback prompts for educators.",
        layer: 3,
        requires: ["rub-single-point-rubric"],
        prompt: "Build an Actionable Feedback Bank: Provide 5 growth-oriented feedback templates addressing common student performance gaps constructively."
      },
      {
        id: "rub-mastery-threshold-matrix",
        icon: "🏁",
        name: "Standards-Based Mastery Thresholds",
        category: "rubrics",
        description: "Establishes non-negotiable mastery gates required for topic advancement.",
        layer: 3,
        requires: ["rub-objective-performance-criteria"],
        prompt: "Establish Standards-Based Mastery Thresholds: Define non-negotiable 80% baseline competency criteria required before students unlock downstream modules."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 11. BUSINESS (İş & Strateji)
  // ---------------------------------------------------------------------------
  business: {
    tr: [
      {
        id: "val-problem-solution-fit",
        icon: "🧩",
        name: "Problem-Çözüm Uyum Stres Testi",
        category: "validation",
        description: "Çözümün pazardaki gerçek ve acı veren bir soruna denk geldiğini doğrular.",
        layer: 1,
        requires: [],
        prompt: "Problem-Çözüm Uyumu (Problem-Solution Fit) stres testi yap: Müşterinin çektiği acı (Pain Point) yeterince şiddetli, sık yaşanan ve bütçe ayrılan bir sorun mu?"
      },
      {
        id: "val-customer-interview-script",
        icon: "🎙️",
        name: "Mom Test Müşteri Mülakat Rehberi",
        category: "validation",
        description: "Müşterinin yalan söylemesini engelleyen Rob Fitzpatrick Mom Test soruları.",
        layer: 1,
        requires: ["val-problem-solution-fit"],
        prompt: "Rob Fitzpatrick'in 'The Mom Test' ilkelerine uygun Müşteri Mülakat Rehberi yaz: Geleceğe dair sözler veya övgü isteyen soruları sil; geçmişteki gerçek davranışları sorgula."
      },
      {
        id: "val-smoke-test-landing-page",
        icon: "🧪",
        name: "MVP Duman Testi (Smoke Test) Şartnamesi",
        category: "validation",
        description: "Kod yazmadan ürün talebini ölçen Landing Page deneyi tasarlar.",
        layer: 2,
        requires: ["val-problem-solution-fit"],
        prompt: "MVP Duman Testi (Smoke Test) deneyi tasarla: Kod yazmadan önce talebi doğrulamak için landing page, değer önerisi başlığı ve 'Ön Sipariş / Bekleme Listesi' dönüşüm hunisi kur."
      },
      {
        id: "val-value-prop-canvas",
        icon: "💎",
        name: "Osterwalder Değer Önerisi Tuvali",
        category: "validation",
        description: "Müşteri işleri, acıları ve kazançları ile ürün özelliklerini eşleştirir.",
        layer: 2,
        requires: ["val-problem-solution-fit"],
        prompt: "Osterwalder Değer Önerisi Tuvalini (Value Proposition Canvas) doldur: (a) Müşteri İşleri, Acıları, Kazançları ile (b) Ağrı Kesiciler, Kazanç Sağlayıcılar ve Ürün Özelliklerini eşle."
      },
      {
        id: "val-jobs-to-be-done-jtbd",
        icon: "🎯",
        name: "Jobs-to-be-Done (JTBD) Çerçevesi",
        category: "validation",
        description: "Müşterinin ürünü hangi duygusal ve fonksiyonel iş için 'kiraladığını' bulur.",
        layer: 2,
        requires: ["val-problem-solution-fit"],
        prompt: "Jobs-to-be-Done (JTBD) analizini uygula: Müşteri bu ürünü yaşamındaki hangi fonksiyonel, sosyal ve duygusal değişimi gerçekleştirmek için 'kiralıyor' (hires)?"
      },
      {
        id: "val-pivot-or-persevere-audit",
        icon: "🔄",
        name: "Pivot vs. Sebat (Persevere) Denetimi",
        category: "validation",
        description: "Mevcut stratejide ısrar mı edileceğini yoksa yön mü değiştirileceğini ölçer.",
        layer: 3,
        requires: ["val-smoke-test-landing-page"],
        prompt: "Pivot vs. Sebat (Persevere) değerlendirmesi yap: Kazanılan müşteri öğrenme verileri ışığında ana hipotezi değiştirmemiz (Pivot) mi gerekir, yoksa optimizasyona devam mı?"
      },
      {
        id: "mkt-tam-sam-som-calc",
        icon: "📊",
        name: "TAM-SAM-SOM Pazar Büyüklüğü Motoru",
        category: "market",
        description: "Pazar potansiyelini Taban-Yukarı (Bottom-up) yöntemle hesaplar.",
        layer: 1,
        requires: [],
        prompt: "TAM, SAM ve SOM pazar büyüklüklerini hesapla: (TAM: Toplam Adreslenebilir Pazar, SAM: Hizmet Verilebilir Pazar, SOM: Elde Edilebilir Pazar) değerlerini Taban-Yukarı (Bottom-up) veriyle doğrula."
      },
      {
        id: "mkt-porters-five-forces",
        icon: "🏛️",
        name: "Porter'ın 5 Güç Sektör Denetimi",
        category: "market",
        description: "Sektörün rekabet yoğunluğunu ve kar marjı baskısını analiz eder.",
        layer: 2,
        requires: ["mkt-tam-sam-som-calc"],
        prompt: "Porter'ın 5 Güç Modelini (Five Forces) uygula: (1) Yeni girenlerin tehdidi, (2) İkame ürünler, (3) Alıcıların gücü, (4) Tedarikçilerin gücü ve (5) Sektör içi rekabeti puanla."
      },
      {
        id: "mkt-pestel-macro-analysis",
        icon: "🌐",
        name: "PESTEL Makro Çevre Taraması",
        category: "market",
        description: "Politik, Ekonomik, Sosyal, Teknolojik, Etik ve Yasal riskleri tarar.",
        layer: 2,
        requires: ["mkt-tam-sam-som-calc"],
        prompt: "PESTEL Makro Analiz yap: Politik, Ekonomik, Sosyokültürel, Teknolojik, Ekolojik ve Yasal çevre dinamiklerinin iş modeline getirdiği tehdit ve fırsatları haritalandır."
      },
      {
        id: "mkt-competitor-matrix-positioning",
        icon: "🗺️",
        name: "Rakip Konumlandırma Algı Matrisi",
        category: "market",
        description: "Rakipleri 2 kritik eksende haritalandırıp pazardaki beyaz alanı (White Space) bulur.",
        layer: 2,
        requires: ["mkt-porters-five-forces"],
        prompt: "Rakip Konumlandırma Algı Haritası (Perceptual Map) oluştur: Rakipleri 2 stratejik eksende konumlandır ve pazarda kimsenin sahiplenmediği 'Beyaz Alanı' (White Space) tespit et."
      },
      {
        id: "mkt-blue-ocean-strategy",
        icon: "🌊",
        name: "Mavi Okyanus ve ERRC Matrisi",
        category: "market",
        description: "Rekabeti anlamsız kılmak için Yok Et-Azalt-Yükselt-Yarat (ERRC) matrisi kurar.",
        layer: 3,
        requires: ["mkt-competitor-matrix-positioning"],
        prompt: "Mavi Okyanus Stratejisi (ERRC Grid) uygula: Sektörün kabul ettiği hangi unsurları (a) Yok Edeceğiz, (b) Azaltacağız, (c) Yükselteceğiz ve (d) Yaratacağız?"
      },
      {
        id: "mkt-icp-persona-definition",
        icon: "👤",
        name: "İdeal Müşteri Profili (ICP) Mimarısı",
        category: "market",
        description: "En yüksek LTV veren ideal kurumsal/bireysel müşteriyi profiller.",
        layer: 3,
        requires: ["mkt-tam-sam-som-calc"],
        prompt: "İdeal Müşteri Profilini (ICP) tanımla: Şirket ölçeği, bütçesi, karar verici unvanı, kullandığı teknolojiler ve satın alma tetikleyicilerini detaylandır."
      },
      {
        id: "eco-cac-ltv-ratio-check",
        icon: "⚖️",
        name: "CAC:LTV Oranı ve Amorti Süresi Denetimi",
        category: "unit-economics",
        description: "Müşteri edinme maliyeti ile yaşam boyu değer dengesini ($LTV > 3 \\times CAC$) test eder.",
        layer: 1,
        requires: [],
        prompt: "Birim Ekonomisi (Unit Economics) denetimi yap: Müşteri Edinme Maliyeti (CAC), Müşteri Yaşam Boyu Değeri (LTV) ve CAC Geri Ödeme Süresini (Payback Period) $LTV/CAC \\ge 3$ kuralına göre doğrula."
      },
      {
        id: "eco-cohort-retention-curve",
        icon: "📈",
        name: "Kohort Elde Tutma (Retention) ve Churn Engine",
        category: "unit-economics",
        description: "Kullanıcı tutundurma eğrisini inceleyip sızıntılı kova (leaky bucket) sorununu çözer.",
        layer: 2,
        requires: ["eco-cac-ltv-ratio-check"],
        prompt: "Kohort Analizi (Cohort Retention Curve) ve Churn Oranını denetle: Müşteri kaybının (Net Churn) hangi ayda düzleştiğini ve 'sızıntılı kova' problemini nasıl kapatacağını belirle."
      },
      {
        id: "eco-pricing-tier-strategy",
        icon: "🏷️",
        name: "Değer Tabanlı Fiyatlandırma Stratejisi",
        category: "unit-economics",
        description: "Maliyet tabanlı yerine müşterinin algıladığı değere göre katmanlı fiyatlama kurar.",
        layer: 2,
        requires: ["eco-cac-ltv-ratio-check"],
        prompt: "Değer Tabanlı Fiyatlandırma (Value-Based Pricing) modeli kurgula: Ürünü [Good / Better / Best] şeklinde 3 katmanlı pakete böl ve fiyat çapasını (price anchor) tanımla."
      },
      {
        id: "eco-gross-margin-breakdown",
        icon: "📊",
        name: "Brüt Kar Marjı ve Katkı Payı Denetimi",
        category: "unit-economics",
        description: "Satışların doğrudan maliyetlerini (COGS) ve brüt marj sürdürülebilirliğini ölçer.",
        layer: 2,
        requires: ["eco-cac-ltv-ratio-check"],
        prompt: "Brüt Kar Marjı (Gross Margin) ve COGS kalemlerini analiz et: Yazılım/ürün teslim maliyetlerini düşürerek brüt marjı %70+ seviyesine çıkaracak ölçek ekonomisi adımlarını yaz."
      },
      {
        id: "eco-burn-rate-runway-calc",
        icon: "🔥",
        name: "Nakit Yakış Hızı (Burn Rate) & Runway",
        category: "unit-economics",
        description: "Mevcut nakdin kaç ay yeteceğini (Runway) ve net yakış hızını hesaplar.",
        layer: 3,
        requires: ["eco-cac-ltv-ratio-check"],
        prompt: "Nakit Yakış Hızı (Net Burn Rate) ve Runway süresini hesapla: Şirketin kasasındaki nakdin kaç ay yeteceğini ve sıfır nakit gününe (Default Alive vs. Default Dead) kalan süreyi raporla."
      },
      {
        id: "eco-freemium-conversion-funnel",
        icon: "🧲",
        name: "Freemium'dan Ücretliye Dönüşüm Hunisi",
        category: "unit-economics",
        description: "Ücretsiz kullanıcıları ücretli pakete geçiren tetikleyici kısıtları koyar.",
        layer: 3,
        requires: ["eco-pricing-tier-strategy"],
        prompt: "Freemium Dönüşüm Hunisini tasarla: Ücretsiz versiyondaki 'Değer Duvarı' (Paywall) kısıtlarını (kullanım limiti, gelişmiş özellik) kurarak %3-5 dönüşüm oranını hedefle."
      },
      {
        id: "pit-10-slide-pitch-deck",
        icon: "📊",
        name: "10 Slaytlık Yatırımcı Pitch Deck Mimarisi",
        category: "pitch",
        description: "Sequoia/YC formatında 10 slaytlık yatırımcı sunumu omurgası kurar.",
        layer: 1,
        requires: [],
        prompt: "Sequoia Standartlarında 10 Slaytlık Pitch Deck taslağı çıkar: (1. Problem, 2. Çözüm, 3. Pazar, 4. Ürün, 5. Çekim/Traction, 6. İş Modeli, 7. Rekabet, 8. Ekip, 9. Finansallar, 10. Yatırım Talebi)."
      },
      {
        id: "pit-hook-elevator-pitch",
        icon: "⏱️",
        name: "30 Saniyelik Asansör Cümlesi (Elevator Pitch)",
        category: "pitch",
        description: "Girişimin değer önerisini 30 saniyede akılda kalıcı şekilde özetler.",
        layer: 2,
        requires: ["pit-10-slide-pitch-deck"],
        prompt: "30 Saniyelik Asansör Cümlesi (Elevator Pitch) yaz: 'Biz [Hedef Kitle] için [Sorunu] çözen ve [Farklılaştıran Özellik] sayesinde [Büyük Fayda] sağlayan bir platformuz' kalıbını keskinleştir."
      },
      {
        id: "pit-investor-qa-defense",
        icon: "🛡️",
        name: "Yatırımcı Soru-Cevap Savunma Matrisi",
        category: "pitch",
        description: "Yatırımcıların soracağı en zor 5 itiraza hazır yanıtlar kurgular.",
        layer: 2,
        requires: ["pit-10-slide-pitch-deck"],
        prompt: "Yatırımcı Soru-Cevap (Q&A Defense) Matrisi hazırla: 'Google yarın bu işi yaparsa ne olur?', 'CAC'niz neden yüksek?' gibi en zor 5 itiraz için veriye dayalı savunma hazırla."
      },
      {
        id: "pit-traction-milestone-roadmap",
        icon: "🚀",
        name: "Traction & Yol Haritası Gösterimi",
        category: "pitch",
        description: "Geçmiş büyüme ivmesini ve gelecekteki 18 aylık kilometre taşlarını sergiler.",
        layer: 2,
        requires: ["pit-10-slide-pitch-deck"],
        prompt: "Traction ve Kilometre Taşları (Milestones) slaytını kurgula: Aylık Büyüme Oranı (MoM Growth), MRR gelişimi ve alınan yatırımla ulaşılacak 18 aylık ana hedefleri görselleştir."
      },
      {
        id: "pit-narrative-arc-storytelling",
        icon: "📖",
        name: "Girişimci Hikaye Arkı (Storytelling)",
        category: "pitch",
        description: "Sunumu kuru rakamlardan çıkarıp duygusal ve mantıksal bir hikayeye dönüştürür.",
        layer: 3,
        requires: ["pit-hook-elevator-pitch"],
        prompt: "Pitch Deck Narrative Arc (Hikaye Anlatımı) oluştur: Yatırımcıyı duygusal çengel ile yakalayıp, pazar acısıyla yüzleştirip, ürünün kaçınılmaz zaferiyle tamamlanan bir anlatı kur."
      },
      {
        id: "pit-data-room-checklist",
        icon: "📁",
        name: "Yatırımcı Data Room Hazırlık Listesi",
        category: "pitch",
        description: "Due-diligence süreci için gerekli hukuki, finansal ve teknik belgeleri düzenler.",
        layer: 3,
        requires: ["pit-10-slide-pitch-deck"],
        prompt: "Yatırımcı Data Room Kontrol Listesi hazırla: Cap Table, Finansal Model, Müşteri Sözleşmeleri, IP Tescilleri ve Hukuki belgelerin eksiksiz klasör yapısını sun."
      },
      {
        id: "rsk-business-pre-mortem",
        icon: "💀",
        name: "Şirket İçi İş Pre-Mortem Analizi",
        category: "risk",
        description: "Girişimin 3 yıl sonra iflas ettiğini varsayıp nedenlerini önceden çözer.",
        layer: 1,
        requires: [],
        prompt: "İş Modeli Pre-Mortem Analizi yap: Bugünden 3 yıl sonrasındayız ve şirket İFLAS ETTİ. Otopsiyi yap: Bizi iflasa götüren ana riskler (nakit tükenmesi, yanlış kurucu ortak, pazar ilgisizliği) neydi?"
      },
      {
        id: "rsk-swot-matrix-action",
        icon: "🧩",
        name: "Eyleme Dönüştürülebilir TOWS/SWOT Matrisi",
        category: "risk",
        description: "Güçlü ve zayıf yönleri fırsat ve tehditlerle çaprazlayıp strateji üretir.",
        layer: 2,
        requires: ["rsk-business-pre-mortem"],
        prompt: "TOWS Matrisi (Eyleme Dönüştürülebilir SWOT) oluştur: Güçlü Yanları Fırsatlarla (SO), Zayıf Yanları Tehditlerle (WT) çaprazlayarak somut stratejik elem adımları yaz."
      },
      {
        id: "rsk-regulatory-moat-check",
        icon: "🏰",
        name: "Yasal & Fikri Mülkiyet Hendek (Moat) Analizi",
        category: "risk",
        description: "Patent, marka tescili ve regülasyon uyumu ile rekabet avantajı savunması.",
        layer: 2,
        requires: ["rsk-business-pre-mortem"],
        prompt: "Rekabetçi Hendek (Defensibility / Economic Moat) analizi yap: Girişimi rakiplerin taklit etmesini engelleyecek Şebeke Etkisi (Network Effects), Patent/IP veya Yüksek Geçiş Maliyeti engelini kur."
      },
      {
        id: "rsk-single-point-failure",
        icon: "⚠️",
        name: "Operasyonel Tek Nokta Hata (SPOF) Taraması",
        category: "risk",
        description: "Sistemi çökertebilecek tek bir tedarikçiye veya kişiye bağımlılığı bulur.",
        layer: 2,
        requires: ["rsk-business-pre-mortem"],
        prompt: "Tek Nokta Hata (Single Point of Failure - SPOF) taraması yap: Şirketin kilit bir tedarikçiye, tek bir kilit çalışana veya bağımlı olunan tek bir kanala olan kırılganlığını tespit et."
      },
      {
        id: "rsk-scenario-financial-stress",
        icon: "📉",
        name: "Finansal Stres Senaryosu (Bear/Base/Bull)",
        category: "risk",
        description: "Gelirlerin %50 düştüğü kötümser senaryoda finansal dayanıklılığı test eder.",
        layer: 3,
        requires: ["rsk-business-pre-mortem"],
        prompt: "Finansal Stres Testi (Bear Case Scenario) yap: Gelirlerin beklenenden %50 düşük gerçekleştiği ve maliyetlerin %20 arttığı kötü senaryoda şirketin hayatta kalma planını çıkar."
      },
      {
        id: "rsk-key-person-dependence",
        icon: "👥",
        name: "Kilit Personel ve Tedarikçi Bağımlılık Denetimi",
        category: "risk",
        description: "Kilit kurucu veya tedarikçi ayrıldığında operasyonun devamlılığını sağlar.",
        layer: 3,
        requires: ["rsk-single-point-failure"],
        prompt: "Kilit Personel ve Tedarikçi Yedekleme Planı (Key-Person Dependency) hazırlayarak bilgi birikimini şirket içine dokümante etme prosedürünü yaz."
      }
    ],
    en: [
      {
        id: "val-problem-solution-fit",
        icon: "🧩",
        name: "Problem-Solution Fit Stress Test",
        category: "validation",
        description: "Verifies that proposed solutions match severe, monetizable market pain points.",
        layer: 1,
        requires: [],
        prompt: "Execute Problem-Solution Fit stress test: Verify that the customer pain point is sufficiently severe, frequent, and backed by existing budget allocations."
      },
      {
        id: "val-customer-interview-script",
        icon: "🎙️",
        name: "Mom Test Customer Interview Guide",
        category: "validation",
        description: "Authors Rob Fitzpatrick Mom Test interview questions to extract unbiased historical facts.",
        layer: 1,
        requires: ["val-problem-solution-fit"],
        prompt: "Draft Customer Interview Guide following 'The Mom Test' principles: Eliminate leading or compliment-seeking questions; query past actual behaviors and spending history."
      },
      {
        id: "val-smoke-test-landing-page",
        icon: "🧪",
        name: "MVP Smoke Test Specification",
        category: "validation",
        description: "Designs pre-code landing page experiments to measure actual market demand.",
        layer: 2,
        requires: ["val-problem-solution-fit"],
        prompt: "Design MVP Smoke Test experiment: Specify value proposition headline, landing page architecture, and pre-order / waitlist conversion funnel prior to writing code."
      },
      {
        id: "val-value-prop-canvas",
        icon: "💎",
        name: "Osterwalder Value Proposition Canvas",
        category: "validation",
        description: "Maps customer jobs, pains, and gains against product features and pain relievers.",
        layer: 2,
        requires: ["val-problem-solution-fit"],
        prompt: "Populate Osterwalder's Value Proposition Canvas: Map (a) Customer Jobs, Pains, and Gains against (b) Pain Relievers, Gain Creators, and Product Features."
      },
      {
        id: "val-jobs-to-be-done-jtbd",
        icon: "🎯",
        name: "Jobs-to-be-Done (JTBD) Framework",
        category: "validation",
        description: "Uncovers functional, social, and emotional jobs customers 'hire' the product to fulfill.",
        layer: 2,
        requires: ["val-problem-solution-fit"],
        prompt: "Apply Jobs-to-be-Done (JTBD) framework: Identify the core functional, social, and emotional job the customer is hiring the product to execute."
      },
      {
        id: "val-pivot-or-persevere-audit",
        icon: "🔄",
        name: "Pivot vs. Persevere Audit",
        category: "validation",
        description: "Evaluates validated learning data to decide between strategic pivot or optimization.",
        layer: 3,
        requires: ["val-smoke-test-landing-page"],
        prompt: "Conduct Pivot vs. Persevere Audit: Evaluate empirical customer learning data to determine whether to pivot core hypotheses or persevere with execution."
      },
      {
        id: "mkt-tam-sam-som-calc",
        icon: "📊",
        name: "TAM-SAM-SOM Market Sizing Engine",
        category: "market",
        description: "Calculates TAM, SAM, and SOM market sizing using bottom-up methodologies.",
        layer: 1,
        requires: [],
        prompt: "Calculate TAM, SAM, and SOM market sizes: Validate Total Addressable Market, Serviceable Addressable Market, and Serviceable Obtainable Market using bottom-up data."
      },
      {
        id: "mkt-porters-five-forces",
        icon: "🏛️",
        name: "Porter's Five Forces Industry Audit",
        category: "market",
        description: "Evaluates industry competitive intensity and profit margin pressures.",
        layer: 2,
        requires: ["mkt-tam-sam-som-calc"],
        prompt: "Perform Porter's Five Forces Audit: Score threat of new entrants, substitute products, bargaining power of buyers, supplier power, and competitive rivalry."
      },
      {
        id: "mkt-pestel-macro-analysis",
        icon: "🌐",
        name: "PESTEL Macro Environment Scanner",
        category: "market",
        description: "Scans Political, Economic, Social, Technological, Environmental, and Legal forces.",
        layer: 2,
        requires: ["mkt-tam-sam-som-calc"],
        prompt: "Execute PESTEL Analysis: Map macroeconomic threats and opportunities across Political, Economic, Social, Technological, Environmental, and Legal dimensions."
      },
      {
        id: "mkt-competitor-matrix-positioning",
        icon: "🗺️",
        name: "Competitor Perceptual Mapping",
        category: "market",
        description: "Plots competitors across key strategic axes to locate market white space.",
        layer: 2,
        requires: ["mkt-porters-five-forces"],
        prompt: "Construct Competitor Perceptual Positioning Map: Plot rivals along 2 key strategic axes to expose unaddressed market white space."
      },
      {
        id: "mkt-blue-ocean-strategy",
        icon: "🌊",
        name: "Blue Ocean Strategy & ERRC Grid",
        category: "market",
        description: "Applies Eliminate-Reduce-Raise-Create grid to render competition irrelevant.",
        layer: 3,
        requires: ["mkt-competitor-matrix-positioning"],
        prompt: "Apply Blue Ocean Strategy (ERRC Grid): Explicitly define industry factors to (a) Eliminate, (b) Reduce, (c) Raise, and (d) Create to unlock uncontested market space."
      },
      {
        id: "mkt-icp-persona-definition",
        icon: "👤",
        name: "Ideal Customer Profile (ICP) Builder",
        category: "market",
        description: "Profiles high-LTV target accounts across firmographic and behavioral attributes.",
        layer: 3,
        requires: ["mkt-tam-sam-som-calc"],
        prompt: "Define Ideal Customer Profile (ICP): Detail target account firmographics, budget thresholds, decision-maker titles, tech stack requirements, and buying triggers."
      },
      {
        id: "eco-cac-ltv-ratio-check",
        icon: "⚖️",
        name: "CAC:LTV Ratio & Payback Audit",
        category: "unit-economics",
        description: "Audits unit economics health ensuring $LTV \\ge 3 \\times CAC$ and healthy payback periods.",
        layer: 1,
        requires: [],
        prompt: "Audit Unit Economics: Evaluate Customer Acquisition Cost (CAC), Lifetime Value (LTV), and Payback Period to ensure $LTV/CAC \\ge 3$ compliance."
      },
      {
        id: "eco-cohort-retention-curve",
        icon: "📈",
        name: "Cohort Retention & Churn Engine",
        category: "unit-economics",
        description: "Analyzes retention curves to fix leaky bucket subscription churn.",
        layer: 2,
        requires: ["eco-cac-ltv-ratio-check"],
        prompt: "Audit Cohort Retention Curves & Net Churn: Identify the flattening point on user retention curves and establish measures to remediate leaky bucket dynamics."
      },
      {
        id: "eco-pricing-tier-strategy",
        icon: "🏷️",
        name: "Value-Based Pricing Tier Strategy",
        category: "unit-economics",
        description: "Architects Good-Better-Best tier structures anchored in perceived customer value.",
        layer: 2,
        requires: ["eco-cac-ltv-ratio-check"],
        prompt: "Architect Value-Based Pricing Tiers: Structure a 3-tier [Good / Better / Best] packaging model with clear value metrics and price anchors."
      },
      {
        id: "eco-gross-margin-breakdown",
        icon: "📊",
        name: "Gross Margin & Contribution Margin",
        category: "unit-economics",
        description: "Audits COGS and delivery costs to target 70%+ gross margins.",
        layer: 2,
        requires: ["eco-cac-ltv-ratio-check"],
        prompt: "Audit Gross Margins & COGS: Detail direct delivery costs and formulate economies-of-scale initiatives to achieve target 70%+ software/service gross margins."
      },
      {
        id: "eco-burn-rate-runway-calc",
        icon: "🔥",
        name: "Burn Rate & Runway Buffer Planning",
        category: "unit-economics",
        description: "Calculates net burn rate and months of runway remaining.",
        layer: 3,
        requires: ["eco-cac-ltv-ratio-check"],
        prompt: "Calculate Net Burn Rate & Runway: Compute cash runway months and evaluate Default Alive vs. Default Dead operational trajectories."
      },
      {
        id: "eco-freemium-conversion-funnel",
        icon: "🧲",
        name: "Freemium to Paid Conversion Funnel",
        category: "unit-economics",
        description: "Establishes paywall friction gates to convert free users to paid subscriptions.",
        layer: 3,
        requires: ["eco-pricing-tier-strategy"],
        prompt: "Design Freemium Conversion Funnel: Establish paywall feature gates and usage limits targeting a 3-5% free-to-paid conversion rate."
      },
      {
        id: "pit-10-slide-pitch-deck",
        icon: "📊",
        name: "10-Slide Pitch Deck Architecture",
        category: "pitch",
        description: "Builds a standard YC/Sequoia 10-slide investor pitch deck framework.",
        layer: 1,
        requires: [],
        prompt: "Structure 10-Slide Investor Pitch Deck (Sequoia Standard): (1. Problem, 2. Solution, 3. Market, 4. Product, 5. Traction, 6. Business Model, 7. Competition, 8. Team, 9. Financials, 10. Ask)."
      },
      {
        id: "pit-hook-elevator-pitch",
        icon: "⏱️",
        name: "30-Second Elevator Pitch Hook",
        category: "pitch",
        description: "Refines core value proposition into a memorable 30-second summary.",
        layer: 2,
        requires: ["pit-10-slide-pitch-deck"],
        prompt: "Draft 30-Second Elevator Pitch: Sharpen the core hook: 'We help [Target Audience] solve [Problem] through [Differentiator] to achieve [Big Benefit]'."
      },
      {
        id: "pit-investor-qa-defense",
        icon: "🛡️",
        name: "Investor Q&A Defense Matrix",
        category: "pitch",
        description: "Prepares data-backed responses for top investor objections.",
        layer: 2,
        requires: ["pit-10-slide-pitch-deck"],
        prompt: "Formulate Investor Q&A Defense Matrix: Prepare data-backed responses for hard investor objections ('What if Google enters?', 'Why is CAC high?')."
      },
      {
        id: "pit-traction-milestone-roadmap",
        icon: "🚀",
        name: "Traction & Key Milestone Roadmap",
        category: "pitch",
        description: "Showcases historical growth momentum and 18-month forward milestones.",
        layer: 2,
        requires: ["pit-10-slide-pitch-deck"],
        prompt: "Structure Traction & Milestones Slide: Highlight MoM growth, MRR metrics, and key operational goals to be unlocked with target investment."
      },
      {
        id: "pit-narrative-arc-storytelling",
        icon: "📖",
        name: "Founder Narrative Arc & Storytelling",
        category: "pitch",
        description: "Transforms pitch decks from dry metrics into compelling story arcs.",
        layer: 3,
        requires: ["pit-hook-elevator-pitch"],
        prompt: "Build Founder Pitch Story Arc: Hook investors emotionally, present acute market pain, and position product as the inevitable category winner."
      },
      {
        id: "pit-data-room-checklist",
        icon: "📁",
        name: "Investor Data Room Readiness",
        category: "pitch",
        description: "Organizes legal, financial, and technical assets for due diligence.",
        layer: 3,
        requires: ["pit-10-slide-pitch-deck"],
        prompt: "Compile Investor Data Room Checklist: Organize cap tables, financial models, customer contracts, IP filings, and corporate legal governance files."
      },
      {
        id: "rsk-business-pre-mortem",
        icon: "💀",
        name: "Business Pre-Mortem Analysis",
        category: "risk",
        description: "Assumes company failure 3 years out to proactively fix root causes.",
        layer: 1,
        requires: [],
        prompt: "Conduct Business Pre-Mortem: Assume it is 3 years in the future and the venture has FAILED. Write the autopsy detailing primary root causes of failure."
      },
      {
        id: "rsk-swot-matrix-action",
        icon: "🧩",
        name: "Actionable TOWS / SWOT Strategy",
        category: "risk",
        description: "Cross-analyzes strengths/weaknesses against external opportunities/threats.",
        layer: 2,
        requires: ["rsk-business-pre-mortem"],
        prompt: "Execute Actionable TOWS Matrix: Pair internal Strengths with external Opportunities (SO) and Weaknesses with Threats (WT) to derive strategic action items."
      },
      {
        id: "rsk-regulatory-moat-check",
        icon: "🏰",
        name: "Economic Moat & Defensibility Audit",
        category: "risk",
        description: "Evaluates network effects, IP patents, and switching costs protecting the business.",
        layer: 2,
        requires: ["rsk-business-pre-mortem"],
        prompt: "Audit Economic Moat & Defensibility: Identify structural barriers (Network Effects, IP/Patents, High Switching Costs) preventing competitor cloning."
      },
      {
        id: "rsk-single-point-failure",
        icon: "⚠️",
        name: "Single Point of Failure (SPOF) Audit",
        category: "risk",
        description: "Scans operations for dangerous dependencies on single vendors or individuals.",
        layer: 2,
        requires: ["rsk-business-pre-mortem"],
        prompt: "Scan for Single Points of Failure (SPOF): Identify vulnerabilities where operations depend dangerously on a single vendor, channel, or individual."
      },
      {
        id: "rsk-scenario-financial-stress",
        icon: "📉",
        name: "Financial Stress Scenario (Bear Case)",
        category: "risk",
        description: "Tests business survival under severe revenue drops and cost increases.",
        layer: 3,
        requires: ["rsk-business-pre-mortem"],
        prompt: "Execute Financial Stress Test (Bear Case): Model cash preservation and survival steps under a 50% revenue drop paired with a 20% cost surge."
      },
      {
        id: "rsk-key-person-dependence",
        icon: "👥",
        name: "Key-Person & Vendor Dependence",
        category: "risk",
        description: "Establishes institutional knowledge redundancy for key team members.",
        layer: 3,
        requires: ["rsk-single-point-failure"],
        prompt: "Formulate Key-Person Continuity Plan: Establish cross-training protocols and institutional knowledge transfer to mitigate key team departure risks."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 12. WELLNESS (Sağlık, Form & Sirkadiyen)
  // ---------------------------------------------------------------------------
  wellness: {
    tr: [
      {
        id: "wrk-progressive-overload-plan",
        icon: "🏋️",
        name: "Kademeli Aşırı Yüklenme (Progressive Overload)",
        category: "workout",
        description: "Kas hipertrofisi ve güç için ağırlık/hacim artış protokolü kurar.",
        layer: 1,
        requires: [],
        prompt: "Kademeli Aşırı Yüklenme (Progressive Overload) planı oluştur: Her hafta mikro yüklenme (ağırlık, tekrar veya set artışı) ile kas gelişimini sürekli kılan antrenman yapısı yaz."
      },
      {
        id: "wrk-rpe-rir-intensity-guide",
        icon: "📊",
        name: "RPE ve RIR Şiddet Kalibrasyonu",
        category: "workout",
        description: "Set şiddetini Algılanan Zorluk Derecesi (RPE 7-9) ve Yedek Tekrar (RIR) ile ayarlar.",
        layer: 1,
        requires: ["wrk-progressive-overload-plan"],
        prompt: "Antrenman şiddetini RPE (Rate of Perceived Exertion) ve RIR (Reps in Reserve) ile kalibre et: Ana bileşik hareketleri RIR 1-2 (RPE 8-9) seviyesinde tutarak tükenişi (failure) yönet."
      },
      {
        id: "wrk-hypertrophy-split-design",
        icon: "💪",
        name: "Kas Hipertrofisi Bölgesel Program (Split)",
        category: "workout",
        description: "İtme-Çekme-Bacak (PPL) veya Alt-Üst Vücut antrenman bölünmesi kurgular.",
        layer: 2,
        requires: ["wrk-progressive-overload-plan"],
        prompt: "Hipertrofi Odaklı Antrenman Bölünmesi (PPL - Push/Pull/Legs veya Upper/Lower) tasarla: Her kas grubunu haftada 2 kez uyaracak frekans ve hacim dağılımı yaz."
      },
      {
        id: "wrk-zone2-cardio-protocol",
        icon: "🫀",
        name: "Zone 2 Kardiyo & Mitokondri Protokolü",
        category: "workout",
        description: "Maksimum nabzın %60-70'inde mitokondri sağlığı ve yağ yakımı kardiyosu.",
        layer: 2,
        requires: ["wrk-progressive-overload-plan"],
        prompt: "Zone 2 Dayanıklılık & Mitokondri Sağlığı protokolü yaz: Haftalık 150-180 dakika, rahat burun nefesi verilebilen (talk test) nabız aralığında aerobik altyapı kardiyosu planla."
      },
      {
        id: "wrk-mobility-joint-prep",
        icon: "🧘",
        name: "Antrenman Öncesi Eklem & Mobilite Isınması",
        category: "workout",
        description: "Dinamik esneme ve eklem mobilizasyonu ile sakatlık riskini düşürür.",
        layer: 2,
        requires: ["wrk-progressive-overload-plan"],
        prompt: "Dinamik Mobilite ve Eklem Isınma Protokolü (RAMP - Raise, Activate, Mobilize, Potentiate) hazırla: Kalça, omuz ve ayak bileği hareket açıklığını artıracak 8 dakikalık akış yaz."
      },
      {
        id: "wrk-hiit-tabata-structure",
        icon: "⏱️",
        name: "Yüksek Şiddetli Aralıklı (HIIT) Tabata",
        category: "workout",
        description: "Kısa sürede yüksek kalori ve VO2 max geliştiren 20/10 sn aralıklı çalışma.",
        layer: 3,
        requires: ["wrk-zone2-cardio-protocol"],
        prompt: "VO2 Max geliştiren HIIT / Tabata antrenmanı kurgula: 20 saniye maksimum patlayıcı güç, 10 saniye aktif dinlenme ile 8 tur süren yüksek yoğunluklu aerobik devre yaz."
      },
      {
        id: "cir-morning-sunlight-anchor",
        icon: "☀️",
        name: "Sabah Güneşi ve Kortizol Çapası",
        category: "circadian",
        description: "Uyandıktan sonraki ilk 30 dakikada doğal ışıkla sirkadiyen saati sıfırlar (Huberman).",
        layer: 1,
        requires: [],
        prompt: "Andrew Huberman Sirkadiyen Sıfırlama protokolü uygula: Uyandıktan sonra ilk 30 dakika içinde 10-15 dakika doğrudan güneş ışığı alarak sabah kortizol zirvesi ve gece melatonin zamanlaması kur."
      },
      {
        id: "cir-blue-light-melatonin-prep",
        icon: "🌙",
        name: "Akşam Mavi Işık ve Melatonin Hijyeni",
        category: "circadian",
        description: "Güneş battıktan sonra ekran ışığını kısıp melatonini doğal olarak yükseltir.",
        layer: 1,
        requires: ["cir-morning-sunlight-anchor"],
        prompt: "Akşam Sirkadiyen Işık Hijyeni tasarla: Yatmadan 2 saat önce mavi ışık maruziyetini sıfırla, ortam ışıklarını göz seviyesinin altına çek ve doğal melatonin salgısını koru."
      },
      {
        id: "cir-temperature-sleep-cooling",
        icon: "❄️",
        name: "Uyku Mimarisi ve Vücut Sıcaklığı Düşürme",
        category: "circadian",
        description: "Derin uyku için yatak odası sıcaklığını (18-19°C) ve vücut soğumasını ayarlar.",
        layer: 2,
        requires: ["cir-blue-light-melatonin-prep"],
        prompt: "Derin Uyku Mimarisi ve Termoregülasyon protokolü kur: Yatak odası sıcaklığını 18-19°C'ye ayarla, sıcak duş sonrası vücut çekirdek sıcaklığının düşüşüyle uykuya geçişi hızlandır."
      },
      {
        id: "cir-caffeine-half-life-cutoff",
        icon: "☕",
        name: "Kafein Yarılanma Ömrü ve Kesilme Zamanı",
        category: "circadian",
        description: "Kafeinin adenozin reseptörlerini tıkamasını engellemek için kesilme saati koyar.",
        layer: 2,
        requires: ["cir-morning-sunlight-anchor"],
        prompt: "Kafein Tüketim Zamanlaması ve Kesilme (Cut-off) Kuralı yaz: Uyandıktan 90-120 dakika sonra ilk kafeini al; kafeinin 6-8 saatlik yarılanma ömrüne göre yatmadan 10 saat önce kafeini kes."
      },
      {
        id: "cir-circadian-meal-timing",
        icon: "🍽️",
        name: "Krono-Beslenme ve Aralıklı Oruç Penceresi",
        category: "circadian",
        description: "Yemek saatlerini sirkadiyen metabolizma ve insülin duyarlılığı ile eşler.",
        layer: 2,
        requires: ["cir-morning-sunlight-anchor"],
        prompt: "Krono-Beslenme (Circadian Fasting) protokolü kurgula: Yemek yeme penceresini gün ışığı saatleriyle sınırla (Örn: 10:00 - 18:00); yatmadan en az 3 saat önce kalori alımını durdur."
      },
      {
        id: "cir-jet-lag-shift-resync",
        icon: "✈️",
        name: "Jet-Lag ve Vardiyalı Çalışma Yeniden Eşleme",
        category: "circadian",
        description: "Zaman dilimi değişikliklerinde vücut saatini ışık ve sıcaklıkla hızlıca adapte eder.",
        layer: 3,
        requires: ["cir-temperature-sleep-cooling"],
        prompt: "Jet-Lag & Vardiyalı Çalışma Sirkadiyen Adaptasyon planı yaz: Hedef zaman diliminin sıcaklık/ışık minimum noktasına (temperature minimum) göre ışık alma ve karartma saatlerini programla."
      },
      {
        id: "nut-macro-distribution-calculator",
        icon: "🥗",
        name: "Kişiselleştirilmiş Makro Dağılım Stratejisi",
        category: "nutrition",
        description: "Hedefe göre Protein, Karbonhidrat ve Yağ gramajlarını kalibre eder.",
        layer: 1,
        requires: [],
        prompt: "Kişiselleştirilmiş Makro Besin Dağılımı hesapla: [Yağ Yakımı / Kas Yapımı / Performans] hedefine göre günlük kilo başına Protein (1.6-2.2g), Karbonhidrat ve Sağlıklı Yağ gramajlarını ver."
      },
      {
        id: "nut-protein-leucine-threshold",
        icon: "🥩",
        name: "Protein Zamanlaması ve Lösin Eşiği",
        category: "nutrition",
        description: "Kas protein sentezini (MPS) tetiklemek için öğün başı 3g lösin kuralı.",
        layer: 2,
        requires: ["nut-macro-distribution-calculator"],
        prompt: "Kas Protein Sentezi (MPS) Tetikleme protokolü kur: Günlük proteini 3-4 eşit öğüne böl; öğün başına en az 3g Lösin (Leucine) içeren kaliteli protein kaynağı yerleştir."
      },
      {
        id: "nut-micronutrient-density-audit",
        icon: "🥑",
        name: "Mikro Besin Yoğunluğu ve Eksiklik Taraması",
        category: "nutrition",
        description: "Magnezyum, Çinko, D3 ve B12 gibi kritik vitamin/mineral alımını ölçer.",
        layer: 2,
        requires: ["nut-macro-distribution-calculator"],
        prompt: "Mikro Besin Yoğunluğu (Nutrient Density) taraması yap: İşlenmiş gıdaları çıkarıp renkli sebzeler, sakatatlar, kuruyemiş ve deniz ürünleri ile Magnezyum, Çinko, D3 eksikliklerini kapat."
      },
      {
        id: "nut-gut-microbiome-fiber-mix",
        icon: "🦠",
        name: "Bağırsak Mikrobiyomu ve Prebiyotik Lif",
        category: "nutrition",
        description: "Bağırsak florasını 30 farklı bitkisel lif kaynağı ile besleme planı.",
        layer: 2,
        requires: ["nut-macro-distribution-calculator"],
        prompt: "Bağırsak Mikrobiyomu Optimizasyonu tasarla: Haftalık 30 farklı çeşitli bitkisel gıda (çeşitli sebze, bakliyat, baharat), fermente gıdalar (kefir, turşu) ve prebiyotik lif ekle."
      },
      {
        id: "nut-hydration-electrolyte-balance",
        icon: "💧",
        name: "Hidrasyon ve Elektrolit (Denge) Protokolü",
        category: "nutrition",
        description: "Sodyum, Potasyum ve Magnezyum dengesi ile hücresel hidrasyon sağlar.",
        layer: 2,
        requires: ["nut-macro-distribution-calculator"],
        prompt: "Hücresel Hidrasyon ve Elektrolit Dengesi rehberi yaz: Sadece saf su içmek yerine, sabahları ve antrenman sırasında Sodyum, Potasyum ve Magnezyum ekleyerek krampları ve halsizliği engelle."
      },
      {
        id: "nut-glycemic-index-energy-stabilizer",
        icon: "📉",
        name: "Glisemik Yük ve Enerji Dalgalanması Engelleyici",
        category: "nutrition",
        description: "Kan şekerini stabil tutarak öğle sonrası çökmeleri (energy crash) engeller.",
        layer: 3,
        requires: ["nut-micronutrient-density-audit"],
        prompt: "Kan Şekeri Stabilitesi ve Öğle Çöküşü (Post-prandial dip) Engelleyici plan yaz: Karbonhidratları sirke, lif ve protein sırasıyla tüketerek insülin dalgalanmalarını sıfırla."
      },
      {
        id: "adp-injury-deload-protocol",
        icon: "🩹",
        name: "Sakatlık Uyum ve Planlı Hafifletme (Deload)",
        category: "adaptation",
        description: "Her 4-6 haftada bir hacmi %50 düşürerek tendon ve merkezi sinir sistemini dinlendirir.",
        layer: 1,
        requires: [],
        prompt: "Planlı Dinlenme (Deload Protocol) tasarla: Her 5 haftalık ağır antrenman bloğu sonrası antrenman hacmini (set x tekrar) %50 düşürerek tendon ve eklem dokularının iyileşmesine izin ver."
      },
      {
        id: "adp-hrv-stress-recovery-readiness",
        icon: "🫀",
        name: "HRV ve SSS İyileşme (Recovery) Ölçümü",
        category: "adaptation",
        description: "Kalp Atış Hızı Değişkenliği (HRV) verisine göre antrenman sertliğini ayarlar.",
        layer: 2,
        requires: ["adp-injury-deload-protocol"],
        prompt: "HRV (Heart Rate Variability) Tabanlı İyileşme Protokolü kurgula: HRV düşüklüğü ve yüksek dinlenik nabız günlerinde ağır yüklenmeyi iptal edip aktif toparlanmaya geç."
      },
      {
        id: "adp-sauna-cold-plunge-protocol",
        icon: "🧊",
        name: "Termal Terapi: Sauna ve Soğuk Maruziyeti",
        category: "adaptation",
        description: "Hormezis için sauna (80°C) ve soğuk duş/buz banyosu (10-15°C) zamanlaması.",
        layer: 2,
        requires: ["adp-injury-deload-protocol"],
        prompt: "Hormetik Termal Terapi Protokolü kur: (a) Kas büyümesini engellememek için hipertrofi antrenmanından sonraki 6 saat soğuk banyodan kaçın, (b) Haftada 4 kez 20 dk Sauna (80°C) ekle."
      },
      {
        id: "adp-active-recovery-session",
        icon: "🚶",
        name: "Aktif Toparlanma ve Kan Akışı Seansı",
        category: "adaptation",
        description: "Dinlenme günlerinde hafif yürüyüş ve kan dolaşımı artırıcı aktiviteler.",
        layer: 2,
        requires: ["adp-injury-deload-protocol"],
        prompt: "Aktif Toparlanma (Active Recovery) seansı yaz: Dinlenme günlerinde kaslara kan ve besin taşınmasını hızlandırmak için 45 dakika düşük tempolu yürüyüş veya hafif yüzme planla."
      },
      {
        id: "adp-cortisol-breathwork-downshift",
        icon: "🫁",
        name: "Antrenman Sonrası Parasempatik Nefes",
        category: "adaptation",
        description: "Nefes egzersizi (Physiological Sigh) ile kortizolü düşürüp iyileşmeyi başlatır.",
        layer: 3,
        requires: ["adp-hrv-stress-recovery-readiness"],
        prompt: "Antrenman Sonrası Parasempatik Nefes (Physiological Sigh) rehberi yaz: Antrenman biter bitmez 5 dakika 2 hızlı burun nefesi ve uzun ağız verişi ile sempatik sinir sistemini kapat."
      },
      {
        id: "adp-travel-fitness-bodyweight",
        icon: "🧳",
        name: "Otel ve Seyahat Form Modifikasyonu",
        category: "adaptation",
        description: "Ekipmansız otel odasında vücut ağırlığı ve direnç bandı antrenmanı.",
        layer: 3,
        requires: ["adp-active-recovery-session"],
        prompt: "Seyahat & Otel Odası Vücut Ağırlığı Antrenmanı tasarla: Sıfır ekipmanla tempo ve izometrik duruşlar kullanarak hipertrofiyi koruyacak 20 dakikalık devre antrenmanı yaz."
      },
      {
        id: "hab-habit-stacking-atomic",
        icon: "🔗",
        name: "Atomik Alışkanlık İstifleme (Habit Stacking)",
        category: "habits",
        description: "Yeni sağlıklı alışkanlığı mevcut bir rutinin hemen arkasına bağlar (James Clear).",
        layer: 1,
        requires: [],
        prompt: "James Clear Atomik Alışkanlık İstifleme (Habit Stacking) kuralı uygula: '[MEVCUT ALIŞKANLIK] yaptıktan hemen sonra [YENİ ALIŞKANLIK] yapacağım' formülüyle sürtünmeyi düşür."
      },
      {
        id: "hab-dopamine-reward-decoupling",
        icon: "🧠",
        name: "Dopamin Orucu ve Ödül Bağlantısını Koparma",
        category: "habits",
        description: "Süreçten zevk almak için harici dopamin ödüllerini sağlıklı alışkanlıktan ayırır.",
        layer: 2,
        requires: ["hab-habit-stacking-atomic"],
        prompt: "Dopamin Detoksu ve Ödül Ayrıştırma (Dopamine Decoupling) yap: Eylemin kendisini ödül haline getirmek için antrenman veya diyet sonrası yapay şeker/ekran ödülü verme mekanizmasını kır."
      },
      {
        id: "hab-identity-based-behavior",
        icon: "🎭",
        name: "Kimlik Tabanlı Davranış Değişimi",
        category: "habits",
        description: "'Kilo vermek istiyorum' yerine 'Ben spor yapan biriyim' kimliği inşası.",
        layer: 2,
        requires: ["hab-habit-stacking-atomic"],
        prompt: "Kimlik Tabanlı Alışkanlık (Identity-Based Habits) inşası yap: Sonuç odaklı hedefleri ('5 kilo vereceğim') bırakıp, 'Ben sağlığına özen gösteren biriyim' inancını pekiştirecek mikro kanıtlar topla."
      },
      {
        id: "hab-relapse-prevention-plan",
        icon: "🛡️",
        name: "Alışkanlık Bozulmasını Engelleme (If-Then)",
        category: "habits",
        description: "Stres veya seyahat anında alışkanlığın kopmaması için 'Eğer-İse' planı.",
        layer: 2,
        requires: ["hab-habit-stacking-atomic"],
        prompt: "Alışkanlık Bozulmasını Önleme Planı (Implementation Intentions / If-Then) yaz: 'EĞER [Geç saatte işte kalırsam], O ZAMAN [Evde 10 dakika şınav/mekik çekeceğim]' kuralını koy."
      },
      {
        id: "hab-accountability-tracking-system",
        icon: "📅",
        name: "Sayısal Takip ve İncir Zinciri Kırma (Streak)",
        category: "habits",
        description: "Alışkanlığı görsel olarak takip edip 'Asla 2 gün üst üste aksatma' kuralı koyar.",
        layer: 3,
        requires: ["hab-relapse-prevention-plan"],
        prompt: "Görsel Alışkanlık Takip Sistemi (Never Miss Twice) kur: Alışkanlık serisini görsel olarak kaydet ve 'Asla üst üste 2 gün aksatma' kuralını hayata geçir."
      },
      {
        id: "hab-environment-design-audit",
        icon: "🏡",
        name: "Çevre Tasarımı ve Tetikleyici Eleme",
        category: "habits",
        description: "Kötü alışkanlık tetikleyicilerini göz önünden kaldırıp iyiyi kolaylaştırır.",
        layer: 3,
        requires: ["hab-habit-stacking-atomic"],
        prompt: "Çevre Tasarımı (Environment Design Audit) yap: Kötü alışkanlıkların sürtünmesini artır (abur cuburları çöpe at); iyi alışkanlıkların sürtünmesini sıfırla (spor kıyafetini akşamdan hazırla)."
      }
    ],
    en: [
      {
        id: "wrk-progressive-overload-plan",
        icon: "🏋️",
        name: "Progressive Overload Blueprint",
        category: "workout",
        description: "Establishes systematic weight, rep, and volume progression protocols for hypertrophy.",
        layer: 1,
        requires: [],
        prompt: "Design a Progressive Overload Strength Blueprint: Incorporate weekly micro-progressions (increments in load, reps, or sets) driving continuous adaptation."
      },
      {
        id: "wrk-rpe-rir-intensity-guide",
        icon: "📊",
        name: "RPE & RIR Intensity Calibration",
        category: "workout",
        description: "Calibrates set intensity using Rate of Perceived Exertion and Reps in Reserve.",
        layer: 1,
        requires: ["wrk-progressive-overload-plan"],
        prompt: "Calibrate workout intensity using RPE (Rate of Perceived Exertion) and RIR (Reps in Reserve): Cap primary compound movements at RIR 1-2 (RPE 8-9) to manage fatigue."
      },
      {
        id: "wrk-hypertrophy-split-design",
        icon: "💪",
        name: "Muscle Hypertrophy Split Design",
        category: "workout",
        description: "Architects Push-Pull-Legs or Upper-Lower training split programs.",
        layer: 2,
        requires: ["wrk-progressive-overload-plan"],
        prompt: "Architect a Hypertrophy Training Split (PPL - Push/Pull/Legs or Upper/Lower): Ensure each target muscle group is stimulated twice per week with optimal volume."
      },
      {
        id: "wrk-zone2-cardio-protocol",
        icon: "🫀",
        name: "Zone 2 Cardio & Mitochondrial Protocol",
        category: "workout",
        description: "Targets 60-70% HRmax for mitochondrial health, fat oxidation, and aerobic base.",
        layer: 2,
        requires: ["wrk-progressive-overload-plan"],
        prompt: "Design a Zone 2 Endurance & Mitochondrial Protocol: Schedule 150-180 minutes weekly in the nasal-breathing (talk test) zone to build metabolic efficiency."
      },
      {
        id: "wrk-mobility-joint-prep",
        icon: "🧘",
        name: "Pre-Workout Mobility & Dynamic Prep",
        category: "workout",
        description: "Prepares joints and reduces injury risk via dynamic mobility flows.",
        layer: 2,
        requires: ["wrk-progressive-overload-plan"],
        prompt: "Draft a Dynamic Mobility & Joint Warm-Up (RAMP Protocol): Build an 8-minute routine mobilizing hips, shoulders, and ankles prior to heavy loading."
      },
      {
        id: "wrk-hiit-tabata-structure",
        icon: "⏱️",
        name: "High-Intensity Interval (HIIT) Tabata",
        category: "workout",
        description: "Constructs 20/10 second work-rest intervals targeting maximum VO2 peak.",
        layer: 3,
        requires: ["wrk-zone2-cardio-protocol"],
        prompt: "Construct a VO2 Peak HIIT / Tabata Circuit: Design 8 rounds of 20 seconds maximal explosive effort paired with 10 seconds active rest."
      },
      {
        id: "cir-morning-sunlight-anchor",
        icon: "☀️",
        name: "Morning Sunlight Circadian Anchor",
        category: "circadian",
        description: "Anchors circadian rhythms using early morning sunlight exposure (Huberman).",
        layer: 1,
        requires: [],
        prompt: "Execute Andrew Huberman Circadian Anchor protocol: View 10-15 minutes of direct morning sunlight within 30 minutes of waking to trigger cortisol and set nighttime melatonin timing."
      },
      {
        id: "cir-blue-light-melatonin-prep",
        icon: "🌙",
        name: "Evening Blue Light & Melatonin Hygiene",
        category: "circadian",
        description: "Restricts blue spectrum light after sunset to safeguard natural melatonin synthesis.",
        layer: 1,
        requires: ["cir-morning-sunlight-anchor"],
        prompt: "Structure Evening Light Hygiene: Eliminate blue screen light 2 hours before bed, dim ambient lights below eye level, and protect natural melatonin release."
      },
      {
        id: "cir-temperature-sleep-cooling",
        icon: "❄️",
        name: "Sleep Architecture & Core Cooling",
        category: "circadian",
        description: "Optimizes deep sleep by dropping ambient bedroom temp (18-19°C) and core body temp.",
        layer: 2,
        requires: ["cir-blue-light-melatonin-prep"],
        prompt: "Design Deep Sleep Thermoregulation Protocol: Set ambient bedroom temperature to 18-19°C (65°F) and leverage post-warm-bath vasodilation to drop core body temperature."
      },
      {
        id: "cir-caffeine-half-life-cutoff",
        icon: "☕",
        name: "Caffeine Half-Life Cutoff Strategy",
        category: "circadian",
        description: "Establishes caffeine delay and cutoff rules to prevent adenosine receptor disruption.",
        layer: 2,
        requires: ["cir-morning-sunlight-anchor"],
        prompt: "Establish Caffeine Cutoff Strategy: Delay first caffeine consumption 90-120 minutes post-waking and enforce a strict caffeine cutoff 10 hours prior to sleep."
      },
      {
        id: "cir-circadian-meal-timing",
        icon: "🍽️",
        name: "Chrono-Nutrition & Fasting Window",
        category: "circadian",
        description: "Aligns meal timing with metabolic circadian rhythms and insulin sensitivity.",
        layer: 2,
        requires: ["cir-morning-sunlight-anchor"],
        prompt: "Architect Chrono-Nutrition Protocol: Restrict feeding to daylight hours (e.g., 10:00 AM - 6:00 PM) and cease calorie intake at least 3 hours before sleep."
      },
      {
        id: "cir-jet-lag-shift-resync",
        icon: "✈️",
        name: "Jet-Lag & Shift-Work Circadian Re-sync",
        category: "circadian",
        description: "Re-synchronizes internal clocks during time zone shifts using light and temperature.",
        layer: 3,
        requires: ["cir-temperature-sleep-cooling"],
        prompt: "Formulate Jet-Lag & Shift-Work Resynchronization Plan: Schedule light viewing and dark phase shifts based on the destination time zone's core body temperature minimum."
      },
      {
        id: "nut-macro-distribution-calculator",
        icon: "🥗",
        name: "Personalized Macro Distribution",
        category: "nutrition",
        description: "Calculates protein, carbohydrate, and fat targets tailored to goals.",
        layer: 1,
        requires: [],
        prompt: "Calculate Personalized Macro Distribution Strategy: Assign daily protein (1.6-2.2g/kg), carbohydrates, and essential fats tailored to [Fat Loss / Muscle Growth / Endurance]."
      },
      {
        id: "nut-protein-leucine-threshold",
        icon: "🥩",
        name: "Protein Timing & Leucine Threshold",
        category: "nutrition",
        description: "Triggers Muscle Protein Synthesis (MPS) via 3g leucine per meal dosing.",
        layer: 2,
        requires: ["nut-macro-distribution-calculator"],
        prompt: "Establish Muscle Protein Synthesis (MPS) Trigger Protocol: Distribute total daily protein across 3-4 meals providing at least 3g of Leucine per serving."
      },
      {
        id: "nut-micronutrient-density-audit",
        icon: "🥑",
        name: "Micronutrient Density Audit",
        category: "nutrition",
        description: "Audits intake of key minerals and vitamins (Magnesium, Zinc, D3, B12).",
        layer: 2,
        requires: ["nut-macro-distribution-calculator"],
        prompt: "Audit Micronutrient Density: Replace ultra-processed foods with whole nutrient-dense sources (leafy greens, organ meats, nuts, seafood) to eliminate Magnesium, Zinc, and D3 gaps."
      },
      {
        id: "nut-gut-microbiome-fiber-mix",
        icon: "🦠",
        name: "Gut Microbiome & Fiber Diversity",
        category: "nutrition",
        description: "Optimizes gut microbiome health targeting 30 plant-based fiber sources weekly.",
        layer: 2,
        requires: ["nut-macro-distribution-calculator"],
        prompt: "Optimize Gut Microbiome Diversity: Incorporate 30 distinct plant-based fiber sources weekly alongside fermented foods (kefir, sauerkraut) and prebiotic fibers."
      },
      {
        id: "nut-hydration-electrolyte-balance",
        icon: "💧",
        name: "Hydration & Electrolyte Protocol",
        category: "nutrition",
        description: "Balances Sodium, Potassium, and Magnesium for cellular hydration.",
        layer: 2,
        requires: ["nut-macro-distribution-calculator"],
        prompt: "Formulate Cellular Hydration & Electrolyte Balance Guide: Supplement plain water with targeted Sodium, Potassium, and Magnesium doses morning and intra-workout."
      },
      {
        id: "nut-glycemic-index-energy-stabilizer",
        icon: "📉",
        name: "Glycemic Load & Energy Stabilizer",
        category: "nutrition",
        description: "Stabilizes blood glucose to eliminate post-prandial afternoon energy crashes.",
        layer: 3,
        requires: ["nut-micronutrient-density-audit"],
        prompt: "Design Glycemic Load & Energy Crash Prevention Plan: Sequence meal intake (fiber/protein first, carbs last) and incorporate vinegar to flatten post-prandial glucose spikes."
      },
      {
        id: "adp-injury-deload-protocol",
        icon: "🩹",
        name: "Scheduled Deload & Recovery Protocol",
        category: "adaptation",
        description: "Reduces volume by 50% every 4-6 weeks to allow joint and connective tissue recovery.",
        layer: 1,
        requires: [],
        prompt: "Design a Scheduled Deload Protocol: Reduce total training volume (sets x reps) by 50% every 5th week to allow connective tissue, tendon, and CNS recovery."
      },
      {
        id: "adp-hrv-stress-recovery-readiness",
        icon: "🫀",
        name: "HRV & CNS Readiness Tracking",
        category: "adaptation",
        description: "Modulates workout intensity dynamically based on Heart Rate Variability data.",
        layer: 2,
        requires: ["adp-injury-deload-protocol"],
        prompt: "Build an HRV-Guided Recovery Protocol: Automatically shift heavy sessions to light active recovery whenever Heart Rate Variability drops below baseline."
      },
      {
        id: "adp-sauna-cold-plunge-protocol",
        icon: "🧊",
        name: "Thermal Therapy: Sauna & Cold Exposure",
        category: "adaptation",
        description: "Schedules hormetic hot sauna (80°C) and cold plunge (10-15°C) sessions.",
        layer: 2,
        requires: ["adp-injury-deload-protocol"],
        prompt: "Structure Hormetic Thermal Therapy: Avoid cold immersion within 6 hours post-hypertrophy workouts to preserve adaptation; schedule 20-minute sauna sessions (80°C) 4x weekly."
      },
      {
        id: "adp-active-recovery-session",
        icon: "🚶",
        name: "Active Recovery & Blood Flow Session",
        category: "adaptation",
        description: "Designs low-intensity movement sessions to promote recovery blood flow.",
        layer: 2,
        requires: ["adp-injury-deload-protocol"],
        prompt: "Design Active Recovery Session: Schedule 45 minutes of low-intensity zone 1 walking or light swimming on rest days to flush metabolic waste and drive blood flow."
      },
      {
        id: "adp-cortisol-breathwork-downshift",
        icon: "🫁",
        name: "Post-Workout Parasympathetic Breathwork",
        category: "adaptation",
        description: "Uses physiological sighs to down-regulate nervous system post-exercise.",
        layer: 3,
        requires: ["adp-hrv-stress-recovery-readiness"],
        prompt: "Guide Post-Workout Parasympathetic Breathwork: Conduct 5 minutes of Physiological Sighing (double inhales, prolonged exhales) immediately post-workout to drop cortisol."
      },
      {
        id: "adp-travel-fitness-bodyweight",
        icon: "🧳",
        name: "Hotel Room Bodyweight Modification",
        category: "adaptation",
        description: "Adapts workouts for zero-equipment hotel room settings using tempo and isometric holds.",
        layer: 3,
        requires: ["adp-active-recovery-session"],
        prompt: "Design Hotel Room Bodyweight Workout: Utilize tempo manipulation, unilateral movements, and isometric holds to preserve strength with zero equipment while traveling."
      },
      {
        id: "hab-habit-stacking-atomic",
        icon: "🔗",
        name: "Atomic Habit Stacking Protocol",
        category: "habits",
        description: "Anchors new healthy behaviors directly to existing routines (James Clear).",
        layer: 1,
        requires: [],
        prompt: "Apply James Clear Habit Stacking Formula: Structure new habits as 'After [CURRENT HABIT], I will immediately [NEW HEALTHY HABIT]' to minimize activation energy."
      },
      {
        id: "hab-dopamine-reward-decoupling",
        icon: "🧠",
        name: "Dopamine Fasting & Reward Decoupling",
        category: "habits",
        description: "Decouples external artificial dopamine rewards from fitness routines.",
        layer: 2,
        requires: ["hab-habit-stacking-atomic"],
        prompt: "Execute Dopamine Decoupling: Eliminate artificial sugar or screen rewards post-workout, training internal motivation to derive satisfaction from the effort itself."
      },
      {
        id: "hab-identity-based-behavior",
        icon: "🎭",
        name: "Identity-Based Behavior Shift",
        category: "habits",
        description: "Shifts focus from outcome goals to identity shifts ('I am an athlete').",
        layer: 2,
        requires: ["hab-habit-stacking-atomic"],
        prompt: "Foster Identity-Based Habit Change: Shift focus from outcome goals ('lose 5kg') to identity statements ('I am someone who prioritizes daily movement')."
      },
      {
        id: "hab-relapse-prevention-plan",
        icon: "🛡️",
        name: "Habit Relapse Prevention (If-Then)",
        category: "habits",
        description: "Establishes Implementation Intentions (If-Then plans) for high-stress days.",
        layer: 2,
        requires: ["hab-habit-stacking-atomic"],
        prompt: "Build Habit Relapse Prevention (If-Then Plan): Define explicit fallback rules: 'IF [I am forced to work late], THEN [I will complete a 10-minute home bodyweight circuit]'."
      },
      {
        id: "hab-accountability-tracking-system",
        icon: "📅",
        name: "Streak Tracking & Never Miss Twice",
        category: "habits",
        description: "Visually tracks habit streaks enforcing the non-negotiable 'Never Miss Twice' rule.",
        layer: 3,
        requires: ["hab-relapse-prevention-plan"],
        prompt: "Implement Visual Streak Tracking: Enforce the non-negotiable 'Never Miss Twice' rule, ensuring a missed habit day is immediately followed by compliance."
      },
      {
        id: "hab-environment-design-audit",
        icon: "🏡",
        name: "Environment Design & Cue Elimination",
        category: "habits",
        description: "Redesign physical environment to increase friction for bad habits and automate good ones.",
        layer: 3,
        requires: ["hab-habit-stacking-atomic"],
        prompt: "Audit Physical Environment Design: Increase friction for bad habits (remove junk food from sight) while reducing friction for target behaviors (lay out workout gear overnight)."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 13. TRAVEL (Seyahat & Deneyim)
  // ---------------------------------------------------------------------------
  travel: {
    tr: [
      {
        id: "cur-anti-tourist-trap-filter",
        icon: "🚫",
        name: "Turist Tuzağı Ayıklama Filtresi",
        category: "curation",
        description: "Şişirilmiş fiyatlı, kalitesiz turist mekanlarını listeden tamamen temizler.",
        layer: 1,
        requires: [],
        prompt: "Turist Tuzağı (Anti-Tourist Trap) filtresi çalıştır: Otantik olmayan, turist otobüslerinin uğradığı, fiyatları şişirilmiş popüler mekanları listeden tamamen ayıkla."
      },
      {
        id: "cur-local-hidden-gem-route",
        icon: "💎",
        name: "Yerel Gizli Cevherler (Hidden Gems) Rotası",
        category: "curation",
        description: "Sadece yerel halkın bildiği özgün lezzet ve mahalle noktalarını keşfeder.",
        layer: 1,
        requires: ["cur-anti-tourist-trap-filter"],
        prompt: "Yerel Gizli Cevherler (Local Hidden Gems) kürasyonu yap: Rehber kitaplarda yer almayan, sadece lokal halkın gittiği otantik mahalle restoranlarını ve gizli mekanları listele."
      },
      {
        id: "cur-culinary-foodie-itinerary",
        icon: "🍜",
        name: "Mutfak & Sokak Lezzetleri Keşif Haritası",
        category: "curation",
        description: "Şehrin en iyi sokak lezzetlerini ve ikonik yerel yemeklerini haritalandırır.",
        layer: 2,
        requires: ["cur-anti-tourist-trap-filter"],
        prompt: "Gastronomi Odaklı Rota (Foodie Itinerary) oluştur: Şehrin imza sokak lezzetlerini, tarihi pazarlarını ve ikonik tatlarını tadım sırasına göre kurgula."
      },
      {
        id: "cur-niche-interest-customizer",
        icon: "🎨",
        name: "Niş İlgi Alanı Uyumlaması (Sanat/Mimari)",
        category: "curation",
        description: "Rotayı mimari, vintage mağazalar veya tarih gibi özel ilgiye göre özelleştirir.",
        layer: 2,
        requires: ["cur-anti-tourist-trap-filter"],
        prompt: "Niş İlgi Alanı Özelleştirmesi yap: Rotayı kullanıcının özel tutkusu olan [Brütalist Mimari / Sahaf & Plakçılar / Çağdaş Sanat / Kahve Kültürü] etrafında yeniden ör."
      },
      {
        id: "cur-slow-travel-immersion",
        icon: "🚲",
        name: "Yavaş Seyahat (Slow Travel) & Kültürel Derinlik",
        category: "curation",
        description: "Şehir şehir koşmak yerine tek bir mahallede derinlemesine yaşama deneyimi.",
        layer: 2,
        requires: ["cur-anti-tourist-trap-filter"],
        prompt: "Yavaş Seyahat (Slow Travel) felsefesi uygula: Bir günde 10 yer görme telaşını bırak; tek bir tarihi mahallede sindirerek vakit geçirecek derin deneyim akışı tasarla."
      },
      {
        id: "cur-family-accessible-curation",
        icon: "👨‍👩‍👧",
        name: "Aile & Erişilebilirlik Odaklı Kürasyon",
        category: "curation",
        description: "Çocuklu aileler ve engelsiz erişim ihtiyaçlarına uygun mekan seçimi.",
        layer: 3,
        requires: ["cur-local-hidden-gem-route"],
        prompt: "Aile ve Erişilebilirlik Uyarlaması yap: Bebek arabası/tekerlekli sandalye erişimine uygun, çocuk dostu mola alanları içeren ve yorulmayı önleyen rota çıkar."
      },
      {
        id: "rte-walking-distance-transit-opt",
        icon: "🚶",
        name: "Yürüme Mesafesi ve Toplu Taşıma Optimizasyonu",
        category: "route",
        description: "Noktaları mantıklı yürüme yarıçapı ve metro hatlarına göre dizeler.",
        layer: 1,
        requires: [],
        prompt: "Yürüme Mesafesi ve Toplu Taşıma Optimizasyonu yap: Günlük durakları birbirine yürüme mesafesinde (maks 15 dk) veya aynı metro hattı üzerinde sıralayarak zaman kaybını sıfırla."
      },
      {
        id: "rte-day-by-day-geographical-clustering",
        icon: "📍",
        name: "Coğrafi Kümeleme (Geographic Clustering)",
        category: "route",
        description: "Her günü şehrin farklı bir yakasına ayırarak zikzak çizmeyi engeller.",
        layer: 1,
        requires: ["rte-walking-distance-transit-opt"],
        prompt: "Coğrafi Kümeleme (Geographic Clustering) kuralı koy: Şehrin doğusu ile batısını aynı güne koyma; her günü tek bir bölgeye/semte odaklayarak zikzak seyahati engelle."
      },
      {
        id: "rte-scenic-roadtrip-pitstops",
        icon: "🚗",
        name: "Manzaralı Road Trip ve Mola Noktaları",
        category: "route",
        description: "Otoyol yerine manzaralı rotaları ve otantik mola yerlerini seçer.",
        layer: 2,
        requires: ["rte-walking-distance-transit-opt"],
        prompt: "Manzaralı Rota (Scenic Road Trip) planla: Sıkıcı sıkışık otoyollar yerine manzaralı tali yolları, fotoğraf noktalarını ve otantik yol üstü lokantalarını rotaya ekle."
      },
      {
        id: "rte-day-trip-hub-spoke-model",
        icon: "🚲",
        name: "Hub-and-Spoke Günübirlik Kaçış Modeli",
        category: "route",
        description: "Tek bir merkez otelde konaklayıp çevre kasabalara günübirlik geziler düzenler.",
        layer: 2,
        requires: ["rte-day-by-day-geographical-clustering"],
        prompt: "Hub-and-Spoke Seyahat Modeli kur: Sürekli otel değiştirmek yerine ana bir şehir merkezinde sabit kalıp (Hub), trenle 1 saatlik mesafedeki kasabalara günübirlik geziler (Spokes) planla."
      },
      {
        id: "rte-pace-fatigue-management",
        icon: "☕",
        name: "Seyahat Yorgunluğu ve Tempo Yönetimi",
        category: "route",
        description: "Öğleden sonralara dinlenme ve kahve molaları koyarak tükenmeyi engeller.",
        layer: 2,
        requires: ["rte-day-by-day-geographical-clustering"],
        prompt: "Seyahat Temposu ve Yorgunluk Yönetimi ekle: Yoğun sabah müze gezisinin ardından öğleden sonra parkta veya kafede 2 saatlik serbest dinlenme molası kurgula."
      },
      {
        id: "rte-weather-contingency-indoor-plan",
        icon: "🌧️",
        name: "Yağmurlu Gün & Hava Durumu B Planı",
        category: "route",
        description: "Kötü hava koşullarında otomatik devreye girecek kapalı mekan alternatifleri.",
        layer: 3,
        requires: ["rte-day-by-day-geographical-clustering"],
        prompt: "Hava Durumu B Planı (Contingency Indoor Plan) oluştur: Ani yağmur veya aşırı sıcak durumunda açık hava aktivitelerinin yerini alacak kapalı pazar, müze ve pasaj alternatifleri yaz."
      },
      {
        id: "cul-local-etiquette-taboos",
        icon: "🤝",
        name: "Yerel Etiket Kılavuzu ve Kültürel Tabular",
        category: "culture",
        description: "Gidilen ülkedeki beden dili, bahşiş ve sosyal saygı kuralları.",
        layer: 1,
        requires: [],
        prompt: "Yerel Etiket Kılavuzu (Cultural Etiquette & Taboos) hazırla: Gidilen ülkede yapılmaması gereken 3 kritik gafı, tapınak/kutsal mekan giyim kurallarını ve selamlaşma adabını yaz."
      },
      {
        id: "cul-basic-language-survival-phrases",
        icon: "🗣️",
        name: "Temel Hayatta Kalma Kelimeleri (Survival Phrases)",
        category: "culture",
        description: "Lokal dilde 'Teşekkürler', 'Hesap lütfen' gibi 10 kritik cümle rehberi.",
        layer: 1,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Yerel Dilde Hayatta Kalma İfadeleri (Survival Phrases) rehberi sun: Okunuşlarıyla birlikte en önemli 10 nezaket ve sipariş cümlesini (Teşekkürler, Hesap lütfen, İmdat vb.) listele."
      },
      {
        id: "cul-tipping-bargaining-customs",
        icon: "💵",
        name: "Bahşiş ve Pazarlık Kültürü Rehberi",
        category: "culture",
        description: "Ülkeye özgü bahşiş oranları ve pazarlık yapma kurallarını açıklar.",
        layer: 2,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Bahşiş ve Pazarlık Kültürü kurallarını açıkla: Restoranda bahşiş zorunlu mu (% kaç?), takside yuvarlama yapılır mı ve yerel pazarlarda pazarlık adabı nasıldır belirt."
      },
      {
        id: "cul-festival-seasonal-event-align",
        icon: "Ö",
        name: "Özel Sezon ve Festival Hizalaması",
        category: "culture",
        description: "Seyahat tarihlerini yerel festivaller ve kutlamalarla denk getirir.",
        layer: 2,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Sezon ve Festival Hizalaması yap: Seyahat tarihlerinde gerçekleşecek yerel festivalleri, bayramları, pazar günleri kapalı yerleri ve özel kültürel etkinlikleri takvime işle."
      },
      {
        id: "cul-respectful-photography-ethics",
        icon: "📸",
        name: "Etik Fotoğrafçılık ve Mahremiyet",
        category: "culture",
        description: "Yerel halkı ve çocukları fotoğraflarken dikkat edilecek etik ilkeler.",
        layer: 2,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Etik Fotoğrafçılık Kuralları koy: Yerel halkın, çocukların ve dini ibadetlerin fotoğraflanmasında izin alma adabını ve yasaklı çekim alanlarını hatırlat."
      },
      {
        id: "cul-historical-context-primer",
        icon: "📜",
        name: "Özet Tarihsel ve Sosyo-Kültürel Arka Plan",
        category: "culture",
        description: "Şehrin günümüzdeki dokusunu anlamak için 3 paragraflık özet tarih rehberi.",
        layer: 3,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Özet Tarihsel ve Sosyolojik Arka Plan (Historical Primer) yaz: Şehrin mimarisini ve toplum yapısını şekillendiren 3 ana tarihsel dönüm noktasını özetle."
      },
      {
        id: "log-packing-capsule-wardrobe",
        icon: "🧳",
        name: "Minimalist Kapsül Gardırop & Bagaj Listesi",
        category: "logistics",
        description: "Sadece kabin bagajıyla seyahat etmeyi sağlayan kombin hazırlığı.",
        layer: 1,
        requires: [],
        prompt: "Minimalist Kapsül Gardırop (Capsule Wardrobe) ve Bagaj Listesi oluştur: Kat kat giyilebilen (layering), birbiriyle eşleşen nötr renkli giysilerle kabin bagajı listesi yaz."
      },
      {
        id: "log-visa-entry-passport-checklist",
        icon: "🛂",
        name: "Vize, Giriş Koşulları ve Pasaport Denetimi",
        category: "logistics",
        description: "Pasaport geçerlilik süresi, vize ve harç zorunluluklarını kontrol eder.",
        layer: 1,
        requires: ["log-packing-capsule-wardrobe"],
        prompt: "Vize ve Ülke Giriş Şartları Kontrol Listesi hazırla: Pasaportun en az 6 ay geçerlilik kuralı, eVisa / Kapıda Vize prosedürleri ve zorunlu aşı/form belgelerini doğrula."
      },
      {
        id: "log-sim-eSim-connectivity-plan",
        icon: "📱",
        name: "eSIM ve Mobil İnternet Bağlantı Stratejisi",
        category: "logistics",
        description: "Yüksek roaming ücretlerinden kaçınmak için yerel eSIM/SIM seçimi.",
        layer: 2,
        requires: ["log-packing-capsule-wardrobe"],
        prompt: "eSIM ve Mobil İnternet Bağlantı Stratejisi yaz: Havaalanında kazıklanmadan uygun fiyatlı Airalo/local eSIM veya fiziksel SIM kart alma ve harita offline indirme adımlarını belirle."
      },
      {
        id: "log-travel-insurance-health-prep",
        icon: "🏥",
        name: "Seyahat Sağlık Sigortası ve İlaç Hazırlığı",
        category: "logistics",
        description: "Acil sağlık durumları ve kişisel reçeteli ilaçların taşınma kuralları.",
        layer: 2,
        requires: ["log-visa-entry-passport-checklist"],
        prompt: "Seyahat Sağlık Sigortası ve Medikal Hazırlık yap: Sigortanın bagaj kaybı ve tıbbi tahliyeyi kapsadığını teyit et; reçeteli ilaçların İngilizce doktor raporu kuralını hatırla."
      },
      {
        id: "log-flight-layover-optimization",
        icon: "✈️",
        name: "Aktarma (Layover) ve Havalimanı Dinlenme",
        category: "logistics",
        description: "Uzun aktarmalarda lounge kullanımı veya hızlı şehir turu optimizasyonu.",
        layer: 3,
        requires: ["log-visa-entry-passport-checklist"],
        prompt: "Aktarma (Layover) İyileştirmesi yap: 6 saati aşan aktarmalarda havalimanı lounge imkanlarını veya bagajı bırakıp hızlı bir transit şehir turu yapma B planını kurgula."
      },
      {
        id: "log-luggage-storage-mobility",
        icon: "🧳",
        name: "Bagaj Depolama ve Mobilite Yönetimi",
        category: "logistics",
        description: "Erken giriş / geç çıkış günlerinde bagaj bırakma noktaları (Radical Storage).",
        layer: 3,
        requires: ["log-packing-capsule-wardrobe"],
        prompt: "Bagaj Depolama ve Hareket Kabiliyeti planı yap: Otel check-in öncesi ve check-out sonrası çantaları güvenle bırakacak istasyon veya uygulama (Bounce / Nannybag) noktalarını belirle."
      },
      {
        id: "bdg-daily-expense-categorizer",
        icon: "💰",
        name: "Günlük Bütçe Tahsisi ve Harcama Planı",
        category: "budget",
        description: "Bütçeyi Konaklama, Yeme-İçme, Ulaşım ve Müze kategorilerine böler.",
        layer: 1,
        requires: [],
        prompt: "Günlük Bütçe Tahsis Tablosu oluştur: Günlük bütçeyi [Yeme-İçme %40 / Ulaşım %20 / Etkinlik-Müze %30 / Beklenmedik %10] oranında harcama kalemlerine böl."
      },
      {
        id: "bdg-multi-currency-fx-strategy",
        icon: "💳",
        name: "Döviz Kuru ve Komisyonsuz Bankacılık",
        category: "budget",
        description: "Dinamik kur çevrim (DCC) komisyon tuzaklarından kaçınma taktikleri.",
        layer: 2,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "Döviz ve Kart Kullanım Stratejisi (No-FX Fee) belirle: POS cihazlarında asla yerel para birimi dışında (DCC tuzağı) ödeme yapmama ve sıfır komisyonlu kart (Revolut/Wise) kullanımı kuralı koy."
      },
      {
        id: "bdg-accommodation-value-finder",
        icon: "🏨",
        name: "Butik vs. Fiyat/Performans Konaklama",
        category: "budget",
        description: "Merkeze yakınlık ve F/P dengesini optimize eden konaklama seçimi.",
        layer: 2,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "Fiyat/Performans Konaklama Analizi yap: Lüks oteller yerine merkeze toplu taşımayla 15 dk mesafedeki güvenli, puanı 8.5+ olan butik otel/Airbnb filtreleme kriterlerini yaz."
      },
      {
        id: "bdg-city-pass-attraction-roi",
        icon: "🎟️",
        name: "Şehir Turist Kartı (City Pass) ROI Hesabı",
        category: "budget",
        description: "City Pass kartlarının verdiğin paraya değip değmeyeceğini hesaplar.",
        layer: 2,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "City Pass ROI Analizi yap: Şehir kartının (City Pass) toplam maliyeti ile gezilecek müzelerin tekil bilet fiyatlarını kıyaslayarak kart almanın karlı olup olmadığını hesapla."
      },
      {
        id: "bdg-transportation-card-hack",
        icon: "🎫",
        name: "Toplu Taşıma Kartı ve İndirimli Bilet",
        category: "budget",
        description: "Tekil bilet yerine 3 günlük sınırsız turist ulaşım kartı optimizasyonu.",
        layer: 3,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "Ulaşım Kartı Tasarruf Taktiği yaz: Tekil bilet almak yerine 24/72 saatlik sınırsız turist ulaşım kartı veya temassız kredi kartı (Contactless capping) avantajlarını kullan."
      },
      {
        id: "bdg-emergency-contingency-fund",
        icon: "🛡️",
        name: "Acil Durum Yedek Bütçe Akçesi",
        category: "budget",
        description: "Kaçırılan uçak veya acil durumlar için %15 yedek nakit akçesi.",
        layer: 3,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "Acil Durum Bütçe Akçesi (Contingency Fund) ayır: Toplam seyahat bütçesinin %15'ini kaçan trenler, kayıp eşyalar veya acil durumlar için dokunulmaz yedek fon olarak kilitle."
      }
    ],
    en: [
      {
        id: "cur-anti-tourist-trap-filter",
        icon: "🚫",
        name: "Anti-Tourist Trap Filter",
        category: "curation",
        description: "Filters out overpriced, low-quality tourist traps and gimmicky venues.",
        layer: 1,
        requires: [],
        prompt: "Apply Anti-Tourist Trap Filter: Strip out overpriced, inauthentic, tourist-bus-clogged venues and replace them with authentic local spots."
      },
      {
        id: "cur-local-hidden-gem-route",
        icon: "💎",
        name: "Local Hidden Gem Curation",
        category: "curation",
        description: "Curates authentic neighborhood spots known primarily to local residents.",
        layer: 1,
        requires: ["cur-anti-tourist-trap-filter"],
        prompt: "Curate Local Hidden Gems: Uncover off-the-beaten-path neighborhood eateries, secret courtyards, and artisan shops known primarily to residents."
      },
      {
        id: "cur-culinary-foodie-itinerary",
        icon: "🍜",
        name: "Culinary & Street Food Quest Mapping",
        category: "curation",
        description: "Maps iconic local dishes, street food stalls, and historic markets.",
        layer: 2,
        requires: ["cur-anti-tourist-trap-filter"],
        prompt: "Architect a Foodie Culinary Itinerary: Map signature local dishes, historic food markets, and authentic street food vendors into a tasting sequence."
      },
      {
        id: "cur-niche-interest-customizer",
        icon: "🎨",
        name: "Niche Interest Customizer (Art/Architecture)",
        category: "curation",
        description: "Customizes itineraries around specific passions like brutalism, record stores, or coffee.",
        layer: 2,
        requires: ["cur-anti-tourist-trap-filter"],
        prompt: "Customize for Niche Passions: Re-orient the itinerary around specific themes like [Brutalist Architecture / Rare Vinyl & Bookstores / Specialty Coffee / Contemporary Art]."
      },
      {
        id: "cur-slow-travel-immersion",
        icon: "🚲",
        name: "Slow Travel & Cultural Immersion",
        category: "curation",
        description: "Prioritizes deep neighborhood immersion over frantic sight-checking lists.",
        layer: 2,
        requires: ["cur-anti-tourist-trap-filter"],
        prompt: "Apply Slow Travel philosophy: Replace 10-sight-a-day frantic itineraries with deep, unhurried neighborhood immersion."
      },
      {
        id: "cur-family-accessible-curation",
        icon: "👨‍👩‍👧",
        name: "Family & Accessibility Curation",
        category: "curation",
        description: "Customizes routes for stroller/wheelchair access and kid-friendly rest breaks.",
        layer: 3,
        requires: ["cur-local-hidden-gem-route"],
        prompt: "Adapt for Family & Accessibility: Ensure smooth stroller/wheelchair accessibility, incorporate kid-friendly green spaces, and pace stops to prevent fatigue."
      },
      {
        id: "rte-walking-distance-transit-opt",
        icon: "🚶",
        name: "Walking Radius & Transit Optimization",
        category: "route",
        description: "Sequences daily stops within walkable radii or direct transit lines.",
        layer: 1,
        requires: [],
        prompt: "Optimize Walking & Transit Routes: Sequence daily stops within logical 15-minute walking radii or along single subway lines to minimize transit time."
      },
      {
        id: "rte-day-by-day-geographical-clustering",
        icon: "📍",
        name: "Day-by-Day Geographic Clustering",
        category: "route",
        description: "Clusters daily itineraries geographically to avoid crisscrossing cities.",
        layer: 1,
        requires: ["rte-walking-distance-transit-opt"],
        prompt: "Enforce Geographic Clustering: Dedicate each day to a distinct neighborhood cluster to prevent inefficient city crisscrossing."
      },
      {
        id: "rte-scenic-roadtrip-pitstops",
        icon: "🚗",
        name: "Scenic Road Trip & Pitstop Planner",
        category: "route",
        description: "Replaces highway routes with scenic side roads, vistas, and roadside diners.",
        layer: 2,
        requires: ["rte-walking-distance-transit-opt"],
        prompt: "Plan a Scenic Road Trip: Bypass monotonous highways in favor of scenic backroads, photo lookout points, and authentic roadside diners."
      },
      {
        id: "rte-day-trip-hub-spoke-model",
        icon: "🚲",
        name: "Hub-and-Spoke Excursion Strategy",
        category: "route",
        description: "Bases travel in one hub city while planning day trips to outlying towns.",
        layer: 2,
        requires: ["rte-day-by-day-geographical-clustering"],
        prompt: "Build a Hub-and-Spoke Travel Model: Base accommodation in a single vibrant city (Hub) and plan 1-hour train day trips (Spokes) to eliminate daily packing."
      },
      {
        id: "rte-pace-fatigue-management",
        icon: "☕",
        name: "Travel Fatigue & Rest Break Pacing",
        category: "route",
        description: "Schedules afternoon rest breaks and coffee pauses to prevent burnout.",
        layer: 2,
        requires: ["rte-day-by-day-geographical-clustering"],
        prompt: "Incorporate Travel Pacing & Rest Breaks: Balance heavy morning museum tours with unhurried 2-hour afternoon park or café downtime."
      },
      {
        id: "rte-weather-contingency-indoor-plan",
        icon: "🌧️",
        name: "Rainy Day & Weather Contingency Plan",
        category: "route",
        description: "Pre-plans indoor museum and market alternatives for bad weather days.",
        layer: 3,
        requires: ["rte-day-by-day-geographical-clustering"],
        prompt: "Create Weather Contingency Plan: Prepare an immediate indoor alternative itinerary (covered arcades, art galleries, food halls) for sudden rain or heat waves."
      },
      {
        id: "cul-local-etiquette-taboos",
        icon: "🤝",
        name: "Cultural Etiquette & Taboo Protocol",
        category: "culture",
        description: "Outlines body language, dress codes, and social etiquette guidelines.",
        layer: 1,
        requires: [],
        prompt: "Formulate Cultural Etiquette & Taboo Protocol: Detail key social gaffes to avoid, sacred site dress codes, and proper greeting customs."
      },
      {
        id: "cul-basic-language-survival-phrases",
        icon: "🗣️",
        name: "Essential Local Phrasebook & Slang",
        category: "culture",
        description: "Provides 10 crucial survival phrases with phonetic pronunciations.",
        layer: 1,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Provide Essential Local Survival Phrasebook: List the top 10 politeness and dining phrases with phonetic pronunciation guides."
      },
      {
        id: "cul-tipping-bargaining-customs",
        icon: "💵",
        name: "Tipping & Haggling Customs Guide",
        category: "culture",
        description: "Explains expected tipping percentages and local market bargaining etiquette.",
        layer: 2,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Detail Tipping & Haggling Customs: Clarify restaurant tipping norms, taxi rounding customs, and polite market bargaining etiquette."
      },
      {
        id: "cul-festival-seasonal-event-align",
        icon: "Ö",
        name: "Seasonal Festival & Event Alignment",
        category: "culture",
        description: "Aligns travel dates with local holiday celebrations and seasonal events.",
        layer: 2,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Align with Seasonal Festivals: Incorporate local cultural celebrations, seasonal markets, and holiday closures directly into the travel schedule."
      },
      {
        id: "cul-respectful-photography-ethics",
        icon: "📸",
        name: "Respectful Photography & Site Ethics",
        category: "culture",
        description: "Establishes ethical guidelines for photographing locals and heritage sites.",
        layer: 2,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Enforce Ethical Photography Standards: Outline consent etiquette for photographing locals, children, and religious rituals."
      },
      {
        id: "cul-historical-context-primer",
        icon: "📜",
        name: "Concise Historical & Cultural Primer",
        category: "culture",
        description: "Provides a brief 3-paragraph historical context primer to enrich sightseeing.",
        layer: 3,
        requires: ["cul-local-etiquette-taboos"],
        prompt: "Draft Historical & Cultural Primer: Summarize the 3 key historical epochs that shaped the city's modern architecture and social identity."
      },
      {
        id: "log-packing-capsule-wardrobe",
        icon: "🧳",
        name: "Minimalist Capsule Wardrobe & Packing",
        category: "logistics",
        description: "Designs a carry-on-only capsule wardrobe packing checklist.",
        layer: 1,
        requires: [],
        prompt: "Design Minimalist Carry-On Capsule Wardrobe: Create a versatile, color-coordinated, layerable clothing checklist enabling carry-on-only travel."
      },
      {
        id: "log-visa-entry-passport-checklist",
        icon: "🛂",
        name: "Visa, Entry & Passport Checklist",
        category: "logistics",
        description: "Verifies passport validity, eVisa procedures, and entry forms.",
        layer: 1,
        requires: ["log-packing-capsule-wardrobe"],
        prompt: "Verify Visa & Entry Requirements: Audit 6-month passport validity rules, eVisa / visa-on-arrival protocols, and mandatory health declarations."
      },
      {
        id: "log-sim-eSim-connectivity-plan",
        icon: "📱",
        name: "eSIM & Mobile Connectivity Plan",
        category: "logistics",
        description: "Outlines cost-effective local eSIM and offline map downloads to avoid roaming fees.",
        layer: 2,
        requires: ["log-packing-capsule-wardrobe"],
        prompt: "Formulate Mobile Connectivity & eSIM Strategy: Detail cost-effective eSIM options (e.g., Airalo) and offline map setup to avoid expensive roaming fees."
      },
      {
        id: "log-travel-insurance-health-prep",
        icon: "🏥",
        name: "Travel Insurance & Medical Prep",
        category: "logistics",
        description: "Ensures comprehensive emergency health coverage and prescription compliance.",
        layer: 2,
        requires: ["log-visa-entry-passport-checklist"],
        prompt: "Audit Travel Insurance & Medical Readiness: Verify coverage for emergency evacuation and lost baggage, and outline prescription medicine compliance."
      },
      {
        id: "log-flight-layover-optimization",
        icon: "✈️",
        name: "Flight Layover & Transit Lounge Optimization",
        category: "logistics",
        description: "Leverages airport lounges or transit mini-tours for long layovers.",
        layer: 3,
        requires: ["log-visa-entry-passport-checklist"],
        prompt: "Optimize Long Airport Layovers: Formulate lounge access hacks or quick transit city tour plans for layovers exceeding 6 hours."
      },
      {
        id: "log-luggage-storage-mobility",
        icon: "🧳",
        name: "Luggage Storage & Mobility Management",
        category: "logistics",
        description: "Identifies day-use luggage storage apps for early arrival/late departure days.",
        layer: 3,
        requires: ["log-packing-capsule-wardrobe"],
        prompt: "Plan Luggage Storage Mobility: Identify luggage locker stations or apps (Bounce / Nannybag) to store bags safely during pre-check-in and post-check-out hours."
      },
      {
        id: "bdg-daily-expense-categorizer",
        icon: "💰",
        name: "Daily Budget Allocation & Expense Planner",
        category: "budget",
        description: "Allocates daily budgets across lodging, food, transit, and sight admissions.",
        layer: 1,
        requires: [],
        prompt: "Create Daily Budget Allocation Model: Segment daily expenditure across Dining (40%), Transit (20%), Sightseeing (30%), and Contingency (10%)."
      },
      {
        id: "bdg-multi-currency-fx-strategy",
        icon: "💳",
        name: "FX Banking & Fee-Free Payment Strategy",
        category: "budget",
        description: "Avoids Dynamic Currency Conversion (DCC) traps using fee-free cards.",
        layer: 2,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "Establish No-FX-Fee Banking Strategy: Enforce rules to decline Dynamic Currency Conversion (DCC) at point-of-sale terminals and deploy zero-markup FX cards."
      },
      {
        id: "bdg-accommodation-value-finder",
        icon: "🏨",
        name: "Boutique vs. Value Lodging Audit",
        category: "budget",
        description: "Balances central location accessibility against value-for-money accommodation.",
        layer: 2,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "Audit Value Accommodation Options: Filter for highly rated (8.5+) boutique stays or apartments located 15 minutes by transit from major hubs."
      },
      {
        id: "bdg-city-pass-attraction-roi",
        icon: "🎟️",
        name: "City Tourist Pass ROI Calculator",
        category: "budget",
        description: "Calculates cost-benefit ratio of purchasing official tourist city passes.",
        layer: 2,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "Calculate City Tourist Pass ROI: Compare total city pass costs against cumulative single-ticket admissions to determine net financial savings."
      },
      {
        id: "bdg-transportation-card-hack",
        icon: "🎫",
        name: "Local Transit Pass & Card Savings",
        category: "budget",
        description: "Leverages multi-day unlimited transit passes or contactless daily fare capping.",
        layer: 3,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "Optimize Transit Fare Savings: Recommend 24/72-hour unlimited tourist transit passes or contactless card fare-capping options."
      },
      {
        id: "bdg-emergency-contingency-fund",
        icon: "🛡️",
        name: "Travel Emergency Contingency Buffer",
        category: "budget",
        description: "Locks a 15% emergency cash buffer for missed transport or unforeseen events.",
        layer: 3,
        requires: ["bdg-daily-expense-categorizer"],
        prompt: "Lock Travel Emergency Contingency Buffer: Reserve a non-negotiable 15% budget buffer for missed connections, medical needs, or urgent itinerary changes."
      }
    ]
  }
};