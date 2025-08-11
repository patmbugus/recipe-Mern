import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AuthForm = ({ isLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/api/auth/login' : '/api/auth/register';
        const data = isLogin ? { email, password } : { username, email, password };

        try {
            const response = await axios.post(url, data);
            localStorage.setItem('token', response.data.token);
            history.push('/'); // Redirect to home after successful auth
        } catch (error) {
            console.error('Authentication error:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {!isLogin && (
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
            )}
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
    );
};

export default AuthForm;