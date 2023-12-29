import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/views.css";
import ReactLoading from "react-loading";
import { Button, Card, Col, Row } from "react-bootstrap";
const { format } = require("date-fns");

export default function Orders(props) {
  const [ordersData, setOrdersData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ordersdetails", {
        params: {
          user: props.userData.uid,
        },
      })
      .then((res) => {
        console.log("orders useeffect run", res.data);
        setOrdersData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userData.uid]);

  function fulfillOrder(orderId, itemId, orderedBy) {
    console.log(orderId, itemId, orderedBy);
    axios({
      method: "put",
      url: "http://localhost:5000/api/fulfillorder",
      data: {
        uid: props.userData.uid,
        orderId: orderId,
        itemId: itemId,
        orderedBy: orderedBy,
      },
      headers: { "content-type": "application/json" },
    });
  }

  return (
    <div className="container">
      <h1>Orders: </h1> <hr />
      <Row>
        {ordersData === null ? (
          <ReactLoading type="bubbles" color="darkblue" className="loading" />
        ) : (
          ordersData.toReversed().map((item, index) => {
            let date = Date.parse(item.date);
            return (
              <Col md={6} lg={4} key={index}>
                <Card style={{ width: "300px", margin: "30px 0px 40px 0px" }}>
                  <Card.Header>
                    <span style={{ fontSize: "larger" }}>
                      {item.cartItem.name}
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <span>Buyer: {item.orderedByName}</span>
                    <br />
                    <span>Contact: {item.orderedByContact}</span>
                    <br />
                    <span>Order ID: {item.id}</span>
                    <br />
                    <span>Date: {format(date, "dd/MM/yy")}</span>
                    <br />
                    <span>Price: ₹{item.cartItem.price}/Kg</span>{" "}
                  </Card.Body>
                  <Card.Footer>
                    <span>Qty: {item.cartItem.quantity} Kg</span>
                    <span style={{ float: "right" }}>
                      {item.fulfilled === false ? (
                        <Button
                          variant="primary"
                          style={{ backgroundColor: "blue", border: "none" }}
                          onClick={() =>
                            fulfillOrder(
                              item.id,
                              item.cartItem.id,
                              item.orderedBy
                            )
                          }
                        >
                          <img
                            src="/img/3dots.svg"
                            width={20}
                            height={20}
                            alt="3dots-icon"
                            style={{ filter: "invert(1)" }}
                          />
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          style={{ backgroundColor: "green", border: "none" }}
                          disabled
                        >
                          <img
                            src="/img/check.svg"
                            width={20}
                            height={20}
                            alt="check-icon"
                            style={{ filter: "invert(1)" }}
                          />
                        </Button>
                      )}
                    </span>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
}
