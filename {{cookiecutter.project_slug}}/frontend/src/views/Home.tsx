import React, { FC, useState } from 'react';
import { makeStyles } from '@mui/styles';      // ← updated
import { Link } from 'react-router-dom';

import { getMessage } from '../utils/api';
import { isAuthenticated } from '../utils/auth';

const useStyles = makeStyles(() => ({
  link: {
    color: '#61dafb',
    display: 'block',
    margin: '8px 0'
  },
}));

export const Home: FC = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();

  const queryBackend = async () => {
    try {
      const msg = await getMessage();
      setMessage(msg);
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <>
      {!message && !error && (
        <button className={classes.link} onClick={queryBackend}>
          Click to make request to backend
        </button>
      )}

      {message && <p><code>{message}</code></p>}
      {error && <p>Error: <code>{error}</code></p>}

      <Link className={classes.link} to="/admin">Admin Dashboard</Link>
      <Link className={classes.link} to="/protected">Protected Route</Link>

      {isAuthenticated() ? (
        <Link className={classes.link} to="/logout">Logout</Link>
      ) : (
        <>
          <Link className={classes.link} to="/login">Login</Link>
          <Link className={classes.link} to="/signup">Sign Up</Link>
        </>
      )}
    </>
  );
};
