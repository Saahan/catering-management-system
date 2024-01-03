import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/views.css";
import ReactLoading from "react-loading";
import { Button, Card, Col, Row } from "react-bootstrap";
const { format } = require("date-fns");

export default function Orders(props) {
  // this component is for the sellers to check what orders they have received from different buyers.
  const [ordersData, setOrdersData] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    //do a "GET" request to the database to get the list of orders, and set the ordersData state array accordingly.
    axios
      .get("https://catering-management-system-api.onrender.com/api/ordersdetails", {
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
  }, [props.userData.uid, reload]);

  function fulfillOrder(orderId, itemId, orderedBy) {
    //when the order is completed on the seller side, he/she can click this button to fulfill the order and let the buyer know about the same. A "PUT" request is sent to the backend where the data for order is tagged as completed.
    console.log(orderId, itemId, orderedBy);
    axios({
      method: "put",
      url: "https://catering-management-system-api.onrender.com/api/fulfillorder",
      data: {
        uid: props.userData.uid,
        orderId: orderId,
        itemId: itemId,
        orderedBy: orderedBy,
      },
      headers: { "content-type": "application/json" },
    });

    refresh();
  }

  function refresh() {
    //this function when called refreshes the orders view to the most updated state by triggering the useEffect hook (one of its dependencies is the reload state, which is set and reset inside this function).
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 500);
  }

  return (
    <div className="container">
      <h1>Orders: </h1> <hr />
      <Row>
        {ordersData === null ? (
          <ReactLoading type="bubbles" color="darkblue" className="loading" />
        ) : ordersData.length === 0 ? (
          <p>No orders...yet.</p>
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
