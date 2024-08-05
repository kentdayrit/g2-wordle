import React, { useState, useEffect } from 'react';
import './Header.css';
import OpenModal from '../modals/OpenModal';
import Input from '../inputs/Input';
import { getUsersById, createUser } from  '../../apis/firebase-api';
import { generateSessionCode } from '../../utils/sessionGenerator';

const Header = () => {
    const [isRankingOpen, setIsRankingOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [guessName, setGuestName] = useState('');
    const [sessionCode, setSessionCode] = useState('01234');
    const openRanking = () => setIsRankingOpen(true);
    const closeRanking = () => setIsRankingOpen(false);
    const openSetting = () => setIsSettingOpen(true);
    const closeSetting = () => setIsSettingOpen(false);
    const handleGuestChange = async (e) => {
        try {
            setGuestName(e.target.value);
            await createUser(sessionCode, guessName, score);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const storedSessionCode = localStorage.getItem('session');
        const findUserById = async (code) => {
          try {
            const result = await getUsersById(code);
            const data = result.data
            setGuestName(data.name)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
        if(!storedSessionCode) {
            const generateSession = generateSessionCode();
            localStorage.setItem('session', generateSession);
            setSessionCode(generateSession);
        }

        findUserById(storedSessionCode);

      }, []);
    
    return (
        <header className="header">
            <h1>WORDLE</h1>
            <nav className="sub-nav">
                <button className="nav-button" onClick={openSetting}>Settings</button>
                <button className="nav-button" onClick={openRanking}>Ranking</button>
            </nav>
            <OpenModal
                isOpen={isRankingOpen}
                onRequestClose={closeRanking}
                title="Ranking"
            >
                
            </OpenModal>

            <OpenModal
                isOpen={isSettingOpen}
                onRequestClose={closeSetting}
                title="Settings"
            >
                <Input
                    type="text"
                    value={guessName}
                    onChange={handleGuestChange}
                    placeholder="Username"
                    label="Username"
                />

                <Input
                    type="text"
                    value={sessionCode}
                    placeholder="Code"
                    label="Code"
                    disabled={true}
                />

            </OpenModal>


        </header>
    );
};

export default Header;
