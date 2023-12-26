import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { app } from "./firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ReactLoading from "react-loading";
import axios from "axios";
import Main from "./pages/Main.js";
import SignUp from "./pages/SignUp.js";
import Dashboard from "./pages/Dashboard.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import AccountCreated from "./pages/AccountCreated.js";
import Protected from "./components/Protected.js";

export default function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [privileges, setPriveleges] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setPriveleges("");
        console.log("app useffect run:", user);
        axios
          .get("http://localhost:5000/api/userdetails", {
            params: {
              user: user.uid,
            },
          })
          .then((res) => {
            console.log(res.data);
            setPriveleges(res.data[0].accountType);
            setUserData(res.data[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setIsAuthenticated(false);
        console.log("app useffect run: no user found");
      }
    });
  }, [auth]);

  return (
    <BrowserRouter>
      {isAuthenticated === null && (
        <ReactLoading type="bubbles" color="darkblue" className="loading" />
      )}
      {isAuthenticated !== null && (
        <Routes>
          <Route index element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/signup-successful"
            element={
              <Protected isAuthenticated={isAuthenticated}>
                <AccountCreated />
              </Protected>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Protected isAuthenticated={isAuthenticated}>
                <Dashboard privileges={privileges} userData={userData} />
              </Protected>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}
