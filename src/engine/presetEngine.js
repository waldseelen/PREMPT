import { DOMAINS, getDomain } from '../domains/index.js';

// Presets are domain-owned data. Keeping this compatibility export lets
// validation and older consumers inspect the same registry without maintaining
// a second Learning/Code-only table.
export const PRESETS_BY_DOMAIN = Object.fromEntries(
    Object.values(DOMAINS).map((domain) => [domain.id, domain.presets || {}])
);

export function getPresets(domain = 'learning') {
    const domainDef = getDomain(domain);
    return domainDef?.presets || PRESETS_BY_DOMAIN[domain] || {};
}

export function applyPreset(presetId, domain = 'learning') {
    const preset = getPresets(domain)[presetId];
    if (!preset) return { forceModules: [], override: {}, injectRules: [] };
    return preset;
}
