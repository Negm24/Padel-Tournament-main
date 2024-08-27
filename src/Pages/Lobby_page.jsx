import React, { useState, useEffect } from "react";
import '../css/lobby_page.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Lobby() {
    const [data, setData] = useState([]);

    const GetData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/GetData');
            const players = await response.json(); // Parse the response as JSON

            setData(players);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    useEffect(() => {
        GetData();
    }, []);




    // const [username1, setusername1] = useState(null);
    // const [username2, setusername2] = useState(null);

    // useEffect(
    //  () => {GetUserName()}
    // ,[]);

    // const GetUserName = async() => {
    //     try{
    //          const response = await fetch('http://127.0.0.1:5000/WhoCurrent');
    //         if (!response.ok) {
    //            alert('Network response was not ok');
    //             }
    //             const currentuser = await response.json();
    //              setusername1(currentuser[0]);
    //              setusername2(currentuser[1]);
    //             }
    //      catch(e){
    //              alert("Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    //             }
    // }

    // const isCurrentUser = (player) => {
    //     return player[12] === 'YES';
    // };

    return (
        <div className="lobby">
            <Header />

            <h1>
                Lobby
            </h1>

            <div className="holder">
                {data.map((player, index) => ( // Add player as a parameter
                    <div className="team-card" key={index}
                    style={{
                        backgroundColor: index == 3 ? 'var(--primaryTheme-strongCyan)' : 'transparent', // Call function isCurrentUser(player)
                        boxShadow: index == 3 ? '0px 0px 15px var(--primaryTheme-strongCyan) ' : 'transparent'
                    }}> <div>{index + 1}</div>
                        <div className="team-info">
                            <div className="player">{player[1]}</div>
                            {/* <div className="player">Example</div> */}
                            <div className="separator">&</div>
                            {/* <div className="player">Example</div> */}
                            <div className="player">{player[2]}</div>
                        </div>

                        <div className="team-status">
                            <span className="status-indicator"></span>
                            <span className="status-text">Waiting</span>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default Lobby;
