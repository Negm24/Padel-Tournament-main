import React, { useState, useCallback } from "react";
import SignupCard from "./Signup_card";
import LoginCard from "./Login_card";
import '../css/auth_page.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function Card_holder() {
    const [isLogin, setIsLogin] = useState(true);

    const switchCards = useCallback(() => {
        setIsLogin(prev => !prev);
    }, []);

    return (
        <div className="card-holder">
            <SwitchTransition mode="out-in">
                <CSSTransition key={isLogin ? "login" : "signup"} classNames="fade" timeout={300}>
                    {isLogin ? <LoginCard /> : <SignupCard />}
                </CSSTransition>
            </SwitchTransition>
            <button id="CA-AHAC-Btn" onClick={switchCards}>
                {isLogin ? "Create Account" : "Already Have an Account"}
            </button>
        </div>
    );
}

export default Card_holder;
