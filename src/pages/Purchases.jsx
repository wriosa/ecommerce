import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    
    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases)
   
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])
    return (
        <div>
            <Container style={{ maxWidth: "790px" }}>
                <h1>My Purchases</h1>
                {/* <ul>
                {
                    purchases.map(purchase => (

                        <li key={purchase.id}>
                            <div>{purchase.createdAt}</div>
                            {purchase.cart.products.map(product => (
                                <Link to={`/product/${product.id}`} key={product.id}>
                                    <li style={{ display: "flex", justifyContent: "space-evenly" }}>
                                        <div style={{ width: "40%" }}>{product.title}</div>
                                        <div className='productsInCart'>{product.productsInCart.quantity}</div>
                                        <div>{product.price}</div>
                                    </li>
                                </Link>

                            ))}
                        </li>

                    ))
                }
            </ul> */}

                {purchases.map(purchase => (
                    <Card style={{ background: "#dee2e6", marginBottom: "20px", color: "black" }} key={purchase.id}>
                        <Card.Header >{new Date(purchase.createdAt).toLocaleDateString(undefined, options)}</Card.Header>
                        {purchase.cart.products.map(product => (
                            <Card.Body>
                                {/* <Card.Title>{product.title}</Card.Title> */}
                                <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: "none" }}>
                                    <Card.Text style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div style={{ width: "40%" }}>{product.title}</div>
                                        <div>{product.productsInCart.quantity}</div>
                                        <div style={{ width: "17%" }}>${product.price}</div>
                                    </Card.Text>
                                </Link>
                            </Card.Body>
                        ))}
                    </Card>

                ))
                }
            </Container>
        </div>
    );
};

export default Purchases;