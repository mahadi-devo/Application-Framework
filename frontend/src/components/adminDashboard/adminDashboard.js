import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import SideBar from './SideBar/SideBar';
import ConferenceManage from './conferenceManage/conferenceManage';
import Home from './home/home';
import UserManage from './userManage/userManage';
import AddUser from './userManage/AddUser/AddUser';
import ConferenceRequest from './conferenceRequest/ConferenceRequest';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },

  leftbar: {
    flex: 5,
  },
});

const adminDashboard = () => {
  const { path } = useRouteMatch();

  const classes = useStyles();
  console.log('path is ', path);
  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.leftbar}>
        <Switch>
          <Route exact path={`${path}/user`} component={UserManage} />
          <Route exact path={`${path}/user/add`} component={AddUser} />
          <Route
            exact
            path={`${path}/conference`}
            component={ConferenceManage}
          />
          <Route
            exact
            path={`${path}/conferencerequest`}
            component={ConferenceRequest}
          />
          <Route exact path={`${path}`} component={Home} />
        </Switch>
      </div>
    </div>
  );
};

export default adminDashboard;
