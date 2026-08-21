import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function ParameterSelect({ id, label, value, options, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedId, setHighlightedId] = useState(value);
    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const optionRefs = useRef({});

    const selectedOption = options.find((option) => option.id === value) || options[0];
    const selectedLabel = selectedOption?.label || value;

    useEffect(() => {
        if (!isOpen) return undefined;

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
        onChange(optionId);
        setHighlightedId(optionId);
        closeMenu();
    };

    const focusOption = (optionId) => {
        setHighlightedId(optionId);
        optionRefs.current[optionId]?.focus();
    };

    const moveHighlight = (direction) => {
        const currentIndex = Math.max(0, options.findIndex((option) => option.id === highlightedId));
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
            if (isOpen && highlightedId) selectOption(highlightedId);
            else {
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
        }
    };

    return (
        <div ref={rootRef} className={`parameter-select ${isOpen ? 'is-open' : ''}`}>
            <button
                ref={triggerRef}
                id={id}
                type="button"
                className="parameter-select-trigger"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={`${id}-options`}
                onClick={() => {
                    setHighlightedId(value);
                    setIsOpen((open) => !open);
                }}
                onKeyDown={handleTriggerKeyDown}
            >
                <span>{selectedLabel}</span>
                <ChevronDown size={15} aria-hidden="true" />
            </button>

            {isOpen && (
                <div id={`${id}-options`} className="parameter-select-menu" role="listbox" aria-label={label}>
                    {options.map((option) => {
                        const isSelected = option.id === value;
                        const isHighlighted = option.id === highlightedId;
                        return (
                            <button
                                key={option.id}
                                ref={(node) => {
                                    optionRefs.current[option.id] = node;
                                }}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                className={`parameter-select-option ${isSelected ? 'is-selected' : ''} ${isHighlighted ? 'is-highlighted' : ''}`}
                                onMouseEnter={() => setHighlightedId(option.id)}
                                onFocus={() => setHighlightedId(option.id)}
                                onClick={() => selectOption(option.id)}
                                onKeyDown={(event) => handleOptionKeyDown(event, option.id)}
                            >
                                <span className="parameter-option-main">
                                    <span className="parameter-option-label">{option.label}</span>
                                    {isSelected && <Check size={14} aria-hidden="true" />}
                                </span>
                                <span className="parameter-option-description">{option.description}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
