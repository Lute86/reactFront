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
import usePingUser from '../../hooks/usePingUser'

function AdminDash() {
  const { isLoggedIn, userRole, userInfo, setUserInfo, setIsLoggedIn, setUserRole } = useGlobalState();
  const [choice, setChoice] = useState('')
  const navigate = useNavigate();
  const { pingUser } = usePingUser();
  
  
  useEffect(() => {
    pingUser()
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
