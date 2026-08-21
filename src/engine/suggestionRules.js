export const DEPTH = {
    BASIC: 'temel',
    EXPERT: 'uzman'
};

export const FORMAT = {
    LECTURE: 'ders'
};

export const LEVEL = {
    HARDENED: 'hardened'
};

const LEARNING_RULES = [
    {
        reasonKey: 'quizNeedsFoundations',
        condition: (config, has) => has('quiz'),
        action: (suggestions, has, reasonKey) => {
            if (!has('ontoloji')) suggestions.set('ontoloji', reasonKey);
            if (!has('mekanizma')) suggestions.set('mekanizma', reasonKey);
        }
    },
    {
        reasonKey: 'basicNeedsMentalModel',
        condition: (config, has) => config.derinlik === DEPTH.BASIC && !has('mental'),
        action: (suggestions, has, reasonKey) => suggestions.set('mental', reasonKey)
    },
    {
        reasonKey: 'lectureNeedsPrereqs',
        condition: (config, has) => config.format === FORMAT.LECTURE && !has('onkosul'),
        action: (suggestions, has, reasonKey) => suggestions.set('onkosul', reasonKey)
    },
    {
        reasonKey: 'expertNeedsBoundaries',
        condition: (config) => config.seviye === DEPTH.EXPERT,
        action: (suggestions, has, reasonKey) => {
            if (!has('varsayimlar')) suggestions.set('varsayimlar', reasonKey);
            if (!has('basarisizlik')) suggestions.set('basarisizlik', reasonKey);
        }
    },
    {
        reasonKey: 'firstPrinciplesNeedsMisconceptions',
        condition: (config, has) => config.mod === 'ilkeler' && !has('yanilgilar'),
        action: (suggestions, has, reasonKey) => suggestions.set('yanilgilar', reasonKey)
    }
];

const CODE_RULES = [
    {
        reasonKey: 'implementNeedsTests',
        condition: (config, has) => (has('debug') || has('implement')) && !has('tests'),
        action: (suggestions, has, reasonKey) => suggestions.set('tests', reasonKey)
    },
    {
        reasonKey: 'architectureNeedsApiDesign',
        condition: (config, has) => has('architecture') && !has('api-design'),
        action: (suggestions, has, reasonKey) => suggestions.set('api-design', reasonKey)
    },
    {
        reasonKey: 'architectureNeedsThreatModel',
        condition: (config, has) => has('architecture') && !has('threat-model'),
        action: (suggestions, has, reasonKey) => suggestions.set('threat-model', reasonKey)
    },
    {
        reasonKey: 'hardenedNeedsSecurity',
        condition: (config) => config.seviye === LEVEL.HARDENED,
        action: (suggestions, has, reasonKey) => {
            if (!has('security')) suggestions.set('security', reasonKey);
            if (!has('edge-cases')) suggestions.set('edge-cases', reasonKey);
        }
    },
    {
        reasonKey: 'migrationNeedsTests',
        condition: (config, has) => has('migration') && !has('tests'),
        action: (suggestions, has, reasonKey) => suggestions.set('tests', reasonKey)
    }
];

export const SUGGESTION_RULES = {
    learning: LEARNING_RULES,
    code: CODE_RULES
};

export function getSuggestionRules(domainId) {
    return SUGGESTION_RULES[domainId] || [];
}
