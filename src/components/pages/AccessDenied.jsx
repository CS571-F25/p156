import { Link } from "react-router";
import { Container, Card } from "react-bootstrap"
import { useEffect } from "react";
import Constants from "../../Constants";

function AccessDenied(props) {

    useEffect(() => {
        document.title = "ReWorkeDay | Ruh oh!";
    }, []);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Oops</Card.Title>
                    <Card.Text>This page is only for {props.role === Constants.Roles.Applicant ? "applicants" : "recuiters"}, please try logging in <Link to="/login">here</Link></Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AccessDenied;


