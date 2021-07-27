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

  componentDidMount() {
    const user = localStorage.getItem("UserData");
    let parsedData = JSON.parse(user);
    this.setState({
      currentUser: parsedData
    })
    
    let jobId = this.props.match.params.id;
    
    axios.get(`http://localhost:5000/jobs/${jobId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          jobDetail: response.data,
          jobId,
        });
      })
      .catch((err) => {
        console.log(err,"this is err")
      })
   
  }


  getCompanyData = () => {
    axios.get(`http://localhost:5000/company/${this.state.jobDetail.companyid}`)
      .then((response) => {
        console.log(response.data);
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
    this.props.history.push("/jobs/appliedJob");
  }
            
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <table>
            
            <tr className="row m-5"> {this.state.jobId}</tr>
            <tr className="row m-5">{this.state.currentUser._id}</tr>
            <tr className="row m-5">Job other details</tr>
          
          </table>

          <button onClick={ this.handleApply }>Apply</button>
        </div>
      </React.Fragment>
    );
  }
}
