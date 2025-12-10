import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useParams, useSearchParams, Link } from 'react-router';

import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';

import { useUser } from "../../contexts/SignedInStatus";

import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase"; 


export default function ViewApplications(props) {

    const { user, setUser } = useUser();
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const [fetchedApplications, setFetchedApplications] = useState([]);
    const [fetchedPostingData, setFetchedPostingData] = useState([]);
    const [showMoreApplication, setShowMoreApplication] = useState(false);
    const [newActionTaken, setNewActionTaken] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

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

    const handleOfferPosition = async (idToReject) => {
        setIsLoading(true);
        try {
            const appRef = doc(db, "submitted-applications", idToReject); 
            await updateDoc(appRef, {
                "formValues.status": Constants.ApplicationStatus.Accepted,
            });

            setFetchedApplications(prev =>
            prev.map(app =>
                app.id === idToReject
                ? { ...app, status: Constants.ApplicationStatus.Accepted }
                : app
            )
            );

        } catch (err) {
            alert("A fatal error occured when updating application status, please try again later.")
            console.error("Error rejecting application:", err);
        } finally {
            setShowMoreApplication(false);
            setNewActionTaken(new Date());
            setIsLoading(false);
        }
    }

    const handleRejectApplication = async (idToReject) => {
        setIsLoading(true);
        try {
            const appRef = doc(db, "submitted-applications", idToReject); 
            await updateDoc(appRef, {
                "formValues.status": Constants.ApplicationStatus.Rejected,
            });

            setFetchedApplications(prev =>
            prev.map(app =>
                app.id === idToReject
                ? { ...app, status: Constants.ApplicationStatus.Rejected }
                : app
            )
            );

        } catch (err) {
            alert("A fatal error occured when updating application status, please try again later.")
            console.error("Error rejecting application:", err);
        } finally {
            setShowMoreApplication(false);
            setNewActionTaken(new Date());
            setIsLoading(false);
        }
    };


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
    }, [newActionTaken]);


    const getStatusType = (v) => {
        if (v === Constants.ApplicationStatus.Accepted) { return ["Offer", "success"] }
        else if (v === Constants.ApplicationStatus.Rejected) { return ["Application Rejected", "danger"] }
        else if (v === Constants.ApplicationStatus.UnderReview) { return ["Under Review", "primary"] }
        else { return ["Unknown status - contact employer", "warning"]}
    }

    return (
        <>
        {
        user.role == Constants.Roles.Recruiter ?
            <Container>
                <Button disabled={isLoading} className="my-3" as={Link} to="/recruitment/home"><i class="bi bi-chevron-left"></i>Back</Button>
                <h1>Viewing Applications for {searchParams.get("position")}</h1>
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
                                        <Card.Title>Application Number: <span className="font-monospace">{appl.id}</span></Card.Title>
                                        <Badge className="mb-3" bg={getStatusType(appl.formValues.status)[1]}><span>{getStatusType(appl.formValues.status)[0]}</span></Badge>                                        
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
                                                            <Button disabled={isLoading} onClick={() => viewUploadedFile(appl.id, label)}>View Uploaded File</Button>
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
                                        
                                        <Button disabled={isLoading} variant="outline-primary" onClick={() => setShowMoreApplication(false)}><i class="bi bi-chevron-up"></i>&nbsp;Minimize application</Button>
                                        <Container className="text-end d-flex justify-content-end gap-3 mt-5">
                                            <Button disabled={isLoading} variant="warning" onClick={() => handleRejectApplication(appl.id)}>Reject Application</Button>
                                            <Button disabled={isLoading} variant="success" onClick={() => handleOfferPosition(appl.id)}>Offer Position</Button>
                                        </Container>
                                        <Container className="text-end mt-3 d-flex align-items-center justify-content-end">
                                            <span className="me-2">Current Status:</span>
                                            <Badge className="mb-0" bg={getStatusType(appl.formValues.status)[1]}>
                                                <span>{getStatusType(appl.formValues.status)[0]}</span>
                                            </Badge>
                                        </Container>

                                    </Card.Body> 
                                    <Card.Footer className='text-end text-muted'>{appl.id}</Card.Footer>
                                    
                                </Card>
                                :
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Application Number: <u className="font-monospace">{appl.id}</u></Card.Title>
                                        <Card.Subtitle>Submitted on: {formatDate(appl.formValues["XX-submittedTimeStamp"])}</Card.Subtitle>
                                        Current Status: &nbsp;&nbsp;<Badge bg={getStatusType(appl.formValues.status)[1]}><span>{getStatusType(appl.formValues.status)[0]}</span></Badge>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Container className="text-end d-flex justify-content-end gap-3">
                                            <Button disabled={isLoading} variant="outline-primary" onClick={() => setShowMoreApplication(true)}>Read entire application &nbsp;<i class="bi bi-chevron-down"></i></Button>
                                            <Button disabled={isLoading} variant="warning" onClick={() => handleRejectApplication(appl.id)}>Reject Application <i class="bi bi-ban"></i></Button>
                                            <Button disabled={isLoading} variant="success" onClick={() => handleOfferPosition(appl.id)}>Offer Position <i class="bi bi-person-check-fill"></i></Button>
                                        </Container>
                                    </Card.Footer>
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
