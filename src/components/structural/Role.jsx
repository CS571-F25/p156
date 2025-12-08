import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';

export default function Role(props) {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.positionName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Posted: {props.posted}
                </Card.Subtitle>
                <Card.Text>
                    Position Type: <strong>{props.empType}</strong>
                </Card.Text>
                
                <Button variant="success" onClick={() => alert("i should apply to this position!")}>Apply!</Button>
            </Card.Body>
        </Card>
  );
}