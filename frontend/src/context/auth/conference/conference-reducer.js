import {
  GET_CONFERENCES,
  ADD_CONFERENCES,
  GET_CONFERENCE,
  FILTER_CONFERENCE,
  CLEAR_FILTER,
  SAVE_KEYNOTES,
  CLEAR_KEYNOTES,
  SAVE_CONFERENCE,
  GET_KEYNOTES,
  EDIT_CONFERENCE,
} from './types';

const ConferenceReducer = (state, action) => {
  switch (action.type) {
    case GET_CONFERENCES:
      return {
        ...state,
        conferences: action.payload,
      };

    case GET_CONFERENCE:
      return {
        ...state,
        conference: action.payload,
      };

    case EDIT_CONFERENCE:
      return {
        ...state,
        conference: action.payload,
      };

    case SAVE_CONFERENCE:
      return {
        ...state,
        conferenceId: action.payload,
      };

    case GET_KEYNOTES:
      return {
        ...state,
        keynotes: action.payload,
      };

    case CLEAR_KEYNOTES:
      return {
        ...state,
        keynotes: null,
      };

    case SAVE_KEYNOTES:
      return {
        ...state,
        keynotes: [action.payload, ...state.keynotes],
      };

    default:
      break;
  }
};

export default ConferenceReducer;
