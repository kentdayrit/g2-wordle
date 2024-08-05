import React, { useState, useEffect} from 'react';
import './GamePlay';
import Header from '../components/layouts/Header';
import InputLetterContainer from './game-play/input-container/InputLetterContainer'
import { fetchData } from '../apis/game-word-generator-api';


function GamePlay() {
    const [rows, setRows] = useState(Array(5).fill(null).map(() => Array(5).fill('')));
    const [secretWord, setSecretWord] = useState('BOOKS');
    const [score, setScore] = useState(0);

    const handleLettersChange = (rowIndex, letters) => {
        const newRows = [...rows];
        newRows[rowIndex] = letters;
        setRows(newRows);
    };

    const handleReset = () => {
        setRows(Array(5).fill(null));
    };

    useEffect(() => {
        const getSecretWord = async () => {
          try {
            const result = await fetchData();
            setSecretWord(result.toString().toUpperCase());
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        getSecretWord();
      }, []);
    
    return (
        <div>
            <Header></Header>
            {Array.from({ length: 6 }, (_, index) => (
                <InputLetterContainer 
                    key={index}
                    numBoxes={5}
                    secretWord={secretWord}
                    onLettersChange={(letters) => handleLettersChange(index, letters)}
                    isLastRow={index === 4}
                    onReset={handleReset}
                />
            ))}

        </div>  
    );  
}

export default GamePlay;
