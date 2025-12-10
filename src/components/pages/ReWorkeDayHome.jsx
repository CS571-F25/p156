import React, { memo } from "react"
import { useEffect } from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";

import landingimg from '../../assets/landing-img-2.jpeg';
import handshake from '../../assets/handshake.png'
import ReWorkeDayButton from "../structural/ReWorkeDayButton";
import ReWorkeDayCarousel from "../structural/ReWorkeDayCarousel";

function ReWorkeDayHome () {
    
    useEffect(() => {
        document.title = "ReWorkeDay";
    }, []);

    return (
        <Container 
            fluid 
            className="d-flex flex-column justify-content-center align-items-center min-vh-100" >

            <ReWorkeDayCarousel />

            {/* <ShinyText t="Applying, Reimagined"/> */}
            <h1 className="text-center py-3">Applying, Reimagined</h1>
            <h2 className="text-center pb-3">Say goodbye to repetitive and unnecessary friction.</h2>

            <ReWorkeDayButton label="See our templates" icon="bi bi-arrow-right"/>
            
            <Container className="py-5">

                <h3 className="text-center">Looking to hire? Exploring the job market? We got you.</h3>
                <Row className="w-100 justify-content-center">
                    <Col xs={12} md={4} className="d-flex justify-content-center mb-3">
                        <Card>
                            <Card.Body className="text-center">
                                <Image fluid src={landingimg} />
                                <Card.Title>Craft elegant and simple postings</Card.Title>
                                <Card.Text>HR, let us take care of the user's first look at your company. We carefully plan out every application template to professionally exhibit your comittment to orderly work and efficient processes.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} md={4} className="d-flex justify-content-center mb-3">
                        <Card>
                            <Card.Body className="text-center">
                                <Image fluid src={landingimg} />
                                <Card.Title>Apply without confusion</Card.Title>
                                <Card.Text>Applicants, you really shouldn't have to pull your hair out over application questions, no more being asked for the 5th time if you are a student, or being told to not fill out a field that is marked as required.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className="justify-content-center py-5">
                <Row className="justify-content-center align-items-center">
                    
                    {/* Text section */}
                    <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
                        <Card className="w-100">
                            <Card.Body>
                                <Card.Title>The bottom line</Card.Title>
                                <Card.Text>
                                    Jobs are difficult for everyone, and there are pitfalls in many of the processes and software we all use in relation to current and future jobs. We want to serve hiring teams that need talent, and provide a simple experience that will promote more submitted applications because there were no confusing stops.
                                </Card.Text>
                                <Card.Text>
                                    On the other side of the same coin, being in the search for any sort of professional work is exhausting, finding a position that does pique your interest can suddenly become moot if you are constantly being thrown red text because little effort was placed in other tools to prevent simple field mismatching.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>If you think about it, we're also free!</Card.Footer>
                        </Card>
                    </Col>

                    {/* Image section */}
                    <Col xs={12} md={6} className="d-flex justify-content-center align-items-center mb-3">
                        <div style={{width: "100%", maxWidth: "24rem"}}>
                            <Image src={handshake} fluid style={{borderRadius: "0.6767rem"}}/>
                        </div>
                    </Col>

                </Row>
            </Container>
        </Container>

    );
    
}

export default memo(ReWorkeDayHome);
