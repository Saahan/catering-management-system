import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Button, Card, Modal } from "react-bootstrap";
import "../styles/views.css";

export default function Cart(props) {
  const [cart, setCart] = useState(null); //initialize the state of the cart data array.
  const [reload, setReload] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    //send a "GET" request to the backend database to get the cart details for the buyer as per his/her uid (gotten from props).
    axios
      .get("http://localhost:5000/api/cartdetails", {
        params: {
          user: props.userData.uid,
        },
      })
      .then((res) => {
        console.log("cart useeffect run", res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userData.uid, reload]);

  function handleSubmit(e) {
    //when an order is placed, the quantity of the item is set, and the orderPlaced flag is set, which triggers a "PUT" request in the useEffect hook which sends the data to the backend database.
    e.preventDefault();
    //console.log(e);
    setCart((prevState) => {
      prevState.map((item, index) => {
        return (item.quantity = e.target[index * 2].value);
      });
      return prevState;
    });

    setOrderPlaced(true);

    console.log(cart);
  }

  useEffect(() => {
    cart !== null &&
      axios({
        method: "put",
        url: "http://localhost:5000/api/placeorder",
        data: {
          uid: props.userData.uid,
          orderedByName: props.userData.fname + " " + props.userData.lname,
          orderedByContact: props.userData.phoneNumber,
          cartData: cart,
        },
        headers: { "content-type": "application/json" },
      }).then((docs) => {
        props.sendCartQty(0); //send cart quantity to be updated as "0", as the order has been placed and cart is not empty
        refresh(); //refreh the view of the cart
        handleShow(); //show an alert as order placed to the user via a Modal
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderPlaced]);

  function deleteCartItem(itemId) {
    console.log(itemId);
    //send a "PUT" request to delete an item from the cart, and reduce the cart quantity by 1 in the parent component via props.sendCartQty function.
    axios({
      method: "put",
      url: "http://localhost:5000/api/deletefromcart",
      data: {
        uid: props.userData.uid,
        itemId: itemId,
      },
      headers: { "content-type": "application/json" },
    }).then((docs) => {
      props.sendCartQty(docs.data.cart.length - 1);
      refresh();
    });
  }

  function refresh() {
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 500);
  }

  return (
    <div className="container">
      <h1>Cart:</h1> <hr />
      <p>
        Please verify your items and place order. Order once placed will not be
        cancelled. Please contact seller for further inquiry.{" "}
      </p>
      <div>
        {cart === null ? (
          <ReactLoading type="bubbles" color="darkblue" className="loading" />
        ) : cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {cart.map((item) => {
              return (
                <Card key={item.id} className="cart-card">
                  <Card.Body>
                    <span>{item.name}</span>,{" "}
                    <span>Sold by {item.sellerName}</span> <br />
                    <span style={{ float: "right" }}>
                      ₹{item.price}/Kg
                    </span>{" "}
                  </Card.Body>
                  <Card.Footer>
                    <span>
                      <label htmlFor="quantity">Qty (Kg): </label>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        max="10"
                        step="1"
                        defaultValue={1}
                      ></input>
                    </span>
                    <span style={{ float: "right" }}>
                      <Button
                        variant="primary"
                        style={{ backgroundColor: "maroon", border: "none" }}
                        onClick={() => deleteCartItem(item.id)}
                      >
                        <img
                          src="/img/bin.svg"
                          width={20}
                          height={20}
                          alt="del-icon"
                          style={{ filter: "invert(1)" }}
                        />
                      </Button>
                    </span>
                  </Card.Footer>
                </Card>
              );
            })}
            <Button
              type="submit"
              style={{
                float: "left",
                backgroundColor: "darkblue",
                border: "none",
              }}
            >
              Proceed
            </Button>
          </form>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Order placed!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ backgroundColor: "darkblue", border: "none" }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
