import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';


export default function ReWorkeDayFooter() {
    return (
    <Navbar fixed="bottom" className="bg-body-tertiary">
      <Container className="flex-column">
        <div className="d-flex justify-content-between w-100">
            <Navbar.Brand href="#home">ReWorkeDay</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <div className="d-flex justify-content-between w-100">
          <Nav className="me-auto">
            <Link as={Link} to="/about">About this site</Link>
          </Nav>
        </div>
      </Container>
    </Navbar>        
    );
}
