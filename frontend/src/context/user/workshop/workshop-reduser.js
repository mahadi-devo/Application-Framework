import {
  ADD_WORKSHOP,
  DELETE_WORKSHOP,
  GET_WORKSHOP,
  SET_WORKSHOP,
  UPDATE_WORKSHOP,
  CLEAR_WORKSHOP,
  DELETE_WORKSHOP,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case ADD_WORKSHOP:
      return {
        ...state,
        workshops: [action.payload, ...state.workshops],
      };
    case GET_WORKSHOP:
      return {
        ...state,
        workshops: action.payload,
      };
    case SET_WORKSHOP:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_WORKSHOP:
      return {
        ...state,
        current: null,
      };
    case DELETE_WORKSHOP:
      return {
        ...state,
        workshops: state.workshops.filter(
          (workshop) => workshop._id !== action.payload
        ),
      };
    case UPDATE_WORKSHOP:
      console.log('Inside');
      return {
        ...state,
        workshops: state.workshops.map((workshop) =>
          workshop._id === action.payload._id ? action.payload : workshop
        ),
      };
    default:
      return state;
  }
};
