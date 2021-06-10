import React, { useContext, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ResearchItem from './ResearchItem';
import ResearchContext from '../../../context/user/researcher/researcher-context';
import researcherContext from '../../../context/user/researcher/researcher-context';

const Researchs = () => {
  const researcherContext = useContext(ResearchContext);

  const { researchs } = researcherContext;

  return (
    <div>
      <TransitionGroup>
        {researchs.map((research) => (
          <CSSTransition key={research.id} timeout={500} classNames='item'>
            <ResearchItem research={research} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Researchs;
