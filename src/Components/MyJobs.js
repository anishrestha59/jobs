import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {button} from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import JobsList from './ListingJobs/JobLists';

const Jobs=  (props) =>{
    let count;
    useEffect(() => {
        axios.get(`http://localhost:5000/appliedjobs/appliedseekers/${props.jobs._id}`)
     .then((response)=>{
         count = response.data.length;
         
     }).catch((err) => {
       count = 0;
       console.log(err)
     })
          
      }, []);
    

    return (
        <tr>
            <td>{props.jobs.jobname}</td>
            <td>{props.jobs['employementtype']}</td>
            <td>{props.jobs.createdAt.substring(0,10)}</td>
            <td>{props.jobs.date.substring(0, 10)}</td>
            <td>
                {/* <Link to={"/update" + props.jobs._id}> Edit </Link> */}
                <Link to={ "/jobs/appliedseekers/" + props.jobs._id }> Applicants </Link>
                <button type="button" className="btn btn-info">{`${count} Applicants`}</button>
                
                /
                <a href="#" onClick={() => { props.deleteJobs(props.jobs._id) }}> Delete </a>
            </td>
        </tr>

    )
}


export default class MyJobs extends Component {
   constructor(){
       super();

        this.deleteJobs = this.deleteJobs.bind(this);
        this.handleDivert = this.handleDivert.bind(this);

        this.state = {
            jobs: [],
            companyinfo:{},
        }; 
        
    }
    componentDidMount(){
        let userData = (localStorage.getItem('UserData'));
        let parsedData = JSON.parse(userData);//converting string json to object
        try{
        axios.get('http://localhost:5000/jobs/myjobs/'+parsedData._id)
            .then(response => {
                this.setState({ 
                    jobs: response.data,
                    companyinfo:parsedData
                });
            })
            .catch((err) =>{
                console.log(err);
            });
        }catch(ex){
            console.log('error');
        }
    }
    

    deleteJobs(id){
        axios.delete('http://localhost:5000/jobs/'+id)
            .then(response => console.log(response.data));
            
        this.setState({
            jobs: this.state.jobs.filter(element => element._id !== id)
        })
    }

    handleDivert(jobid){
       this.props.history.push("/jobs/appliedseekers/"+jobid);
    }
    jobsList(){
        return this.state.jobs.map( (currentJobs) => {
            return<JobsList jobs={currentJobs} deleteJobs={this.deleteJobs} handleApplicants={this.handleDivert} key={currentJobs._id} />;
        })
        }
    

    render() {
        return (
            <div>
              <div className='row'>
                <h4 className='col-2 text-dark'>  My Jobs </h4>
                 <h6 className="col-4 text-info">
                     Company:&nbsp;
                 {this.state.companyinfo['companyname']} 
                 </h6>

                 </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Jobname:</th>
                            <th>Employement Type:</th>
                            <th>Created At:</th>
                            <th>Deadline:</th>
                            <th>Actions:</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.jobsList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

