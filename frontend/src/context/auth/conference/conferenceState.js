import React, { useReducer } from 'react';
import ConferenceContext from './conference-context';
import ConferenceReducer from './conference-reducer';
import axios from 'axios';
import {
  GET_CONFERENCES,
  ADD_CONFERENCES,
  GET_CONFERENCE,
  FILTER_CONFERENCE,
  CLEAR_FILTER,
  SAVE_KEYNOTES,
  CLEAR_KEYNOTES,
  GET_KEYNOTES,
  SAVE_CONFERENCE,
  EDIT_CONFERENCE,
} from './types';

const ConferenceState = (props) => {
  const initialState = {
    conferences: [],
    conference: {},
    conferenceId: '',
    keynotes: [],
  };

  const [state, dispatch] = useReducer(ConferenceReducer, initialState);

  const getAllConferences = async () => {
    // dispatch({ type: GET_CONFERENCE, payload: id });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/conferences',
        config
      );
      console.log(res);
      dispatch({ type: GET_CONFERENCES, payload: res.data.data });
    } catch (error) {}
  };

  const editConference = async (conference) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/conferences/${conference._id}`,
        conference,
        config
      );
      console.log(res.data.conference);
      dispatch({ type: EDIT_CONFERENCE, payload: res.data.conference });
    } catch (error) {}
  };

  const addKeynote = async (keynote) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/keynotes',
        keynote,
        config
      );

      console.log('state', res.data);
      dispatch({
        type: SAVE_CONFERENCE,
        payload: res.data.keynote.conferenceId,
      });

      dispatch({
        type: SAVE_KEYNOTES,
        payload: res.data.keynote,
      });
    } catch (error) {}
  };

  const getConference = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/conferences/${id}`,
        config
      );
      dispatch({ type: GET_CONFERENCE, payload: res.data.data });
    } catch (error) {}
  };

  const addConference = async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const formData = {
      user: '60b3c8d692ac32b7fba8acc7',
      data: data,
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/conferences',
        formData,
        config
      );

      console.log('state conf', res.data.conference._id);

      dispatch({ type: SAVE_CONFERENCE, payload: res.data.conference._id });
    } catch (error) {
      console.log(error);
    }
  };

  const getKeynotes = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/keynotes/${id}`
      );
      dispatch({ type: GET_KEYNOTES, payload: res.data.data });
    } catch (error) {}
  };

  const clearKeynotes = async () => {
    dispatch({ type: CLEAR_KEYNOTES });
  };

  return (
    <ConferenceContext.Provider
      value={{
        conferences: state.conferences,
        conference: state.conference,
        conferenceId: state.conferenceId,
        keynotes: state.keynotes,
        getConference,
        clearKeynotes,
        addConference,
        getAllConferences,
        editConference,
        addKeynote,
        getKeynotes,
      }}>
      {props.children}
    </ConferenceContext.Provider>
  );
};

export default ConferenceState;
