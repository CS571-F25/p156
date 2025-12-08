import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';
import { useUser } from "../../contexts/SignedInStatus";
import Constants from '../../../Constants';



export default function SubmittedApplications() {

    const { user, setUser } = useUser();


    useEffect(() => {
        document.title = "ReWorkeDay | My Submitted Applications";
    }, []);


    return (
        <>
        {
        user.role === Constants.Roles.Applicant ?
            <div>
                <h1>Submitted Applications</h1>

            </div>
            :
            <>
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Oops</Card.Title>
                        <Card.Text>This page is only for applicants, please try logging in <Link to="/login">here</Link></Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            </>
        }
        </>
    )
}
