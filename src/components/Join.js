import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from 'react-router-dom';


const Join = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
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
            <Button type="submit" variant="contained">
            <Link to="/home" className="linkto">
            Back
            </Link>
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
