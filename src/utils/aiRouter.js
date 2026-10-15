import { isPromptUrlSafe } from '../config/urlLimits.js';

export const AI_STRATEGIES = {
    chatgpt: {
        getBaseUrl: () => 'https://chatgpt.com/',
        getPromptUrl: (prompt) => {
            const url = new URL('https://chatgpt.com/');
            url.searchParams.set('q', prompt);
            return url.toString();
        },
        supportsQuery: true
    },
    claude: {
        getBaseUrl: () => 'https://claude.ai/new',
        // Claude's public web route does not provide a reliable prompt-prefill
        // contract. Open the composer and copy instead of claiming delivery.
        supportsQuery: false
    },
    perplexity: {
        getBaseUrl: () => 'https://www.perplexity.ai/',
        // The public web app canonicalizes search routes to /search/new.
        getPromptUrl: (prompt) => {
            const url = new URL('https://www.perplexity.ai/search/new');
            url.searchParams.set('q', prompt);
            return url.toString();
        },
        supportsQuery: true
    },
    gemini: {
        getBaseUrl: () => 'https://gemini.google.com/app',
        // The optional Gemini URL Prompt extension consumes this q parameter.
        // Without it, ActionBar still copies the prompt for manual paste.
        getPromptUrl: (prompt) => {
            const url = new URL('https://gemini.google.com/app');
            url.searchParams.set('q', prompt);
            return url.toString();
        },
        supportsQuery: true
    }
};

export function copyToClipboard(text, onSuccess, onError) {
    if (!navigator.clipboard) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            if (onSuccess) onSuccess();
        } catch (err) {
            if (onError) onError(err);
        }
        document.body.removeChild(ta);
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        if (onSuccess) onSuccess();
    }).catch(err => {
        if (onError) onError(err);
    });
}

export function openInAI(aiName, prompt, onLengthWarning, onSuccessCopy, onCopyError) {
    if (!prompt || !aiName || !Object.hasOwn(AI_STRATEGIES, aiName)) return;
    const strategy = AI_STRATEGIES[aiName];

    let urlToOpen = strategy.getBaseUrl();
    let isTooLongForUrl = false;
    let queryAttached = false;

    if (strategy.supportsQuery && strategy.getPromptUrl) {
        const promptUrl = strategy.getPromptUrl(prompt);
        // Same single limit the preview badge estimates against (Phase 18.1).
        if (!isPromptUrlSafe(promptUrl)) {
            isTooLongForUrl = true;
        } else {
            urlToOpen = promptUrl;
            queryAttached = true;
        }
    }

    // Keep window.open synchronous so popup blockers do not reject the launch.
    window.open(urlToOpen, '_blank', 'noopener,noreferrer');

    copyToClipboard(
        prompt,
        () => {
            if (isTooLongForUrl && onLengthWarning) {
                onLengthWarning();
            } else if (onSuccessCopy) {
                onSuccessCopy(queryAttached);
            }
        },
        (err) => {
            // A failed copy used to end in console.warn only, leaving the user
            // with a success toast for an action that never delivered — most
            // critical on the Claude path, where the clipboard is the only
            // delivery channel (Phase 16.8).
            console.warn('Clipboard copy failed:', err);
            if (onCopyError) onCopyError(err);
        }
    );
}
