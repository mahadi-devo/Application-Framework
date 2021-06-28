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
import PendingConference from './components/conference/PendingConference';
import AddKeynote from './components/conference/AddKeynote';
import { Container, CssBaseline } from '@material-ui/core';
import AdminDashboard from './components/adminDashboard/adminDashboard';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container maxWidth='lg' style={{ minHeight: '90vh' }}>
        <ConferenceState>
          <ResearcherState>
            <WorkshopState>
              <Switch>
                <Route exact path='/sign-in' component={SignIn} />
                <Route exact path='/sign-up' component={SignUp} />
                <Route exact path='/conferences' component={Conference} />
                <Route
                  exact
                  path='/conferences/:id'
                  component={ConferenceHome}
                />
                <Route
                  exact
                  path='/conferences-add'
                  component={AddConference}
                />
                <Route exact path='/pending' component={PendingConference} />
                <Route exact path='/keynote-add' component={AddKeynote} />
                <Route path='/adminDashboard' component={AdminDashboard} />
                <Route exact path='/research' component={Researcher} />
                <Route exact path='/workshop' component={Workshop} />
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