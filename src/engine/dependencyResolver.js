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
