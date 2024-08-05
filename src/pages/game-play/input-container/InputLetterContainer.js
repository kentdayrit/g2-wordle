import React, { useRef, useState } from 'react';
import InputLetterBox from './InputLetterBox';
import './InputLetterContainer.css';

const InputLetterContainer = ({ numBoxes, secretWord, onLettersChange, isLastRow, onReset }) => {
    const [isDisabled, setIsDisabled] = useState(false)
    const [letters, setLetters] = useState(Array(numBoxes).fill(''));
    const [letterStatus, setLetterStatus] = useState(Array(numBoxes).fill('default'));
    const secretWordArray = secretWord.split('')
    const inputRefs = useRef([]);
    const containerRef = useRef(null);

    // console.log(secretWordArray);
    const handleChange = (index, value) => {
        const newLetters = [...letters];
        newLetters[index] = value;
        setLetters(newLetters);
        onLettersChange(newLetters);

        if (value && index < numBoxes - 1) {
            focusNext(index);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const allNonEmpty = letters.every(element => element !== '');
            if(!allNonEmpty) {
                return
            }
            const updatedLetterStatus = [...letterStatus];

            for (let i = 0; i < secretWordArray.length; i++) {
                var letter = letters[i]
                var secret = secretWordArray[i]
                if (letter === secret) {
                    updatedLetterStatus[i] = "correct";
                } else {
                    const exists = secretWordArray.includes(letter);
                    updatedLetterStatus[i] = exists ? "present" : "absent";
                }
            }
            setLetterStatus(updatedLetterStatus);
            setIsDisabled(true);

            if (!isLastRow) {
                focusNextRow();
            }
            if (updatedLetterStatus.every(status => status === "correct")) {
                setIsDisabled(true);
            }
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            const newLetters = [...letters];
            if (letters[index] === '') {
                if (index > 0) {
                    inputRefs.current[index - 1].focus();
                }
            }
            newLetters[index] = '';
            setLetters(newLetters);
        }
    };

    const focusNextRow = () => {
        const container = containerRef.current;
        if (container) {
            const nextRow = container.nextElementSibling;
            if (nextRow) {
                const firstInput = nextRow.querySelector('input');
                if (firstInput) {
                    firstInput.focus();
                }
            }
        }
    };

    const focusNext = (currentIndex) => {
        if (currentIndex < inputRefs.current.length - 1) {
            inputRefs.current[currentIndex + 1].focus();
        }
    };

    return (    
        <div ref={containerRef} className="input-letter-box-container">
            {letters.map((letter, index) => (
                <InputLetterBox
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    onChange={(value) => handleChange(index, value)}
                    value={letter}
                    color= {letterStatus[index]}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={isDisabled}
                />
            ))}
        </div>
    );
};

export default InputLetterContainer;
