import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context";
import useLogout from "./useLogout";


function usePingUser() {
  const {APIURL, userInfo, setUserInfo, setIsLoggedIn, setUserRole} = useGlobalState();
  const {logout} = useLogout();
  const navigate = useNavigate();

  const pingUser = async () => {
    if(!userInfo){
      setUserInfo(null);
      setIsLoggedIn(false);
      setUserRole("");
      return
    }
    let response;
    try {
      if(userInfo.role == 'user'){
        response = await axios.get(
          APIURL + "user/my/status/" + userInfo.id,
          { withCredentials: true }
        );

      }
      if(userInfo.role == 'admin'){
        response = await axios.get(
          APIURL + "admin/my/status/" + userInfo.id,
          { withCredentials: true }
          );
      }
      //console.log("Data", response.data);
      if (response.status === 200) {
        // console.log("User is authenticated");
        setUserInfo(response.data);
        
      } else {
        console.log("User is not authenticated");
        logout();
        navigate('/login');
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
      setUserInfo("")
    }
  }

  return { pingUser }
}

export default usePingUser;