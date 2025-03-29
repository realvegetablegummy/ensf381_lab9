import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorBoolean, setErrorBoolean] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
      
        const backendEndpoint = '/validate_login';

        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({'username':username , 'password':password}),
            });

            const data = await response.json();
                    
            if (response.ok) {
                setErrorBoolean(data['success']);
                // console.log('Form submission successfull!');
                navigate('/predict')
            } else {
                setErrorBoolean(data['success']);
                // console.error('Form submission failed.');
                // document.getElementById("errormessage").innerText = "Form submission failed.";
                setErrorMessage(data['message']);
            }
            } catch (error) {
                setErrorBoolean(true);
                // console.error('Error during form submission: ', error); 
                // document.getElementById("errormessage").innerText = "Error during form submission: " + error;
                setErrorMessage('Error during form submission: ' + error);
            }
        };
    return (
        <div class="loginbox">
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <label for="username">Username:</label>
            <input 
            type="text" 
            id="username" 
            name="username" 
            onChange={(e) => setUsername(e.target.value)}
            required/>

            <label for="password">Password:</label>
            <input 
            type="text" 
            id="password" 
            name="password" 
            onChange={(e) => setPassword(e.target.value)}
            required/>

            <button type="submit">Login</button>
        </form>

        {errorBoolean && (
            <p id="errormessage">{errorMessage}</p>
        )}
        </div>
    ); 
};

export default Login;
