import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import CartSidebars from './CartSidebars';


const NavBar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token")
        if (token) {
            setShow(true);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Must be in session',
                
              })
              navigate("/login")
        }

    }
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Container>
                    <Navbar.Brand as={Link} to="/">E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "end" }}>

                        <Nav >
                            <Nav.Link as={Link} to="/login"><i className="fa-solid fa-right-to-bracket fa-xl"></i> Login</Nav.Link>
                            <Nav.Link as={Link} to="/purchases"><i className="fa-solid fa-basket-shopping fa-xl"></i> Purchases</Nav.Link>
                            <Nav.Link onClick={handleShow}><i className="fa-solid fa-cart-shopping fa-xl"></i> Cart</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSidebars show={show} handleClose={handleClose} />
        </>
    );
};

export default NavBar;