import React from 'react';
import ResearcherFrom from './ResearcherForm';
import Researchs from './Researchs';
import '../../../App.css';

const Researcher = () => {
  return (
    <div className='grid-2'>
      <div className='m-1'>
        <ResearcherFrom />
      </div>
      <div>
        <Researchs />
      </div>
    </div>
  );
};

export default Researcher;
