// @ts-check

import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider, ErrorBoundary } from '@rollbar/react';

import App from './components/App.jsx';
import ChatStore from './store/ChatStore.js';
import StoreContext from './context/StoreContext.jsx';
import SocketContext from './context/SocketContext.jsx';
import resources from './resources/index.js';

export default async (socket) => {
  const chat = new ChatStore();

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const rollbarConfig = {
    accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  socket.on('newMessage', (data) => {
    chat.addMessage(data);
  });

  socket.on('newChannel', (data) => {
    chat.addChannel(data);
  });

  socket.on('renameChannel', (data) => {
    const { id, name } = data;
    chat.setChannelName(id, name);
  });

  socket.on('removeChannel', (data) => {
    chat.removeChannel(data.id);
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

  const renameChannel = (data) => new Promise((response, reject) => {
    const timer = setTimeout(() => reject(Error('netError')), 5000);
    socket.volatile.emit('renameChannel', data, (res) => {
      if (res.status === 'ok') {
        clearTimeout(timer);
        response(res);
      }
    });
  });

  const removeChannel = (data) => new Promise((response, reject) => {
    const timer = setTimeout(() => reject(Error('netError')), 5000);
    socket.volatile.emit('removeChannel', data, (res) => {
      if (res.status === 'ok') {
        clearTimeout(timer);
        chat.setCurrentChannelId(1);
        response(res);
      }
    });
  });

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreContext.Provider value={{
          chat,
        }}
        >
          <SocketContext.Provider value={{
            sendMessage, newChannel, renameChannel, removeChannel,
          }}
          >
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </SocketContext.Provider>
        </StoreContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};
