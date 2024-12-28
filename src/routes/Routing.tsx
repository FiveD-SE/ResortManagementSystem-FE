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
const AdminHome = lazy(() => import('../pages/admin-dashboard'));
const StaffManagement = lazy(() => import('../pages/admin-staff-management'));
const CustomerManagement = lazy(() => import('../pages/admin-customer-management'));
const RoomManagement = lazy(() => import('../pages/admin-room-management'));
const ServiceManagement = lazy(() => import('../pages/admin-service-management'));
const PromotionManagement = lazy(() => import('../pages/admin-promotion-management'));
const BookingManagement = lazy(() => import('../pages/admin-booking-management'));
const AdminProfile = lazy(() => import('../pages/admin-profile'));

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
      <Route element={<PrivateRoute allowedRoles={[Role.Admin]} />}>
        <Route path={ROUTES.ADMIN.HOME} element={<AdminHome />} />
        <Route path={ROUTES.ADMIN.STAFF_MANAGEMENT} element={<StaffManagement />} />
        <Route path={ROUTES.ADMIN.CUSTOMER_MANAGEMENT} element={<CustomerManagement />} />
        <Route path={ROUTES.ADMIN.ROOM_MANAGEMENT} element={<RoomManagement />} />
        <Route path={ROUTES.ADMIN.SERVICE_MANAGEMENT} element={<ServiceManagement />} />
        <Route path={ROUTES.ADMIN.PROMOTION_MANAGEMENT} element={<PromotionManagement />} />
        <Route path={ROUTES.ADMIN.BOOKING_MANAGEMENT} element={<BookingManagement />} />
        <Route path={ROUTES.ADMIN.PROFILE} element={<AdminProfile />} />
      </Route>
    </Routes>
  );
};

export default Routing;
