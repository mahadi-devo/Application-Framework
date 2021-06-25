import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const WorkshopItem = ({ workshop }) => {
  const { title, author, email, phone, distcription, address, start, end } =
    workshop;
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
          <b>Phone:</b> {phone}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Distcription:</b> {distcription}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Address:</b> {address}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Start:</b> {start}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>End:</b> {end}
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

export default WorkshopItem;
