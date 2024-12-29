import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App name="local" />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
