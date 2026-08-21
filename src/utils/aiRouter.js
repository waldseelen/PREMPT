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

export function openInAI(aiName, prompt, onLengthWarning, onSuccessCopy) {
    if (!prompt) return;
    const strategy = AI_STRATEGIES[aiName];
    if (!strategy) return;

    let urlToOpen = strategy.getBaseUrl();
    let isTooLongForUrl = false;
    let queryAttached = false;

    if (strategy.supportsQuery && strategy.getPromptUrl) {
        const promptUrl = strategy.getPromptUrl(prompt);
        if (promptUrl.length > 4000) {
            isTooLongForUrl = true;
        } else {
            urlToOpen = promptUrl;
            queryAttached = true;
        }
    }

    // Keep window.open synchronous so popup blockers do not reject the launch.
    window.open(urlToOpen, '_blank');

    copyToClipboard(prompt, () => {
        if (isTooLongForUrl && onLengthWarning) {
            onLengthWarning();
        } else if (onSuccessCopy) {
            onSuccessCopy(queryAttached);
        }
    });
}
