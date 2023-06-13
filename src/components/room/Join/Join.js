import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";
import axios from "axios";
import { __JOIN_URL__ } from "../../../utils/constants";
import { useGlobalContext } from "../../../utils/Hooks/context";

const Join = () => {
  const navigate = useNavigate();
  const [roomid, setRoomId] = useState("");
  const [name, setName] = useState("");
  const { auth, setRoomDetails } = useGlobalContext();
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        __JOIN_URL__,
        {
          playerName: name,
          gameID: roomid,
          userID: "648183422bade7e683c0fe04",
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((res) => {
        // console.log(res.data);
        setRoomDetails(res.data.roomDetails);
        navigate("/lobby/" + roomid);
      })
      .catch((error) => {
        console.log(error.message);
        setShowError(true);
      });

    // if (!roomid || !/^[a-zA-Z0-9]+$/.test(roomid)) {
    //   return;
    // }
  };

  return (
    <div>
      <Card className="card">
        <CardContent>
          <h2> Please Enter the Room Id</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter Your Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type="alphanumeric"
              label="Room id"
              variant="outlined"
              fullWidth
              inputProps={{ inputMode: "numeric" }}
              value={roomid}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button
              type="button"
              variant="contained"
              onClick={() => navigate("/home")}
            >
              Back
            </Button>
            <Button type="submit" variant="contained">
              Join
            </Button>

            {showError && (
              <p className="error-message">
                Please enter the correct Room Id to play
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Join;
