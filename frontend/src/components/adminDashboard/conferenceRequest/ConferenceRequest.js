import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Button,
  IconButton,
  Container,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { toast } from 'react-toastify';
import axios from 'axios';

import ConferencesContext from '../../../context/conference/conference-context';
import ConferenceHome from '../../conference/ConferenceHome';


toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px',
  },
  title: {
    marginTop: '10px',
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  buttonback: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
}));

const ConferenceRequest = () => {
  const classes = useStyles();

  const { pendingConferences, getPendingConferences } =
    useContext(ConferencesContext);

  const [showConference, setShowConference] = useState(false);
  const [current, setCurrent] = useState('');

  const OnIconClicked = (id) => {
    setCurrent(id);
    setShowConference(true);
  };

  const OnBackIconClicked = () => {
    setShowConference(false);
  }

  const OnButtonClicked = (id, status) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const values = { _id: id, status };
    axios
      .put(
        `http://localhost:5000/api/v1/conferences/confirmation`,
        values,
        config
      )
      .then((res) => {
        // console.log(res.data.conference);
        if (status === 1) {
          toast('successfully Accepted', { type: 'success' });
        }

        if (status === 2) {
          toast('successfully Declined', { type: 'success' });
        }
        getPendingConferences();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    { field: 'title', headerName: 'Conference Title', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', width: 145 },
    {
      field: 'endDate',
      headerName: 'End Date',
      sortable: true,
      valueGetter: '',
      width: 140,
    },
    {
      field: 'user',
      headerName: 'Editor',
      type: 'string',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 220,
      renderCell: (params) => {
        // console.log('params',params);
        return (
          <>
            <IconButton
              aria-label="view"
              onClick={() => OnIconClicked(params.row._id)}
              color="primary"
            >
              <VisibilityIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              onClick={() => OnButtonClicked(params.row._id, 1)}
            >
              Accept
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => OnButtonClicked(params.row._id, 2)}
              className={classes.button}
            >
              Decline
            </Button>
          </>
        );
      },
    },
  ];

  let rows = [];
  if (pendingConferences) {
    rows = pendingConferences.map((row) => {
      return { ...row, id: row._id };
    });
  }

  useEffect(() => {
    getPendingConferences();
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography
            className={classes.title}
            variant="h5"
            color="textPrimary"
            gutterBottom
          >
            Conference Request
          </Typography>
        </Grid>
        {showConference ? (
          <Grid item>
            <IconButton
              aria-label="back"
              onClick={() => OnBackIconClicked()}
              className={classes.buttonback}
              color="primary"
            >
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>

      {!showConference ? (
        <div style={{ height: '65vh', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      ) : (
        <Container maxWidth="lg">
          <ConferenceHome id={current} />
        </Container>
      )}
    </div>
  );
};

export default ConferenceRequest;
