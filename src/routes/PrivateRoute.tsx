import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState, useAppSelector } from '../stores/store';
import { ROUTES } from '../constants/routes';
import { Role } from '../types';

interface PrivateRouteProps {
  allowedRoles: Role[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.user);
  const role = user?.role;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && allowedRoles.includes(role)) {
    return <Outlet />;
  }

  if (role === Role.User) {
    return <Navigate to={ROUTES.HOME} replace />;
  } else if (role === Role.Admin) {
    return <Navigate to={ROUTES.ADMIN.HOME} replace />;
  } else if (role === Role.Receptionist) {
    return <Navigate to={ROUTES.RECEPTIONIST.HOME} replace />;
  } else if (role === Role.ServiceStaff) {
    return <Navigate to={ROUTES.SERVICE_STAFF.HOME} replace />;
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;
