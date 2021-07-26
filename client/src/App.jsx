import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar'

function App() {
  return (
      <Router>
      <Navbar />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/login">{/* <Login /> */}</Route>
          <Route path="/register">{/* <Register /> */}</Route>
          <Route path="/pack">{/* <Pack /> */}</Route>
          <Route path="/bookmarks">{/* <Bookmarks /> */}</Route>
          <Route path="/saved">{/* <Saved /> */}</Route>
          <Route path="/recover-password">{/* <Recovery /> */}</Route>
        </Switch>
      </Router>
  );
}

export default App;
