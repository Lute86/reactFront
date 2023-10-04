import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const AppContext = createContext()

const initialIsLoggedIn = localStorage.getItem("isLoggedIn");
const initialUserRole = localStorage.getItem("userRole") || "";
const initialUserInfo = JSON.parse(localStorage.getItem("userInfo")) || null;

const AppProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [userRole, setUserRole] = useState(initialUserRole);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [loginError, setLoginError] = useState(false)
  const [serverDown, setServerDown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [allUsers, setAllUsers] = useState([]);
  const [allQueries, setAllQueries] = useState([]);

  const [changeHappened, setChangeHappened] = useState(Boolean)
  const APIURL = 'http://localhost:4001/'
  
  async function pingUser() {
    try {
      const response = await axios.get(
        "http://localhost:4001/user/my/status/" + userInfo.id,
        { withCredentials: true }
      );
      //console.log("Data", response.data);
      if (response.status === 200) {
        // console.log("User is authenticated");
        setUserInfo(response.data);
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.log("error", error.code);
      if (error.code === "ERR_NETWORK") {
        console.error(
          "Server is not reachable. Make sure the server is running."
        );
      }
      // Handle any errors that occur during the ping request
      console.error("Error checking authentication status:", error);
      setUserInfo(null);
      setIsLoggedIn(false);
      setUserRole("");
    }
  }
  
  return <AppContext.Provider value={{
    loginError, setLoginError,
    serverDown, setServerDown,
    loading, setLoading,
    isLoggedIn, setIsLoggedIn,
    userRole, setUserRole,
    userInfo, setUserInfo,
    modalOpen, setModalOpen,
    APIURL, pingUser,
    changeHappened, setChangeHappened,
    allUsers, setAllUsers,
    allQueries, setAllQueries
    }} >
      {children}
  </AppContext.Provider>
}

export const useGlobalState = () => {
  return useContext(AppContext);
}

export {AppContext, AppProvider}