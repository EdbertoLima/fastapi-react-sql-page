import React, { FC } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import { Home, Login, SignUp, Protected, PrivateRoute } from './views';
import { Admin } from './admin';
import { logout } from './utils/auth';

const useStyles = makeStyles(() => ({
  app: {
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
}));

export const AppRoutes: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<LogoutRedirect onLogout={handleLogout} />} />
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <Protected />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </header>
    </div>
  );
};

// Simple helper component for logout route
type LogoutRedirectProps = {
  onLogout: () => void;
};

const LogoutRedirect: FC<LogoutRedirectProps> = ({ onLogout }) => {
  React.useEffect(() => {
    onLogout();
  }, [onLogout]);

  return null;
};
