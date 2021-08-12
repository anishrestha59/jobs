import React, { Component } from 'react';
import axios from 'axios';


import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser, faVenusMars, faMapMarked, faUniversity, faMoneyBillAlt, faGraduationCap, faUsers } from '@fortawesome/free-solid-svg-icons';

class AdminShowSeeker extends Component {
    constructor() {
        super();
        this.state = {
            date: new Date(),
            appliedid: "",
            appliedinfo: {},
            seekerinfo: {}
        }

    }

    componentDidMount() {

this.getSeekerInfo(this.props.match.params.id);

}

    getSeekerInfo = (seekerid) => {
        axios.get('http://localhost:5000/seeker/' + seekerid)
            .then(response => {
                this.setState({ seekerinfo: response.data });
            })
            .catch((err) => {
                console.log(err);
            })
    }




    render() {
        return (
            <React.Fragment>
                <Row><div className='col-2'>
                <Link className='btn btn-dark my-3' to='/'>
                    GO Back
                </Link>
                </div>
                <div className="col-6 text-info" >
                 
                </div>
                </Row>
                <Row>

                    <Col md={8} >
                        <Card >
                            <Card.Body>
                                <Card.Title className="bg-dark text-white">seeker Details</Card.Title>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faUser} /> Name: {this.state.seekerinfo['seekername']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faVenusMars} /> gender : {this.state.seekerinfo['gender']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faUsers} /> age : {this.state.seekerinfo['age']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faGraduationCap} /> skill : {this.state.seekerinfo['skills']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faUniversity} /> experience: {this.state.seekerinfo['experience']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faMapMarked} /> address: {this.state.seekerinfo['seekeraddress']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faMoneyBillAlt} /> current salary : {this.state.seekerinfo['salary']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faPhone} /> contact : {this.state.seekerinfo['contact']} </Card.Subtitle>

                            </Card.Body>


                        </Card>

                    </Col>

                    <Col md={4} >
                        <Image src={'/' + this.state.seekerinfo.profile} rounded fluid width="400" height="200" alt={this.state.seekerinfo.profile} />

                    </Col>

                </Row>
          

            </React.Fragment>
        );
    }
}

export default AdminShowSeeker;