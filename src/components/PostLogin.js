import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import "./PostLogin.css";

const PostLogin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex">
        <Card className="innerCard">
          <div className="buttonsDiv">
            <Button
              className="button1"
              style={{ marginBottom: "1rem" }}
              onClick={() => navigate("/join")}
              variant="contained"
            >
              Join
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => navigate("/create")}
            >
              Create
            </Button>
          </div>

          <Card className="card">
            <CardContent>
              <h2>How to Play</h2>

              <h3>
                Have the other player guess one letter at a time - or he or she
                can use a turn to guess the entire word or words. Fill in the
                letter everywhere it appears on the appropriate dash or dashes
                each time the person guesses correctly. Circle the letter on the
                alphabet if is guessed correctly. Add one body part to the
                drawing each time the letter chosen is not in the word. Begin by
                drawing a head attached to the short vertical line the noose.
              </h3>
            </CardContent>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default PostLogin;
