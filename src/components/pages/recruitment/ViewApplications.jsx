import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import { useNavigate, Link, useParams, useSearchParams } from 'react-router';
import PendingApplication from '../../structural/PendingApplication';
import Constants from '../../../Constants';
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { app, db } from "../../../firebase"; 
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getStorage } from "firebase/storage";
import { useUser } from "../../contexts/SignedInStatus";
import AccessDenied from '../AccessDenied';



export default function ViewApplications(props) {

    const goTo = useNavigate(); 
    const { user, setUser } = useUser();
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const [fetchedApplications, setFetchedApplications] = useState([]);
    const [fetchedPostingData, setFetchedPostingData] = useState([]);


    const viewUploadedFile = async (imgRefID, label) => {
        try {
            const fileRef = ref(storage, `uploads/${imgRefID}-${label}`);
            const url = await getDownloadURL(fileRef);

            window.open(url, "_blank")

        } catch (error) {
            alert("Fatal error in fetching file, please try again later.")
            console.error(error)
        }
    }


    const formatDate = (a) => {
        return a.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    useEffect(() => {
        document.title = `ReWorkeDay | Applications for ${searchParams.get("position")}`;
        const fetchApplications = async () => {
            const querySnapshot = await getDocs(collection(db, "submitted-applications"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFetchedApplications(data.filter((d) => d.formValues["XX-applicationID"] === id));
        }
        fetchApplications();

        const fetchPostingData = async () => {
            const querySnapshot = await getDocs(collection(db, "posted-applications"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFetchedPostingData(data.filter((d) => d.id === id));
        }
        fetchPostingData();        
    }, []);


    return (
        <>
        {
        user.role == Constants.Roles.Recruiter ?
            <Container>
                <h1>Viewing Applications for <u>{searchParams.get("position")}</u></h1>

                <Container>
                    <Row>
                        <Form>
                        {
                        fetchedApplications.map((appl, i) => {
                            return <Col xs={12} key={appl.id}>
                                <Card className='mb-5'>
                                    <Card.Body>
                                        <Card.Title>Application Number: {appl.id}</Card.Title>
                                        { fetchedPostingData.map((postD) => (
                                            postD.applicationFields.map((f, i) => {
                                                const label = postD.applicationFields[i].label;
                                                const required = postD.applicationFields[i].required;
                                                const inputType = postD.applicationFields[i].input;
                                                const response = appl.formValues[postD.applicationFields[i].label];
                                                if (inputType === "checkbox") {
                                                    return (
                                                        <Form.Group className="mb-1" key={i}>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <Form.Label className="me-3">{label}</Form.Label>
                                                                <Form.Check className="mb-2" type="checkbox" disabled defaultChecked={response}/>
                                                            </div>
                                                        </Form.Group>
                                                    );
                                                } else if(inputType === "file"){
                                                    return (
                                                        <Form.Group className="mb-3" key={i}>
                                                            <Form.Label>{label}{required ? <span className="text-danger"> *</span> : <></>}</Form.Label><br></br>
                                                            <Button onClick={() => viewUploadedFile(appl.id, label)}>View Uploaded File</Button>
                                                            {/* <Form.Control className="mb-3" readOnly disabled value={getFileURL(appl.id, label)} type={"text"} required={required}/> */}
                                                        </Form.Group>
                                                    );                                                    
                                                } else {
                                                    return (
                                                        <Form.Group className="mb-1" key={i}>
                                                            <Form.Label>{label}{required ? <span className="text-danger"> *</span> : <></>}</Form.Label>
                                                            <Form.Control className="mb-3" disabled value={response} type={inputType} required={required}/>
                                                        </Form.Group>
                                                    );
                                                }    
                                                // <div key={i}>
                                                //     <p>{postD.applicationFields[i].label}</p>
                                                //     <p>{appl.formValues[postD.applicationFields[i].label]}</p>
                                                // </div>
                                                })
                                        ))}
                                    </Card.Body>
                                    <Card.Footer className='text-end text-muted'>{appl.id}</Card.Footer>
                                </Card>
                            </Col>
                            })
                        }
                        </Form>
                    </Row>
                </Container>
            </Container>
            :
            <AccessDenied role={Constants.Roles.Recruiter}/>
        }
        </>
    )
}
