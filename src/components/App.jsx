import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import LoginPage from './LoginPage.jsx';
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
        <div>
          <h1>Welcome to React Router!</h1>
          <Routes>
            <Route path="/" element={user ? <ChatPage /> : <LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
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
