import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import ResearcherContext from './researcher-context';
import ResearcherReduser from './researcher-reduser';
import { ADD_RESEARCH } from './types';

const researcherState = (props) => {
  const initialState = {
    researchs: [
      {
        id: 1,
        title: 'Application Framework',
        author: 'Aflal',
        email: 'aflal@gmail.com',
        abstract: 'Learn about react hooks...',
        area: 'MERN Stack',
      },
      {
        id: 2,
        title: 'Software Architec',
        author: 'Ahamed',
        email: 'ahamed@gmail.com',
        abstract: 'Learn about archi...',
        area: 'MicroKernal Architect',
      },
    ],
  };

  const [state, dispatch] = useReducer(ResearcherReduser, initialState);

  const addResearch = (research) => {
    research.id = uuid;
    dispatch({ type: ADD_RESEARCH, payload: research });
  };

  return (
    <ResearcherContext.Provider
      value={{
        researchs: state.researchs,
        addResearch,
      }}>
      {props.children}
    </ResearcherContext.Provider>
  );
};

export default researcherState;
