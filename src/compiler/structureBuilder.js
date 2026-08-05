import { getCompilerTexts } from '../locales/compilerTexts.js';

export function buildPromptStructure(state, sortedModules) {
    const { config, injectedRules } = state;
    const lang = config.lang || 'tr';
    const domain = config.domain || 'learning';
    const texts = getCompilerTexts(lang, domain);
    const labels = texts.labels;
    const alanText = config.alan || (lang === 'en' ? 'Not specified' : 'Belirtilmedi');
    const seviyeLabel = config.seviye === 'otomatik'
        ? (lang === 'en' ? 'AI will determine' : 'AI tarafından belirlenecek')
        : config.seviye;

    const structure = {};

    // 1. [ROLE]
    structure[labels.role] = texts.mod[config.mod] || Object.values(texts.mod)[0];

    // 2. [GOAL] — goalTemplate carries a {{KONU}} placeholder for the topic/task text.
    structure[labels.goal] = texts.goalTemplate.replace('{{KONU}}', config.konu);

    // 3. [CONTEXT] — labels come from the active domain's compiler text bundle
    // so this respects `lang` instead of always printing English.
    const { domain: domainLabel, level: levelLabel, depthRequirement: depthRequirementLabel } = texts.contextLabels;
    structure[labels.context] = `${domainLabel} ${alanText}\n${levelLabel} ${seviyeLabel}`;

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
    structure[labels.format] = `${texts.format[config.format] || Object.values(texts.format)[0]}\n${depthRequirementLabel} ${texts.derinlik[config.derinlik] || Object.values(texts.derinlik)[0]}`;

    // 7. [CONSTRAINTS / SAFETY] — base constraints come from the active domain's
    // compiler text bundle (e.g. Learning softens jargon, Code demands complete code).
    const constraints = [...texts.constraintsBase];

    if (config.monolog) {
        constraints.push(texts.monologueText);
    }

    if (injectedRules && injectedRules.length > 0) {
        injectedRules.forEach(r => constraints.push(`PRESET RULE: ${r}`));
    }

    structure[labels.constraints] = constraints.map((c, i) => `${i + 1}. ${c}`).join('\n');

    return structure;
}
