import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import CartSidebars from './CartSidebars';


const NavBar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Container>
                    <Navbar.Brand as={Link} to="/">E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav>
                            <Nav.Link as={Link} to="/login">LogIn</Nav.Link>
                            <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
                            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
           <CartSidebars show={show} handleClose={handleClose}/>
        </>
    );
};

export default NavBar;