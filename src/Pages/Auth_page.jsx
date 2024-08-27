import React from "react";
import CardHolder from "../Components/Card_holder";
import '../css/auth_page.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import MainFooter from "../Components/Footer";

function Auth(){
    return(
        <>
        <Navbar data-bs-theme="dark" id="Header-Container">
            <Container className="d-flex">
                <Navbar.Brand id="Brand-Logo">Sparx</Navbar.Brand>
            </Container>
        </Navbar>

        <div id="Auth-Page">
            <div id="Auth-Page-Container">
                <CardHolder/>

                <div id="Greet">
                    <h1>Welcome Back!</h1>
                    <div id="line"></div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus aperiam consequuntur amet blanditiis. Quae iusto quia, animi maxime reprehenderit eveniet rem voluptatem ab pariatur fugiat unde eius hic dolorem.</p>
                </div>
            </div>
        </div>

        <MainFooter />
        </>
        
    );
}
export default Auth;