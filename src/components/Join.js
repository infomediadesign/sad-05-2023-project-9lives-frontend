

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

const Join = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/playground"); 
  };

  const handleBack = () => {
    navigate("/home"); 
  };

  return (
    <div>
      <Card className="card">
        <CardContent>
          <h2> Please Enter the Room Id</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              type="alphanumeric"
              label="Room id"
              variant="outlined"
              fullWidth
              inputProps={{ inputMode: "numeric" }}
            />
            <Button type="button" variant="contained" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" variant="contained">
              Join
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Join;
