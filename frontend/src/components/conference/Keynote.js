import React, { Fragment, useContext } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import EditKeynote from './EditKeynote';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ConferenceContext from '../../context/auth/conference/conference-context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    maxWidth: 400,
    textAlign: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 2,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

const Keynote = (keynote) => {
  const styles = useStyles();

  const conferenceContext = useContext(ConferenceContext);

  const { deleteKeynote } = conferenceContext;

  const { image, name, organization, _id } = keynote.keynote;

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };

  const delKeynote = () => {
    console.log('delete');
    deleteKeynote(keynote.keynote);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const user = 'editor';

  return (
    <Fragment>
      <Card className={cx(styles.card)}>
        <CardContent>
          <Avatar className={styles.avatar} src={image} />
          <h3 className={styles.heading}>{name}</h3>
          <span className={styles.subheader}>{organization}</span>
        </CardContent>
        {user === 'editor' && (
          <CardActions>
            <Button
              size='small'
              variant='contained'
              color='secondary'
              onClick={handleClickOpen}>
              Edit
            </Button>

            <Button
              size='small'
              variant='contained'
              color='secondary'
              onClick={handleClickOpenDelete}>
              Delete
            </Button>
          </CardActions>
        )}
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <EditKeynote keynot={keynote.keynote} />
      </Dialog>

      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle id='alert-dialog-slide-title'>
          {'Delete Keynote Speaker from conference'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {`Delete ${keynote.keynote.name}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              delKeynote();
              handleClose();
            }}
            color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Keynote;
