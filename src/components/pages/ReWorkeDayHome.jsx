import React, { memo } from "react"
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router';
// import { ShinyText } from '../structural/ShinyText';

import landingimg from '../../assets/landing-img-2.jpeg';

function ReWorkeDayHome () {

    useEffect(() => {
        document.title = "ReWorkeDay";
    }, []);

    return (
        <Container 
            fluid 
            className="d-flex flex-column justify-content-center align-items-center min-vh-100"
        >
            <Image src={landingimg} className="mb-4" />

            {/* <ShinyText t="Applying, Reimagined"/> */}
            <h1 className="text-center mb-5">Applying, Reimagined</h1>

            <Button>Explore our templates</Button>

            <Container>
                <Row className="w-100 justify-content-center">
                    <Col xs={12} md={4} className="d-flex justify-content-center mb-3">
                        <Card>
                            <Image src={landingimg} />
                            <h2>Subtext 1</h2>
                        </Card>
                    </Col>

                    <Col xs={12} md={4} className="d-flex justify-content-center mb-3">
                        <Card>
                            <Image src={landingimg} />
                            <h2>Subtext 2</h2>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className="justify-content-center">
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Lorem ipsum</Card.Title>
                            <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien diam, maximus quis enim ut, vehicula convallis dui. Donec placerat, ligula eu euismod vehicula, dolor lorem condimentum odio, sed elementum ligula tellus nec diam. Phasellus aliquam magna sit amet mi pellentesque pretium. Nulla turpis lectus, imperdiet id eleifend id, scelerisque id nisi. Quisque vehicula accumsan augue. Donec iaculis nulla at ipsum consequat eleifend. Donec consectetur nisl leo, in gravida nunc pharetra eu. Vestibulum aliquet et velit iaculis gravida. Phasellus a convallis sapien. Curabitur at posuere neque.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Image src={landingimg} />
                </Col>

            </Row>
            </Container>
        </Container>

    );
    
}

export default memo(ReWorkeDayHome);
