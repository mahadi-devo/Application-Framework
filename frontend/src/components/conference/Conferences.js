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
import ConferenceContext from '../../context/auth/conference/conference-context';

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
  const { title, image, startDate, endDate, keynnotes, description, _id } =
    conference;

  const conferenceContext = useContext(ConferenceContext);

  const { clearKeynotes } = conferenceContext;

  //   const productContext = useContext(ProductContext);

  //   const { deleteProduct, setCurrentProduct } = productContext;

  //   const deleteMethod = () => {
  //     if (deleteProduct(_id)) {
  //       toast("Product deleted", {
  //         type: "success",
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     } else {
  //       toast("Could not delete product", {
  //         type: "warning",
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     }
  //   };
  const onHandle = () => {
    clearKeynotes();
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
              {description}
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
              style={{ textAlign: 'center' }}></Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='primary'
            component={Link}
            to={`/conferences/${_id}`}>
            More
          </Button>

          <Button size='small' color='primary'>
            Attend
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

// AddProductItem.propTypes = {
//   product: PropTypes.object.isRequired,
// };

export default Conferences;
