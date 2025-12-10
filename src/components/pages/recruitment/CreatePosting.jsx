import { useEffect } from "react";
import Posting from '../../structural/Posting';
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';

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
            <div>
                <h1 className='text-center display-1'>Create Posting</h1>
                <Posting/>

            </div>
            :
            <AccessDenied role={Constants.Roles.Recruiter}/>
        }
        </>
    )
}
