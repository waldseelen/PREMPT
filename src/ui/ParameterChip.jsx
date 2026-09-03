import { useEffect, useRef, useState, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function ParameterChip({
    icon: Icon,
    label,
    value,
    options = [],
    onChange,
    align = 'left'
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedId, setHighlightedId] = useState(value);
    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const optionRefs = useRef({});
    const popoverId = useId();

    const selectedOption = options.find((opt) => opt.id === value) || options[0];
    const selectedLabel = selectedOption?.label || value;

    // Close on outside pointer click or touch
    useEffect(() => {
        if (!isOpen) return;

        const handleOutsidePointer = (event) => {
            if (!rootRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleOutsidePointer);
        return () => document.removeEventListener('pointerdown', handleOutsidePointer);
    }, [isOpen]);

    const closeMenu = () => {
        setIsOpen(false);
        triggerRef.current?.focus();
    };

    const selectOption = (optionId) => {
        onChange?.(optionId);
        setHighlightedId(optionId);
        closeMenu();
    };

    const focusOption = (optionId) => {
        setHighlightedId(optionId);
        optionRefs.current[optionId]?.focus();
    };

    const moveHighlight = (direction) => {
        const currentIndex = Math.max(0, options.findIndex((opt) => opt.id === highlightedId));
        const nextIndex = (currentIndex + direction + options.length) % options.length;
        const nextId = options[nextIndex]?.id;
        if (nextId) focusOption(nextId);
    };

    const handleTriggerKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!isOpen) {
                setHighlightedId(value);
                setIsOpen(true);
                return;
            }
            moveHighlight(event.key === 'ArrowDown' ? 1 : -1);
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (isOpen && highlightedId) {
                selectOption(highlightedId);
            } else {
                setHighlightedId(value);
                setIsOpen(true);
            }
        } else if (event.key === 'Escape' && isOpen) {
            event.preventDefault();
            closeMenu();
        }
    };

    const handleOptionKeyDown = (event, optionId) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            moveHighlight(event.key === 'ArrowDown' ? 1 : -1);
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectOption(optionId);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            closeMenu();
        } else if (event.key === 'Tab') {
            setIsOpen(false);
        }
    };

    return (
        <div ref={rootRef} className={`parameter-chip-container ${isOpen ? 'is-open' : ''}`}>
            <button
                ref={triggerRef}
                type="button"
                className="parameter-chip-trigger"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={popoverId}
                aria-label={`${label}: ${selectedLabel}`}
                onClick={() => {
                    setHighlightedId(value);
                    setIsOpen((prev) => !prev);
                }}
                onKeyDown={handleTriggerKeyDown}
            >
                {Icon && <Icon size={13} className="parameter-chip-icon" aria-hidden="true" />}
                <span className="parameter-chip-label">{label}:</span>
                <span className="parameter-chip-value">{selectedLabel}</span>
                <ChevronDown size={13} className="parameter-chip-chevron" aria-hidden="true" />
            </button>

            {isOpen && (
                <div
                    id={popoverId}
                    className={`parameter-chip-popover align-${align}`}
                    role="listbox"
                    aria-label={label}
                >
                    <div className="parameter-popover-header">
                        <span className="parameter-popover-title">{label}</span>
                    </div>
                    <div className="parameter-popover-options">
                        {options.map((option) => {
                            const isSelected = option.id === value;
                            const isHighlighted = option.id === highlightedId;
                            return (
                                <button
                                    key={option.id}
                                    ref={(node) => {
                                        if (node) optionRefs.current[option.id] = node;
                                    }}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    className={`parameter-popover-option ${isSelected ? 'is-selected' : ''} ${isHighlighted ? 'is-highlighted' : ''}`}
                                    onMouseEnter={() => setHighlightedId(option.id)}
                                    onFocus={() => setHighlightedId(option.id)}
                                    onClick={() => selectOption(option.id)}
                                    onKeyDown={(e) => handleOptionKeyDown(e, option.id)}
                                >
                                    <div className="popover-option-header">
                                        <span className="popover-option-label">{option.label}</span>
                                        {isSelected && <Check size={13} className="popover-option-check" aria-hidden="true" />}
                                    </div>
                                    {option.description && (
                                        <span className="popover-option-description">{option.description}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
