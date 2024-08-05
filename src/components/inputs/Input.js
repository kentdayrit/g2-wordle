import React from 'react';
import './Input.css';

const Input = ({ type, value, onChange, placeholder, maxLength, label, disabled }) => {
    const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className="input-wrapper">
            {label && <label htmlFor={inputId} className="input-label">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                className="custom-input"
                disabled={disabled}
            />
        </div>

    );
};

export default Input;
