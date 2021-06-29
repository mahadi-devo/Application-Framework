import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Radio } from '@material-ui/core';
import { Link,useHistory  } from 'react-router-dom';

toast.configure();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddUser = (props) => {
  const classes = useStyles();

  let history = useHistory();

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'admin',
  });

  const { name, email, password, phone, role, username } = user;

  const [, setCheck] = useState(false);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setCheck(e.target.checked);
  };

  const getFile = (FileData) => {
    setUser({ ...user, resource: FileData });
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '' || phone === '') {
      toast('Fields can not be empty', { type: 'error' });
    } else {
      
    }

    setUser({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'buyer',
    });
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginBottom: '30px' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Add User
        </Typography>
        <form className={classes.form} onSubmit={onsubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                value={name}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="Phone number"
                type="number"
                id="phone"
                value={phone}
                autoComplete="current-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography
                style={{ marginTop: '20px' }}
                variant="subtitle2"
                gutterBottom
              >
                User Type
              </Typography>
              <RadioGroup
                aria-label="customerType"
                name="role"
                value={role}
                onChange={onChange}
                style={{ marginLeft: '20px' }}
              >
                <FormControlLabel
                  value="researcher"
                  control={<Radio color="primary" />}
                  label="Admin"
                />
                <FormControlLabel
                  value="workshopConductor"
                  control={<Radio color="primary" />}
                  label="Editor"
                />
                <FormControlLabel
                  value="attendee"
                  control={<Radio color="primary" />}
                  label="Reviewer"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add User
              </Button>
            </Grid>
            <Grid item item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={history.goBack}
              >
                Cancle
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default AddUser;
