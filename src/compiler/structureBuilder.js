import { COMPILER_TEXTS } from '../locales/compilerTexts';

export function buildPromptStructure(state, sortedModules) {
    const { config, injectedRules } = state;
    const lang = config.lang || 'tr';
    const texts = COMPILER_TEXTS[lang];
    const labels = texts.labels;
    const alanText = config.alan || (lang === 'en' ? 'Not specified' : 'Belirtilmedi');
    const seviyeLabel = config.seviye === 'otomatik' 
        ? (lang === 'en' ? 'AI will determine' : 'AI tarafından belirlenecek') 
        : config.seviye;

    const structure = {};

    // 1. [ROLE]
    structure[labels.role] = texts.mod[config.mod] || texts.mod.karma;

    // 2. [GOAL]
    structure[labels.goal] = lang === 'en' 
        ? `To understand the topic "${config.konu}" not superficially, but at a mechanical and causal level.`
        : `"${config.konu}" konusunu yüzeysel değil, mekanik ve nedensel seviyede kavramak.`;

    // 3. [CONTEXT]
    structure[labels.context] = `Domain: ${alanText}\nLevel: ${seviyeLabel}`;

    // 4. [ACTIVE MODULES]
    const moduleList = sortedModules.map(m => `- ${m.name} (${m.layer})`);
    structure[labels.modules] = moduleList.join('\n');

    // 5. [INSTRUCTIONS] (Tasks grouped by layers or topologically)
    const taskPrompts = sortedModules.map((m, index) => {
        // {{ALAN}} is a domain-injection token used intentionally only by the "esleme"
        // (Structural Mapping) module; for every other module this replace is a no-op.
        return `Step ${index + 1} (${m.layer.toUpperCase()}): ${m.prompt.replace('{{ALAN}}', alanText)}`;
    });
    structure[labels.instructions] = taskPrompts.join('\n\n');

    // 6. [OUTPUT FORMAT]
    structure[labels.format] = `${texts.format[config.format] || texts.format.markdown}\nDepth Requirement: ${texts.derinlik[config.derinlik] || texts.derinlik.orta}`;

    // 7. [CONSTRAINTS / SAFETY]
    const constraints = [
        lang === 'en' ? "Get straight to the point, no unnecessary introductions." : "Doğrudan konuya gir, gereksiz giriş cümlesi yazma.",
        lang === 'en' ? "Explain technical jargon simply." : "Teknik terim kullanırsan hemen sade dille açıkla.",
        lang === 'en' ? "Explicitly state any uncertainties." : "Belirsiz yer varsa bunu açıkça belirt."
    ];

    if (config.monolog) {
        constraints.push(lang === 'en' 
            ? "INTERNAL MONOLOGUE: Before answering each step, evaluate boundary conditions using your internal monologue (<thinking> tags) from at least 3 perspectives. Do not show this internal monologue in the final output."
            : "İÇ SES MODU: Her adımı yanıtlamadan önce konunun sınır koşullarını (<thinking> tagleri içerisinde) en az 3 farklı açıdan değerlendir. Ancak nihai kullanıcı çıktısına bu iç sesi yansıtma.");
    }

    if (injectedRules && injectedRules.length > 0) {
        injectedRules.forEach(r => constraints.push(`PRESET RULE: ${r}`));
    }

    structure[labels.constraints] = constraints.map((c, i) => `${i + 1}. ${c}`).join('\n');

    return structure;
}
