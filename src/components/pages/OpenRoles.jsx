import { useEffect, useState } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";

import { db } from "../../firebase"; 
import { collection, getDocs } from "firebase/firestore";

import Role from "../structural/Role";


export default function OpenRoles() {

    const [postedApplications, setPostedApplications] = useState([]);

    useEffect(() => {
        document.title = "ReWorkeDay | Open Roles";

        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posted-applications"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPostedApplications(data)
        }

        fetchPosts()
    }, []);

    
    return (
        <Container className="py-4">
            <h1 className='text-center pb-2'>Open Roles</h1>
            <Card className="mb-5" style={{height: "5rem"}} />
            <Row className="gy-3">
                {postedApplications.map((item, v) => {
                    return <Col key={v+10} xs={6} md={4}>
                        <Role key={v} {...item} jobid={item.id}/>
                    </Col>
                })
                }
            </Row>
        </Container>
    );
}
