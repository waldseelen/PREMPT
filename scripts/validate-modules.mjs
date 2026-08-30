// Validates prompt module data and domain preset contracts for every domain.
// Guards against silent drift: TR/EN parity, broken `requires`, missing fields,
// invalid layers, duplicate ids, invalid preset contracts, parameter hover
// coverage, presentation registration, compilerTexts completeness, layer translations,
// and shared output-target vocabulary.
// Exits non-zero on any error.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { DOMAINS } from '../src/domains/index.js';
import { getPresets } from '../src/engine/presetEngine.js';
import { PARAMETER_DESCRIPTIONS } from '../src/domains/parameterDescriptions.js';
import { DOMAIN_GROUPS, DOMAIN_ICON_IDS } from '../src/domains/presentation.js';
import { OUTPUT_TARGETS } from '../src/config/outputTargets.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const sourceDir = join(__dirname, '..', 'src');

const REQUIRED_FIELDS = ['id', 'icon', 'name', 'desc', 'explain', 'requires', 'prompt', 'layer'];
const PRESET_LANGS = ['tr', 'en'];
const PARAMETER_FIELDS = ['levels', 'modes', 'depths', 'formats'];
const OVERRIDE_FIELDS = {
    seviye: 'levels',
    mod: 'modes',
    derinlik: 'depths',
    format: 'formats'
};

const DOMAIN_FILES = Object.fromEntries(
    Object.keys(DOMAINS).map((id) => [
        id,
        id === 'learning'
            ? { en: 'modules_en.json', tr: 'modules_tr.json' }
            : { en: `modules_${id}_en.json`, tr: `modules_${id}_tr.json` }
    ])
);

const errors = [];
const warnings = [];

function loadModules(file) {
    const path = join(dataDir, file);
    let raw;
    try {
        raw = readFileSync(path, 'utf8');
    } catch {
        errors.push(`${file}: file could not be read (${path})`);
        return null;
    }
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            errors.push(`${file}: root is not a JSON array`);
            return null;
        }
        return parsed;
    } catch (e) {
        errors.push(`${file}: invalid JSON — ${e.message}`);
        return null;
    }
}

function validateFile(file, modules, validLayers) {
    const ids = new Set();
    modules.forEach((m, i) => {
        const where = `${file}[${i}]${m && m.id ? ` (id="${m.id}")` : ''}`;

        // Required fields present and non-empty.
        for (const field of REQUIRED_FIELDS) {
            const v = m ? m[field] : undefined;
            if (field === 'requires') {
                if (!Array.isArray(v)) errors.push(`${where}: "requires" must be an array`);
            } else if (typeof v !== 'string' || v.trim() === '') {
                errors.push(`${where}: missing or empty "${field}"`);
            }
        }

        // Valid layer enum (domain-specific).
        if (m && m.layer && !validLayers.includes(m.layer)) {
            errors.push(`${where}: invalid layer "${m.layer}" (expected one of ${validLayers.join(', ')})`);
        }

        // Duplicate ids.
        if (m && typeof m.id === 'string') {
            if (ids.has(m.id)) errors.push(`${where}: duplicate id "${m.id}"`);
            ids.add(m.id);
        }

        // Reject obsolete legacy properties
        if (m && Object.prototype.hasOwnProperty.call(m, 'category')) {
            errors.push(`${where}: obsolete property "category" should be removed`);
        }
        if (m && Object.prototype.hasOwnProperty.call(m, 'description')) {
            errors.push(`${where}: obsolete property "description" should be removed`);
        }
    });

    // Broken `requires` references.
    modules.forEach((m, i) => {
        if (m && Array.isArray(m.requires)) {
            m.requires.forEach((dep) => {
                if (!ids.has(dep)) {
                    errors.push(`${file}[${i}] (id="${m.id}"): "requires" points to unknown id "${dep}"`);
                }
            });
        }
    });

    return modules.map((m) => (m ? m.id : undefined));
}

function validateParity(domainId, enIds, trIds) {
    const max = Math.max(enIds.length, trIds.length);
    if (enIds.length !== trIds.length) {
        errors.push(`Parity[${domainId}]: module count differs (en=${enIds.length}, tr=${trIds.length})`);
    }
    for (let i = 0; i < max; i++) {
        if (enIds[i] !== trIds[i]) {
            errors.push(`Parity[${domainId}]: id order mismatch at index ${i} (en="${enIds[i]}", tr="${trIds[i]}")`);
        }
    }
}

function getOptionIds(domain, field) {
    const optionSetName = OVERRIDE_FIELDS[field];
    return Object.keys(domain.optionSets?.[optionSetName] || {});
}

