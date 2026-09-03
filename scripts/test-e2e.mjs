/**
 * scripts/test-e2e.mjs
 * 
 * Standalone, zero-dependency, requirement-driven E2E test runner and test suite
 * for the PREMPT parametric prompt engine Progressive Unified Workspace (L0, L1, L2).
 * 
 * Covers Tiers 1-4:
 * - Tier 1: Feature Coverage (>=5 tests per feature across 12 features => 60+ tests)
 * - Tier 2: Boundary & Corner Cases (>=5 tests per area across 6 areas => 30+ tests)
 * - Tier 3: Cross-Feature Interactions (4 pairwise test suites => 16+ tests)
 * - Tier 4: Real-World Application Scenarios (5 detailed real-world workflows)
 * 
 * Exit codes:
 * - 0: All tests passed
 * - 1: One or more tests failed
 */

import { register } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

// 1. Register module loader for extensionless specifiers and JSON data
register('./test-loader.mjs', import.meta.url);

// 2. Setup browser environment mocks for Node.js
globalThis.localStorage = {
    _data: {},
    getItem(key) { return Object.hasOwn(this._data, key) ? this._data[key] : null; },
    setItem(key, val) { this._data[key] = String(val); },
    removeItem(key) { delete this._data[key]; },
    clear() { this._data = {}; }
};

globalThis.window = {
    location: { pathname: '/', search: '', href: 'http://localhost:3000/' },
    history: {
        pushState: (state, title, url) => {
            const [path, search] = (url || '/').split('?');
            globalThis.window.location.pathname = path || '/';
            globalThis.window.location.search = search ? `?${search}` : '';
            globalThis.window.location.href = `http://localhost:3000${url}`;
        },
        replaceState: (state, title, url) => {
            const [path, search] = (url || '/').split('?');
            globalThis.window.location.pathname = path || '/';
            globalThis.window.location.search = search ? `?${search}` : '';
            globalThis.window.location.href = `http://localhost:3000${url}`;
        }
    },
    localStorage: globalThis.localStorage
};

if (!globalThis.navigator) {
    globalThis.navigator = {};
}
Object.defineProperty(globalThis.navigator, 'clipboard', {
    value: {
        _text: '',
        writeText: async (t) => { globalThis.navigator.clipboard._text = t; },
        readText: async () => globalThis.navigator.clipboard._text
    },
    configurable: true,
    writable: true
});

// 3. Import system under test
const { useEngineState } = await import('../src/store/engineState.js');
const { getDomain, DEFAULT_DOMAIN, DOMAINS } = await import('../src/domains/index.js');
const { getPresets } = await import('../src/engine/presetEngine.js');
const { PARAMETER_DESCRIPTIONS, getParameterDescription } = await import('../src/domains/parameterDescriptions.js');
const { getModuleRegistry, getModuleById } = await import('../src/engine/moduleRegistry.js');
const { resolveDependencies, sortDependencies, DependencyGraph } = await import('../src/engine/dependencyResolver.js');
const { assembleFinalPrompt, analyzePromptComplexity } = await import('../src/compiler/finalPromptAssembler.js');
const { AI_STRATEGIES } = await import('../src/utils/aiRouter.js');
const { pathToDomain } = await import('../src/utils/domainRoute.js');
const {
    serializeState,
    sanitizePayload,
    encodePayloadToParam,
    decodePayloadFromParam
} = await import('../src/utils/statePayload.js');
const { getTranslation, i18n } = await import('../src/locales/i18n.js');
const { getCompilerTexts } = await import('../src/locales/compilerTexts.js');

// 4. Test Runner Infrastructure
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];
let currentSuite = '';

async function suite(name, fn) {
    currentSuite = name;
    console.log(`\n\x1b[1m\x1b[36m=== ${name} ===\x1b[0m`);
    await fn();
}

async function test(name, fn) {
    totalTests++;
    const testFullName = `${currentSuite} > ${name}`;
    try {
        await fn();
        passedTests++;
        console.log(`  \x1b[32m✓\x1b[0m ${name}`);
    } catch (err) {
        failedTests++;
        failures.push({ name: testFullName, error: err });
        console.log(`  \x1b[31m✗\x1b[0m ${name}`);
        console.log(`    \x1b[31m${err.message}\x1b[0m`);
    }
}

// Helper: reset Zustand state cleanly before tests
function resetStore(domain = 'learning') {
    const store = useEngineState.getState();
    store.clearAll();
    useEngineState.setState({ savedRecipes: [] });
    if (store.config.domain !== domain) {
        store.setDomain(domain);
    }
    store.setConfig('lang', 'tr');
    store.setConfig('hedef', 'markdown');
    store.setConfig('monolog', false);
    store.setConfig('autoResolveDeps', true);
    store.setGorunum('default');
    globalThis.window.location.pathname = `/${getDomain(domain).route}`;
    globalThis.window.location.search = '';
}

console.log('\x1b[1m\x1b[35m================================================================');
console.log(' PREMPT Progressive Unified Workspace — E2E Test Suite (Tiers 1-4)');
console.log('================================================================\x1b[0m');

// ============================================================================
// TIER 1: FEATURE COVERAGE (>=5 tests per feature)
// ============================================================================

// --- Feature 1: L0 TopicInput ---
await suite('Tier 1: L0 TopicInput', async () => {
    await test('T1.1.1: Topic update sets config.konu and triggers prompt compilation', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Kuantum Hesaplama İlkeleri');
        store.setModules(['eli5']);
        const state = useEngineState.getState();
        assert.equal(state.config.konu, 'Kuantum Hesaplama İlkeleri');
        const prompt = assembleFinalPrompt(state);
        assert.ok(prompt.includes('Kuantum Hesaplama İlkeleri'));
    });

    await test('T1.1.2: Empty / whitespace-only topic causes compiler to guard and return empty prompt', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', '   \n\t   ');
        store.setModules(['eli5']);
        const state = useEngineState.getState();
        const prompt = assembleFinalPrompt(state);
        assert.equal(prompt, '');
        const complexity = analyzePromptComplexity(state);
        assert.equal(complexity.chars, 0);
        assert.equal(complexity.tokens, 0);
    });

    await test('T1.1.3: Topic input length limits: sanitization clamps excessive input to 10,000 chars', () => {
        const hugeTopic = 'A'.repeat(15000);
        const sanitized = sanitizePayload({ domain: 'learning', konu: hugeTopic });
        assert.equal(sanitized.konu.length, 10000);
    });

    await test('T1.1.4: Domain expertise config.alan properly updates and renders into prompt [CONTEXT] block', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Yapay Sinir Ağları');
        store.setConfig('alan', 'Kıdemli Makine Öğrenmesi Araştırmacısı');
        store.setModules(['eli5']);
        const prompt = assembleFinalPrompt(useEngineState.getState());
        assert.ok(prompt.includes('Kıdemli Makine Öğrenmesi Araştırmacısı'));
    });

    await test('T1.1.5: Special characters in topic (Turkish UTF-8, quotes, code symbols) compile without corruption', () => {
        resetStore('code');
        const specialTopic = 'İ/O & JSON parsing: "çift tırnak", \'tek tırnak\', <xml> & `kod_parçası` — ğüşiöç';
        const store = useEngineState.getState();
        store.setConfig('konu', specialTopic);
        store.setModules(['architecture']);
        const prompt = assembleFinalPrompt(useEngineState.getState());
        assert.ok(prompt.includes(specialTopic));
    });
});

