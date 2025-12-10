import React from 'react';
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router';
import logo from '../../assets/logo_og_2.png';
import { useUser } from "../contexts/SignedInStatus";


export default function ReWorkeDayNavbar(props) {
    
    const { user } = useUser();
    // const [loginStatus, setLoginStatus] = useState();

    return (
        // https://getbootstrap.com/docs/5.3/utilities/background/
        <Navbar collapseOnSelect expand="md" bg="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img
                        alt="ReWorkeDay Logo"
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-top me-2"
                    />{' '}
                    ReWorkeDay
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="flex-column flex-md-row">
                    <Nav.Link as={Link} to="/openroles">Open Roles</Nav.Link>
                    {
                        user.role === "1" ?
                        <>
                            <Nav.Link as={Link} className="me-2" to="/applicant/home">Applicant Home</Nav.Link>
                        </> : <></>
                    }

                    {
                        user.role === "2" ? 
                        <>
                            <Button className="me-2" variant="outline-primary" as={Link} to="/recruitment/home">Recruiter Portal</Button>
                        </> : <></>
                    }

                    {
                    user.uid ? (
                        <div className="d-flex flex-column flex-md-row gap-3">
                        <Button variant="outline-danger" as={Link} to="/logout">
                            Log Out
                        </Button>
                        </div>
                    ) : (
                        <div className="d-flex flex-column flex-md-row gap-2">
                        <Nav.Link as={Link} className="mt-3 mt-md-0" to="/register">
                            Register
                        </Nav.Link>
                        <Button variant="outline-primary" as={Link} to="/login">
                            Login
                        </Button>
                        </div>
                    )
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
