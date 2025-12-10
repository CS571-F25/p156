import { useEffect } from "react";
import Posting from '../../structural/Posting';
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';
import { Link } from "react-router"
import { Button, Container } from "react-bootstrap"

import { useUser } from "../../contexts/SignedInStatus";

export default function CreatePosting() {
    const { user, setUser } = useUser();


    useEffect(() => {
        document.title = "ReWorkeDay | Create Posting";
    }, []);


    return (
        <>
        {
        user.role == Constants.Roles.Recruiter ?
            <Container>
                <h1 className='text-center display-1'>Create Posting</h1>
                <Button as={Link} to="/recruitment/home"><i class="bi bi-chevron-left"></i>Back</Button>
                <Posting/>

            </Container>
            :
            <AccessDenied role={Constants.Roles.Recruiter}/>
        }
        </>
    )
}
