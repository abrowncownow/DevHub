import React, { useState } from "react";
import { Link } from "react-router-dom";
//import SignUpForm from './SignupForm';
//import LoginForm from './LoginForm';
//import Auth from "../utils/auth";
const SignedIn = false;
//SignedIn = Auth.loggedIn() ? true : false;

const linkStyle = {
    color: "white",
    textDecoration: 'none'
}

const boxStyle = {
    border: "1px black",
    padding: "10px",
    color: 'white'
};

const sectionStyle = {
    width: '100%',
    display: "flex",
    fontFamily: "helvetica",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'darkblue',
    height: '75px',
    margin: '0'
};

const Navbar = () => {
    function showNavigation() {
        return (
            <div>
                {SignedIn ? (
                    <section style={sectionStyle}>
                        <div style={boxStyle}>
                            <Link style={linkStyle} to="/">Home</Link>
                        </div>
                        <div style={boxStyle}>
                            <Link style={linkStyle} to="/dashboard">View Projects</Link>
                        </div>
                        <div style={boxStyle}>
                            <Link style={linkStyle} to="/create">Create Project</Link>
                        </div>
                        <div style={boxStyle}>
                            <a style={linkStyle} href="/" onClick={() => {/*Auth.logout()*/} }>
                                Logout
                            </a>
                        </div>
                    </section>
                ) : (
                    <section style={sectionStyle}>
                        <div style={boxStyle}>
                            <Link style={linkStyle} to="/">Home</Link>
                        </div>
                        <div style={boxStyle}>
                            <Link style={linkStyle} to="/login">Login</Link>
                        </div>
                        <div style={boxStyle}>
                            <Link style={linkStyle} to="/signup">Signup</Link>
                        </div>
                    </section>
                )}
            </div>
        );
    }
    return <nav >{
        showNavigation()}
    </nav>;
};

export default Navbar;
