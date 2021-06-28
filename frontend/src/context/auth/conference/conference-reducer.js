import {
  GET_CONFERENCES,
  ADD_CONFERENCES,
  GET_CONFERENCE,
  FILTER_CONFERENCE,
  CLEAR_FILTER,
  CLEAR_KEYNOTES,
  SAVE_CONFERENCE,
  GET_KEYNOTES,
  EDIT_CONFERENCE,
  GET_PENDING_CONFERENCES,
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

    case GET_PENDING_CONFERENCES:
      return {
        ...state,
        pendingConference: action.payload,
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

    default:
      break;
  }
};

export default ConferenceReducer;
