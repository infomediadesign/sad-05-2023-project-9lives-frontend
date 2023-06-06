import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
// import Button from './Button';
import Button from "@mui/material/Button";
import './Register.css';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registering...', email, password);
  
   
  };

  return (
    <Card className="card">
      <CardContent>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
            Register
          </Button>
          <p className='message'>
            Already have an account? {' '}
            <Link to="/login" className="linkto">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
