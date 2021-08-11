import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button,Container} from 'react-bootstrap';
import { NavLink, Link, useHistory } from 'react-router-dom';
import userType from './checkUser'
import {LinkContainer} from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faCartPlus} from '@fortawesome/free-solid-svg-icons';

export default function Header( {user} ) {
    const history = useHistory();


    return ( 
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand >Job Sanjal</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        {user && user['seekername'] &&
                        <NavLink className="nav-link" to="/seeker/recommendation">Recommended</NavLink>
                        }
                </Nav>
                <Nav>
                        {!user && <React.Fragment>

                            <NavDropdown title="Login" id="basic-nav-dropdown">
                                

                                    <NavDropdown.Item href="/company/login">Company Login</NavDropdown.Item>
                                <NavDropdown.Item href="/seeker/login">Seeker Login</NavDropdown.Item>

                               

                            </NavDropdown>
                        </React.Fragment>
                        }
                        
                        {!user && <React.Fragment>

                            <NavDropdown title="Signup" id="basic-nav-dropdown">
                                <NavDropdown.Item ><NavLink className="nav-link" style={{color:"black"}} to="/company">Company Signup</NavLink></NavDropdown.Item>
                                <NavDropdown.Item><NavLink className="nav-link" style={{color:"black"}} to="/seeker">Seeker Signup</NavLink></NavDropdown.Item>

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
                                <NavLink className="nav-link" to="/jobs/appliedjobs">Applied Jobs </NavLink>

                                <NavDropdown title={user["seekername"]} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/seeker/userprofile/">My Profile</NavDropdown.Item>
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
                    

                </Navbar.Collapse>
                </Container>
                
            </Navbar>

        </header>
    )
}