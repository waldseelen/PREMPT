import { useMemo, useRef, useState } from 'react';
import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { assembleFinalPrompt, analyzePromptComplexity } from '../compiler/finalPromptAssembler';
import { copyToClipboard, openInAI } from '../utils/aiRouter';
import { serializeState, sanitizePayload, encodePayloadToParam } from '../utils/statePayload';
import { getDomain } from '../domains';
import { SiGooglegemini, SiAnthropic, SiPerplexity, SiOpenaigym } from '@icons-pack/react-simple-icons';
import { getTranslation } from '../locales/i18n';
import { Copy, RotateCcw, Share2, Download, Upload, X, ExternalLink, Bookmark, Hash, AlertTriangle, Check } from 'lucide-react';
import RecipesPanel from './RecipesPanel';

export default function ActionBar({ showToast }) {
    const fileInputRef = useRef(null);
    const [showGeminiModal, setShowGeminiModal] = useState(false);
    const [showRecipesModal, setShowRecipesModal] = useState(false);

    const { clearAll, applySharedState, config, selectedModules, injectedRules } = useEngineState(useShallow((state) => ({
        clearAll: state.clearAll,
        applySharedState: state.applySharedState,
        config: state.config,
        selectedModules: state.selectedModules,
        injectedRules: state.injectedRules
    })));
    const lang = config.lang;
    const domain = config.domain;
    const t = getTranslation(lang, domain);

    const stats = useMemo(() => {
        return analyzePromptComplexity({ config, selectedModules, injectedRules });
    }, [config, selectedModules, injectedRules]);

    const executeGeminiLaunch = () => {
        const currentState = useEngineState.getState();
        const isJsonTarget = currentState.config.hedef === 'openai-json';
        const prompt = assembleFinalPrompt(currentState, isJsonTarget ? { forceTarget: 'markdown' } : undefined);
        if (!prompt) return;

        openInAI('gemini', prompt,
            () => showToast('Gemini açıldı! Prompt panoya kopyalandı (Ctrl+V ile yapıştırın).', 'success'),
            (queryAttached) => {
                if (queryAttached) {
                    showToast('Gemini açılıyor (Prompt eklenti ile dolduruluyor)', 'success');
                } else {
                    showToast('Gemini açıldı! Prompt PANOYA KOPYALANDI — Kutuda Ctrl+V yapın.', 'success');
                }
            }
        );
    };

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
        const isJsonTarget = currentState.config.hedef === 'openai-json';
        const prompt = assembleFinalPrompt(currentState, isJsonTarget ? { forceTarget: 'markdown' } : undefined);
        if (!prompt) {
            showToast(t.toastNeedPrompt, 'warn');
            return;
        }
        if (isJsonTarget) {
            showToast(t.toastTargetTextOnly, 'warn');
        }

        if (aiName === 'gemini') {
            const hasSeenNotice = localStorage.getItem('prempt_seen_gemini_notice');
            if (!hasSeenNotice) {
                localStorage.setItem('prempt_seen_gemini_notice', 'true');
                setShowGeminiModal(true);
                return;
            }
        }

        const aiNames = { chatgpt: 'ChatGPT', claude: 'Claude', gemini: 'Gemini', perplexity: 'Perplexity' };
        const name = aiNames[aiName] || aiName;

        openInAI(aiName, prompt,
            () => showToast(`${name} açıldı! Prompt panoya kopyalandı (Ctrl+V ile yapıştırın).`, 'success'),
            (queryAttached) => {
                if (queryAttached) {
                    showToast(`${name} açılıyor (Prompt doğrudan aktarıldı)`, 'success');
                } else {
                    showToast(`${name} açıldı! Prompt PANOYA KOPYALANDI — Kutuda Ctrl+V (Yapıştır) yapın.`, 'success');
                }
            }
        );
    };

    const handleShare = () => {
        const currentState = useEngineState.getState();
        const payload = serializeState(currentState, { includeTopic: true });
        const param = encodePayloadToParam(payload);
        const route = getDomain(currentState.config.domain).route;
        const url = `${window.location.origin}/${route}?share=${param}`;
        const isLong = url.length > 2000;
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
        e.target.value = '';
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
        <div className="actions-bar advanced-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginBottom: '16px' }}>
            {/* Live Token & URL Safety Status Badge */}
            <div className="action-live-token-bar" role="status" aria-live="polite">
                <div className={`action-token-badge ${stats.isTooLongForUrl ? 'is-warning' : 'is-safe'}`}>
                    <Hash size={12} className="badge-hash-icon" aria-hidden="true" />
                    <span className="badge-tokens-text">~{stats.tokens} tok</span>
                    <span className="badge-separator">·</span>
                    {stats.isTooLongForUrl ? (
                        <span className="badge-status-text warning">
                            <AlertTriangle size={12} aria-hidden="true" />
                            {t.urlExceeded || (lang === 'en' ? 'URL Limit Exceeded (Will Copy)' : 'URL Sınırı Aşıldı (Kopyalanacak)')}
                        </span>
                    ) : (
                        <span className="badge-status-text safe">
                            <Check size={12} aria-hidden="true" />
                            {t.urlSafe || (lang === 'en' ? 'URL Safe' : 'URL Güvenli')}
                        </span>
                    )}
                </div>
            </div>

            {/* Row 1: Reset, Copy */}
            <div className="advanced-action-row advanced-primary-actions" style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <button className="btn btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => { clearAll(); showToast(t.toastReset); }}>
                    <RotateCcw size={16} /> {t.btnReset}
                </button>
                <button className="btn btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={handleCopy}>
                    <Copy size={16} /> {t.btnCopy}
                </button>
            </div>

            {/* Row 2: AI Export Buttons */}
            <div className="advanced-action-row advanced-ai-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', width: '100%' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <button className="btn btn-gemini" style={{ width: '100%', background: '#1e326c', color: '#fff', borderColor: '#1e326c', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 4px', fontWeight: 500 }} onClick={() => handleOpenAI('gemini')}>
                        <SiGooglegemini size={14} /> Gemini
                    </button>
                    <a
                        href="https://chromewebstore.google.com/detail/gemini-url-prompt/kdbgjkfdooaiompgeckjbegnnccchmma"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            position: 'absolute',
                            top: '-6px',
                            right: '2px',
                            background: '#3b82f6',
                            color: '#ffffff',
                            borderRadius: '50%',
                            width: '16px',
                            height: '16px',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            zIndex: 10
                        }}
                        title="Gemini URL doldurma eklentisini yüklemek için tıklayın (Chrome Web Store)"
                    >
                        <ExternalLink size={10} aria-hidden="true" />
                    </a>
                </div>
                <button className="btn btn-secondary" style={{ background: '#087055', color: '#ffffff', borderColor: '#087055', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 4px', fontWeight: 600 }} onClick={() => handleOpenAI('chatgpt')}>
                    <SiOpenaigym size={14} /> ChatGPT
                </button>
                <button className="btn btn-secondary" style={{ background: '#b54c2d', color: '#ffffff', borderColor: '#b54c2d', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 4px', fontWeight: 600 }} onClick={() => handleOpenAI('claude')}>
                    <SiAnthropic size={14} /> Claude
                </button>
                <button className="btn btn-secondary" style={{ background: '#22b8cd', color: '#090d16', borderColor: '#22b8cd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', padding: '8px 4px', fontWeight: 600 }} onClick={() => handleOpenAI('perplexity')}>
                    <SiPerplexity size={14} /> Perplexity
                </button>
            </div>

            {/* Row 3: Share / Export / Import / Recipes */}
            <div className="advanced-action-row advanced-utility-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', width: '100%' }}>
                <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.78rem', padding: '8px 4px' }} onClick={handleShare} title={t.btnShare}>
                    <Share2 size={13} /> {t.btnShare}
                </button>
                <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.78rem', padding: '8px 4px' }} onClick={handleExport} title={t.btnExport}>
                    <Download size={13} /> {t.btnExport}
                </button>
                <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.78rem', padding: '8px 4px' }} onClick={handleImportClick} title={t.btnImport}>
                    <Upload size={13} /> {t.btnImport}
                </button>
                <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.78rem', padding: '8px 4px' }} onClick={() => setShowRecipesModal(true)} title={t.recipesTitle}>
                    <Bookmark size={13} /> {t.recipesTitle || 'Tarifler'}
                </button>
                <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImportFile} style={{ display: 'none' }} />
            </div>

            {/* Recipes Modal */}
            {showRecipesModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 999999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div
                        className="modal-card"
                        role="dialog"
                        aria-modal="true"
                        style={{
                            background: 'var(--bg-card, #0f172a)',
                            border: '1px solid var(--border-strong, rgba(255,255,255,0.18))',
                            borderRadius: '16px',
                            padding: '20px',
                            maxWidth: '480px',
                            width: '100%',
                            maxHeight: 'min(90vh, 90dvh)',
                            overflowY: 'auto',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            color: 'var(--text-primary)',
                            position: 'relative'
                        }}
                    >
                        <RecipesPanel showToast={showToast} onClose={() => setShowRecipesModal(false)} />
                    </div>
                </div>
            )}

            {/* Gemini Extension Modal */}
            {showGeminiModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 999999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div
                        className="modal-card"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="gemini-modal-title"
                        style={{
                            background: 'var(--bg-card, #0f172a)',
                            border: '1px solid var(--border-strong, rgba(255,255,255,0.18))',
                            borderRadius: '16px',
                            padding: '24px',
                            maxWidth: '520px',
                            width: '100%',
                            maxHeight: 'min(90vh, 90dvh)',
                            overflowY: 'auto',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            color: 'var(--text-primary)',
                            position: 'relative'
                        }}
                    >
                        <button
                            onClick={() => setShowGeminiModal(false)}
                            aria-label={lang === 'en' ? 'Close dialog' : 'Pencereyi kapat'}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ background: '#1e326c', padding: '10px', borderRadius: '12px', color: '#fff', display: 'flex' }}>
                                <SiGooglegemini size={24} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                                    {lang === 'en' ? 'Google Gemini URL Integration' : 'Google Gemini URL Entegrasyonu'}
                                </h3>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {lang === 'en' ? 'Chrome Web Store Extension Guide' : 'Chrome Web Store Eklenti Rehberi'}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.82rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                            {lang === 'en' ? (
                                <div style={{ background: 'rgba(6,182,212,0.08)', borderLeft: '3px solid #06b6d4', padding: '12px', borderRadius: '6px' }}>
                                    To <strong>automatically pre-fill prompts</strong> in Google Gemini via URL, you can install the free <em>Gemini URL Prompt</em> Chrome extension.
                                    <br />
                                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', display: 'block' }}>
                                        (Without the extension, no worries! Your prompt is automatically copied to your clipboard — simply press <strong>Ctrl+V</strong> in Gemini.)
                                    </span>
                                </div>
                            ) : (
                                <div style={{ background: 'rgba(99,102,241,0.08)', borderLeft: '3px solid #6366f1', padding: '12px', borderRadius: '6px' }}>
                                    Gemini web uygulamasında prompt'un <strong>otomatik dolması için</strong> ücretsiz <em>Gemini URL Prompt</em> Chrome eklentisini kurabilirsiniz.
                                    <br />
                                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', display: 'block' }}>
                                        (Eklentiniz olmasa bile sorun yok! Prompt'unuz panoya kopyalanır, açılan Gemini kutusuna <strong>Ctrl+V</strong> ile yapıştırabilirsiniz.)
                                    </span>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                            <a
                                href="https://chromewebstore.google.com/detail/gemini-url-prompt/kdbgjkfdooaiompgeckjbegnnccchmma"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem', padding: '10px 14px' }}
                            >
                                <ExternalLink size={16} /> {lang === 'en' ? 'Install Extension' : 'Eklentiyi Yükle'}
                            </a>
                            <button
                                onClick={() => {
                                    setShowGeminiModal(false);
                                    executeGeminiLaunch();
                                }}
                                className="btn btn-secondary"
                                style={{ flex: 1, fontSize: '0.82rem', padding: '10px 14px' }}
                            >
                                {lang === 'en' ? 'Continue to Gemini' : 'Devam Et & Aç'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
