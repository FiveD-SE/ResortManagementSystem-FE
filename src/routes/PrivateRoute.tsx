import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState, useAppSelector } from '../stores/store';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAppSelector((state: RootState) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  if (role === 'user') {
    return <Navigate to="/user" replace />;
  } else if (role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (role === 'receptionist') {
    return <Navigate to="/receptionist" replace />;
  } else if (role === 'serviceStaff') {
    return <Navigate to="/serviceStaff" replace />;
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;
