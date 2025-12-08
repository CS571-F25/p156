import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';
import PendingApplication from '../../structural/PendingApplication';
import Constants from '../../../Constants';

import { useUser } from "../../contexts/SignedInStatus";

export default function RecruitmentHome() {
    const items = Array.from({ length: 15 });
    const { user, setUser } = useUser();

    return (
        // might change just to flex-grow-1
        <>
        {
        user.role == Constants.Roles.Recruiter ?
        <>
            <Button className="d-flex justify-content-center align-items-center" as={Link} to="/recruitment/create" variant="primary">Create Posting</Button>
            <Container className='d-flex flex-grow-1 justify-content-center'>
                <Row>
                    {items.map((_, index) => (
                        <Col xs={12} sm={12} md={6} lg={3} xl={4} className='p-2'>
                            <PendingApplication key={index} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </> :
        <>
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Oops</Card.Title>
                        <Card.Text>This page is only for recruiters, Please try logging in <Link to="/login">here</Link></Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
        }
        </>
    )
}
