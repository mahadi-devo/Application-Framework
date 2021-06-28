import React from 'react';
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

  const { url } = useRouteMatch();

  const columns = [
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
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

  const rows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: 'Jon',
      role: 'admin',
      email: 'asdf@gmail.com',
    },
    {
      id: 2,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 4,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 5,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 6,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 7,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 8,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 9,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 10,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 11,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 13,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 14,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 15,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    },
    {
      id: 16,
      lastName: 'Lannister',
      firstName: 'Cersei',
      role: 'editor',
      email: 'asdf@gmail.com',
    }
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
