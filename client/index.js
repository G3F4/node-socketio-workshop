import React, { Component } from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import App from './components/App';

// Creating screen
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  useBCE: true,
  cursor: {
      artificial: true,
      blink: true,
      shape: 'underline'
  },
  title: 'ChatClient',
  debug: true,
  log: `${__dirname}/application.log`,
});

// Lock console
console.log = () => {};
console.info = () => {};
console.warning = () => {};
console.error = () => {};

screen.debug('Application start');

// Listening for specific keys presses to handle process exit
screen.key(['q', 'C-c'], (ch, key) => {
  screen.dump();
  return process.exit(0);
});

// Exposing screen as Node global object to access it in other modules,
// so we don't need to use React context
global.screen = screen;

// Rendering the React app using our screen
render(<App />, screen);
