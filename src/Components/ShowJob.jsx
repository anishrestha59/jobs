import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



export default class ShowJob extends Component {
  state = {
    currentUser: {},
    jobDetail: {},
    jobId: "",
    companyDetails: {},
  };

 async componentDidMount() {
    const user = localStorage.getItem("UserData");
    let parsedData = JSON.parse(user);
    this.setState({
      currentUser: parsedData
    })
    
    let jobId = this.props.match.params.id;
    let jobDetail
    await axios.get(`http://localhost:5000/jobs/${jobId}`)
      .then((response) => {
        jobDetail = response.data;
        this.setState({  
          jobDetail: response.data,
          jobId,
        });
      })
      .catch((err) => {
        console.log(err,"this is err")
      })
      this.getCompanyData(jobDetail.companyid);
   
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

  handleApply = () => {
        
        const applyJob = {
            jobid: this.state.jobId,
            seekerid: this.state.currentUser._id
        }
       

        // console.log(this.props.history);
        
    axios.post('http://localhost:5000/appliedjobs/add', applyJob)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        toast.error("already saved");
      })
    this.props.history.push("/jobs/appliedjobs");
  }
            
  render() {
    let Company = this.state.companyDetails;
    let Job = this.state.jobDetail;
    return (
      <React.Fragment>
            <div>
            <img className="rounded-circle center" src="company.jpg" width="70" height="60" alt="companyimage"/>
            </div>
        <div>
          <div className="container border border-primary">
            <h2>Company Details:</h2>
            <p>
              Companyname: {this.state.companyDetails['companyname']}
              <br />
              Contact: {this.state.companyDetails.contact}
              <br />
              Address: {this.state.companyDetails.companyaddress}
              <br />
              <br />
            </p>
          </div>
          <br></br>
          <div className="container border border-success" >

            <h2>Job details:</h2>
            
            JOb name: {this.state.jobDetail['jobname']}
            <br />
            Job Type: {this.state.jobDetail['jobtype']}
            <br />
            salary : {this.state.jobDetail['salary']}
            <br />
            Experience needed: {this.state.jobDetail['experience']}
            <br />
            jobshift: {this.state.jobDetail['jobshift']}
            <br />
            JOb name: {this.state.jobDetail['jobname']}

            <button onClick={this.handleApply}>Apply</button>
            {console.log(this.state.jobDetail)}

          </div>
        </div>
      </React.Fragment>
    );
  }
}
