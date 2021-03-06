import React, { useReducer } from 'react';
import axios from 'axios';
import ResearcherContext from './researcher-context';
import ResearcherReduser from './researcher-reduser';
import {
  ADD_RESEARC,
  UPDATE_RESEARC,
  GET_RESEARC,
  DELETE_RESEARC,
  SET_RESEARC,
  CLEAR_RESEARC,
} from './types';

const researcherState = (props) => {
  const initialState = {
    researchs: [],
    current: null,
  };

  const [state, dispatch] = useReducer(ResearcherReduser, initialState);

  const addResearch = async (research) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const data = {};

    data.title = research.research.title;
    data.author = research.research.author;
    data.email = research.research.email;
    data.abstract = research.research.abstract;
    data.area = research.research.area;
    data.file = research.research.file;
    data.conference = research.confrence;
    console.log(data);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/researcher',
        data,
        config
      );
      dispatch({ type: ADD_RESEARC, payload: res.data });
    } catch (error) {
      console.error();
    }
  };

  const getResearch = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/researcher',
        config
      );
      //console.log(res);
      dispatch({ type: GET_RESEARC, payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteResearch = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    // console.log(id);
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/researcher/${id}`,
        config
      );
      dispatch({ type: DELETE_RESEARC, payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  const updateResearch = async (research) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/researcher/${research._id}`,
        research,
        config
      );
      console.log(res);
      dispatch({ type: UPDATE_RESEARC, payload: res.data });
      getResearch();
    } catch (error) {
      console.error();
    }
  };

  const setItem = (research) => {
    dispatch({ type: SET_RESEARC, payload: research });
  };

  const clearItem = () => {
    console.log('Clear method');
    dispatch({ type: CLEAR_RESEARC });
  };

  return (
    <ResearcherContext.Provider
      value={{
        researchs: state.researchs,
        current: state.current,
        addResearch,
        getResearch,
        updateResearch,
        deleteResearch,
        setItem,
        clearItem,
      }}>
      {props.children}
    </ResearcherContext.Provider>
  );
};

export default researcherState;
