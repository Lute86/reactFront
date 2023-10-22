import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../context";
import "./Subscription.css";
import PaymentForm from "./CreditCard";
import axios from "axios";

function Subscription() {
  const {
    setModalOpen,
    userInfo,
    APIURL,
    pingUser,
    changeHappened,
    setChangeHappened,
  } = useGlobalState();
  const [toggleSub, setToggleSub] = useState(false);

  useEffect(() => {
    pingUser();
    //console.log(userInfo.subscribed)
  }, [changeHappened]);

  const handleSubscription = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to unsubscribe?"
    );
    // Check if the user confirmed the deletion
    if (isConfirmed) {
      try {
        const response = await axios.put(
          APIURL + "user/my/unsubscription/" + userInfo.id,
          {},
          { withCredentials: true }
        );
        console.log("Unsubscribed");
        setChangeHappened(!changeHappened);
        return;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="user-subscribed-container">
      <h3>Subscription</h3>
      <hr className="user-subscribed-container-hr"/>
      {userInfo.subscribed && (
        <div className="user-subscribed-content">
          <div>
            Subscription status: <span>ACTIVE</span>
          </div>
          <div>
            Validity: <span>Lifetime</span>
          </div>
          <hr className="user-subscribed-container-hr"/>
          <div className="wish-to-cancel">Wish to cancel?</div>
          <button
            className="user-unsubscribe-button"
            onClick={handleSubscription}
          >
            Unsubscribe
          </button>
        </div>
      )}
      {!userInfo.subscribed && !toggleSub && (
        <div className="user-subscribed-content">
          <div>
            Subscription price: <span>$99</span>
          </div>
          <div>
            Validity: <span>Lifetime</span>
          </div>
          <hr />
          <div className="wish-to-cancel">Wish to subscribe?</div>
          <button
            className="user-unsubscribe-button"
            onClick={() => setToggleSub(true)}
          >
            Subscribe
          </button>
        </div>
      )}
      {!userInfo.subscribed && toggleSub && (
        <PaymentForm toggle={() => setToggleSub(false)} />
      )}
      <button onClick={() => setModalOpen(false)}>Close</button>
    </div>
  );
}

export default Subscription;
