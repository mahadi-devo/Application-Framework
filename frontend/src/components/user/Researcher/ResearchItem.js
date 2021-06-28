import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ResearcherContext from '../../../context/user/researcher/researcher-context';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
const ResearchItem = ({ research }) => {
  const { _id, title, author, email, abstract, area } = research;

  const researcherContext = useContext(ResearcherContext);

  const { setItem } = researcherContext;

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    console.log('Hi');
    setOpen(true);
  };

  const deleteResearcher = () => {
    researcherContext.deleteResearch(_id);
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
          <b>Abstract:</b> {abstract}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>Research Area:</b> {area}
        </Typography>
      </Grid>
      <Grid>
        <Button
          variant='contained'
          onClick={() => setItem(research)}
          color='primary'
          className='p-1'>
          Update
        </Button>
        <Button
          variant='contained'
          color='secondary'
          className='p-1'
          onClick={handleClickOpen}>
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
          <Button onClick={deleteResearcher} color='secondary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResearchItem;
