import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import {
  Navbar, Button, Container, Nav,
} from 'react-bootstrap';

import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import ChatPage from './ChatPage.jsx';
import AuthorizationContext from '../context/AuthorizationContext.jsx';

export default function App() {
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
      <BrowserRouter>
        <Navbar className="shadow-sm bg-white">
          <Container>
            <Navbar.Brand className="navbar-brand" as={Link} to="/">hexletChat</Navbar.Brand>
            <Nav>
              {user && (<Button variant="primary" onClick={logOut}>logOut</Button>)}
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={user ? <ChatPage /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </AuthorizationContext.Provider>
  );
}

function NoMatch() {
  return (
    <>
      <main>
        <h2>Not found page</h2>
        <p>
          404
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
