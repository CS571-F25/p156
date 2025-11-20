import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from 'react-router';

import Role from "../structural/Role";



export default function OpenRoles() {

    useEffect(() => {
        document.title = "ReWorkeDay | Open Roles";
    }, []);
    
  const roles = [
    { title: "Software Engineer", posted: "2025-01-01", type: "Full Time" },
    { title: "Marketing Intern", posted: "2025-01-10", type: "Internship" },
    { title: "Data Analyst (Contract)", posted: "2025-01-15", type: "Contract" },
    { title: "Team Lead", posted: "2025-01-02", type: "Full Time" },
    { title: "Kitchen Manager", posted: "2025-08-15", type: "Part Time" },
  ];

  return (
    <Container className="py-4">
      <Row>
        {roles.map((role, index) => (
          <Role
            key={index}
            title={role.title}
            posted={role.posted}
            type={role.type}
          />
        ))}
      </Row>
    </Container>
  );
}
