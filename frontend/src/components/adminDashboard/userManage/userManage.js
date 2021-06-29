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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@material-ui/data-grid';
import { Link,useRouteMatch } from 'react-router-dom';
import axios from 'axios';

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
    "&:hover" : {
      backgroundColor: '#ffca28',
    }
  },
}));

const userManage = () => {
  const classes = useStyles();

  let [rows, setRows] = useState([{
    role: "researcher",
    id: "60db1cc5002d29137eeea226",
    email: "mh@gmail.com",
    name: "mh",
    phone: 123456789,
}]);


  useEffect(() => {
    axios
        .get('http://localhost:5000/api/v1/user')
        .then((res) => {
          console.log('before map',res.data.data);
          const newRows = res.data.data.map( row => {
            return { ...row, id: row._id };
          });

          console.log(newRows);

          setRows(newRows);
        })
        .catch((error) => {});
  }, []);

  const { url } = useRouteMatch();

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'phone', headerName: 'Phone No', width: 150, type: 'number', },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      flex: 1,
      valueGetter: '',
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'string',
      width: 110,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 230,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>

            <Button
              variant="contained"
              size="small"
              className={classes.buttonEdit}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>

            <IconButton aria-label="delete" color="secondary" className={classes.button}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h5"
        color="textPrimary"
        gutterBottom
      >
        User Management
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
              10
            </Typography>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={`${classes.card} ${classes.cardblue}`}>
            <Typography variant="caption" gutterBottom>
              All Users
            </Typography>
            <Typography variant="h5" gutterBottom>
              10
            </Typography>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={`${classes.card} ${classes.cardyellow}`}>
            <Typography variant="caption" gutterBottom>
              All Users
            </Typography>
            <Typography variant="h5" gutterBottom>
              10
            </Typography>
          </div>
        </Grid>
        <Grid item lg={3}>
          <div className={`${classes.card} ${classes.cardgreen}`}>
            <Typography variant="caption" gutterBottom>
              All Users
            </Typography>
            <Typography variant="h5" gutterBottom>
              10
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container justify="space-between" alignItems="center">
        <Grid item lg={1} md={2} sm={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PersonAddIcon />}
            component={Link}
            to={`${url}/add`}
          >
            Add
          </Button>
        </Grid>
        <Grid item md={2} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Category
            </InputLabel>
            <Select
              native
              value={'categry.current'}
              label="Category"
              inputProps={{
                name: 'Category',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={'All'}>All</option>
              <option value={'All'}>All</option>
              <option value={'All'}>All</option>
              <option value={'All'}>All</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ height: '65vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default userManage;
