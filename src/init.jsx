// @ts-check

import React from 'react';

import App from './components/App.jsx';
import ChatStore from './store/ChatStore.js';
import StoreContext from './context/StoreContext.jsx';
import SocketContext from './context/SocketContext.jsx';

export default (socket) => {
  const chat = new ChatStore();

  socket.on('newMessage', (data) => {
    console.log('MESSAGE DATA ', data);
    chat.addMessage(data);
  });

  const sendMessage = (data) => new Promise((response, reject) => {
    const timer = setTimeout(() => reject(Error('netError')), 0);
    socket.volatile.emit('newMessage', data, (res) => {
      if (res.status === 'ok') {
        clearTimeout(timer);
        response(res);
      }
    });
  });

  return (
    <StoreContext.Provider value={{
      chat,
    }}
    >
      <SocketContext.Provider value={{ sendMessage }}>
        <App />
      </SocketContext.Provider>
    </StoreContext.Provider>
  );
};
