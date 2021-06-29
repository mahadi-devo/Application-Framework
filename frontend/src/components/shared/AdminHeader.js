import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AdminHeader = () => {
  const classes = useStyles();

  const onsubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Box mr={1}>
          <Button
            size='small'
            variant='contained'
            component={Link}
            color='secondary'
            to='/conferences'>
            Approved Conferneces
          </Button>
        </Box>

        <Box mr={1}>
          <Button
            size='small'
            variant='contained'
            component={Link}
            color='secondary'
            to='/conferences-add'>
            Add Confernece
          </Button>
        </Box>

        <Box mr={1}>
          <Button
            size='small'
            variant='contained'
            component={Link}
            color='secondary'
            to='/pending'>
            Pending Conferences
          </Button>
        </Box>
      </Toolbar>
    </React.Fragment>
  );
};

export default AdminHeader;
