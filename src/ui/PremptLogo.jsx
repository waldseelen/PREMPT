/**
 * PremptLogo — Ultra-minimalist Linear/Notion style vector emblem.
 * Pure geometry, zero text/name inside symbol.
 * 100% self-contained theme-aware SVG rendering.
 */
export default function PremptLogo({ size = 34, style = {} }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                borderRadius: '10px',
                flexShrink: 0,
                display: 'inline-block',
                verticalAlign: 'middle',
                ...style
            }}
            className="prempt-vector-logo"
        >
            {/* Squircle Background container */}
            <rect
                x="1"
                y="1"
                width="62"
                height="62"
                rx="16"
                fill="var(--bg-card, #090d16)"
                stroke="var(--border-strong, rgba(255, 255, 255, 0.2))"
                strokeWidth="1.8"
            />

            {/* Architectural Geometric Mark (Pure Line Precision) */}
            <g transform="translate(12, 12)">
                {/* Outer Diamond Shield */}
                <path
                    d="M 20 4 L 36 20 L 20 36 L 4 20 Z"
                    stroke="var(--text-primary, #ffffff)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Inner Parametric Node & Axis */}
                <path
                    d="M 20 10 L 30 20 L 20 30 L 10 20 Z"
                    stroke="var(--text-secondary, #94a3b8)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Center Core Node Dot */}
                <circle
                    cx="20"
                    cy="20"
                    r="2.8"
                    fill="var(--text-primary, #ffffff)"
                />
                {/* Corner Anchor Guides */}
                <line x1="20" y1="4" x2="20" y2="10" stroke="var(--text-secondary, #94a3b8)" strokeWidth="2" />
                <line x1="20" y1="30" x2="20" y2="36" stroke="var(--text-secondary, #94a3b8)" strokeWidth="2" />
                <line x1="4" y1="20" x2="10" y2="20" stroke="var(--text-secondary, #94a3b8)" strokeWidth="2" />
                <line x1="30" y1="20" x2="36" y2="20" stroke="var(--text-secondary, #94a3b8)" strokeWidth="2" />
            </g>
        </svg>
    );
}
