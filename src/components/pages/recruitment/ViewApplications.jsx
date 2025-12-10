import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useParams, useSearchParams, Link } from 'react-router';

import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';

import { useUser } from "../../contexts/SignedInStatus";

import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase"; 


export default function ViewApplications(props) {

    const { user, setUser } = useUser();
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const [fetchedApplications, setFetchedApplications] = useState([]);
    const [fetchedPostingData, setFetchedPostingData] = useState([]);
    const [showMoreApplication, setShowMoreApplication] = useState(false);

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
                <Button className="my-3" as={Link} to="/recruitment/home">Back</Button>
                <h1>Viewing Applications for <u>{searchParams.get("position")}</u></h1>
                {fetchedApplications.length>0 ?
                <Container>
                    <Row>
                        <Form>
                        {
                        fetchedApplications.map((appl, i) => {
                            return <Col xs={12} key={appl.id}>
                                {showMoreApplication ? 
                                <Card className='mb-5'>
                                    <Card.Body>
                                        <Card.Title>Application Number: <u className="font-monospace">{appl.id}</u></Card.Title>
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
                                                })
                                        ))}
                                        <Button variant="outline-primary" onClick={() => setShowMoreApplication(false)}>Minimize application</Button>
                                    </Card.Body> 
                                    <Card.Footer className='text-end text-muted'>{appl.id}</Card.Footer>
                                </Card>
                                :
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Application Number: <u className="font-monospace">{appl.id}</u></Card.Title>
                                        <Card.Subtitle>Submitted on: {formatDate(appl.formValues["XX-submittedTimeStamp"])}</Card.Subtitle>
                                        <Button className="mt-2" onClick={() => setShowMoreApplication(true)}>Read entire application</Button>
                                    </Card.Body>
                                </Card>
                                }
                            </Col>
                            })
                        }
                        </Form>
                    </Row>
                </Container>
            :
            <Container>
                <p className="text-muted fst-italic">No applications have been submitted to this position. Maybe you're too early?</p>
            </Container>}
            </Container>
            :
            <AccessDenied role={Constants.Roles.Recruiter}/>
        }
        </>
    )
}
