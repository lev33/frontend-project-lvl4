// @ts-check

import React from 'react';

import App from './components/App.jsx';
import ChatStore from './store/ChatStore.js';
import StoreContext from './context/StoreContext.jsx';
import SocketContext from './context/SocketContext.jsx';

export default (socket) => {
  const chat = new ChatStore();

  socket.on('newMessage', (data) => {
    chat.addMessage(data);
  });

  socket.on('newChannel', (data) => {
    chat.addChannel(data);
  });

  const sendMessage = (data) => new Promise((response, reject) => {
    const timer = setTimeout(() => reject(Error('netError')), 5000);
    socket.volatile.emit('newMessage', data, (res) => {
      if (res.status === 'ok') {
        clearTimeout(timer);
        response(res);
      }
    });
  });

  const newChannel = (data) => new Promise((response, reject) => {
    const timer = setTimeout(() => reject(Error('netError')), 5000);
    socket.volatile.emit('newChannel', data, (res) => {
      if (res.status === 'ok') {
        clearTimeout(timer);
        const { id } = res.data;
        chat.setCurrentChannelId(id);
        response(res);
      }
    });
  });

  return (
    <StoreContext.Provider value={{
      chat,
    }}
    >
      <SocketContext.Provider value={{ sendMessage, newChannel }}>
        <App />
      </SocketContext.Provider>
    </StoreContext.Provider>
  );
};
