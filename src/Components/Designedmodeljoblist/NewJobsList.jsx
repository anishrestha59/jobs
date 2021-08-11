import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { getDateFiltered, checkDeadline} from "../Common/FilterJobs";

class newJobs extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      date: new Date()
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/jobs/")
      .then((response) => {
        this.setState({ jobs: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { jobs } = this.state;
    const filteredJobs = getDateFiltered(jobs);
    return (
      <React.Fragment>
        <div>
          <div className="row">
            {filteredJobs.map((job) => (
              <React.Fragment>
                <div className=" card shadow col-4">
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
                      <li className={(checkDeadline(job.date))? "list-group-item text-danger" : "list-group-item" } 
                      
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
                 
                 <Link className="btn btn-dark" to={`/job/${job['_id']}`}>Apply</Link>

                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default newJobs;