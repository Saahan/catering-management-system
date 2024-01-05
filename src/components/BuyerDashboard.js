import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Browse from "./Browse";
import Cart from "./Cart";
import About from "./About";
import MyOrders from "./MyOrders";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import BuyerSideBar from "./BuyerSideBar";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function SellerDashboard(props) {
  const storage = getStorage();
  const [view, setView] = useState("Profile");
  const [cartQty, setCartQty] = useState(props.userData.cart.length); //initialize cart quantity data, to display alongside the cart selection button on the sidebar
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
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
    console.log(e);
    setView(e);
  }

  function sendCartQty(e) {
    //set cart quantity whenever an item is deleted or added in the child components "Browse.js" and "Cart.js", this data comes from those children
    console.log("cart quantity to be updated", e);
    setCartQty(e);
  }

  function showSideBar() {
    handleShow();
  }

  return (
    <div>
      <NavBar showSideBar={showSideBar} />
      <div>
        <BuyerSideBar
          selectView={selectView}
          view={view}
          cartQty={cartQty}
          userData={props.userData}
          handleClose={() => {}}
          profilePicUrl={profilePicUrl}
          sideBarResponsive={"sidebar"}
        />
        <div className="main-screen">
          {view === "Profile" && <Profile userData={props.userData} />}
          {view === "Browse" && (
            <Browse userData={props.userData} sendCartQty={sendCartQty} />
          )}
          {view === "Cart" && (
            <Cart userData={props.userData} sendCartQty={sendCartQty} />
          )}
          {view === "My Orders" && <MyOrders userData={props.userData} />}
          {view === "About" && <About />}
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} style={{ width: "70%" }}>
        <BuyerSideBar
          userData={props.userData}
          view={view}
          cartQty={cartQty}
          selectView={selectView}
          handleClose={handleClose}
          profilePicUrl={profilePicUrl}
          sideBarResponsive={"sidebar-responsive"}
        />
      </Offcanvas>
    </div>
  );
}
