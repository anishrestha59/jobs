import React, { Component } from "react";
//import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import { NavLink, Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faPlus } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./pagination/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./Common/listGroup";
import NewJobsList from './Designedmodeljoblist/NewJobsList';
import _ from "lodash";


const Jobs = (props) => {
  let user = props.userData;
  return (
    <tr>
      <td>
        <img
          className="rounded-circle"
          src={`/${props.jobs["companyprofile"]}`}
          width="40"
          height="35"
          alt={props.jobs["companyprofile"]}
        />
      </td>
      <td>{props.jobs.jobname}</td>
      <td>{props.jobs.description}</td>
      <td>{props.jobs.date.substring(0, 10)}</td>
      <td>
        {!user && (
          <>
            <button type="button" className="btn btn-primary">
              {" "}
              Apply <FontAwesomeIcon icon={faCoffee} />
            </button>

            {/* <a href="#" onClick={() => { props.deleteJobs(props.jobs._id) }}> ApplyTo login </a> */}
          </>
        )}
        {user && user["seekername"] && (
          <React.Fragment>
            <NavLink className="NavLink" to={`job/${props.jobs._id}`}>
              {" "}
              Apply <FontAwesomeIcon icon={faPlus} />{" "}
            </NavLink>

            {/* <a href="#" onClick={() => { props.deleteJobs(props.jobs._id) }}> ApplySeeker </a> */}
          </React.Fragment>
        )}
      </td>
    </tr>
  );
};

export default class JobsList extends Component {
  constructor() {
    super();

    this.deleteJobs = this.deleteJobs.bind(this);

    this.state = {
      currentPage: 1,
      pageSize: 7,
      selectedJobType: "",
      jobTypes: [
        "All Jobs",
        "Technician",
        "Medical",
        "Engineer",
        "Security",
        "Helper",
        "Delivery",
        "Manager",
        "Sales",
      ],
      jobs: [],
      userData: {},
      selectedJob: "",
      sortColumn: { path: "title", order: "asc" },
      showNewJobs: false,
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

    let userData = localStorage.getItem("UserData");
    let parsedData = JSON.parse(userData); //converting string json to object

    this.setState({
      userData: parsedData,
    });
  }


  handleApply = (jobsId) => {
    this.setState({
      selectedJob: jobsId,
    });
    return "apply";
  };

  deleteJobs(id) {
    axios
      .delete("http://localhost:5000/jobs/" + id)
      .then((response) => console.log(response.data));

    this.setState({
      jobs: this.state.jobs.filter((element) => element._id !== id),
    });
  }

  jobsList() {
    console.log(this.state.jobs);
    return this.state.jobs.map((currentJobs) => {
      return (
        <Jobs
          jobs={currentJobs}
          userData={this.state.userData}
          handleApply={this.handleApply}
          deleteJobs={this.deleteJobs}
          key={currentJobs._id}
        />
      );
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  selectJobType = (jobType) => {
    this.setState({ selectedJobType: jobType, currentPage: 1 });
  };

  handleSort = (path) => {
    let sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.setState({ sortColumn });
  };

  
  render() {
    const {
      currentPage,
      pageSize,
      jobs: allJobs,
      selectedJobType,
      sortColumn,
    } = this.state;
    const filtered =
      selectedJobType && !(selectedJobType === "All Jobs")
        ? allJobs.filter((job) => job["jobtype"] === selectedJobType)
        : allJobs;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const jobs = paginate(sorted, currentPage, pageSize);
    
    
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.jobTypes}
            selectedItem={this.state.selectedJobType}
            onItemSelect={this.selectJobType}
          />
          <div className="form-check form-switch">
            <input 

id="flexSwitchCheckDefault" 
className="form-check-input"  
type="checkbox" 

              
              />
            
            <label className="form-check-label"
               htmlFor="flexSwitchCheckDefault">Show new jobs</label>
          </div>

        </div>
        <div className="col">
          <h4> Jobs:</h4>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Company:</th>
                <th onClick={() => this.handleSort("jobname")}>Jobname:</th>
                <th>Description:</th>
                <th onClick={() => this.handleSort("deadline")}>Deadline:</th>
                {this.state.userData && this.state.userData['seekername'] && <th>Actions:</th>}
                {!this.state.userData && <th>Actions:</th>}
              
              </tr>
            </thead>
            <tbody>
              {jobs.map((currentJobs) => {
                return (
                  <Jobs
                    jobs={currentJobs}
                    userData={this.state.userData}
                    handleApply={this.handleApply}
                    deleteJobs={this.deleteJobs}
                    key={currentJobs._id}
                  />
                );
              })}
            </tbody>
          </table>

       

          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        
        <b>New Jobs</b>
        <NewJobsList />
        </div>
        
      </div>
    );
  }
}