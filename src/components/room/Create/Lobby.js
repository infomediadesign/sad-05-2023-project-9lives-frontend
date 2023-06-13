import React, { useEffect, useState } from "react";
import "./Lobby.css"; // Import the CSS file
import { useGlobalContext } from "../../../utils/Hooks/context";
import {
  __LOBBY_URL__,
  __BASE_URL__,
  __DELETE_ROOM__URL__,
  __LEAVE_URL__,
} from "../../../utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import Playground from "../Playground/Playground.js";

const Lobby = () => {
  const socket = io(__BASE_URL__ + "/game");
  let { roomID } = useParams();
  const navigate = useNavigate();
  const [isCreator, setIsCreator] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [movie, setMovie] = useState(null);

  const { roomDetails, auth, setRoomDetails } = useGlobalContext();
  const { maxPlayers, rounds } = roomDetails.setting;
  const { players, owner } = roomDetails;

  useEffect(() => {
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
      // socket.disconnect();
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
    <form className="lobby-form">
      <div className="form-section">
        <h1> LOBBY </h1>
        <h2>Room ID: {roomID}</h2>
        <h3 className="lobby-heading">Game Settings</h3>
        <p className="lobby-info">Number of Rounds: {rounds}</p>
        <p className="lobby-info">Number of Players: {maxPlayers}</p>
        {/* <p className="lobby-info">Number of Word Choices: {numWordChoices}</p> */}
        <h4 className="lobby-info">Players in lobby</h4>
        {players.length &&
          players.map((player) => {
            return <p key={player.id}>{player.gamerTag}</p>;
          })}
      </div>
      <div className="vertical-line"></div>
      <div className="form-section">
        <div className="buttons-container">
          {isStarted && !!movie && <Playground movie={movie} />}
          {isCreator && !isStarted && (
            <button onClick={handleStart} className="start-button">
              Start
            </button>
          )}
          <button className="exit-button" onClick={handleExit}>
            Exit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Lobby;
