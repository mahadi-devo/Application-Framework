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
} from './types';

const ConferenceState = (props) => {
  const initialState = {
    conferences: [
      {
        _id: 1,
        name: '3RD INTERNATIONAL CONFERENCE ON ADVANCEMENTS IN COMPUTING 2021',
        keynnote: 'prof koliya',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore perspiciatis dolor deserunt enim ipsam impedit provident quod, delectus repellat, eaque facilis cum magni architecto maiores porro consectetur tenetur dignissimos tempore!',
        img: 'https://picsum.photos/800/304/?random',
        location: 'SLIIT',
        date: '2021-dec-21',
      },
      {
        _id: 2,
        name: 'conf 2',
        keynnote: 'prof nuwan',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore perspiciatis dolor deserunt enim ipsam impedit provident quod, delectus repellat, eaque facilis cum magni architecto maiores porro consectetur tenetur dignissimos tempore!',
        img: 'https://picsum.photos/800/304/?random',
        date: '2021-dec-22',
      },
      {
        _id: 3,
        name: 'conf 3',
        keynnote: 'prof samantha',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore perspiciatis dolor deserunt enim ipsam impedit provident quod, delectus repellat, eaque facilis cum magni architecto maiores porro consectetur tenetur dignissimos tempore!',
        img: 'https://picsum.photos/800/304/?random',
        date: '2021-dec-23',
      },
      {
        _id: 4,
        name: 'conf 4',
        keynnote: 'prof rohan',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore perspiciatis dolor deserunt enim ipsam impedit provident quod, delectus repellat, eaque facilis cum magni architecto maiores porro consectetur tenetur dignissimos tempore!',
        img: 'https://picsum.photos/800/304/?random',
        date: '2021-dec-24',
      },
    ],
    conference: {
      _id: 1,
      name: '3RD INTERNATIONAL CONFERENCE ON ADVANCEMENTS IN COMPUTING 2021',
      keynnote: 'prof koliya',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, vero? Placeat exercitationem, libero necessitatibus quo adipisci, delectus, architecto dolorum inventore iure obcaecati fugiat voluptate ipsa non amet minus culpa omnis.
        Blanditiis dolores accusamus nihil odio, sapiente dignissimos rem vero aspernatur ut magni maiores sunt aut placeat quibusdam quisquam corporis asperiores, harum vitae! Repudiandae nobis similique, aut delectus provident facere consequuntur.
        Nulla, consequuntur ipsam quia sed porro repudiandae tempora ducimus sit natus quos eligendi culpa commodi incidunt sint voluptates error. Ducimus minus eos ad ipsa rem cupiditate quam sit facere officia!`,
      img: 'https://picsum.photos/800/304/?random',
      location: 'Sri Lanka Institute of Information Technology',
      date: '2021-December-21',
    },
  };

  const [state, dispatch] = useReducer(ConferenceReducer, initialState);

  const getConference = (id) => {
    // dispatch({ type: GET_CONFERENCE, payload: id });
  };

  const addConference = async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(data);

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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ConferenceContext.Provider
      value={{
        conferences: state.conferences,
        conference: state.conference,
        getConference,
        addConference,
      }}>
      {props.children}
    </ConferenceContext.Provider>
  );
};

export default ConferenceState;
