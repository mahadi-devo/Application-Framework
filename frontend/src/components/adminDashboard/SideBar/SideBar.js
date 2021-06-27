import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { Link, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flex: 1,
    position: 'sticky',
    height: 'calc(  100vh - 64px)',
  },
  menu: {
    listStyle: 'none',
    paddingLeft: '0px',
  },
  menuTitle: {
    marginTop: '10px',
    marginLeft: '10px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    paddingLeft: '10px',
    padding: '5px',
    '&:hover': {
      background: '#3C3DEB',
    },
  },
  link:{
    textDecoration: 'none',
    color: 'inherit'
}
});

function SideBar() {
  const { url } = useRouteMatch();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.menuTitle}>
        Dashboard
      </Typography>

      <ul className={classes.menu}>
        <Link to={`${url}`}>
          <li className={classes.menuItem}>
            <HomeIcon />
            <Typography variant="h6" display="inline">
              Home
            </Typography>
          </li>
        </Link>
        <Link to={`${url}/user`}>
          <li className={classes.menuItem}>
            <HomeIcon />
            <Typography variant="h6" display="inline">
              User
            </Typography>
          </li>
        </Link>
        <Link to={`${url}/conference`}>
          <li className={classes.menuItem}>
            <HomeIcon />
            <Typography variant="h6" display="inline">
              Conference
            </Typography>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;
