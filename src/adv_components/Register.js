import "../styles/Register.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUserPresent, setIsUserPresent] = useState(false);
    const [isRegistrationRequested, setIsRegistrationRequested] = useState(false);
    const navigate = useNavigate();

    async function handleSignUp(){
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsRegistrationRequested(true);

        let response = await fetch(`http://localhost:8000/register?name=${name}&email=${email}&password=${password}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        let registerResponse = await response.json();
        setIsRegistrationRequested(false);
        if(registerResponse.message === "email already in use"){
            setIsUserPresent(true);
        }
        else{
            navigate("/login");
        }
    }

    return(
        <div className="signup-container">
            <div className="signup-form-wrapper">
                <h2 className="signup-title"> Sign Up </h2>
                <label className="signup-label"> Name: </label>
                <input className="signup-input" value={name} placeholder="Enter your Name..." onChange={(e) => {setName(e.target.value)}} />
                <label className="signup-label"> Email: </label>
                <input className="signup-input" value={email} placeholder="Enter your Email..." onChange={(e) => {setEmail(e.target.value)}} />
                <label className="signup-label"> Password: </label>  
                <input className="signup-input" value={password} placeholder="Enter your password..." type="password" onChange={(e) => {setPassword(e.target.value)}} />
                <label className="signup-label"> Confirm Password: </label>
                <input className="signup-input" value={confirmPassword} placeholder="Confirm password.." type="password" onChange={(e) => {setConfirmPassword(e.target.value)}} />
                <button className="signup-button" onClick={handleSignUp}> {isRegistrationRequested ? "Signing In" : "Sign Up"} </button>
                {isUserPresent && (
                    <span className="signup-error">
                    Email or already in use!
                    </span>
                )}
                <div className="signup-link">
                    Already Registered? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;