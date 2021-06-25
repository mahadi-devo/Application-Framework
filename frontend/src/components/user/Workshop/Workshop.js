import React from 'react';
import WorkshopForm from './WorkshopForm';
import Workshops from './Workshops';
import '../../../App.css';

const Workshop = () => {
  return (
    <div className='grid-2'>
      <div className='m-1'>
        <WorkshopForm />
      </div>
      <div>
        <Workshops />
      </div>
    </div>
  );
};

export default Workshop;
