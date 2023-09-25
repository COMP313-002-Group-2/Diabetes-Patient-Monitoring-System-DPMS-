import React from "react";

const accountContext = React.createContext({
  loggedIn: true,
  setLoggedIn: (value) => {
    this.loggedIn = value;
  },
  userType: "",
  setUserType: (user) => {
    this.userType = user;
  },
  userId: "",
  setUserId: (id) => {
    this.userId = id;
  },
});

export default accountContext;
