import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from 'react-router';



function PendingApplication(props) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Name - Position</Card.Title>
                <Card.Subtitle>Submitted on xxxxxxx</Card.Subtitle>
                <Card.Text>text...</Card.Text>
                
                <Button>View Application</Button>
                <Button variant='success'>Accept</Button>
                <Button variant='danger'>Reject</Button>
            </Card.Body>
        </Card>
    )
}


export default PendingApplication;