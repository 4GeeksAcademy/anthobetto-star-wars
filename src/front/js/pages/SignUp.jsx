import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = {
            email: email,
            name: name,
            lastname: lastname,
            password: password
        };
        console.log(dataToSend);
        await actions.newSignUp(dataToSend);
    };

    // Usar useEffect para monitorear el cambio en `isLoged`
    useEffect(() => {
        if (store.isLoged) {
            navigate("/dashboard");
        }
    }, [store.isLoged, navigate]);

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card" style={{ width: "22rem" }}>
                <div className="card-header text-center">
                    <h3>Sign Up</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fas fa-user"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="far fa-address-card"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fas fa-at"></i>
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
                                    className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                                    style={{ fontSize: "1rem" }}
                                ></i>
                            </span>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-warning btn-block">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};