function validatePreset(domainId, presetId, preset, domain, registryIds) {
    const where = `Preset[${domainId}/${presetId}]`;

    if (!preset || typeof preset !== 'object') {
        errors.push(`${where}: preset must be an object`);
        return;
    }

    if (!Array.isArray(preset.forceModules)) {
        errors.push(`${where}: "forceModules" must be an array`);
    } else {
        if (new Set(preset.forceModules).size !== preset.forceModules.length) {
            errors.push(`${where}: "forceModules" contains duplicate module IDs`);
        }
        for (const moduleId of preset.forceModules) {
            if (!registryIds.has(moduleId)) {
                errors.push(`${where}: "forceModules" points to unknown module id "${moduleId}"`);
            }
        }
    }

    if (!preset.override || typeof preset.override !== 'object' || Array.isArray(preset.override)) {
        errors.push(`${where}: "override" must be an object`);
    } else {
        for (const [field, value] of Object.entries(preset.override)) {
            if (!Object.hasOwn(OVERRIDE_FIELDS, field)) {
                errors.push(`${where}: unknown override key "${field}"`);
                continue;
            }
            const validIds = getOptionIds(domain, field);
            if (!validIds.includes(value)) {
                errors.push(`${where}: invalid override ${field} "${value}" (expected one of ${validIds.join(', ')})`);
            }
        }
    }

    for (const lang of PRESET_LANGS) {
        const groups = domain.ui?.[lang]?.presetGroups;
        const label = groups?.[preset.group];
        if (typeof label !== 'string' || label.trim() === '') {
            errors.push(`${where}: group "${preset.group}" has no translated label for ${lang}`);
        }
    }
}

function validateParameterDescriptions(domainId, domain) {
    const descriptions = PARAMETER_DESCRIPTIONS[domainId];
    for (const field of PARAMETER_FIELDS) {
        const optionIds = Object.keys(domain.optionSets?.[field] || {});
        const fieldDescriptions = descriptions?.[field];
        if (!fieldDescriptions) {
            errors.push(`Parameter descriptions[${domainId}/${field}]: field is missing`);
            continue;
        }
        for (const optionId of optionIds) {
            const description = fieldDescriptions[optionId];
            if (!description) {
                errors.push(`Parameter descriptions[${domainId}/${field}/${optionId}]: description is missing`);
                continue;
            }
            for (const lang of PRESET_LANGS) {
                if (typeof description[lang] !== 'string' || description[lang].trim() === '') {
                    errors.push(`Parameter descriptions[${domainId}/${field}/${optionId}]: missing ${lang} text`);
                }
            }
        }
    }
}

function validateCompilerTexts(domainId, domain) {
    const compilerTexts = domain.compilerTexts;
    if (!compilerTexts) {
        errors.push(`CompilerTexts[${domainId}]: missing compilerTexts object on domain spec`);
        return;
    }

    for (const lang of PRESET_LANGS) {
        const langTexts = compilerTexts[lang];
        if (!langTexts) {
            errors.push(`CompilerTexts[${domainId}]: missing ${lang} compiler texts`);
            continue;
        }

        const modeIds = Object.keys(domain.optionSets?.modes || {});
        for (const modeId of modeIds) {
            if (typeof langTexts.mod?.[modeId] !== 'string' || langTexts.mod[modeId].trim() === '') {
                errors.push(`CompilerTexts[${domainId}/${lang}]: missing mod text for mode "${modeId}"`);
            }
        }

        const formatIds = Object.keys(domain.optionSets?.formats || {});
        for (const formatId of formatIds) {
            if (typeof langTexts.format?.[formatId] !== 'string' || langTexts.format[formatId].trim() === '') {
                errors.push(`CompilerTexts[${domainId}/${lang}]: missing format text for format "${formatId}"`);
            }
        }

        if (typeof langTexts.goalTemplate !== 'string' || !langTexts.goalTemplate.includes('{{KONU}}')) {
            errors.push(`CompilerTexts[${domainId}/${lang}]: goalTemplate is missing or lacks {{KONU}} placeholder`);
        }

        if (!Array.isArray(langTexts.constraintsBase) || langTexts.constraintsBase.length === 0) {
            errors.push(`CompilerTexts[${domainId}/${lang}]: constraintsBase must be a non-empty array`);
        }
    }
}

function validateCategories(domainId, domain) {
    for (const layer of domain.layers) {
        for (const lang of PRESET_LANGS) {
            const label = domain.ui?.[lang]?.categories?.[layer];
            if (typeof label !== 'string' || label.trim() === '') {
                errors.push(`Categories[${domainId}/${lang}]: missing category label for layer "${layer}"`);
            }
        }
    }
}

function validatePresentation() {
    const presentationIds = DOMAIN_GROUPS.flatMap((group) => group.domains.map((domain) => domain.id));
    const domainIds = Object.keys(DOMAINS);
    for (const domainId of domainIds) {
        if (!presentationIds.includes(domainId)) {
            errors.push(`Presentation[${domainId}]: domain is missing from DOMAIN_GROUPS`);
        }
        if (!DOMAIN_ICON_IDS[domainId]) {
            errors.push(`Presentation[${domainId}]: icon id is missing from DOMAIN_ICON_IDS`);
        }
    }
    if (new Set(presentationIds).size !== presentationIds.length) {
        errors.push('Presentation: DOMAIN_GROUPS contains duplicate domain ids');
    }
    console.log(`  presentation: ${presentationIds.length} domains and ${Object.keys(DOMAIN_ICON_IDS).length} icons`);
}

