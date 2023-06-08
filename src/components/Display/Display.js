import React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import RefreshIcon from "@mui/icons-material/Refresh";
import Typography from "@mui/material/Typography";
import "./Display.css";

const Display = ({
  numPlayers,
  playerNames,
  numRounds,
  numWordChoices,
  selectedRound,
}) => {
  return (
    <div className="display-container">
      <Typography variant="h4" component="h2" gutterBottom>
        Game Display
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Number of Players: {numPlayers}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Player Names:
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Number of Rounds: {numRounds}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Number of Word Choices: {numWordChoices}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Selected Round: {selectedRound}
      </Typography>
    </div>
  );
};

export default Display;