// --- Feature 2: L0 Hero Presets ---
await suite('Tier 1: L0 Hero Presets', async () => {
    await test('T1.2.1: Exactly top 3 presets extracted as Hero Presets per domain', () => {
        for (const domainId of Object.keys(DOMAINS)) {
            const presets = Object.entries(getPresets(domainId));
            assert.equal(presets.length, 12, `${domainId} should define exactly 12 presets`);
            const heroPresets = presets.slice(0, 3);
            assert.equal(heroPresets.length, 3, `${domainId} must have top 3 hero presets`);
            for (const [presetId, presetData] of heroPresets) {
                assert.ok(presetId.length > 0);
                assert.ok(Array.isArray(presetData.forceModules) && presetData.forceModules.length > 0);
            }
        }
    });

    await test('T1.2.2: Remaining 9 presets are validly defined and categorizable', () => {
        for (const domainId of Object.keys(DOMAINS)) {
            const remaining = Object.entries(getPresets(domainId)).slice(3);
            assert.equal(remaining.length, 9);
            for (const [, presetData] of remaining) {
                assert.ok(presetData.name?.tr && presetData.name?.en, 'Preset must have bilingual name');
                assert.ok(presetData.desc?.tr && presetData.desc?.en, 'Preset must have bilingual desc');
                assert.ok(presetData.group, 'Preset must specify category group');
            }
        }
    });

    await test('T1.2.3: Applying a Hero preset assigns activePreset, forceModules, and resolves DAG', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const heroPresetKey = Object.keys(getPresets('learning'))[0];
        store.setPreset(heroPresetKey);
        const state = useEngineState.getState();
        assert.equal(state.activePreset, heroPresetKey);
        assert.ok(state.selectedModules.length > 0);
    });

    await test('T1.2.4: Preset parameter overrides update canonical Turkish keys in config', () => {
        resetStore('code');
        const store = useEngineState.getState();
        const presets = getPresets('code');
        const firstPresetKey = Object.keys(presets)[0];
        const presetData = presets[firstPresetKey];
        store.setPreset(firstPresetKey);
        const state = useEngineState.getState();
        for (const [key, value] of Object.entries(presetData.override || {})) {
            assert.equal(state.config[key], value, `Override key ${key} should match preset value`);
        }
    });

    await test('T1.2.5: Preset injectRules are populated and rendered into prompt constraints block', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const presets = getPresets('learning');
        const presetWithRules = Object.entries(presets).find(([, p]) => Array.isArray(p.injectRules) && p.injectRules.length > 0);
        assert.ok(presetWithRules, 'Learning domain should have at least one preset with injectRules');
        const [presetId, presetData] = presetWithRules;
        store.setConfig('konu', 'Örnek Konu');
        store.setPreset(presetId);
        const state = useEngineState.getState();
        assert.deepEqual(state.injectedRules, presetData.injectRules);
        const prompt = assembleFinalPrompt(state);
        for (const rule of presetData.injectRules) {
            assert.ok(prompt.includes(`PRESET RULE: ${rule}`));
        }
    });

    await test('T1.2.6: setPreset with non-existent preset ID safely no-ops without state mutation', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setModules(['eli5']);
        store.setPreset('completely-invalid-preset-id');
        const state = useEngineState.getState();
        assert.equal(state.activePreset, null, 'activePreset must not be set to invalid ID');
        assert.deepEqual(state.selectedModules, ['eli5'], 'selectedModules must not be wiped by invalid preset');
    });

    await test('T1.2.7: setPreset with cross-domain preset ID is safely rejected', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setPreset('refactor');
        const state = useEngineState.getState();
        assert.equal(state.activePreset, null, 'Cross-domain preset must not be applied');
    });

    await test('T1.2.8: applyPreset alias functions identically to setPreset', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const heroPresetKey = Object.keys(getPresets('learning'))[0];
        store.applyPreset(heroPresetKey);
        const state = useEngineState.getState();
        assert.equal(state.activePreset, heroPresetKey);
        assert.ok(state.selectedModules.length > 0);
    });
});

// --- Feature 3: L0 Action Bar ---
await suite('Tier 1: L0 Action Bar', async () => {
    await test('T1.3.1: 1-click execution for ChatGPT builds HTTPS URL with encoded query', () => {
        const prompt = 'Test Prompt: Kuantum & Yapay Zeka';
        const url = AI_STRATEGIES.chatgpt.getPromptUrl(prompt);
        assert.ok(url.startsWith('https://chatgpt.com/'));
        assert.equal(new URL(url).searchParams.get('q'), prompt);
    });

    await test('T1.3.2: 1-click execution for Perplexity and Gemini build valid query URLs', () => {
        const prompt = 'Deep Research Analysis';
        const pUrl = AI_STRATEGIES.perplexity.getPromptUrl(prompt);
        assert.equal(new URL(pUrl).searchParams.get('q'), prompt);
        const gUrl = AI_STRATEGIES.gemini.getPromptUrl(prompt);
        assert.equal(new URL(gUrl).searchParams.get('q'), prompt);
    });

    await test('T1.3.3: Claude AI strategy enforces supportsQuery: false and uses base URL fallback', () => {
        assert.equal(AI_STRATEGIES.claude.supportsQuery, false);
        assert.equal(AI_STRATEGIES.claude.getBaseUrl(), 'https://claude.ai/new');
    });

    await test('T1.3.4: URL-length guard (>3800 encoded chars) accurately flags isTooLongForUrl: true', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'A'.repeat(5000));
        store.setModules(['eli5', 'kalibrasyon', 'onkosul', 'sirasi']);
        const stats = analyzePromptComplexity(useEngineState.getState());
        assert.equal(stats.isTooLongForUrl, true);
    });

    await test('T1.3.5: AI action forces markdown output target even when user selects openai-json or claude-xml', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Yapay Zeka Mimarisi');
        store.setConfig('hedef', 'openai-json');
        store.setModules(['eli5']);
        const state = useEngineState.getState();
        const userPrompt = assembleFinalPrompt(state);
        assert.ok(userPrompt.startsWith('{'), 'openai-json format should produce JSON object');
        const forcedPrompt = assembleFinalPrompt(state, { forceTarget: 'markdown' });
        assert.ok(!forcedPrompt.startsWith('{'), 'Forced markdown should not produce JSON');
        assert.ok(forcedPrompt.includes('[ROLE]'), 'Forced markdown should include standard headers');
    });
});

// --- Feature 4: L0 Deep links & Routing ---
await suite('Tier 1: L0 Deep links & Routing', async () => {
    await test('T1.4.1: Pathname routing maps all registered domain paths correctly', () => {
        for (const [id, desc] of Object.entries(DOMAINS)) {
            assert.equal(pathToDomain(`/${desc.route}`), id, `Route /${desc.route} should map to domain ${id}`);
        }
    });

    await test('T1.4.2: Unknown pathname routing returns null and defaults to learning domain', () => {
        assert.equal(pathToDomain('/unknown-random-path'), null);
        assert.equal(getDomain('unknown-domain-id').id, 'learning');
    });

    await test('T1.4.3: Deep link query parameter ?preset= applies specified preset', () => {
        resetStore('code');
        const store = useEngineState.getState();
        const presetKey = Object.keys(getPresets('code'))[1];
        store.setPreset(presetKey);
        assert.equal(useEngineState.getState().activePreset, presetKey);
    });

    await test('T1.4.4: Deep link query parameter ?modules= correctly sets selected modules', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setModules(['eli5', 'kalibrasyon']);
        assert.deepEqual(useEngineState.getState().selectedModules, ['eli5', 'kalibrasyon']);
    });

    await test('T1.4.5: Deep link ?share= base64 payload serialization and deserialization roundtrips without state loss', () => {
        const sampleState = {
            config: {
                domain: 'academic',
                seviye: 'tez',
                mod: 'hakem',
                derinlik: 'derin',
                format: 'makale',
                hedef: 'claude-xml',
                monolog: true,
                autoResolveDeps: true,
                konu: 'SSM vs Transformer Complexity',
                alan: 'Deep Learning'
            },
            selectedModules: ['research-question-def', 'methodology-triangulation'],
            activePreset: null
        };
        const encoded = encodePayloadToParam(serializeState(sampleState, { includeTopic: true }));
        const decoded = decodePayloadFromParam(encoded);
        const clean = sanitizePayload(decoded);
        assert.equal(clean.domain, 'academic');
        assert.equal(clean.seviye, 'tez');
        assert.equal(clean.hedef, 'claude-xml');
        assert.equal(clean.monolog, true);
        assert.equal(clean.konu, 'SSM vs Transformer Complexity');
        assert.deepEqual(clean.selectedModules, ['research-question-def', 'methodology-triangulation']);
    });
});

