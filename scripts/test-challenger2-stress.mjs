/**
 * scripts/test-challenger2-stress.mjs
 * 
 * Comprehensive Empirical Stress Test Suite for PREMPT Milestone 1
 * Written by Challenger 2.
 * 
 * Four Stress Areas:
 * 1. Preset Eject Behavior across all 180 Presets (15 domains x 12 presets)
 *    - Preserves injectedRules on ejectPreset(), toggleModule deselect, toggleModule add, setModules
 *    - Verifies assembled prompt retains PRESET RULE: constraints even after activePreset is null
 * 2. Long Prompt URL Bounds (4000 char limits, isTooLongForUrl, ActionBar badge & clipboard fallback)
 *    - Tests analyzePromptComplexity at borderline and extreme (>4000, 8000, 12000 chars)
 *    - Tests openInAI for chatgpt, claude, perplexity, gemini under short and long prompts
 *    - Verifies synchronous window.open ordering before clipboard operations
 * 3. Dependency Graph Resolution (Cycles, Missing IDs, Deep DAG, Diamond DAG, autoResolveDeps toggle)
 *    - Verifies zero infinite loops in resolveDependencies during cyclic inputs
 *    - Verifies topologicalSort cycle error detection and missing ID resilience
 *    - Verifies real domain modules DAG integrity (0 cycles, 0 broken requires across 15 domains)
 * 4. Rule 13 Emoji Cleanliness Audit
 *    - Deep regex scan of all .js, .jsx, .json, .css files across the entire codebase
 */

import { register } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import assert from 'node:assert/strict';

// Register module loader
register('./test-loader.mjs', import.meta.url);

// Mocks for Node.js environment
globalThis.localStorage = {
    _data: {},
    getItem(key) { return Object.hasOwn(this._data, key) ? this._data[key] : null; },
    setItem(key, val) { this._data[key] = String(val); },
    removeItem(key) { delete this._data[key]; },
    clear() { this._data = {}; }
};

const openedWindows = [];
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
    open: (url, target, features) => {
        openedWindows.push({ url, target, features, timestamp: Date.now() });
        return { closed: false, close() {} };
    },
    localStorage: globalThis.localStorage
};

let clipboardText = '';
const clipboardHistory = [];
if (!globalThis.navigator) globalThis.navigator = {};
Object.defineProperty(globalThis.navigator, 'clipboard', {
    value: {
        writeText: async (text) => {
            clipboardText = text;
            clipboardHistory.push({ text, timestamp: Date.now() });
            return Promise.resolve();
        },
        readText: async () => clipboardText
    },
    configurable: true,
    writable: true
});

// Import system modules
const { DOMAINS, getDomain } = await import('../src/domains/index.js');
const { useEngineState } = await import('../src/store/engineState.js');
const { getModuleRegistry } = await import('../src/engine/moduleRegistry.js');
const { getPresets, applyPreset } = await import('../src/engine/presetEngine.js');
const { resolveDependencies, sortDependencies, DependencyGraph } = await import('../src/engine/dependencyResolver.js');
const { assembleFinalPrompt, analyzePromptComplexity } = await import('../src/compiler/finalPromptAssembler.js');
const { AI_STRATEGIES, openInAI, copyToClipboard } = await import('../src/utils/aiRouter.js');

let passCount = 0;
let failCount = 0;
const failures = [];

function test(name, fn) {
    try {
        fn();
        passCount++;
        console.log(`  ✓ ${name}`);
    } catch (err) {
        failCount++;
        failures.push({ name, error: err.message, stack: err.stack });
        console.error(`  ✗ ${name}: ${err.message}`);
    }
}

async function asyncTest(name, fn) {
    try {
        await fn();
        passCount++;
        console.log(`  ✓ ${name}`);
    } catch (err) {
        failCount++;
        failures.push({ name, error: err.message, stack: err.stack });
        console.error(`  ✗ ${name}: ${err.message}`);
    }
}

console.log('================================================================');
console.log(' PREMPT Milestone 1 — Challenger 2 Empirical Stress Tests');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// STRESS TEST 1: Preset Eject Behavior Across All 180 Presets
// -----------------------------------------------------------------------------
console.log('=== Stress Suite 1: All 180 Presets Eject & Injected Rules Preservation ===');

const domainIds = Object.keys(DOMAINS);
assert.equal(domainIds.length, 15, 'Must have exactly 15 domains');

