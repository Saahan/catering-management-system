import React from "react";
import "../styles/dashboard.css";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase.js";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
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

  return (
    <Navbar className="bg-body-tertiary nav">
      <div style={{ width: "100%" }} className="nav-container">
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
