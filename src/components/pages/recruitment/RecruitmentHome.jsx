import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Toast, ToastContainer, Modal } from "react-bootstrap";
import { Link, useSearchParams } from 'react-router';

import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';

import { db } from "../../../firebase"; 
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { useUser } from "../../contexts/SignedInStatus";

export default function RecruitmentHome() {
    const { user, setUser } = useUser();

    const [searchParams] = useSearchParams();
    const [posted, setShowToast] = useState(searchParams.get("posted"));
    const [ownedApplicationResults, setOwnedApplicationResults] = useState([]);
    const [fetchedApplications, setFetchedApplications] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [manualAction, setManualAction] = useState(new Date());

    const [savedIDToDelete, setSavedIDToDelete] = useState("");

    const handleClose = () => {
        setShowModal(false);
    }

    const handleClosePosting = async () => {
        setShowModal(true);
        try {
            // Create a reference to the document
            const docRef = doc(db, "posted-applications", savedIDToDelete);

            // Delete the document
            await deleteDoc(docRef);

        } catch (error) {
            alert("A fatal error occured while trying to delete your posting. Please try again later.");
            console.error("Error deleting document: ", error);
        } finally {
            setShowModal(false);
            setManualAction(new Date());  
        }
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

        // const fetchApplications = async () => {
        //     const querySnapshot = await getDocs(collection(db, "submitted-applications"));
        //     const data = querySnapshot.docs.map(doc => ({
        //         id: doc.id,
        //         ...doc.data()
        //     }));
        //     setFetchedApplications(data.filter((d) => {
        //         d.formValues["XX-applicationID"] === id;
        //     }));
        // }
        // fetchApplications();        
    }, [manualAction])




    return (
        <>
        {
        user.role == Constants.Roles.Recruiter ?
        <>
            {showModal ?
                <Modal size="lg" show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woah! If you close this job posting, no one will be able to apply and you will not be able to view the submitted applications!</Modal.Body>
                    <Modal.Footer className="d-flex">
                        <Button variant="danger" onClick={handleClosePosting}>I understand, continue with closing the posting</Button>
                        <Button variant="success" onClick={handleClose}>Nevermind</Button>
                    </Modal.Footer>
                </Modal>
                :<></>
            }
            { posted ?
            <ToastContainer className="me-5 mb-5" style={{zIndex: 1}}position="bottom-end">
                <Toast bg="success" onClose={() => setShowToast(false)} show={posted} delay={6767} autohide>
                    <Toast.Header>
                        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                        <strong className="me-auto">Success!</strong>
                        <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>We have successfully recieved your new post and it is now available in the open jobs page.</Toast.Body>
                </Toast>
            </ToastContainer>
            : <></>}
            <h1 className='display-1 text-center mb-5'>Recruiter Portal</h1>
            <Container className='mb-4'>
                <Card>
                    <Card.Body>
                        <Card.Text className='fs-3'>Welcome back, {user.name.slice(0, user.name.indexOf(" "))}! <br />
                            {ownedApplicationResults ? <>
                                <span>You have {ownedApplicationResults.length} job posting{ownedApplicationResults.length == 1 ? <span></span>:<span>s</span>} live!</span>
                            </> : <></>}
                            {/* {true ? <>You have <span className='text-primary'>X</span> applications pending review!</> 
                            : 
                            <>No applications are pending review, time to chill 😎</>} */}
                            
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
                                                <Button as={Link} to={`/recruitment/view-application/${posting.id}?position=${encodeURIComponent(posting.postingDetails[0].position)}`} variant="primary"> <i class="bi bi-eye"></i> &nbsp;View Applications </Button>
                                            </Col>

                                            <Col xs="auto">
                                                <Button onClick={() => {setSavedIDToDelete(posting.id); setShowModal(true)}} variant="danger"><i class="bi bi-trash"></i> Close Job Posting</Button>
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
                                <Button className="justify-content-center align-items-center" as={Link} to="/recruitment/create" variant="primary"> <i class="bi bi-person-workspace"></i> &nbsp;Create Posting</Button>
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
