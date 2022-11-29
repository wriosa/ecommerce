import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
            <h1>{counter}</h1>
            <button className="btn btn-primary" onClick={incrementCounter}>
              +
            </button>
            <button className="btn btn-primary" onClick={decrementCounter}>
              -
            </button>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        {/* <div className="three sm={12}"> */}
        <hr className="my-12" /><h2>Related Products: </h2>
        <Row xs={1} md={3} lg={5} className="g-4">
          
          {relatedProducts.map((productItem) => (
            <Col key={productItem.id}>
              <Card>
              <Link to={`/product/${productItem.id}`} style={{textDecoration: "none", height: 330,objectFit: "contain"}}>
                <Card.Img 
                  varian="top"
                  src={productItem?.productImgs[0]}
                  alt={productItem?.productImgs[0].name}
                  style={{ height: 200, objectFit: "contain", backgroundColor: "#fff" }}
                />
                <Card.Body>
                  <Card.Title> <h3>{productItem?.title}</h3> </Card.Title>
                </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
    </Container>
  );
};

export default ProductDetail;
