import { useEffect, useState } from "react";
import { Card, Dropdown, Container } from "react-bootstrap";
import { Link } from 'react-router';
import Constants from "../../Constants";



export default function GettingStarted() {
    useEffect(() => {
        document.title = "ReWorkeDay | Getting Started";
    }, []);

    const [selectedRole, setSelectedRole] = useState("");

    const handleRoleChange = (key) => {
        setSelectedRole(key)
    }
    
    return (
        <Container className="my-5">
            <Card className="d-flex justify-content-center align-items-center">
                <Card.Body>
                <Card.Title><h1>Getting started with ReWorkeDay</h1></Card.Title>
                    <div className="d-flex align-items-center gap-2 mb-3 justify-content-center">
                        <span className="fw-semibold display-6">I am...</span>
                            <Dropdown onSelect={handleRoleChange}>
                                <Dropdown.Toggle style={{minWidth: "10rem"}} variant="primary">
                                    { selectedRole==="1" ? "an Applicant seeking a job" : "" }
                                    { selectedRole==="2" ? "a Recruiter, HR, Manager looking for talent" : "" }
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey={Constants.Roles.Applicant}>an Applicant seeking a job</Dropdown.Item>
                                    <Dropdown.Item eventKey={Constants.Roles.Recruiter}>a Recruiter, HR, Manager looking for talent</Dropdown.Item>                            
                                </Dropdown.Menu>
                            </Dropdown>
                    </div>
                    {
                        selectedRole==="1" ?
                        <Container>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Breathe easy</Card.Title>
                                    <Card.Text>Here on ReWorkeDay all you need to do is bring yourself! We have ensured the templates used by prospective companies are not confusing and speed up your time to getting the application through the door</Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                        :
                        <></>
                    }
                    {
                        selectedRole==="2" ?
                        <Container>
                            <Card>
                                <Card.Body>
                                    <Card.Title>4 clicks. Really</Card.Title>
                                    <Card.Text>Simply <Link to="/register?role=2">create your account</Link>, create a new posting, select the template and publish! Both sides of job searching in todays era is time consuming, having clear and readable forms while also managing so many active postings </Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                        :
                        <></>
                    }                    
                </Card.Body>
            </Card>
        </Container>
    )
}
