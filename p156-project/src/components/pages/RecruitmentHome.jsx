import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';



export default function RecruitmentHome() {

    
    return (
        <div>
            <h1>Recruitment Home</h1>
            <Link to="/recruitment/create">create posting</Link>


        </div>
    )
}
