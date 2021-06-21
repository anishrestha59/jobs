import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, NavLink} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import checkUser from './checkUser'

export default function Header( {user} ) {
    const history = useHistory();




    return (
        <div className="Container">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Job Sanjal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users/add">Recommended</Nav.Link>
                        <Nav.Link href="/jobs/create">Create Jobs </Nav.Link>

                        {!user && <React.Fragment>

                            <NavDropdown title="Login" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/company/login">Company Login</NavDropdown.Item>
                                <NavDropdown.Item href="/seeker/login">Seeker Login</NavDropdown.Item>

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
                        {user &&
                            <React.Fragment>

                                <NavDropdown title="Profile" id="basic-nav-dropdown">
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
