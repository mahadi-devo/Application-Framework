import React, { Fragment, useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ConferenceContext from '../../context/conference/conference-context';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import StripeCheckout from 'react-stripe-checkout';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddConference from './AddConference';
import KeynoteMap from './KeynoteMap';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const ConferenceHome = ({ match }) => {
  const classes = useStyles();
  const classes1 = useStyles2();
  const conferenceContext = useContext(ConferenceContext);
  const { getConference, conference } = conferenceContext;
  const [open, setOpen] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [email, setEmail] = useState('');

  const {
    title,
    keynotes,
    description,
    startDate,
    endDate,
    image,
    location,
    attendPrice,
    status,
    researchPrice,
    _id,
  } = conference;

  const researchButton = {
    url: 'https://res.cloudinary.com/mahadi/image/upload/v1624966205/jogc1e3rj4g2ibqzt22w_bvh2h0.jpg',
    title: 'Research Presentations',
    width: '50%',
  };

  const workshops = {
    url: 'https://res.cloudinary.com/mahadi/image/upload/v1624975924/uihwgwangknjmjwku9g1.jpg',
    title: 'Workshops',
    width: '50%',
  };

  const user = localStorage.getItem('userRole');

  useEffect(() => {
    getConference(match.params.id);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenConfirmation(false);
  };

  const handleToken = async (token) => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/stripe', {
        token,
        attendPrice,
      });
      const { status } = res.data;

      if (status === 'success') {
        // const body = {
        //   email: localStorage.getItem('email'),
        //   subject: 'Order Confirmation',
        //   textBody:
        //     'Thank you for placing order, your order successfully placed.',
        //   htmlBody: `<h2>Order Confirmation</h2></br><h4>Thank you for placing order, we hope you enjoyed shopping with us. Amount of $${getsubtotal()} is added to your monthly bill.</h4>
        //     </br><p>Thank You</p>
        //     </br><p>Mini Store</p>`,
        // };
        // return await axios.post('/api/v1/response/email', body);

        const config = {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };

        const res = await axios.post(
          'http://localhost:5000/api/v1/payment',
          { conferenceId: _id, type: '1' },
          config
        );

        if (res.data.payment.type === '1') {
          setEmail(res.data.payment.user.email);
          setOpenConfirmation(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          {keynotes && <KeynoteMap id={match.params.id} />}
        </Grid>
        <Grid item style={{ marginTop: '23px' }} lg={9} md={9} sm={12}>
          <Grid container spacing={2}>
            <Grid item lg={6} className={classes1.root}>
              <ButtonBase
                focusRipple
                component={Link}
                to={`research/${match.params.id}`}
                className={classes1.image}
                focusVisibleClassName={classes1.focusVisible}
                style={{
                  width: '100%',
                }}>
                <span
                  className={classes1.imageSrc}
                  style={{
                    backgroundImage: `url(${researchButton.url})`,
                  }}
                />
                <span className={classes1.imageBackdrop} />
                <span className={classes1.imageButton}>
                  <Typography
                    component='span'
                    variant='subtitle1'
                    color='inherit'
                    className={classes1.imageTitle}>
                    {researchButton.title}
                    <span className={classes1.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            </Grid>

            <Grid item lg={6} className={classes1.root}>
              <ButtonBase
                focusRipple
                component={Link}
                to={`workshop/${match.params.id}`}
                className={classes1.image}
                focusVisibleClassName={classes1.focusVisible}
                style={{
                  width: '100%',
                }}>
                <span
                  className={classes1.imageSrc}
                  style={{
                    backgroundImage: `url(${workshops.url})`,
                  }}
                />
                <span className={classes1.imageBackdrop} />
                <span className={classes1.imageButton}>
                  <Typography
                    component='span'
                    variant='subtitle1'
                    color='inherit'
                    className={classes1.imageTitle}>
                    {workshops.title}
                    <span className={classes1.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>

        <Grid item style={{ marginTop: '23px' }} lg={9} md={9} sm={12}>
          {status === 'approved' && (
            <StripeCheckout
              stripeKey='pk_test_51Is6w9CaLuVljyXivn0DHr71gLQiazZPrZxF39DWKVpnTfrkoxrAsOX4QsPeYY8Inc9EshMfkzXHmki436baPGoy00Bqae1QFZ'
              amount={parseInt(attendPrice) * 100}
              token={handleToken}
              style={{
                width: '-webkit-fill-available',
                background:
                  'linear-gradient(rgb(125, 197, 238), rgb(0, 140, 221) 85%, rgb(48, 162, 228))',
              }}
            />
          )}
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <AddConference confer={conference} />
      </Dialog>

      <Dialog
        open={openConfirmation}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Registration to the conference is successfull'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {`Confirmation email will be sent to ${email}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConferenceHome;
