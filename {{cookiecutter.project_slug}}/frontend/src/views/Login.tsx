import React, { FC, useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert
} from '@mui/material';                         // ← updated
import { makeStyles } from '@mui/styles';        // ← updated
import { Face, Fingerprint } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';  // ← updated

import { login, isAuthenticated } from '../utils/auth';

const useStyles = makeStyles((theme: any) => ({
  margin: { margin: 8 },
  padding: { padding: 8 },
  button: { textTransform: 'none' },
  marginTop: { marginTop: 10 }
}));

export const Login: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();  // ← updated

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      const data = await login(email, password);
      if (data) navigate('/'); // ← updated
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

        {error && <Alert severity="error">{error}</Alert>}

        <Grid container justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
          />

          <Button variant="text">Forgot password?</Button>
        </Grid>

        <Grid container justifyContent="center" className={classes.marginTop}>
          <Button
            variant="outlined"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
          &nbsp;
          <Button
            variant="outlined"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};
