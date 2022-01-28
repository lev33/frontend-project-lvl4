import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import {
  Navbar, Button, Container, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import ChatPage from './ChatPage.jsx';
import NoMatchPage from './NoMatchPage.jsx';
import AuthorizationContext from '../context/AuthorizationContext.jsx';

export default function App() {
  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem('loggedUser'));
  const [user, setUser] = useState(userData ? { username: userData.username } : null);

  const logIn = (data) => {
    localStorage.setItem('loggedUser', JSON.stringify(data));
    setUser({ username: data.username });
  };

  const logOut = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const getAuthorizationHeader = () => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    return loggedUser?.token
      ? { Authorization: `Bearer ${loggedUser.token}` } : {};
  };

  // logOut();

  return (
    <AuthorizationContext.Provider value={{
      user, logIn, logOut, getAuthorizationHeader,
    }}
    >
      <ToastContainer />
      <BrowserRouter>
        <Navbar className="shadow-sm bg-white">
          <Container>
            <Navbar.Brand className="navbar-brand" as={Link} to="/">{(t('hexletChat'))}</Navbar.Brand>
            <Nav>
              {user && (<Button variant="primary" onClick={logOut}>{(t('logOut'))}</Button>)}
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={user ? <ChatPage /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </AuthorizationContext.Provider>
  );
}
