import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowError(true);
      return;
    }

    console.log('Registering...', email, password);

    setShowError(false); 

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      navigate('/home');
    }, 2000);
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

          {showError && (
            <p className="error-message">Please enter the required information to register.</p>
          )}

          {showMessage && (
            <p className="success-message">User Registered</p>
          )}

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
