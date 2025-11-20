import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';



export default function ReWorkeDayLogin() {

    useEffect(() => {
        document.title = "ReWorkeDay | Login";
    }, []);

    return <Container className="d-flex justify-content-center align-items-center flex-grow-1">
        {/* <Form> */}
            {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/* <Form.Label>Username</Form.Label> */}
                {/* <Form.Control type="text" placeholder="Username" /> */}
            {/* </Form.Group> */}

            {/* <Form.Group className="mb-3" controlId="formBasicPassword"> */}
                {/* <Form.Label>Password</Form.Label> */}
                {/* <Form.Control type="password" placeholder="Password" /> */}
            {/* </Form.Group> */}
            {/* <Button variant="primary" type="submit"> */}
                {/* Log in */}
            {/* </Button>                 */}
        {/* </Form> */}
            <Row className="w-100 justify-content-center">
                <Col xs="auto">
                    <Card className="p-2">
                        <Card.Body>
                            <Card.Title className="text-center h-1 py-3"><h1 className="fs-1">Log In</h1></Card.Title>

                            <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
                                <GoogleLogin
                                onSuccess={(res) => console.log(res)}
                                onError={() => console.log("Login failed")}
                                useOneTap={false}
                                shape="pill"
                                theme="outline"
                                size="large"   // ← valid values: 'large', 'medium', 'small'
                                />
                            </GoogleOAuthProvider>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    </Container>
}
