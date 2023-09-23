import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UpdateUser.css";
import { useGlobalState } from "../../context";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { FaBackspace, FaEdit } from "react-icons/fa";

const UpdateUser = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
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
    userInfo,
    modalOpen,
    setModalOpen,
  } = useGlobalState();
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: password,
    new_password: newPassword,
  });

  useEffect(() => {
    return () => {
      setLoading(false);
      setLoginError(false);
      setServerDown(false);
      setDuplicateEmail(false);
    };
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setFailedInput([]);
    
    try {
      const newUser = {
        first_name: firstName || user.first_name,
        last_name: lastName || user.last_name,
        email: email || user.email,
        password: password,
      };
      if(newPassword) newUser.new_password = newPassword;
      console.log(newUser)
      const response = await axios.put(
        `http://localhost:4001/user/update/${userInfo.id}`, newUser,
        {withCredentials: true});
      if (!response.data) throw new Error();
      setModalOpen(false)
    } catch (error) {
      console.error("Registration error", error);
      setLoginError(true);

      if (
        error.response !== undefined &&
        (error.response.status === 401 || error.response.data.error)
      ) {
        if (error.response.data.error === "Validation error") {
          console.error("Email exists");
          setDuplicateEmail(true);
        }
      } else if (!error.response || (error.response && error.response.status === 500)) {
        setServerDown(true);
      } else if (!error.response || (error.response && error.response.status === 400)) {
        const paramValues = error.response.data.errors;
        paramValues.forEach((element) => {
          setFailedInput((prev) => new Set([...prev, element.param]));
        });
      }
      setLoading(false);
    }
  };

  const toggleEditableField = (fieldName) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

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
    <div className="update-user-container">
      <div className="update-user-form">
        <h1>My profile</h1>
        <hr/>
        <div>
          <label
            htmlFor="name"
            className={`${handleInputs("first_name")?"update-user-login-error":""} ${editableFields.firstName ? "update-user-label-edit" : ""}`}
          >
            First Name: {!editableFields.firstName && <span>{user.first_name}</span>} {!editableFields.firstName &&<FaEdit onClick={() => toggleEditableField("firstName")}/>}{editableFields.firstName &&<FaBackspace onClick={() =>{ toggleEditableField("firstName")
            setFirstName('')
          }}/>}
          </label>
          {editableFields.firstName && (
            <input
              id="name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          ) 
           
          }
        </div>
        <div>
          <label
            htmlFor="last"
            className={`${editableFields.lastName ? "update-user-label-edit" : ""}`}
          >
            Last Name: {!editableFields.lastName && <span>{user.last_name}</span>} {!editableFields.lastName &&<FaEdit onClick={() => toggleEditableField("lastName")}/>}{editableFields.lastName &&<FaBackspace onClick={() => {
              toggleEditableField("lastName")
              setLastName('')
          }}/>}
          </label>
          {editableFields.lastName && (
            <input
              id="last"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className={`${editableFields.email ? "update-user-label-edit" : ""}`}
          >
            Email: {!editableFields.email && <span>{user.email}</span>} {!editableFields.email &&<FaEdit onClick={() => toggleEditableField("email")}/>}{editableFields.email &&<FaBackspace onClick={() => {
              setEmail('')
              toggleEditableField("email")}}/>}
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
        <div>
          <label
            htmlFor="password"
            className={`${handleInputs("password")?"update-user-login-error":""} ${editableFields.password ? "update-user-label-edit" : ""}`}
          >
            Password: 
          </label>
            
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Write current Password"
              /></div>
              <label htmlFor="newPassword" className={`${handleInputs("new_password")?"update-user-login-error":""}`} >New Password: (optional) {!editableFields.newPassword && (<FaEdit onClick={() => toggleEditableField("newPassword")}/>)} {editableFields.newPassword && <FaBackspace onClick={() =>{
                setNewPassword('')
             toggleEditableField("newPassword")}}/>}
             </label>
              <div>
             {editableFields.newPassword && (<input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Optional"
                min="6"
              />)}
        </div>
        <div>
          <label>Subscribed: {user.subscribed?"Yes":"No"}</label>
        </div>
        <p className={loginError ? "update-user-login-error" : "update-user-login"}>
          {serverDown
            ? "Server down"
            : `"Wrong credentials" ${
                duplicateEmail ? ". Email already exists." : ""
              }`}
        </p>
        <button onClick={handleUpdate}>
          {!loading ? "Update" : <Spinner />}
        </button>
        <button onClick={() => setModalOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default UpdateUser;
