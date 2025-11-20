import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';


export default function ReWorkeDayLogout() {
    return <Container>
        <p>You have been logged out</p>
        <p>Didn't mean that? <Link as={Link} to="/login">Log in again</Link></p>    
    </Container>
}
