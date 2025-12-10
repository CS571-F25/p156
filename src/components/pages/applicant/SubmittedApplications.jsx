import { useEffect, useState } from "react";
import Constants from '../../../Constants';
import AccessDenied from '../AccessDenied';

import { useUser } from "../../contexts/SignedInStatus";

import { db } from "../../../firebase"; 
import { getDocs, collectionGroup } from "firebase/firestore";

export default function SubmittedApplications() {

    const { user, setUser } = useUser();

    const [fetchedApplications, setFetchedApplications] = useState([]);

    useEffect(() => {
        document.title = "ReWorkeDay | My Submitted Applications";

        const fetchPosts = async () => {
            const q = collectionGroup(db, "recieved-applications");
            const snapshot = await getDocs(q);

            snapshot.forEach(doc => {
                setFetchedApplications([...fetchedApplications, doc.data()])
            });
        };
        fetchPosts()
    }, []);
    
    
    return (
        <>
        {
            user.role === Constants.Roles.Applicant ?
            <div>
                <h1>Submitted Applications</h1>
            </div>
            :
            <AccessDenied role={Constants.Roles.Applicant}/>
        }
        </>
    )
}
