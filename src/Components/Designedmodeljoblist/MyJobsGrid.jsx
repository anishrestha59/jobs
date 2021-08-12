import React, { Component } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import { checkDeadline } from '../Common/FilterJobs';
import { getCurrentUser } from './../Services/authService';

class MyJobsGrid extends Component {    
      constructor() {
        super();
        this.state = {
          jobs: [],
          user:{},
        };
      }
      componentDidMount() {
        const user = getCurrentUser();
        this.setState({user})
      }
      

      render() {
       const { jobs } = this.props;
       const {user} = this.state;
    
        return (
          <React.Fragment>
            <div className="container">
              <div className="row">
                {jobs.map((job) => (
                  <React.Fragment>
                    <div className=" card shadow col-4 mt-4">
                      <img
                        className="card-img-top "
                        style={{ borderRadius: "25px", height:"200px" }}
                        src={`/${job["companyprofile"]}`}
                      ></img>
                      <div className="card-body">
                        
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            overflowWrap: "none",
                          }}
                        >Job Name: {job.jobname}</li>
                        <li className="list-group-item" style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            overflowWrap: "none",
                          }}>Salary: {job.salary}</li>
                          <li className={checkDeadline(job.date)?"list-group-item text-danger":"list-group-item "} 
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            overflowWrap: "none",
                          }}>Deadline: {job.date .substring(0, 10)}</li>
                      </ul>
                      
                        
    
                        {/* <col>
                        <strong>Dead Line: </strong> {job.date.substring(0, 10)}
                        </col>
                        <col>
                        <strong>Description: </strong>{" "}
                        </col> */}
    
                        {/*                  
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            overflowWrap: "none",
                          }}
                        >
                          {job.description}
                        </p> */}
                        {user && user['seekername'] &&
                     <Link className="btn btn-dark" to={`/job/${job['_id']}`}>Apply</Link>
                      }
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </React.Fragment>
        );
      }
    }
    
  

export default MyJobsGrid;