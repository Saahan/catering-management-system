import React from "react";
import "../styles/dashboard.css";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase.js";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

export default function NavBar(props) {
  const auth = getAuth(app);

  function logOut() {
    signOut(auth)
      .then(() => {
        //navigate to home page
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function showSideBar() {
    props.showSideBar();
  }

  return (
    <Navbar className="bg-body-tertiary nav">
      <div style={{ width: "100%" }} className="nav-container">
        <Button className="hamburger-button" onClick={showSideBar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="white"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </Button>
        <Navbar.Brand style={{ color: "white" }}>
          <img
            src="/img/catering.svg"
            width={30}
            height={30}
            alt="catering-logo"
            className="img-svg"
          ></img>
        </Navbar.Brand>
        <button
          onClick={logOut}
          style={{ float: "right" }}
          className="signout-button"
        >
          Logout
        </button>
      </div>
    </Navbar>
  );
}
