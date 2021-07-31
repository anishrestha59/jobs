import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Link, useHistory } from 'react-router-dom';




const Jobs= (props) =>{
    let user = props.userData;
    return (
        <tr>
            <td>{props.jobs['jobname']}</td>
            <td>{props.jobs['description']}</td>
            <td>{props.jobs.date.substring(0, 10)}</td>
            <td>
                Pending
            </td>
        </tr>

    )
}


class AppliedJobs extends Component {
    constructor(){
        super();
        this.state = {
            currentUser: {},
            jobslist: [],
            jobs: []
        }




    }

    async componentDidMount() {
        const user = localStorage.getItem("UserData");
        let parsedData = JSON.parse(user);
        this.setState({
          currentUser: parsedData
        });

        let allDetails = [];

        await axios.get(`http://localhost:5000/appliedjobs/${parsedData['_id']}`)
        .then(response => {
            allDetails = response.data;
            
        })
        .catch((err) =>{
            console.log(err);
        });

        const jobslist = await allDetails.map((job) => { return(job.jobid) });
        this.setState({
            jobslist
        });
        this.jobListing();
    }
    
    jobListing = async() => {
        let a=[];
        let jobs = [];
         a = await this.state.jobslist.map( (jobid) => {
             axios.get(`http://localhost:5000/jobs/${jobid}`)
             .then(response => {
            //    jobs.push(response.data);
                jobs = [...this.state.jobs, response.data];
              
                this.setState({ jobs });
            })
            .catch((err) =>{
                console.log(err);
            });
           
        });
    
        
    }


    deleteJobs(id){
        axios.delete('http://localhost:5000/jobs/'+id)
            .then(response => console.log(response.data));
            
        this.setState({
            jobs: this.state.jobs.filter(element => element._id !== id)
        })
    }

    jobsList(){
        console.log(this.state.jobs);
        return this.state.jobs.map( (currentJobs) => {
            return<Jobs jobs={currentJobs} key={currentJobs._id} />;
        })
        }
 
    render() {
        return (
            <React.Fragment>
                <div>
                    <h4>Your applied jobs:</h4>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Jobname:</th>
                                <th>Description:</th>
                                <th>Applied In:</th>
                                <th>Status:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.jobsList()}
                        </tbody>
                    </table>
                </div>

            </React.Fragment>
        );
    }
}

export default AppliedJobs;