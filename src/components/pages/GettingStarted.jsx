import { useEffect, useState } from "react";
import { Card, Dropdown, Container } from "react-bootstrap";
import { Link } from 'react-router';
import Constants from "../../Constants";
import bottomline from '../../assets/bottomline.png';
import applicantgettingstarted from "../../assets/applicantgettingstarted.png"


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
                                <Dropdown.Toggle className={selectedRole==="" ? "ps-5" : "" } variant="primary">
                                {/* <Dropdown.Toggle style={{minWidth: "10rem"}} variant="primary"> */}
                                    { selectedRole==="" ? <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> : ""}
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
                                    <Card.Img variant="top" src={applicantgettingstarted} alt="a cartoon picture of multiple people standing and smiling at each other doing different things from typing, drinking coffee and talking to on another with a background showing low-fidelty job application sketches and clouds"/>
                                    <Card.Title><h2>Breathe easy</h2></Card.Title>
                                    <Card.Text>Here on ReWorkeDay all you need to do is bring yourself! We have ensured the templates used by prospective companies are not confusing and speed up your time to getting the application through the door. Our easy on the eyes design makes applying to your next dream job as easy as ever. Did we mention you won't be seeing useless repeated fields also? Yay!</Card.Text>
                                    <Card.Text>Find all the positions companies are seeking to be filled <Link to="/openroles">here</Link>, maybe try something new since you'll be done in a breeze?</Card.Text>
                                    <Card.Text>Don't be left confused anymore with how your application is standing, we have clear meanings to all statuses and give you everything to follow up.</Card.Text>
                                    <Card.Text>Well, what are you waiting for? <Link to="/register?role=1">Create your account</Link> now!</Card.Text>
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
                                    <Card.Img variant="top" src={bottomline} alt="a man looking at a computer monitor wiht an overlay showing multiple recieved job applications with images, while another man on the side is holding a tablet looking pleased with their completed job application."/>
                                    <Card.Title><h2>4 clicks. Really</h2></Card.Title>
                                    <Card.Text>Simply <Link to="/register?role=2">create your account</Link>, create a new posting, select the template and publish! Both sides of job searching in todays era is time consuming, having clear and readable forms while also managing so many active postings needs to be simple and fast.</Card.Text>
                                    <Card.Text>Your postings are completely customizable! Don't want to ask for the name first? No problem! Just move it down, or remove it! (Interesting choice, but we're here for it!). Oh, and don't think we forgot you computer-savvy recruiters, feel free to typeset to your heart's content as we have Markdown support thanks to <Link to="https://remarkjs.github.io/react-markdown/" target="_blank" rel="noopener noreferrer">react-markdown</Link>!</Card.Text>
                                    <Card.Text>Let us take care of the hard part, our <em><tt>Application Builder</tt></em> intuitively gives you the fields you want, and hides what you do not need. We hope to continue serving your need to evolve your talent and reduce your application attrition!</Card.Text>
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
