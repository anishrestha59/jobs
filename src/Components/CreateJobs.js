import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Container, Form } from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



export default class CreateJobs extends Component {
  constructor() {
    super()

    this.state = {
      jobtypes: [],
      companyprofile: '',
      companyname: '',
      companyid: '',
      jobname: '',
      selectedjobtype: 'Others',
      gender: 'Male',
      jobshift: 'day',
      salary: '',
      minsalary: '',
      maxsalary: '',
      negotiable: false,
      experience: '',
      description: '',
      employementtype: 'Full-time',
      vacancynumber: '',
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

    if (parsedData.hasOwnProperty("companyname")) {
      this.setState({
        companyprofile: parsedData.profile,
        companyname: parsedData.companyname,
        companyid: parsedData._id
      });
    }
    axios.get('http://localhost:5000/jobtypes')
      .then((response) => {
        this.setState({ jobtypes: response.data })
      }).catch(err => console.log(err));

  }

  changeJobname(event) {
    this.setState({
      jobname: event.target.value
    });
  }

  changeJobShift = (event) => {
    this.setState({
      jobshift: event.target.value
    });
  }
  changeSalary = (event) => {

    if (event.target.checked === true) {

      this.setState({
        minsalary: "",
        maxsalary: "",
        salary: event.target.value,

      });
    } else {
      this.setState({
        salary: 0
      })
    }
  }
  changeMinSalary = (event) => {
    this.setState({
      minsalary: event.target.value,
      salary: `${event.target.value} - ${this.state.maxsalary}`
    });
  }
  changeMaxSalary = (event) => {

    this.setState({
      maxsalary: event.target.value,
      salary: ` ${this.state.minsalary} - ${event.target.value} `
    });
  }

  changeExperience = (event) => {
    this.setState({
      experience: event.target.value
    });
  }
  changeDescription(event, editor) {
    const data = editor.getData();


    this.setState({
      description: data
    });

  }

  changeDate(Date) {
    this.setState({
      date: Date
    });
  }


  onSubmit(event) {
    event.preventDefault();

    const registered = {
      companyprofile: this.state.companyprofile,
      companyname: this.state.companyname,
      companyid: this.state.companyid,
      jobname: this.state.jobname,
      jobtype: this.state.selectedjobtype,
      gender: this.state.gender,
      jobshift: this.state.jobshift,
      salary: this.state.salary,
      experience: this.state.experience,
      description: this.state.description,
      employementtype: this.state.employementtype,
      vacancynumber: this.state.vacancynumber,
      date: this.state.date
    }
    console.log(registered);
    axios.post('http://localhost:5000/jobs/add', registered)
      .then(response => console.log(response.data))


    window.location = '/';

  }

  handleJobType = (event) => {

    this.setState({
      selectedjobtype: event.target.value
    })
  }
  changeGender = (event) => {
    this.setState({
      gender: event.target.value
    })

  }

  changeVacancyNumber = (event) => {
    this.setState({
      vacancynumber: event.target.value
    })
  }
  changeEmployementType = (event) => {
    this.setState({
      employementtype: event.target.value
    })
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
                      <select onClick={this.handleJobType} className="form-select" aria-label="Default select example">
                        <option selected>Others</option>
                        {
                          this.state.jobtypes.map((jobtype) => {
                            return (
                              <React.Fragment>
                                <option
                                  key={jobtype['_id']}

                                  value={jobtype['jobtype']}>

                                  {jobtype['jobtype']}

                                </option>
                              </React.Fragment>
                            )
                          })
                        }
                      </select>
                    </Form.Group>

                  </Row>
                  <div className="form-group">
                    <label>Job Shift: </label>

                    <div className="form-check">
                      <input id="day" className="form-check-input" type="radio" value="day" checked={this.state.jobshift === "day"} onChange={this.changeJobShift} />
                      <label htmlFor="day" className="form-check-label"  >
                        Day
                      </label>
                    </div>
                    <div className="form-check">
                      <input name="night" id="night" className="form-check-input" type="radio" value="night" checked={this.state.jobshift === "night"} onChange={this.changeJobShift} />
                      <label htmlFor="night" className="form-check-label" >
                        Night
                      </label>
                    </div>
                  </div>


                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridjobName">
                      <Form.Label>Needed experience</Form.Label>
                      <Form.Control type="Number"
                        required
                        className="form-control"
                        value={this.state.experience}
                        onChange={this.changeExperience}

                        placeholder="Enter experience in year" />
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Salary</Form.Label>
                      <div className='row'>
                        {!(this.state.salary === 'negotiable') &&

                          <React.Fragment>
                            <div className='col'>
                              <Form.Control type="number"

                                placeholder="Enter min salary"
                                value={this.state.minsalary}
                                onChange={this.changeMinSalary} />



                            </div>
                            -
                            <div className='col'>
                              <Form.Control type="number"

                                placeholder="Enter max salary"
                                value={this.state.maxsalary}
                                onChange={this.changeMaxSalary} />
                            </div>
                          </React.Fragment>
                        }

                        <div className="form-check">
                          <input onClick={this.changeSalary} className="form-check-input" type="checkbox" value="negotiable" id="flexCheckDefault" />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            Negotiable
                          </label>
                        </div>

                      </div>
                    </Form.Group>
                  </Row>
                  <label>Gender needed:</label>

                  <div className="form-check">
                    <input id="Male" className="form-check-input" type="radio" value="Male" checked={this.state.gender === "Male"} onChange={this.changeGender} />
                    <label htmlFor="Male" className="form-check-label"  >
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input name="Female" id="Female" className="form-check-input" type="radio" value="Female" checked={this.state.gender === "Female"} onChange={this.changeGender} />
                    <label htmlFor="Female" className="form-check-label" >
                      Female
                    </label>
                  </div>
                  <br />
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Job Description</Form.Label>


                    <CKEditor editor={ClassicEditor} data={this.state.description} onChange={this.changeDescription} />
                  </Form.Group>
                  <Form.Label>No. of vacancy:</Form.Label>
                  <div className='col-3'>
                    <Form.Control type="number"

                      placeholder="Enter number of vacancy"
                      value={this.state.vacancynumber}
                      onChange={this.changeVacancyNumber} />



                  </div>
                  <Form.Group>
                    <Form.Label>Employement type:</Form.Label>
                    <select onClick={this.changeEmployementType} className="form-select" aria-label="Default select example">
                        <option selected>Full-time</option>
                        <option >Part-time</option>
                 
                      </select>
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