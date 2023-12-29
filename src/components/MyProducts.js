import React, { useEffect, useState } from "react";
import "../styles/views.css";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import axios from "axios";
import ReactLoading from "react-loading";
import Card from "react-bootstrap/Card";

export default function MyProducts(props) {
  const [show, setShow] = useState(false);
  const [productsArr, setProductsArr] = useState(null);
  const [reload, setReload] = useState(false);
  const storage = getStorage();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/myproducts", {
        params: {
          user: props.userData.uid,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setProductsArr(res.data);
        console.log("useffect run in products");
      });
  }, [props.userData.uid, reload]);

  function refresh() {
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 500);
  }

  function deleteImage(uid, itemId) {
    const desertRef = ref(storage, `/${uid}/${itemId}`);
    deleteObject(desertRef)
      .then(console.log("deleted image for product"))
      .catch((err) => console.log(err));
  }

  function deleteProduct(uid, itemId) {
    //console.log(uid);
    axios({
      method: "put",
      url: "http://localhost:5000/api/deleteproduct",
      data: { uid: uid, itemId: itemId },
      headers: { "content-type": "application/json" },
    }).then(refresh());

    deleteImage(uid, itemId);
  }

  return (
    <div className="container">
      <h1>My Products:</h1> <hr />
      <div style={{ marginBottom: "40px" }}>
        <Button
          variant="primary"
          className="add-product-btn"
          onClick={() => handleShow()}
        >
          New
        </Button>
      </div>
      <div>
        <h4>Products:</h4>
        <hr />
        <Row>
          {productsArr !== null ? (
            productsArr.map((item) => {
              return (
                <Col md={6} lg={3} key={item.id}>
                  <Card
                    style={{
                      width: "15rem",
                      height: "24rem",
                      textAlign: "center",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={item.productPicUrl}
                      style={{ width: "auto", height: "9rem" }}
                    />
                    <Card.Body>
                      <Card.Title style={{ height: "3rem" }}>
                        {item.name}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "large" }}>
                        ₹{item.price}/Kg
                      </Card.Text>
                      <Card.Text style={{ height: "3rem" }}>
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-center">
                      <Button
                        variant="primary"
                        style={{backgroundColor:"maroon", border:"none"}}
                        onClick={() => {
                          deleteProduct(props.userData.uid, item.id);
                        }}
                      >
                        <img
                          src="/img/bin.svg"
                          width={20}
                          height={20}
                          alt="bin-icon"
                          style={{ filter: "invert(1)" }}
                        />
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })
          ) : (
            <ReactLoading type="bubbles" color="darkblue" className="loading" />
          )}
        </Row>
      </div>
      <AddProductModal
        show={show}
        handleClose={handleClose}
        userData={props.userData}
        refresh={refresh}
      />
    </div>
  );
}

function AddProductModal(props) {
  const storage = getStorage();
  const [message, setMessage] = useState("");

  function getUID() {
    // Get the timestamp and convert
    // it into alphanumeric input
    return Date.now().toString(36);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let productPic = e.target[3].files[0];
    let id = getUID();
    const storageRef = ref(storage, `/${props.userData.uid}/${id}`);

    if (productPic && productPic.size < 1024000) {
      document.getElementById("save-button").disabled = true;
      setMessage("Working on it...");

      uploadBytes(storageRef, productPic)
        .then(() => {
          getDownloadURL(ref(storage, `/${props.userData.uid}/${id}`))
            .then((url) => {
              let productData = {
                name: e.target[0].value,
                price: e.target[1].value,
                description: e.target[2].value,
                productPicUrl: url,
                id: id,
                uid: props.userData.uid,
              };

              axios({
                method: "post",
                url: "http://localhost:5000/api/addproduct",
                data: productData,
                headers: { "content-type": "application/json" },
              })
                .then(setMessage(""))
                .then(props.handleClose())
                .finally(props.refresh())
                .catch((err) => console.log("axios err", err));
            })
            .catch((error) => {
              console.log("download URL error", error);
            });
        })
        .catch((error) => console.log("Image upload error", error));
    } else if (productPic === undefined) {
      setMessage("Must include a picture of the product");
    } else {
      setMessage("Please use image under 1MB size");
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <Modal.Body>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            required
            placeholder="Product name"
            id="name"
            maxLength={40}
          ></input>{" "}
          <br />
          <label htmlFor="price">Price (₹/kg):</label>
          <input
            type="text"
            required
            placeholder="Product price ₹/kg"
            id="price"
            maxLength={7}
          ></input>
          <br />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            required
            placeholder="Product description"
            id="description"
            maxLength={50}
          ></input>{" "}
          <br />
          <label htmlFor="product-image">Upload Image:</label>
          <input
            type="file"
            id="product-image"
            accept="image/png, image/jpeg"
          ></input>
          <div className="text-center">
            {message !== "" && <p>{message}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {" "}
          <Button
            variant="secondary"
            onClick={() => {
              setMessage("");
              props.handleClose();
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit" id="save-button">
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
