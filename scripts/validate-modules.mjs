#!/usr/bin/env node
// Validates the prompt module data files for every domain (currently
// src/data/modules_{en,tr}.json for Learning and
// src/data/modules_code_{en,tr}.json for Code). Guards against silent
// drift: TR/EN parity, broken `requires`, missing fields, invalid layers,
// and duplicate ids — checked independently within each domain's file pair
// (id vocabularies are not shared across domains). Exits non-zero on any
// error.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { DOMAINS } from '../src/domains/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

const REQUIRED_FIELDS = ['id', 'icon', 'name', 'desc', 'explain', 'requires', 'prompt', 'layer'];

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

function reportLayers(label, modules, validLayers) {
    const counts = {};
    for (const layer of validLayers) counts[layer] = 0;
    modules.forEach((m) => {
        if (m && validLayers.includes(m.layer)) counts[m.layer]++;
    });
    const summary = validLayers.map((l) => `${l}=${counts[l]}`).join(', ');
    console.log(`  ${label}: ${modules.length} modules (${summary})`);
}

// --- Run ---
console.log('Validating prompt module data...');

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

console.log('\n✓ All module data checks passed.');
