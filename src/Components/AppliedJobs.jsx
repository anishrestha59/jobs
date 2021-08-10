import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { NavLink, Link, useHistory } from 'react-router-dom';




const Jobs= (props) =>{
    let user = props.userData;

    const messageColor = ()=>{
        if(props.jobs['message']==="wait"){
            return "text-info";
        }
        else if(props.jobs['message']==="rejected"){
            return "text-danger";
        }
        else{
            return "text-success";
        }
    }
    const message = ()=>{
        if(props.jobs['message']==="wait"){
            return "WAIT";
        }
        else if(props.jobs['message']==="rejected"){
            return "REJECTED";
        }
        else{
            return props.jobs['message'];
        }
    }
    return (
        <tr>
            <td>{props.jobs['jobname']}</td>
            <td>{props.jobs['companyname']}</td>
            <td>{props.jobs.appliedat.substring(0, 10)}</td>
            <td>{props.jobs.date.substring(0, 10)}</td>
               
            <td className={messageColor()}>
               <Button> {message()}</Button>
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

        const jobslist = await  allDetails.map((job) => { 
            let obj;
            obj = {'jobid': job.jobid, 'appliedid': job._id,'appliedat': job.createdAt, 'message':job.message}
            return(obj); 
        });
        
        this.setState({
            jobslist
        });
        this.jobListing();
    }
    
    jobListing = async() => {
        let a=[];
        let jobs = [];
         a = await this.state.jobslist.map( (appliedinfo) => {
             axios.get(`http://localhost:5000/jobs/${appliedinfo['jobid']}`)
             .then(response => {
            //    jobs.push(response.data);
            const obj = Object.assign(response.data,  {appliedid: appliedinfo['appliedid']} ,{ appliedat: appliedinfo['appliedat']}, { 'message': appliedinfo['message'] })
            console.log(obj);
            jobs = [...this.state.jobs, obj];
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
                                <th>Company Name:</th>
                                <th>Applied At:</th>
                                <th>Deadline:</th>
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