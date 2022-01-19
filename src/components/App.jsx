import React from 'react';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';

import LoginPage from './LoginPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Welcome to React Router!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
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

function NotFound() {
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
