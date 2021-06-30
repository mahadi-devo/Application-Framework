import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const useStyles = makeStyles({
  root: {
    maxWidth: 'maxContent',
  },
  cardImg: {
    objectFit: 'contain',
    objectPosition: 'center',
    marginTop: '10px',
  },
});

const Conferences = ({ conference }) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const {
    title,
    image,
    startDate,
    endDate,
    attendPrice,
    description,
    _id,
    location,
    status,
  } = conference;

  const onHandle = () => {};

  const user = localStorage.getItem('userRole');

  const handleToken = async (token) => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/stripe', {
        token,
        attendPrice,
      });
      const { status } = res.data;

      if (status === 'success') {
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
          setOpen(true);
        }

        const body = {
          email: localStorage.getItem('userEmail'),
          subject: 'Conference Registration Confirmation',
          textBody: 'Attendance Registration Confirmation',
          htmlBody: `<h2>Registration Confirmation</h2></br><h4>Thank you for registering for ${title} on ${startDate} to
            ${endDate} at ${location}
          , </h4>
            </br><p>Reference Id</p><p>${res.data.payment._id}</p>
            </br><p>Thank You</p>
            </br><p>Conference Management System</p>`,
        };

        await axios.post('http://localhost:5000/api/v1/response', body);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea
          component={Link}
          to={`/conferences/${_id}`}
          onClick={onHandle}>
          <CardMedia component='img' height='180' image={image} />
          <CardContent>
            <Typography
              gutterBottom
              variant='h6'
              component='h2'
              style={{ textAlign: 'center' }}>
              {title}
            </Typography>
            <Typography
              variant='body2'
              gutterBottom
              color='textSecondary'
              component='p'
              style={{ textAlign: 'center' }}>
              {description.slice(0, 150)}
            </Typography>
            <Typography
              variant='body2'
              color='textPrimary'
              gutterBottom
              component='p'
              style={{ textAlign: 'center' }}>
              {startDate} - {endDate}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              style={{
                textAlign: 'center',
              }}>{`Pay $${attendPrice} to Join`}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button
            size='small'
            color='primary'
            component={Link}
            to={`/conferences/${_id}`}>
            More
          </Button> */}
          {status === 'approved' && (
            <Button size='small' color='primary' onClick={() => {}}>
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
            </Button>
          )}
        </CardActions>
      </Card>
      <Fragment>
        <Dialog
          open={open}
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
    </div>
  );
};

// AddProductItem.propTypes = {
//   product: PropTypes.object.isRequired,
// };

export default Conferences;
