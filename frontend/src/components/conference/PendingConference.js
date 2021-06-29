import React, { Fragment, useEffect, useContext } from 'react';
import Search from '../shared/Search';
import Grid from '@material-ui/core/Grid';
import Conferences from './Conferences';
import AdminHeader from '../shared/AdminHeader';
import ConferencesContext from '../../context/auth/conference/conference-context';

const PendingConference = () => {
  const conferencesContext = useContext(ConferencesContext);
  const { conferences, getAllConferences, filtered, clearFilter } =
    conferencesContext;

  const user = 'editor';

  useEffect(() => {
    clearFilter();
    getAllConferences();
  }, []);

  console.log(conferences);

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
        {conferences !== null &&
          (filtered !== null
            ? filtered.map((conf) => (
                <Fragment key={conf._id}>
                  {conf.status === 'pending' && (
                    <Grid
                      item
                      style={{ marginTop: '15px' }}
                      lg={4}
                      md={6}
                      sm={12}>
                      <Conferences conference={conf} />
                    </Grid>
                  )}
                </Fragment>
              ))
            : conferences.map((conf) => (
                <Fragment key={conf._id}>
                  {conf.status === 'pending' && (
                    <Grid
                      item
                      style={{ marginTop: '15px' }}
                      lg={4}
                      md={6}
                      sm={12}>
                      <Conferences conference={conf} />
                    </Grid>
                  )}
                </Fragment>
              )))}
      </Grid>
    </Fragment>
  );
};

export default PendingConference;
