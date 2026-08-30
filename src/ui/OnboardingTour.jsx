import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function OnboardingTour() {
    const { config, showTour, completeTour } = useEngineState(useShallow((state) => ({
        config: state.config,
        showTour: state.showTour,
        completeTour: state.completeTour
    })));

    const [currentStep, setCurrentStep] = useState(0);
    const [coords, setCoords] = useState(null);
    const [frameRects, setFrameRects] = useState(null);
    const cardRef = useRef(null);

    const t = getTranslation(config.lang, config.domain);
    const steps = useMemo(() => t.tourSteps || [], [t.tourSteps]);
    const tourStrings = t.tour || {
        btnSkip: 'Geç',
        btnNext: 'Sonraki',
        btnBack: 'Geri',
        btnFinish: 'Bitir',
        btnReplay: 'Kullanım Turu'
    };

    const buildFrameRects = useCallback((rect, pad = 8) => {
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
        const hole = {
            top: Math.max(0, rect.top - pad),
            left: Math.max(0, rect.left - pad),
            bottom: Math.min(vh, rect.bottom + pad),
            right: Math.min(vw, rect.right + pad)
        };
        return [
            { top: 0, left: 0, width: vw, height: hole.top },
            { top: hole.bottom, left: 0, width: vw, height: Math.max(0, vh - hole.bottom) },
            { top: hole.top, left: 0, width: hole.left, height: hole.bottom - hole.top },
            { top: hole.top, left: hole.right, width: Math.max(0, vw - hole.right), height: hole.bottom - hole.top }
        ];
    }, []);

    // Handle spotlight classes and coordinates calculation
    useEffect(() => {
        if (!showTour || steps.length === 0) return undefined;

        const safeIndex = Math.min(Math.max(0, currentStep), steps.length - 1);
        const step = steps[safeIndex];
        if (!step) return undefined;

        const selector = step.selector;
        const element = selector && selector !== 'body' ? document.querySelector(selector) : null;

        // Clean up previous highlights
        document.querySelectorAll('.tour-highlighted').forEach((el) => {
            el.classList.remove('tour-highlighted');
        });

        const updatePosition = () => {
            if (element) {
                element.classList.add('tour-highlighted');
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const rect = element.getBoundingClientRect();
                const isMobile = window.innerWidth < 768;
                setFrameRects(buildFrameRects(rect));

                if (isMobile) {
                    setCoords({
                        position: 'fixed',
                        bottom: '24px',
                        left: '16px',
                        right: '16px',
                        width: 'auto',
                        maxWidth: 'none',
                        zIndex: 10005
                    });
                } else {
                    if (selector === '.sidebar') {
                        setCoords({
                            position: 'fixed',
                            top: `${rect.top}px`,
                            left: `${rect.right + 20}px`,
                            width: '320px',
                            zIndex: 10005
                        });
                    } else if (selector === '.main-content') {
                        setCoords({
                            position: 'fixed',
                            top: `${rect.top + 20}px`,
                            left: `${rect.left + rect.width / 2}px`,
                            transform: 'translateX(-50%)',
                            width: '320px',
                            zIndex: 10005
                        });
                    } else if (selector === '.right-sidebar') {
                        setCoords({
                            position: 'fixed',
                            top: `${rect.top}px`,
                            left: `${rect.left - 340}px`,
                            width: '320px',
                            zIndex: 10005
                        });
                    } else if (selector === '.domain-switcher-container' || selector === '.domain-switch') {
                        setCoords({
                            position: 'fixed',
                            top: `${rect.bottom + 16}px`,
                            left: `${rect.left}px`,
                            width: '320px',
                            zIndex: 10005
                        });
                    } else {
                        setCoords({
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '360px',
                            zIndex: 10005
                        });
                    }
                }
            } else {
                setCoords({
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '380px',
                    maxWidth: 'calc(100% - 32px)',
                    zIndex: 10005
                });
                setFrameRects([{ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }]);
            }
        };

        const frameId = requestAnimationFrame(updatePosition);
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
            if (element) {
                element.classList.remove('tour-highlighted');
            }
        };
    }, [currentStep, showTour, steps, buildFrameRects]);

    if (!showTour || steps.length === 0) return null;

    const safeIndex = Math.min(Math.max(0, currentStep), steps.length - 1);
    const step = steps[safeIndex] || {};
    const isFirst = safeIndex === 0;
    const isLast = safeIndex === steps.length - 1;

    const handleNext = () => {
        if (isLast) {
            setCurrentStep(0);
            localStorage.setItem('prompter-tour-completed', 'true');
            completeTour();
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (!isFirst) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSkip = () => {
        setCurrentStep(0);
        localStorage.setItem('prompter-tour-completed', 'true');
        completeTour();
    };

    return (
        <>
            {(frameRects || []).map((r, idx) => (
                <div
                    key={idx}
                    className="tour-overlay-frame"
                    style={{ top: `${r.top}px`, left: `${r.left}px`, width: `${r.width}px`, height: `${r.height}px` }}
                />
            ))}
            <div
                className="tour-card"
                ref={cardRef}
                style={coords || { display: 'none' }}
            >
                <div className="tour-card-header">
                    <h3>{step.title || 'PREMPT'}</h3>
                    <button className="tour-close-btn" onClick={handleSkip} aria-label={tourStrings.btnSkip}>
                        <X size={16} />
                    </button>
                </div>
                <div className="tour-card-body">
                    <p>{step.desc || step.content || ''}</p>
                </div>
                <div className="tour-card-footer">
                    <div className="tour-dots">
                        {steps.map((_, idx) => (
                            <span 
                                key={idx} 
                                className={`tour-dot ${idx === safeIndex ? 'active' : ''}`}
                                onClick={() => setCurrentStep(idx)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setCurrentStep(idx);
                                    }
                                }}
                                aria-label={`Step ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <div className="tour-actions">
                        {!isLast && (
                            <button className="tour-btn-text" onClick={handleSkip}>
                                {tourStrings.btnSkip}
                            </button>
                        )}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {!isFirst && (
                                <button className="tour-btn-outline" onClick={handleBack}>
                                    <ChevronLeft size={14} style={{ marginRight: '4px' }} />
                                    {tourStrings.btnBack}
                                </button>
                            )}
                            <button className="tour-btn-primary" onClick={handleNext}>
                                {isLast ? tourStrings.btnFinish : tourStrings.btnNext}
                                {!isLast && <ChevronRight size={14} style={{ marginLeft: '4px' }} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
