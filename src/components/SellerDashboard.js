import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Orders from "./Orders";
import MyProducts from "./MyProducts";
import About from "./About";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function SellerDashboard(props) {
  const storage = getStorage();
  const [view, setView] = useState("Profile"); //initialize the view of the page, defaulted to "profile"

  useEffect(() => {
    // set profile picture img src attribute by getting the URL from firebase storage
    console.log("useffect run for profile pic");
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
    //setting view of the dashboard as per user selection
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
            className={view === "Orders" ? "active" : undefined}
            onClick={selectView}
          >
            Orders
          </div>
          <div
            className={view === "My Products" ? "active" : undefined}
            onClick={selectView}
          >
            My Products
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
          {view === "Orders" && <Orders userData={props.userData} />}
          {view === "My Products" && <MyProducts userData={props.userData} />}
          {view === "About" && <About />}
        </div>
      </div>
    </div>
  );
}
