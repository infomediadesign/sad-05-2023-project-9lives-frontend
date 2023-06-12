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
  const [numPlayers, setNumPlayers] = useState(2);
  const [numRounds, setNumRounds] = useState(1);
  // const [numWordChoices, setNumWordChoices] = useState("");
  const [showError, setShowError] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const { auth, setRoomDetails } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!numPlayers || !numRounds || !creatorName) {
      // || !numWordChoices also this.
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

    // console.log("Form submitted:", numPlayers, numRounds, creatorName);
    // // if wants to add this  , numWordChoices
    // navigate("/lobby", {
    //   state: {
    //     numRounds: numRounds,
    //     numPlayers: numPlayers,
    //     creatorName: creatorName,
    //   },
    // });
  };

  // const handleNumWordChoicesChange = (event) => {
  //   setNumWordChoices(event.target.value);
  // };

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
                <MenuItem value={2}>2</MenuItem>
                {/* <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem> */}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="num-rounds-label">Number of Rounds</InputLabel>
              <Select
                labelId="num-rounds-label"
                id="num-rounds"
                value={numRounds}
                label="Number of Rounds"
                onChange={(event) => setNumRounds(event.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
            {/* <FormControl fullWidth>
                <InputLabel id="num-words-label">Number of Word Choices</InputLabel>
                <Select
                  labelId="num-words-label"
                  id="num-words"
                  value={numWordChoices}
                  label="Number of Word Choices"
                  onChange={handleNumWordChoicesChange}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl> */}
          </div>
          <Button
            sx={{ marginTop: "40px" }}
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Create your room
          </Button>
          <Button
            sx={{ marginTop: "40px" }}
            type="submit"
            variant="contained"
            fullWidth
            onClick={() => navigate("/home")}
          >
            Back
          </Button>

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
