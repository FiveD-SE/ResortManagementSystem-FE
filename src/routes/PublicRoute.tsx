import React, { Fragment, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { ROUTES } from '../constants/routes';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    if (role === 'user') {
      return <Navigate to={ROUTES.HOME} replace />;
    } else if (role === 'admin') {
      return <Navigate to={ROUTES.ADMIN.HOME} replace />;
    } else if (role === 'receptionist') {
      return <Navigate to={ROUTES.RECEPTIONIST.HOME} replace />;
    } else if (role === 'serviceStaff') {
      return <Navigate to={ROUTES.SERVICE_STAFF.HOME} replace />;
    }
  }

  return <Fragment>{children}</Fragment>;
};

export default PublicRoute;
