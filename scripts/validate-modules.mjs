#!/usr/bin/env node
// Validates the prompt module data files (src/data/modules_en.json / modules_tr.json).
// Guards against silent drift: TR/EN parity, broken `requires`, missing fields,
// invalid layers and duplicate ids. Exits non-zero on any error.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

const REQUIRED_FIELDS = ['id', 'icon', 'name', 'desc', 'explain', 'requires', 'prompt', 'layer'];
const VALID_LAYERS = ['foundation', 'mechanism', 'context', 'boundaries', 'application'];

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

function validateFile(file, modules) {
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

        // Valid layer enum.
        if (m && m.layer && !VALID_LAYERS.includes(m.layer)) {
            errors.push(`${where}: invalid layer "${m.layer}" (expected one of ${VALID_LAYERS.join(', ')})`);
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

function validateParity(enIds, trIds) {
    const max = Math.max(enIds.length, trIds.length);
    if (enIds.length !== trIds.length) {
        errors.push(`Parity: module count differs (en=${enIds.length}, tr=${trIds.length})`);
    }
    for (let i = 0; i < max; i++) {
        if (enIds[i] !== trIds[i]) {
            errors.push(`Parity: id order mismatch at index ${i} (en="${enIds[i]}", tr="${trIds[i]}")`);
        }
    }
}

function reportLayers(label, modules) {
    const counts = {};
    for (const layer of VALID_LAYERS) counts[layer] = 0;
    modules.forEach((m) => {
        if (m && VALID_LAYERS.includes(m.layer)) counts[m.layer]++;
    });
    const summary = VALID_LAYERS.map((l) => `${l}=${counts[l]}`).join(', ');
    console.log(`  ${label}: ${modules.length} modules (${summary})`);
}

// --- Run ---
console.log('Validating prompt module data...');
const en = loadModules('modules_en.json');
const tr = loadModules('modules_tr.json');

if (en) reportLayers('en', en);
if (tr) reportLayers('tr', tr);

let enIds = [];
let trIds = [];
if (en) enIds = validateFile('modules_en.json', en);
if (tr) trIds = validateFile('modules_tr.json', tr);
if (en && tr) validateParity(enIds, trIds);

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
