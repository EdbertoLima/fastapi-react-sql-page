import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

type PrivateRouteProps = {
  children: React.ReactNode;
};

/**
 * Protects routes by checking authentication state.
 * If user is not authenticated, redirect them to the login page.
 * Keeps track of the intended URL so you can redirect back after login.
 */
export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};
