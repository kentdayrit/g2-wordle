
import React, { forwardRef } from 'react';
import './InputLetterBox.css';

const InputLetterBox = forwardRef(({ value, onChange, onFocusNext, onKeyDown, disabled, color }, ref) => {
    const handleChange = (e) => {
        const inputValue = e.target.value.toUpperCase();
        if (/^[A-Z]?$/.test(inputValue)) {
            onChange(inputValue);
        }
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            maxLength="1"
            disabled={disabled}
            className={`input-letter-box ${color}`}
            ref={ref}
        />
    );
});

export default InputLetterBox;
