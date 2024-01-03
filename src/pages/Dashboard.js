import React from "react";
import "../styles/dashboard.css";
import BuyerDashboard from "../components/BuyerDashboard";
import SellerDashboard from "../components/SellerDashboard";
import ReactLoading from "react-loading";

export default function Dashboard(props) {
  //set the dashboard view as per user priveleged, i.e. buyer or seller.

  switch (props.privileges) {
    case "Buyer":
      return <BuyerDashboard userData={props.userData} />;

    case "Seller":
      return <SellerDashboard userData={props.userData}/>;

    default:
      return (
        <ReactLoading type="bubbles" color="darkblue" className="loading" />
      );
  }
}
