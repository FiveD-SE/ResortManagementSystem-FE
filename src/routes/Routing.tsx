import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import { lazy } from 'react';
import { ROUTES } from '../constants/routes';
import PrivateRoute from './PrivateRoute';
import { Role } from '../types';
import TripDetail from '../pages/trips/components/TripDetail';

const Home = lazy(() => import('../pages/home'));
const SignUp = lazy(() => import('../pages/signup'));
const SignIn = lazy(() => import('../pages/signin'));
const Trips = lazy(() => import('../pages/trips/Trips'));
const Profile = lazy(() => import('../pages/profile'));

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
      <Route element={<PrivateRoute allowedRoles={[Role.Customer]} />}>
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Route>
      <Route
        element={
          <PublicRoute>
            <TripDetail />
          </PublicRoute>
        }
        path={ROUTES.TRIPS.DETAIL}
      />
    </Routes>
  );
};

export default Routing;
