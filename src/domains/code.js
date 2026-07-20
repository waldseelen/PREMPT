// Declarative descriptor for the Code domain. See learning.js for the field
// contract — translated labels, compiler text, module data, and presets all
// live in their respective domain-scoped homes, not here.
export const codeDomain = {
    id: 'code',
    route: 'code',
    layers: ['design', 'build', 'comprehend', 'harden', 'ship'],
    modeIds: ['senior', 'reviewer', 'architect', 'pair', 'security'],
    // 'otomatik' (Auto) is reused as an id across domains so structureBuilder's
    // "AI will determine" special-case stays domain-agnostic.
    levelIds: ['otomatik', 'prototype', 'production', 'hardened'],
    depthIds: ['orta', 'temel', 'derin', 'kapsamli'],
    formatIds: ['explained', 'full', 'diff', 'stepwise'],
    defaultConfig: {
        seviye: 'otomatik',
        mod: 'senior',
        derinlik: 'orta',
        format: 'explained'
    }
};
