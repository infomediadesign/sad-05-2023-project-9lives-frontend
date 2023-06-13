import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import { __CREATE_ROOM__URL__ } from "../../../utils/constants";
import { useGlobalContext } from "../../../utils/Hooks/context";
import axios from "axios";

const Create = () => {
  const navigate = useNavigate();
  const [numPlayers, setNumPlayers] = useState(1);
  const [numRounds, setNumRounds] = useState(1);
  const [showError, setShowError] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const { auth, setRoomDetails } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!numPlayers || !numRounds || !creatorName) {
      setShowError(true);
      return;
    } else {
      axios
        .post(
          __CREATE_ROOM__URL__,
          {
            playerName: creatorName,
            maxPlayers: numPlayers,
            rounds: numRounds,
          },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        )
        .then((res) => {
          setRoomDetails(res.data.roomDetails);
          navigate(`/lobby/${res.data.roomDetails.roomID}`);
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <Card className="create-card">
      <CardContent>
        <>
          <h2>Room Settings</h2>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                label="Enter Your Name"
                value={creatorName}
                onChange={(event) => setCreatorName(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="num-players-label">Number of Players</InputLabel>
              <Select
                labelId="num-players-label"
                id="num-players"
                value={numPlayers}
                label="Number of Players"
                onChange={(event) => setNumPlayers(event.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                {/* <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem> */}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="num-rounds-label">Number of Rounds</InputLabel>
              <Select
                disabled
                labelId="num-rounds-label"
                id="num-rounds"
                value={numRounds}
                label="Number of Rounds"
                onChange={(event) => setNumRounds(event.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                {/* <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          <div>
            <Button
              sx={{ marginTop: "30px" }}
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              Create your room
            </Button>
            <Button
              sx={{ marginTop: "20px" }}
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => navigate("/home")}
            >
              Back
            </Button>
          </div>
          {showError && (
            <p className="error-message">
              Please fill all the data to Create a Room
            </p>
          )}
        </>
      </CardContent>
    </Card>
  );
};

export default Create;
