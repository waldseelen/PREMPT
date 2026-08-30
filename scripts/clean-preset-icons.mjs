import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const specsDir = join(__dirname, '..', 'src', 'domains', 'specs');

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}\u{FE00}-\u{FE0F}]/gu;

for (const file of readdirSync(specsDir)) {
    if (!file.endsWith('Spec.js')) continue;
    const fullPath = join(specsDir, file);
    let content = readFileSync(fullPath, 'utf8');

    // Replace any emoji inside "icon": "..."
    content = content.replace(/"icon":\s*"[^"]*"/g, (match) => {
        if (EMOJI_REGEX.test(match)) {
            return '"icon": "zap"';
        }
        return match;
    });

    writeFileSync(fullPath, content, 'utf8');
}

console.log('All preset icons sanitized!');
