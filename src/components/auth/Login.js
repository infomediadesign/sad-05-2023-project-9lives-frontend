import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import axios from "axios";
import { __LOGIN_URL__ } from "../../utils/constants";
import { useJwt } from "react-jwt";
import { useGlobalContext } from "../../utils/Hooks/context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth, setInLocalStorage } = useGlobalContext();

  const { decodedToken, isExpired } = useJwt(auth.token);
  // console.log("Login: ", isExpired);
  useEffect(() => {
    if (auth.token && !isExpired) {
      navigate("/home");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(__LOGIN_URL__, {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setInLocalStorage(res.data);
          setAuth({ token: res.data.accessToken });
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="card">
      <CardContent>
        <h2>Login</h2>
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
            {/* <Link to="/home" className="linkto"> */}
            Login
            {/* </Link> */}
          </Button>

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
