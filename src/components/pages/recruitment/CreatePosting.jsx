import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';
import Posting from '../../structural/Posting';
import { useUser } from "../../contexts/SignedInStatus";
import Constants from '../../../Constants';




export default function CreatePosting() {
    const { user, setUser } = useUser();


    useEffect(() => {
        document.title = "ReWorkeDay | Create Posting";
    }, []);


    return (
        <>
        {
        user.role == Constants.Roles.Recruiter ?
            <div>
                <h1>Create Posting</h1>
                <Posting/>

            </div>
            :
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
