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
  const [cartQty, setCartQty] = useState(props.userData.cart.length); //initialize cart quantity data, to display alongside the cart selection button on the sidebar

  useEffect(() => {
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
    console.log(e);
    setView(e);
  }

  function sendCartQty(e) {
    //set cart quantity whenever an item is deleted or added in the child components "Browse.js" and "Cart.js", this data comes from those children
    console.log("cart quantity to be updated", e);
    setCartQty(e);
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
            onClick={() => selectView("Profile")}
          >
            Profile
          </div>
          <div
            className={view === "Browse" ? "active" : undefined}
            onClick={() => selectView("Browse")}
          >
            Browse
          </div>
          <div
            className={view === "Cart" ? "active" : undefined}
            onClick={() => selectView("Cart")}
          >
            Cart {`(${cartQty})`}
          </div>
          <div
            className={view === "My Orders" ? "active" : undefined}
            onClick={() => selectView("My Orders")}
          >
            My Orders
          </div>
          <div
            className={view === "About" ? "active" : undefined}
            onClick={() => selectView("About")}
          >
            About
          </div>
        </div>
        <div className="main-screen">
          {view === "Profile" && <Profile userData={props.userData} />}
          {view === "Browse" && (
            <Browse userData={props.userData} sendCartQty={sendCartQty} />
          )}
          {view === "Cart" && <Cart userData={props.userData} sendCartQty={sendCartQty}/>}
          {view === "My Orders" && <MyOrders userData={props.userData} />}
          {view === "About" && <About />}
        </div>
      </div>
    </div>
  );
}
