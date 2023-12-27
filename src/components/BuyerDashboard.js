import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Browse from "./Browse";
import Cart from "./Cart";
import About from "./About";
import MyOrders from "./MyOrders";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function SellerDashboard(props) {
  const storage = getStorage();
  const [view, setView] = useState("Profile");

  useEffect(() => {
    console.log("useffect run");
    getDownloadURL(ref(storage, `profile-pics/${props.userData.uid}`))
      .then((url) => {
        const img = document.getElementById("profile-pic");
        img.setAttribute("src", url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.userData.uid, storage]);

  function selectView(e) {
    console.log(e.target.innerHTML);
    setView(e.target.innerHTML);
  }

  return (
    <div>
      <NavBar />
      <div>
        <div className="sidebar">
          <div className="text-center" style={{ marginTop: "30px" }}>
            <img
              alt="profile-pic"
              id="profile-pic"
              width={100}
              height={100}
              style={{ borderRadius: "100px" }}
            ></img>
          </div>
          <div className="user-welcome">
            Welcome, <br />
            {props.userData.fname}
          </div>
          <hr />
          <div
            className={view === "Profile" ? "active" : undefined}
            onClick={selectView}
          >
            Profile
          </div>
          <div
            className={view === "Browse" ? "active" : undefined}
            onClick={selectView}
          >
            Browse
          </div>
          <div
            className={view === "Cart" ? "active" : undefined}
            onClick={selectView}
          >
            Cart
          </div>
          <div
            className={view === "My Orders" ? "active" : undefined}
            onClick={selectView}
          >
            My Orders
          </div>
          <div
            className={view === "About" ? "active" : undefined}
            onClick={selectView}
          >
            About
          </div>
        </div>
        <div className="main-screen">
          {view === "Profile" && <Profile userData={props.userData} />}
          {view === "Browse" && <Browse userData={props.userData} />}
          {view === "Cart" && <Cart userData={props.userData} />}
          {view === "My Orders" && <MyOrders userData={props.userData} />}
          {view === "About" && <About />}
        </div>
      </div>
    </div>
  );
}
