import React, { useEffect, useState, Fragment, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Keynote from './Keynote';
import AddKeynote from './AddKeynote';
import ConferenceContext from '../../context/auth/conference/conference-context';

const KeynoteMap = (id) => {
  const [openKeynote, setOpenKeynote] = React.useState(false);

  const conferenceContext = useContext(ConferenceContext);
  const { keynotes, getKeynotes } = conferenceContext;

  useEffect(() => {
    getKeynotes(id.id);
  }, []);

  const handleClickOpenKeynote = () => {
    setOpenKeynote(true);
  };

  const handleClose = () => {
    setOpenKeynote(false);
  };

  console.log(keynotes);

  const user = 'editor';

  return (
    <Fragment>
      <Typography
        style={{
          textAlign: 'center',
          color: '#424242',
          marginBottom: '30px',
        }}>
        <Box fontSize={19} m={1}>
          Our Keynote Speakers
        </Box>
      </Typography>
      <Grid container justify='center' spacing='3'>
        {keynotes &&
          keynotes.map((item) => (
            <Grid key={item._id} item lg={4}>
              <Keynote keynote={item} />
            </Grid>
          ))}
      </Grid>
      <Grid container justify='center'>
        {user === 'editor' && (
          <Button
            style={{ marginTop: '10px', marginBottom: '10px' }}
            variant='contained'
            color='secondary'
            onClick={handleClickOpenKeynote}>
            Add Keynote Speaker
          </Button>
        )}
      </Grid>

      <Dialog
        open={openKeynote}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <AddKeynote conferId={id.id} />
      </Dialog>
    </Fragment>
  );
};

export default KeynoteMap;
