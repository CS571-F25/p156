import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Col, Row, Container, Card } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { app, db } from "../../firebase"; 

import Role from "../structural/Role";
import Constants from "../../Constants"


export default function OpenRoles() {

    const [postedApplications, setPostedApplications] = useState([]);

    useEffect(() => {
        document.title = "ReWorkeDay | Open Roles";

        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posted-applications"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));      
            setPostedApplications(data)
        }

        fetchPosts()
    }, []);

    
    return (
        <Container className="py-4">
            <Row>
                {postedApplications.map((item, v) => {
                    return <Col md={4}>
                        <Role key={v} {...item}/>
                    </Col>
                })
                }
            </Row>
        </Container>
    );
}
