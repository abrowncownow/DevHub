import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
    const [input, setInput] = useState({ email: '', password: '' })
    const { email, password } = input
    const [login, { error }] = useMutation(LOGIN);
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await login({
                variables: { email, password },
            });
            const token = response.data.login.token;
            Auth.login(token);
        } catch (err) {
            localStorage.removeItem('id_token');
            setInput({ email: '', password: '' })
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const linkStyle = {
        color: "white",
        textDecoration: 'none'
    }

    return (
        <div className="container" style={linkStyle}>
            <div>
                <Link to="/signup">← Go to Signup</Link>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email">Email address:</label>
                        <input
                            placeholder="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="pwd">Password:</label>
                        <input
                            placeholder="******"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    {error ? (
                        <div>
                            <p>Login Failed</p>
                        </div>
                    ) : null}
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;