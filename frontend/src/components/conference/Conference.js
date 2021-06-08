import React, { Fragment, useEffect, useContext } from 'react';
import Carasoul from './Carasoul';
import Search from '../shared/Search';
import Grid from '@material-ui/core/Grid';
import Conferences from './Conferences';
import AdminHeader from '../shared/AdminHeader';
import ConferencesContext from '../../context/auth/conference/conference-context';
const { v4: uuidv4 } = require('uuid');

const Conference = () => {
  const conferencesContext = useContext(ConferencesContext);
  const { conferences } = conferencesContext;

  const user = 'editor';

  return (
    <Fragment>
      <Grid container spacing={3} style={{ marginTop: '15' }}>
        {user === 'editor' && (
          <Grid item lg={12} md={12} sm={12}>
            <AdminHeader />
          </Grid>
        )}
        <Grid item lg={12} md={12} sm={12}>
          <Search />
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <Carasoul />
        </Grid>

        {conferences.map((conf) => (
          <Grid
            item
            style={{ marginTop: '15px' }}
            key={uuidv4()}
            lg={4}
            md={6}
            sm={12}>
            <Conferences conference={conf} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default Conference;
