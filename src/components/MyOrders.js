import React, { useEffect, useState } from "react";
import "../styles/views.css";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import ReactLoading from "react-loading";

const { format } = require("date-fns");

export default function MyOrders(props) {
  const [myOrdersData, setMyOrdersData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/myordersdetails", {
        params: {
          user: props.userData.uid,
        },
      })
      .then((res) => {
        setMyOrdersData(res.data);
        console.log(res.data);
      });
  }, [props.userData.uid]);

  function imgUrlAlt(e) {
    console.log(e);
    e.target.src = "/img/blank_food.jpg";
    e.target.onError = null;
  }

  return (
    <div className="container">
      <h1>My Orders:</h1> <hr />
      {myOrdersData === null ? (
        <ReactLoading type="bubbles" color="darkblue" className="loading" />
      ) : myOrdersData.length === 0 ? (
        <p>No orders...yet.</p>
      ) : (
        myOrdersData.toReversed().map((order, index) => {
          let date = Date.parse(order.date);
          return (
            <Row key={index}>
              <h5>
                Order "{order.id}" ordered on {format(date, "dd/MM/yy")}
              </h5>
              {order.cartData.toReversed().map((product, index2) => {
                return (
                  <Col key={index2} md={6} lg={4}>
                    <Card
                      style={{
                        width: "300px",
                        margin: "30px 0px 40px 0px",
                        height: "400px",
                      }}
                    >
                      <Card.Header>{product.name}</Card.Header>
                      <img
                        src={product.productPicUrl}
                        height={200}
                        onError={imgUrlAlt}
                        style={{ borderRadius: "0px" }}
                        alt="product no longer listed"
                      />
                      <Card.Body>
                        <span>Qty: {product.quantity} Kg</span> <br />
                        <span>
                          Total Cost: ₹{product.quantity * product.price} @ ₹
                          {product.price}/Kg{" "}
                        </span>{" "}
                        <br />
                        <span>Seller: {product.sellerName}</span> <br />
                        <span>
                          {product.fulfilled && (
                            <p
                              style={{
                                color: "green",
                                marginTop: "10px",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              Order completed!
                            </p>
                          )}
                        </span>
                      </Card.Body>
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
