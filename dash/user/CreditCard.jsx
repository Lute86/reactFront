import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import axios from "axios";
import "./CreditCard.css"; // Import the CSS file
import { useGlobalState } from "../../context";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PaymentForm = ({toggle}) => {
  const [paymentState, setPaymentState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const{APIURL, userInfo, loading, setLoading, changeHappened, setChangeHappened}=useGlobalState();
  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setPaymentState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setPaymentState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo.id)
    setLoading(true)
    try {
      // Make a POST request to your payment endpoint with formData
      const response = await axios.post(APIURL+`user/${userInfo.id}/payment`, {
        cardNumber: paymentState.number,
        expiryDate: paymentState.expiry,
        cardCvv: paymentState.cvc,
        name: paymentState.name,
      },{withCredentials:true});
      
      // Handle the response (e.g., show a success message)
      console.log(response.data);
      try {
        const subscribe = await axios.put(APIURL+`user/my/subscription/${userInfo.id}`,{},
        {withCredentials:true})
        console.log(subscribe.data)
        toggle(false)
        setChangeHappened(!changeHappened)
      } catch (error) {
        setLoading(false)
        console.log('Error al pagar')
        console.error(error)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // Handle errors (e.g., display an error message)
      console.error(error);
    }
  };
  
  return (
    <div className="credit-card-form">
      <Cards
        className= "card-css"
        number={paymentState.number}
        expiry={paymentState.expiry}
        cvc={paymentState.cvc}
        name={paymentState.name}
        focused={paymentState.focus}
      />
      <form>
        <div className="form-group">
          <label htmlFor="number">Card Number</label>
          <input
            type="tel"
            id="number"
            name="number"
            placeholder="Card Number"
            value={paymentState.number}
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
            placeholder="MM/YY"
            value={paymentState.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            inputMode="numeric"
            maxLength="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            placeholder="333"
            value={paymentState.cvc}
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
            value={paymentState.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            pattern="[A-Za-z\s]+"
          />
        </div>
      </form>
        <div className="button-container">
          <button type="submit" className="button" onClick={handleSubmit}>
            {loading ? <Spinner/> : "Submit Payment"}
          </button>
        </div>
    </div>
  );
};

export default PaymentForm;
