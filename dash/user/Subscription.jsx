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