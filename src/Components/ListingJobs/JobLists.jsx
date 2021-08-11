import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class JobLists extends Component {
    constructor(){
        super();
        this.state={
            count:0,
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:5000/appliedjobs/appliedseekers/${this.props.jobs._id}`)
        .then((response)=>{
            this.setState({count:response.data.length})
            
        }).catch((err) => {
        
          console.log(err)
        })
             
    }
    

    render() {
        const {jobs, deleteJobs, handleApplicants} = this.props;
        const {count} = this.state;
        return (
            <React.Fragment>
     
                        <tr>
            <td>{jobs.jobname}</td>
            <td>{jobs['employementtype']}</td>
            <td>{jobs.createdAt.substring(0,10)}</td>
            <td>{jobs.date.substring(0, 10)}</td>
            <td>
                {/* <Link to={"/update" + jobs._id}> Edit </Link> */}
                {/* <Link to={ "/jobs/appliedseekers/" + jobs._id }> Applicants </Link> */}
            
                <button  type="button" className="btn btn-info" onClick={()=> {handleApplicants(jobs._id)}}>{`${count} Applicants`}</button>
                <button  type="button" className="btn btn-danger" onClick={()=> { deleteJobs(jobs._id) }}>Delete</button>
                
                
            </td>
        </tr>
        
            </React.Fragment>
        );
    }
}

export default
 JobLists;