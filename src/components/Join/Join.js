import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

const Join = () => {
  const navigate = useNavigate();
  const [roomid, setRoomId] = useState('');

  const [showError, setShowError] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!roomid|| !/^[a-zA-Z0-9]+$/.test(roomid)) {
      setShowError(true);
      return;
    }
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
              value={roomid}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button type="button" variant="contained" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" variant="contained">
              Join
            </Button>

            {showError && (
            <p className="error-message">Please enter the correct Room Id to play</p>
          )}

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Join;
