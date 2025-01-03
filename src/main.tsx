import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AppThemeProvider } from './themes/AppThemeProvider';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Cookies from 'js-cookie';
import store from './stores/store';
import App from './App';
import Loader from './components/Loader';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './main.css';

const Root = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      Cookies.set('reset_password_token', token, { expires: 15 / (24 * 60) });
    }
  }, []);

  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <AppThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter
              future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true,
              }}
            >
              <CssBaseline />
              <App />
            </BrowserRouter>
          </LocalizationProvider>
        </AppThemeProvider>
      </Suspense>
      <Toaster />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
