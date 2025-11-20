import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router';
import Posting from '../structural/Posting';



export default function CreatePosting() {
    useEffect(() => {
        document.title = "ReWorkeDay | Create Posting";
    }, []);
    
    return (
        <div>
            <h1>Create Posting</h1>
            <Posting/>

        </div>
    )
}
