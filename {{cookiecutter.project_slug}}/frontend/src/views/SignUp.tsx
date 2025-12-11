import React, { FC, useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Face, Fingerprint } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { signUp, isAuthenticated } from '../utils/auth';

const useStyles = makeStyles(() => ({
  margin: { margin: 8 },
  padding: { padding: 8 },
  button: { textTransform: 'none' },
  marginTop: { marginTop: 10 }
}));

export const SignUp: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      const data = await signUp(email, password, passwordConfirmation);
      if (data) navigate('/');
    } catch (err: any) {
      setError(err.message ?? String(err));
    }
  };

  if (isAuthenticated()) {
    navigate('/');
    return null;
  }

  return (
    <Paper className={classes.padding}>
      <div className={classes.margin}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item><Face /></Grid>
          <Grid item md sm xs>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoFocus
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item><Fingerprint /></Grid>
          <Grid item md sm xs>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item><Fingerprint /></Grid>
          <Grid item md sm xs>
            <TextField
              label="Confirm password"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        {error && <Alert severity="error">{error}</Alert>}

        <Grid container justifyContent="center" className={classes.marginTop}>
          <Button variant="outlined" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};
