import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './components/auth/SigIn';
import SignUp from './components/auth/SignUp';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Conference from './components/conference/Conference';
import ConferenceHome from './components/conference/ConferenceHome';
import ConferenceState from './context/auth/conference/conferenceState';
import AddConference from './components/conference/AddConference';
import { Container, CssBaseline } from '@material-ui/core';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth='lg' style={{ minHeight: '90vh' }}>
        <ConferenceState>
          <Header />
          <Switch>
            <Route exact path='/sign-in' component={SignIn} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/conferences' component={Conference} />
            <Route exact path='/conferences/:id' component={ConferenceHome} />
            <Route exact path='/conferencesAdd' component={AddConference} />
          </Switch>
        </ConferenceState>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
