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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link, useRouteMatch } from 'react-router-dom';

import ConferencesContext from '../../../context/conference/conference-context';
import ConferenceHome from '../../conference/ConferenceHome';

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

const conferenceManage = () => {
  const classes = useStyles();
  const { url } = useRouteMatch();

  const { conferences, getAllConferences } = useContext(ConferencesContext);
  const [showConference, setShowConference] = useState(false);
  const [current, setCurrent] = useState('');

  const OnIconClicked = (id) => {
    setCurrent(id);
    setShowConference(true);
  };

  const OnBackIconClicked = () => {
    setShowConference(false);
  };

  const columns = [
    { field: 'title', headerName: 'Conference Title', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    {
      field: 'endDate',
      headerName: 'End Date',
      sortable: true,
      valueGetter: '',
    },
    {
      field: 'status',
      headerName: 'Role',
      type: 'string',
      width: 110,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<VisibilityIcon />}
            onClick={() => OnIconClicked(params.row._id)}
          >
            View
          </Button>
        );
      },
    },
  ];

  let rows = [
    {
      id: '60b3ce0e92ac32b7fba8acd2',
      title: 'React world',
      startDate: '2021-12-31T18:30:00.000+00:00',
      endDate: '2021-03-31T18:30:00.000+00:00',
      workshops: ['60b3ced0c512ec7927f39f32', '60b3ceddc512ec7927f39f33'],
      researches: ['60b3cefac512ec7927f39f34', '60b3cf01c512ec7927f39f35'],
      status: 'pending',
    },
  ];
  console.log('in con', conferences);
  if (conferences) {
    rows = conferences.map((row) => {
      return { ...row, id: row._id };
    });
  }

  useEffect(() => {
    getAllConferences();
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
            Conference Details
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

export default conferenceManage;
