import React, { useReducer } from 'react';
import axios from 'axios';
import WorkshopContext from './workshop-context';
import WorkshopReducer from './workshop-reduser';
import {
  ADD_WORKSHOP,
  GET_WORKSHOP,
  UPDATE_WORKSHOP,
  DELETE_WORKSHOP,
  SET_WORKSHOP,
  CLEAR_WORKSHOP,
} from './types';

const workshopState = (props) => {
  const initialState = {
    workshops: [],
    current: null,
  };

  const [state, dispatch] = useReducer(WorkshopReducer, initialState);

  const addWorkshop = async (workshop) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(workshop.confrence);

    const data = {};

    data.title = workshop.workshop.title;
    data.author = workshop.workshop.author;
    data.email = workshop.workshop.email;
    data.phone = workshop.workshop.phone;
    data.discription = workshop.workshop.discription;
    data.address = workshop.workshop.address;
    data.start = workshop.workshop.start;
    data.end = workshop.workshop.end;
    data.conference = workshop.confrence;
    console.log(workshop);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/workshop',
        data,
        config
      );
      dispatch({ type: ADD_WORKSHOP, payload: res.data });
    } catch (error) {
      console.error();
    }
  };

  const getWorkshop = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/workshop');
      dispatch({ type: GET_WORKSHOP, payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWorkshop = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(id);
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/workshop/${id}`
      );
      dispatch({ type: DELETE_WORKSHOP, payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  const updateeWorkshop = async (workshop) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/workshop/${workshop._id}`,
        workshop,
        config
      );
      console.log(res);
      dispatch({ type: UPDATE_WORKSHOP, payload: res.data });
      getWorkshop();
    } catch (error) {
      console.error();
    }
  };

  const setItem = (workshop) => {
    dispatch({ type: SET_WORKSHOP, payload: workshop });
  };

  const clearItem = () => {
    console.log('Clear method');
    dispatch({ type: CLEAR_WORKSHOP });
  };

  return (
    <WorkshopContext.Provider
      value={{
        workshops: state.workshops,
        current: state.current,
        addWorkshop,
        getWorkshop,
        updateeWorkshop,
        deleteWorkshop,
        setItem,
        clearItem,
      }}>
      {props.children}
    </WorkshopContext.Provider>
  );
};

export default workshopState;
