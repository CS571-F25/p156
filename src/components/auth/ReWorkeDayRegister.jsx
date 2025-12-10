import { useEffect, useState } from "react";
import { Form, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from 'react-router';

import { setDoc, doc, getDoc } from "firebase/firestore";
import { app, db } from "../../firebase"; 

import { GoogleLogin } from '@react-oauth/google';
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { useUser } from "../contexts/SignedInStatus";



export default function ReWorkeDayRegister() {

    const navigateToRoute = useNavigate();
    
    const [roleSelected, setRoleSelected] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [error, setError] = useState([false, ""]);
    const [tip, setTip] = useState([false, ""]);

    const { user, setUser } = useUser();


    useEffect(() => {
        document.title = "ReWorkeDay | Register";
    }, []);

    function handleRoleSelectChange(e) {
        setError([false, ""])
        setRoleSelected(true);
        setRoleName(e.target.value);
        console.log(roleName)
    }

    async function writeNewUser(uid, name, role, photo) {
        await setDoc(doc(db, "users", uid), {
            "displayName": name,
            "role": role,
            "photo": photo
        });
    }

    async function checkIfExists(uid) {
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);

        return [snap.exists()];
    }

    const auth = getAuth(app);
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-grow-1">
        <Row className="justify-content-center">
            <Col xs="auto">
                <Card style={{maxWidth: "30rem"}}>
                    <Card.Body className='p-5'>
                        <Card.Title className="text-center h-1 py-3">
                            <h1 className="fs-1">Register</h1>
                        </Card.Title>

                        <Form.Select
                            style={{borderRadius: "5rem"}}
                            aria-label="Select user role"
                            value={roleName}
                            onChange={handleRoleSelectChange}>
                                <option value="" disabled>
                                    Select your role
                                </option>
                                <option value="1">Applicant</option>
                                <option value="2">HR and Hiring Managers</option>
                        </Form.Select>
                        
                        <div className='py-2'></div>

                        {
                        roleSelected ?
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                const idToken = credentialResponse.credential;
                                const credential = GoogleAuthProvider.credential(idToken);

                                signInWithCredential(auth, credential)
                                    .then((result) => {
                                        
                                        const check = checkIfExists(result.user.uid);

                                        check.then(usrData => {
                                            if (usrData[0]) {
                                                setTip([true, `Account for ${result.user.displayName} (${result.user.uid}) already exists! Try logging in instead!`])
                                            } else {


                                                writeNewUser(result.user.uid, result.user.displayName, roleName, result.user.photoURL);
                                                
                                                setUser({
                                                    uid: result.user.uid,
                                                    name: result.user.displayName,
                                                    role: roleName,
                                                    photo: result.user.photoURL,
                                                })
                                                
                                                if (roleName === "1") {
                                                    navigateToRoute("/submitted");
                                                } else {
                                                    navigateToRoute("/recruitment/home");
                                                }
                                            }
                                        })
                                    })
                                    .catch((err) => {
                                        setError([true, "Sorry, an unexpected error occured with Firebase Login."])
                                        console.error("❌ Firebase login error:", err);
                                    });

                            } // this is end of onSuccess callback function
                            } // this is the end of onSuccess property
                            onError={() => setError([true, "Google login failed"])}
                            useOneTap={false}
                            shape="pill"
                            theme="outline"
                            size="large"
                        />
                        :
                        <></>
                        }
                    </Card.Body>
                    {
                        error[0] ?
                            <Card.Footer>
                                <p className="text-center" style={{color: "red"}}>{error[1]}</p>
                            </Card.Footer>
                            :
                            <></>
                    }
                    {
                        tip[0] ?
                            <Card.Footer>
                                <p className="text-center" style={{color: "blue"}}> {tip[1]} </p>
                                <Link className="d-block text-center" as={Link} to="/login">Take me there!</Link>
                            </Card.Footer>
                            :
                            <></>
                    }
                </Card>
            </Col>
        </Row>
    </Container>
    );
}
