import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Orders from "./Orders";
import MyProducts from "./MyProducts";
import About from "./About";
import SellerSideBar from "./SellerSideBar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function SellerDashboard(props) {
  const [view, setView] = useState("Profile"); //initialize the view of the page, defaulted to "profile"
  const [show, setShow] = useState(false);

  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const storage = getStorage();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // set profile picture img src attribute by getting the URL from firebase storage
    console.log("useffect run for profile pic");
    getDownloadURL(ref(storage, `profile-pics/${props.userData.uid}`))
      .then((url) => {
        setProfilePicUrl(url);
      })
      .catch((error) => {
        console.log(error);
        setProfilePicUrl("/img/blank_profile.jpg");
      });
  }, [props.userData.uid, storage]);

  function selectView(e) {
    //setting view of the dashboard as per user selection
    console.log(e.target.innerHTML);
    setView(e.target.innerHTML);
  }

  function showSideBar() {
    handleShow();
  }

  return (
    <div>
      <NavBar showSideBar={showSideBar} />
      <div>
        <SellerSideBar
          userData={props.userData}
          view={view}
          selectView={selectView}
          handleClose={() => {}}
          profilePicUrl={profilePicUrl}
          sideBarResponsive={"sidebar"}
        />
        <div className="main-screen">
          {view === "Profile" && <Profile userData={props.userData} />}
          {view === "Orders" && <Orders userData={props.userData} />}
          {view === "My Products" && <MyProducts userData={props.userData} />}
          {view === "About" && <About />}
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} style={{ width: "70%" }}>
        <SellerSideBar
          userData={props.userData}
          view={view}
          selectView={selectView}
          handleClose={handleClose}
          profilePicUrl={profilePicUrl}
          sideBarResponsive={"sidebar-responsive"}
        />
      </Offcanvas>
    </div>
  );
}
