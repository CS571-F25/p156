import React from "react";
import { Card, Col, Button } from "react-bootstrap";

export default function Role({ title, posted, type }) {
  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Posted: {posted}</Card.Subtitle>
          <Card.Text>
            Position Type: <strong>{type}</strong>
          </Card.Text>
          <Button variant="success">Apply!</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}