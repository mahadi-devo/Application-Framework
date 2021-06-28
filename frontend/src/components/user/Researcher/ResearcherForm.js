import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FileUploader from '../../shared/FileUpload';
import ResearcherContext from '../../../context/user/researcher/researcher-context';

const ResearcherForm = () => {
  const researcherContext = useContext(ResearcherContext);

  const { current, clearItem } = researcherContext;

  useEffect(() => {
    if (current !== null) {
      setResearch(current);
    } else {
      setResearch({
        title: '',
        author: '',
        email: '',
        abstract: '',
        area: '',
      });
    }
  }, [researcherContext, current]);

  const [research, setResearch] = useState({
    title: '',
    author: '',
    email: '',
    abstract: '',
    area: '',
    file: '',
  });

  const { title, author, email, abstract, area, file } = research;

  const onChange = (e) => {
    setResearch({ ...research, [e.target.name]: e.target.value });
  };

  const getFile = (FileData) => {
    const reader = new FileReader();
    if (FileData.size > 1000000 || FileData.size === 0) {
      toast('File size must be less than 1mb and greater that 0', {
        type: 'error',
      });
    } else {
      reader.readAsDataURL(FileData);
      reader.onloadend = () => {
        setConference({ ...conference, image: reader.result });
      };
      reader.onerror = () => {
        console.error('AHHHHHHHH!!');
      };
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current == null) {
      researcherContext.addResearch(research);
    } else {
      researcherContext.updateResearch(research);
    }
  };

  const clear = () => {
    clearItem();
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
        {/* <Grid item xs={12}>
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
        </Grid> */}
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
        <Grid item xs={12}>
          <FileUploader
            noOfFiles='1'
            multiple={false}
            input='Upload Your Resource Here'
            getFileCallback={getFile}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type='submit'
            value='Add Research'
            variant='contained'
            color='primary'>
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
export default ResearcherForm;
