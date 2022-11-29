import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterNameThunk, filterProducThunk, getProductThunk } from '../store/slices/products.eslice';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '../App'

const Home = () => {
    const dispatch = useDispatch();
    const produ = useSelector(state => state.products)
    const [categoryList, setCategoryList] = useState([]);
    const [inputSearch, setInputSearch] = useState("")

    useEffect(() => {
        dispatch(getProductThunk());
        axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
            .then(res => setCategoryList(res.data.data?.categories))
    }, [])
    console.log(categoryList)
    return (
        <div>
            {/* nuevo */}
            <Row>
                <Col lg={3}>
                    <h2>Category</h2>
                    <ListGroup>
                        {categoryList.map(category => (
                            // <Button onClick={() => dispatch(filterProducThunk(category.id))}>{category.name}</Button>
                            <ListGroup.Item key={category.id} variant="success" onClick={() => dispatch(filterProducThunk(category.id))} style={{ cursor: "pointer" }} className="border">{category.name}</ListGroup.Item>
                        ))}
                    </ListGroup>

                </Col>
                <Col lg={9}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search by name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={inputSearch.toUpperCase()}
                            onChange={e => setInputSearch(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={() => dispatch(filterNameThunk(inputSearch))}>
                            Search
                        </Button>
                    </InputGroup>
                    {/* {produ?.map(product => (
                        <li key={product.id}><Link to={`/product/${product.id}`}>{product.title}</Link></li>
                    ))} */}
                    {/* nuevo */}
                    <Row xs={1} md={3} className="g-4">
                        {produ?.map(product => (
                            <Col key={product.id}>
                                <Card style={{ background: "white", height: "100%" }} className="grow">
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                                        <Card.Img variant="top" src={product.productImgs[0]} style={{ height: "185px", objectFit: "contain" }} className='my-4' />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text>
                                                <span>Price:</span>
                                                <br />
                                                <span style={{marginLeft: "10px"}}><b>${product.price}</b></span>
                                            </Card.Text>
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <Button variant="danger" style={{
                                                    position: "absolute",
                                                    bottom: "12px"
                                                }}><i className="fa-solid fa-cart-plus"></i></Button>
                                            </div>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>


        </div>
    );
};

export default Home;