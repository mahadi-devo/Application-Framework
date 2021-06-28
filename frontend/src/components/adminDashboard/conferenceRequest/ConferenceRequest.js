import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ConferencesContext from '../../../context/auth/conference/conference-context';

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
  }
}));

const ConferenceRequest = () => {
  const classes = useStyles();

  const { pendingConferences, getPendingConferences } = useContext(ConferencesContext);
  
  const columns = [
    { field: 'title', headerName: 'Conference Title', flex: 1, },
    { field: 'startDate', headerName: 'Start Date', width: 145 },
    {
      field: 'endDate',
      headerName: 'End Date',
      sortable: true,
      valueGetter: '',
      width: 140
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
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
            >
              Accept
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary" 
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
  if(pendingConferences) {
    rows = pendingConferences.map(row => {
      return { ...row, id: row._id}
    });
  }

  useEffect(() => {
    getPendingConferences();
  }, []);

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h5"
        color="textPrimary"
        gutterBottom
      >
        Conference Request
      </Typography>

      <div style={{ height: '65vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default ConferenceRequest
