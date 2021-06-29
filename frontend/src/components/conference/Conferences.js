import React, { useContext } from 'react';
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
  const classes = useStyles();
  const {
    title,
    image,
    startDate,
    endDate,
    attendPrice,
    description,
    _id,
    status,
  } = conference;

  const onHandle = () => {};

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

        console.log('suc');
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
    </div>
  );
};

// AddProductItem.propTypes = {
//   product: PropTypes.object.isRequired,
// };

export default Conferences;
