import React, { useContext, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import WorkshopContext from '../../../context/user/workshop/workshop-context';

const WorkshopForm = () => {
  const workshopContext = useContext(WorkshopContext);

  const { current, clearItem } = workshopContext;

  useEffect(() => {
    if (current !== null) {
      setWorkshop(current);
    } else {
      setWorkshop({
        title: '',
        author: '',
        email: '',
        phone: '',
        discription: '',
        address: '',
        start: '',
        end: '',
      });
    }
  }, [workshopContext, current]);

  const [workshop, setWorkshop] = useState({
    title: '',
    author: '',
    email: '',
    phone: '',
    discription: '',
    address: '',
    start: '',
    end: '',
  });

  const { title, author, email, phone, discription, address, start, end } =
    workshop;

  const onChange = (e) => {
    setWorkshop({ ...workshop, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current == null) {
      workshopContext.addWorkshop(workshop);
    } else {
      workshopContext.updateeWorkshop(workshop);
    }

    //clear();
  };

  const clear = () => {
    clearItem();
  };
  return (
    <form onSubmit={onSubmit}>
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
            value={title}
            onChange={onChange}
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
            value={author}
            onChange={onChange}
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
            value={email}
            onChange={onChange}
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
            value={phone}
            onChange={onChange}
            label='Phone'
            name='phone'
            autoComplete='phone'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='discription'
            type='text'
            value={discription}
            onChange={onChange}
            label='Small Discription'
            name='discription'
            autoComplete='discription'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id='address'
            type='text'
            value={address}
            onChange={onChange}
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
            value={start}
            onChange={onChange}
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
            value={end}
            onChange={onChange}
            label='Ending Date'
            name='end'
            autoComplete='end'
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' type='submit' color='primary'>
            Submit
          </Button>
          <Button variant='contained' onClick={clear} color='secondary'>
            Clear
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WorkshopForm;
