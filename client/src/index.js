import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



//Set to regester for install and service worker on production builds
serviceWorkerRegistration.unregister();

