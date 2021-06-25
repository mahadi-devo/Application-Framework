import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import WorkshopContext from './workshop-context';
import WorkshopReducer from './workshop-reduser';
import { ADD_WORKSHOP } from './types';

const workshopState = (props) => {
  const initialState = {
    workshops: [
      {
        id: 1,
        title: 'Application Framework Workshop',
        author: 'Aflal',
        email: 'aflal@gmail.com',
        phone: '07688888888',
        abstract: 'Learn about react hooks...',
        address: 'MERN Stack',
        start: '',
        end: '',
      },
      {
        id: 2,
        title: 'Application Framework Workshop',
        author: 'Ahamed',
        email: 'ahamed@gmail.com',
        phone: '07688888888',
        abstract: 'Learn about react hooks...',
        address: 'Software Architecture',
        start: '',
        end: '',
      },
    ],
  };

  const [state, dispatch] = useReducer(WorkshopReducer, initialState);

  const addWorkshop = async (workshop) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(workshop);

    try {
      const res = await axios.post('/api/v1/workshop', workshop, config);
      dispatch({ type: ADD_WORKSHOP, payload: res.data });
    } catch (error) {
      console.error();
    }
  };

  return (
    <WorkshopContext.Provider
      value={{
        workshops: state.workshops,
        addWorkshop,
      }}>
      {props.children}
    </WorkshopContext.Provider>
  );
};

export default workshopState;
