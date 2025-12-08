import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from 'react-router';

import Role from "../structural/Role";



export default function OpenRoles() {

    useEffect(() => {
        document.title = "ReWorkeDay | Open Roles";
    }, []);

  return (
    <Container className="py-4">
      <Row>
      </Row>
    </Container>
  );
}
