import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';
import { useUser } from "../../contexts/SignedInStatus";
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';



export default function ApplicantHome() {
    const { user, setUser } = useUser();


    useEffect(() => {
        document.title = "ReWorkeDay | Applicant Home";
    }, []);


    return (
        <>
        {
        user.role === Constants.Roles.Applicant ?
            <Container>
                <h1 className="display-1 text-center">Applicant Home</h1>
                <Row>
                    <Col>
                        <h2>Your Applications</h2>
                        <p><span className="text-warning">(status)</span> position name</p>
                        <p><span className="text-success">(Offer)</span> Software Engineering Intern - Summer</p>
                        <p><span className="text-muted">(Under Review)</span> Cybersecurity Intern - Summer</p>
                        <p><span className="text-muted">(Under Review)</span> Product Management Intern - Winter</p>
                    </Col>
                    <Col>
                        <h2>What's new:</h2>
                    </Col>
                </Row>

            </Container>
            :
            <AccessDenied role={Constants.Roles.Applicant}/>
        }
        </>
    )
}
