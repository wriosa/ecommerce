import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProductDetail from "../pages/ProductDetail";
import { checkoutCar, getCartThunk } from "../store/slices/cart.slice";
import "./css/CartSidebars.css";

const CartSidebars = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const cart = useSelector((state) => state.cart);

  const subTotal= cart.map((product) => ((product.price)*(product.productsInCart.quantity)))
  // console.log(subTotal)
  const total = subTotal.reduce((a, b) => a + b, 0)
  // console.log(total)
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
              {product.productsInCart.quantity}
            </label>
            <div className="subTotal">Total: ${(product.price)*(product.productsInCart.quantity)}</div>
          </div>
        ))}
      </Offcanvas.Body>{" "}
      <div className="total">
        Total: <span className="spanTotal">${total}</span>{" "}
      </div>
      <div className="btn-buy" style={{padding: "12px 20px"}}>
        <button
          className="btn btn-primary btn-lg btn-block"
          style={{ width: "100%" }}
          onClick={()=> dispatch(checkoutCar())}
        >
          Checkout
        </button>
      </div>
    </Offcanvas>
    // </div>
  );
};

export default CartSidebars;
