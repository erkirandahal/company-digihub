import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authApi } from '../../services/api';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = authApi.isAuthenticated();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
