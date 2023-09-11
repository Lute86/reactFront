import React from "react";
import useLogout from "../hooks/useLogout"; // Import the custom hook
import "./Logout.css";
import { useGlobalState } from "../context";

function Logout() {
  const { logout, isLoggingOut } = useLogout(); // Call the custom hook
 
  const handleLogoutClick = () => {
    logout(); // Call the logout function from the hook
  };

  return (
    <div className="logout-container">
      <div className="logout-content">
        <p className="p-logout">Do you wish to close your session?</p>
        <button onClick={handleLogoutClick} disabled={isLoggingOut}>
          {isLoggingOut ? "Logging Out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Logout;
