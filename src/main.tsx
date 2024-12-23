import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { AppThemeProvider } from './themes/AppThemeProvider';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './main.css';
import store from './stores/store';
import App from './App';
import Loader from './components/Loader';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>,
);
