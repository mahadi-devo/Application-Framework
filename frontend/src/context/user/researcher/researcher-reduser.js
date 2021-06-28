import {
  ADD_RESEARC,
  GET_RESEARC,
  UPDATE_RESEARC,
  DELETE_RESEARC,
  SET_RESEARC,
  CLEAR_RESEARC,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case ADD_RESEARC:
      return {
        ...state,
        researchs: [action.payload, ...state.researchs],
      };
    case GET_RESEARC:
      return {
        ...state,
        researchs: action.payload,
      };
    case SET_RESEARC:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_RESEARC:
      return {
        ...state,
        current: null,
      };
    case DELETE_RESEARC:
      return {
        ...state,
        researchs: state.researchs.filter(
          (research) => research._id !== action.payload
        ),
      };
    case UPDATE_RESEARC:
      console.log('Inside');
      return {
        ...state,
        researchs: state.researchs.map((research) =>
          research._id === action.payload._id ? action.payload : research
        ),
      };
    default:
      return state;
  }
};
