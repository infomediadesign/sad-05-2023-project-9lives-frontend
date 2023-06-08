import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
// import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import Display from "../../Display/Display";

const Create = () => {
  const navigate = useNavigate();
  const [numPlayers, setNumPlayers] = useState("");
  const [numRounds, setNumRounds] = useState("");
  const [numWordChoices, setNumWordChoices] = useState("");
  const [playerNames, setPlayerNames] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);
  const [showError, setShowError] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!numPlayers || !numRounds || !numWordChoices) {
      setShowError(true);
      return;
    }

    console.log(
      "Form submitted:",
      numPlayers,
      playerNames,
      numRounds,
      numWordChoices
    );

    setIsSubmitted(true);
  };
  
  const handleBack = () => {
    navigate("/home"); 
  };
  const handlePlayerNameChange = (index, newName) => {
    setPlayerNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = newName;
      return updatedNames;
    });
  };

  if (isSubmitted) {
    return (
      <Display
        numPlayers={numPlayers}
        playerNames={playerNames}
        numRounds={numRounds}
        numWordChoices={numWordChoices}
        selectedRound={selectedRound}
      />
    );
  } else {
    return (
      <Card className="create-card">
        <CardContent>
          <>
            {/* <RefreshIcon className="refresh-icon" /> */}
            <h2>Create Room</h2>
            <div className="input-group">
              <TextField
                type="number"
                label="Number of Players"
                value={numPlayers}
                onChange={(e) => setNumPlayers(e.target.value)}
              />
              {[...Array(Number(numPlayers))].map((_, index) => (
                <TextField
                  key={index}
                  label={`Player ${index + 1}`}
                  value={playerNames[index]}
                  onChange={(e) =>
                    handlePlayerNameChange(index, e.target.value)
                  }
                />
              ))}
              <TextField
                type="number"
                label="Number of Rounds"
                value={numRounds}
                onChange={(e) => setNumRounds(e.target.value)}
              />
              <TextField
                type="number"
                label="Number of Word Choices"
                value={numWordChoices}
                onChange={(e) => setNumWordChoices(e.target.value)}
              />
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
            
            <Button sx={{ marginTop: "40px" }}
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleBack}>
                
              Back
            </Button>

            {showError && (
            <p className="error-message">Please fill all the data to Create a Room</p>
          )}
          </>
        </CardContent>
      </Card>
    );
  }
};

export default Create;
