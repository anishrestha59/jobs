import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBuilding } from '@fortawesome/free-solid-svg-icons';



export default class ShoCompany extends Component {
  state = {
    currentUser: {},
  
    companyDetails: {},

  };

 async componentDidMount() {
    const user = localStorage.getItem("UserData");
    let parsedData = JSON.parse(user);
    this.setState({
      currentUser: parsedData
    })
    
    let companyid = this.props.match.params.id;
      this.getCompanyData(companyid);
     
        
  }


  getCompanyData = (companyid) => {
    axios.get(`http://localhost:5000/company/getdetails/${companyid}`)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          companyDetails: response.data,
        });
      });
      
  };

            
  render() {
    

    return (
      <React.Fragment>
        <Row>
          <Col md={6} >
            {console.log(this.state.companyDetails)}
            <Image src= {`/${this.state.companyDetails['profile']}`} alt={this.state.companyDetails['profile']} rounded  fluid alt={this.state.companyDetails['profile']} />   

            <Card className='my-5'>
            <Card.Body>
              <Card.Title className="bg-dark text-white">Company Details</Card.Title>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faBuilding} /> Company name : {this.state.companyDetails['companyname']} </Card.Subtitle>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faPhone} /> Contact : {this.state.companyDetails.contact} </Card.Subtitle>
        
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Link className='btn btn-dark my-3' to='/'>
                COMPANY PROFILE
              </Link>
              
            </Card.Body>
              
              
            </Card>
          </Col>

        </Row>
          </React.Fragment>

            
        
    );
  }
}