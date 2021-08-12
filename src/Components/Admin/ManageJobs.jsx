import React, { Component } from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSearch, faTrash  } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
const Seekers= (props) =>{
    return (
        <tr>
            <td>{props.jobs['_id']}</td>
            <td>{props.jobs['jobname']}</td>
            <td>{props.jobs['jobtype']}</td>
            <td>
            <Link className="btn btn-dark" to={`/admin/adminshowjobs/${props.jobs['_id']}`}>View</Link>
            
                <div onClick={props.handleDelete.bind(this, props.jobs._id)} type="button" class="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash}/></div>

            </td>
        </tr>
    )
}

export default class ManageJobs extends Component {
    constructor(){
        super();
        this.state = {
            jobs: [],
            search:'',
            
        };

    }
     componentDidMount() {
        axios.get(`http://localhost:5000/jobs/`)
        .then(response => {
            console.log(response.data)
           this.setState({ jobs:response.data });
       })
       .catch((err) =>{
           console.log(err);
       });
      

    }
        

    jobsList(){
        
        return this.state.jobs.map( (job) => {
            return<Seekers jobs={job} key={job._id} handleDelete={ this.handleDelete } />;
        })
        }

    handleDelete = (jobid) => {
   
            axios.delete('http://localhost:5000/jobs/delete/'+jobid)
                .then(response => console.log(response.data));
                
            this.setState({
                jobs: this.state.jobs.filter(element => element._id !== jobid)
            })
        
    }
    
    handleSearch = (e)=>{
        this.setState({search:e.target.value})
        const filtered = this.state.jobs.filter((job)=>{
       
            if(job._id === e.target.value){
                return job;
    }})
    this.setState({jobs:filtered});
    }



    


    handleSearchButton = ()=>{
        const filtered = this.state.jobs.filter((job)=>{
            console.log(job._id,this.state.search)
            if(job._id === this.state.search){
                return job;
    }})
    this.setState({jobs:filtered});
    
}
    
    render() {
        return (
         <React.Fragment>
                <div>
                <h4>  Applicants :</h4>
                <div className="form-outline">
    <Form.Control
                  type="text"
                  value={this.state.search}
                  required
                  placeholder="Search by jobid"
                  onChange={this.handleSearch}
                />
  </div>
  <button  type="button" className="btn btn-primary">
    <i ><FontAwesomeIcon icon={faSearch} /></i>
  </button>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                       
                            <th>Job ID:</th>
                            <th>JobName:</th>
                            <th>Jobtype:</th>
                            <th>Actions:</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.jobsList() }
                    </tbody>
                </table>
            </div>

         </React.Fragment>
        )
    }
}
