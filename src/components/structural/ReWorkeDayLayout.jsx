import { Outlet } from "react-router";
import ReWorkeDayNavbar from "./ReWorkeDayNavbar";
import ReWorkeDayFooter from "./ReWorkeDayFooter";


function ReWorkeDayLayout(props) {
    return (
        <div className="siteBackground" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <ReWorkeDayNavbar />
            

            <div style={{flexGrow: 1 }} className=".bg-body-secondary">
                <Outlet />
            </div>
            
            <ReWorkeDayFooter/>
        </div>
    );
}

export default ReWorkeDayLayout;