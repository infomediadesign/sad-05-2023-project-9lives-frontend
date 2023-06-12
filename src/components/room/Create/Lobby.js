import React, { useEffect, useState } from "react";
import "./Lobby.css"; // Import the CSS file
import { useGlobalContext } from "../../../utils/Hooks/context";
import { __LOBBY_URL__ } from "../../../utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Lobby = ({
  // maxPlayers,
  playerNames,
  // rounds,
  // isCreator
  // numWordChoices
}) => {
  let { roomID } = useParams();
  const navigate = useNavigate();
  const { roomDetails, auth, setRoomDetails } = useGlobalContext();
  const [isCreator, setIsCreator] = useState(true);
  const { maxPlayers, rounds } = roomDetails.setting;

  useEffect(() => {
    axios
      .post(
        __LOBBY_URL__,
        {
          // email: "raj@gmail.com", // change later
          gameID: roomID,
          // userID: "648183422bade7e683c0fe04",
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((res) => {
        console.log(res.data);
        setRoomDetails(res.data.roomDetails);
        navigate(`/lobby/${res.data.roomDetails.roomID}`);
      })
      .catch((error) => {
        console.log(error.message);
        navigate(`/room/create`);
      });
  }, []);

  const handleExit = () => {
    if (isCreator) {
      console.log("Room Deleted");
    } else {
      console.log("User exited the room");
    }
  };
  return (
    <form className="lobby-form">
      <div className="form-section">
        <h1> LOBBY </h1>
        <h2 className="lobby-heading">Game Settings</h2>
        <p className="lobby-info">Number of Rounds: {rounds}</p>
        {/* <p className="lobby-info">Number of Word Choices: {numWordChoices}</p> */}
      </div>
      <div className="vertical-line"></div>
      <div className="form-section">
        <p className="lobby-info">Number of Players: {maxPlayers}</p>
        <p className="lobby-info">Player Names:</p>
        {}
        <div className="buttons-container">
          <button className="start-button">Start</button>
          <button className="exit-button" onClick={handleExit}>
            Exit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Lobby;
