import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalState } from "../context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead
import '../index.css';
import Spinner from '../components/Spinner';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    setIsLoggedIn,
    setUserRole,
    setUserInfo,
    loginError, setLoginError,
    serverDown, setServerDown,
    loading, setLoading,
  } = useGlobalState();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Cleanup function when leaving the component or refreshing the page
    return () => {
      setLoading(false);
      setLoginError(false);
      setServerDown(false);
    };
  }, []);

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:4001/auth/login",
        {
          email: username,
          password: password,
        },
        {
          withCredentials: true, // Add this option to send cookies
        }
      );

      const user = response.data.user;
      console.log("user",user)
      console.log("user role",user.role)
      console.log("data",response.data.user)
      setIsLoggedIn(true);
      setUserRole(user.role); // Set the user's role state
      setUserInfo(user);
      // Store user info in localStorage
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userInfo", JSON.stringify(user));
      
      (user.role == "admin" ? navigate("/admin") : navigate("/user"))
    } catch (error) {
      console.error("Login error", error);
  
      if (error.response && error.response.status === 401) {
        setLoginError(true);
      } else if (error.response && error.response.status === 500) {
        setServerDown(true);
      } else {
        setServerDown(true)
        setLoginError(true)
      }
  
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className={loginError?'p-login-error':'p-login'}>{serverDown ? 'Server down' : "Wrong credentials"}</p>
        <button onClick={handleLogin}>{!loading ? "Login" : <Spinner />}</button>
        <p>
          Don't have an account?{" "}
          <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
