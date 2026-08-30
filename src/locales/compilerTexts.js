// Domain-scoped compiler text bundles adapter.
// Each domain spec (src/domains/specs/*Spec.js) encapsulates its own
// compilerTexts bundle for tr/en containing [ROLE]/[GOAL]/[OUTPUT FORMAT]/[CONSTRAINTS].
// structureBuilder.js consumes getCompilerTexts(lang, domain).

import { getDomain, DEFAULT_DOMAIN } from '../domains/index.js';

export function getCompilerTexts(lang = 'tr', domain = DEFAULT_DOMAIN) {
    const domainDef = getDomain(domain);
    const fallbackDef = getDomain(DEFAULT_DOMAIN);

    const domainBundle = domainDef?.compilerTexts?.[lang] || domainDef?.compilerTexts?.tr;
    const fallbackBundle = fallbackDef?.compilerTexts?.[lang] || fallbackDef?.compilerTexts?.tr || {};

    if (!domainBundle) return fallbackBundle;

    return {
        ...fallbackBundle,
        ...domainBundle,
        labels: { ...fallbackBundle.labels, ...domainBundle.labels },
        contextLabels: { ...fallbackBundle.contextLabels, ...domainBundle.contextLabels },
        mod: { ...fallbackBundle.mod, ...domainBundle.mod },
        derinlik: { ...fallbackBundle.derinlik, ...domainBundle.derinlik },
        format: { ...fallbackBundle.format, ...domainBundle.format }
    };
}
