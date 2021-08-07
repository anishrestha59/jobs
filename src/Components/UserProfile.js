import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

import { toast } from 'react-toastify';
import { Form,Row,Col,Image,ListGroup,Card,Button, Container} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faUser,faVenusMars,faMapMarked,faUniversity,faMoneyBillAlt,faGraduationCap,faUsers, faMobile, faBuilding, faComment, faEdit} from '@fortawesome/free-solid-svg-icons';



export default class UserProfile extends Component {
  constructor() {
    super()
    this.state = {

      profile:"",
      userid: "",
      companyname: "",
      contact: "",
      companyaddress: "",
      country: "",
      email: "",
      companywebsite: "",
      postalcode: "",
      password: "",
    };

    }

  componentDidMount() {
    let userData = localStorage.getItem("UserData");
    let parsedData = JSON.parse(userData); //converting string json to object

    if (parsedData.hasOwnProperty("companyname")) {
      this.setState({
        profile: parsedData.profile,
        userid: parsedData._id,
        companyname: parsedData.companyname,
        contact: parsedData.contact,
        companyaddress: parsedData.companyaddress,
        country: parsedData.country,
        email: parsedData.email,
        companywebsite: parsedData.companywebsite,
        postalcode: parsedData.postalcode
      });
    } 
  }

  setImageUpload = async(e) => {
    if (e.currentTarget.files[0] && (e.currentTarget.files[0].type === "image/jpeg" || e.currentTarget.files[0].type === "image/png" || e.currentTarget.files[0].type === "image/jpg")){
      const profile = e.currentTarget.files[0];
      const formdata = new FormData();
      formdata.append('myFile',e.target.files[0],e.target.files[0].name);
       await axios.patch("http://localhost:5000/company/profilepic/"+this.state.userid,formdata)
       .then((companyinfo) =>{
         console.log(companyinfo);
       }).catch((err)=>{
         console.log(err);
       })
      //this.setState({ profile });
    }
    else {
      toast.error('image file not accepted')
    }
  }


  setCompanyName = (event) => {
    this.setState({
      companyname:event.target.value
    });
  }

  setCompanyAddress = (event) => {
    this.setState({
      companyaddress:event.target.value
    });
  }

  setCountry = (event) => {
    this.setState({
      country:event.target.value
    });
  }
  
  setCompanyWebsite = (event) =>{
    this.setState({
      companywebsite: event.target.value
    });
  }

  setPostalCode = (event) =>{
    this.setState ({
      postalcode: event.target.value
    });
  }

  setEmail = (event) =>{
    this.setState ({
      email: event.target.value
    });
  }

  setCompanyPassword = (event) => {
    this.setState({
      password:event.target.value
    });
  }
  
  submitHandler = async(event) => {
    var contact = this.state.contact;
    var password = this.state.password;
    let loginFlag = false;
    let updatedData;
   

    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      const data = await axios.post("http://localhost:5000/company/login",
        {
          contact,
          password,
        },
        config
      );
        loginFlag = true;
    
    } catch (error) {
        toast.error('Wrong password')
        console.log(error);
        loginFlag = false;
      }

    if(loginFlag){
      const updateData = {
        profile: this.state.profile,
        companyname: this.state.companyname,
        contact,
        companyaddress: this.state.companyaddress,
        country: this.state.country,
        email: this.state.email,
        companywebsite: this.state.companywebsite,
        postalcode: this.state.postalcode,
        password
      }

      await axios.post(`http://localhost:5000/company/update/${this.state.userid}`, updateData)
        .then((res) => {
          updatedData = res.data;
          toast.success("Profile updated");
        }).catch((err) => {
          toast.error('Not updated')
          console.log(err)
        })
  
        localStorage.setItem("UserData", JSON.stringify(updatedData));
        

      }

  }
  handleEditPicture = () => {

  }

  render() {
    return (
      





      
      <div>
        <div className="container">

        <Link className='btn btn-dark my-3' to='/'>
                GO Back
        </Link>

        <Row>
        <Col md={8} >
        <Card >
            <Card.Body>
              <Card.Title className="bg-dark text-white">COMPANY Details</Card.Title>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faBuilding} /> COMPANY Name: {this.state.companyname} </Card.Subtitle>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faPhone} /> COMPANY contact: {this.state.contact} </Card.Subtitle>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faMapMarked} /> COMPANY Address: {this.state.companyaddress} </Card.Subtitle>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faComment} /> COMPANY description: {this.state.companyaddress} </Card.Subtitle>
              
              
             
              
            </Card.Body>
              
              
            </Card>
  
          </Col>
          <Col md={4} >
            <div style={{position:"relative"}} >

            <i  className="fa fa-edit fa-2x" style={{right:"100%", buttom:"50%"}}></i>
            <Image onClick={() => this.inputElement.click()} src={`/${this.state.profile}`}  alt={this.state.profile} rounded  fluid width="400" height="200" />   
            <FontAwesomeIcon icon ={ faEdit } style={{position:"absolute",left:"50%", buttom:"50%"}} />
            <input
                    ref={(input) => (this.inputElement = input)}
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={this.setImageUpload}
                    className="img-upload-btn"
                    multiple
                  /> 
                 
            </div>
          </Col>

        </Row>

        <Row>
          <Col>
          <Button href="#" variant="outline-success" size="lg">
                        UPDATE COMPANY PROFILE
                    </Button>
          </Col>
        </Row>






yo tala ko chai update company profile click gare paxe dekhaune page ho hoi 
        <Container>
          <Row>
            <Col md={2} >
            </Col>
            <Col>
            
        <Card className='my-5 shadow-lg' >
          <Card.Body>
          <Form onSubmit={this.submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={this.state.companyname}
                placeholder="Enter Company Name"
                onChange={ this.setCompanyName }
              />
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                value={this.state.contact}
                placeholder="Enter Phone"
              />
              <Form.Text className="text-muted">
                We'll never share your phone with anyone else.
              </Form.Text>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={this.state.companyaddress}
                placeholder="Enter Address"
                onChange={ this.setCompanyAddress }
              />
               <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={this.state.country}
                placeholder="Enter country"
                onChange={ this.setCountry }
              />
               <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={this.state.email}
                placeholder="Enter Company Email"
                onChange={ this.setEmail }
              />
               <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                value={this.state.companywebsite}
                placeholder="Enter website  "
                onChange={ this.setCompanyWebsite }
              />
                    <Form.Label>PostalCode</Form.Label>
              <Form.Control
                type="text"
                value={this.state.postalcode}
                placeholder="Enter Postal Code  "
                onChange={ this.setPostalCode }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={ this.setCompanyPassword }
              />
            </Form.Group>
            <div className="d-grid gap-2">
            <Button variant="outline-info" type="submit">
              UPDATE COMPANY INFORMATION
            </Button>
            </div>
          </Form>
          </Card.Body>
        </Card>
        </Col>
        <Col md={2}>
            </Col>
        </Row>
        </Container>

          
        </div>
      </div>
    );
  }
}