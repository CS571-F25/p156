import React from "react";
import { Card, Col, Button, Modal, Container, Form } from "react-bootstrap";
import { useState } from "react"
import Constants from "../../Constants";
import Markdown from "react-markdown";

export default function Role(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const formatted = props.postingDetails[0].posted.toDate().toLocaleDateString("en-US", {
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
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
                <Modal.Header closeButton>
                <Modal.Title>Your Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {
                            props.postingDetails.map((d, i) => {
                                return <Container key={i}>
                                    <h1>{d.position}</h1>
                                    <p><em>{getEmployeeType(d.empType)} Position</em></p>
                                    <p>Location(s): {d.locations}</p>
                                    <Markdown>{d.summary}</Markdown>
                                    {d.minQ ? <><span className="fw-bold">Minimum Qualifications:</span><Markdown>{d.minQ}</Markdown></> : <></>}
                                    {d.prefQ ? <><span className="fw-bold">Preferred Qualifications:</span><Markdown>{d.prefQ}</Markdown></> : <></>}
                                </Container>
                            })
                        }
                    </Container>
                    <hr className="border-2 border-top border-primary" />

                    <Form>
                        {props.applicationFields.map((f, i) => {
                            if (f.input === "checkbox") {
                                return (
                                    <Form.Group className="mb-5" key={i}>
                                        <div className="d-flex align-items-center mb-2">
                                            <Form.Label className="me-3">{f.label}</Form.Label>
                                            <Form.Check className="mb-2" type="checkbox"/>
                                        </div>
                                    </Form.Group>
                                );
                            } else {
                                return (
                                    <Form.Group className="mb-5" key={i}>
                                        <Form.Label>{f.label}{f.required ? <span className="text-danger"> *</span> : <></>}</Form.Label>
                                        {f.input==="textarea" ? <Form.Control className="mb-3" as={f.input} required={f.required}/> : <Form.Control className="mb-3" type={f.input} required={f.required}/>}
                                    </Form.Group>
                                );
                            }
                        })}
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Submit!
                </Button>
                </Modal.Footer>
            </Modal>
            <Card>
                <Card.Body>
                    <Card.Title>{props.postingDetails[0].position}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Posted: {formatted}
                    </Card.Subtitle>
                    <Card.Text>
                        Position Type: <strong>{getEmployeeType(props.postingDetails[0].empType)}</strong>
                    </Card.Text>
                    
                    <Button variant="success" onClick={handleShow}>Apply!</Button>
                </Card.Body>
            </Card>
        </>
  );
}