function validatePresets(domainId, domain, modules) {
    const presets = getPresets(domainId);
    const registryIds = new Set(modules.filter((m) => m && typeof m.id === 'string').map((m) => m.id));

    if (!presets || typeof presets !== 'object' || Array.isArray(presets)) {
        errors.push(`Presets[${domainId}]: preset registry is not an object`);
        return;
    }

    for (const [presetId, preset] of Object.entries(presets)) {
        validatePreset(domainId, presetId, preset, domain, registryIds);
    }

    console.log(`  presets: ${Object.keys(presets).length} checked (forceModules, override, group tr/en)`);
}

function reportLayers(label, modules, validLayers) {
    const counts = {};
    for (const layer of validLayers) counts[layer] = 0;
    modules.forEach((m) => {
        if (m && validLayers.includes(m.layer)) counts[m.layer]++;
    });
    const summary = validLayers.map((l) => `${l}=${counts[l]}`).join(', ');
    console.log(`  ${label}: ${modules.length} modules (${summary})`);
}

function readSource(relativePath, label) {
    const path = join(sourceDir, relativePath);
    try {
        return readFileSync(path, 'utf8');
    } catch {
        errors.push(`Output targets[${label}]: source file could not be read (${path})`);
        return null;
    }
}

function extractObjectKeys(source, declaration, label) {
    const prefix = `${declaration} = {`;
    const start = source?.indexOf(prefix) ?? -1;
    const end = start >= 0 ? source.indexOf('};', start) : -1;
    if (start < 0 || end < 0) {
        errors.push(`Output targets[${label}]: could not find ${declaration} object`);
        return null;
    }
    const body = source.slice(start + prefix.length, end);
    return body
        .split(String.fromCharCode(10))
        .map((line) => line.trim().split(':')[0].replace(/^['"]|['"]$/g, ''))
        .filter((id) => id && id !== ',');
}

function validateOutputTargets() {
    const formatterSource = readSource(join('compiler', 'formatterRegistry.js'), 'FORMATTERS');
    const formatterIds = formatterSource
        ? extractObjectKeys(formatterSource, 'const FORMATTERS', 'FORMATTERS')
        : null;
    const consumerChecks = [
        ['ConfigPanel', join('ui', 'ConfigPanel.jsx')],
        ['statePayload', join('utils', 'statePayload.js')]
    ];

    if (formatterIds && (formatterIds.length !== OUTPUT_TARGETS.length || formatterIds.some((id, index) => id !== OUTPUT_TARGETS[index]))) {
        errors.push(`Output targets: FORMATTERS ids [${formatterIds.join(', ')}] do not match OUTPUT_TARGETS [${OUTPUT_TARGETS.join(', ')}]`);
    }

    for (const [label, relativePath] of consumerChecks) {
        const source = readSource(relativePath, label);
        if (source && !source.includes('OUTPUT_TARGETS')) {
            errors.push(`Output targets: ${label} does not consume the central OUTPUT_TARGETS registry`);
        }
    }

    if (errors.length === 0) {
        console.log(`  ids: ${OUTPUT_TARGETS.join(', ')} (central registry + formatter/consumer checks)`);
    }
}

// --- Run ---
console.log('Validating prompt module data, preset contracts, parameter descriptions, compiler texts, presentation, and output targets...');
validatePresentation();
validateOutputTargets();

for (const [domainId, files] of Object.entries(DOMAIN_FILES)) {
    const domain = DOMAINS[domainId];
    if (!domain) {
        errors.push(`Domain "${domainId}" is not registered in src/domains/index.js`);
        continue;
    }
    const validLayers = domain.layers;

    console.log(`\n[${domainId}]`);
    const en = loadModules(files.en);
    const tr = loadModules(files.tr);

    if (en) reportLayers(files.en, en, validLayers);
    if (tr) reportLayers(files.tr, tr, validLayers);

    let enIds = [];
    let trIds = [];
    if (en) enIds = validateFile(files.en, en, validLayers);
    if (tr) trIds = validateFile(files.tr, tr, validLayers);
    if (en && tr) validateParity(domainId, enIds, trIds);

    const registryModules = en || tr;
    validateParameterDescriptions(domainId, domain);
    validateCompilerTexts(domainId, domain);
    validateCategories(domainId, domain);
    if (registryModules) validatePresets(domainId, domain, registryModules);
}

if (warnings.length) {
    console.warn(`\n${warnings.length} warning(s):`);
    warnings.forEach((w) => console.warn(`  ⚠ ${w}`));
}

if (errors.length) {
    console.error(`\n${errors.length} error(s):`);
    errors.forEach((e) => console.error(`  ✗ ${e}`));
    process.exit(1);
}

console.log('\n✓ All module, preset, parameter, compiler, presentation, and output-target checks passed.');
