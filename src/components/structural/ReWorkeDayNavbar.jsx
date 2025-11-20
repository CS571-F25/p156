import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';
import reactimg from '../../assets/react.svg'

export default function ReWorkeDayNavbar(props) {
    
    const [loginStatus, setLoginStatus] = useState(JSON.stringify({"isLoggedIn": false}));

    return (
        // https://getbootstrap.com/docs/5.3/utilities/background/
        <Navbar collapseOnSelect expand="sm" className="bg-dark-subtle">
            <Container>
                <Navbar.Brand as={Link} to="/" className="">
                    <img
                        alt="ReWorkeDay Logo"
                        src={reactimg}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    ReWorkeDay
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav>
                    {/* the following line needs to be wrapped in conditional logic */}
                    <Button variant="outline-primary" as={Link} to="/recruitment/home">Recruiter Portal</Button>
                    <Nav.Link as={Link} to="/openroles">Open Roles</Nav.Link>
                    {
                        JSON.parse(loginStatus).isLoggedIn ? 
                        <>
                            <Nav.Link as={Link} to="submitted">My Applications</Nav.Link>
                            <Button variant="outline-danger" as={Link} to="logout">Logout</Button>
                        </>
                        : 
                        <>
                            <Nav.Link as={Link} to="register">Register</Nav.Link>
                            <Button variant="outline-success" as={Link} to="login">Login</Button>
                        </>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
