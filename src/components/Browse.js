import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/views.css";
import ReactLoading from "react-loading";
import { Button, Row, Col, Card } from "react-bootstrap";

export default function Browse(props) {
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/productlist").then((docs) => {
      console.log(docs.data);
      setProductsData(docs.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Products:</h1> <hr />
      {productsData !== null ? (
        productsData.map((item) => {
          return (
            <Row key={item.uid}>
              {item.products.map((product) => {
                return (
                  <Col md={6} lg={4} key={product.id}>
                    <Card style={{ width: "15rem" }}>
                      <Card.Img
                        variant="top"
                        src={product.productPicUrl}
                        width={286}
                        height={180}
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>₹{product.price}</Card.Text>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>
                          Seller: {item.fname + " " + item.lname}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <Button variant="primary">Add to Cart</Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          );
        })
      ) : (
        <ReactLoading type="bubbles" color="darkblue" className="loading" />
      )}
    </div>
  );
}
