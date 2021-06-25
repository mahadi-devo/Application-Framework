import { ADD_WORKSHOP } from './types';

export default (state, action) => {
  switch (action.type) {
    case ADD_WORKSHOP:
      return {
        ...state,
        researchs: [...state.workshops, action.payload],
      };
    default:
      return state;
  }
};
