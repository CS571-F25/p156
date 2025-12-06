import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';



export default function About() {
    useEffect(() => {
        document.title = "ReWorkeDay | About";
    }, []);
    
    return (
        <Card className="d-flex justify-content-center align-items-center flex-grow-1">
            <Card.Body>
            <Card.Title>About this site</Card.Title>
                <Card.Text>This is the <Link target="_blank" rel="noopener noreferrer" to="https://cs571.org/">CS571</Link> Final Project, designed to allow students to design a web application to tackle a problem of their choosing. </Card.Text>
                
                <Card.Text>Sites for this project are meant to be multi-page and may use any design library, as well as be partially <Link target="_blank" rel="noopener noreferrer" to="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum">WCAG AA</Link> compliant.</Card.Text>
                <Card.Text>The site logo as well as the landing page images were generated with Google's <Link target="_blank" rel="noopener noreferrer" to="https://blog.google/technology/ai/nano-banana-pro/">Nano Banana Pro</Link> Multimodal Generative Model</Card.Text>
                <Card.Text>This site was developed exclusively by Marko Kupresanin, and is available on <Link target="_blank" rel="noopener noreferrer" to="https://github.com/CS571-F25/p156">GitHub</Link></Card.Text>
            </Card.Body>
        </Card>
    )
}
