import React, { useEffect, useContext }  from 'react'
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

const conferenceManage = () => {
  const classes = useStyles();

  const { pendingConferences, getPendingConferences } = useContext(ConferencesContext);

  const columns = [
    { field: 'name', headerName: 'Conference Name', flex: 1, },
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
            >
              View
            </Button>
        );
      },
    },
  ];

  let rows;
  if(pendingConferences) {
    // rows = pendingConferences;
  } else {
    console.log('in con',pendingConferences);
    rows = [
      {
        id:"60b3ce0e92ac32b7fba8acd2",
        name:"React world",
        startDate:"2021-12-31T18:30:00.000+00:00",
        endDate:"2021-03-31T18:30:00.000+00:00",
        workshops:["60b3ced0c512ec7927f39f32","60b3ceddc512ec7927f39f33"],
        researches:["60b3cefac512ec7927f39f34","60b3cf01c512ec7927f39f35"],
        status:"pending",
      },
    ];
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

export default conferenceManage
