import React, { Fragment, useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ConferenceContext from "../../context/conference/conference-context";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import StripeCheckout from "react-stripe-checkout";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddConference from "./AddConference";
import KeynoteMap from "./KeynoteMap";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: "maxContent",
  },
  header1: {
    marginTop: "20px",
  },
  headerImg: {
    objectPosition: "center",
    marginTop: "10px",
  },
});

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const researchPay = ({ match, id }) => {
  return (
    <Fragment>
      <Grid container justify="center" style={{ marginTop: "15px" }}>
        <h3>Pay for the research</h3>
      </Grid>
      <br />
      <hr />
      <Grid container justify="center" style={{ marginTop: "15px" }}>
        <StripeCheckout
          stripeKey="pk_test_51Is6w9CaLuVljyXivn0DHr71gLQiazZPrZxF39DWKVpnTfrkoxrAsOX4QsPeYY8Inc9EshMfkzXHmki436baPGoy00Bqae1QFZ"
          amount={100 * 100}
          style={{
            width: "300 px",
            background:
              "linear-gradient(rgb(125, 197, 238), rgb(0, 140, 221) 85%, rgb(48, 162, 228))",
          }}
        />
      </Grid>
    </Fragment>
  );
};
export default researchPay;
