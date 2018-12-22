import React from "react";
import "./style.css";

function Header(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand col-4">Score: {props.score}</a>
      <a
        className="navbar-brand col-5"
        style={{ color: props.correctGuess ? "black" : "red" }}
      >
        Last Guess: {props.guess}
      </a>

      <a className="navbar-brand col-4">High Score: {props.highscore}</a>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </nav>
  );
}

export default Header;
