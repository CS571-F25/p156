import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';

import { useUser } from "../../contexts/SignedInStatus";

import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase"; 

export default function ApplicantHome() {
    const { user, setUser } = useUser();


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
        if (v === Constants.ApplicationStatus.Accepted) { return ["Offer", "text-success"] }
        else if (v === Constants.ApplicationStatus.Rejected) { return ["Application Rejected", "text-danger"] }
        else if (v === Constants.ApplicationStatus.UnderReview) { return ["Under Review", ""] }
        else { return ["Unknown status - contact employer", "text-warning"]}
    }

    const formattedDate = (a) => {
        return a.toDate().toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric"});
    }

    return (
        <>
        {
        user.role === Constants.Roles.Applicant ?
            <Container>
                <h1 className="display-1 text-center">Applicant Home</h1>
                <Row>
                    <Col>
                        <h2>Your Applications</h2>
                        {
                            fetchedApplications.map((app, i) => {
                                return <Card key={i}>
                                    <Card.Body>
                                        <Card.Text>Position: {app.positionName}</Card.Text>
                                        <Card.Text>Job ID: <span className="text-muted">({app.id})</span></Card.Text>
                                        <Card.Text className="text-end"><span className={getStatusType(app.formValues.status)[1]}>{getStatusType(app.formValues.status)[0]}</span></Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-end">
                                        Submitted on {formattedDate(app.formValues["XX-submittedTimeStamp"])}
                                    </Card.Footer>
                                </Card>
                            })
                        }
                    </Col>
                    <Col>
                        <h2>What's new:</h2>
                    </Col>
                </Row>

            </Container>
            :
            <AccessDenied role={Constants.Roles.Applicant}/>
        }
        </>
    )
}
