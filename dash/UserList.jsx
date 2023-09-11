import React, { useState, useEffect } from "react";
import axios from "axios";
import ListTable from "../components/ListTable";
import './UserList.css'
import { useGlobalState } from '../context'
import ListUnique from "../components/ListUnique";

const UserList = () => {
  const [myUser, setMyUser] = useState([]);
  const {userInfo} = useGlobalState();

  useEffect(() => {
    async function fetchUser() {
      //console.log(userInfo.id)
      try {
        if (userInfo && userInfo.id) {
          const response = await axios.get("http://localhost:4001/user/my/" + userInfo.id, {
            withCredentials: true,
          });
          //console.log(response.data)
          setMyUser(response.data);
        }
      } catch (error) {
        console.error("Fetch courses error", error);
      }
    }
  
    fetchUser();
  }, [userInfo]); // Include userInfo as a dependency to re-fetch when it changes
  

  const deleteUser = () => {
    // Implement delete functionality here
    //console.log(myUser)
    console.log(`Deleting course with ID: ${userInfo.id}`);
  };

  const editUser = () => {
    // Implement edit functionality here
    console.log(`Editing course with ID: ${userInfo.id}`);
  };

  return (
    <div className="user-list-container">
      <h2>Profile</h2>
      <ListUnique user={myUser} onDelete={deleteUser} onEdit={editUser}/>
    </div>
  );
};

export default UserList;
