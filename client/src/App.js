import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Bookmarks from './components/Bookmarks'
import Navbar from './components/Navbar'

function App() {
    const [token, setToken] = useState('');

    return (
        <Router>
            <Navbar setToken={setToken} token={token} />

            <Switch>
                <Route path='/login'>
                    <Login setToken={setToken} />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/pack'>{/* <Pack /> */}</Route>
                <Route path='/bookmarks'>
                    <Bookmarks />
                </Route>
                <Route path='/saved'>{/* <Saved /> */}</Route>
                <Route path='/recover-password'>{/* <Recovery /> */}</Route>
                <Route path='/'>
                    <Home token={token} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
