import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in...', email, password);
    // Perform login logic here, e.g., API call
  };

  return (
    <Card className="card">
      <CardContent>
        <h2>Login/Sign-in</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
