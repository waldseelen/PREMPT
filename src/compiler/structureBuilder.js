import { getCompilerTexts } from '../locales/compilerTexts.js';

export function buildPromptStructure(state, sortedModules) {
    const { config, injectedRules } = state;
    const lang = config.lang || 'tr';
    const domain = config.domain || 'learning';
    const texts = getCompilerTexts(lang, domain);
    const labels = texts.labels || {
        role: '[ROLE]',
        goal: '[GOAL]',
        context: '[CONTEXT]',
        modules: '[ACTIVE MODULES]',
        instructions: '[INSTRUCTIONS]',
        format: '[OUTPUT FORMAT]',
        constraints: '[CONSTRAINTS / SAFETY]'
    };
    const mods = texts.mod || {};
    const alanText = config.alan || (lang === 'en' ? 'Not specified' : 'Belirtilmedi');
    const seviyeLabel = config.seviye === 'otomatik'
        ? (lang === 'en' ? 'AI will determine' : 'AI tarafından belirlenecek')
        : config.seviye;

    const structure = {};

    // 1. [ROLE]
    const roleText = (config.mod && Object.hasOwn(mods, config.mod))
        ? mods[config.mod]
        : (Object.values(mods)[0] || (lang === 'en' ? 'You are an AI assistant.' : 'Sen bir AI asistanısın.'));
    structure[labels.role] = roleText;

    // 2. [GOAL] — goalTemplate carries a {{KONU}} placeholder for the topic/task text.
    const goalTmpl = texts.goalTemplate || (lang === 'en' ? 'Complete the task "{{KONU}}".' : '"{{KONU}}" görevini tamamla.');
    structure[labels.goal] = goalTmpl.replaceAll('{{KONU}}', () => config.konu || '');

    // 3. [CONTEXT] — labels come from the active domain's compiler text bundle
    // so this respects `lang` instead of always printing English.
    const contextLabels = texts.contextLabels || { domain: 'Domain:', level: 'Level:', depthRequirement: 'Depth:' };
    const { domain: domainLabel = 'Domain:', level: levelLabel = 'Level:', depthRequirement: depthRequirementLabel = 'Depth:' } = contextLabels;
    structure[labels.context] = `${domainLabel} ${alanText}\n${levelLabel} ${seviyeLabel}`;

    // 4. [ACTIVE MODULES]
    const moduleList = sortedModules.map(m => `- ${m.name} (${m.layer})`);
    structure[labels.modules] = moduleList.join('\n');

    // 5. [INSTRUCTIONS] (Tasks grouped by layers or topologically)
    const taskPrompts = sortedModules.map((m, index) => {
        // {{ALAN}} is a domain-injection token used intentionally by structural mapping modules.
        const parsedPrompt = m.prompt ? m.prompt.replaceAll('{{ALAN}}', () => alanText) : '';
        return `Step ${index + 1} (${m.layer.toUpperCase()}): ${parsedPrompt}`;
    });
    structure[labels.instructions] = taskPrompts.join('\n\n');

    // 6. [OUTPUT FORMAT]
    const formats = texts.format || {};
    const derinlikler = texts.derinlik || {};
    const fmtText = (config.format && Object.hasOwn(formats, config.format))
        ? formats[config.format]
        : (Object.values(formats)[0] || (lang === 'en' ? 'Markdown format' : 'Markdown formatı'));
    const drnText = (config.derinlik && Object.hasOwn(derinlikler, config.derinlik))
        ? derinlikler[config.derinlik]
        : (Object.values(derinlikler)[0] || (lang === 'en' ? 'Moderate detail' : 'Orta düzey detay'));
    structure[labels.format] = `${fmtText}\n${depthRequirementLabel} ${drnText}`;

    // 7. [CONSTRAINTS / SAFETY] — base constraints come from the active domain's
    // compiler text bundle (e.g. Learning softens jargon, Code demands complete code).
    const constraints = [...(texts.constraintsBase || [])];

    if (config.monolog) {
        constraints.push(texts.monologueText || 'INTERNAL MONOLOGUE: Evaluate boundary conditions before answering.');
    }

    if (injectedRules && injectedRules.length > 0) {
        injectedRules.forEach(r => constraints.push(`PRESET RULE: ${r}`));
    }

    structure[labels.constraints] = constraints.map((c, i) => `${i + 1}. ${c}`).join('\n');

    return structure;
}
