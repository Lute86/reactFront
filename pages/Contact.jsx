import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import { useGlobalState } from "../context";
import Spinner from "../components/Spinner";
import axios from "axios";
import Modal from "../components/Modal";
import Thanks from "../components/Thanks";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("payment");
  const [description, setDescription] = useState("");
  const [failedInput, setFailedInput] = useState(new Set());
  const {
    loginError,
    setLoginError,
    serverDown,
    setServerDown,
    loading,
    setLoading,
  } = useGlobalState();
  const [modalOpen, setModalOpen] = useState(false); // State for modal

  useEffect(() => {
    return () => {
      setLoading(false);
      setLoginError(false);
      setServerDown(false);
    };
  }, []);

  const handleContact = async () => {
    setLoading(true);
    setFailedInput(new Set());

    try {
      const contactData = {
        name,
        email,
        reason,
        description,
      };

      const response = await axios.post(
        "http://localhost:4001/query",
        contactData
      );

      if (!response.data) throw new Error();

      setModalOpen(true); // Open the full-screen modal on successful submission

      // Clear the form
      setName("");
      setEmail("");
      setReason("payment");
      setDescription("");
      setLoading(false)
      setLoginError(false)
    } catch (error) {
      console.error("Contact error", error);
      setLoginError(true);
      if (error.response !== undefined && error.response.status === 500) {
        setServerDown(true);
      } else if (error.response && error.response.status === 400) {
        const paramValues = error.response.data.errors;
        paramValues.forEach((element) => {
          setFailedInput((prev) => new Set([...prev, element.param]));
        });
      }

      setLoading(false);
    }
  };

  const handleInputs = (value) => {
    return failedInput.has(value);
  };

  return (
    <>
      
        <div className="contact-form-container">
          <div className="contact-form">
            <h1>Contact Us</h1>
            <div>
              <label htmlFor="name" className={`${handleInputs("name") ? "label-fail" : ""}`}>
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className={`${handleInputs("email") ? "label-fail" : ""}`}>
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="reason">Reason for Contact:</label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="course">Course</option>
                <option value="enrollment">Enrollment</option>
                <option value="payment">Payment</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="description"
                className={`${handleInputs("description") ? "label-fail" : ""}`}
              >
                Description:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your inquiry..."
                maxLength={255}
              />
            </div>
            <p className={loginError ? "p-login-error" : "p-login"}>
              {serverDown ? "Server down" : loginError ? "Missing fields" : ''}
            </p>
            <button onClick={handleContact}>
              {!loading ? "Submit" : <Spinner />}
            </button>
            <p>
              Join us now! <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
     
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <Thanks />
        </Modal>
      )}
    </>
  );
}

export default ContactForm;
