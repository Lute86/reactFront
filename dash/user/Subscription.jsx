import React, { useState } from 'react'
import { useGlobalState } from '../../context';
import "./Subscription.css";
import PaymentForm from './CreditCard';

function Subscription() {
  const { setModalOpen, userInfo } = useGlobalState();
  const [toggleSub, setToggleSub] = useState(false);
  const handleSubscription = async () => {
    if (!userInfo.subscribed) {
      const response = await axios.put(
        "http://localhost:4001/user/my/subscription/" + userInfo.id,
        {},
        { withCredentials: true }
      );
      //setUserInfo(userInfo.subscribed=true)
      setSubscription(true);
      return console.log("Subscribed");
    } else {
      const response = await axios.put(
        "http://localhost:4001/user/my/unsubscription/" + userInfo.id,
        {},
        { withCredentials: true }
      );
      //setUserInfo(userInfo.subscribed=false)
      setSubscription(false);
      return console.log("Unsubscribed");
    }
  };

  return (
    <div className='user-subscribed-container'>
      <h3>
        Subscription
      </h3>
      <hr />
      {userInfo.subscribed && (<div className='user-subscribed-content'>
        <div>Subscription status: <span>ACTIVE</span></div>
        <div>Validity: <span>Lifetime</span></div>
        <hr />
        <div className='wish-to-cancel'>
          Wish to cancel? 
        </div>
          <button className='user-unsubscribe-button'>Unsubscribe</button>
      </div>)}
      {!userInfo.subscribed && !toggleSub && (<div className='user-subscribed-content'>
        <div>Subscription price: <span>$99</span></div>
        <div>Validity: <span>Lifetime</span></div>
        <hr />
        <div className='wish-to-cancel'>
          Wish to subscribe? 
        </div>
          <button className='user-unsubscribe-button' onClick={()=>setToggleSub(true)}>Subscribe</button>
      </div>)}
      {!userInfo.subscribed && toggleSub && <PaymentForm />}
      <button onClick={()=>setModalOpen(false)}>Close</button>
    </div>
  )
}

export default Subscription