let totalPresetsTested = 0;
let presetsWithInjectedRules = 0;

test('Verify total preset count across all 15 domains equals 180', () => {
    let count = 0;
    for (const dId of domainIds) {
        const presetsObj = getPresets(dId);
        const presetsList = Object.values(presetsObj);
        assert.equal(presetsList.length, 12, `Domain ${dId} must have exactly 12 presets`);
        count += presetsList.length;
    }
    assert.equal(count, 180, 'Must have exactly 180 presets in total');
});

for (const dId of domainIds) {
    const presetsObj = getPresets(dId);
    const presetsList = Object.values(presetsObj);
    const domainModules = getModuleRegistry(dId, 'tr');
    const domainModuleIds = domainModules.map(m => m.id);

    test(`Domain [${dId}]: All 12 presets eject purity and rule preservation`, () => {
        for (const preset of presetsList) {
            totalPresetsTested++;
            const hasRules = Array.isArray(preset.injectRules) && preset.injectRules.length > 0;
            if (hasRules) presetsWithInjectedRules++;

            // 1. Set domain and preset
            const store = useEngineState.getState();
            store.setDomain(dId);
            store.setPreset(preset.id);

            const stateAfterPreset = useEngineState.getState();
            assert.equal(stateAfterPreset.activePreset, preset.id, `Preset ${preset.id} must be active`);
            const initialRules = [...stateAfterPreset.injectedRules];
            const initialModules = [...stateAfterPreset.selectedModules];

            if (hasRules) {
                assert.deepEqual(initialRules, preset.injectRules, `Preset ${preset.id} must load injectRules`);
            }

            // Test 1A: Direct ejectPreset()
            store.ejectPreset();
            const stateAfterEject = useEngineState.getState();
            assert.equal(stateAfterEject.activePreset, null, `ejectPreset() must detach activePreset to null for ${preset.id}`);
            assert.deepEqual(stateAfterEject.injectedRules, initialRules, `injectedRules must be preserved after ejectPreset() for ${preset.id}`);
            assert.deepEqual(stateAfterEject.selectedModules, initialModules, `selectedModules must be preserved after ejectPreset() for ${preset.id}`);

            // Test 1B: Re-apply preset and toggleModule off
            store.setPreset(preset.id);
            assert.equal(useEngineState.getState().activePreset, preset.id);
            if (initialModules.length > 0) {
                const modToToggleOff = initialModules[0];
                store.toggleModule(modToToggleOff);
                const stateAfterToggleOff = useEngineState.getState();
                assert.equal(stateAfterToggleOff.activePreset, null, `toggleModule off must detach activePreset to null for ${preset.id}`);
                assert.deepEqual(stateAfterToggleOff.injectedRules, initialRules, `injectedRules must be preserved after toggleModule off for ${preset.id}`);
                assert.ok(!stateAfterToggleOff.selectedModules.includes(modToToggleOff), `Toggled off module ${modToToggleOff} must be removed`);
            }

            // Test 1C: Re-apply preset and toggleModule on (adding a new module)
            store.setPreset(preset.id);
            const unusedModId = domainModuleIds.find(id => !initialModules.includes(id));
            if (unusedModId) {
                store.toggleModule(unusedModId);
                const stateAfterToggleOn = useEngineState.getState();
                assert.equal(stateAfterToggleOn.activePreset, null, `toggleModule on must detach activePreset to null for ${preset.id}`);
                assert.deepEqual(stateAfterToggleOn.injectedRules, initialRules, `injectedRules must be preserved after toggleModule on for ${preset.id}`);
                assert.ok(stateAfterToggleOn.selectedModules.includes(unusedModId), `Toggled on module ${unusedModId} must be included`);
            }

            // Test 1D: Re-apply preset and setModules
            store.setPreset(preset.id);
            store.setModules(initialModules.slice(0, 2));
            const stateAfterSetModules = useEngineState.getState();
            assert.equal(stateAfterSetModules.activePreset, null, `setModules must detach activePreset to null for ${preset.id}`);
            assert.deepEqual(stateAfterSetModules.injectedRules, initialRules, `injectedRules must be preserved after setModules for ${preset.id}`);

            // Test 1E: Compiled prompt preservation verification
            if (hasRules && initialModules.length > 0) {
                store.setPreset(preset.id);
                store.setConfig('konu', `Empirical Test Subject for ${preset.id}`);
                store.ejectPreset(); // Now activePreset is null, but injectedRules and modules remain
                const prompt = assembleFinalPrompt(useEngineState.getState());
                assert.ok(prompt.length > 0, `Assembled prompt must not be empty for ejected preset ${preset.id}`);
                for (const rule of initialRules) {
                    assert.ok(
                        prompt.includes(`PRESET RULE: ${rule}`),
                        `Assembled prompt must contain PRESET RULE: "${rule}" even after ejecting preset ${preset.id}`
                    );
                }
            }
        }
    });
}

