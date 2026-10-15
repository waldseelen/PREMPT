import { getModuleRegistry } from './moduleRegistry';

export class DependencyGraph {
    constructor(modulesJson) {
        this.modules = {};
        this.adjacencyList = {}; 
        
        modulesJson.forEach(mod => {
            this.modules[mod.id] = mod;
            this.adjacencyList[mod.id] = mod.requires || [];
        });
    }

    resolveDependencies(selectedIds) {
        const resolved = new Set(selectedIds);
        let addedNew = true;

        while (addedNew) {
            addedNew = false;
            for (const id of resolved) {
                const deps = this.adjacencyList[id] || [];
                for (const dep of deps) {
                    if (!resolved.has(dep)) {
                        resolved.add(dep);
                        addedNew = true;
                    }
                }
            }
        }
        return Array.from(resolved);
    }

    topologicalSort(resolvedIds) {
        const result = [];
        const visited = new Set();
        const visiting = new Set();

        const visit = (id) => {
            if (visiting.has(id)) throw new Error(`Döngüsel Bağımlılık (Circular Dependency): ${id}`);
            if (!visited.has(id)) {
                visiting.add(id);
                const deps = this.adjacencyList[id] || [];
                
                for (const dep of deps) {
                    if (resolvedIds.includes(dep)) {
                        visit(dep);
                    }
                }
                
                visiting.delete(id);
                visited.add(id);
                if (this.modules[id]) {
                    result.push(this.modules[id]);
                }
            }
        };

        for (const id of resolvedIds) {
            visit(id);
        }

        return result.filter(Boolean);
    }
}

// Graphs are cached per "domain:lang" key instead of two fixed singletons,
// so adding a domain needs no change here.
const graphCache = new Map();

function getGraph(domain, lang) {
    const key = `${domain}:${lang}`;
    if (!graphCache.has(key)) {
        graphCache.set(key, new DependencyGraph(getModuleRegistry(domain, lang)));
    }
    return graphCache.get(key);
}

export function resolveDependencies(selectedIds, domain = 'learning', lang = 'tr') {
    return getGraph(domain, lang).resolveDependencies(selectedIds);
}

export function sortDependencies(resolvedIds, domain = 'learning', lang = 'tr') {
    return getGraph(domain, lang).topologicalSort(resolvedIds);
}

// Runs a sort function with a registry-order fallback: a circular `requires`
// chain must degrade to an unordered-but-complete prompt, never to a render
// crash that takes down the whole app (Phase 16.9). The throwing contract of
// topologicalSort itself is preserved (validator + stress tests rely on it).
export function withCycleFallback(sortFn, fallback) {
    try {
        return sortFn();
    } catch (err) {
        console.warn('Dependency sort hit a cycle, falling back to registry order:', err?.message || err);
        return fallback();
    }
}

// Cycle-safe variant used by the compile path (finalPromptAssembler). Outside
// the compile path, sortDependencies keeps its throwing contract so corrupt
// data stays loud in tests and validators.
export function safeSortDependencies(resolvedIds, domain = 'learning', lang = 'tr') {
    const registry = getModuleRegistry(domain, lang);
    return withCycleFallback(
        () => getGraph(domain, lang).topologicalSort(resolvedIds),
        () => registry.filter((m) => resolvedIds.includes(m.id))
    );
}
