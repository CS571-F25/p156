import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';
import { useUser } from "../../contexts/SignedInStatus";
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';
import { updateDoc, getDocs, collection, collectionGroup } from "firebase/firestore";
import { app, db } from "../../../firebase"; 


export default function SubmittedApplications() {

    const { user, setUser } = useUser();

    const [fetchedApplications, setFetchedApplications] = useState([]);

    useEffect(() => {
        document.title = "ReWorkeDay | My Submitted Applications";

        const fetchPosts = async () => {
            const q = collectionGroup(db, "recieved-applications");
            const snapshot = await getDocs(q);

            snapshot.forEach(doc => {
                setFetchedApplications([...fetchedApplications, doc.data()])
            });
        };
        fetchPosts()
    }, []);
    
    
    return (
        <>
        {
            user.role === Constants.Roles.Applicant ?
            <div>
                <h1>Submitted Applications</h1>
            </div>
            :
            <AccessDenied role={Constants.Roles.Applicant}/>
        }
        <Button onClick={() => {console.log(fetchedApplications)}}>Developer info</Button>
        </>
    )
}
