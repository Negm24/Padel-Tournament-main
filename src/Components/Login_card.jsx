import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/auth_page.css';

function Login_card() {
    const [Teamid, setTeamid] = useState('');
    const [Passcode, setPasscode] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState(null); //Added...

    const WhereTo = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/WhereTo');
            const data = await response.json(); // Assuming the backend returns JSON
            if (data.message === 'Lobby') {
                
                navigate('/Lobby');
            } else {
                alert(data.message)
                navigate('/Home');
            }
        } catch (error) {
            console.error('Error fetching WhereTo data:', error);
        }
    }, [navigate]);

    const isFieldEmpty = () => { //Negm added this function to detect if any input field isEmpty after the user attempted to submit the form...
        return Teamid === '' || Passcode === '';
    };

    const _isFieldEmpty = isFieldEmpty(); //Negm called this function mentioned above...
    
    const handlelogin = useCallback(async (event) => {

        event.preventDefault(); //Negm added this line + the parameter (event)...

        if (_isFieldEmpty){ // Alert and exit function
            alert("All inputs are required!");
            return;
        }
        
        const newUser = {
            Teamid,
            Passcode,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/ValidateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.status == 401) {
                setError('Unauthorized: Incorrect ID or Password!');
                return;
            }
            else if (!response.ok){
                console.error('Error validating user');
                setError('An error occurred. Please try again.');
                return;
            }

            const data = await response.json();
            console.log('Login successful:', data);
            WhereTo();
        } catch (error) {
            console.error('Error validating user:', error);
            setError('An error occurred. Please try again.');
        }
    }, [Teamid, Passcode, WhereTo]);

    return (
        //Negm wrapped the input fields and the button inside the form element to ensure that the inputs are required and triggered by the submit button or just by pressing Enter (Login)...
        <form onSubmit={handlelogin}>
            <div className="login-card">
                <h1>Login</h1>
                <input
                    required
                    type="number" 
                    placeholder="Team-ID" 
                    value={Teamid} 
                    onChange={(e) => setTeamid(e.target.value)}
                />
                <input
                    required
                    type="password" 
                    placeholder="Password" 
                    value={Passcode} 
                    onChange={(e) => setPasscode(e.target.value)} 
                />
                
                {error && <p className="error-message">{error}</p>}
                
                <button type="submit" onClick={handlelogin}>Login</button>
            </div>
        </form>
    );
}

export default Login_card;
