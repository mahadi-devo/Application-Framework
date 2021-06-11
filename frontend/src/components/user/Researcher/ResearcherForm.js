import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FileUpload from '../../shared/FileUpload';

import ResearcherContext from '../../../context/user/researcher/researcher-context';

const ResearcherForm = () => {
  const researcherContext = useContext(ResearcherContext);

  const [research, setResearch] = useState({
    title: '',
    author: '',
    email: '',
    phone: '',
    abstract: '',
    area: '',
  });

  const { title, author, email, phone, abstract, area } = research;

  const onChange = (e) =>
    setResearch({ ...research, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    researcherContext.addResearch(research);
    // console.log(researchs);
    setResearch({
      title: '',
      author: '',
      email: '',
      phone: '',
      abstract: '',
      area: '',
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <Typography variant='h5' className='m-2' gutterBottom>
        Add Researcher
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
            id='abstract'
            type='text'
            value={abstract}
            onChange={onChange}
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
            value={area}
            onChange={onChange}
            label='Research Area'
            name='area'
            autoComplete='area'
          />
        </Grid>
        <FileUpload />
        <Grid item xs={12}>
          <Button
            type='submit'
            value='Add Research'
            variant='contained'
            color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default ResearcherForm;
