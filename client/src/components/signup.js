import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup() {
  const [input, setInput] = useState({ username: '', email: '', password: '' })
  const { username, email, password } = input
  const [addUser] = useMutation(ADD_USER);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addUser({
        variables: {
          username: username,
          email: email,
          password: password
        },
      });
      const token = response.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      localStorage.removeItem('id_token');
      setInput({ username: '', email: '', password: '' })
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
        <Link to="/login">← Go to Login</Link>
        <h2>Signup</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              placeholder="Username"
              name="username"
              type="text"
              value={username}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@test.com"
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
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;