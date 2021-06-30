import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import WorkshopContext from '../../../context/user/workshop/workshop-context';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const WorkshopItem = ({ workshop }) => {
  const { _id, title, author, email, phone, discription, address, start, end } =
    workshop;

  const workshopContext = useContext(WorkshopContext);

  const { setItem } = workshopContext;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteWorkshop = () => {
    workshopContext.deleteWorkshop(_id);
    toast('Workshop deleted successfully', { type: 'success' });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='card bg-light'>
      <Grid>
        <Typography variant='h6' gutterBottom>
          <b>Title:</b> {title}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Author:</b> {author}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Email:</b> {email}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Phone:</b> {phone}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Distcription:</b> {discription}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Address:</b> {address}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Start:</b> {start}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>End:</b> {end}
        </Typography>
      </Grid>
      <Grid>
        <Button
          onClick={() => setItem(workshop)}
          variant='contained'
          color='primary'
          className='p-1'
          className={classes.button}>
          Update
        </Button>
        <Button
          variant='contained'
          color='secondary'
          className='p-1'
          onClick={handleClickOpen}
          className={classes.button}>
          Delete
        </Button>
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          {'Are you sure you want to delete?'}
        </DialogTitle>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            No
          </Button>
          <Button onClick={deleteWorkshop} color='secondary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkshopItem;
