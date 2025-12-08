import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';
import Posting from '../../structural/Posting';
import { useUser } from "../../contexts/SignedInStatus";
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';




export default function CreatePosting() {
    const { user, setUser } = useUser();


    useEffect(() => {
        document.title = "ReWorkeDay | Create Posting";
    }, []);


    return (
        <>
        {
        user.role == Constants.Roles.Recruiter ?
            <div>
                <h1 className='text-center display-1'>Create Posting</h1>
                <Posting/>

            </div>
            :
            <AccessDenied role={Constants.Roles.Recruiter}/>
        }
        </>
    )
}
