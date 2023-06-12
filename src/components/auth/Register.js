import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Button } from "@mui/material";
import bcrypt from "bcryptjs";
import "./Register.css";
import axios from "axios";
import { __SIGNUP_URL__ } from "../../utils/constants";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setShowError(true);
    } else {
      setShowError(false);
      axios
        .post(__SIGNUP_URL__, {
          email,
          password: bcrypt.hashSync(password, 10),
        })
        .then((res) => {
          console.log(res.data);
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            navigate("/login");
          }, 2000);
        })
        .catch((error) => console.log(error.message));
    }
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
            <p className="error-message">
              Please enter the required information to register.
            </p>
          )}

          {showMessage && <p className="success-message">User Registered</p>}

          <p className="message">
            Already have an account?{" "}
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
