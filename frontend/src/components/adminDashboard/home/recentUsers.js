import React from 'react'
import {
  Typography,
  Grid,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px',
  },
  title: {
    marginTop: '10px',
  },

  leftbar: {
    flex: 5,
  },

  card: {
    borderRadius: '5px',
    height: '70px',
    boxShadow: '5px 5px 13px #D3D3D3, -5px 5px 13px #ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    minWidth: '200px',
  },

  cardred: {
    backgroundColor: '#ffcccc',
    color: '#ff0000',
  },
  cardblue: {
    backgroundColor: '#cce0ff',
    color: '#0066ff',
  },

  cardyellow: {
    backgroundColor: '#ffffe6',
    color: '#e6e600',
  },

  cardgreen: {
    backgroundColor: '#ccffcc',
    color: '#00ff00',
  }
}));
function recentUsers() {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      
      <Typography variant="h6" gutterBottom>
        recentUsers
      </Typography>
      <Grid container>
        <Grid item sm={6}>
          <Typography variant="subtitle2" gutterBottom>
            Name
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="subtitle2" gutterBottom>
            Role
          </Typography>
        </Grid> 
        <Grid item sm={6}>
          <Typography variant="body2" gutterBottom>
            Nuwan
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body2" gutterBottom>
            Editor
          </Typography>
        </Grid>

      </Grid>
    </div>
  )
}

export default recentUsers
