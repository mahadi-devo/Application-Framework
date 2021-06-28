import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WorkshopItem from './WorkshopItem';
import Spinner from '../../shared/Spinner';
import WorkshopContext from '../../../context/user/workshop/workshop-context';

const Workshops = () => {
  const workshopContext = useContext(WorkshopContext);

  const { workshops, getWorkshop } = workshopContext;

  useEffect(() => {
    getWorkshop();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {workshops !== null ? (
        <TransitionGroup>
          {workshops.map((workshop) => (
            <CSSTransition key={workshop.id} timeout={500} classNames='item'>
              <WorkshopItem workshop={workshop} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Workshops;
