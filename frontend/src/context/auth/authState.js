import React, { useReducer } from "react";
import authContext from "./auth-context";
import authReducer from "./auth-reducer";
import axios from "axios";

const AuthState = () => {
  const initState = {
    user: null,
    isAuth: null,
    error: null,
    err_msg: null,
    loading: true,
  };
  return;
};

export default AuthState;
