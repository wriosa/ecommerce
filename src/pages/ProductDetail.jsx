import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createCartThunk } from "../store/slices/cart.slice";
import { getProductThunk } from "../store/slices/products.eslice";
import "./css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductThunk());
  }, []);

  const productsList = useSelector((state) => state.products);
  const productsFound = productsList.find(
    (productItem) => productItem.id === Number(id)
  );
  const relatedProducts = productsList.filter(
    (productItem) =>
      productItem.category.id === productsFound.category.id &&
      productItem.id !== productsFound.id
  );

  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  console.log(relatedProducts);
  const [quantity, setQuantity] = useState("");
  const addToCart = () => {
    const product = {
      id: productsFound.id,
      quantity: counter,
    };
    console.log(product)
    dispatch(createCartThunk(product))
  };
  return (
    <Container>
      <Row>
        <Col sm={6}>
          {/* Carrusel de imagenes */}
          <Carousel className="d-block w-100 sm={6}" variant="dark">
            {productsFound?.productImgs.map((images) => (
              <Carousel.Item key={images}>
                <img
                  className="d-block w-100 img-fluid"
                  src={images}
                  alt={images.title}
                  style={{ height: 400, objectFit: "contain" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <Col sm>
          <div className="containerInfDetail two">
            <h2>{productsFound?.title}</h2>
            <p>{productsFound?.description}</p>
            <br />
            Price: <br />
            <h2 className="display-7">
              {" "}
              <strong>${productsFound?.price}</strong>{" "}
            </h2>
            <button className="btn btn-primary" onClick={incrementCounter}>
              +
            </button>{" "}
            <input style={{width: "40px", textAlign: "center"}}
              type="number"
              value={counter}
              onChange={(e) => setQuantity(e.target.value)}
            />{" "}
            <button style={{marginRight: "50px"}}className="btn btn-primary" onClick={decrementCounter}>
              -
            </button>
            <Button onClick={addToCart}>Add to cart</Button>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        {/* <div className="three sm={12}"> */}
        <hr className="my-12" />
        <h2>Related Products: </h2>
        <Row xs={1} md={3} lg={5} className="g-4">
          {relatedProducts.map((productItem) => (
            <Col key={productItem.id} lg={4}>
              <Card
                style={{ background: "white", height: "100%" }}
                className="grow"
              >
                {/* <Card> */}
                <Link
                  to={`/product/${productItem.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card.Img
                    variant="top"
                    src={productItem.productImgs[0]}
                    style={{ height: "185px", objectFit: "contain" }}
                    className="my-4"
                  />
                  <Card.Body>
                    <Card.Title>{productItem.title}</Card.Title>
                    <Card.Text>
                      <span>Price:</span>
                      <br />
                      <span style={{ marginLeft: "10px" }}>
                        <b>${productItem.price}</b>
                      </span>
                    </Card.Text>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button
                        variant="danger"
                        style={{
                          position: "absolute",
                          bottom: "12px",
                        }}
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Link>
                {/* <Link
                  to={`/product/${productItem.id}`}
                  style={{
                    textDecoration: "none",
                    height: 350,
                    objectFit: "contain", backgroundColor: "#fff"
                  }}
                >
                  <Card.Img
                    varian="top"
                    src={productItem?.productImgs[0]}
                    alt={productItem?.productImgs[0].name}
                    style={{
                      height: 200,
                      objectFit: "contain",
                      backgroundColor: "#fff",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      <h3>{productItem?.title}</h3>{" "}
                    </Card.Title>
                    <Card.Text>
                      <span>Price:</span>
                      <br />
                      <span>
                        <b>${productItem.price}</b>
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Link> */}
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
    </Container>
  );
};

export default ProductDetail;
