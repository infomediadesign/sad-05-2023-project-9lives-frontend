import React, { useEffect, useState } from "react";
import "./Lobby.css"; // Import the CSS file
import { useGlobalContext } from "../../../utils/Hooks/context";
import {
  __LOBBY_URL__,
  __DELETE_ROOM__URL__,
  __LEAVE_URL__,
} from "../../../utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Playground from "../Playground/Playground.js";
import { Button } from "@mui/material";
import { socket } from "../../../socket";
const Lobby = () => {
  let { roomID } = useParams();
  const navigate = useNavigate();
  const [isCreator, setIsCreator] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [movie, setMovie] = useState(null);

  const { roomDetails, auth, setRoomDetails } = useGlobalContext();
  const { maxPlayers, rounds } = roomDetails.setting;
  const { players, owner } = roomDetails;

  useEffect(() => {
    socket.connect();
    axios
      .post(
        __LOBBY_URL__,
        {
          gameID: roomID,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((res) => {
        setRoomDetails(res.data.roomDetails);
        socket.emit("join", res.data.roomDetails);
      })
      .catch((error) => {
        console.log(error.message);
        socket.disconnect();
        navigate(`/home`);
      });

    socket.on("start", (val) => {
      setMovie(val.toLowerCase());
      setIsStarted(true);
    });
    // socket.on("lobbyState", (lobbyState) => {
    //   setRoomDetails({ ...lobbyState });
    // });

    return () => {
      // socket.off("lobbyState");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (owner === auth.email) {
      setIsCreator(true);
    } else setIsCreator(false);
  }, [owner, auth.email]);

  useEffect(() => {
    if (isStarted) {
      socket.emit("start", roomID);
    }
    console.log("started");
  }, [isStarted]);

  useEffect(() => {
    console.log("room updated!");
  }, [roomDetails, players]);

  const handleStart = (e) => {
    e.preventDefault();
    setIsStarted(true);
  };

  const handleExit = (e) => {
    e.preventDefault();
    if (isCreator) {
      axios
        .delete(__DELETE_ROOM__URL__ + "/" + roomID, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => {
          setRoomDetails(res.data.roomDetails);
          socket.emit("join", res.data.roomDetails);
          setIsStarted(false);
          socket.disconnect();
          navigate("/home");
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .patch(
          __LEAVE_URL__,
          {
            gameID: roomID,
          },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        )
        .then((res) => {
          // console.log(res.data);
          setRoomDetails(res.data.roomDetails);
          socket.emit("join", res.data.roomDetails);
          socket.disconnect();
          navigate("/home");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="lobby-play">
      <div className="lobby-section">
        <h1> LOBBY </h1>
        <div className="room-info">
          <h3>Room ID: {roomID}</h3>
          <div>
            <h3 className="lobby-heading">Game Settings</h3>
            <p className="lobby-info">Number of Rounds: {rounds}</p>
            <p className="lobby-info">Room Capacity: {maxPlayers}</p>
            {/* <p className="lobby-info">Number of Word Choices: {numWordChoices}</p> */}
          </div>
          <div>
            <h3 className="lobby-heading">Players in lobby</h3>
            {players.length &&
              players.map((player) => {
                return (
                  <p className="lobby-info" key={player.id}>
                    {player.gamerTag}
                    <span> (score: {player.score} )</span>
                  </p>
                );
              })}
          </div>
        </div>
        <div className="buttons-container">
          {isCreator && !isStarted && (
            <Button onClick={handleStart} variant="contained" size="small">
              Start
            </Button>
          )}
          <Button
            onClick={handleExit}
            variant="outlined"
            color="error"
            size="small"
          >
            Exit
          </Button>
        </div>
      </div>
      <div className="play-section">
        {isStarted && !!movie && (
          <Playground movie={movie} setMovie={setMovie} isCreator={isCreator} />
        )}
      </div>
    </div>
  );
};

export default Lobby;
