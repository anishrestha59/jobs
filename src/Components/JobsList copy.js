import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Jobs= props =>{
    return (
        <tr>
            <td>{props.jobs.jobname}</td>
            <td>{props.jobs.description}</td>
            <td>{props.jobs.date.substring(0, 10)}</td>
            <td>
                <Link to={"/update" + props.jobs._id}> Edit </Link>
                /
                <a href="#" onClick={() => { props.deleteJobs(props.jobs._id) }}> Delete </a>
            </td>
        </tr>

    )
}


export default class JobsList extends Component {
   constructor(){
       super();

        this.deleteJobs = this.deleteJobs.bind(this);

        this.state = {
            jobs: []
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
            return<Jobs jobs={currentJobs} deleteJobs={this.deleteJobs} key={currentJobs._id} />;
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

