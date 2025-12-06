import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router';



export default function SubmittedApplications() {

    useEffect(() => {
        document.title = "ReWorkeDay | My Submitted Applications";
    }, []);


    return (
        <div>
            <h1>Submitted Applications</h1>

        </div>
    )
}
