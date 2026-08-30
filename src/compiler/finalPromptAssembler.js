import { buildPromptStructure } from './structureBuilder';
import { sortDependencies } from '../engine/dependencyResolver';
import { getFormatter } from './formatterRegistry';

// `forceTarget` lets a caller render markdown regardless of the user's
// selected config.hedef — used by ActionBar's AI deep-link buttons, which
// cannot hand a JSON system-message payload to a chat-paste flow.
export function assembleFinalPrompt(state, { forceTarget } = {}) {
    if (!state?.config?.konu || !Array.isArray(state?.selectedModules) || state.selectedModules.length === 0) {
        return '';
    }

    // 1. Sort the resolved modules Topologically
    const sortedModules = sortDependencies(state.selectedModules, state.config.domain, state.config.lang);

    // 2. Build the structured blocks AST
    const structure = buildPromptStructure(state, sortedModules);

    // 3. Render via the active (or forced) target formatter
    return getFormatter(forceTarget || state.config.hedef)(structure);
}

export function analyzePromptComplexity(state) {
    if (!state?.config?.konu || !Array.isArray(state?.selectedModules) || state.selectedModules.length === 0) {
        return {
            chars: 0,
            tokens: 0,
            isTooLongForUrl: false,
            complexityScore: 0,
            layersUsed: 0,
            moduleCount: 0
        };
    }

    const sortedModules = sortDependencies(state.selectedModules, state.config.domain, state.config.lang);
    const structure = buildPromptStructure(state, sortedModules);

    // Same formatter as the real output, so stats (chars/tokens/URL-length
    // warning) reflect what will actually be copied/sent.
    const fullText = getFormatter(state.config.hedef)(structure);
    const chars = fullText.length;
    const tokens = Math.round(chars / 3.5);

    const uniqueLayers = new Set(sortedModules.map((m) => m.layer)).size;
    const complexityScore = Math.min(100, Math.round((sortedModules.length * 10) + (uniqueLayers * 5) + (state.config.monolog ? 20 : 0)));

    return {
        chars,
        tokens,
        isTooLongForUrl: chars > 4000,
        complexityScore,
        layersUsed: uniqueLayers,
        moduleCount: sortedModules.length
    };
}
