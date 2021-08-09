import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button,Container} from 'react-bootstrap';
import { NavLink, Link, useHistory } from 'react-router-dom';

import {LinkContainer} from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faCartPlus} from '@fortawesome/free-solid-svg-icons';

export default function Header(){


    return (
        <React.Fragment>
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <LinkContainer to='/admin'>
                    <Navbar.Brand >Admin</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/admin/jobtype">Jobtype</NavLink>
                        <NavLink className="nav-link" to="/admin">something</NavLink>
                </Nav>
                <Nav>
                   
                        
                    
                    </Nav>
                    

                </Navbar.Collapse>
                </Container>
                
            </Navbar>

        </header>
        </React.Fragment>
    );
}