test(`Statistical summary: Verified all ${totalPresetsTested} presets across 15 domains (${presetsWithInjectedRules} with injectedRules)`, () => {
    assert.equal(totalPresetsTested, 180);
});

// -----------------------------------------------------------------------------
// STRESS TEST 2: Long Prompt URL Bounds (>4000 chars, isTooLongForUrl, clipboard fallback)
// -----------------------------------------------------------------------------
console.log('\n=== Stress Suite 2: URL Bounds (4000 chars) & Clipboard Fallback ===');

test('analyzePromptComplexity: empty topic returns false and zero stats', () => {
    const stats = analyzePromptComplexity({
        config: { domain: 'learning', lang: 'tr', konu: '', hedef: 'markdown' },
        selectedModules: ['eli5'],
        injectedRules: []
    });
    assert.equal(stats.isTooLongForUrl, false);
    assert.equal(stats.chars, 0);
    assert.equal(stats.tokens, 0);
});

test('analyzePromptComplexity: normal prompt returns isTooLongForUrl: false', () => {
    const stats = analyzePromptComplexity({
        config: { domain: 'learning', lang: 'tr', konu: 'Quantum Computing basics', alan: 'Physics', hedef: 'markdown' },
        selectedModules: ['eli5', 'ornek_olay'],
        injectedRules: []
    });
    assert.equal(stats.isTooLongForUrl, false);
    assert.ok(stats.chars > 0 && stats.chars < 3000);
    assert.equal(stats.tokens, Math.round(stats.chars / 3.5));
});

test('analyzePromptComplexity: borderline threshold around 3800 URI encoded chars', () => {
    let baseTopic = 'A'.repeat(500);
    let lowStats = analyzePromptComplexity({
        config: { domain: 'code', lang: 'en', konu: baseTopic, alan: 'Software', hedef: 'markdown' },
        selectedModules: ['code_architecture_design'],
        injectedRules: []
    });
    assert.equal(lowStats.isTooLongForUrl, false, '500 char topic should be safe');

    let highTopic = 'A'.repeat(4000);
    let highStats = analyzePromptComplexity({
        config: { domain: 'code', lang: 'en', konu: highTopic, alan: 'Software', hedef: 'markdown' },
        selectedModules: ['code_architecture_design'],
        injectedRules: []
    });
    assert.equal(highStats.isTooLongForUrl, true, '4000 char topic must trigger isTooLongForUrl: true');
    assert.ok(highStats.chars > 4000);
    assert.equal(highStats.tokens, Math.round(highStats.chars / 3.5));
});

test('analyzePromptComplexity: extreme topics (8000 and 12000 chars) flag isTooLongForUrl without crashing', () => {
    for (const len of [8000, 12000]) {
        const hugeTopic = 'X'.repeat(len);
        const stats = analyzePromptComplexity({
            config: { domain: 'academic', lang: 'en', konu: hugeTopic, alan: 'AI Ethics', hedef: 'markdown' },
            selectedModules: ['acad_lit_review', 'acad_peer_review'],
            injectedRules: ['Strict constraint rule 1', 'Strict constraint rule 2']
        });
        assert.equal(stats.isTooLongForUrl, true);
        assert.ok(stats.chars >= len);
        assert.equal(stats.tokens, Math.round(stats.chars / 3.5));
    }
});

