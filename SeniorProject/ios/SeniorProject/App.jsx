import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import MessagingPage from './pages/MessagingPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="header">
                </header>

                <Switch>
                    <Route path="/home" exact component={HomePage} />
                    <Route path="/calendar" component={CalendarPage} />
                    <Route path="/messaging" component={MessagingPage} />
                    <Route path="/profile" component={ProfilePage} />
                    {/* Add more routes as needed */}
                </Switch>

                <footer className="footer">
                    <Link to="/home" className="footer-btn">Home</Link>
                    <Link to="/calendar" className="footer-btn">Calendar</Link>
                    <Link to="/messaging" className="footer-btn">Messaging</Link>
                    <Link to="/profile" className="footer-btn">Profile</Link>
                </footer>
            </div>
        </Router>
    );
}

export default App;