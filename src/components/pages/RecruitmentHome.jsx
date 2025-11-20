import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';
import PendingApplication from '../structural/PendingApplication';



export default function RecruitmentHome() {
  const items = Array.from({ length: 15 });

    
    return (
        <Container className='flex-grow-1'>
            <Row>
                {items.map((_, index) => (
                    <Col xs={12} sm={12} md={6} lg={3} xl={4} className='p-2'>
                        <PendingApplication key={index} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
