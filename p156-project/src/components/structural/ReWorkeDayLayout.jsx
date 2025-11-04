import React, { useEffect, useState, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";
import ReWorkeDayNavbar from "./ReWorkeDayNavbar";
import ReWorkeDayFooter from "./ReWorkeDayFooter";


function ReWorkeDayLayout(props) {
    return (
        <div>
            <ReWorkeDayNavbar />
            <Outlet />
            <ReWorkeDayFooter />
        </div>
    );
}

export default ReWorkeDayLayout;