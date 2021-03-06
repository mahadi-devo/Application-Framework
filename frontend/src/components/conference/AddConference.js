import React, { useContext, useState, useEffect, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import ConferenceContext from '../../context/conference/conference-context';
import FileUploader from '../shared/FileUpload';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

toast.configure();

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

const AddConference = (confer) => {
  const classes = useStyles();

  const conferenceContext = useContext(ConferenceContext);
  const { addConference, editConference } = conferenceContext;
  const [show, setShow] = useState(false);
  const [conference, setConference] = useState({
    title: '',
    location: '',
    endDate: '',
    startDate: '',
    description: '',
    image: '',
    keynotes: '',
    status: '',
    attendPrice: '',
    researchPrice: '',
  });

  useEffect(() => {
    if (confer.confer !== null) {
      console.log(confer);
      setConference(confer.confer);
    } else {
      setConference({
        title: '',
        location: '',
        endDate: '',
        startDate: '',
        description: '',
        image: '',
        keynotes: '',
        status: '',
        attendPrice: '',
        researchPrice: '',
      });
    }
  }, []);

  const {
    title,
    location,
    description,
    endDate,
    startDate,
    image,
    attendPrice,
    researchPrice,
  } = conference;

  const onChange = (e) => {
    setConference({ ...conference, [e.target.name]: e.target.value });
  };

  const getFile = (FileData) => {
    const reader = new FileReader();
    if (FileData !== null) {
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
    }
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(conference);

    if (
      title === '' ||
      location === '' ||
      startDate === '' ||
      endDate === '' ||
      attendPrice === '' ||
      researchPrice === ''
    ) {
      toast('Fields can not be empty', { type: 'error' });
    } else {
      if (confer.confer !== null) {
        if (editConference(conference)) {
          toast('Conference edited successfully', { type: 'success' });
        }
      } else {
        if (addConference(conference)) {
          toast('Conference added successfully', { type: 'success' });
          setShow(true);
        }
      }

      setConference({
        title: '',
        location: '',
        endDate: '',
        startDate: '',
        description: '',
        attendPrice: '',
        researchPrice: '',
        image: '',
      });
    }
  };

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paperContainer}>
        <Typography component='h1' variant='h6'>
          {confer.confer !== null ? 'Edit Confernece' : 'Create Conference'}
        </Typography>
        <form className={classes.form} onSubmit={onsubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                onChange={onChange}
                fullWidth
                id='title'
                value={title}
                label='Title'
                name='title'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                onChange={onChange}
                fullWidth
                id='location'
                value={location}
                label='Location'
                name='location'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                onChange={onChange}
                fullWidth
                id='attendPrice'
                value={attendPrice}
                label='Price for Attend Conference'
                name='attendPrice'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                onChange={onChange}
                fullWidth
                id='researchPrice'
                value={researchPrice}
                label='Price for Research Submission'
                name='researchPrice'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                fullWidth
                onChange={onChange}
                name='startDate'
                label='Start Date'
                type='date'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDate}
                id='startDate'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id='endDate'
                name='endDate'
                value={endDate}
                variant='outlined'
                label='End Date'
                fullWidth
                onChange={onChange}
                type='date'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                multiline
                rows={2}
                rowsMax={4}
                onChange={onChange}
                name='description'
                type='text'
                label='description'
                value={description}
                id='date'
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
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Save
          </Button>
          <Fragment>
            {show && (
              <Grid container justify='flex-center'>
                {confer.confer === null && (
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    component={Link}
                    to='/keynote-add'
                    className={classes.submit}>
                    Add Keynote Speakers
                  </Button>
                )}
              </Grid>
            )}
          </Fragment>
        </form>
      </div>
    </Container>
  );
};

AddConference.propTypes = {
  confer: PropTypes.object,
};

AddConference.defaultProps = {
  confer: null,
};

export default AddConference;
