import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink, Link, useHistory } from 'react-router-dom';
import userType from './checkUser'

export default function Header( {user} ) {
    const history = useHistory();


    return (
        <div className="Container">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Job Sanjal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/users/add">Recommended</NavLink>

                        {!user && <React.Fragment>

                            <NavDropdown title="Login" id="basic-nav-dropdown">
                                <NavDropdown.Item className="small">
                                    <Link className="nav-link" to="/company/login">Company Login</Link>
                                    </NavDropdown.Item>
                                <NavDropdown.Item> 
                                    <Link className="nav-link" to="/seeker/login">Seeker Login</Link>
                                </NavDropdown.Item>

                            </NavDropdown>
                        </React.Fragment>
                        }
                        
                        {!user && <React.Fragment>

                            <NavDropdown title="Signup" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/company">Company Signup</NavDropdown.Item>
                                <NavDropdown.Item href="/seeker">Seeker Signup</NavDropdown.Item>

                            </NavDropdown> 
                        </React.Fragment>
                        }
                        {user && user["companyname"] &&
                            
                            <React.Fragment>

                                <NavLink className="nav-link" to="/jobs/create">Create Jobs </NavLink>
                                <NavDropdown title={user["companyname"]} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/userprofile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => {
                                            localStorage.removeItem("UserData");
                                            window.location = "/";

                                        }}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                <NavLink className="nav-link" to="/company/myjobs">My jobs</NavLink>
                            </React.Fragment>
                        }
                           {user && user["seekername"] &&
                            <React.Fragment>

                                <NavDropdown title={user["seekername"]} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => {
                                            localStorage.removeItem("UserData");
                                            window.location = "/";

                                        }}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </React.Fragment>
                        }
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}
