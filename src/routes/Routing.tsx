import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import { lazy } from 'react';
import { ROUTES } from '../constants/routes';

const Home = lazy(() => import('../pages/home'));
const SignUp = lazy(() => import('../pages/signup'));
const SignIn = lazy(() => import('../pages/signin'));
const Trips = lazy(() => import('../pages/trips'));

const Routing = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.AUTH.REGISTER}
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.AUTH.LOGIN}
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        element={
          <PublicRoute>
            <Trips />
          </PublicRoute>
        }
        path={ROUTES.TRIPS.HOME}
      />
    </Routes>
  );
};

export default Routing;
