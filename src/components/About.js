import React from "react";
import "../styles/views.css";

export default function About() {
  return (
    <div className="container">
      <h1>About</h1> <hr />
      <img src="/img/field.jpg" className="generic-field" alt="field"></img>
      <p>
        The catering management system connects buyers and sellers of food
        items, including fully cooked dishes as well as raw materials. Products
        are sold in bulk by weight, while the seller takes care of packaging and
        delivery. It is our mission to provide an excellent platform for
        caterers to showcase their products and sell them remotely to clients
        located all around the country. Happy buying and selling!
      </p>
    </div>
  );
}