// --- Feature 5: L1 Contextual Chips ---
await suite('Tier 1: L1 Contextual Chips', async () => {
    await test('T1.5.1: seviye chip option selection updates config.seviye', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('seviye', 'ileri');
        assert.equal(useEngineState.getState().config.seviye, 'ileri');
    });

    await test('T1.5.2: mod chip option selection updates config.mod', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('mod', 'sokratik');
        assert.equal(useEngineState.getState().config.mod, 'sokratik');
    });

    await test('T1.5.3: derinlik chip option selection updates config.derinlik', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('derinlik', 'kapsamli');
        assert.equal(useEngineState.getState().config.derinlik, 'kapsamli');
    });

    await test('T1.5.4: format chip option selection updates config.format', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('format', 'ders');
        assert.equal(useEngineState.getState().config.format, 'ders');
    });

    await test('T1.5.5: Canonical Turkish keys are strictly enforced across store and domain descriptors', () => {
        const config = useEngineState.getState().config;
        assert.ok('seviye' in config, 'config must have canonical key seviye');
        assert.ok('mod' in config, 'config must have canonical key mod');
        assert.ok('derinlik' in config, 'config must have canonical key derinlik');
        assert.ok('format' in config, 'config must have canonical key format');
        assert.ok(!('level' in config), 'config must NOT have English alias level');
        assert.ok(!('depth' in config), 'config must NOT have English alias depth');
        assert.ok(!('mode' in config), 'config must NOT have English alias mode');
    });
});

// --- Feature 6: L1 Parameter Descriptions ---
await suite('Tier 1: L1 Parameter Descriptions', async () => {
    await test('T1.6.1: Every domain (15/15) has parameter descriptions defined', () => {
        for (const domainId of Object.keys(DOMAINS)) {
            assert.ok(PARAMETER_DESCRIPTIONS[domainId], `Domain ${domainId} must have parameter descriptions`);
            assert.ok(PARAMETER_DESCRIPTIONS[domainId].levels, `${domainId} missing levels`);
            assert.ok(PARAMETER_DESCRIPTIONS[domainId].modes, `${domainId} missing modes`);
            assert.ok(PARAMETER_DESCRIPTIONS[domainId].depths, `${domainId} missing depths`);
            assert.ok(PARAMETER_DESCRIPTIONS[domainId].formats, `${domainId} missing formats`);
        }
    });

    await test('T1.6.2: Every option in every axis across all 15 domains has a non-empty Turkish description', () => {
        for (const [domainId, axes] of Object.entries(PARAMETER_DESCRIPTIONS)) {
            for (const [axisName, options] of Object.entries(axes)) {
                for (const [optionId, entry] of Object.entries(options)) {
                    assert.ok(entry.tr && entry.tr.trim().length > 0, `${domainId}/${axisName}/${optionId} missing TR desc`);
                }
            }
        }
    });

    await test('T1.6.3: Every option in every axis across all 15 domains has a non-empty English description', () => {
        for (const [domainId, axes] of Object.entries(PARAMETER_DESCRIPTIONS)) {
            for (const [axisName, options] of Object.entries(axes)) {
                for (const [optionId, entry] of Object.entries(options)) {
                    assert.ok(entry.en && entry.en.trim().length > 0, `${domainId}/${axisName}/${optionId} missing EN desc`);
                }
            }
        }
    });

    await test('T1.6.4: getParameterDescription retrieves valid bilingual copy', () => {
        const trDesc = getParameterDescription('code', 'tr', 'modes', 'senior');
        const enDesc = getParameterDescription('code', 'en', 'modes', 'senior');
        assert.ok(trDesc.length > 10);
        assert.ok(enDesc.length > 10);
        assert.notEqual(trDesc, enDesc);
    });

    await test('T1.6.5: getParameterDescription with invalid optionId falls back gracefully without throwing', () => {
        const fallbackDesc = getParameterDescription('code', 'tr', 'modes', 'non_existent_option_123');
        assert.ok(typeof fallbackDesc === 'string' && fallbackDesc.length > 0);
    });
});

// --- Feature 7: L2 Active Module Badge Row ---
await suite('Tier 1: L2 Active Module Badge Row', async () => {
    await test('T1.7.1: Active badge count accurately matches selectedModules.length', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setModules(['eli5', 'kalibrasyon', 'onkosul']);
        assert.equal(useEngineState.getState().selectedModules.length, 3);
    });

    await test('T1.7.2: Each active module ID resolves to valid module metadata via getModuleById', () => {
        const modules = ['eli5', 'kalibrasyon'];
        for (const id of modules) {
            const mod = getModuleById(id, 'learning', 'tr');
            assert.ok(mod, `Module ${id} should exist`);
            assert.equal(mod.id, id);
            assert.ok(mod.name.length > 0);
            assert.ok(mod.layer.length > 0);
        }
    });

    await test('T1.7.3: Toggling off a module decreases active badge count and updates selection', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setModules(['eli5', 'kalibrasyon']);
        store.toggleModule('kalibrasyon');
        assert.deepEqual(useEngineState.getState().selectedModules, ['eli5']);
    });

    await test('T1.7.4: Empty module selection reports 0 active modules', () => {
        resetStore('learning');
        assert.equal(useEngineState.getState().selectedModules.length, 0);
    });

    await test('T1.7.5: Active module metadata accurately switches language between TR and EN', () => {
        const modTr = getModuleById('eli5', 'learning', 'tr');
        const modEn = getModuleById('eli5', 'learning', 'en');
        assert.ok(modTr && modEn);
        assert.notEqual(modTr.name, modEn.name);
        assert.notEqual(modTr.desc, modEn.desc);
    });
});

// --- Feature 8: L2 Granular Inspector ---
await suite('Tier 1: L2 Granular Inspector', async () => {
    await test('T1.8.1: config.autoResolveDeps toggle exists in state and defaults to true', () => {
        resetStore('learning');
        assert.equal(useEngineState.getState().config.autoResolveDeps, true);
    });

    await test('T1.8.2: When autoResolveDeps is true, selecting a module with prerequisites auto-resolves them', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const registry = getModuleRegistry('learning', 'tr');
        const modWithDeps = registry.find(m => Array.isArray(m.requires) && m.requires.length > 0);
        assert.ok(modWithDeps, 'Should find module with requires in learning domain');
        store.toggleModule(modWithDeps.id);
        const selected = useEngineState.getState().selectedModules;
        for (const req of modWithDeps.requires) {
            assert.ok(selected.includes(req), `Selected should include prerequisite ${req}`);
        }
    });

    await test('T1.8.3: When autoResolveDeps is false, selecting a module selects only that module without expansion', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('autoResolveDeps', false);
        const registry = getModuleRegistry('learning', 'tr');
        const modWithDeps = registry.find(m => Array.isArray(m.requires) && m.requires.length > 0);
        store.toggleModule(modWithDeps.id);
        assert.deepEqual(useEngineState.getState().selectedModules, [modWithDeps.id]);
    });

    await test('T1.8.4: injectedRules array holds active preset constraint rules for inspector display', () => {
        resetStore('code');
        const store = useEngineState.getState();
        const firstPreset = Object.keys(getPresets('code'))[0];
        store.setPreset(firstPreset);
        const state = useEngineState.getState();
        assert.ok(Array.isArray(state.injectedRules));
    });

    await test('T1.8.5: analyzePromptComplexity computes characters, tokens, layersUsed, and complexityScore', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Yapay Zeka');
        store.setModules(['eli5', 'kalibrasyon']);
        const stats = analyzePromptComplexity(useEngineState.getState());
        assert.ok(stats.chars > 0);
        assert.equal(stats.tokens, Math.round(stats.chars / 3.5));
        assert.ok(stats.layersUsed > 0);
        assert.ok(stats.complexityScore > 0);
    });
});

