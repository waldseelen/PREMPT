const AI_STRATEGIES = {
    chatgpt: {
        getBaseUrl: () => 'https://chatgpt.com/',
        getPromptUrl: (prompt) => 'https://chatgpt.com/?q=' + encodeURIComponent(prompt),
        supportsQuery: true
    },
    claude: {
        getBaseUrl: () => 'https://claude.ai/new',
        getPromptUrl: () => 'https://claude.ai/new',
        supportsQuery: false
    },
    perplexity: {
        getBaseUrl: () => 'https://www.perplexity.ai/search',
        getPromptUrl: (prompt) => 'https://www.perplexity.ai/search?q=' + encodeURIComponent(prompt),
        supportsQuery: true
    },
    gemini: {
        getBaseUrl: () => 'https://gemini.google.com/app',
        getPromptUrl: () => 'https://gemini.google.com/app',
        supportsQuery: false
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
            if(onSuccess) onSuccess();
        } catch (err) {
            if(onError) onError(err);
        }
        document.body.removeChild(ta);
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        if(onSuccess) onSuccess();
    }).catch(err => {
        if(onError) onError(err);
    });
}

export function openInAI(aiName, prompt, onLengthWarning, onSuccessCopy) {
    if (!prompt) return;
    const strategy = AI_STRATEGIES[aiName];
    if (!strategy) return;

    let urlToOpen = strategy.getBaseUrl();
    let isTooLongForUrl = false;

    if (strategy.supportsQuery) {
        const promptUrl = strategy.getPromptUrl(prompt);
        if (promptUrl.length > 2000) {
            isTooLongForUrl = true;
        } else {
            urlToOpen = promptUrl;
        }
    }

    // 1. Synchronous window.open to bypass popup blocker
    window.open(urlToOpen, '_blank');

    // 2. Universal clipboard fallback
    copyToClipboard(prompt, () => {
        if (isTooLongForUrl && onLengthWarning) {
            onLengthWarning();
        } else if (onSuccessCopy) {
            onSuccessCopy();
        }
    });
}
