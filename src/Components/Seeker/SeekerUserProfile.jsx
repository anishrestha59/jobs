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
      seekername: "",
      contact: "",
      seekeraddress: "",
      gender: "",
      email: "",
      experience:"",
      age:"",
      currentskill: "",
      resume:"",
      education:"",
      salary: "",
      password: "",
    };

}

  componentDidMount() {
    let userData = localStorage.getItem("UserData");
    let parsedData = JSON.parse(userData); //converting string json to object

    if (parsedData.hasOwnProperty("seekername")) {
      this.setState({
        profile: parsedData.profile,
        userid: parsedData._id,
        seekername: parsedData.seekername,
        contact: parsedData.contact,
        seekeraddress: parsedData.seekeraddress,
        gender: parsedData.gender,
        age: parsedData.age,
        experience: parsedData.experience,
        currentskill: parsedData.currentskill,
        resume: parsedData.resume,
        education: parsedData.education,
        salary: parsedData.salary
      });
    } 
  }

  setImageUpload = async(e) => {
    if (e.currentTarget.files[0] && (e.currentTarget.files[0].type === "image/jpeg" || e.currentTarget.files[0].type === "image/png" || e.currentTarget.files[0].type === "image/jpg")){
      const profile = e.currentTarget.files[0];
      const formdata = new FormData();
      formdata.append('myFile',e.target.files[0],e.target.files[0].name);
       await axios.patch("http://localhost:5000/seeker/profilepic/"+this.state.userid, formdata)
       .then((response) =>{
         toast.success('Profile Pic updated');
          localStorage.setItem("UserData", JSON.stringify(response.data));
    
          this.setState({
          profile: response.data.profile,
          userid: response.data._id,
          seekername: response.data.seekername,
          contact: response.data.contact,
          seekeraddress: response.data.seekeraddress,
          age: response.data.age,
          experience: response.data.experience,
          gender: response.data.gender,
          currentskill: response.data.currentskill,
          resume: response.data.resume,
          education: response.data.education,
          salary: response.data.salary
        });
       }).catch((err)=>{
         toast.error('Profile Pic not updated')
         console.log(err);
       })
      //this.setState({ profile });
    }
    else {
      toast.error('image file not accepted')
    }
  }


  setSeekerName = (event) => {
    this.setState({
      seekername:event.target.value
    });
  }

  setSeekerAddress = (event) => {
    this.setState({
      seekeraddress:event.target.value
    });
  }

  setGender = (event) => {
    this.setState({
      gender:event.target.value
    });
  }
  
  setSkills = (event) =>{
    this.setState({
      currentskill: event.target.value
    });
  }

  setResume = (event) =>{
    this.setState({
      resume: event.target.value
    })
  }

  setEducation = (event) =>{
    this.setState({
      education: event.target.value
    })
  }

  setSalary = (event) =>{
    this.setState ({
      salary: event.target.value
    });
  }

  setPassword = (event) => {
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

      const data = await axios.post("http://localhost:5000/seeker/login",
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
        seekername: this.state.seekername,
        gender: this.state.gender,
        seekeraddress: this.state.seekeraddress,
        age: this.state.age,
        contact,
        currentskill: this.state.currentskill,
        resume: this.state.resume,
        education: this.state.education,
        salary: this.state.salary,
        experience: this.state.experience,
        password
      }

      await axios.post(`http://localhost:5000/seeker/update/${this.state.userid}`, updateData)
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
              <Card.Title className="bg-dark text-white">Seeker Details</Card.Title>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faBuilding} /> Seeker Name: {this.state.seekername} </Card.Subtitle>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faPhone} /> Seeker contact: {this.state.contact} </Card.Subtitle>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faMapMarked} /> Seeker Address: {this.state.seekeraddress} </Card.Subtitle>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faComment} /> Seeker age: {this.state.age} </Card.Subtitle>
              
              
             
              
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





        <Container>
          <Row>
            <Col md={2} >
            </Col>
            <Col>
            
        <Card className='my-5 shadow-lg' >
          <Card.Body>
          <Form onSubmit={this.submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Seeker Name</Form.Label>
              <Form.Control
                type="text"
                value={this.state.seekername}
                placeholder="Enter Company Name"
                onChange={ this.setSeekerName }
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
                value={this.state.seekeraddress}
                placeholder="Enter Address"
                onChange={ this.setSeekerAddress }
              />
               <Form.Label>gender</Form.Label>
              <Form.Control
                type="text"
                value={this.state.gender}
                placeholder="Enter gender"
                onChange={ this.setGender }
              />
               <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                id="experience"
                value={this.state.experience}
                placeholder="Experience on that skill"
                onChange={ this.setExperience }
              />
               <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                value={this.state.currentskill}
                placeholder="Skills  "
                onChange={ this.setSkills }
              />
<Form.Label>Resume link:</Form.Label>
              <Form.Control
                type="text"
                value={this.state.currentskill}
                placeholder="Resume link:  "
                onChange={ this.setResume }
              />

<Form.Label>Education</Form.Label>
              <Form.Control
                type="text"
                value={this.state.currentskill}
                placeholder="Highest education achieved "
                onChange={ this.setEducation }
              />

                    <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                value={this.state.salary}
                placeholder="Enter Salary "
                onChange={ this.setSalary }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={ this.setPassword }
              />
            </Form.Group>
            <div className="d-grid gap-2">
            <Button variant="outline-info" type="submit">
              UPDATE SEEKER INFORMATION
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