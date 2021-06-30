import React, { useEffect, useState } from 'react';
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
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

import RecentUsers from './recentUsers';
import RecentResearchers from './recentResearchers';
import RecentConferences from './recentConferences';
import RecentWorkshops from './recentWorkshops';

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
    boxShadow: '5px 5px 13px #ededed, -5px 5px 13px #ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  buttonEdit: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    backgroundColor: '#ffc107',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#ffca28',
    },
  },
}));

const home = () => {
  const classes = useStyles();

  let [allcount, setallcount] = useState(0);
  let [admincount, setadmin] = useState(0);
  let [editorcount, seteditor] = useState(0);
  let [reviewercount, setreviewer] = useState(0);

  const config = {
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };


  useEffect(() => {
    // axios
    //   .get('http://localhost:5000/api/v1/user', config)
    //   .then((res) => {
    //     const newRows = res.data.data.map((row) => {
    //       return { ...row, id: row._id };
    //     });

    //     console.log(newRows);

    //     setallcount(newRows.length );
    //     setRows(newRows);
    //   })
    //   .catch((error) => {});

    // axios
    //   .get('http://localhost:5000/api/v1/user/types', config)
    //   .then((res) => {
    //     const newtypes = res.data.data;
    //     setTypes({ ...types, typeList: newtypes });
    //     console.log('befor for');

    //     newtypes.forEach((type) => {
    //       axios
    //         .get('http://localhost:5000/api/v1/user/count/' + type, config)
    //         .then((res) => {
    //           console.log('count ' + type, res.data);
    //           if ( type === 'admin'){
    //             setadmin(res.data.count);
    //           }
    //           if ( type === 'reviewer'){
    //             setreviewer(res.data.count);
    //           }
    //           if ( type === 'editor'){
    //             seteditor(res.data.count);
    //           }
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const { url } = useRouteMatch();

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h5"
        color="textPrimary"
        gutterBottom
      >
        Home
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item lg={3}>
          <div className={`${classes.card} ${classes.cardred}`}>
            <Typography variant="caption" gutterBottom>
              All Users
            </Typography>
            <Typography variant="h5" gutterBottom>
              {allcount}
            </Typography>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={`${classes.card} ${classes.cardblue}`}>
            <Typography variant="caption" gutterBottom>
              All Admin
            </Typography>
            <Typography variant="h5" gutterBottom>
              {admincount}
            </Typography>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={`${classes.card} ${classes.cardyellow}`}>
            <Typography variant="caption" gutterBottom>
              All Reviewer
            </Typography>
            <Typography variant="h5" gutterBottom>
              {reviewercount}
            </Typography>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={`${classes.card} ${classes.cardgreen}`}>
            <Typography variant="caption" gutterBottom>
              All Editor
            </Typography>
            <Typography variant="h5" gutterBottom>
              {editorcount}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item lg={6}> <RecentResearchers /> </Grid>
        <Grid item lg={6}> <RecentWorkshops /> </Grid>
        <Grid item lg={3}> <RecentUsers /></Grid>
        <Grid item lg={9}> <RecentConferences /></Grid>
      </Grid>
    </div>
  );
};

export default home
