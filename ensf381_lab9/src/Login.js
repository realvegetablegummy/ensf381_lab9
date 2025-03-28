import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [submissionError, setSubmissionError] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
      
        const backendEndpoint = 'http://127.0.0.1:5000';

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
                console.log('Form submission successfull!');
                navigate('/predict')
            } else {
                setSubmissionError(true)
                console.error('Form submission failed.');
            }
            } catch (error) {
                setSubmissionError(true)
                console.error('Error during form submission:', error);  
            }
        };
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label for="username">Username:</label>
            <input 
            type="text" 
            id="username" 
            name="username" 
            onChange={(e) => setUsername(e.target.value)}
            required/>
            <br></br>
            <label for="password">Password:</label>
            <input 
            type="text" 
            id="password" 
            name="password" 
            onChange={(e) => setPassword(e.target.value)}
            required/>
            <button type="submit">Submit</button>
        </form>
        {submissionError && (
            <div>
                <p>Error Eror!</p>
            </div>
        )}
        </div>
    ); 
};

export default Login;
