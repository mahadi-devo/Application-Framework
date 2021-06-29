import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

toast.configure();

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

const SignIn = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "admin123@gmail.com",
    password: "123456789",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast("Fields can not be empty", { type: "error" });
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const res = await axios.post(
          `http://localhost:5000/api/v1/auth/login`,
          user,
          config
        );

        await localStorage.setItem("userId", res.data.user.id);
        await localStorage.setItem("userEmail", res.data.user.email);
        await localStorage.setItem("userRole", res.data.user.role);
        await localStorage.setItem("token", res.data.token);
        await toast("Login success!", { type: "success" });
        props.history.push("/conferences");
      } catch (error) {
        toast(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          { type: "error" }
        );
      }
    }

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paperContainer}>
        <Avatar className={classes.avatar}>
          <ExitToAppIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Login
        </Typography>
        <form className={classes.form} onSubmit={onsubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={onChange}
                fullWidth
                id="email"
                value={email}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={onChange}
                name="password"
                label="Password"
                type="password"
                value={password}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justify="flex-center">
            <Grid item>
              <Link to="/sign-up" style={{ cursor: "pointer" }}>
                Does not have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
