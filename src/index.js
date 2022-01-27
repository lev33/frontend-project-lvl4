// @ts-check

import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import init from './init.jsx';

const start = async () => {

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const socket = io();
  const vdom = await init(socket);

  ReactDOM.render(
    vdom,
    document.querySelector('#chat'),
  );
};

start();
