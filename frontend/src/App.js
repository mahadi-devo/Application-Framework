import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SigIn";
import SignUp from "./components/auth/SignUp";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { Container, CssBaseline } from "@material-ui/core";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg" style={{ minHeight: "90vh" }}>
        <Header />
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
