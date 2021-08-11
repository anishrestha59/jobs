import React, { Component } from "react";
import axios from "axios";

class newJobs extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
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

    return (
      <React.Fragment>
        <div>
          <div className="row">
            {jobs.map((job) => (
              <React.Fragment>
                <div className=" card shadow col-4">
                  <img
                    className="card-img-top "
                    style={{ borderRadius: "25px", height:"200px" }}
                    src={`/${job["companyprofile"]}`}
                  ></img>
                  <div class="card-body">
                    
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item"style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        overflowWrap: "none",
                      }}
                    >Job Name: {job.jobname}</li>
                    <li class="list-group-item" style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        overflowWrap: "none",
                      }}>Salary: {job.salary}</li>
                      <li class="list-group-item" style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        overflowWrap: "none",
                      }}>Salary: {job.date .substring(0, 10)}</li>
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
                 
                  <a href="#" class="btn btn-dark">
                    APPLY
                  </a>
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