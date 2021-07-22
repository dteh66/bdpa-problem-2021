import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Router>
      {/* <Topbar /> or layout element of some kind */}
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
