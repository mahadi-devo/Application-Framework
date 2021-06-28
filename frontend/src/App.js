import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './components/auth/SigIn';
import SignUp from './components/auth/SignUp';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Researcher from './components/user/Researcher/Researcher';
import Workshop from './components/user/Workshop/Workshop';
import Conference from './components/conference/Conference';
import ConferenceHome from './components/conference/ConferenceHome';
import ConferenceState from './context/auth/conference/conferenceState';
import ResearcherState from './context/user/researcher/researcherState';
import WorkshopState from './context/user/workshop/workshopState';
import AddConference from './components/conference/AddConference';
import AdminDashboard from './components/adminDashboard/adminDashboard';
import PendingConference from './components/conference/PendingConference';
import AddKeynote from './components/conference/AddKeynote';
import { Container, CssBaseline } from '@material-ui/core';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth='lg' style={{ minHeight: '90vh' }}>
        <ConferenceState>
          <ResearcherState>
            <WorkshopState>
              <Header />
              <Switch>
                <Route exact path='/sign-in' component={SignIn} />
                <Route exact path='/sign-up' component={SignUp} />
                <Route exact path='/conferences' component={Conference} />
                <Route
                  exact
                  path='/conferences/:id'
                  component={ConferenceHome}
                />
                <Route exact path='/conferencesAdd' component={AddConference} />
                <Route exact path='/conferencesAdd' component={AddConference} />
                <Route exact path='/research' component={Researcher} />
                <Route exact path='/workshop' component={Workshop} />
                <Route path='/adminDashboard' component={AdminDashboard} />
              </Switch>
            </WorkshopState>
          </ResearcherState>
        </ConferenceState>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
