import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

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

  const onsubmit = async (e) => {
    e.preventDefault();
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
        <Box mr={1}>
          <Button size="small" component={Link} to="/sign-in">
            Sign in
          </Button>
        </Box>
        <Button variant="outlined" size="small" component={Link} to="/sign-up">
          Sign up
        </Button>

        {/*<form onSubmit={onsubmit}>*/}
        {/*  <Button type="submit" size="small" variant="outlined">*/}
        {/*    Logout*/}
        {/*  </Button>*/}
        {/*</form>*/}
      </Toolbar>
    </React.Fragment>
  );
};

export default Header;
