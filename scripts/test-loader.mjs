import { existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';

export async function resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') || specifier.startsWith('/')) {
        const parentUrl = context.parentURL;
        if (parentUrl) {
            const resolvedUrl = new URL(specifier, parentUrl);
            const filePath = fileURLToPath(resolvedUrl);

            if (existsSync(filePath)) {
                try {
                    if (statSync(filePath).isDirectory()) {
                        const indexJs = filePath + '/index.js';
                        if (existsSync(indexJs)) {
                            return { url: pathToFileURL(indexJs).href, shortCircuit: true };
                        }
                    }
                } catch {
                    // Ignore stat errors
                }
            } else {
                if (existsSync(filePath + '.js')) {
                    return { url: pathToFileURL(filePath + '.js').href, shortCircuit: true };
                }
                if (existsSync(filePath + '.jsx')) {
                    return { url: pathToFileURL(filePath + '.jsx').href, shortCircuit: true };
                }
                if (existsSync(filePath + '/index.js')) {
                    return { url: pathToFileURL(filePath + '/index.js').href, shortCircuit: true };
                }
            }
        }
    }
    return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
    if (url.endsWith('.json')) {
        const content = await readFile(fileURLToPath(url), 'utf8');
        return {
            format: 'module',
            source: `export default ${content};`,
            shortCircuit: true
        };
    }
    return nextLoad(url, context);
}
