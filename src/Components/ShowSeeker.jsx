import React, { Component } from 'react';
import axios from 'axios';


import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser, faVenusMars, faMapMarked, faUniversity, faMoneyBillAlt, faGraduationCap, faUsers } from '@fortawesome/free-solid-svg-icons';

class ShowSeeker extends Component {
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
        const appliedid = this.props.match.params.id;
        this.getAppliedInfo(appliedid);
        this.setState({
            appliedid
        });

    }


    getAppliedInfo = async (appliedid) => {

        await axios.get(`http://localhost:5000/appliedjobs/getdetail/${appliedid}`)
            .then(response => {
                this.setState({ appliedinfo: response.data });
                this.getSeekerInfo(response.data.seekerid);
            })

            .catch((err) => {
                console.log(err);
            });

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

    updateMessage = async (message) => {
        const updateData = {
            seekerid: this.state.appliedinfo.seekerid,
            jobid: this.state.appliedinfo.jobid,
            message
        }


        await axios.post(`http://localhost:5000/appliedjobs/update/${this.state.appliedinfo._id}`, updateData)
            .then((res) => {
                console.log(res.data);
                toast.success("sent");
            }).catch((err) => {
                console.log(err);
                toast.error("error occured sending");
            })

    }

    handleMessage = (e) => {
        if (e.currentTarget.id === "Invited") {
            let message;
            message = e.currentTarget.id + " " + this.state.date.toString();
            this.updateMessage(message);


        } else if (e.currentTarget.id === "Rejected") {
            this.updateMessage(e.currentTarget.id);

        }
        else if (e.currentTarget.id === "On wait") {
            this.updateMessage(e.currentTarget.id);
        }
    }

    changeDate = (Date) => {
        
        this.setState({
            date: Date
        });
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
                    Response: {this.state.appliedinfo['message']}
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
                                
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faGraduationCap} /> Skill : {this.state.seekerinfo['currentskill']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faGraduationCap} /> Best at : {this.state.seekerinfo['bestat']} </Card.Subtitle>
                                
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faUniversity} /> experience: {this.state.seekerinfo['experience']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faMapMarked} /> address: {this.state.seekerinfo['seekeraddress']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faMoneyBillAlt} /> current salary : {this.state.seekerinfo['salary']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faPhone} /> contact : {this.state.seekerinfo['contact']} </Card.Subtitle>
                                <Card.Subtitle className="mb-2 my-3 text-muted">  Resume : <Link to={this.state.seekerinfo['resume']}>{this.state.seekerinfo['resume']}</Link>  </Card.Subtitle>
                                

                            </Card.Body>


                        </Card>

                    </Col>

                    <Col md={4} >
                        <Image src={'/' + this.state.seekerinfo.profile} rounded fluid width="400" height="200" alt={this.state.seekerinfo.profile} />

                    </Col>

                </Row>
                <Row>
                    <Col md={12} >
                        <Card className='my-5'>
                            <Card.Body>
                                <div className=' my-3 d-flex justify-content-center'>
                                    <Card.Title className="bg-dark text-white">Response to seeker</Card.Title>
                                </div>
                                <Row>
                                    <div className="mb-3"> Invite In: 
                                                <DatePicker
                                                   
                                                    selected={this.state.date}
                                                    onChange={this.changeDate}
                                                />
                                                </div>
                                    <Col md={4} >
                                        <div className="d-grid gap-2">
                                           
                                     
                                          
                                            <Button variant="outline-success"
                                                size="lg"
                                                id="Invited"
                                                onClick={this.handleMessage}>
                                                INVITE ON { (this.state.date.toString()).substring(3, 15)   }
                                            </Button>

                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="d-grid gap-2">
                                            <Button variant="outline-info"
                                             size="lg"
                                             id="On wait" onClick={this.handleMessage}
                                             >
                                             WAIT
                                            </Button>

                                        </div>
                                    </Col>
                                    <Col md={4}>

                                        <div className="d-grid gap-2">
                                            <Button variant="outline-danger" size="lg"
                                            id="Rejected" onClick={this.handleMessage}>
                                                Rejected
                                            </Button>

                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                    </Col>

                </Row>

            </React.Fragment>
        );
    }
}

export default ShowSeeker;