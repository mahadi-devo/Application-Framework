import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const WorkshopForm = () => {
  return (
    <form>
      <Typography variant='h6' gutterBottom>
        Workshop Upload Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='title'
            type='text'
            // value={}
            // onChange={}
            label='Research Title'
            name='title'
            autoComplete='title'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='author'
            type='text'
            // value={}
            // onChange={}
            label='Author'
            name='author'
            autoComplete='author'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='email'
            type='email'
            // value={}
            // onChange={}
            label='Email'
            name='email'
            autoComplete='email'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='phone'
            type='text'
            // value={}
            // onChange={}
            label='Phone'
            name='phone'
            autoComplete='phone'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='distcription'
            type='text'
            // value={}
            // onChange={}
            label='Small Discription'
            name='distcription'
            autoComplete='distcription'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='address'
            type='text'
            // value={}
            // onChange={}
            label='Address'
            name='address'
            autoComplete='address'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='start'
            type='date'
            // value={}
            // onChange={}
            label='Starting Date'
            name='start'
            autoComplete='start'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='end'
            type='date'
            // value={}
            // onChange={}
            label='Ending Date'
            name='end'
            autoComplete='end'
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WorkshopForm;
