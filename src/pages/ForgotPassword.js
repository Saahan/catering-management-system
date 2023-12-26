import React, { useState } from "react";
import "../styles/main.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const auth = getAuth(app);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let email = e.target[0].value;
    document.getElementById("pw-reset-form").reset();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setMessage(
          "Password reset email sent! Please check your email and follow instructions."
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="main-container">
      <div className="text-center">
        <h2 style={{ marginBottom: "20px" }}>Enter Registered Email</h2>
        <form onSubmit={handleSubmit} id="pw-reset-form">
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <input
              type="email"
              id="email"
              placeholder="abc@example.com"
              className="form-control"
              required
            ></input>
          </FloatingLabel>
          <div className="text-center">
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </form>
        <button
          className="button-signup"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back
        </button>
        <br />
        <p style={{ color: "green" }}>{message}</p>
      </div>
    </div>
  );
}