import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ListUsers.css";
import axios from "axios";
import { useGlobalState } from "../../context";
import EditUser from "./EditUser";

const ListUsers = ({ change, choice }) => {
  // Note the change from 'user' to 'users'
  const { APIURL, allUsers, setAllUsers } = useGlobalState();
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState();

  const handleDelete = async (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    // Check if the user confirmed the deletion
    if (isConfirmed) {
      try {
        const deleteUser = await axios.delete(
          APIURL + `admin/user/delete/${id}`,
          { withCredentials: true }
        );
        if (!deleteUser.error) {
          // User confirmed and deletion was successful
          change(Boolean);
        }
      } catch (error) {
        console.error("Unable to delete user");
      }
    } else {
      // User cancelled the deletion, no action needed
      console.log("User cancelled the deletion.");
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    setOpenEdit(true);
  };

  const handleContentClick = (event) => {
    // Prevent the click event from propagating to the modal background
    event.stopPropagation();
  };

  // Check if allUsers is defined and not an empty array
  if (!Array.isArray(allUsers) || allUsers.length === 0) {
    return (
      <div className="all-courses-list-modal" onClick={() => choice()}>
        <div className="no-data-container">
          <div className="no-data-title" onClick={handleContentClick}>
            <h3>Courses</h3>
            <hr />
          </div>
          <p onClick={handleContentClick}>No data to display</p>

          <button className="no-data-button-close" onClick={() => choice()}>
            Close
          </button>
        </div>
      </div>
    );
  }

  const tableHeadersFull = Object.keys(allUsers[0]); // Assuming all users have the same structure
  const filtros = ["password", "deletedAt", "createdAt", "updatedAt"];
  const tableHeaders = tableHeadersFull.filter((key) => !filtros.includes(key));

  return (
    <div className="all-users-list-modal" onClick={() => choice()}>
      <div className="all-users-list-container" onClick={handleContentClick}>
        {openEdit ? (
          <EditUser userId={editId} close={() => setOpenEdit(false)} />
        ) : (
          <>
            <table
              className="all-users-list-content"
              onClick={handleContentClick}
            >
              <table
                className="all-users-list-content"
                onClick={handleContentClick}
              >
                <thead>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user.id}>
                      {tableHeaders.map((header) => (
                        <td
                          key={header}
                          className={
                            header === "courses"
                              ? "list-user-courses-header"
                              : ""
                          }
                        >
                          {header === "subscribed"
                            ? user[header] === true
                              ? "Yes"
                              : "No"
                            : header === "courses"
                            ? user[header].map((element) => {
                                return (
                                  <p>{element.course_name}</p>
                                );
                              })
                            : user[header]}
                        </td>
                      ))}
                      <td>
                        <button onClick={() => handleEdit(user.id)}>
                          <FaEdit />
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(user.id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </table>
            <button className="button-close-listusers" onClick={() => choice()}>
              Close
            </button>
          </>
        )}
        ;
      </div>
    </div>
  );
};
export default ListUsers;
