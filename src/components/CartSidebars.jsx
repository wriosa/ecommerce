import React, { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetail from '../pages/ProductDetail';
import { getCartThunk } from '../store/slices/cart.slice';

const CartSidebars = ({show,handleClose}) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCartThunk());
    },[]);

    const cart = useSelector(state => state.cart)
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
               {cart.map(product=>(
                <div>{product.title}</div>
               ))}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSidebars;


