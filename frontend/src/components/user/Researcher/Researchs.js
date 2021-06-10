import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ResearchItem from './ResearchItem';

const Researchs = () => {
  state = {
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

  return (
    <div>
      <TransitionGroup>
        {state.researchs.map((research) => (
          <CSSTransition key={research.id} timeout={500} classNames='item'>
            <ResearchItem research={research} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Researchs;
