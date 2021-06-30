import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    marginLeft: "120px !important",
    cursor: "pointer",
    textDecoration: "none",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Header = () => {
  const classes = useStyles();
  let history = useHistory();
  let [auth, setAuth] = useState(false);

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (token === "null") {
      setAuth(false);
    } else {
      setAuth(true);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth]);

  const onsubmit = async (e, props) => {
    e.preventDefault();

    await localStorage.setItem("userId", null);
    await localStorage.setItem("userEmail", null);
    await localStorage.setItem("userRole", null);
    await localStorage.setItem("token", null);

    setAuth("null");

    toast("Log out success!", { type: "success" });
    history.push("/conferences");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h5"
          color="primary"
          align="center"
          noWrap
          className={classes.toolbarTitle}
          component={Link}
          to="/"
        >
          Conference Management System
        </Typography>
        {!auth && (
          <Box mr={1}>
            <Button size="small" component={Link} to="/sign-in">
              Sign in
            </Button>
          </Box>
        )}{" "}
        {!auth && (
          <Button
            variant="outlined"
            size="small"
            component={Link}
            to="/sign-up"
          >
            Sign up
          </Button>
        )}
        {auth && (
          <form onSubmit={onsubmit}>
            <Button type="submit" size="small" variant="outlined">
              Logout
            </Button>
          </form>
        )}
      </Toolbar>
    </React.Fragment>
  );
};

export default Header;
