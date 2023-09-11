import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context";
import "./UserDash.css";
import CourseList from "./CourseList";
import UserList from "./UserList";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import useLogout from "../hooks/useLogout";


function UserDash() {
  const { setIsLoggedIn, setUserRole, userInfo, setUserInfo } = useGlobalState();
  const [subscription, setSubscription] = useState(false);
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useLogout(); // Call the custom hook


  const handleSubscription = async () => {
    if(!userInfo.subscribed){
      const response = await axios.put(
        "http://localhost:4001/user/my/subscription/" + userInfo.id,
        { },
        { withCredentials: true }
      );
      //setUserInfo(userInfo.subscribed=true)
      setSubscription(true)
      return console.log('Subscribed')
    }
    else{
      const response = await axios.put(
        "http://localhost:4001/user/my/unsubscription/" + userInfo.id,
        {},
        { withCredentials: true }
        );
      //setUserInfo(userInfo.subscribed=false)
      setSubscription(false)
      return console.log("Unsubscribed");
    }
  };

  
  useEffect(() => {
    async function pingUser() {
      try {
        const response = await axios.get(
          "http://localhost:4001/user/my/status/" + userInfo.id,
          { withCredentials: true }
        );
        //console.log("Data", response.data);
        if (response.status === 200) {
          console.log('User is authenticated');
          setUserInfo(response.data);
        } else {
          console.log('User is not authenticated, redirecting to /login');
          navigate('/login');
        }
      } catch (error) {
        console.log('error', error.code)
        if (error.code === 'ERR_NETWORK') {
          console.error('Server is not reachable. Make sure your backend server is running.');
        } 
        // Handle any errors that occur during the ping request
        console.error("Error checking authentication status:", error);
        navigate('/login')
        setUserInfo(null)
        setIsLoggedIn(false)
        setUserRole("")
      }
    }

    pingUser();
  }, [userInfo.id, navigate]);

  return (
    <div className="user-container">
      <p className="p-user-greet">Welcome {userInfo.first_name}</p>
      {userInfo.subscribed && (
        <button className="subscribe-button" onClick={handleSubscription}>
          Unsubscribe
        </button>
      )}
      {!userInfo.subscribed && (
        <button className="subscribe-button" onClick={handleSubscription}>
          Subscribe
        </button>
      )}
      <UserList />
      <CourseList />
    </div>
  );
  
}

export default UserDash;
