import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = { email, password };
        console.log(dataToSend);
        await actions.login(dataToSend)
        console.log(store.isLoged)
        if(store.isLoged){
            navigate("/dashboard")
        } else{
            navigate("/protected")
        }
    };

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmail = (event) => setEmail(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)

    const signup = async () => {
        navigate('/sign-up')
    }
    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card" style={{ width: "22rem" }}>
                <div className="card-header text-center">
                    <h3>Login</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fas fa-user"></i>
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email address"
                                value={email}
                                onChange={handleEmail} 
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fas fa-key"></i>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={handlePassword}
                                required
                            />
                            <span className="input-group-text" onClick={passwordVisibility}>
                                <i
                                    className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}
                                    style={{ fontSize: "1rem" }}
                                ></i>
                            </span>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-warning btn-block">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-center">
                    <div className="d-flex justify-content-center">
                        Don't have an account? <a href="#" className="ms-1" onClick={() => signup()}>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};