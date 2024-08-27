import React, { useEffect, useState } from "react";

function QuarterFinal(props) {
    const [A1, setA1] = useState(null);
    const [A1Score, setA1Score] = useState(null);    
    const [A2, setA2] = useState(null);
    const [A2Score, setA2Score] = useState(null); 
    const [B1, setB1] = useState(null);
    const [B1Score, setB1Score] = useState(null); 
    const [B2, setB2] = useState(null);
    const [B2Score, setB2Score] = useState(null); 
    const [C1, setC1] = useState(null);
    const [C1Score, setC1Score] = useState(null); 
    const [C2, setC2] = useState(null);
    const [C2Score, setC2Score] = useState(null); 
    const [D1, setD1] = useState(null);
    const [D1Score, setD1Score] = useState(null); 
    const [D2, setD2] = useState(null);
    const [D2Score, setD2Score] = useState(null); 
    const [Q1, setQ1] = useState(null);
    const [Q2, setQ2] = useState(null);
    const [Q3, setQ3] = useState(null);
    const [Q4, setQ4] = useState(null);
    const [VisibleQF1, setVisibleQF1] = useState(false);
    const [VisibleQF2, setVisibleQF2] = useState(false);
    const [VisibleQF3, setVisibleQF3] = useState(false);
    const [VisibleQF4, setVisibleQF4] = useState(false);
    const [Team1score, setTeam1score] = useState();
    const [Team2score, setTeam2score] = useState();

    const HandleQuarterFinal = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/ShowQualifiers');
            if (!response.ok) {
                alert('Network response was not ok');
                return;
            }

            const jsonData = await response.json();

            setA1(`${jsonData[0].team1_player1} ${jsonData[0].team1_player2}`);
            setA1Score(`${jsonData[0].team1_score}`);
            setD2(`${jsonData[0].team2_player1} ${jsonData[0].team2_player2}`);
            setD2Score(`${jsonData[0].team2_score}`);
            setQ1(`${jsonData[0].game_id}`);

            setB1(`${jsonData[1].team1_player1} ${jsonData[1].team1_player2}`);
            setB1Score(`${jsonData[1].team1_score}`);
            setC2(`${jsonData[1].team2_player1} ${jsonData[1].team2_player2}`);
            setC2Score(`${jsonData[1].team2_score}`);
            setQ2(`${jsonData[1].game_id}`);

            setC1(`${jsonData[2].team1_player1} ${jsonData[2].team1_player2}`);
            setC1Score(`${jsonData[2].team1_score}`);
            setB2(`${jsonData[2].team2_player1} ${jsonData[2].team2_player2}`);
            setB2Score(`${jsonData[2].team2_score}`);
            setQ3(`${jsonData[2].game_id}`);

            setD1(`${jsonData[3].team1_player1} ${jsonData[3].team1_player2}`);
            setD1Score(`${jsonData[3].team1_score}`);
            setA2(`${jsonData[3].team2_player1} ${jsonData[3].team2_player2}`);
            setA2Score(`${jsonData[3].team2_score}`);
            setQ4(`${jsonData[3].game_id}`);
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
            const response = await fetch('http://127.0.0.1:5000/QualifySemi', {
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
        const checkquarter = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/CheckSettingQuarter');
                const data = await response.json(); // Assuming the backend returns JSON

                if (data['message'] === 'Yes') {
                    HandleQuarterFinal();
                } else {
                    console.log('hi');
                }
            } catch (error) {
                console.error('Error fetching setting data:', error);
            }
        };


        // Call the async function
        checkquarter()
    }, []);

    return (
        <div className="quarter-final">
            <button onClick={HandleQuarterFinal} style={{display : props.admin === 'YES' ? 'block' : 'none'}}>Show Quarter Final</button>

            <div className="QF1">
                <div className="A1">{A1 ? ` ${A1}` : "Rank 1 Group A"}</div><div>{A1Score}</div>

                <button 
                    onClick={() => { setVisibleQF1(!VisibleQF1) }} 
                    style={{ display: (VisibleQF1 || A1Score !== 'null' || D2Score !== 'null' || props.admin !== 'YES') ? 'none' : 'block'}}>
                    Start
                </button>

                <div style={{ display: VisibleQF1 ? 'flex' : 'none' }}>
                    <input type="text" onChange={(e) => { setTeam1score(e.target.value) }} />
                    <button onClick={() => { HandleWinner(Q1) }}>Submit</button>
                    <input type="text" onChange={(e) => { setTeam2score(e.target.value) }} />
                </div>

                <div className="D2">{D2 ? ` ${D2}` : "Rank 2 Group D"}</div><div>{D2Score}</div>
            </div>

            <div className="QF2">
                <div className="B1">{B1 ? ` ${B1}` : "Rank 1 Group B"}</div><div>{B1Score}</div>

                <button 
                    onClick={() => { setVisibleQF2(!VisibleQF2) }} 
                    style={{ display: (VisibleQF2 || A1Score !== 'null' || D2Score !== 'null' || props.admin !== 'YES') ? 'none' : 'block'}}>
                    Start
                </button>

                <div style={{ display: VisibleQF2 ? 'flex' : 'none' }}>
                    <input type="text" onChange={(e) => { setTeam1score(e.target.value) }} />
                    <button onClick={() => { HandleWinner(Q2) }}>Submit</button>
                    <input type="text" onChange={(e) => { setTeam2score(e.target.value) }} />
                </div>

                <div className="C2">{C2 ? ` ${C2}` : "Rank 2 Group C"}</div><div>{C2Score}</div>
            </div>

            <div className="QF3">
                <div className="C1">{C1 ? ` ${C1}` : "Rank 1 Group C"}</div><div>{C1Score}</div>

                <button 
                    onClick={() => { setVisibleQF3(!VisibleQF3) }} 
                    style={{ display: (VisibleQF3 || A1Score !== 'null' || D2Score !== 'null'|| props.admin !== 'YES') ? 'none' : 'block' }}>
                    Start
                </button>

                <div style={{ display: VisibleQF3 ? 'flex' : 'none' }}>
                    <input type="text" onChange={(e) => { setTeam1score(e.target.value) }} />
                    <button onClick={() => { HandleWinner(Q3) }}>Submit</button>
                    <input type="text" onChange={(e) => { setTeam2score(e.target.value) }} />
                </div>

                <div className="B2">{B2 ? ` ${B2}` : "Rank 2 Group B"}</div><div>{B2Score}</div>
            </div>

            <div className="QF4">
                <div className="D1">{D1 ? ` ${D1}` : "Rank 1 Group D"}</div><div>{D1Score}</div>

                <button 
                    onClick={() => { setVisibleQF4(!VisibleQF4) }} 
                    style={{ display: (VisibleQF4 || A1Score !== 'null' || D2Score !== 'null' || props.admin !== 'YES') ? 'none' : 'block'}}>
                    Start
                </button>

                <div style={{ display: VisibleQF4 ? 'flex' : 'none' }}>
                    <input type="text" onChange={(e) => { setTeam1score(e.target.value) }} />
                    <button onClick={() => { HandleWinner(Q4) }}>Submit</button>
                    <input type="text" onChange={(e) => { setTeam2score(e.target.value) }} />
                </div>

                <div className="A2">{A2 ? ` ${A2}` : "Rank 2 Group A"}</div><div>{A2Score}</div>
            </div>
        </div>
    );
}

export default QuarterFinal;
