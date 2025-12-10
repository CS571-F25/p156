import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from 'react-router';

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

    return <Container 
                className="d-flex justify-content-center"
                style={{ paddingTop: "5rem" }}  
            >
        <Card style={{width: "18rem"}}>
            <Card.Body>
                <Card.Title><h1>Success!</h1></Card.Title>
                <Card.Text>{n ? n : "Hey"}, you have been logged out</Card.Text>
            </Card.Body>
            <Card.Footer>Didn't mean that? <Link as={Link} to="/login">Log in again</Link></Card.Footer> 
        </Card>
    </Container>
}