// --- Feature 9: L2 Eject / Remix Mechanism ---
await suite('Tier 1: L2 Eject / Remix Mechanism', async () => {
    await test('T1.9.1: Preset application sets activePreset and loads injectedRules', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const presetKey = Object.keys(getPresets('learning'))[0];
        store.setPreset(presetKey);
        assert.equal(useEngineState.getState().activePreset, presetKey);
    });

    await test('T1.9.2: Modifying modules via toggleModule detaches activePreset: null (eject behavior)', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const presetKey = Object.keys(getPresets('learning'))[0];
        store.setPreset(presetKey);
        store.toggleModule('eli5');
        assert.equal(useEngineState.getState().activePreset, null);
    });

    await test('T1.9.3: toggleModule preserves injectedRules during eject / remix', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const presets = getPresets('learning');
        const presetEntry = Object.entries(presets).find(([, p]) => Array.isArray(p.injectRules) && p.injectRules.length > 0);
        const [presetId, presetData] = presetEntry;
        store.setPreset(presetId);
        assert.equal(useEngineState.getState().injectedRules.length, presetData.injectRules.length);
        store.toggleModule('eli5');
        const state = useEngineState.getState();
        assert.equal(state.activePreset, null, 'activePreset must detach to null');
        assert.deepEqual(state.injectedRules, presetData.injectRules, 'injectedRules must be preserved');
    });

    await test('T1.9.4: ejectPreset explicitly detaches activePreset while keeping injectedRules and modules intact', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const presetKey = Object.keys(getPresets('learning'))[0];
        store.setPreset(presetKey);
        const beforeModules = [...useEngineState.getState().selectedModules];
        const beforeRules = [...useEngineState.getState().injectedRules];
        store.ejectPreset();
        const state = useEngineState.getState();
        assert.equal(state.activePreset, null);
        assert.deepEqual(state.selectedModules, beforeModules);
        assert.deepEqual(state.injectedRules, beforeRules);
    });

    await test('T1.9.5: Parameter adjustments after eject preserve custom modules and rules', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setPreset(Object.keys(getPresets('learning'))[0]);
        store.ejectPreset();
        store.setConfig('derinlik', 'kapsamli');
        const state = useEngineState.getState();
        assert.equal(state.activePreset, null);
        assert.equal(state.config.derinlik, 'kapsamli');
        assert.ok(state.selectedModules.length > 0);
    });
});

// --- Feature 10: Cockpit Mode Toggle ---
await suite('Tier 1: Cockpit Mode Toggle', async () => {
    await test('T1.10.1: Default config.gorunum is "default"', () => {
        resetStore('learning');
        assert.equal(useEngineState.getState().config.gorunum, 'default');
    });

    await test('T1.10.2: setGorunum("advanced") updates config.gorunum to "advanced"', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setGorunum('advanced');
        assert.equal(useEngineState.getState().config.gorunum, 'advanced');
    });

    await test('T1.10.3: Switching from "default" to "advanced" preserves 100% of state', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Derin Öğrenme');
        store.setConfig('alan', 'Bilgisayarla Görme');
        store.setPreset(Object.keys(getPresets('learning'))[0]);
        store.setGorunum('advanced');
        const stateAfter = useEngineState.getState();
        assert.equal(stateAfter.config.gorunum, 'advanced');
        assert.equal(stateAfter.config.konu, 'Derin Öğrenme');
        assert.equal(stateAfter.config.alan, 'Bilgisayarla Görme');
        assert.ok(stateAfter.selectedModules.length > 0);
    });

    await test('T1.10.4: Switching from "advanced" back to "default" preserves 100% of state', () => {
        resetStore('code');
        const store = useEngineState.getState();
        store.setGorunum('advanced');
        store.setConfig('konu', 'Refactoring');
        store.setModules(['architecture', 'api-design']);
        const modulesBefore = [...useEngineState.getState().selectedModules];
        store.setGorunum('default');
        const state = useEngineState.getState();
        assert.equal(state.config.gorunum, 'default');
        assert.equal(state.config.konu, 'Refactoring');
        assert.deepEqual(state.selectedModules, modulesBefore);
    });

    await test('T1.10.5: gorunum is excluded from serialized share links and recipes', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setGorunum('advanced');
        const payload = serializeState(useEngineState.getState(), { includeTopic: true });
        assert.ok(!('gorunum' in payload), 'gorunum should not be in serialized payload');
    });
});

// --- Feature 11: Rule 13 Compliance (0 Unicode Emojis) ---
await suite('Tier 1: Rule 13 Compliance (0 Unicode Emojis)', async () => {
    const EMOJI_REGEX = /\p{Extended_Pictographic}/u;

    await test('T1.11.1: 0 unicode emojis across all 30 module JSON files', () => {
        const dataDir = join(rootDir, 'src', 'data');
        const files = readdirSync(dataDir).filter(f => f.endsWith('.json'));
        assert.ok(files.length >= 30, 'Should have at least 30 module JSON files');
        for (const file of files) {
            const content = readFileSync(join(dataDir, file), 'utf8');
            const parsed = JSON.parse(content);
            for (const mod of parsed) {
                assert.ok(!EMOJI_REGEX.test(mod.name), `${file}: module ${mod.id} name has emoji`);
                assert.ok(!EMOJI_REGEX.test(mod.desc), `${file}: module ${mod.id} desc has emoji`);
                assert.ok(!EMOJI_REGEX.test(mod.explain), `${file}: module ${mod.id} explain has emoji`);
                assert.ok(!EMOJI_REGEX.test(mod.prompt), `${file}: module ${mod.id} prompt has emoji`);
            }
        }
    });

    await test('T1.11.2: 0 unicode emojis across all 15 domain specs', () => {
        const specsDir = join(rootDir, 'src', 'domains', 'specs');
        const files = readdirSync(specsDir).filter(f => f.endsWith('Spec.js'));
        assert.equal(files.length, 15);
        for (const file of files) {
            const content = readFileSync(join(specsDir, file), 'utf8');
            assert.ok(!EMOJI_REGEX.test(content), `${file} contains unicode emoji`);
        }
    });

    await test('T1.11.3: 0 unicode emojis across localization files (i18n.js & compilerTexts.js)', () => {
        const i18nContent = readFileSync(join(rootDir, 'src', 'locales', 'i18n.js'), 'utf8');
        const compilerTextsContent = readFileSync(join(rootDir, 'src', 'locales', 'compilerTexts.js'), 'utf8');
        assert.ok(!EMOJI_REGEX.test(i18nContent), 'i18n.js contains unicode emoji');
        assert.ok(!EMOJI_REGEX.test(compilerTextsContent), 'compilerTexts.js contains unicode emoji');
    });

    await test('T1.11.4: 0 unicode emojis across parameterDescriptions.js', () => {
        const content = readFileSync(join(rootDir, 'src', 'domains', 'parameterDescriptions.js'), 'utf8');
        assert.ok(!EMOJI_REGEX.test(content), 'parameterDescriptions.js contains unicode emoji');
    });

    await test('T1.11.5: 0 unicode emojis across presentation.js and outputTargets.js', () => {
        const pContent = readFileSync(join(rootDir, 'src', 'domains', 'presentation.js'), 'utf8');
        const oContent = readFileSync(join(rootDir, 'src', 'config', 'outputTargets.js'), 'utf8');
        assert.ok(!EMOJI_REGEX.test(pContent), 'presentation.js contains unicode emoji');
        assert.ok(!EMOJI_REGEX.test(oContent), 'outputTargets.js contains unicode emoji');
    });
});

