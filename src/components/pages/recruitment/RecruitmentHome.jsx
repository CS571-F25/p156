import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from 'react-router';

import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';

import { db } from "../../../firebase"; 
import { collection, getDocs } from "firebase/firestore";

import { useUser } from "../../contexts/SignedInStatus";

export default function RecruitmentHome() {
    const { user, setUser } = useUser();

    const [ownedApplicationResults, setOwnedApplicationResults] = useState([]);


    const handleClosePosting = () => {

    }

    useEffect(() => {
        document.title = "ReWorkeDay | Recruitment Home"

        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posted-applications"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOwnedApplicationResults(data.filter((d) => d.postingDetails[0].owner === user.uid));
        }
        fetchPosts();
    }, [])


    return (
        <>
        {
        user.role == Constants.Roles.Recruiter ?
        <>
            <h1 className='display-1 text-center mb-5'>Recruiter Portal</h1>
            <Container className='mb-4'>
                <Card>
                    <Card.Body>
                        <Card.Text className='fs-3'>Welcome back, {user.name.slice(0, user.name.indexOf(" "))}! <br />
                            {true ? <>You have <span className='text-primary'>X</span> applications{/** add logic for -s */} pending review!</> 
                            : 
                            <>No applications are pending review, time to chill 😎</>}
                            
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <Container className='d-flex flex-grow-1 justify-content-center mb-5'>
                <Row>
                    <Row><h2 className='fst-italic'>Jump back in</h2></Row>

                    <Col xs={12} md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title><h3>Your Active Postings</h3></Card.Title>
                                { ownedApplicationResults.map(posting => {
                                    return <Card key={posting.id} className="m-3">
                                        <Card.Body>
                                            <Card.Text className="mb-3">{posting.postingDetails[0].position} {" "} 
                                                <span className='text-muted'>({posting.id})</span>
                                            </Card.Text>

                                            <Row className="gy-2 gx-3">
                                            <Col xs="auto">
                                                <Button as={Link} to={`/recruitment/view-application/${posting.id}?position=${encodeURIComponent(posting.postingDetails[0].position)}`} variant="primary">View Applications</Button>
                                            </Col>

                                            <Col xs="auto">
                                                <Button onClick={() => handleClosePosting(posting.id)} variant="danger">Close Posting</Button>
                                            </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    })    
                                }
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} md={4} className='mt-5 mt-sm-0'>
                        <Card>
                            <Card.Body>
                                <Card.Title><h3>Looking for new talent?</h3></Card.Title>
                                <Button className="justify-content-center align-items-center" as={Link} to="/recruitment/create" variant="primary">Create Posting</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </> :
            <AccessDenied role={Constants.Roles.Recruiter}/>
        }
        </>
    )
}
