import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

const VIEWPORT_GUTTER = 12;
const TOOLTIP_WIDTH = 340;

function getTooltipPosition(trigger, placement) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const width = Math.min(TOOLTIP_WIDTH, viewportWidth - VIEWPORT_GUTTER * 2);
    const preferredRight = trigger.right + 10;
    const left = preferredRight + width <= viewportWidth - VIEWPORT_GUTTER
        ? preferredRight
        : Math.max(VIEWPORT_GUTTER, trigger.left - width - 10);
    const preferredTop = placement === 'tooltip-down' ? trigger.top : trigger.bottom;
    const maxTop = Math.max(VIEWPORT_GUTTER, viewportHeight - 380);

    return {
        left: Math.round(Math.max(VIEWPORT_GUTTER, Math.min(left, viewportWidth - width - VIEWPORT_GUTTER))),
        top: Math.round(Math.max(VIEWPORT_GUTTER, Math.min(preferredTop, maxTop))),
        width,
        placement
    };
}

export default function ParameterHoverMenu({ label, options, placement = 'tooltip-down' }) {
    const triggerRef = useRef(null);
    const tooltipId = useId();
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(null);

    const updatePosition = useCallback(() => {
        const trigger = triggerRef.current?.getBoundingClientRect();
        if (!trigger) return;
        setPosition(getTooltipPosition(trigger, placement));
    }, [placement]);

    const openTooltip = () => {
        setOpen(true);
        requestAnimationFrame(updatePosition);
    };

    const closeTooltip = () => {
        setOpen(false);
        setPosition(null);
    };

    useEffect(() => {
        if (!open) return undefined;

        const handleViewportChange = () => updatePosition();
        window.addEventListener('resize', handleViewportChange);
        window.addEventListener('scroll', handleViewportChange, true);
        return () => {
            window.removeEventListener('resize', handleViewportChange);
            window.removeEventListener('scroll', handleViewportChange, true);
        };
    }, [open, updatePosition]);

    if (!options?.length) return null;

    return (
        <>
            <span
                ref={triggerRef}
                className="parameter-hover-trigger"
                tabIndex={0}
                aria-label={label}
                aria-describedby={open ? tooltipId : undefined}
                onMouseEnter={openTooltip}
                onMouseLeave={closeTooltip}
                onFocus={openTooltip}
                onBlur={closeTooltip}
            >
                <Info size={14} aria-hidden="true" />
            </span>
            {open && position && createPortal(
                <div
                    id={tooltipId}
                    className="parameter-hover-portal"
                    role="tooltip"
                    style={{
                        left: position.left,
                        top: position.top,
                        width: position.width
                    }}
                >
                    <div className="parameter-hover-title">{label}</div>
                    <ul className="tooltip-list">
                        {options.map((option) => (
                            <li key={option.id}>
                                <strong>{option.label}</strong>
                                <span>{option.description}</span>
                            </li>
                        ))}
                    </ul>
                </div>,
                document.body
            )}
        </>
    );
}
