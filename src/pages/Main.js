import React, { useState } from "react";
import { app } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

export default function Main() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");

  function handleSignIn(e) {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => setErrorText(err.code));
  }

  return (
    <div className="main-container">
      <div>
        <div className="text-center">
          <h2 style={{ marginBottom: "20px" }}>Login</h2>
          <form onSubmit={handleSignIn}>
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
            <FloatingLabel
              controlId="floatingInput"
              label="Password"
              className="mb-3"
            >
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="form-control"
                required
              ></input>
            </FloatingLabel>

            <div className="text-center">
              <button type="submit" className="button">
                Login
              </button>
            </div>
          </form>
          <button
            className="button-signup"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Don't have an account?
          </button>{" "}
          <br />
          <button
            className="button-signup"
            onClick={() => {
              navigate("/forgotpassword");
            }}
          >
            Forgot password?
          </button>
        </div>
        <span style={{ color: "red" }}>{errorText}</span>
      </div>
    </div>
  );
}