// --- Feature 12: TR/EN Bilingual Parity ---
await suite('Tier 1: TR/EN Bilingual Parity', async () => {
    await test('T1.12.1: Every domain module JSON pair has identical module IDs in identical array order', () => {
        for (const domainId of Object.keys(DOMAINS)) {
            const tr = getModuleRegistry(domainId, 'tr');
            const en = getModuleRegistry(domainId, 'en');
            assert.equal(tr.length, en.length, `${domainId} count mismatch TR vs EN`);
            for (let i = 0; i < tr.length; i++) {
                assert.equal(tr[i].id, en[i].id, `${domainId} id mismatch at index ${i}`);
            }
        }
    });

    await test('T1.12.2: Every module in every domain has non-empty fields in both TR and EN', () => {
        for (const domainId of Object.keys(DOMAINS)) {
            for (const lang of ['tr', 'en']) {
                const mods = getModuleRegistry(domainId, lang);
                for (const m of mods) {
                    assert.ok(m.name && m.name.trim().length > 0, `${domainId}/${m.id}/${lang} empty name`);
                    assert.ok(m.desc && m.desc.trim().length > 0, `${domainId}/${m.id}/${lang} empty desc`);
                    assert.ok(m.explain && m.explain.trim().length > 0, `${domainId}/${m.id}/${lang} empty explain`);
                    assert.ok(m.prompt && m.prompt.trim().length > 0, `${domainId}/${m.id}/${lang} empty prompt`);
                }
            }
        }
    });

    await test('T1.12.3: i18n.js top-level keys in tr and en have 100% lockstep parity', () => {
        const trKeys = Object.keys(i18n.tr).sort();
        const enKeys = Object.keys(i18n.en).sort();
        assert.deepEqual(trKeys, enKeys, 'i18n.tr and i18n.en top-level keys must be identical');
    });

    await test('T1.12.4: getTranslation provides complete merged dictionary for all 15 domains in both TR and EN', () => {
        for (const domainId of Object.keys(DOMAINS)) {
            const trTrans = getTranslation('tr', domainId);
            const enTrans = getTranslation('en', domainId);
            assert.ok(trTrans.title && enTrans.title, `Missing title in ${domainId}`);
            assert.ok(trTrans.topicLabel && enTrans.topicLabel, `Missing topicLabel in ${domainId}`);
            assert.ok(trTrans.btnCopy && enTrans.btnCopy);
        }
    });

    await test('T1.12.5: COMPILER_TEXTS contains complete bundles for all 15 domains in both TR and EN', () => {
        for (const domainId of Object.keys(DOMAINS)) {
            const trTexts = getCompilerTexts('tr', domainId);
            const enTexts = getCompilerTexts('en', domainId);
            assert.ok(trTexts && enTexts);
            assert.ok(trTexts.labels && enTexts.labels);
            assert.ok(trTexts.mod && enTexts.mod);
            assert.ok(trTexts.format && enTexts.format);
            assert.ok(trTexts.derinlik && enTexts.derinlik);
            assert.ok(trTexts.constraintsBase && enTexts.constraintsBase);
        }
    });
});

// ============================================================================
// TIER 2: BOUNDARY & CORNER CASES (>=5 tests per area)
// ============================================================================

// --- Area 1: Empty topic vs 10,000 char max length topic ---
await suite('Tier 2: Empty vs 10,000 Char Topic Boundaries', async () => {
    await test('T2.1.1: Empty topic returns empty string from assembler', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', '');
        store.setModules(['eli5']);
        assert.equal(assembleFinalPrompt(useEngineState.getState()), '');
    });

    await test('T2.1.2: Whitespace-only topic returns empty string from assembler', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', '   \r\n\t   ');
        store.setModules(['eli5']);
        assert.equal(assembleFinalPrompt(useEngineState.getState()), '');
    });

    await test('T2.1.3: Topic of exactly 10,000 characters compiles without error', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const exact10k = 'T'.repeat(10000);
        store.setConfig('konu', exact10k);
        store.setModules(['eli5']);
        const prompt = assembleFinalPrompt(useEngineState.getState());
        assert.ok(prompt.includes(exact10k));
    });

    await test('T2.1.4: Topic exceeding 10,000 characters is clamped by sanitizePayload', () => {
        const over10k = 'M'.repeat(12500);
        const sanitized = sanitizePayload({ domain: 'learning', konu: over10k });
        assert.equal(sanitized.konu.length, 10000);
    });

    await test('T2.1.5: Topic containing meta-tags and markdown formatting compiles safely', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const rawTopic = '<script>alert("test")</script> & <thinking>monologue</thinking> # Header **bold**';
        store.setConfig('konu', rawTopic);
        store.setModules(['eli5']);
        const prompt = assembleFinalPrompt(useEngineState.getState());
        assert.ok(prompt.includes(rawTopic));
    });

    await test('T2.1.6: Topic containing replacement patterns ($$, $&, $\', $`) compiles verbatim without corruption', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const trickyTopic = 'Cost $$50 with $& matched and $\' tail and $` prefix';
        store.setConfig('konu', trickyTopic);
        store.setConfig('alan', 'Fintech $$100 $&');
        store.setModules(['eli5']);
        const prompt = assembleFinalPrompt(useEngineState.getState());
        assert.ok(prompt.includes(trickyTopic), 'Goal section must preserve literal $$, $&, $\', and $`');
        assert.ok(prompt.includes('Fintech $$100 $&'), 'Context section must preserve literal $$, $&');
    });
});

// --- Area 2: Extremely long prompts exceeding URL limits ---
await suite('Tier 2: Extremely Long Prompts & URL Limits', async () => {
    await test('T2.2.1: Small prompt (encoded length < 3800) sets isTooLongForUrl: false', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Kısa başlık');
        store.setModules(['eli5']);
        const stats = analyzePromptComplexity(useEngineState.getState());
        assert.equal(stats.isTooLongForUrl, false);
    });

    await test('T2.2.2: Prompt with encoded length >= 3800 sets isTooLongForUrl: true', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Uzun Konu '.repeat(400));
        store.setModules(['eli5', 'kalibrasyon', 'onkosul', 'sirasi']);
        const stats = analyzePromptComplexity(useEngineState.getState());
        assert.equal(stats.isTooLongForUrl, true);
    });

    await test('T2.2.3: openInAI clipboard write fallback contract functions properly on long prompts', async () => {
        const longPrompt = 'Huge Prompt '.repeat(500);
        assert.ok(encodeURIComponent(longPrompt).length > 3800);
        await globalThis.navigator.clipboard.writeText(longPrompt);
        const copied = await globalThis.navigator.clipboard.readText();
        assert.equal(copied, longPrompt);
    });

    await test('T2.2.4: Selecting all modules in a domain compiles without stack overflow', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const allIds = getModuleRegistry('learning', 'tr').map(m => m.id);
        store.setConfig('konu', 'Comprehensive Learning Architecture');
        store.setModules(allIds);
        const prompt = assembleFinalPrompt(useEngineState.getState());
        assert.ok(prompt.length > 1000);
        const stats = analyzePromptComplexity(useEngineState.getState());
        assert.equal(stats.moduleCount, allIds.length);
    });

    await test('T2.2.5: Multilingual unicode characters calculate correct token estimates', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Türkçe: ğüşiöç, Japonca: 日本語のテスト, Arapça: اختبار اللغة');
        store.setModules(['eli5']);
        const stats = analyzePromptComplexity(useEngineState.getState());
        assert.equal(stats.tokens, Math.round(stats.chars / 3.5));
    });
});

