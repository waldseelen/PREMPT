// Validates prompt module data and domain preset contracts for every domain.
// Guards against silent drift: TR/EN parity, broken `requires`, missing fields,
// invalid layers, duplicate ids, unsubstituted prompt tokens, invalid preset
// contracts, parameter hover coverage, presentation registration (including icon
// resolution), compilerTexts completeness (including depth/labels/monologue and
// tr/en structure), layer translations, shared output-target vocabulary
// (FORMATTERS ↔ OUTPUT_TARGETS ↔ i18n.targets), and module icon coverage.
// Icon-render contract: getModuleIcon(MODULE_ICONS) is the only render source;
// the `icon` field in JSON is inert data. Exits non-zero on any error.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { DOMAINS } from '../src/domains/index.js';
import { getPresets } from '../src/engine/presetEngine.js';
import { PARAMETER_DESCRIPTIONS } from '../src/domains/parameterDescriptions.js';
import { DOMAIN_GROUPS, DOMAIN_ICON_IDS } from '../src/domains/presentation.js';
import { OUTPUT_TARGETS } from '../src/config/outputTargets.js';
import { MODULE_ICONS } from '../src/ui/moduleIconRegistry.js';
import { ICONS } from '../src/ui/iconRegistry.js';
import { SUGGESTION_RULES } from '../src/engine/suggestionRules.js';

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
const EMOJI_REGEX = /\p{Extended_Pictographic}/u;

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

        // Emoji assertion (Rule 13).
        if (m && m.icon && EMOJI_REGEX.test(m.icon)) {
            errors.push(`${where}: raw Unicode emoji "${m.icon}" forbidden in data catalog (Rule 13)`);
        }

        // Prompt-token allowlist (Phase 17.1): structureBuilder substitutes only
        // {{KONU}} and {{ALAN}}. Any other {{TOKEN}} reaches the final prompt
        // literally, so it is a data error, not content.
        for (const field of ['prompt', 'desc', 'explain']) {
            const text = m && typeof m[field] === 'string' ? m[field] : '';
            const tokens = text.match(/\{\{[A-Z_]+\}\}/g) || [];
            for (const token of new Set(tokens)) {
                if (token !== '{{KONU}}' && token !== '{{ALAN}}') {
                    errors.push(`${where}: field "${field}" contains unsubstituted token "${token}" (allowed: {{KONU}}, {{ALAN}})`);
                }
            }
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

    // Broken `requires` references & DAG cycle detection.
    const adjList = new Map();
    modules.forEach((m, i) => {
        if (m && Array.isArray(m.requires)) {
            adjList.set(m.id, m.requires);
            m.requires.forEach((dep) => {
                if (!ids.has(dep)) {
                    errors.push(`${file}[${i}] (id="${m.id}"): "requires" points to unknown id "${dep}"`);
                }
            });
        }
    });

    // Detect DAG cycles via DFS
    const visited = new Map(); // 0 = unvisited, 1 = visiting, 2 = visited
    function checkCycle(node, pathStack) {
        visited.set(node, 1);
        const deps = adjList.get(node) || [];
        for (const dep of deps) {
            if (!ids.has(dep)) continue;
            if (visited.get(dep) === 1) {
                errors.push(`Cycle in ${file}: circular dependency detected: ${pathStack.join(' -> ')} -> ${dep}`);
                return;
            }
            if (!visited.get(dep)) {
                checkCycle(dep, [...pathStack, dep]);
            }
        }
        visited.set(node, 2);
    }

    for (const id of ids) {
        if (!visited.get(id)) {
            checkCycle(id, [id]);
        }
    }

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

    if (preset.id !== presetId) {
        errors.push(`${where}: preset id "${preset.id}" does not match dictionary key "${presetId}"`);
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

    // Structural injectRules gate (Phase 17.2): absence and template filler
    // are warnings, not errors — the rule prose itself is human-curated
    // content work tracked separately, but the gap must stay visible. Only a
    // present-but-malformed value (non-array, empty rule string) is an error.
    if (preset.injectRules === undefined || (Array.isArray(preset.injectRules) && preset.injectRules.length === 0)) {
        warnings.push(`${where}: "injectRules" is missing or empty — preset injects no constraint rules`);
    } else if (!Array.isArray(preset.injectRules)) {
        errors.push(`${where}: "injectRules" must be an array`);
    } else {
        for (const rule of preset.injectRules) {
            if (typeof rule !== 'string' || rule.trim() === '') {
                errors.push(`${where}: "injectRules" contains an empty rule`);
            } else if (/^Apply \w+ domain rule for /.test(rule)) {
                warnings.push(`${where}: "injectRules" looks like unedited template filler: "${rule}"`);
            }
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

        const depthIds = Object.keys(domain.optionSets?.depths || {});
        for (const depthId of depthIds) {
            if (typeof langTexts.derinlik?.[depthId] !== 'string' || langTexts.derinlik[depthId].trim() === '') {
                errors.push(`CompilerTexts[${domainId}/${lang}]: missing derinlik text for depth "${depthId}"`);
            }
        }

        for (const section of ['labels', 'contextLabels']) {
            if (!langTexts[section] || typeof langTexts[section] !== 'object') {
                errors.push(`CompilerTexts[${domainId}/${lang}]: missing ${section} object`);
            }
        }

        if (typeof langTexts.monologueText !== 'string' || langTexts.monologueText.trim() === '') {
            errors.push(`CompilerTexts[${domainId}/${lang}]: monologueText is missing or empty`);
        }

        if (typeof langTexts.goalTemplate !== 'string' || !langTexts.goalTemplate.includes('{{KONU}}')) {
            errors.push(`CompilerTexts[${domainId}/${lang}]: goalTemplate is missing or lacks {{KONU}} placeholder`);
        }

        if (!Array.isArray(langTexts.constraintsBase) || langTexts.constraintsBase.length === 0) {
            errors.push(`CompilerTexts[${domainId}/${lang}]: constraintsBase must be a non-empty array`);
        }
    }

    // TR/EN structural parity on the spec's OWN bundle (not the merged
    // getCompilerTexts output, where the learning fallback masks gaps).
    const trTexts = compilerTexts.tr || {};
    const enTexts = compilerTexts.en || {};
    for (const section of ['mod', 'derinlik', 'format', 'labels', 'contextLabels']) {
        const trKeys = Object.keys(trTexts[section] || {}).sort();
        const enKeys = Object.keys(enTexts[section] || {}).sort();
        if (trKeys.length !== enKeys.length || trKeys.some((k, i) => k !== enKeys[i])) {
            errors.push(`CompilerTexts[${domainId}]: tr/en key mismatch in "${section}" (tr=[${trKeys.join(', ')}], en=[${enKeys.join(', ')}])`);
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
        } else if (!ICONS[DOMAIN_ICON_IDS[domainId]]) {
            errors.push(`Presentation[${domainId}]: icon id "${DOMAIN_ICON_IDS[domainId]}" does not resolve in iconRegistry ICONS`);
        }
    }
    if (new Set(presentationIds).size !== presentationIds.length) {
        errors.push('Presentation: DOMAIN_GROUPS contains duplicate domain ids');
    }
    console.log(`  presentation: ${presentationIds.length} domains and ${Object.keys(DOMAIN_ICON_IDS).length} icons`);
}

function validateSuggestionCoverage() {
    // Rule-less domains are not an error, but the "recommended" tab degrades
    // to a layer cross-section there — keep the list visible (Phase 17.5).
    const uncovered = Object.keys(DOMAINS).filter(
        (id) => !Array.isArray(SUGGESTION_RULES[id]) || SUGGESTION_RULES[id].length === 0
    );
    for (const id of uncovered) {
        warnings.push(`Suggestions[${id}]: no SUGGESTION_RULES — "recommended" tab shows a layer cross-section`);
    }
    if (uncovered.length > 0) {
        console.log(`  ${uncovered.length} domain(s) without suggestion rules (listed as warnings).`);
    }
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

    // i18n.targets (both languages) must offer exactly the selectable targets:
    // a label with no formatter (or a formatter with no label) is a silent
    // dead end in the UI (Phase 17.3).
    const i18nSource = readSource(join('locales', 'i18n.js'), 'i18n.targets');
    if (i18nSource) {
        const blocks = [...i18nSource.matchAll(/targets:\s*\{([^}]*)\}/g)];
        if (blocks.length === 0) {
            errors.push('Output targets: no targets blocks found in i18n.js');
        }
        for (const [index, block] of blocks.entries()) {
            const ids = block[1]
                .split(String.fromCharCode(10))
                .map((line) => line.trim().split(':')[0].replace(/^['"]|['"]$/g, ''))
                .filter((id) => id && id !== ',');
            if (ids.length !== OUTPUT_TARGETS.length || ids.some((id, i) => id !== OUTPUT_TARGETS[i])) {
                errors.push(`Output targets: i18n.js targets block #${index + 1} [${ids.join(', ')}] does not match OUTPUT_TARGETS [${OUTPUT_TARGETS.join(', ')}]`);
            }
        }
    }

    if (errors.length === 0) {
        console.log(`  ids: ${OUTPUT_TARGETS.join(', ')} (central registry + formatter/consumer checks)`);
    }
}

function validateDefaultConfig(domainId, domain) {
    const dc = domain.defaultConfig;
    if (!dc || typeof dc !== 'object') {
        errors.push(`DefaultConfig[${domainId}]: missing or invalid defaultConfig`);
        return;
    }

    const sets = domain.optionSets || {};
    const checks = [
        ['seviye', 'levels'],
        ['mod', 'modes'],
        ['derinlik', 'depths'],
        ['format', 'formats']
    ];

    for (const [configKey, optionSetName] of checks) {
        const val = dc[configKey];
        const validKeys = Object.keys(sets[optionSetName] || {});
        if (!val || !validKeys.includes(val)) {
            errors.push(`DefaultConfig[${domainId}]: ${configKey}="${val}" is not in optionSets.${optionSetName} (expected one of: ${validKeys.join(', ')})`);
        }
    }
}

function validateModuleIconRegistry(allFoundModuleIds) {
    console.log('\n[moduleIconRegistry]');
    let missingCount = 0;
    for (const id of allFoundModuleIds) {
        if (!MODULE_ICONS[id]) {
            errors.push(`moduleIconRegistry: module "${id}" has no mapped icon in MODULE_ICONS`);
            missingCount++;
        }
    }
    if (missingCount === 0) {
        console.log(`  ✓ All ${allFoundModuleIds.size} unique modules are registered in moduleIconRegistry.js with semantic Lucide icons.`);
    }
    // Orphan entries (an icon mapping with no module behind it) are harmless
    // but mislead the next author into thinking the module exists (Phase 17.6).
    const orphans = Object.keys(MODULE_ICONS).filter((id) => !allFoundModuleIds.has(id));
    for (const id of orphans) {
        warnings.push(`moduleIconRegistry: orphan icon mapping "${id}" has no matching module id`);
    }
    if (orphans.length > 0) {
        console.log(`  ${orphans.length} orphan icon mapping(s) listed as warnings.`);
    }
}

// --- Run ---
console.log('Validating prompt module data, preset contracts, parameter descriptions, compiler texts, presentation, and output targets...');
validatePresentation();
validateOutputTargets();
validateSuggestionCoverage();

const allFoundModuleIds = new Set();

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

    if (en) {
        reportLayers(files.en, en, validLayers);
        en.forEach((m) => m && m.id && allFoundModuleIds.add(m.id));
    }
    if (tr) {
        reportLayers(files.tr, tr, validLayers);
        tr.forEach((m) => m && m.id && allFoundModuleIds.add(m.id));
    }

    let enIds = [];
    let trIds = [];
    if (en) enIds = validateFile(files.en, en, validLayers);
    if (tr) trIds = validateFile(files.tr, tr, validLayers);
    if (en && tr) validateParity(domainId, enIds, trIds);

    const registryModules = en || tr;
    validateDefaultConfig(domainId, domain);
    validateParameterDescriptions(domainId, domain);
    validateCompilerTexts(domainId, domain);
    validateCategories(domainId, domain);
    if (registryModules) validatePresets(domainId, domain, registryModules);
}

validateModuleIconRegistry(allFoundModuleIds);

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
