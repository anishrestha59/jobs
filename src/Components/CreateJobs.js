import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

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
            <div className="container">
              <div className="form-div">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Jobname: </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={this.state.jobname}
                      onChange={this.changeJobname}
                    />
                  </div>

                  <div className="form-group">
                    <label>Job Type: </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={this.state.jobtype}
                      onChange={this.changeJobType}
                    />
                  </div>
                            <div className="form-group">
                                <label>Job Shift: </label>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio"  value="day" checked={this.state.jobshift === "day"} onChange={this.changeJobShift}  />
                                    <label class="form-check-label"  >
                                        Day
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio"  value="night" checked={this.state.jobshift === "night"} onChange={this.changeJobShift}  />
                                    <label class="form-check-label" >
                                        Night
                                    </label>
                                </div>
                            </div>

                  <div className="form-group">
                    <label>Salary: </label>
                    <input
                      type="Number"
                      required
                      className="form-control"
                      value={this.state.salary}
                      onChange={this.changeSalary}
                    />
                  </div>
                  <div className="form-group">
                    <label>Minimum Experience: </label>
                    <input
                      type="Number"
                      required
                      className="form-control"
                      value={this.state.experience}
                      onChange={this.changeExperience}
                    />
                  </div>
                  <div className="text-muted mb-4">
                            minimum experience to apply in Year
                        </div>

                  <div className="form-group">
                    <label>Description: </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescription}
                    />
                  </div>

                  <div className="form-group">
                    <label>Pick deadline: </label>
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
          </div>
        );
    }
}
