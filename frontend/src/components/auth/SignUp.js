import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Radio } from "@material-ui/core";
import FileUploader from "../shared/FileUpload";

toast.configure();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "buyer",
    resource: null,
  });

  const { name, email, password, phone, role, uploadResource } = user;

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

    if (name === "" || email === "" || password === "" || phone === "") {
      toast("Fields can not be empty", { type: "error" });
    } else {
      // const statues = await register({
      //   name,
      //   email,
      //   password,
      //   phone,
      //   role,
      //   uploadResource,
      // });

      if (statues) {
        if (role === "seller") {
          props.history.push("/products");
        } else {
          props.history.push("/");
        }
      }
    }

    setUser({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "buyer",
      uploadResource: "",
    });
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginBottom: "30px" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onsubmit}>
          <Grid container spacing={2}>
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
                autoFocus
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
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={onChange}
              />
            </Grid>
            <Grid item md={12}>
              <RadioGroup
                aria-label="customerType"
                name="role"
                value={role}
                onChange={onChange}
              >
                <FormControlLabel
                  value="researcher"
                  control={<Radio color="primary" />}
                  label="I am a Researcher."
                />
                <FormControlLabel
                  value="workshopConductor"
                  control={<Radio color="primary" />}
                  label="I am a Workshop Conductor."
                />
                <FormControlLabel
                  value="attendee"
                  control={<Radio color="primary" />}
                  label="Just need to attend a conference."
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FileUploader
                noOfFiles="1"
                multiple={false}
                input="Upload Your Resource Here"
                getFileCallback={getFile}
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/sign-in" style={{ cursor: "pointer" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