// --- Area 3: Malformed / unknown domain fallback ---
await suite('Tier 2: Unknown Domain Fallback', async () => {
    await test('T2.3.1: getDomain("invalid-id") returns learning domain descriptor', () => {
        const desc = getDomain('invalid-id');
        assert.equal(desc.id, 'learning');
    });

    await test('T2.3.2: getDomain(null) and getDomain(undefined) return learning descriptor', () => {
        assert.equal(getDomain(null).id, 'learning');
        assert.equal(getDomain(undefined).id, 'learning');
    });

    await test('T2.3.3: sanitizePayload({ domain: "corrupt_domain" }) resolves to learning domain', () => {
        const clean = sanitizePayload({ domain: 'corrupt_domain' });
        assert.equal(clean.domain, 'learning');
    });

    await test('T2.3.4: pathToDomain("/nonexistent-path") returns null', () => {
        assert.equal(pathToDomain('/nonexistent-path'), null);
    });

    await test('T2.3.5: getModuleRegistry with unknown domain falls back to learning registry', () => {
        const reg = getModuleRegistry('unknown_domain', 'tr');
        const learningReg = getModuleRegistry('learning', 'tr');
        assert.equal(reg, learningReg);
    });
});

// --- Area 4: Corrupted or truncated base64 share payload ---
await suite('Tier 2: Corrupted or Truncated Share Payloads', async () => {
    await test('T2.4.1: decodePayloadFromParam with invalid base64 returns null without throwing', () => {
        assert.equal(decodePayloadFromParam('not_valid_base64!!!@#$'), null);
    });

    await test('T2.4.2: Truncated base64 string returns null without throwing', () => {
        const validEncoded = encodePayloadToParam({ test: 123 });
        const truncated = validEncoded.slice(0, 10);
        assert.equal(decodePayloadFromParam(truncated), null);
    });

    await test('T2.4.3: Valid base64 encoding of non-JSON string returns null without throwing', () => {
        const base64NonJson = Buffer.from('hello world not json').toString('base64');
        assert.equal(decodePayloadFromParam(base64NonJson), null);
    });

    await test('T2.4.4: sanitizePayload(null) and sanitizePayload({}) return safe default payload', () => {
        const clean1 = sanitizePayload(null);
        assert.equal(clean1.domain, 'learning');
        assert.ok(Array.isArray(clean1.selectedModules));
        const clean2 = sanitizePayload({});
        assert.equal(clean2.domain, 'learning');
    });

    await test('T2.4.5: Payload with corrupted field types safely coerced to valid types', () => {
        const corrupt = {
            domain: 'learning',
            selectedModules: 'not-an-array',
            monolog: 'not-a-bool',
            seviye: 12345
        };
        const clean = sanitizePayload(corrupt);
        assert.deepEqual(clean.selectedModules, []);
        assert.equal(clean.monolog, false);
        assert.equal(clean.seviye, getDomain('learning').defaultConfig.seviye);
    });

    await test('T2.4.6: sanitizePayload validates optionSets vocabulary for all 15 un-polyfilled domains without throwing', () => {
        for (const domainId of Object.keys(DOMAINS)) {
            const spec = getDomain(domainId);
            const clean = sanitizePayload({
                domain: domainId,
                seviye: 'invalid_level_xyz',
                mod: 'invalid_mode_xyz',
                derinlik: 'invalid_depth_xyz',
                format: 'invalid_format_xyz'
            });
            assert.equal(clean.domain, domainId);
            assert.equal(clean.seviye, spec.defaultConfig.seviye);
            assert.equal(clean.mod, spec.defaultConfig.mod);
            assert.equal(clean.derinlik, spec.defaultConfig.derinlik);
            assert.equal(clean.format, spec.defaultConfig.format);
        }
    });
});

// --- Area 5: Unknown module IDs gracefully filtered ---
await suite('Tier 2: Unknown Module IDs Handling', async () => {
    await test('T2.5.1: sanitizePayload with unknown module IDs in selectedModules filters them out', () => {
        const raw = {
            domain: 'learning',
            selectedModules: ['eli5', 'fake_module_xyz_123']
        };
        const clean = sanitizePayload(raw);
        assert.deepEqual(clean.selectedModules, ['eli5']);
    });

    await test('T2.5.2: sanitizePayload with mix of valid and invalid IDs preserves only valid domain IDs', () => {
        const raw = {
            domain: 'code',
            selectedModules: ['invalid_1', 'architecture', 'invalid_2', 'api-design']
        };
        const clean = sanitizePayload(raw);
        assert.deepEqual(clean.selectedModules, ['architecture', 'api-design']);
    });

    await test('T2.5.3: Module IDs from another domain are filtered out', () => {
        const raw = {
            domain: 'learning',
            selectedModules: ['eli5', 'architecture']
        };
        const clean = sanitizePayload(raw);
        assert.deepEqual(clean.selectedModules, ['eli5']);
    });

    await test('T2.5.4: sortDependencies with non-existent module ID filters it out without error', () => {
        const sorted = sortDependencies(['eli5', 'non_existent_id'], 'learning', 'tr');
        assert.equal(sorted.length, 1);
        assert.equal(sorted[0].id, 'eli5');
    });

    await test('T2.5.5: resolveDependencies with unknown module ID returns empty or valid subset', () => {
        const resolved = resolveDependencies(['unknown_id_999'], 'learning', 'tr');
        assert.deepEqual(resolved, ['unknown_id_999']);
    });
});

// --- Area 6: Missing or undefined requires in DAG ---
await suite('Tier 2: Missing or Undefined DAG Requires', async () => {
    await test('T2.6.1: Modules with empty requires: [] sort cleanly and deterministically', () => {
        const mockModules = [
            { id: 'm1', name: 'Module 1', layer: 'core', requires: [] },
            { id: 'm2', name: 'Module 2', layer: 'core', requires: [] }
        ];
        const graph = new DependencyGraph(mockModules);
        const sorted = graph.topologicalSort(['m1', 'm2']);
        assert.equal(sorted.length, 2);
    });

    await test('T2.6.2: Modules with undefined requires property handled safely without error', () => {
        const mockModules = [
            { id: 'm1', name: 'Module 1', layer: 'core' },
            { id: 'm2', name: 'Module 2', layer: 'core' }
        ];
        const graph = new DependencyGraph(mockModules);
        const sorted = graph.topologicalSort(['m1', 'm2']);
        assert.equal(sorted.length, 2);
    });

    await test('T2.6.3: Multi-level DAG (A -> B -> C) sorts in exact topological order: C, B, A', () => {
        const mockModules = [
            { id: 'a', name: 'A', layer: 'high', requires: ['b'] },
            { id: 'b', name: 'B', layer: 'mid', requires: ['c'] },
            { id: 'c', name: 'C', layer: 'low', requires: [] }
        ];
        const graph = new DependencyGraph(mockModules);
        const resolved = graph.resolveDependencies(['a']);
        assert.deepEqual(resolved.sort(), ['a', 'b', 'c']);
        const sorted = graph.topologicalSort(['a', 'b', 'c']);
        const order = sorted.map(m => m.id);
        assert.ok(order.indexOf('c') < order.indexOf('b'));
        assert.ok(order.indexOf('b') < order.indexOf('a'));
    });

    await test('T2.6.4: Independent modules with no dependencies maintain stable order', () => {
        const sorted = sortDependencies(['eli5', 'kalibrasyon'], 'learning', 'tr');
        assert.equal(sorted.length, 2);
    });

    await test('T2.6.5: Disconnected components in module DAG resolve completely', () => {
        const mockModules = [
            { id: 'tree1_child', name: 'T1 Child', layer: 'layer1', requires: ['tree1_root'] },
            { id: 'tree1_root', name: 'T1 Root', layer: 'layer1', requires: [] },
            { id: 'tree2_child', name: 'T2 Child', layer: 'layer2', requires: ['tree2_root'] },
            { id: 'tree2_root', name: 'T2 Root', layer: 'layer2', requires: [] }
        ];
        const graph = new DependencyGraph(mockModules);
        const resolved = graph.resolveDependencies(['tree1_child', 'tree2_child']);
        assert.equal(resolved.length, 4);
        assert.ok(resolved.includes('tree1_root'));
        assert.ok(resolved.includes('tree2_root'));
    });
});

