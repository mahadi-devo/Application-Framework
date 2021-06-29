import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import TimelineIcon from '@material-ui/icons/Timeline';
import PaymentIcon from '@material-ui/icons/Payment';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const drawerWidth = 250;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
  darawerPaper: {
    width: drawerWidth,
  },
  menu: {
    listStyle: 'none',
    paddingLeft: '0px',
  },
  menuTitle: {
    marginTop: '10px',
    marginLeft: '10px',
  },
  active: {
    background: '#f4f4f4'
  }
});

function SideBar() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const manuList = [
    {
      itemText: 'Home',
      itemIcon: <HomeIcon color="primary" />,
      to: `${url}/home`,
    },
    {
      itemText: 'User',
      itemIcon: <PeopleAltIcon color="primary" />,
      to: `${url}/user`,
    },
    {
      itemText: 'Conference Request',
      itemIcon: <TimelineIcon color="primary" />,
      to: `${url}/confirmconferencerequest`,
    },
    {
      itemText: 'Conference Details',
      itemIcon: <TimelineIcon color="primary" />,
      to: `${url}/conference`,
    },
    {
      itemText: 'Payment',
      itemIcon: <PaymentIcon color="primary" />,
      to: `${url}/payment`,
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.darawerPaper }}
    >
      <Typography variant="h5" className={classes.menuTitle}>
        Admin Dashboard
      </Typography>

      <List className={classes.menu}>
        {manuList.map((item) => (
          <ListItem
            button
            key={item.itemText}
            onClick={() => history.push(item.to)}
            className={location.pathname.includes(item.to) ? classes.active : null}
          >
            <ListItemIcon>{item.itemIcon}</ListItemIcon>
            <ListItemText primary={item.itemText} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
