import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import axios from "axios";
import "./CreditCard.css"; // Import the CSS file

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your payment endpoint with formData
      const response = await axios.post("/your-payment-endpoint", {
        number: state.number,
        expiry: state.expiry,
        cvc: state.cvc,
        name: state.name,
      });

      // Handle the response (e.g., show a success message)
      console.log(response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error(error);
    }
  };

  return (
    <div className="credit-card-form">
      <Cards
        className= "card-css"
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form>
        <div className="form-group">
          <label htmlFor="number">Card Number</label>
          <input
            type="tel"
            id="number"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            inputMode="numeric"
            maxLength="16"
            pattern="\d*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiry">Expiry</label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            placeholder="Expiry"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            inputMode="numeric"
            maxLength="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            placeholder="CVC"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            inputMode="numeric"
            maxLength="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            pattern="[A-Za-z\s]+"
          />
        </div>
      </form>
        <div className="button-container">
          <button type="submit" className="button" onClick={handleSubmit}>
            Submit Payment
          </button>
        </div>
    </div>
  );
};

export default PaymentForm;
