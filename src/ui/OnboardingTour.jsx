import { useState, useEffect, useRef, useMemo } from 'react';
import { useEngineState } from '../store/engineState';
import { getTranslation } from '../locales/i18n';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function OnboardingTour() {
    const { config, showTour, completeTour } = useEngineState();
    const [currentStep, setCurrentStep] = useState(0);
    const [coords, setCoords] = useState(null);
    const [frameRects, setFrameRects] = useState(null);
    const [prevShowTour, setPrevShowTour] = useState(showTour);
    const cardRef = useRef(null);

    const t = getTranslation(config.lang, config.domain);
    const steps = useMemo(() => t.tourSteps || [], [t.tourSteps]);

    // 4 non-overlapping strips tiling the viewport around `rect` (padded),
    // so the darkened/blurred overlay geometrically cannot cover the
    // spotlighted element -- no z-index/stacking-context reliance needed.
    const buildFrameRects = (rect, pad = 8) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const hole = {
            top: Math.max(0, rect.top - pad),
            left: Math.max(0, rect.left - pad),
            bottom: Math.min(vh, rect.bottom + pad),
            right: Math.min(vw, rect.right + pad)
        };
        return [
            { top: 0, left: 0, width: vw, height: hole.top }, // above
            { top: hole.bottom, left: 0, width: vw, height: Math.max(0, vh - hole.bottom) }, // below
            { top: hole.top, left: 0, width: hole.left, height: hole.bottom - hole.top }, // left of hole
            { top: hole.top, left: hole.right, width: Math.max(0, vw - hole.right), height: hole.bottom - hole.top } // right of hole
        ];
    };

    // Reset step when the tour is (re)launched. Adjusting state directly
    // during render (rather than in a useEffect) avoids an extra render pass.
    if (showTour !== prevShowTour) {
        setPrevShowTour(showTour);
        if (showTour) {
            setCurrentStep(0);
        }
    }

    // Handle spotlight classes and coordinates calculation
    useEffect(() => {
        if (!showTour || steps.length === 0) return;

        const step = steps[currentStep];
        const selector = step.selector;
        const element = document.querySelector(selector);

        // Clean up previous highlights
        document.querySelectorAll('.tour-highlighted').forEach(el => {
            el.classList.remove('tour-highlighted');
        });

        if (element && selector !== 'body') {
            element.classList.add('tour-highlighted');
            
            // Gently scroll target into center view
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            const updatePosition = () => {
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
                    // Position floating card relative to highlighted block using viewport-relative 'fixed' layout
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
            };

            // Calculate initially and attach listeners
            updatePosition();
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition);
            return () => {
                window.removeEventListener('resize', updatePosition);
                window.removeEventListener('scroll', updatePosition);
                element.classList.remove('tour-highlighted');
            };
        } else {
            // Screen-centered fallback for welcome step. Wrapped the same way
            // updatePosition() is above, rather than called directly, so this
            // stays a DOM-measurement-triggered update, not a render-body one.
            const applyFallbackCoords = () => {
                setCoords({
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '380px',
                    maxWidth: 'calc(100% - 32px)',
                    zIndex: 10005
                });
                // No specific element to spotlight -- one full-viewport frame.
                setFrameRects([{ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }]);
            };
            applyFallbackCoords();
        }
    }, [currentStep, showTour, steps]);

    if (!showTour || steps.length === 0) return null;

    const step = steps[currentStep];
    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;

    const handleNext = () => {
        if (isLast) {
            localStorage.setItem('prompter-tour-completed', 'true');
            completeTour();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (!isFirst) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSkip = () => {
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
                    <h3>{step.title}</h3>
                    <button className="tour-close-btn" onClick={handleSkip} aria-label={t.tour.btnSkip}>
                        <X size={16} />
                    </button>
                </div>
                <div className="tour-card-body">
                    <p>{step.content}</p>
                </div>
                <div className="tour-card-footer">
                    <div className="tour-dots">
                        {steps.map((_, idx) => (
                            <span 
                                key={idx} 
                                className={`tour-dot ${idx === currentStep ? 'active' : ''}`}
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
                                {t.tour.btnSkip}
                            </button>
                        )}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {!isFirst && (
                                <button className="tour-btn-outline" onClick={handleBack}>
                                    <ChevronLeft size={14} style={{ marginRight: '4px' }} />
                                    {t.tour.btnBack}
                                </button>
                            )}
                            <button className="tour-btn-primary" onClick={handleNext}>
                                {isLast ? t.tour.btnFinish : t.tour.btnNext}
                                {!isLast && <ChevronRight size={14} style={{ marginLeft: '4px' }} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
