import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EditUser.css";
import { useGlobalState } from "../../context";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { FaBackspace, FaEdit } from "react-icons/fa";

const EditUser = ({ userId, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editableFields, setEditableFields] = useState({
    email: false,
  });
  const [failedInput, setFailedInput] = useState(new Set());
  const navigate = useNavigate();
  const {
    loginError,
    setLoginError,
    serverDown,
    setServerDown,
    loading,
    setLoading,
    modalOpen,
    setModalOpen,
    APIURL,
  } = useGlobalState();
  const [userToEdit, setUserToEdit] = useState(null);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const fetchUserToEdit = async () => {
    try {
      const editableUser = await axios.get(
        APIURL + `admin/user/param/${userId}`,
        { withCredentials: true }
      );
      setUserToEdit(editableUser.data[0]);
      const user = editableUser.data[0];
      setUpdatedUser({
        email: user.email,
      });
    } catch (error) {
      console.log("Error: ", error);
      alert("Couldn't acces user. ");
      close();
    }
  };

  //get user data and reset some context values
  useEffect(() => {
    fetchUserToEdit();
    return () => {
      setLoading(false);
      setLoginError(false);
      setServerDown(false);
      setDuplicateEmail(false);
    };
  }, []);

  const handleUpdate = async () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to update this user?"
    );
    // Check if the user confirmed the deletion
    if (isConfirmed) {
      setLoading(true);
      setFailedInput([]);
      try {
        const newUser = {
          email: email || userToEdit.email,
        };
        //if(newPassword) newUser.new_password = newPassword;
        console.log(newUser);
        const response = await axios.put(
          APIURL + `admin/user/update/${userId}`,
          newUser,
          { withCredentials: true }
        );
        if (!response.data) throw new Error();
        setModalOpen(false);
        setLoading(false);
        setUpdateSuccess(true)
        setTimeout(()=>{
          return setUpdateSuccess(false)
        }, 1500)
      } catch (error) {
        console.error("Edition error", error);
        setLoginError(true);

        if (
          error.response !== undefined &&
          (error.response.status === 401 || error.response.data.error)
        ) {
          if (error.response.data.error === "Validation error") {
            console.error("Email exists");
            setDuplicateEmail(true);
          }
        } else if (
          !error.response ||
          (error.response && error.response.status === 500)
        ) {
          setServerDown(true);
        } else if (
          !error.response ||
          (error.response && error.response.status === 400)
        ) {
          const paramValues = error.response.data.errors;
          paramValues.forEach((element) => {
            setFailedInput((prev) => new Set([...prev, element.param]));
          });
        }
        setLoading(false);
      }
    }
  };

  //edit/cancel edit field
  const toggleEditableField = (fieldName) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  //to manage inputs classes
  const handleInputs = (value) => {
    let valueInput = false;
    failedInput.forEach((element) => {
      if (element === value) {
        valueInput = true;
      }
    });
    return valueInput;
  };

  return (
    userToEdit && (
      <div className="edit-user-container">
        <div className="edit-user-form">
          <h1>{userToEdit.first_name} {userToEdit.last_name} profile</h1>
          <hr />
          <div className="edit-user-input-container">
            <label
              htmlFor="email"
              className={`${
                editableFields.email ? "edit-user-label-edit" : ""
              }`}
              onClick={
                !editableFields.email
                  ? () => toggleEditableField("email")
                  : () => {
                      setEmail("");
                      toggleEditableField("email");
                    }
              }
            >
              Email: {!editableFields.email && <span>{userToEdit.email}</span>}{" "}
              {!editableFields.email && <FaEdit />}
              {editableFields.email && <FaBackspace />}
            </label>
            {editableFields.email && (
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>
          <p
            className={loginError ? "edit-user-login-error" : updateSuccess ? "edit-user-login-success" : "edit-user-login"}
          >
            {updateSuccess ? "Successfully updated" : serverDown
              ? "Server down"
              : `"Wrong insertion" ${
                  duplicateEmail ? ". Email already exists." : ""
                }`}
          </p>
          <button onClick={handleUpdate}>
            {!loading ? "Update" : <Spinner />}
          </button>
          <button onClick={() => close()}>Close</button>
        </div>
      </div>
    )
  );
};

export default EditUser;
