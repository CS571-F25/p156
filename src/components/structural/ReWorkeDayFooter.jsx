import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';


export default function ReWorkeDayFooter() {
    const linkColor = '#000000'

    return (
      <Navbar>
        <Container className="flex-column">
          <div className="d-flex justify-content-between w-100">
              <Navbar.Brand as={Link} to="/">ReWorkeDay</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <div className="d-flex justify-content-between w-100 py-3 py-md-0">
            <Nav className="me-auto">
              <Container>
                <Row>
                  <Col as={Link} to="/about" xs={12} md={6} style={{color: linkColor, textDecoration: "none" }}>
                    <i className="bi bi-patch-question-fill"/> About
                  </Col>
                  <Col as={Link} to="/recruitment/home" xs={12} md={6} style={{color: linkColor, textDecoration: "none" }}>
                    <i className="bi bi-person-fill-lock"/> Recruiters
                  </Col>
                  <Col as={Link} to="/submitted" xs={12} md={6} style={{color: linkColor, textDecoration: "none" }} >
                    <i className="bi bi-send-plus"/> Applicants
                  </Col>
                  <Col as={Link} to="https://github.com/CS571-F25/p156" xs={12} md={6} style={{color: linkColor, textDecoration: "none" }}>
                    <i className="bi bi-github"/> GitHub
                  </Col>
                </Row>
              </Container>
            </Nav>
          </div>
       <p className="text-muted text-end pt-2">Made with 🧀 in Madison, WI</p>        
        </Container>
      </Navbar>   
    );
}
