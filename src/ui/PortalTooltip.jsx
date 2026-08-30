import { createPortal } from 'react-dom';

/**
 * Renders a tooltip via createPortal directly into document.body,
 * positioning it relative to the target element's bounding rect.
 * Completely immune to parent overflow: hidden/auto scroll clipping.
 */
export default function PortalTooltip({ targetRect, children, isOpen }) {
    if (!isOpen || !targetRect || typeof document === 'undefined') return null;

    const viewportWidth = window.innerWidth;
    const width = Math.min(300, viewportWidth - 24);

    // Calculate vertical position: prefer above, fallback to below if near screen top
    const spaceAbove = targetRect.top;
    const placeBelow = spaceAbove < 170;
    const top = placeBelow ? targetRect.bottom + 8 : targetRect.top - 8;
    const transform = placeBelow ? 'translateX(-50%)' : 'translateX(-50%) translateY(-100%)';

    // Calculate horizontal center, clamped to viewport boundaries
    const centerX = targetRect.left + targetRect.width / 2;
    const left = Math.max(width / 2 + 12, Math.min(centerX, viewportWidth - width / 2 - 12));

    return createPortal(
        <div
            className="module-tooltip portal-tooltip"
            style={{
                position: 'fixed',
                top: `${top}px`,
                left: `${left}px`,
                transform,
                width: `${width}px`,
                opacity: 1,
                visibility: 'visible',
                pointerEvents: 'none',
                zIndex: 999999
            }}
        >
            {children}
        </div>,
        document.body
    );
}
