import React, { useEffect, useState, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";
import ReWorkeDayNavbar from "./ReWorkeDayNavbar";
import ReWorkeDayFooter from "./ReWorkeDayFooter";


function ReWorkeDayLayout(props) {
    return (
        <div className="siteBackground" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* <div> */}
            <ReWorkeDayNavbar />
            

            <div style={{flexGrow: 1 }} className=".bg-body-secondary">
                <Outlet />
            </div>
            
            <ReWorkeDayFooter/>

        </div>


    );


    // return (
    //     // <div className="d-flex flex-column min-vh-100">
    //     <div>
    //         <ReWorkeDayNavbar />

    //             <div className="">
    //                 <Outlet />
    //             </div>

    //         <ReWorkeDayFooter />
    //     </div>
    // );
}

export default ReWorkeDayLayout;