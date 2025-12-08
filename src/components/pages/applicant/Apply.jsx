import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';
import { useUser } from "../../contexts/SignedInStatus";
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';



export default function Apply() {
    const { user, setUser } = useUser();


    useEffect(() => {
        document.title = "ReWorkeDay | Applying";
    }, []);


    return (
        <>
        {
        user.role === Constants.Roles.Applicant ?
            <div>
                <h1>apply page!</h1>

            </div>
            :
            <AccessDenied role={Constants.Roles.Applicant}/>
        }
        </>
    )
}
