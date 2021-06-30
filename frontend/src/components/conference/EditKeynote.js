import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import ConferenceContext from "../../context/conference/conference-context";
import FileUploader from "../shared/FileUpload";
import "react-toastify/dist/ReactToastify.css";

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

const EditKeynote = (keynot) => {
  const classes = useStyles();

  const conferenceContext = useContext(ConferenceContext);
  const { updateKeynote, conferenceId } = conferenceContext;

  const [keynote, setKeynote] = useState({
    name: "",
    organization: "",
    image: "",
    conferenceId: "",
  });

  useEffect(() => {
    if (keynot.keynot !== null) {
      setKeynote(keynot.keynot);
    } else {
      setKeynote({
        name: "",
        organization: "",
        conferenceId: conferenceId,
        image: "",
      });
    }
    console.log(keynot.keynot);
  }, [conferenceId, updateKeynote]);

  const { name, organization, image } = keynote;

  const onChange = (e) => {
    setKeynote({ ...keynote, [e.target.name]: e.target.value });
  };

  const getFile = (FileData) => {
    const reader = new FileReader();
    if (FileData) {
      if (FileData.size > 1000000 || FileData.size === 0) {
        toast("File size must be less than 1mb and greater that 0", {
          type: "error",
        });
      } else {
        reader.readAsDataURL(FileData);
        reader.onloadend = () => {
          setKeynote({ ...keynote, image: reader.result });
        };
        reader.onerror = () => {
          console.error("AHHHHHHHH!!");
        };
      }
    }
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    if (name === "" || organization === "") {
      toast("Fields can not be empty", { type: "error" });
    } else {
      if (updateKeynote(keynote)) {
        toast("Keynote Speaker updated successfully", { type: "success" });
      }

      setKeynote({
        name: "",
        organization: "",
        image: "",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paperContainer}>
        <Typography component="h1" variant="h6">
          Edit Keynote Speaker
        </Typography>
        <form className={classes.form} onSubmit={onsubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={onChange}
                fullWidth
                id="name"
                value={name}
                label="Name"
                name="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={onChange}
                fullWidth
                id="organization"
                value={organization}
                label="Organization"
                name="organization"
              />
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
            Save
          </Button>
          <Grid container justify="flex-center"></Grid>
        </form>
      </div>
    </Container>
  );
};

export default EditKeynote;
