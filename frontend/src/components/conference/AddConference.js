import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import ConferenceContext from '../../context/auth/conference/conference-context';
import FileUploader from '../shared/FileUpload';
import 'react-toastify/dist/ReactToastify.css';

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

const AddConference = (props) => {
  const classes = useStyles();

  const conferenceContext = useContext(ConferenceContext);
  const { addConference } = conferenceContext;

  const [conference, setConference] = useState({
    title: '',
    location: '',
    endDate: '',
    startDate: '',
    description: '',
    picture: '',
  });

  const { title, location, date, description, endDate, startDate, picture } =
    conference;

  const onChange = (e) => {
    setConference({ ...conference, [e.target.name]: e.target.value });
  };

  const getFile = (FileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(FileData);
    reader.onloadend = () => {
      setConference({ ...conference, picture: reader.result });
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
    };
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    if (title === '' || location === '' || date === '') {
      toast('Fields can not be empty', { type: 'error' });
    } else {
      const statues = await addConference(conference);

      setConference({
        title: '',
        location: '',
        endDate: '',
        startDate: '',
        description: '',
        picture: '',
      });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paperContainer}>
        <Typography component='h1' variant='h6'>
          Create Confernece
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
            <Grid item xs={12}>
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
          <Grid container justify='flex-center'></Grid>
        </form>
      </div>
    </Container>
  );
};

export default AddConference;
