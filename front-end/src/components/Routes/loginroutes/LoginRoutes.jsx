import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage'; // Import your Login page component

function LoginRoutes() {
    return (
        <Router>
            <Switch>
                <Route path="/login" element={<Login />} />
            </Switch>
        </Router>
    );
}

export default LoginRoutes;