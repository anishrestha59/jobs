import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Jobs= props =>{
    return (
        <tr>
            <td>{props.jobs.jobname}</td>
            <td>{props.jobs.description}</td>
            <td>{props.jobs.createdAt.substring(0,10)}</td>
            <td>{props.jobs.date.substring(0, 10)}</td>
            <td>
                {/* <Link to={"/update" + props.jobs._id}> Edit </Link> */}
                <Link to={ "/jobs/appliedseekers/" + props.jobs._id }> Applicants </Link>
                
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

        this.state = {
            jobs: []
        }; 
        
    }
    componentDidMount(){
        let userData = (localStorage.getItem('UserData'));
        let parsedData = JSON.parse(userData);//converting string json to object
        try{
        axios.get('http://localhost:5000/jobs/myjobs/'+parsedData._id)
            .then(response => {
                this.setState({ 
                    jobs: response.data
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

    jobsList(){
        return this.state.jobs.map( (currentJobs) => {
            return<Jobs jobs={currentJobs} deleteJobs={this.deleteJobs} key={currentJobs._id} />;
        })
        }
    render() {
        return (
            <div>
                {console.log(this.state.jobs)}
                <h4>  Jobs:</h4>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Jobname:</th>
                            <th>Description:</th>
                            <th>Created in:</th>
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

