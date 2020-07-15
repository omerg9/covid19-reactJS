import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavMenu = () => {
    return (
        <>
            <Navbar
                sticky="top"
                id="navbar"
                expand="lg"
                className="navbar navbar-expand-lg navbar-light"
                collapseOnSelect={true}
            >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <h1 id="appName">Covid Dashboard</h1>
                        <NavLink
                            activeClassName="active"
                            to="/"
                            offset={-70}
                            duration={800}
                            className="nav-link"
                            exact={true}
                        >
                            Top Ten Cases
                        </NavLink>

                        <NavLink
                            activeClassName="active"
                            to="/top-increase-rate"
                            offset={-70}
                            duration={800}
                            className="nav-link"
                        >
                            Top Increase Rate
                        </NavLink>
                        <NavLink
                            activeClassName="active"
                            to="/most-stable"
                            offset={-70}
                            duration={800}
                            className="nav-link"
                        >
                            Top Stable
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavMenu
