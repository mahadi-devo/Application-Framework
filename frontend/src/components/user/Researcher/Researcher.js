import React from 'react';
import ResearcherFrom from './ResearcherForm';
import Researchs from './Researchs';
import '../../../App.css';

const Researcher = ({ match }) => {
  const confrence = match.params.id;
  return (
    <div className='grid-2'>
      <div className='m-1'>
        <ResearcherFrom confrence={confrence} />
      </div>
      <div>
        <Researchs />
      </div>
    </div>
  );
};

export default Researcher;
