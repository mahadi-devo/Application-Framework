import {
  SIGNUP_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SIGNUP_FAIL,
  SET_LOADING,
  USER_AUTH_FAIL,
  USER_AUTH_SUCCESS,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return;
    case SIGNUP_FAIL:
      return;
    case SIGN_IN_SUCCESS:
      return;
    case SIGN_IN_FAIL:
      return;
    case SET_LOADING:
      return;
    case SIGN_OUT:
      return;
    case USER_AUTH_SUCCESS:
      return;
    case USER_AUTH_FAIL:
      return;
    case UPDATE_PASSWORD_SUCCESS:
      return;
    case UPDATE_PASSWORD_FAILED:
      return;
    case CLEAR_ERRORS:
      return;
    case CLEAR_MESSAGES:
      return;
    default:
      return;
  }
};
