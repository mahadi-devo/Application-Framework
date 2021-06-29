import React, { useReducer } from "react";
import ConferenceContext from "./conference-context";
import ConferenceReducer from "./conference-reducer";
import axios from "axios";
import {
  GET_CONFERENCES,
  ADD_CONFERENCES,
  GET_CONFERENCE,
  FILTER_CONFERENCE,
  CLEAR_FILTER,
  SAVE_KEYNOTES,
  GET_KEYNOTES,
  SAVE_CONFERENCE,
  EDIT_CONFERENCE,
  GET_PENDING_CONFERENCES,
} from "./types";

const ConferenceState = (props) => {
  const initialState = {
    conferences: [],
    conference: {},
    pendingConference: [],
    conferenceId: "",
    keynotes: [],
    filtered: null,
  };

  const [state, dispatch] = useReducer(ConferenceReducer, initialState);

  const getAllConferences = async () => {
    // dispatch({ type: GET_CONFERENCE, payload: id });
    try {
      const res = await axios.get("http://localhost:5000/api/v1/conferences");
      console.log(res);
      dispatch({ type: GET_CONFERENCES, payload: res.data.data });
    } catch (error) {}
  };

  const getPendingConferences = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/conferences/pending",
        config
      );
      console.log(res);
      dispatch({ type: GET_PENDING_CONFERENCES, payload: res.data.data });
    } catch (error) {}
  };

  const editConference = async (conference) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
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
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/keynotes",
        keynote,
        config
      );

      console.log("state", res.data);
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
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/conferences/${id}`
      );
      dispatch({ type: GET_CONFERENCE, payload: res.data.data });
    } catch (error) {}
  };

  const addConference = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const formData = {
      data: data,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/conferences",
        formData,
        config
      );

      console.log("state conf", res.data.conference._id);

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

  const updateKeynote = async (keynote) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log("state keynote", keynote);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/keynotes/${keynote._id}`,
        keynote,
        config
      );
      getKeynotes(keynote.conferenceId);
    } catch (error) {}
  };

  const deleteKeynote = async (keynote) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/keynotes/${keynote._id}`,
        config
      );
      getKeynotes(keynote.conferenceId);
    } catch (error) {}
  };

  const filterConferences = (text) => {
    console.log(text);
    dispatch({
      type: FILTER_CONFERENCE,
      payload: text,
    });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ConferenceContext.Provider
      value={{
        conferences: state.conferences,
        conference: state.conference,
        conferenceId: state.conferenceId,
        pendingConferences: state.pendingConference,
        keynotes: state.keynotes,
        filtered: state.filtered,
        filterConferences,
        clearFilter,
        getConference,
        addConference,
        getAllConferences,
        editConference,
        addKeynote,
        getKeynotes,
        getPendingConferences,
        updateKeynote,
        deleteKeynote,
      }}
    >
      {props.children}
    </ConferenceContext.Provider>
  );
};

export default ConferenceState;
