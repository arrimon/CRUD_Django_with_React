import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Normally, you'd verify credentials via API (Django backend)
        localStorage.setItem("admin", "admin");
        navigate("/listpage");
    };
  return (
    <div className="container mt-5 text-center">
      <h2>Login Page</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            </div>
            <button className="btn btn-primary center mt-3" onClick={handleLogin}>
                Login
            </button>
            {/* <button type="Login" className="btn center btn-primary">Login</button> */}
        </form>
    </div>
  )
}

export default LoginPage