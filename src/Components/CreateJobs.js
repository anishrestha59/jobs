import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, Container,Form } from 'react-bootstrap'


export default class CreateJobs extends Component {
    constructor(){
        super()
        this.state = {
          companyprofile:'',
          companyname:'',
            companyid:'',
            jobname: '',
            jobtype: '',
            jobshift: 'day',
            salary: '',
            experience: '',
            description: '',
            date: new Date()
        }

        this.changeJobname = this.changeJobname.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeDate = this.changeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
  
      let userData = (localStorage.getItem('UserData'));
      let parsedData = JSON.parse(userData);//converting string json to object

    if(parsedData.hasOwnProperty("companyname")){
      this.setState({
        companyprofile: parsedData.profile,
        companyname: parsedData.companyname,
        companyid: parsedData._id
      });

    }

    }

    changeJobname(event){
        this.setState({
            jobname:event.target.value
        });
    }
    changeJobType = (event) =>{
        this.setState({
            jobtype:event.target.value
        });
    } 

    changeJobShift = (event) =>{
        this.setState({
            jobshift:event.target.value
        });
    }
    changeSalary = (event) =>{
        this.setState({
            salary:event.target.value
        });
    }
    changeExperience = (event) =>{
        this.setState({
            experience:event.target.value
        });
    }
    changeDescription(event){
        this.setState({
            description: event.target.value
        });
    }

    changeDate(Date) {
        this.setState({
            date: Date
        });
    }
   
    
    onSubmit(event){
        event.preventDefault();

        const registered = {
            companyprofile: this.state.companyprofile,
            companyname: this.state.companyname,
            companyid: this.state.companyid,
            jobname: this.state.jobname,
            jobtype: this.state.jobtype,
            jobshift: this.state.jobshift,
            salary: this.state.salary,
            experience: this.state.experience,
            description: this.state.description,
            date: this.state.date
        }
        console.log(registered);
        axios.post('http://localhost:5000/jobs/add', registered)
            .then(response => console.log(response.data))

        
        window.location ='/';
            
    }


    render() {
        return (
          <div>
           
           <Card className='my-5 shadow-lg'>
            <Card.Body>

            <div className="container">
              <div className="form-div">
                <form onSubmit={this.onSubmit}>

                <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridjobName">
      <Form.Label>Job Name</Form.Label>
      <Form.Control type="text"
      required 
      value={this.state.jobname}
      onChange={this.changeJobname}
                      onChange={this.changeJobname} placeholder="Enter Job Name" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Job Type</Form.Label>
      <Form.Control type="text"
      required
      value={this.state.jobtype}
        onChange={this.changeJobType}
       placeholder="Enter Job Type" />
    </Form.Group>
    
  </Row>
  <div className="form-group">
                                <label>Job Shift: </label>

                                <div class="form-check">
                                    <input id="day" class="form-check-input" type="radio"  value="day" checked={this.state.jobshift === "day"} onChange={this.changeJobShift}  />
                                    <label htmlFor="day" class="form-check-label"  >
                                        Day
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input name="night" id="night" class="form-check-input" type="radio"  value="night" checked={this.state.jobshift === "night"} onChange={this.changeJobShift}  />
                                    <label htmlFor ="night" class="form-check-label" >
                                        Night
                                    </label>
                                </div>
                            </div>
                            <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridjobName">
      <Form.Label>Experience</Form.Label>
      <Form.Control type="Number"
                      required
                      className="form-control"
                      value={this.state.experience}
                      onChange={this.changeExperience}
      
                       placeholder="Enter experience in year" />
    </Form.Group>
    

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Salary</Form.Label>
      <Form.Control type="number"
       required
       placeholder="Enter Salary" 
       value={this.state.salary}
       onChange={this.changeSalary} />
    </Form.Group>
    
  </Row>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control 
    required
    value={this.state.description}
    onChange={this.changeDescription}
    as="textarea"
    rows={3} />
  </Form.Group>

  <div className="form-group">
                    <label>Pick deadline </label>
                    <div>
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.changeDate}
                      />
                    </div>
                  </div>
  

                  <input
                    type="submit"
                    className="btn btn-danger btn-block"
                    value="Create Job"
                  />
                </form>
              </div>
            </div>
            </Card.Body>
            </Card>
          </div>
        );
    }
}