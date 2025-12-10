import { Card, Button, Modal, Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react"
import Constants from "../../Constants";
import Markdown from "react-markdown";

import { useUser } from "../contexts/SignedInStatus";
import ReWorkeDayToolTip from "./ReWorkeDayToolTip";

import { storage, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { useNavigate, Link } from "react-router";


export default function Role(props) {
    const [individualApplicationID] = useState(() => crypto.randomUUID());


    const goTo = useNavigate();

    const { user, setUser } = useUser();
    // Modal state variables
    const [show, setShow] = useState(false);
    const [moreID, setMoreID] = useState(false);

    const [validated, setValidated] = useState(false);

    const [formValues, setFormValues] = useState({});

    const formattedDate = props.postingDetails[0].posted.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (user.role === "2") {
            alert("You must be logged in as an applicant to apply for a position!")
            return;
        }
        setShow(true);
    }

    const getEmployeeType = (v) => {
        if (v === Constants.employeeType.FullTime) {return "Full Time"}
        else if (v === Constants.employeeType.PartTime) {return "Part Time"}
        else if (v === Constants.employeeType.Intern) {return "Internship"}
        else if (v === Constants.employeeType.Contract) {return "Contract"}
        else if (v === Constants.employeeType.Other) {return "Other"}
    }

    const handleFileChange = async (e, fieldLabel) => {
        const { [fieldLabel]: _, ...updatedFormValues } = formValues;

        // Upload the new file
        const fileRef = ref(storage, `uploads/${individualApplicationID}-${fieldLabel}`);
        await uploadBytes(fileRef, e.target.files[0]);
        const url = await getDownloadURL(fileRef);

        // Add the new field in the same object
        setFormValues({
            ...updatedFormValues,
            [fieldLabel]: url,
        });
    };

    const handleSubmitFinalApplication = async (e, n) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        const jobID = props.id;

        await setDoc(doc(db, "submitted-applications", individualApplicationID), {
            formValues,
            positionName: n
        })

        goTo(`/applicant/home?submitted=${encodeURIComponent("true")}&submittedPositionName=${encodeURIComponent(n)}`)
    }

    useEffect(() => {
        setFormValues({ ...formValues, "XX-applicationID": props.id,"XX-submittedTimeStamp": new Date(), "userUID": user.uid, "status": Constants.ApplicationStatus.UnderReview});
    }, [])

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
                <Modal.Header closeButton>
                <Modal.Title>Your Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {
                            props.postingDetails.map((d, i) => {
                                return <Container key={i}>
                                    <h1>{d.position}</h1>
                                    <p><em>{getEmployeeType(d.empType)} Position</em></p>
                                    <span className="text-muted">Job ID: {" "} <span className="font-monospace">{props.jobid}</span></span>
                                    <p>Location(s): {d.locations}</p>
                                    <Markdown>{d.summary}</Markdown>
                                    {d.minQ ? <><span className="fw-bold">Minimum Qualifications:</span><Markdown>{d.minQ}</Markdown></> : <></>}
                                    {d.prefQ ? <><span className="fw-bold">Preferred Qualifications:</span><Markdown>{d.prefQ}</Markdown></> : <></>}
                                </Container>
                            })
                        }
                    </Container>
                    <hr className="border-2 border-top border-primary" />
                    { user.role === "1" ? <Container>

                    <Form noValidate validated={validated} onSubmit={handleSubmitFinalApplication}>
                        {props.applicationFields.map((f, i) => {
                            if (f.input === "checkbox") {
                                return (
                                    <Form.Group className="mb-5" key={i}>
                                        <div className="d-flex align-items-center mb-2">
                                        { f.description ? <div className="mb-1"><ReWorkeDayToolTip description={f.description}/> &nbsp;</div> : <></> } 
                                            <Form.Label className="me-3">{f.label} {f.required ? <span className="text-danger"> *</span> : <></>}</Form.Label>
                                            <Form.Check className="mb-2" type="checkbox" checked={!!formValues[f.label]} onChange={(e) => setFormValues({...formValues, [f.label]: e.target.checked})}/>
                                            <Form.Control.Feedback type="invalid">
                                                Oops! This field is required.
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                );
                            } else if (f.input === "file") {
                                return (
                                    <Form.Group className="mb-5" key={i}>
                                        { f.description ? <><ReWorkeDayToolTip description={f.description}/> {" "}</> : <></> } 
                                        <Form.Label>{f.label}{f.required ? <span className="text-danger"> *</span> : <></>}</Form.Label>
                                            <Form.Control className="mb-3" type="file" onChange={(e) => {handleFileChange(e, f.label)}}/>
                                            {/* <Button onClick={() => {handleUpload(f.label)}}>Upload File</Button> */}
                                            <Form.Control.Feedback type="invalid">
                                                Oops! This file upload field is required.
                                            </Form.Control.Feedback>
                                    </Form.Group>                                    
                                )
                            } else {
                                return (
                                    <Form.Group className="mb-5" key={i}>
                                        { f.description ? <><ReWorkeDayToolTip description={f.description}/> {" "}</> : <></> } 
                                        <Form.Label>{f.label}{f.required ? <span className="text-danger"> *</span> : <></>}</Form.Label>


                                        {f.input==="textarea" ? 
                                            <>
                                                <Form.Control className="mb-3" onChange={(e) => setFormValues({ ...formValues, [f.label]: e.target.value, })} value={formValues[f.label] || ""} as={f.input} required={f.required}/>                                            
                                                <Form.Control.Feedback type="invalid">
                                                    Oops! This field is required.
                                                </Form.Control.Feedback>                                                    
                                            </>
                                            :
                                            <>
                                                <Form.Control className="mb-3" onChange={(e) => setFormValues({ ...formValues, [f.label]: e.target.value, })} value={formValues[f.label] || ""} type={f.input} required={f.required}/>
                                                <Form.Control.Feedback type="invalid">
                                                    Oops! This field is required.
                                                </Form.Control.Feedback>                                                    
                                            </>
                                            
                                            }
                                    </Form.Group>
                                );
                            }
                        })}
                    </Form>

                    </Container> : <>
                    {/* Conditional render if user is not logged in at all */}
                    <Container><Card><Card.Body><Card.Title className="text-center fw-bold">You must be logged in as an applicant to submit an application!</Card.Title><div className="d-flex justify-content-center mt-3"><Button as={Link} to="/register?role=1">Register as an applicant</Button></div></Card.Body></Card></Container>                
                </>}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                </Button>
                {
                    user.role === "1"?
                    <Button variant="primary" type="submit" onClick={(e) => {handleSubmitFinalApplication(e, props.postingDetails[0].position)}}>
                        Submit!
                    </Button>
                    :<></>
                }
                </Modal.Footer>
            </Modal>
            <Card>
                <Card.Body>
                    <Card.Title>{props.postingDetails[0].position}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Posted: {formattedDate}
                    </Card.Subtitle>
                    <Card.Subtitle className="text-muted mb-2">Job ID: {moreID ? <>{props.jobid} <a onClick={() => setMoreID(false)}>{" (minimize)"}</a></> : <>{props.jobid.substring(0,8)} <a onClick={() => setMoreID(true)}>{" ..."}</a></>}</Card.Subtitle>
                    <Card.Subtitle>Location: <strong>{props.postingDetails[0].locations}</strong></Card.Subtitle>
                    <Card.Text>
                        Position Type: <strong>{getEmployeeType(props.postingDetails[0].empType)}</strong>
                    </Card.Text>
                    <Button variant="success" onClick={handleShow}>
                        Apply!
                        <i className={`bi bi-box-arrow-up-right ms-2`}/>
                    </Button>
                </Card.Body>
            </Card>
        </>
  );
}