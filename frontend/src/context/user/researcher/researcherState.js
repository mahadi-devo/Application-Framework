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
        file: '',
      },
      {
        id: 2,
        title: 'Software Architec',
        author: 'Ahamed',
        email: 'ahamed@gmail.com',
        abstract: 'Learn about archi...',
        area: 'MicroKernal Architect',
        file: '',
      },
    ],
  };

  const [state, dispatch] = useReducer(ResearcherReduser, initialState);

  const addResearch = async (research) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const formData = {
      user: '60b3c8d692ac32b7fba8acc7',
      data: research,
    };

    try {
      const res = await axios.post('/api/v1/researcher', formData, config);
      dispatch({ type: ADD_RESEARCH, payload: res.data });
    } catch (error) {
      console.error();
    }
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
