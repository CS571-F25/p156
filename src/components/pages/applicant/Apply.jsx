import { useEffect } from "react";
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';

import { useUser } from "../../contexts/SignedInStatus";


export default function Apply() {
    const { user, setUser } = useUser();


    useEffect(() => {
        document.title = "ReWorkeDay | Applying";
    }, []);


    return (
        <>
        {
        user.role === Constants.Roles.Applicant ?
            <div>
                <h1>apply page!</h1>

            </div>
            :
            <AccessDenied role={Constants.Roles.Applicant}/>
        }
        </>
    )
}
