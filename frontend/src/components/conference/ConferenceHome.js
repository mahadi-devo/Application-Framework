import React, { Fragment, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ConferenceContext from '../../context/auth/conference/conference-context';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

  const { name, keynote, description, date, img, location } = conference;

  const user = 'editor';

  useEffect(() => {
    getConference(match.params.id);
  }, []);

  console.log(conference);

  return (
    <Fragment>
      <Grid container justify='center' style={{ marginTop: '15px' }}>
        <Grid item alignItems='center' justify='center' lg={12} md={12} sm={12}>
          {user === 'editor' ? null : null}
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
          <img src='https://picsum.photos/800/304/?random'></img>
        </Grid>
        <Grid item alignItems='center' justify='center' lg={9} md={9} sm={12}>
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
            }}>
            <Box fontWeight='fontWeightBold' m={1}>
              {name}
            </Box>
          </Typography>
          <Typography
            style={{
              textAlign: 'center',
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
            }}>
            <Box fontSize='h6.fontSize' m={1}>
              {`${date} in ${location}`}
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ConferenceHome;
