import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';

import { useUser } from '../contexts/SignedInStatus'

export default function ReWorkeDayLogout() {

    const { user, setUser } = useUser();
    const [n, setN] = useState("");
    
    useEffect(() => {
        setN(user.name);
        setUser({
            uid: "",
            name: "",
            role: "",
            photo: "",
        })
    }, []);

    return <Container>
        <p>{n ? n : "Hey"}, you have been logged out</p>
        <p>Didn't mean that? <Link as={Link} to="/login">Log in again</Link></p>    
    </Container>
}
