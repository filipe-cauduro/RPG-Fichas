import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { config } from './utilities/http';
import Routes from './routes';
import NotificationsHub from './components/notificationHub';
import { CookiesProvider } from 'react-cookie';

config();

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <NotificationsHub>
        <Routes />
      </NotificationsHub>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
