import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Dropdown } from "react-bootstrap";

export default function Posting() {
    const templates = {
        "Standard Employee": [
            { type: "info", label: "Introduction", description: "this would be a summary!", input: "none", required: false},
            { type: "form", label: "First Name", description: "", input: "text", required: true},
            { type: "form", label: "Last Name", description: "", input: "text", required: true},
            { type: "form", label: "Preferred Name", description: "", input: "text", required: true},
            { type: "form", label: "Email", description: "", input: "text", required: true},
            { type: "form", label: "Phone Number", description: "Please only type the numbers", input: "number", required: true},
            { type: "form", label: "How did you hear about us?", description: "", input: "text", required: false},
            { type: "form", label: "Resume", description: "", input:"file", required: true},
            { type: "form", label: "Education", description: "", input:"text", required: true},
            { type: "form", label: "Are you willing to relocate?", description: "", input:"checkbox", required: true},
            { type: "form", label: "First day available to work", description: "", input:"date", required: true},
            { type: "form", label: "Expected salary (USD)", description: "", input:"number", required: true},
            { type: "form", label: "Message to hiring team", description: "", input:"textarea", required: false},
        ],
        Intern: [
            { type: "info", label: "Introduction", description: "this would be a summary!", input: "none", required: false},
            { type: "form", label: "First Name", description: "", input: "text", required: true},
            { type: "form", label: "Last Name", description: "", input: "text", required: true},
            { type: "form", label: "Preferred Name", description: "", input: "text", required: true},
            { type: "form", label: "Email", description: "", input: "text", required: true},
            { type: "form", label: "Phone Number", description: "Please only type the numbers", input: "number", required: true},
            { type: "form", label: "Resume", description: "", input:"file", required: true},
            { type: "form", label: "University/College Name", description: "", input:"text", required: true},
            { type: "form", label: "Major", description: "", input:"text", required: true},
            { type: "form", label: "Minor/Certificates/Concentrations", description: "", input:"text", required: false},
            { type: "form", label: "GPA", description: "Please enter on a 4.0 scale", input:"number", required: true},
            { type: "form", label: "Are you willing to relocate?", description: "", input:"checkbox", required: true},
            { type: "form", label: "Message to hiring team", description: "", input:"textarea", required: false},
        ],
        Contract: [
            { type: "info", label: "Introduction", description: "this would be a summary!", input: "none", required: false},
            { type: "form", label: "First Name", description: "", input: "text", required: true},
            { type: "form", label: "Last Name", description: "", input: "text", required: true},
            { type: "form", label: "Preferred Name", description: "", input: "text", required: true},
            { type: "form", label: "Email", description: "", input: "text", required: true},
            { type: "form", label: "Phone Number", description: "Please only type the numbers", input: "number", required: true},
            { type: "form", label: "Resume", description: "", input:"file", required: false},
            { type: "form", label: "Describe your previous contract work, or related experience related to this position", description: "", input:"textarea", required: true},
            { type: "form", label: "Are you willing to relocate?", description: "", input:"checkbox", required: true},
            { type: "form", label: "Message to hiring team", description: "", input:"textarea", required: false},
        ], 
    };
    
    const [fields, setFields] = useState([]);
    const [empType, setEmpType] = useState("");
    const [minQ, setMinQ] = useState(false);
    const [prefQ, setPrefQ] = useState(false);

    const [newFieldLabel, setNewFieldLabel] = useState("");
    const [newFieldDescription, setNewFieldDescription] = useState("");
    const [newFieldType, setNewFieldType] = useState("");
    const [newFieldRequired, setNewFieldRequired] = useState(false);
    
    const [canPublish, setCanPublish] = useState(fields.length !== 0);

    const addField = () => {
        if (!newFieldLabel.trim()) return;
        setFields([...fields, { type: "form", label: newFieldLabel, description: newFieldDescription, input: newFieldType, required: newFieldRequired }]);
        setNewFieldLabel("");
        setNewFieldDescription("");
        setNewFieldType("");
        setNewFieldRequired(false);
        setCanPublish(true);
    };
    
    const removeField = () => {
        
    }

    const loadTemplate = (name) => {
        setFields(templates[name] || []);
    };

    const handleRemove = () => {

    }

    const handleMoveUp = () => {
        
    }

    const handleMoveDown = () => {
        
    }

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
                                    placeholder="e.g. Cybersecurity Intern"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="mb-4">
                                <Form.Label>Employment Type</Form.Label>
                                <Form.Select
                                    value={empType}
                                    onChange={(e) => setEmpType(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select an employment type
                                    </option>
                                    <option value="1">Full Time</option>
                                    <option value="2">Part Time</option>
                                    <option value="3">Internship</option>
                                    <option value="4">Contract</option>
                                    <option value="5">Other</option>
                                </Form.Select>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="mb-4">
                                <Form.Label>Summary</Form.Label>
                                <Form.Control
                                    placeholder="Write a summary of what applicants can expect the job to entail!"
                                    as="textarea"
                                    className="w-100"
                                    rows={4}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="mb-4">
                                <Form.Label>Location(s)</Form.Label>
                                <Form.Control
                                    placeholder="e.g. Madison, WI, New York, NY, Houston, TX"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="d-flex align-items-center mb-2">
                                <Form.Label className="me-3">Add minimum qualifications?</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    onChange={() => setMinQ(prev => !prev)}
                                />
                            </div>
                            {
                                minQ ?
                                <div className="mb-4">
                                    <Form.Label>Minimum Qualifications</Form.Label>
                                    <Form.Control
                                        className="align-middle"
                                        placeholder="e.g. willingness to learn!"
                                        as="textarea"
                                    />
                                </div>
                                :
                                <></>
                            }
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className="d-flex align-items-center mb-2">
                                <Form.Label className="me-3">Add preferred qualifications?</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    onChange={() => setPrefQ(prev => !prev)}
                                />
                            </div>

                            {
                                prefQ ?
                                <div className="mb-4">
                                    <Form.Label>Preferred Qualifications</Form.Label>
                                    <Form.Control
                                        className="align-middle"
                                        placeholder="e.g. penetration testing, database security"
                                        as="textarea"
                                    />
                                </div>
                                :
                                <></>
                            }
                        </Form.Group>
                    </Col>
                </Row>
            </Card>

            <Card className="p-3 mb-4">
                <Row>
                    <Col md={6}>
                    <h3>Import Template</h3>
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
            </Card>
            
            
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
                        <Button className="w-100" onClick={addField}>Add Field</Button>
                    </Container>
            </Card>
            </Form>
            
            <Card className="p-3">
                <h3>Preview Posting</h3>
                {fields.length === 0 && <p className="text-muted">No fields added yet.</p>}
                <Form>
                    {fields.map((f, i) => {
                        if (f.input === "checkbox") {
                            return (
                                <Form.Group className="mb-3" key={i}>
                                    <div className="d-flex align-items-center mb-2">
                                        <Form.Label className="me-3">{f.label}</Form.Label>
                                        <Form.Check className="mb-2" type="checkbox"/>
                                    </div>
                                    <Button onClick={handleRemove} disabled variant="outline-danger">Remove Field</Button>
                                    <Button onClick={handleMoveUp} disabled={i===0} variant="secondary">Move Up</Button>
                                    <Button onClick={handleMoveDown} disabled={fields.length-1===i} variant="secondary">Move Down</Button>
                                </Form.Group>
                            );
                        } else {
                            return (
                                <Form.Group className="mb-3" key={i}>
                                    <Form.Label>{f.label}</Form.Label>
                                    <Form.Control disabled placeholder={`The applicant's response to \"${f.label}\"`} type={f.input} required={f.required}/>
                                    <Button onClick={handleRemove} disabled variant="outline-danger">Remove Field</Button>
                                    <Button onClick={handleMoveUp} disabled={i===0} variant="secondary">Move Up</Button>
                                    <Button onClick={handleMoveDown} disabled={fields.length-1===i} variant="secondary">Move Down</Button>
                                </Form.Group>
                            );
                        }
                    })}
                </Form>
            </Card>
            
            <Container className="mt-3 text-end">
                <Button className="me-md-3" variant="danger">Close and Delete</Button>
                <Button disabled={!canPublish} variant="success">Publish</Button>
            </Container>
        </Container>
  );
}