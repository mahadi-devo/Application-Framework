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
import UpdateUser from './userManage/UpdateUser/UpdateUser';
import ConferenceRequest from './conferenceRequest/ConferenceRequest';
import Research from './research//research';
import Workshop from './workshop/workshop';

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
  
  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.leftbar}>
        <Switch>
          <Route exact path={`${path}/user`} component={UserManage} />
          <Route exact path={`${path}/user/add`} component={AddUser} />
          <Route exact path={`${path}/user/update/:id`} component={UpdateUser} />
          <Route exact path={`${path}/research`} component={Research} />
          <Route exact path={`${path}/workshop`} component={Workshop} />
          <Route exact path={`${path}/conference`} component={ConferenceManage} />
          <Route exact path={`${path}/confirmconferencerequest`} component={ConferenceRequest} />
          <Route exact path={`${path}/home`} component={Home} />
        </Switch>
      </div>
    </div>
  );
};

export default adminDashboard;
