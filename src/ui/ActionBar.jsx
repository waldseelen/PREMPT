import { useRef } from 'react';
import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { assembleFinalPrompt } from '../compiler/finalPromptAssembler';
import { copyToClipboard, openInAI } from '../utils/aiRouter';
import { serializeState, sanitizePayload, encodePayloadToParam } from '../utils/statePayload';
import { getDomain } from '../domains';
import { SiGooglegemini, SiAnthropic, SiPerplexity, SiOpenaigym } from '@icons-pack/react-simple-icons';
import { getTranslation } from '../locales/i18n';
import { Copy, RotateCcw, Share2, Download, Upload } from 'lucide-react';

export default function ActionBar({ showToast }) {
    const fileInputRef = useRef(null);
    const { clearAll, applySharedState } = useEngineState(useShallow(state => ({
        clearAll: state.clearAll,
        applySharedState: state.applySharedState
    })));
    
    // We only need lang/domain from config for translations
    const { lang, domain } = useEngineState(useShallow(state => ({
        lang: state.config.lang,
        domain: state.config.domain
    })));
    const t = getTranslation(lang, domain);

    const handleCopy = () => {
        const currentState = useEngineState.getState();
        const prompt = assembleFinalPrompt(currentState);
        if (!prompt) {
            showToast(t.toastNeedPrompt, 'warn');
            return;
        }
        copyToClipboard(prompt, 
            () => showToast(t.toastCopied),
            () => showToast(t.toastCopyFail, 'warn')
        );
    };

    const handleOpenAI = (aiName) => {
        const currentState = useEngineState.getState();
        // OpenAI-JSON is copy/API-oriented, not a chat-paste artifact — fall
        // back to Markdown for the AI deep-link buttons specifically (see
        // formatters/openaiJson.js).
        const isJsonTarget = currentState.config.hedef === 'openai-json';
        const prompt = assembleFinalPrompt(currentState, isJsonTarget ? { forceTarget: 'markdown' } : undefined);
        if (!prompt) {
            showToast(t.toastNeedPrompt, 'warn');
            return;
        }
        if (isJsonTarget) {
            showToast(t.toastTargetTextOnly, 'warn');
        }

        openInAI(aiName, prompt,
            () => showToast(t.toastUrlLimit, 'warn'),
            () => showToast(t.toastOpening)
        );
    };

    const handleShare = () => {
        const currentState = useEngineState.getState();
        const payload = serializeState(currentState, { includeTopic: true });
        const param = encodePayloadToParam(payload);
        const route = getDomain(currentState.config.domain).route;
        const url = `${window.location.origin}/${route}?share=${param}`;
        const isLong = url.length > 2000; // matches the spirit of aiRouter's own length guard
        copyToClipboard(url,
            () => showToast(isLong ? t.toastShareLong : t.toastShareCopied, isLong ? 'warn' : 'success'),
            () => showToast(t.toastCopyFail, 'warn')
        );
    };

    const handleExport = () => {
        const currentState = useEngineState.getState();
        const payload = serializeState(currentState, { includeTopic: true });
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prompter-${currentState.config.domain}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImportClick = () => fileInputRef.current?.click();

    const handleImportFile = (e) => {
        const file = e.target.files?.[0];
        e.target.value = ''; // allow re-selecting the same file next time
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const raw = JSON.parse(reader.result);
                const clean = sanitizePayload(raw, useEngineState.getState().config.lang);
                applySharedState(clean);
                showToast(t.toastImportSuccess);
            } catch {
                showToast(t.toastImportFail, 'warn');
            }
        };
        reader.onerror = () => showToast(t.toastImportFail, 'warn');
        reader.readAsText(file);
    };

    return (
        <div className="actions-bar" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginBottom: '16px' }}>
            {/* Row 1: Reset, Copy — preview compiles live now, no separate Generate step */}
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <button className="btn btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => { clearAll(); showToast(t.toastReset); }}>
                    <RotateCcw size={16} /> {t.btnReset}
                </button>
                <button className="btn btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={handleCopy}>
                    <Copy size={16} /> {t.btnCopy}
                </button>
            </div>
            
            {/* Row 2: AI Export Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', width: '100%' }}>
                <button className="btn btn-gemini" style={{ background: '#1e326c', color: '#fff', borderColor: '#1e326c', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 4px' }} onClick={() => handleOpenAI('gemini')}>
                    <SiGooglegemini size={14} /> Gemini
                </button>
                <button className="btn btn-secondary" style={{ background: '#10a37f', color: '#fff', borderColor: '#10a37f', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 4px' }} onClick={() => handleOpenAI('chatgpt')}>
                    <SiOpenaigym size={14} /> ChatGPT
                </button>
                <button className="btn btn-secondary" style={{ background: '#d97757', color: '#fff', borderColor: '#d97757', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 4px' }} onClick={() => handleOpenAI('claude')}>
                    <SiAnthropic size={14} /> Claude
                </button>
                <button className="btn btn-secondary" style={{ background: '#22b8cd', color: '#1a1a1a', borderColor: '#22b8cd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 4px', fontWeight: 600 }} onClick={() => handleOpenAI('perplexity')}>
                    <SiPerplexity size={14} /> Perplexity
                </button>
            </div>

            {/* Row 3: Share / Export / Import — config + selected modules, no backend */}
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <button className="btn btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem' }} onClick={handleShare} title={t.btnShare}>
                    <Share2 size={14} /> {t.btnShare}
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem' }} onClick={handleExport} title={t.btnExport}>
                    <Download size={14} /> {t.btnExport}
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem' }} onClick={handleImportClick} title={t.btnImport}>
                    <Upload size={14} /> {t.btnImport}
                </button>
                <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} style={{ display: 'none' }} />
            </div>
        </div>
    );
}
