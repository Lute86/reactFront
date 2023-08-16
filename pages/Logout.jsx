import React from "react";
import axios from "axios";
import { useGlobalState } from "../context";
import "./Logout.css";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead

function Logout() {
  const {
    darkMode,
    setDarkMode,
    isLoggedIn,
    setIsLoggedIn,
    userRole,
    setUserRole,
    userInfo,
    setUserInfo,
  } = useGlobalState();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = async () => {
    try {
      // Make a request to your logout endpoint
      await axios.post(
        "http://localhost:4001/auth/logout",
        {},
        { withCredentials: true }
      );

      setIsLoggedIn(false);
      setUserRole("");
      setUserInfo(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userInfo");

      // Redirect to the login page after logout
      navigate("/login"); // Use navigate function
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="logout-container">
      <div className="logout-content"> 
        <p className="p-logout">Do you wish to close your session?</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Logout;
