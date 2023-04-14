// == Import

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './styles.css';
// import du dossier home
import Cookie from 'js-cookie';
import Home from '../Home';
import ResetPassword from '../resetPassword';
import Header from '../Header';
import Signup from '../Signup';
import Profile from '../Profile';
import Footer from '../Footer';
import Contacts from '../Footer/Contacts';
import Users from '../Users';
import Mentionslegales from '../Footer/MentionsLegales';

// == Composant
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  function checkForLoggedInCookie() {
    if (!isAuthenticated) {
      const findCookie = Cookie.get('logged_in');
      const findCookieId = Cookie.get('uid');
      if (findCookie && findCookieId) {
        setIsAuthenticated(true);
        setSessionId(Number(findCookieId));
      }
    }
  }

  useEffect(() => {
    checkForLoggedInCookie();
  }, []);

  return (

    <BrowserRouter>

      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} sessionId={sessionId} setSessionId={setSessionId} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profiles" element={<Users />} />
        <Route path="/profiles/:userId" element=<Profile isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} sessionId={sessionId} setSessionId={setSessionId} /> />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/mentionslegales" element={<Mentionslegales />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// == Export
export default App;