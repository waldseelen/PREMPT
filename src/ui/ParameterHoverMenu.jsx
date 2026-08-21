import { Info } from 'lucide-react';

export default function ParameterHoverMenu({ label, options, placement = 'tooltip-down' }) {
    if (!options?.length) return null;

    return (
        <span
            className="parameter-hover-trigger"
            tabIndex="0"
            aria-label={label}
        >
            <Info size={14} aria-hidden="true" />
            <span className={`config-tooltip ${placement}`} role="tooltip">
                <span className="parameter-hover-title">{label}</span>
                <ul className="tooltip-list">
                    {options.map((option) => (
                        <li key={option.id}>
                            <strong>{option.label}:</strong>
                            <span>{option.description}</span>
                        </li>
                    ))}
                </ul>
            </span>
        </span>
    );
}
