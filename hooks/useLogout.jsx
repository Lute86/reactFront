import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context";

function useLogout() {
  const {setIsLoggedIn,
    setUserRole,
    setUserInfo} = useGlobalState();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      setIsLoggingOut(true);

      // Make a request to the logout endpoint
      await axios.post(
        "http://localhost:4001/auth/logout",
        {},
        { withCredentials: true }
      );

      // Perform logout actions (e.g., clearing user data, setting isLoggedIn to false, etc.)
      // ...

      setIsLoggingOut(false);
      setIsLoggedIn(false);
      setUserRole("");
      setUserInfo(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userInfo");

      // Redirect to the login page after logout
      navigate("/login"); 
    } catch (error) {
      console.error("Logout error", error);
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut };
}

export default useLogout;