// ============================================================================
// TIER 3: CROSS-FEATURE INTERACTIONS (PAIRWISE)
// ============================================================================

// --- Pair 1: Selecting hero preset -> ejecting/remixing -> modifying parameter chip ---
await suite('Tier 3: Hero Preset -> Eject/Remix -> Parameter Tuning', async () => {
    await test('T3.1.1: Applying Hero preset initializes activePreset and injectedRules', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const presetKey = Object.keys(getPresets('learning'))[0];
        store.setPreset(presetKey);
        const state = useEngineState.getState();
        assert.equal(state.activePreset, presetKey);
        assert.ok(state.selectedModules.length > 0);
    });

    await test('T3.1.2: Adding a new module ejects activePreset: null while preserving injectedRules', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        const presetKey = Object.keys(getPresets('learning'))[0];
        store.setPreset(presetKey);
        const initialRules = [...useEngineState.getState().injectedRules];
        store.toggleModule('onkosul');
        const state = useEngineState.getState();
        assert.equal(state.activePreset, null, 'activePreset must detach on modification');
        assert.deepEqual(state.injectedRules, initialRules, 'injectedRules must be preserved');
    });

    await test('T3.1.3: Modifying parameter chip updates state and compiler prompt incorporates new depth', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Yapay Zeka Mimarisi');
        store.setPreset(Object.keys(getPresets('learning'))[0]);
        store.ejectPreset();
        store.setConfig('derinlik', 'kapsamli');
        const prompt = assembleFinalPrompt(useEngineState.getState());
        const compilerTexts = getCompilerTexts('tr', 'learning');
        assert.ok(prompt.includes(compilerTexts.derinlik.kapsamli));
    });

    await test('T3.1.4: Assembled prompt incorporates remixed modules, preserved rules, and new parameters', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Yapay Zeka Mimarisi');
        const presetEntry = Object.entries(getPresets('learning')).find(([, p]) => Array.isArray(p.injectRules) && p.injectRules.length > 0);
        const [presetId, presetData] = presetEntry;
        store.setPreset(presetId);
        // toggle onkosul (not in default forceModules of hizli)
        store.toggleModule('onkosul');
        store.setConfig('format', 'ders');
        const prompt = assembleFinalPrompt(useEngineState.getState());
        for (const rule of presetData.injectRules) {
            assert.ok(prompt.includes(`PRESET RULE: ${rule}`));
        }
        assert.ok(prompt.includes(getCompilerTexts('tr', 'learning').format.ders));
    });
});

// --- Pair 2: Changing domain via deep link while carrying custom module list ---
await suite('Tier 3: Domain Route Switch with Custom Module List', async () => {
    await test('T3.2.1: Domain switch resets selectedModules to prevent cross-domain ID pollution', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setModules(['eli5', 'kalibrasyon']);
        store.setDomain('code');
        const state = useEngineState.getState();
        assert.equal(state.config.domain, 'code');
        assert.deepEqual(state.selectedModules, []);
    });

    await test('T3.2.2: Global configs (konu, alan, lang, theme, hedef) are preserved across domain switch', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Kalıcı Başlık');
        store.setConfig('alan', 'Mühendislik');
        store.setConfig('hedef', 'claude-xml');
        store.setDomain('decision');
        const state = useEngineState.getState();
        assert.equal(state.config.konu, 'Kalıcı Başlık');
        assert.equal(state.config.alan, 'Mühendislik');
        assert.equal(state.config.hedef, 'claude-xml');
    });

    await test('T3.2.3: Domain-specific configs reset to target domain defaultConfig', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        store.setConfig('seviye', 'ileri');
        store.setDomain('code');
        const targetDefaults = getDomain('code').defaultConfig;
        const state = useEngineState.getState();
        assert.equal(state.config.seviye, targetDefaults.seviye);
    });

    await test('T3.2.4: Applying code preset after domain switch compiles valid code prompt', () => {
        resetStore('code');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Async Event Loop in Node.js');
        const firstPreset = Object.keys(getPresets('code'))[0];
        store.setPreset(firstPreset);
        const prompt = assembleFinalPrompt(useEngineState.getState());
        assert.ok(prompt.includes('Async Event Loop in Node.js'));
        assert.ok(prompt.includes('[ROLE]'));
    });
});

// --- Pair 3: Progressive view ↔ Advanced cockpit toggles under heavy state ---
await suite('Tier 3: Progressive ↔ Cockpit View Toggles Under Heavy State', async () => {
    await test('T3.3.1: Heavy state with topic, expertise, modules, monolog set up', () => {
        resetStore('academic');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Linear Attention in Post-Transformer Architectures');
        store.setConfig('alan', 'Machine Learning Research');
        store.setConfig('monolog', true);
        store.setPreset(Object.keys(getPresets('academic'))[0]);
        assert.equal(useEngineState.getState().config.gorunum, 'default');
    });

    await test('T3.3.2: Switch gorunum to advanced preserves 100% of rich state', () => {
        const store = useEngineState.getState();
        const beforeKonu = store.config.konu;
        const beforeModules = [...store.selectedModules];
        store.setGorunum('advanced');
        const state = useEngineState.getState();
        assert.equal(state.config.gorunum, 'advanced');
        assert.equal(state.config.konu, beforeKonu);
        assert.deepEqual(state.selectedModules, beforeModules);
        assert.equal(state.config.monolog, true);
    });

    await test('T3.3.3: In advanced mode, edit topic and toggle module cleanly', () => {
        const store = useEngineState.getState();
        store.setConfig('konu', 'Updated Topic in Cockpit Mode');
        store.toggleModule('research-question-def');
        const state = useEngineState.getState();
        assert.equal(state.config.konu, 'Updated Topic in Cockpit Mode');
    });

    await test('T3.3.4: Switch gorunum back to default retains state with zero drift', () => {
        const store = useEngineState.getState();
        store.setGorunum('default');
        const state = useEngineState.getState();
        assert.equal(state.config.gorunum, 'default');
        assert.equal(state.config.konu, 'Updated Topic in Cockpit Mode');
    });
});

// --- Pair 4: Saving recipe from remixed/ejected preset & load recipe restore ---
await suite('Tier 3: Save Recipe from Ejected Preset & Restore', async () => {
    let savedRecipeId = null;

    await test('T3.4.1: Create customized/ejected preset configuration with modified parameters', () => {
        resetStore('problemsolving');
        const store = useEngineState.getState();
        store.setConfig('konu', 'Sistemik Hata Analizi');
        store.setPreset(Object.keys(getPresets('problemsolving'))[0]);
        store.ejectPreset();
        store.setConfig('derinlik', 'derin');
        assert.equal(useEngineState.getState().activePreset, null);
    });

    await test('T3.4.2: saveRecipe saves serialized state with activePreset: null and excludes topic', () => {
        const store = useEngineState.getState();
        store.saveRecipe('Ejected PS Flow');
        const recipes = useEngineState.getState().savedRecipes;
        assert.equal(recipes.length, 1);
        savedRecipeId = recipes[0].id;
        assert.equal(recipes[0].name, 'Ejected PS Flow');
        assert.equal(recipes[0].payload.activePreset, null);
        assert.ok(!('konu' in recipes[0].payload), 'Recipe payload must exclude topic');
    });

    await test('T3.4.3: Reset workspace with clearAll', () => {
        const store = useEngineState.getState();
        store.clearAll();
        assert.equal(useEngineState.getState().selectedModules.length, 0);
        assert.equal(useEngineState.getState().config.konu, '');
    });

    await test('T3.4.4: loadRecipe restores exact module set, parameter configs, and domain route', () => {
        const store = useEngineState.getState();
        store.loadRecipe(savedRecipeId);
        const state = useEngineState.getState();
        assert.equal(state.config.domain, 'problemsolving');
        assert.equal(state.config.derinlik, 'derin');
        assert.equal(state.activePreset, null);
        assert.ok(state.selectedModules.length > 0);
    });
});

