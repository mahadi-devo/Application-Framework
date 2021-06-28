import React, { Fragment, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ConferenceContext from '../../context/auth/conference/conference-context';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import AddConference from './AddConference';
import Keynote from './Keynote';
import KeynoteMap from './KeynoteMap';
import AddKeynote from './AddKeynote';

const useStyles = makeStyles({
  root: {
    maxWidth: 'maxContent',
  },
  header1: {
    marginTop: '20px',
  },
  headerImg: {
    objectPosition: 'center',
    marginTop: '10px',
  },
});

const ConferenceHome = ({ match }) => {
  const classes = useStyles();
  const conferenceContext = useContext(ConferenceContext);
  const { getConference, conference } = conferenceContext;
  const [open, setOpen] = React.useState(false);
  const [openKeynote, setOpenKeynote] = React.useState(false);

  const {
    title,
    keynotes,
    description,
    startDate,
    endDate,
    image,
    location,
    _id,
  } = conference;

  const user = 'editor';

  useEffect(() => {
    getConference(match.params.id);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenKeynote = () => {
    setOpenKeynote(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenKeynote(false);
  };

  console.log(keynotes);

  return (
    <Fragment>
      <Grid container justify='center' style={{ marginTop: '15px' }}>
        <Grid item>
          {user === 'editor' && (
            <Button
              style={{ marginTop: '10px', marginBottom: '10px' }}
              variant='contained'
              color='secondary'
              onClick={handleClickOpen}>
              Edit Conference
            </Button>
          )}
        </Grid>

        <Grid
          item
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          lg={12}
          md={12}
          sm={12}>
          <img height='600' src={`${image}`}></img>
        </Grid>
        <Grid item lg={9} md={9} sm={12}>
          <Typography
            variant='h5'
            color='primary'
            className={classes.header1}
            style={{ textAlign: 'center' }}>
            About Conference
          </Typography>
          <Typography
            variant='h4'
            style={{
              textAlign: 'center',
              color: '#212121',
              marginTop: '15px',
              letterSpacing: '1px',
            }}>
            <Box fontWeight='fontWeightBold' m={1}>
              {title}
            </Box>
          </Typography>
          <Typography
            style={{
              textAlign: 'justify',
              color: '#424242',
              marginTop: '25px',
            }}>
            <Box fontSize={19} m={1}>
              {description}
            </Box>
          </Typography>
          <Typography
            style={{
              textAlign: 'center',
              color: '#424242',
              marginTop: '33px',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 4,
            }}>
            <Box fontSize='h6.fontSize' m={1}>
              {`${startDate} to ${endDate} in ${location}`}
            </Box>
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: '23px' }} lg={9} md={9} sm={12}>
          {keynotes && <KeynoteMap id={_id} />}
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <AddConference confer={conference} />
      </Dialog>
      <Dialog
        open={openKeynote}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <AddKeynote conferId={_id} />
      </Dialog>
    </Fragment>
  );
};

export default ConferenceHome;
