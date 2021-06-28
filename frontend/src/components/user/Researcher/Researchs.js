import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ResearchItem from './ResearchItem';
import Spinner from '../../shared/Spinner';
import ResearcherContext from '../../../context/user/researcher/researcher-context';

const Researchs = () => {
  const researcherContext = useContext(ResearcherContext);

  const { researchs, getResearch } = researcherContext;

  useEffect(() => {
    getResearch();
    // eslint-disable-next-line
  }, []);

  //console.log(researchs);

  return (
    <div>
      {researchs !== null ? (
        <TransitionGroup>
          {researchs.map((research) => (
            <CSSTransition key={research.id} timeout={500} classNames='item'>
              <ResearchItem research={research} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Researchs;
