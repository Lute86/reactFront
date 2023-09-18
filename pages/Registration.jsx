import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";
import { useGlobalState } from "../context";
import Spinner from "../components/Spinner";
import axios from "axios";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedInput, setFailedInput] = useState(new Set());
  const navigate = useNavigate();
  const {
    loginError,
    setLoginError,
    serverDown,
    setServerDown,
    loading,
    setLoading,
  } = useGlobalState();
  const [duplicateEmail, setDuplicateEmail] = useState(false)

  useEffect(() => {
    return () => {
      setLoading(false);
      setLoginError(false);
      setServerDown(false);
      setDuplicateEmail(false)
    };
  }, []);

  const handleRegistration = async () => {
    setLoading(true);
    setFailedInput([]);
    try {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      };
  
      const response = await axios.post("http://localhost:4001/auth/register", newUser);
  
      if (!response.data) throw new Error();
  
      navigate("/login");
    } catch (error) {
      console.error("Registration error", error);
      setLoginError(true);
      
      if (error.response !== undefined && (error.response.status === 401 || error.response.data.error)) {
        console.log("Entro credentials error");
        if (error.response.data.error === "Validation error") {
          console.error("Email exists");
          setDuplicateEmail(true);
        }

      } else if (!error.response || error.response && error.response.status === 500) {
        console.log("Entro server error");
        setServerDown(true);
      }
      else if (!error.response || error.response && error.response.status === 400) {
        // error.response.data.errors.forEach(element => {
        //   console.log("Wrong credentials 400", element.msg, element.param) 
        //   setFailedInput(prevFailedInput => [...prevFailedInput, element.param]);
        // })
        const paramValues = error.response.data.errors
        console.log(paramValues)
        paramValues.map(element => {
          console.log("Wrong credentials 400", element.msg, element.param) 
          setFailedInput((prev) => new Set([...prev, element.param]));
        });
      }
      console.log(failedInput)
      setLoading(false);
    }
  };
  
  const handleInputs = (value) => {
  
    let valueInput = false;
  
    failedInput.forEach((element) => {
      if (element === value) {
        valueInput = true;
      }
    });
    console.log(valueInput)
    return valueInput;
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h1>Registration</h1>
        <div>
          <label for="name" className={`${handleInputs("first_name")?'label-fail':""}`}>First Name:
          </label>
          <input 
            id="name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
          />
        </div>
        <div>
          <label for="last" className={`${handleInputs("last_name")?'label-fail':""}`}>Last Name:
          </label>
          <input 
            id="last"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
          />
        </div>
        <div>
          <label for="email" className={`${handleInputs("email")?'label-fail':""}`}>Email:
          </label>
          <input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@doe.com"
          />
        </div>
        <div>
          <label for="password" className={`${handleInputs("password")?'label-fail':""}`}>Password:
          </label>
          <input className={``}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="1exMdw"
          />
        </div>
        <p className={loginError?'p-login-error':'p-login'}>{serverDown ? 'Server down' : `"Wrong credentials" ${duplicateEmail ? '. Email already exists.' : ''}`}</p>
        <button onClick={handleRegistration}>{!loading ? "Register" : <Spinner />}</button>
        <p>
          Already have a user? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
