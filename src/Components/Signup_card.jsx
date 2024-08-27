import React, { useState, useCallback } from "react";
import "../App.css";
import { useNavigate } from 'react-router-dom';
import '../css/auth_page.css';

function Signup_card() {
    const [UserName1, setUserName1] = useState('');
    const [UserName2, setUserName2] = useState('');
    const [UserPhone1, setUserPhone1] = useState('');
    const [UserPhone2, setUserPhone2] = useState('');
    const [Passcode, setPasscode] = useState('');
    const navigate = useNavigate();

    const WhereTo = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/WhereTo');
            const data = await response.json(); // Assuming the backend returns JSON
            if (data.message === 'Lobby') {
                navigate('/Lobby');
            } else {
                navigate('/Home');
            }
        } catch (error) {
            console.error('Error fetching WhereTo data:', error);
        }
    }, [navigate]);

    const handlesignup = useCallback(async () => {
        const newUser = {
            UserName1,
            UserName2,
            UserPhone1,
            UserPhone2,
            Passcode
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/HandleSignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Use response.json() if the backend returns JSON
            console.log('Sign-up successful:', data);
            WhereTo();
        } catch (error) {
            console.error('Error handling sign-up:', error);
        }
    }, [UserName1, UserName2, UserPhone1, UserPhone2, Passcode, WhereTo]);

    return (
        <div className="login-card">
            <h1>Sign-up</h1>
            <input
                type="text" 
                placeholder="Player 1 Username" 
                value={UserName1} 
                onChange={(e) => setUserName1(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Player 1 Phone-Number" 
                value={UserPhone1}
                onChange={(e) => setUserPhone1(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Player 2 Username" 
                value={UserName2} 
                onChange={(e) => setUserName2(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Player 2 Phone-Number" 
                value={UserPhone2} 
                onChange={(e) => setUserPhone2(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={Passcode} 
                onChange={(e) => setPasscode(e.target.value)} 
            />
            <button onClick={handlesignup}>Sign-up</button>
        </div>
    );
}

export default Signup_card;
