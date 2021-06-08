import {
  GET_CONFERENCES,
  ADD_CONFERENCES,
  GET_CONFERENCE,
  FILTER_CONFERENCE,
  CLEAR_FILTER,
} from './types';

const ConferenceReducer = (state, action) => {
  switch (action.type) {
    case GET_CONFERENCE:
      return {
        ...state,
        conference: state.conferences.filter(
          (confer) => confer._id === action.payload
        ),
      };

    default:
      break;
  }
};

export default ConferenceReducer;
