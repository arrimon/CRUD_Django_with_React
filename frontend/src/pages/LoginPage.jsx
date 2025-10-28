import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Simple client-side check. Replace with real API call for production.
        // Admin credentials requested: admin / admin
        if ((email === 'admin' || email === 'admin@example.com') && password === 'admin') {
            // store a simple flag/token to indicate authenticated state
            localStorage.setItem("admin", "admin");
            navigate("/listpage");
        } else {
            setError('Invalid credentials. Use admin / admin');
        }
    };

  return (
    <div className="container mt-5 text-center">
      <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <input
                    type="text"
                    className="form-control"
                    id="loginEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin or admin@example.com"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin"
                />
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <button type="submit" className="btn btn-primary center mt-3">
                Login
            </button>
        </form>
    </div>
  )
}

export default LoginPage