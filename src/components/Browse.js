import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/views.css";
import ReactLoading from "react-loading";
import { Button, Row, Col, Card } from "react-bootstrap";
import {domainName} from "../functions/portVariable.js"

export default function Browse(props) {
  const [productsData, setProductsData] = useState(null); //intitalize the state of product data

  useEffect(() => {
    //send a "GET" request to the backend to get the product data of all sellers, and set productsData state array.
    axios
      .get(
        `${domainName}/api/productlist`
      )
      .then((docs) => {
        //console.log(docs.data);
        setProductsData(docs.data);
      });
  }, []);

  function addToCart(sellerName, sellerUid, product) {
    //add item to cart, it sends a "PUT" request to the backend to update the cart data for the user as per his/her uid
    //also change the display of buttons to a checkmark when one of those items is added to cart for 500ms and change back to the previous icon as seen in the Timeout function
    document.getElementById(product.id).innerHTML =
      '<img src="/img/check.svg" width="20" height="20" alt="cart-icon" style="filter:invert(1)"/>';
    document.getElementById(product.id).style.backgroundColor = "green";
    document.getElementById(product.id).disabled = true;
    //console.log(sellerName, product, props.userData.uid);
    axios({
      method: "put",
      url: `${domainName}/api/addtocart`,
      data: {
        sellerName: sellerName,
        sellerUid: sellerUid,
        product: product,
        uid: props.userData.uid,
      },
      headers: { "content-type": "application/json" },
    }).then((docs) => {
      console.log(`Added ${product.name} to cart`, docs.data.cart.length);
      props.sendCartQty(docs.data.cart.length + 1);
    });
    setTimeout(() => {
      document.getElementById(product.id).innerHTML =
        '<img src="/img/cart-icon.svg" width="20" height="20" alt="cart-icon" style="filter:invert(1)"/>';
      document.getElementById(product.id).style.backgroundColor = "";
      document.getElementById(product.id).disabled = false;
    }, 500);
  }

  return (
    <div className="container">
      <h1>Products:</h1> <hr />
      {productsData === null ? (
        <ReactLoading type="bubbles" color="darkblue" className="loading" />
      ) : productsData.length === 0 ? (
        <p>No products currently on sale. Please check back later.</p>
      ) : (
        productsData.map((item) => {
          return (
            <Row key={item.uid} className="product-container">
              <h5 style={{ marginBottom: "20px" }}>
                Seller: {item.fname + " " + item.lname}
              </h5>
              {item.products.map((product) => {
                return (
                  <Col md={6} lg={3} key={product.id}>
                    <Card
                      style={{
                        width: "15rem",
                        height: "24rem",
                        textAlign: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={product.productPicUrl}
                        style={{ width: "auto", height: "9rem" }}
                      />
                      <Card.Body>
                        <Card.Title style={{ height: "3rem" }}>
                          {product.name}
                        </Card.Title>
                        <Card.Text style={{ fontSize: "large" }}>
                          ₹{product.price}/Kg
                        </Card.Text>
                        <Card.Text style={{ height: "3rem" }}>
                          {product.description}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <Button
                          variant="primary"
                          onClick={() =>
                            addToCart(
                              item.fname + " " + item.lname,
                              item.uid,
                              product
                            )
                          }
                          id={product.id}
                          style={{
                            backgroundColor: "darkblue",
                            border: "none",
                          }}
                        >
                          <img
                            src="/img/cart-icon.svg"
                            width={20}
                            height={20}
                            alt="cart-icon"
                            style={{ filter: "invert(1)" }}
                          />
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          );
        })
      )}
    </div>
  );
}
