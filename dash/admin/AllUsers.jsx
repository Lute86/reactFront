import React, { useState, useEffect } from "react";
import axios from "axios";
import './AllUsers.css'
import { useGlobalState } from '../../context'
import ListUsers from "./ListUsers";

const AllUsersFetch = ({choice}) => {
  const {userInfo, APIURL, allUsers, setAllUsers} = useGlobalState();
  const [allUsersChanged, setAllUsersChanged] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      //console.log(userInfo.id)
      try {
        if (userInfo && userInfo.role == 'admin') {
          const response = await axios.get(APIURL+"admin/user/all", {
            withCredentials: true,
          });
          //console.log(response.data)
          setAllUsers(response.data);
        }
      } catch (error) {
        console.error("Fetch courses error", error);
      }
    }
  
    getAllUsers();
  }, [allUsersChanged]); // Include userInfo as a dependency to re-fetch when it changes
  

  return (
    <div className="allusers-modal">
      {allUsers && (<><h2>Profile</h2>
      <ListUsers change={setAllUsersChanged} choice={choice}/></>)}
    </div>
  );
};

export default AllUsersFetch;
