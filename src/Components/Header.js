import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';


export default function Header() {
    const history = useHistory()
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
                        <Nav.Link href="/company/login">Login</Nav.Link>
                        <Nav.Link href="/company/">Signup</Nav.Link>

                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                onClick={() => {
                                    localStorage.removeItem("companyInfo");
                                    history.push("/")

                                }}>Logout</NavDropdown.Item>
                        </NavDropdown>
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
