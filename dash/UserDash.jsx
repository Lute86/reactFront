import React from "react";
import { useGlobalState } from "../context";
import './UserDash.css'
import CourseList from "./CourseList";

function UserDash() {
  const { isLoggedIn, userRole, userInfo } = useGlobalState();

  return (
    <div className="user-container">
      <p className="p-user-greet">UserDash {userInfo.first_name}</p>
      <CourseList/>
    </div>
  );
}

export default UserDash;
