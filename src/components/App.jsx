import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import LoginPage from './LoginPage.jsx';
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

  // logOut();

  return (
    <AuthorizationContext.Provider value={{
      user, logIn, logOut,
    }}
    >
      <BrowserRouter>
        <div>
          <h1>Welcome to React Router!</h1>
          <Routes>
            <Route path="/" element={user ? <Home /> : <LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthorizationContext.Provider>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Home page</h2>
        <p>Home page text.</p>
      </main>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    </>
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
