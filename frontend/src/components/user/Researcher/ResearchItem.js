import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ResearchItem = ({ research }) => {
  const { title, author, email, abstract, area } = research;
  return (
    <div className='card bg-light'>
      <Grid>
        <Typography variant='h6' gutterBottom>
          <b>Title:</b> {title}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Author:</b> {author}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Email:</b> {email}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Abstract:</b> {abstract}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Research Area:</b> {area}
        </Typography>
      </Grid>
      <Grid>
        <Button variant='contained' color='primary' className='p-1'>
          Update
        </Button>
        <Button variant='contained' color='secondary' className='p-1'>
          Delete
        </Button>
      </Grid>
    </div>
  );
};

export default ResearchItem;