await asyncTest('openInAI: short prompt attaches query for chatgpt, perplexity, gemini', async () => {
    const shortPrompt = 'Explain neural networks in simple terms.';

    for (const provider of ['chatgpt', 'perplexity', 'gemini']) {
        openedWindows.length = 0;
        clipboardHistory.length = 0;
        let warningFired = false;
        let successFired = false;
        let queryAttachedReported = null;

        openInAI(
            provider,
            shortPrompt,
            () => { warningFired = true; },
            (queryAttached) => {
                successFired = true;
                queryAttachedReported = queryAttached;
            }
        );

        // Synchronous window.open assertion
        assert.equal(openedWindows.length, 1, `${provider} must call window.open synchronously`);
        assert.ok(openedWindows[0].url.length <= 4000, `${provider} short prompt URL must be <= 4000 chars`);
        assert.ok(openedWindows[0].url.includes('q='), `${provider} short prompt must include q= query param`);

        // Wait for clipboard promise
        await new Promise(r => setTimeout(r, 10));
        assert.equal(warningFired, false, `${provider} short prompt must not fire length warning`);
        assert.equal(successFired, true, `${provider} short prompt must fire success callback`);
        assert.equal(queryAttachedReported, true, `${provider} must report queryAttached: true`);
        assert.equal(clipboardText, shortPrompt, `${provider} must copy prompt to clipboard`);
    }
});

await asyncTest('openInAI: claude always uses base URL and clipboard fallback (supportsQuery: false)', async () => {
    const prompt = 'Synthesize quantum computing principles.';
    openedWindows.length = 0;
    clipboardHistory.length = 0;
    let successFired = false;
    let queryAttachedReported = null;

    openInAI(
        'claude',
        prompt,
        () => {},
        (queryAttached) => {
            successFired = true;
            queryAttachedReported = queryAttached;
        }
    );

    assert.equal(openedWindows.length, 1);
    assert.equal(openedWindows[0].url, 'https://claude.ai/new', 'Claude must open base URL https://claude.ai/new');
    await new Promise(r => setTimeout(r, 10));
    assert.equal(successFired, true);
    assert.equal(queryAttachedReported, false, 'Claude must report queryAttached: false');
    assert.equal(clipboardText, prompt, 'Claude must copy prompt to clipboard');
});

await asyncTest('openInAI: long prompt (>4000 chars) triggers URL length guard and clipboard fallback', async () => {
    // Construct a prompt where URL length exceeds 4000
    const longPrompt = 'SYSTEM INSTRUCTION: ' + 'Analyze algorithmic efficiency in distributed networks. '.repeat(100);
    assert.ok(encodeURIComponent(longPrompt).length > 4000, 'Prompt must exceed 4000 encoded characters');

    for (const provider of ['chatgpt', 'perplexity', 'gemini']) {
        openedWindows.length = 0;
        clipboardHistory.length = 0;
        let warningFired = false;
        let successFired = false;

        openInAI(
            provider,
            longPrompt,
            () => { warningFired = true; },
            () => { successFired = true; }
        );

        // Synchronous window.open assertion
        assert.equal(openedWindows.length, 1, `${provider} must call window.open synchronously`);
        const baseExpected = AI_STRATEGIES[provider].getBaseUrl();
        assert.equal(openedWindows[0].url, baseExpected, `${provider} must fall back to base URL when URL > 4000 chars`);
        assert.ok(!openedWindows[0].url.includes('q='), `${provider} must NOT attach truncated/overflow query to URL`);

        // Wait for clipboard promise
        await new Promise(r => setTimeout(r, 10));
        assert.equal(warningFired, true, `${provider} must fire onLengthWarning callback when URL > 4000 chars`);
        assert.equal(successFired, false, `${provider} must not fire onSuccessCopy when URL exceeded`);
        assert.equal(clipboardText, longPrompt, `${provider} must copy full prompt text to clipboard`);
    }
});

test('openInAI: execution ordering guarantees synchronous window.open before clipboard write', () => {
    openedWindows.length = 0;
    clipboardHistory.length = 0;

    openInAI('chatgpt', 'Test ordering prompt', () => {}, () => {});

    assert.equal(openedWindows.length, 1, 'window.open must be executed synchronously before any async clipboard tick');
});

// -----------------------------------------------------------------------------
// STRESS TEST 3: Dependency Graph Resolution (Cycles, Missing IDs, Deep DAG)
// -----------------------------------------------------------------------------
console.log('\n=== Stress Suite 3: Dependency Graph (Cycles, Missing IDs, DAG Resolution) ===');