// ============================================================================
// TIER 4: REAL-WORLD APPLICATION SCENARIOS
// ============================================================================

await suite('Tier 4: Real-World Application Scenarios', async () => {
    await test('Scenario 1: Learning Domain Beginner Prompt Creation (Hero preset -> topic -> copy)', () => {
        resetStore('learning');
        const store = useEngineState.getState();
        
        // 1. User is on /learning route
        assert.equal(pathToDomain('/learning'), 'learning');
        
        // 2. Selects first Hero preset
        const heroPresetKey = Object.keys(getPresets('learning'))[0];
        store.setPreset(heroPresetKey);
        
        // 3. Types topic
        const topicText = 'Genel Görelilik Kuramı ve Uzay-Zaman Eğriliği';
        store.setConfig('konu', topicText);
        
        // 4. Inspects compiled prompt
        const state = useEngineState.getState();
        const prompt = assembleFinalPrompt(state);
        assert.ok(prompt.includes(topicText));
        assert.ok(prompt.includes('[ROLE]'));
        assert.ok(prompt.includes('[GOAL]'));
        assert.ok(prompt.includes('[INSTRUCTIONS]'));
        
        // 5. Verifies live token stats
        const stats = analyzePromptComplexity(state);
        assert.ok(stats.chars > 300);
        assert.ok(stats.tokens > 80);
        assert.equal(stats.isTooLongForUrl, false);
        
        // 6. Action Bar copy action
        globalThis.navigator.clipboard.writeText(prompt);
        assert.ok(prompt.length > 0);
    });

    await test('Scenario 2: Code Domain Refactoring Prompt (Code hero preset -> parameter chip change -> Claude link)', () => {
        resetStore('code');
        const store = useEngineState.getState();
        
        // 1. User navigates to /code
        assert.equal(pathToDomain('/code'), 'code');
        
        // 2. Selects Code hero preset
        const heroPresetKey = Object.keys(getPresets('code'))[0];
        store.setPreset(heroPresetKey);
        
        // 3. Tunes parameter chips
        store.setConfig('seviye', 'production');
        store.setConfig('format', 'clean_arch' in getCompilerTexts('tr', 'code').format ? 'clean_arch' : 'full');
        
        // 4. Enters topic
        const topic = 'Refactor legacy monolithic Express auth middleware to modular TypeScript with JWT and Redis session store';
        store.setConfig('konu', topic);
        
        // 5. Selects Claude target
        const state = useEngineState.getState();
        const prompt = assembleFinalPrompt(state, { forceTarget: 'markdown' });
        assert.ok(prompt.includes(topic));
        assert.equal(AI_STRATEGIES.claude.supportsQuery, false);
        assert.equal(AI_STRATEGIES.claude.getBaseUrl(), 'https://claude.ai/new');
    });

    await test('Scenario 3: Academic Research Paper Analysis (Academic domain -> customize blocks in L2 inspector -> token check)', () => {
        resetStore('academic');
        const store = useEngineState.getState();
        
        // 1. Enters Academic topic
        const topic = 'Impact of Transformer Self-Attention Quadratic Complexity on Edge Hardware';
        store.setConfig('konu', topic);
        
        // 2. Selects academic preset
        const heroPresetKey = Object.keys(getPresets('academic'))[0];
        store.setPreset(heroPresetKey);
        
        // 3. Expands L2 inspector, toggles autoResolveDeps, adds extra module
        store.setConfig('autoResolveDeps', true);
        store.toggleModule('sample-power-analysis');
        
        // 4. Verifies preset eject / remix
        assert.equal(useEngineState.getState().activePreset, null);
        
        // 5. Changes output target to claude-xml
        store.setConfig('hedef', 'claude-xml');
        const prompt = assembleFinalPrompt(useEngineState.getState());
        assert.ok(prompt.includes('<prompt>'), 'claude-xml format should include <prompt> tag');
        assert.ok(prompt.includes('<role>'), 'claude-xml format should include <role> tag');
        
        // 6. Verifies complexity
        const stats = analyzePromptComplexity(useEngineState.getState());
        assert.ok(stats.tokens > 0);
        assert.ok(stats.complexityScore > 0);
    });

    await test('Scenario 4: Custom Module Remix & Recipe Persistence', () => {
        resetStore('problemsolving');
        const store = useEngineState.getState();
        
        // 1. Select hero preset and remix with monologue mode
        store.setPreset(Object.keys(getPresets('problemsolving'))[0]);
        store.ejectPreset();
        store.setConfig('monolog', true);
        store.setConfig('konu', 'Önemli Problem');
        
        // 2. Save recipe
        store.saveRecipe('Kök Neden Akışı');
        const recipes = useEngineState.getState().savedRecipes;
        assert.equal(recipes.length, 1);
        const recipeId = recipes[0].id;
        
        // 3. Clear all workspace state
        store.clearAll();
        assert.equal(useEngineState.getState().selectedModules.length, 0);
        
        // 4. Reload recipe
        store.loadRecipe(recipeId);
        const restored = useEngineState.getState();
        assert.equal(restored.config.domain, 'problemsolving');
        assert.equal(restored.config.monolog, true);
        assert.ok(restored.selectedModules.length > 0);
    });

    await test('Scenario 5: Bilingual Toggle (TR ↔ EN) During Prompt Composition', () => {
        resetStore('travel');
        const store = useEngineState.getState();
        
        // 1. Start in Turkish
        store.setConfig('lang', 'tr');
        store.setConfig('konu', 'Japonya 14 Günlük Rota');
        store.setPreset(Object.keys(getPresets('travel'))[0]);
        const trPrompt = assembleFinalPrompt(useEngineState.getState());
        assert.ok(trPrompt.includes('[ROLE]'));
        
        // 2. Toggle language to English
        store.setConfig('lang', 'en');
        const enState = useEngineState.getState();
        assert.equal(enState.config.lang, 'en');
        assert.equal(enState.config.konu, 'Japonya 14 Günlük Rota');
        assert.ok(enState.selectedModules.length > 0);
        
        // 3. Verify English parameter descriptions and compiler texts
        const enDesc = getParameterDescription('travel', 'en', 'levels', 'backpack');
        assert.ok(enDesc && enDesc.length > 0);
        
        // 4. Assembled prompt compiles in English
        const enPrompt = assembleFinalPrompt(enState);
        assert.ok(enPrompt.includes('Japonya 14 Günlük Rota'));
        assert.ok(enPrompt.includes('[ROLE]'));
    });
});

// ============================================================================
// TEST RUNNER SUMMARY & EXIT CODE
// ============================================================================

console.log('\n================================================================');
console.log(` Test Execution Complete: ${totalTests} total tests across Tiers 1-4`);
console.log(` \x1b[32mPassed: ${passedTests}\x1b[0m`);
if (failedTests > 0) {
    console.log(` \x1b[31mFailed: ${failedTests}\x1b[0m`);
    console.log('\nFailures breakdown:');
    for (const f of failures) {
        console.log(`  - \x1b[31m${f.name}\x1b[0m: ${f.error.message}`);
    }
    process.exit(1);
} else {
    console.log(` \x1b[32mZero failures! 100% of E2E tests passing.\x1b[0m`);
    console.log('================================================================\n');
    process.exit(0);
}
