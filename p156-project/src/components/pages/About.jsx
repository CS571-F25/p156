import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';



export default function About() {

    
    return (
        <div>
            <h1>About this site</h1>
            <p>This is the CS571 Final Project, designed to allow students to design a web application to tackle a problem of their choosing. </p>
            <p>Sites for this project are meant to be multi-page and may use any design library, as well as be partially <Link to="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum">WCAG AA</Link> compliant.</p>

            <p>This site was developed exclusively by Marko Kupresanin, and is available on <Link to="https://github.com/CS571-F25/p156">GitHub</Link></p>
        </div>
    )
}
