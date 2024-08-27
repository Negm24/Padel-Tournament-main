import React,{useEffect,useState} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import '../css/header.css';

function Header(){

    const [name,setname] = useState(null);

    useEffect(
     () => {GetUserName()}
    ,[]);

    const GetUserName = async() => {
        try{
             const response = await fetch('http://127.0.0.1:5000/WhoCurrent');
            if (!response.ok) {
               alert('Network response was not ok');
                }
                const data = await response.json();
                 setname(data[0] + ' / ' + data[1]);
                }
         catch(e){
                 alert("Errrrrrrrrrrrrrrrrrrrrrwrrrrr");
                }
    }

    return(
        <Navbar data-bs-theme="dark" id="Header-Container">
            <Container className="d-flex">
                <Navbar.Brand id="Brand-Logo">Sparx</Navbar.Brand>
                <Navbar.Text id="Team-Usernames"><span>{name}</span></Navbar.Text> {/* remove the examples with {name} */}
            </Container>
        </Navbar>
    );
}
export default Header;