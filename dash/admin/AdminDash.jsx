import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../context";
import axios from "axios";
import './AdminDash.css'
import Spinner from "../../components/Spinner";
import AllUsers from "./AllUsers";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import AllCourses from "./AllCourses";
import AllQueries from "./AllQueries";


function AdminDash() {
  const { isLoggedIn, userRole, userInfo, setUserInfo, setIsLoggedIn, setUserRole } = useGlobalState();
  const [choice, setChoice] = useState('')
  const navigate = useNavigate();
  
  
  useEffect(() => {
    async function pingUser() {
      try {
        const response = await axios.get(
          "http://localhost:4001/admin/my/status/" + userInfo.id,
          { withCredentials: true }
        );
        //console.log("Data", response.data);
        if (response.status === 200) {
          // console.log("User is authenticated");
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
  }, [navigate]);



  const handleChoice = (option) => {
    if (option=="profile"){
      setChoice("profile")
    }
    else if(option == "courses"){
      setChoice('courses')
    }
    else if(option == "queries"){
      setChoice('queries')
    }else return console.log('Choose')
  }


  return (
    <div className="admin-main-container">
      <div className="admin-greet-container">
        <p className="p-admin-greet">Welcome {userInfo.first_name}!</p>
      </div>
      <div className="admin-container">
        <div className="admin-profile-container" onClick={()=>handleChoice('profile')}>
          <h3>Users</h3>
        </div>
        <div className="admin-course-container" onClick={()=>handleChoice('courses')}>
          <h3>Courses</h3>
        </div>
        <div className="admin-subscription-container" onClick={()=>handleChoice('queries')}>
          <h3>Queries</h3>
        </div>
      </div>
      {choice == 'profile' && (<AllUsers choice={()=>setChoice('')}/>)}
      {choice == 'courses' && (<AllCourses choice={()=>setChoice('')}/>)}
      {choice == 'queries' && (<AllQueries choice={()=>setChoice('')}/>)}
    </div>
  );
}

export default AdminDash;
