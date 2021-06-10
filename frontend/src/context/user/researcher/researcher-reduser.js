import { ADD_RESEARCH } from './types';

export default (state, action) => {
  switch (action.type) {
    case ADD_RESEARCH:
      return {
        ...state,
        researchs: [...state.researchs, action.payload],
      };
    default:
      return state;
  }
};
