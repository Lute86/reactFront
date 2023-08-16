import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context";
import axios from "axios";
import './AdminDash.css'
import Spinner from "../components/Spinner";

function AdminDash() {
  const { isLoggedIn, userRole, userInfo } = useGlobalState();
  const [allUsers, setAllUsers] = useState(null);

  async function getAllUsers() {
    try {
      const response = await axios.get("http://localhost:4001/admin/user/all", {
        withCredentials: true,
      });
      setAllUsers(response.data);
    } catch (error) {
      console.error("Fetch users error", error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="admin-container">
      {/* {userInfo && <div>AdminDash {userInfo.first_name}</div>}{" "} */}
      <div className="admin-content">
        <h2>All users</h2>
        {allUsers ? (
          <ul>
            {allUsers.map((user) => (
              <li key={user.id}>
                {user.first_name}

                <>
                  <button>Update</button>
                  <button>Delete</button>
                </>
              </li>
            ))}
          </ul>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default AdminDash;
