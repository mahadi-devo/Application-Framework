import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ResearcherContext from '../../../context/user/researcher/researcher-context';
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

const ResearchItem = ({ research }) => {
  const { _id, title, author, email, abstract, area, file, status } = research;

  const researcherContext = useContext(ResearcherContext);

  const { setItem } = researcherContext;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    console.log('Hi');
    setOpen(true);
  };

  const deleteResearcher = () => {
    researcherContext.deleteResearch(_id);
    toast('Research deleted successfully', { type: 'success' });
    handleClose();
  };

  const fileDownload = (fileUrl, name) => {
    console.log(fileUrl);
    var link = document.createElement('a');
    link.download = name;
    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <Typography variant='h6' gutterBottom>
          <b>Status:</b> {status}
        </Typography>
        <Typography variant='h6' gutterBottom>
          <b>File:</b>
          <a href={file} target='_blank'>
            <InsertDriveFileIcon />
          </a>
        </Typography>
      </Grid>
      <Grid>
        {status == 'Approved' ? (
          <Typography></Typography>
        ) : (
          <Button
            variant='contained'
            onClick={() => setItem(research)}
            color='primary'
            className='p-1'
            className={classes.button}>
            Update
          </Button>
        )}

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
          <Button onClick={deleteResearcher} color='secondary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResearchItem;
