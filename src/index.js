// @ts-check

import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import init from './init.jsx';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();
const vdom = init(socket);

ReactDOM.render(
  vdom,
  document.querySelector('#chat'),
);
