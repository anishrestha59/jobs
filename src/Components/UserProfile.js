import React, { Component } from "react";
import axios from "axios";

import { Form, Button } from "react-bootstrap";

export default class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      userid: "",
      companyname: "",
      contact: "",
      companyaddress: "",
      password: "",
    };

    }

  componentDidMount() {
    let userData = localStorage.getItem("UserData");
    let parsedData = JSON.parse(userData); //converting string json to object

    if (parsedData.hasOwnProperty("companyname")) {
      this.setState({
        userid: parsedData._id,
        companyname: parsedData.companyname,
        contact: parsedData.contact,
        companyaddress: parsedData.companyaddress
      });
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
        console.log(error);
        loginFlag = false;
      }

    if(loginFlag){
      const updateData = {
        companyname: this.state.companyname,
        contact,
        companyaddress: this.state.companyaddress,
        password
      }

      await axios.post(`http://localhost:5000/company/update/${this.state.userid}`, updateData)
        .then((res) => {
          updatedData = res.data;
        })
        console.log(updatedData);
    
    
        // localStorage.setItem("UserData", JSON.stringify(updatedData));
        

      }

  }


  render() {
    return (
      <div>
        <div className="container">
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
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
