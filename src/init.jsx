// @ts-check

import React from 'react';

import App from './components/App.jsx';
import ChatStore from './store/ChatStore.js';
import StoreContext from './context/StoreContext.jsx';

export default () => (
  <StoreContext.Provider value={{
    chat: new ChatStore(),
  }}
  >
    <App />
  </StoreContext.Provider>
);
