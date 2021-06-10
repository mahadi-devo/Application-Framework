import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const ResearcherForm = () => {
  return (
    <form>
      <Typography variant='h6' gutterBottom>
        Researcher Form
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
            id='abstract'
            type='text'
            // value={}
            // onChange={}
            label='Abstract'
            name='abstract'
            autoComplete='acstract'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='area'
            type='text'
            // value={}
            // onChange={}
            label='Research Area'
            name='area'
            autoComplete='area'
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
export default ResearcherForm;
