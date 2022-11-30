import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductDetail from "../pages/ProductDetail";
import { getCartThunk } from "../store/slices/cart.slice";
import "./css/CartSidebars.css";

const CartSidebars = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const cart = useSelector((state) => state.cart);
  return (
    // <div className="minimalist-scrollbar">
    <Offcanvas
      className="minimalist-scrollbar"
      show={show}
      onHide={handleClose}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart of Shopping</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body >
        {cart.map((product) => (
          <div className="cart-products-list" key={product.id}>
            <div className="header-cart">
              {product.brand}{" "}
              <i className="fa-solid fa-trash-can" style={{ color: "red" }}></i>
            </div>
            <span className="spanTitle">{product.title}</span>

            <label className="label" type="text">
              1
            </label>
            <div className="subTotal">Total: 1099</div>
          </div>
        ))}
      </Offcanvas.Body>{" "}
      <div className="total">
        Total: <span className="spanTotal">$9999</span>{" "}
      </div>
      <div className="btn-buy">
        <button
          className="btn btn-primary btn-lg btn-block"
          style={{ width: "100%" }}
        >
          Checkout
        </button>
      </div>
    </Offcanvas>
    // </div>
  );
};

export default CartSidebars;
