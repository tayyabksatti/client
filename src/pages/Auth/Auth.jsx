import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading)
    const [isSignUp, setIsSignUp] = useState(false);
    const [isOrganization, setIsOrganization] = useState(false);
    const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" });
    const [confirmPass, setConfirmPass] = useState(true);

    const handleChange = (e) => {
        if (isOrganization) {
            setData({ ...data, [e.target.name]: e.target.value, typee: "Organization" });
        } else {
            setData({ ...data, [e.target.name]: e.target.value, typee: "Veteran" });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmPass(true);
        if (isSignUp) {
            data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false);
        } else {
            dispatch(logIn(data));
        }
    };

    const resetForm = () => {
        setConfirmPass(true);
        setData({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" });
    };

    const handleOrganization = () => {
        setIsOrganization((prev) => !prev);
    }

    return (
        <div className="Auth">
            {/* left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>VeteranMeet</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>
            {/* right side */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Sign up" : "Log In"}</h3>


                    {isSignUp && (
                        <div>
                            <input
                                type="text"
                                placeholder={isOrganization ? "Organization Name" : "First Name"}
                                className="infoInput"
                                name="firstname"
                                onChange={handleChange}
                                value={data.firstname}
                            />
                            <input
                                type="text"
                                placeholder={isOrganization ? "CEO Name" : "Last Name"}
                                className="infoInput"
                                name="lastname"
                                onChange={handleChange}
                                value={data.lastname}
                            />
                        </div>
                    )}

                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            value={data.username}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="infoInput"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={data.password}
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                className="infoInput"
                                name="confirmpass"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                value={data.confirmpass}
                            />
                        )}
                    </div>
                    <span style={{ display: confirmPass ? "none" : "block", color: 'red', fontSize: "12px", alignSelf: "flex-end", margin: "5px" }}>
                        * Confirm password must be same as password
                    </span>
                    <div>
                        <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={() => { setIsSignUp((prev) => !prev); resetForm() }}>{isSignUp ? "Already have an account. Login!" : "Dont have an account. Signup!"}</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={handleOrganization}>{isSignUp ? isOrganization ? "Veteran Signup!" : "Organization Signup!" : ""}</span>
                    </div>
                    <button className="button infoButton" type="submit" disabled={loading}>
                        {loading ? "Loading...." : isSignUp ? "Signup" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;