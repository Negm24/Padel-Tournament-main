import React, { useState,useEffect } from "react";

function SemiFinal(props) {
    const [LSF1, setLSF1] = useState(null);
    const [LSF1Score, setLSF1Score] = useState(null);    
    const [LSF2, setLSF2] = useState(null);
    const [LSF2Score, setLSF2Score] = useState(null); 
    const [RSF1, setRSF1] = useState(null);
    const [RSF1Score, setRSF1Score] = useState(null); 
    const [RSF2, setRSF2] = useState(null);
    const [RSF2Score, setRSF2Score] = useState(null); 
    const [LSF, setLSF] = useState(null);
    const [RSF, setRSF] = useState(null);
    const [VisibleLSF, setVisibleLSF] = useState(true);
    const [VisibleRSF, setVisibleRSF] = useState(true);

    const [Team1score, setTeam1score] = useState();
    const [Team2score, setTeam2score] = useState();

    const HandleSemiFinal = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/ShowSemiQualifiers');
            if (!response.ok) {
                alert('Network response was not ok');
                return;
            }

            const jsonData = await response.json();

            setLSF1(`${jsonData[0].team1_player1} ${jsonData[0].team1_player2}`);
            setLSF1Score(jsonData[0].team1_score);
            setLSF2(`${jsonData[0].team2_player1} ${jsonData[0].team2_player2}`);
            setLSF2Score(jsonData[0].team2_score);
            setLSF(`${jsonData[0].game_id}`);

            setRSF1(`${jsonData[1].team1_player1} ${jsonData[1].team1_player2}`);
            setRSF1Score(jsonData[1].team1_score);
            setRSF2(`${jsonData[1].team2_player1} ${jsonData[1].team2_player2}`);
            setRSF2Score(jsonData[1].team2_score);
            setRSF(`${jsonData[1].game_id}`);

        } catch (e) {
            alert("Error");
        }
    };

    const HandleWinner = async(game_id) => {
        alert(Team1score + Team2score + game_id);

        const newgame = {
            Team1score: Team1score,
            Team2score: Team2score,
            game_id: game_id
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/QualifyFinal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newgame)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                alert("yes");
            }

            const data = await response.text(); // Use response.json() if the backend returns JSON
            alert(data);

        } catch (error) {
            console.error('There was an errorrrrrrrrrrrrrrr!', error);
        }
    };

    useEffect(() => {
        // Define the async function inside useEffect
        const checksemi = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/CheckSettingSemi');
                const data = await response.json(); // Assuming the backend returns JSON

                if (data['message'] === 'Yes') {
                    HandleSemiFinal();
                } else {
                    console.log('hi');
                }
            } catch (error) {
                console.error('Error fetching setting data:', error);
            }
        };

        // Call the async function
        checksemi()
    }, []);

    return (
        <div className="Semi-final">
            <button onClick={HandleSemiFinal} style={{display : props.admin === 'YES' ? 'block' : 'none'}}>Show Semi Final</button>

            <div className="LSF">
                <div className="LSF1">{LSF1 ? ` ${LSF1}` : "Left Semi-Final 1"}</div><div>{LSF1Score}</div>

                <button 
                    onClick={() => { setVisibleLSF(!VisibleLSF) }} 
                    style={{ display: VisibleLSF && props.admin === 'YES' && LSF1Score === null ? 'block' : 'none' }}>
                    Start
                    {LSF1Score}
                </button>

                <div style={{ display: VisibleLSF ? 'none' : 'flex' }}>
                    <input type="text" onChange={(e) => { setTeam1score(e.target.value) }} />
                    <button onClick={() => { HandleWinner(LSF) }}>Submit</button>
                    <input type="text" onChange={(e) => { setTeam2score(e.target.value) }} />
                </div>

                <div className="LSF2">{LSF2 ? ` ${LSF2}` : "Left Semi-Final 2"}</div><div>{LSF2Score}</div>
            </div>

            <div className="RSF">
                <div className="RSF1">{RSF1 ? ` ${RSF1}` : "Right Semi-Final 1"}</div><div>{RSF1Score}</div>

                <button 
                    onClick={() => { setVisibleRSF(!VisibleRSF) }} 
                    style={{ display: VisibleRSF && props.admin === 'YES' && RSF1Score === null ? 'block' : 'none' }}>
                    Start
                </button>

                <div style={{ display: VisibleRSF ? 'none' : 'flex' }}>
                    <input type="text" onChange={(e) => { setTeam1score(e.target.value) }} />
                    <button onClick={() => { HandleWinner(RSF) }}>Submit</button>
                    <input type="text" onChange={(e) => { setTeam2score(e.target.value) }} />
                </div>

                <div className="RSF2">{RSF2 ? ` ${RSF2}` : "Right Semi-Final 2"}</div><div>{RSF2Score}</div>
            </div>
        </div>
    );
}

export default SemiFinal;
