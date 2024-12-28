import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import { lazy } from 'react';
import { ROUTES } from '../constants/routes';
import PrivateRoute from './PrivateRoute';
import { Role } from '../types';
import TripDetail from '../pages/trips/components/TripDetail';
import TripReview from '../pages/trips/components/TripReview';

const Home = lazy(() => import('../pages/home'));
const SignUp = lazy(() => import('../pages/signup'));
const SignIn = lazy(() => import('../pages/signin'));
const Trips = lazy(() => import('../pages/trips/Trips'));
const Rooms = lazy(() => import('../pages/rooms'));
const Profile = lazy(() => import('../pages/profile'));

const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
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

      <Route path={ROUTES.ROOMS} element={<Rooms />} />
      <Route element={<PrivateRoute allowedRoles={[Role.User]} />}>
        <Route element={<Trips />} path={ROUTES.TRIPS.HOME} />
        <Route element={<TripDetail />} path={ROUTES.TRIPS.DETAIL} />
        <Route element={<TripReview />} path={ROUTES.TRIPS.REVIEW} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Routing;
