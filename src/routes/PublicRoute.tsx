import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    if (role === 'user') {
      return <Navigate to="/user" replace />;
    } else if (role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (role === 'receptionist') {
      return <Navigate to="/receptionist" replace />;
    } else if (role === 'serviceStaff') {
      return <Navigate to="/serviceStaff" replace />;
    }
  }

  return <>{children}</>;
};

export default PublicRoute;
