import "../styles/Register.css"
import { useState } from "react";
// import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUserPresent, setIsUserPresent] = useState(true);
    const navigate = useNavigate();

    async function handleLogin(){
        setEmail("");
        setPassword("");

        let response = await fetch(`http://localhost:8000/login?email=${email}&password=${password}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        let loginResponse = await response.json();
        if(loginResponse.message === "Success"){
            navigate("/chat")
        }
        else{
            setIsUserPresent(false);
        }

    }

    return(
        <div className="signup-container">
            <div className="signup-form-wrapper">
                <h2 className="signup-title"> Login </h2>
                <label className="signup-label"> Email: </label>
                <input className="signup-input" placeholder="Enter your email..." value={email}  type="email" onChange={(e) => {setEmail(e.target.value)}} />
                <label className="signup-label"> Password: </label>
                <input className="signup-input" placeholder="Enter your password..." value={password} type="password" onChange={(e) => {setPassword(e.target.value)}} />
                <button className="signup-button" onClick={handleLogin}> Login </button>
                {!isUserPresent && <span className="signup-error"> Email or Password incorret! </span>}
                <div className="signup-link">
                    Not registered? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;