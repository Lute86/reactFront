import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../context";
import "./UserDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Modal from "./Modal";


function UserDash() {
  const { setIsLoggedIn, setUserRole, userInfo, setUserInfo, modalOpen, setModalOpen } =
    useGlobalState();
  const [subscription, setSubscription] = useState(false);
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useLogout();
  const [choice, setChoice] = useState('');
  

  useEffect(() => {
    async function pingUser() {
      try {
        const response = await axios.get(
          "http://localhost:4001/user/my/status/" + userInfo.id,
          { withCredentials: true }
        );
        //console.log("Data", response.data);
        if (response.status === 200) {
          console.log("User is authenticated");
          setUserInfo(response.data);
        } else {
          console.log("User is not authenticated, redirecting to /login");
          navigate("/login");
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
        navigate("/login");
        setUserInfo(null);
        setIsLoggedIn(false);
        setUserRole("");
      }
    }

    pingUser();
  }, [userInfo.id, navigate]);

  const handleChoice = (option) => {
    if (option=="profile"){
      setChoice(userInfo)
    }
    else if(option == "courses"){
      setChoice('courses')
    }
    else if(option == "subscription"){
      setChoice('subscription')
    }else return console.log('Choose')
    setModalOpen(true)
  }


  return (
    <div className="user-main-container">
      <div className="user-greet-container">
        <p className="p-user-greet">Welcome {userInfo.first_name}!</p>
      </div>
      <div className="user-container">
        <div className="user-profile-container" onClick={()=>handleChoice('profile')}>
          <h3>Profile</h3>
        </div>
        <div className="user-course-container" onClick={()=>handleChoice('courses')}>
          <h3>Courses</h3>
        </div>
        <div className="user-subscription-container" onClick={()=>handleChoice('subscription')}>
          <h3>Subscription</h3>
        </div>
      </div>
      {modalOpen && (<Modal choice={choice}/>)}
    </div>
  );
}

export default UserDash;
