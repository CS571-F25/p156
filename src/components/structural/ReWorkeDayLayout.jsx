import React, { useEffect, useState, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";
import ReWorkeDayNavbar from "./ReWorkeDayNavbar";
import ReWorkeDayFooter from "./ReWorkeDayFooter";


function ReWorkeDayLayout(props) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <ReWorkeDayNavbar />

                <div className="flex-grow-1 d-flex">
                    <Outlet />
                </div>

            <ReWorkeDayFooter />
        </div>
    );
}

export default ReWorkeDayLayout;