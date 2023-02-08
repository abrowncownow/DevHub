import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import SavedProject from "./savedProject";
const SignedIn = Auth.loggedIn() ? true : false;

if (!SignedIn) {
	localStorage.removeItem('id_token');
}
const linkStyle = {
	color: "white",
	textDecoration: 'none'
}

const boxStyle = {
	border: "1px black",
	padding: "10px",
	color: '#F0EFE8'
};

const sectionStyle = {
	width: '100%',
	display: "flex",
	fontFamily: 'Montserrat',
	fontWeight: '400',
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: '#A08A8C',
	height: '75px',
	margin: '0'
};

const Navbar = () => {
	function showNavigation() {
		return (
			<nav>
				{SignedIn ? (
					<section style={sectionStyle}>
						<h1 className="header">DevHub</h1>
						<div style={boxStyle}>
							<Link style={linkStyle} to="/">Home</Link>
						</div>
						<div style={boxStyle}>
							<Link style={linkStyle} to="/create">Create Project</Link>
						</div>
						<div>
							<SavedProject />
						</div>
						<div style={boxStyle}>
							<a style={linkStyle} href="/" onClick={() => { Auth.logout() }}>
								Logout
							</a>
						</div>
					</section>
				) : (
					<section style={sectionStyle}>
						<h1 className="header">DevHub</h1>
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
			</nav>
		);
	}
	return <nav >{
		showNavigation()}
	</nav>;
};

export default Navbar;