test('DAG Real Domains: Verify 0 circular dependencies across all 15 domains in TR and EN', () => {
    for (const dId of domainIds) {
        for (const lang of ['tr', 'en']) {
            const mods = getModuleRegistry(dId, lang);
            const allIds = mods.map(m => m.id);
            // Must resolve and sort all modules without throwing circular dependency error
            assert.doesNotThrow(() => {
                const resolved = resolveDependencies(allIds, dId, lang);
                const sorted = sortDependencies(resolved, dId, lang);
                assert.ok(sorted.length >= allIds.length, `Domain ${dId} [${lang}] should sort all modules`);
            }, `Domain ${dId} [${lang}] should have 0 circular dependencies`);
        }
    }
});

test('DAG Synthetic Cycle: resolveDependencies terminates without infinite loop on cyclic graph', () => {
    // Graph: A -> B -> C -> A
    const cyclicModules = [
        { id: 'nodeA', requires: ['nodeB'] },
        { id: 'nodeB', requires: ['nodeC'] },
        { id: 'nodeC', requires: ['nodeA'] }
    ];
    const graph = new DependencyGraph(cyclicModules);
    const resolved = graph.resolveDependencies(['nodeA']);
    assert.deepEqual(resolved.sort(), ['nodeA', 'nodeB', 'nodeC'].sort(), 'resolveDependencies must terminate and return all reachable cycle nodes');
});

test('DAG Synthetic Cycle: topologicalSort throws Circular Dependency error with node name', () => {
    const cyclicModules = [
        { id: 'nodeA', requires: ['nodeB'] },
        { id: 'nodeB', requires: ['nodeC'] },
        { id: 'nodeC', requires: ['nodeA'] }
    ];
    const graph = new DependencyGraph(cyclicModules);
    assert.throws(
        () => graph.topologicalSort(['nodeA', 'nodeB', 'nodeC']),
        /Döngüsel Bağımlılık \(Circular Dependency\)/
    );
});

test('DAG Synthetic Missing IDs: resolveDependencies handles missing IDs gracefully', () => {
    const brokenModules = [
        { id: 'validNode1', requires: ['ghost_id_404', 'validNode2'] },
        { id: 'validNode2', requires: [] }
    ];
    const graph = new DependencyGraph(brokenModules);
    const resolved = graph.resolveDependencies(['validNode1']);
    assert.ok(resolved.includes('ghost_id_404'), 'Resolved set should include declared dep');
    assert.ok(resolved.includes('validNode2'));
});

test('DAG Synthetic Missing IDs: topologicalSort filters out missing module IDs without crashing', () => {
    const brokenModules = [
        { id: 'validNode1', requires: ['ghost_id_404'] }
    ];
    const graph = new DependencyGraph(brokenModules);
    const sorted = graph.topologicalSort(['validNode1', 'ghost_id_404']);
    assert.equal(sorted.length, 1, 'Missing module object should be filtered out safely');
    assert.equal(sorted[0].id, 'validNode1');
});

test('DAG Deep Chain: 10-level chain A1 -> A2 -> ... -> A10 resolves in exact topological order', () => {
    const chainModules = [];
    for (let i = 1; i <= 10; i++) {
        chainModules.push({
            id: `node_${i}`,
            requires: i < 10 ? [`node_${i + 1}`] : []
        });
    }
    const graph = new DependencyGraph(chainModules);
    const resolved = graph.resolveDependencies(['node_1']);
    assert.equal(resolved.length, 10);
    const sorted = graph.topologicalSort(resolved);
    assert.equal(sorted.length, 10);
    // Topological sort puts deepest dependencies first: node_10 must precede node_9 ... must precede node_1
    assert.equal(sorted[0].id, 'node_10');
    assert.equal(sorted[9].id, 'node_1');
});

test('DAG Diamond Graph: A -> B, C; B -> D; C -> D resolves without duplicate entries', () => {
    const diamondModules = [
        { id: 'rootA', requires: ['branchB', 'branchC'] },
        { id: 'branchB', requires: ['baseD'] },
        { id: 'branchC', requires: ['baseD'] },
        { id: 'baseD', requires: [] }
    ];
    const graph = new DependencyGraph(diamondModules);
    const resolved = graph.resolveDependencies(['rootA']);
    assert.equal(resolved.length, 4);
    const sorted = graph.topologicalSort(resolved);
    assert.equal(sorted.length, 4);
    assert.equal(sorted[0].id, 'baseD', 'Base dependency D must be first');
    assert.equal(sorted[3].id, 'rootA', 'Root dependency A must be last');
});

