import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import SideBar from "../SideBar/SideBar";
import workshopResourceApproval from "./workshop/workshopResourceApproval";
import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

const useStyles = makeStyles({
  root: {
    display: "flex",
    background: "white",
  },

  leftbar: {
    flex: 5,
  },
});

const approvalComponent = () => {
  const { path } = useRouteMatch();

  const reviewerMenu = [
    {
      itemText: "Workshops",
      itemIcon: <HomeIcon color="primary" />,
      to: `${path}/workshops`,
    },
    {
      itemText: "Researches",
      itemIcon: <PeopleAltIcon color="primary" />,
      to: `${path}/researches`,
    },
  ];

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideBar approvalConfig={{ reviewerMenu }} />
      <div className={classes.leftbar}>
        <Switch>
          <Route
            exact
            path={`${path}/workshops`}
            component={workshopResourceApproval}
          />
          {/*<Route exact path={`${path}/researches`} component={} />*/}
        </Switch>
      </div>
    </div>
  );
};

export default approvalComponent;
