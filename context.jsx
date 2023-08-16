import React, { createContext, useContext, useState } from "react";

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

  return <AppContext.Provider value={{
    loginError, setLoginError,
    serverDown, setServerDown,
    loading, setLoading,
    isLoggedIn, setIsLoggedIn,
    userRole, setUserRole,
    userInfo, setUserInfo,
    }} >
      {children}
  </AppContext.Provider>
}

export const useGlobalState = () => {
  return useContext(AppContext);
}

export {AppContext, AppProvider}