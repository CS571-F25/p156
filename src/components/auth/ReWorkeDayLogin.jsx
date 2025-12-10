import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router';

import { useUser } from "../contexts/SignedInStatus";

import { db, auth } from "../../firebase"; 
import { doc, getDoc } from "firebase/firestore";

import { GoogleLogin } from '@react-oauth/google';
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

export default function ReWorkeDayLogin() {

    const navigateToRoute = useNavigate();
    const [error, setError] = useState([false, ""]);
    const { user, setUser } = useUser();

    async function checkIfExists(uid) {
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);
        
        const data = snap.data();
        const role = data.role;
        const name = data.displayName;
        const pic = data.photo;

        return [snap.exists(), role, name, pic];
    }

    useEffect(() => {
        document.title = "ReWorkeDay | Login";
    }, []);

    return <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-grow-1">
        <Row className="justify-content-center">
            <Col xs="auto">
                <Card style={{maxWidth: "30rem"}}>
                    <Card.Body className="p-5">
                        <Card.Title className="text-center h-1 py-3">
                            <h1 className="fs-1">Log In</h1>
                        </Card.Title>

                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                const idToken = credentialResponse.credential;
                                const credential = GoogleAuthProvider.credential(idToken);

                                signInWithCredential(auth, credential)
                                    .then((result) => {
                                        const check = checkIfExists(result.user.uid);
                                        check.then(val => {
                                            if (val[0]) {
                                                setUser({
                                                    uid: result.user.uid,
                                                    name: val[2],
                                                    role: val[1],
                                                    photo: val[3],
                                                })
                                                
                                                if (val[1] === "1") {
                                                    navigateToRoute("/applicant/home");
                                                } else {
                                                    navigateToRoute("/recruitment/home");
                                                }
                                            } else {
                                                setError([true, `Account for ${val[2]} (${result.user.uid}) already exists!`])
                                            }
                                        })
                                    })
                                    .catch((err) => {
                                        console.error("❌ Firebase login error:", err);
                                    });
                            }}
                            onError={() => console.log("❌ Google login failed")}
                            useOneTap={false}
                            shape="pill"
                            theme="outline"
                            size="large"
                        />
                    </Card.Body>
                    {
                        error[0] ?
                            <Card.Footer>
                                <p className="text-center" style={{color: "red"}}>{error[1]}</p>
                            </Card.Footer>
                            :
                            <></>
                    }
                </Card>
            </Col>
        </Row>
    </Container>
}
