import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Toast, ToastContainer, Badge } from "react-bootstrap";
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';

import { useUser } from "../../contexts/SignedInStatus";

import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase"; 
import { useSearchParams } from "react-router";

export default function ApplicantHome() {
    const { user, setUser } = useUser();
    
    const [searchParams] = useSearchParams();
    const [submitted, setShowToast] = useState(searchParams.get("submitted"));
    const submittedPositionName = searchParams.get("submittedPositionName");


    const [fetchedApplications, setFetchedApplications] = useState([]);

    useEffect(() => {
        document.title = "ReWorkeDay | Applicant Home";

        const fetchApplications = async () => {
            const querySnapshot = await getDocs(collection(db, "submitted-applications"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFetchedApplications(data.filter((d) => d.formValues["userUID"] === user.uid));
        }

        fetchApplications();
    }, []);

    const getStatusType = (v) => {
        if (v === Constants.ApplicationStatus.Accepted) { return ["Offer", "success"] }
        else if (v === Constants.ApplicationStatus.Rejected) { return ["Application Rejected", "danger"] }
        else if (v === Constants.ApplicationStatus.UnderReview) { return ["Under Review", "primary"] }
        else { return ["Unknown status - contact employer", "warning"]}
    }

    const formattedDate = (a) => {
        return a.toDate().toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric"});
    }

    return (
        <>
        {
        user.role === Constants.Roles.Applicant ?
            <Container>
                { submitted ?
                <ToastContainer className="me-5 mb-5" style={{zIndex: 1}}position="bottom-end">
                    <Toast bg="success" onClose={() => setShowToast(false)} show={submitted} delay={16767} autohide>
                        <Toast.Header>
                            {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                            <strong className="me-auto">Submitted!</strong>
                            <small>Just now</small>
                        </Toast.Header>
                        <Toast.Body>Your application to the posting: &quot;{submittedPositionName}&quot; was received. Good luck!</Toast.Body>
                    </Toast>
                </ToastContainer>
                : <></>}                
                <h1 className="display-1 text-center">Applicant Home</h1>
                <Row>
                    <Col>
                        <h2>Your Applications</h2>
                        {
                            fetchedApplications.map((app, i) => {
                                return <Card className="mb-5" key={i}>
                                    <Card.Body>
                                        <Card.Text>Position: {app.positionName}</Card.Text>
                                        <Card.Text>Job ID: <span className="text-muted">({app.id})</span></Card.Text>
                                        <Badge bg={getStatusType(app.formValues.status)[1]} className="text-end"><span>{getStatusType(app.formValues.status)[0]}</span></Badge>
                                    </Card.Body>
                                    <Card.Footer className="text-end">
                                        Submitted on {formattedDate(app.formValues["XX-submittedTimeStamp"])}
                                    </Card.Footer>
                                </Card>
                            })
                        }
                    </Col>
                    {/* <Col>
                        <h2>What's new:</h2>
                    </Col> */}
                </Row>

            </Container>
            :
            <AccessDenied role={Constants.Roles.Applicant}/>
        }
        </>
    )
}
