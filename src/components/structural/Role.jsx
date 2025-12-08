import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import Constants from "../../Constants";

export default function Role(props) {

    const date = props.posted.toDate()
    const formatted = props.posted.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const getEmployeeType = (v) => {
        if (v === Constants.employeeType.FullTime) {return "Full Time"}
        else if (v === Constants.employeeType.PartTime) {return "Part Time"}
        else if (v === Constants.employeeType.Intern) {return "Internship"}
        else if (v === Constants.employeeType.Contract) {return "Contract"}
        else if (v === Constants.employeeType.Other) {return "Other"}
    }

    return (
        <Card>
            {console.log(props.posted)}
            <Card.Body>
                <Card.Title>{props.position}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Posted: {formatted}
                </Card.Subtitle>
                <Card.Text>
                    Position Type: <strong>{getEmployeeType(props.empType)}</strong>
                </Card.Text>
                
                <Button variant="success" onClick={() => alert("i should apply to this position!")}>Apply!</Button>
            </Card.Body>
        </Card>
  );
}