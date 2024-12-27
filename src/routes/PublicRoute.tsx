import React, { Fragment, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { ROUTES } from '../constants/routes';
import { Role } from '../types';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const role = user?.role;
  if (isAuthenticated) {
    if (role === Role.User) {
      return <Navigate to={ROUTES.HOME} />;
    } else if (role === Role.Admin) {
      return <Navigate to={ROUTES.ADMIN.HOME} replace />;
    } else if (role === Role.Receptionist) {
      return <Navigate to={ROUTES.RECEPTIONIST.HOME} replace />;
    } else if (role === Role.ServiceStaff) {
      return <Navigate to={ROUTES.SERVICE_STAFF.HOME} replace />;
    }
  }

  return <Fragment>{children}</Fragment>;
};

export default PublicRoute;
