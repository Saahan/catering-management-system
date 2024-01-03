import React from "react";
import "../styles/dashboard.css";

export default function BuyerSideBar(props) {
  function selectView(e) {
    props.selectView(e);
    props.handleClose();
  }

  return (
    <div className={props.sideBarResponsive}>
      <div className="text-center" style={{ marginTop: "30px" }}>
        <img
          alt="profile-pic"
          id="profile-pic"
          width={100}
          height={100}
          style={{ borderRadius: "100px" }}
          src={props.profilePicUrl}
        ></img>
      </div>
      <div className="user-welcome">
        Welcome, <br />
        {props.userData.fname}
      </div>
      <hr />
      <div
        className={props.view === "Profile" ? "active" : undefined}
        onClick={() => selectView("Profile")}
      >
        Profile
      </div>
      <div
        className={props.view === "Browse" ? "active" : undefined}
        onClick={() => selectView("Browse")}
      >
        Browse
      </div>
      <div
        className={props.view === "Cart" ? "active" : undefined}
        onClick={() => selectView("Cart")}
      >
        Cart {`(${props.cartQty})`}
      </div>
      <div
        className={props.view === "My Orders" ? "active" : undefined}
        onClick={() => selectView("My Orders")}
      >
        My Orders
      </div>
      <div
        className={props.view === "About" ? "active" : undefined}
        onClick={() => selectView("About")}
      >
        About
      </div>
    </div>
  );
}
