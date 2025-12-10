import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Dropdown } from "react-bootstrap";
import Constants from "../../Constants";
import { Link } from "react-router"
import Markdown from 'react-markdown'

import { useUser } from "../contexts/SignedInStatus";

import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Posting() {
    const templates = {
        "Standard Employee": [
            { type: "form", id: crypto.randomUUID(), label: "First Name", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Last Name", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Preferred Name", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Email", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Phone Number", description: "Please only type the numbers", input: "number", required: true},
            { type: "form", id: crypto.randomUUID(), label: "How did you hear about us?", description: "", input: "text", required: false},
            { type: "form", id: crypto.randomUUID(), label: "Resume", description: "", input:"file", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Education", description: "", input:"text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Are you willing to relocate?", description: "", input:"checkbox", required: true},
            { type: "form", id: crypto.randomUUID(), label: "First day available to work", description: "", input:"date", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Expected salary (USD)", description: "", input:"number", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Message to hiring team", description: "", input:"textarea", required: false},
        ],
        Intern: [
            { type: "form", id: crypto.randomUUID(), label: "First Name", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Last Name", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Preferred Name", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Email", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Phone Number", description: "Please only type the numbers", input: "number", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Resume", description: "", input:"file", required: true},
            { type: "form", id: crypto.randomUUID(), label: "University/College Name", description: "", input:"text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Major", description: "", input:"text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Minor/Certificates/Concentrations", description: "", input:"text", required: false},
            { type: "form", id: crypto.randomUUID(), label: "GPA", description: "Please enter on a 4.0 scale", input:"number", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Are you willing to relocate?", description: "", input:"checkbox", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Message to hiring team", description: "", input:"textarea", required: false},
        ],
        Contract: [
            { type: "form", id: crypto.randomUUID(), label: "First Name", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Last Name", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Preferred Name", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Email", description: "", input: "text", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Phone Number", description: "Please only type the numbers", input: "number", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Resume", description: "", input:"file", required: false},
            { type: "form", id: crypto.randomUUID(), label: "Describe your previous contract work, or related experience related to this position", description: "", input:"textarea", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Are you willing to relocate?", description: "", input:"checkbox", required: true},
            { type: "form", id: crypto.randomUUID(), label: "Message to hiring team", description: "", input:"textarea", required: false},
        ], 
    };

    const { user, setUser } = useUser();

    const [fields, setFields] = useState([]);
    const [postingDetails, setPostingDetails] = useState([]);

    const [positionName, setPositionName] = useState("");
    const [empType, setEmpType] = useState("");
    const [summary, setSummary] = useState("");
    const [locations, setLocations] = useState("");
    const [minQ, setMinQ] = useState(false);
    const [minQText, setMinQText] = useState("");
    const [prefQ, setPrefQ] = useState(false);
    const [prefQText, setPrefQText] = useState("");

    const [newFieldLabel, setNewFieldLabel] = useState("");
    const [newFieldDescription, setNewFieldDescription] = useState("");
    const [newFieldType, setNewFieldType] = useState("");
    const [newFieldRequired, setNewFieldRequired] = useState(false);
    
    const [canPublish, setCanPublish] = useState(fields.length !== 0);
    const [firstStep, setFirstStep] = useState(false);

    const addField = () => {
        if (!newFieldLabel.trim()) return;
        setFields([...fields, { type: "form", id: crypto.randomUUID(), label: newFieldLabel, description: newFieldDescription, input: newFieldType, required: newFieldRequired }]);
        setNewFieldLabel("");
        setNewFieldDescription("");
        setNewFieldType("");
        setNewFieldRequired(false);
        setCanPublish(true);
    };

    const addToPostingDetails = () => {
        setPostingDetails([...postingDetails, {type: "info", "position": positionName, "empType": empType, "summary": summary, "locations": locations, "minQ": minQText, "prefQ": prefQText, posted: new Date(), owner:user.uid}])
        setFirstStep(true);
    }

    const loadTemplate = (name) => {
        setFields(templates[name] || []);
    };

    const handlePublishPost = async () => {
        const jobId = crypto.randomUUID();

        await setDoc(doc(db, "posted-applications", jobId), {
            postingDetails,
            applicationFields: fields
        });
    };

    const getEmployeeType = (v) => {
        if (v === Constants.employeeType.FullTime) { return "Full Time" }
        else if (v === Constants.employeeType.PartTime) { return "Part Time" }
        else if (v === Constants.employeeType.Intern) { return "Internship" }
        else if (v === Constants.employeeType.Contract) { return "Contract" }
        else if (v === Constants.employeeType.Other) { return "Other" }
    }

    const handleRemove = (id) => {
        setFields(fields.filter(field => field.id !== id));
    }

    const handleMoveUp = (id) => {
        setFields(prev => {
            const index = prev.findIndex(item => item.id === id);
            if (index <= 0) return prev; // can't move up

            const newArr = [...prev];
            [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
            return newArr;
        });
    };

    const handleMoveDown = (id) => {
        setFields(prev => {
            const index = prev.findIndex(item => item.id === id);
            if (index === -1 || index >= prev.length - 1) return prev; // can't move down

            const newArr = [...prev];
            [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
            return newArr;
        });
    };


    useEffect(() => {
        if (fields.length === 0) setCanPublish(false)
    }, [fields]);
    
    return (
        <Container className="py-4">
            <h2 className="mb-4">Application Builder</h2>
            
            <Form>
            <Card className="p-3 mb-4">
                <h3>Basic Information</h3>
                <Row className="align-items-end">
                    <Col>
                        <Form.Group className="mb-2">
                            <div className="mb-4">
                                <Form.Label>Position Name</Form.Label>
                                <Form.Control
                                    disabled={postingDetails.length>0}
                                    placeholder="e.g. Cybersecurity Intern"
                                    value={positionName}
                                    onChange={(e) => setPositionName(e.target.value)}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="mb-4">
                                <Form.Label>Employment Type</Form.Label>
                                <Form.Select
                                    value={empType}
                                    disabled={postingDetails.length>0}
                                    onChange={(e) => {setEmpType(e.target.value)}}
                                >
                                    <option value="" disabled>
                                        Select an employment type
                                    </option>
                                    <option value={Constants.employeeType.FullTime}>Full Time</option>
                                    <option value={Constants.employeeType.PartTime}>Part Time</option>
                                    <option value={Constants.employeeType.Intern}>Internship</option>
                                    <option value={Constants.employeeType.Contract}>Contract</option>
                                    <option value={Constants.employeeType.Other}>Other</option>
                                </Form.Select>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="mb-4">
                                <Form.Label>Summary</Form.Label>
                                <Form.Control
                                    disabled={postingDetails.length>0}
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    placeholder="Write a summary of what applicants can expect the job to entail!"
                                    as="textarea"
                                    className="w-100"
                                    rows={4}
                                />
                                <p className="text-muted"><Link to="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer">Markdown</Link> formatting IS supported!</p>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="mb-4">
                                <Form.Label>Location(s)</Form.Label>
                                <Form.Control
                                    disabled={postingDetails.length>0}
                                    value={locations}
                                    onChange={(e) => setLocations(e.target.value)}
                                    placeholder="e.g. Madison, WI, New York, NY, Houston, TX"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="d-flex align-items-center mb-2">
                                <Form.Label className="me-3">Add minimum qualifications?</Form.Label>
                                <Form.Check
                                    disabled={postingDetails.length>0}
                                    type="checkbox"
                                    checked={minQ}
                                    value={minQ}
                                    onChange={() => setMinQ(prev => !prev)}
                                />
                            </div>
                            {
                                minQ ?
                                <div className="mb-4">
                                    <Form.Label>Minimum Qualifications</Form.Label>
                                    <Form.Control
                                        disabled={postingDetails.length>0}
                                        className="align-middle"
                                        placeholder="e.g. willingness to learn!"
                                        as="textarea"
                                        value={minQText}
                                        onChange={(e) => setMinQText(e.target.value)}                                        
                                    />
                                    <sub>Markdown is also supported!</sub>
                                </div>
                                :
                                <></>
                            }
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="d-flex align-items-center mb-2">
                                <Form.Label className="me-3">Add preferred qualifications?</Form.Label>
                                <Form.Check
                                    disabled={postingDetails.length>0}
                                    type="checkbox"
                                    checked={prefQ}
                                    value={prefQ}
                                    onChange={() => setPrefQ(prev => !prev)}
                                />
                            </div>

                            {
                                prefQ ?
                                <div className="mb-4">
                                    <Form.Label>Preferred Qualifications</Form.Label>
                                    <Form.Control                                    
                                        disabled={postingDetails.length>0}
                                        className="align-middle"
                                        placeholder="e.g. penetration testing, database security"
                                        as="textarea"
                                        value={prefQText}
                                        onChange={(e) => setPrefQText(e.target.value)}
                                    />
                                    <sub>Markdown is also supported!</sub>
                                </div>
                                :
                                <></>
                            }
                        </Form.Group>
                    </Col>
                </Row>
                {/* <Row> */}
                    {/* <Col md={1}> */}
                        <Button disabled={!positionName || !summary || !empType || !locations || postingDetails.length>0} onClick={addToPostingDetails}>Continue</Button>
                    {/* </Col> */}
                    {/* <Col md={1}>
                        <Button disabled={!positionName || !summary || !empType || !locations || postingDetails.length>0} onClick={addToPostingDetails}>Save</Button>
                    </Col>                     */}
                {/* </Row> */}
            </Card>
            
            { firstStep ?
            <Card className="mb-4">
                <Card.Body>
                <Row>
                    <Col>
                    <h3>Import Template</h3>
                    <Card.Text>Low on time? Use one of our carefully crafted templates that will keep applicants happy and get all the information you need!</Card.Text>
                    <Dropdown>
                        <Dropdown.Toggle>Select Template</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.keys(templates).map((t) => (
                                <Dropdown.Item key={t} onClick={() => loadTemplate(t)}>
                                    {t}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                </Row>
                </Card.Body>
                <Card.Footer>You can always modify an imported template!</Card.Footer>
            </Card> :<>
            <Card className="mb-4"><Card.Body className="text-center">Fill out all the details above and click continue to see the rest of the field builder</Card.Body></Card>
            </>}
            
            
            { firstStep ? 
            <Card className="p-3 mb-4">
                <h3>Add New Field</h3>
                    <Container>
                        <Form.Group className="mb-2">
                            <Form.Label>Label</Form.Label>
                            <Form.Control
                                value={newFieldLabel}
                                onChange={(e) => setNewFieldLabel(e.target.value)}
                                placeholder="e.g. Salary Expectations, Resume, Phone Number"
                            />
                        </Form.Group>
                    </Container>

                    <Container>
                        <Form.Group className="mb-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={newFieldDescription}
                                onChange={(e) => setNewFieldDescription(e.target.value)}
                                placeholder="If you'd like to clarify what the field means this description will be added as a tooltip"
                            />
                        </Form.Group>
                    </Container>                    
                    
                    <Container>
                        <Form.Group className="mb-2">
                            <Form.Label>Input Type</Form.Label>
                            <Form.Select
                                value={newFieldType}
                                onChange={(e) => setNewFieldType(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a field input type
                                </option>
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="textarea">Long Text</option>
                                <option value="file">File Upload</option>
                                <option value="date">Date</option>
                            </Form.Select>
                        </Form.Group>
                    </Container>
                    
                    <Container>
                        <Form.Group className="d-flex align-items-center mb-2">
                            <Form.Check
                                className="mb-2 me-2"
                                value={newFieldRequired}
                                checked={newFieldRequired}
                                onChange={() => setNewFieldRequired(prev => !prev)}
                            >
                            </Form.Check>
                            <Form.Label className="me-3">Required Field?</Form.Label>
                        </Form.Group>
                    </Container>

                    <Container>
                        <Button className="w-100" disabled={!newFieldLabel || !newFieldType} onClick={addField}>Add Field</Button>
                    </Container>
            </Card> : <></>}
            </Form>
            
            { firstStep ?
            <Card className="p-3">
                <h3 className="text-center">Preview Job Posting</h3>
                <Container>
                    {
                        postingDetails.map((d, i) => {
                            return <Container key={i}>
                                <h1>{d.position}</h1>
                                <p><em>{getEmployeeType(d.empType)} Position</em></p>
                                <p>Location(s): {d.locations}</p>
                                <Markdown>{d.summary}</Markdown>
                                {d.minQ ? <div><p className="fw-bold">Minimum Qualifications:</p><Markdown>{d.minQ}</Markdown></div> : <></>}
                                {d.prefQ ? <div><p className="fw-bold">Preferred Qualifications:</p><Markdown>{d.prefQ}</Markdown></div> : <></>}
                            </Container>
                        })
                    }
                </Container>
                <hr className="border-2 border-top border-primary" />
                {fields.length === 0 && <p className="fst-italic text-center text-muted">No fields added yet.</p>}

                <Form>
                    {fields.map((f, i) => {
                        if (f.input === "checkbox") {
                            return (
                                <Form.Group className="mb-5" key={i}>
                                    <div className="d-flex align-items-center mb-2">
                                        <Form.Label className="me-3">{f.label}</Form.Label>
                                        <Form.Check className="mb-2" type="checkbox"/>
                                    </div>
                                    <Button className="me-3" onClick={() => handleRemove(f.id)} variant="outline-danger">Remove Field</Button>
                                    <Button className="me-3" onClick={() => handleMoveUp(f.id)} disabled={i===0} variant="secondary">Move Up</Button>
                                    <Button onClick={() => handleMoveDown(f.id)} disabled={fields.length-1===i} variant="secondary">Move Down</Button>
                                </Form.Group>
                            );
                        } else {
                            return (
                                <Form.Group className="mb-5" key={i}>
                                    <Form.Label>{f.label}{f.required ? <span className="text-danger"> *</span> : <></>}</Form.Label>
                                    <Form.Control className="mb-3" disabled placeholder={`The applicant's response to \"${f.label}\"`} type={f.input} required={f.required}/>
                                    <Button className="me-3" onClick={() => handleRemove(f.id)} variant="outline-danger">Remove Field</Button>
                                    <Button className="me-3" onClick={() => handleMoveUp(f.id)} disabled={i===0} variant="secondary">Move Up</Button>
                                    <Button onClick={() => handleMoveDown(f.id)} disabled={fields.length-1===i} variant="secondary">Move Down</Button>
                                </Form.Group>
                            );
                        }
                    })}
                </Form>
            </Card> : <></>}
            
            <Container className="mt-3 text-end">
                <Button as={Link} to="/recruitment/home" className="me-md-3" variant="danger">Close and Delete</Button>
                {firstStep ? <Button onClick={handlePublishPost} disabled={!canPublish && !fields.length>0} variant="success">Publish</Button> : <></>}
            </Container> 
        </Container>
  );
}