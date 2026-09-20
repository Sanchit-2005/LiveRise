import React from "react";
import StreamIcon from "@mui/icons-material/Stream";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Button from "@mui/material/Button";
import "../App.css";
import sideimage from "../utils/3702622.jpg";
import { Link } from "react-router-dom";
export default function landing() {
  return (
    <div className="landingPageContainer">
      <nav className="navDiv">
        <span className="name">
          <div>LiveRise </div>
          <VideoCameraFrontIcon sx={{ fontSize: "35px" }} />
        </span>

        <div className="right">
          <a href="">Join as Guest</a>
          <a href="">Login </a>
          <a href="">Signup</a>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="lefttext">
          <h1>
            <span style={{ color: "#FF467A", marginRight: "10px" }}>
              Connect
            </span>{" "}
            with Your loved ones
          </h1>
          <p className="smalltxt">Start your journey now</p>
          <Button
            variant="contained"
            component={Link}
            to="/auth"
            className="btn"
          >
            Get Started
          </Button>
        </div>
        <div>
          <img src={sideimage} />
        </div>
      </div>
    </div>
  );
}
