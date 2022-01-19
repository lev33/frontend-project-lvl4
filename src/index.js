// @ts-check

import ReactDOM from 'react-dom';

import init from './init.jsx';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  init(),
  document.querySelector('#chat'),
);
