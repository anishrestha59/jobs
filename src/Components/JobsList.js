import React, { Component } from 'react';
//import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { NavLink, Link, useHistory } from 'react-router-dom';


const Jobs= (props) =>{
    let user = props.userData;
    return (
        <tr>
            <td>{props.jobs.jobname}</td>
            <td>{props.jobs.description}</td>
            <td>{props.jobs.date.substring(0, 10)}</td>
            <td>
                { !user &&
                <>
                
                 <button type="button" class="btn btn-primary" >Apply</button>
                 
                    {/* <a href="#" onClick={() => { props.deleteJobs(props.jobs._id) }}> ApplyTo login </a> */}
    </>
                }
                 { user && user["seekername"] && 
               <React.Fragment>
                   <NavLink className="NavLink" to={`job/${props.jobs._id}`}> Apply </NavLink>

               
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

