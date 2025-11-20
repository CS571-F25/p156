import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router';



export default function OpenRoles() {

    useEffect(() => {
        document.title = "ReWorkeDay | Open Roles";
    }, []);
    
    return (
        <div>
            <h1>Open Roles</h1>


        </div>
    )
}
