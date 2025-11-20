import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Dropdown } from "react-bootstrap";

export default function Posting() {
  const templates = {
    Basic: [
      { label: "Job Title", type: "text" },
      { label: "Location", type: "text" },
      { label: "Description", type: "textarea" },
    ],
    Technical: [
      { label: "Job Title", type: "text" },
      { label: "Required Skills", type: "textarea" },
      { label: "Years of Experience", type: "number" },
    ],
    Internship: [
      { label: "Position Name", type: "text" },
      { label: "Mentor", type: "text" },
      { label: "Duration", type: "text" },
    ],
  };

  const [fields, setFields] = useState([]);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");

  const addField = () => {
    if (!newFieldLabel.trim()) return;
    setFields([...fields, { label: newFieldLabel, type: newFieldType }]);
    setNewFieldLabel("");
  };

  const loadTemplate = (name) => {
    setFields(templates[name] || []);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Job Posting Field Builder</h2>

      <Card className="p-3 mb-4">
        <Row>
          <Col md={6}>
            <h5>Import Template</h5>
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
        <h5>Add New Field</h5>
        <Row className="align-items-end">
          <Col md={5}>
            <Form.Group className="mb-2">
              <Form.Label>Label</Form.Label>
              <Form.Control
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                placeholder="e.g. Salary, Requirements"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="textarea">Long Text</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Button className="w-100" onClick={addField}>Add Field</Button>
          </Col>
        </Row>
      </Card>

      <Card className="p-3">
        <h5>Preview Fields</h5>
        {fields.length === 0 && <p className="text-muted">No fields added yet.</p>}
        <Form>
          {fields.map((f, i) => (
            <Form.Group className="mb-3" key={i}>
              <Form.Label>{f.label}</Form.Label>
              {f.type === "textarea" ? (
                <Form.Control as="textarea" rows={3} />
              ) : (
                <Form.Control type={f.type} />
              )}
            </Form.Group>
          ))}
        </Form>
      </Card>
    </Container>
  );
}