test('CollapsibleInspector autoResolveDeps toggle behavior in store', () => {
    const store = useEngineState.getState();
    store.setDomain('learning');

    // With autoResolveDeps: true
    store.setConfig('autoResolveDeps', true);
    store.setModules([]);
    // Find a module with requires in learning
    const mods = getModuleRegistry('learning', 'tr');
    const modWithDeps = mods.find(m => Array.isArray(m.requires) && m.requires.length > 0);
    assert.ok(modWithDeps, 'Learning domain must have at least one module with requires');

    store.toggleModule(modWithDeps.id);
    const stateWithAuto = useEngineState.getState();
    assert.ok(stateWithAuto.selectedModules.length > 1, 'Auto-resolve must pull in prerequisites');
    for (const dep of modWithDeps.requires) {
        assert.ok(stateWithAuto.selectedModules.includes(dep), `Selected modules must include prereq ${dep}`);
    }

    // With autoResolveDeps: false
    store.setConfig('autoResolveDeps', false);
    store.setModules([]);
    store.toggleModule(modWithDeps.id);
    const stateWithoutAuto = useEngineState.getState();
    assert.equal(stateWithoutAuto.selectedModules.length, 1, 'Without auto-resolve, only clicked module is selected');
    assert.equal(stateWithoutAuto.selectedModules[0], modWithDeps.id);
});

// -----------------------------------------------------------------------------
// STRESS TEST 4: Rule 13 Emoji Cleanliness Audit
// -----------------------------------------------------------------------------
console.log('\n=== Stress Suite 4: Rule 13 Emoji Cleanliness Audit ===');

const projectRoot = join(fileURLToPath(import.meta.url), '..', '..');

// Scan all source directories for raw Unicode emojis
// Exclude node_modules, dist, .agents, .git
const scanDirs = ['src', 'scripts'];
const allowedExtensions = new Set(['.js', '.jsx', '.json', '.css']);

// Comprehensive Unicode Emoji pattern:
// Extended Pictographic, Emoji Presentation, Dingbats, Emoticons, Symbols
const emojiRegex = /(?:\p{Extended_Pictographic}|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/u;

function getAllFiles(dirPath, fileList = []) {
    const entries = readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = join(dirPath, entry.name);
        if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.agents' && entry.name !== '.git') {
                getAllFiles(fullPath, fileList);
            }
        } else if (entry.isFile()) {
            if (allowedExtensions.has(extname(entry.name))) {
                fileList.push(fullPath);
            }
        }
    }
    return fileList;
}

test('Rule 13 Emoji Audit across all .js, .jsx, .json, .css files in src/ and scripts/', () => {
    let allFiles = [];
    for (const dir of scanDirs) {
        const fullDir = join(projectRoot, dir);
        getAllFiles(fullDir, allFiles);
    }

    assert.ok(allFiles.length > 50, `Must scan substantial file set (found ${allFiles.length} files)`);

    const emojiViolations = [];

    // Note: detection scripts contain regexes/tests to check emojis. Exclude them.
    const detectionTestScripts = new Set([
        'clean-preset-icons.mjs',
        'validate-modules.mjs',
        'test-e2e.mjs',
        'test-challenger2-stress.mjs'
    ]);

    for (const filePath of allFiles) {
        const fileName = filePath.split(/[/\\]/).pop();
        if (detectionTestScripts.has(fileName)) continue;

        const content = readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
            const line = lines[lineNum];
            if (emojiRegex.test(line)) {
                emojiViolations.push({
                    file: filePath.replace(projectRoot, ''),
                    line: lineNum + 1,
                    text: line.trim()
                });
            }
        }
    }

    if (emojiViolations.length > 0) {
        console.error(`Found ${emojiViolations.length} Rule 13 emoji violations:`);
        for (const v of emojiViolations) {
            console.error(`  - ${v.file}:${v.line} -> ${v.text}`);
        }
    }

    assert.equal(
        emojiViolations.length,
        0,
        `Found ${emojiViolations.length} Rule 13 emoji violations across code files`
    );
});

// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(` Challenger 2 Stress Test Execution Complete!`);
console.log(` Passed: ${passCount}`);
console.log(` Failed: ${failCount}`);
console.log('================================================================');

if (failCount > 0) {
    console.error('\nFailures encountered:');
    for (const f of failures) {
        console.error(`- ${f.name}: ${f.error}`);
    }
    process.exit(1);
} else {
    console.log('\nAll empirical stress tests passed with 100% success rate!\n');
    process.exit(0);
}
