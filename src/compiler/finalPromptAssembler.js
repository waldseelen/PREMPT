import { buildPromptStructure } from './structureBuilder';
import { sortDependencies } from '../engine/dependencyResolver';

export function assembleFinalPrompt(state) {
    if (!state.config.konu || state.selectedModules.length === 0) return "";

    // 1. Sort the resolved modules Topologically
    const sortedModules = sortDependencies(state.selectedModules, state.config.domain, state.config.lang);

    // 2. Build the structured blocks AST
    const structure = buildPromptStructure(state, sortedModules);

    // 3. Render
    let finalPrompt = '';
    for (const [blockLabel, content] of Object.entries(structure)) {
        finalPrompt += `${blockLabel}\n${content}\n\n`;
    }

    return finalPrompt.trim();
}

export function analyzePromptComplexity(state) {
    if (!state.config.konu || state.selectedModules.length === 0) {
        return { tokens: 0, complexityScore: 0, layersUsed: 0 };
    }
    
    const sortedModules = sortDependencies(state.selectedModules, state.config.domain, state.config.lang);
    const structure = buildPromptStructure(state, sortedModules);
    
    const fullText = Object.values(structure).join(' ');
    const chars = fullText.length;
    const tokens = Math.round(chars / 3.5);
    
    const uniqueLayers = new Set(sortedModules.map(m => m.layer)).size;
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
