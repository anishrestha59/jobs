import React, { Component } from 'react';
//import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus } from '@fortawesome/free-solid-svg-icons'


const Jobs= (props) =>{
    let user = props.userData;
    return (
        <tr>
            <td><img className="rounded-circle" src={`/${props.jobs['companyprofile']}`} width="40" height="35" alt={props.jobs['companyprofile']}/></td>
            <td>{props.jobs.jobname}</td>  
            <td>{props.jobs.description}</td>
            <td>{props.jobs.date.substring(0, 10)}</td>
            <td>
                { !user &&
                <>
                
                 <button type="button" class="btn btn-primary" > Apply <FontAwesomeIcon icon = { faCoffee } /></button>
                 
                    {/* <a href="#" onClick={() => { props.deleteJobs(props.jobs._id) }}> ApplyTo login </a> */}
    </>
                }
                 { user && user["seekername"] && 
               <React.Fragment>
                   <NavLink className="NavLink" to={`job/${props.jobs._id}`}> Apply <FontAwesomeIcon icon = { faPlus } /> </NavLink>

               
                    {/* <a href="#" onClick={() => { props.deleteJobs(props.jobs._id) }}> ApplySeeker </a> */}
                </React.Fragment>
                }

            </td>
        </tr>

    )
}


export default class JobsList extends Component {
   constructor(){
       super();

        this.deleteJobs = this.deleteJobs.bind(this);

        this.state = {
            jobs: [],
            userData: {},
            selectedJob:""
        };
        
        
        
    }
    componentDidMount(){
        axios.get('http://localhost:5000/jobs/')
            .then(response => {
                this.setState({ jobs: response.data})
            })
            .catch((err) =>{
                console.log(err);
            });

        let userData = (localStorage.getItem('UserData'));
        let parsedData = JSON.parse(userData);//converting string json to object

            this.setState({
                userData: parsedData
            });


    }
    
    handleApply = (jobsId) => {
        this.setState({
            selectedJob: jobsId
        })
        return "apply";
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
            return<Jobs jobs={currentJobs} userData={this.state.userData} handleApply={this.handleApply} deleteJobs={this.deleteJobs} key={currentJobs._id} />;
        })
        }
    render() {
        return (
            <div>
                <h4>  Jobs:</h4>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Company:</th>
                            <th>Jobname:</th>
                            <th>Description:</th>
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

