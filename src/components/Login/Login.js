import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowError(true);
      return;
    }

    console.log("Logging in...", email, password);

    setShowError(false);

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      navigate("/home");
    }, 2000);
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

          {showError && (
            <p className="error-message">
              Please enter the required information to login.
            </p>
          )}

          {showMessage && (
            <p className="success-message">Logged in successfully.</p>
          )}

          <p className="message">
            Create a new account{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
