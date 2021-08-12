import React, { Component } from "react";
//import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import { NavLink, Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faPlus,faSearch, fas } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./pagination/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./Common/listGroup";
import NewJobsList from './Designedmodeljoblist/NewJobsList';
import _ from "lodash";
import Header from './Header';
import { checkDeadline, getDateFiltered } from "./Common/FilterJobs";
import {Form} from 'react-bootstrap';



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
      <td>{props.jobs.jobtype}</td>
      <td className={checkDeadline(props.jobs.date)?"text-danger":""}>{props.jobs.date.substring(0, 10)}</td>
      <td>
     
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

    this.state = {
      currentPage: 1,
      pageSize: 7,
      selectedJobType: "All Jobs",
      showNewJobs: true,
      jobTypes: [],
      jobs: [],
      userData: {},
      selectedJob: "",
      sortColumn: { path: "jobname", order: "asc" },
      search:"",
      
    };
  }
  async componentDidMount() {
    let showNewJobs = localStorage.getItem("showNewJobs")
    if(showNewJobs === "true"){
      this.setState({
        showNewJobs: true
      })
    }
      else if(showNewJobs === "false"){
        this.setState({
          showNewJobs:false
        })
      }
    await axios
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

    this.getListItems();
  }

 getListItems = async () =>{
  
  await axios.get("http://localhost:5000/jobtypes/")
    .then((jobtype) =>{
      let jobtypes = [{"_id":"alljobs", "jobtype":"All Jobs"}, ...jobtype.data]
      this.setState({jobTypes: jobtypes})
    })
    .catch((err)=>console.log(err))
}


  jobsList() {
   
    return this.state.jobs.map((currentJobs) => {
      return (
        <Jobs
          jobs={currentJobs}
          userData={this.state.userData}
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

  toggleNewJobs = (e) =>{

    this.setState({showNewJobs:e.target.checked})
    localStorage.setItem("showNewJobs", JSON.stringify(e.target.checked));
  }

  handleSearch = (e) =>{
    this.setState({search: e.target.value})
  }

  handleSearchButton = ()=>{
      this.props.history.push(`/searchjobs?jobname=${this.state.search}`)
  }
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
      
    const filteredDate = getDateFiltered(filtered);
    const sorted = _.orderBy(filteredDate, [sortColumn.path], [sortColumn.order]);
    const jobs = paginate(sorted, currentPage, pageSize);
    
    
    return (
      <React.Fragment>
      <div className="row">
        <div className="col-2">
             {/* toggle the show new jobs herererererererere */}
{this.state.showNewJobs &&
   <div className="form-check form-switch" >

  <input className="form-check-input" 
    type="checkbox" 
    defaultChecked="true"
    id="flexSwitchCheckChecked" 
    onClick={this.toggleNewJobs}
  />
  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Show New Jobs</label>
</div>
}
{!this.state.showNewJobs && 
   <div className="form-check form-switch" >

   <input className="form-check-input" 
     type="checkbox" 
     defaultChecked=""
     id="flexSwitchCheckChecked" 
     onClick={this.toggleNewJobs}
   />
   <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Show New Jobs</label>
 </div>
  }

          <ListGroup
            items={this.state.jobTypes}
            selectedItem={this.state.selectedJobType}
            onItemSelect={this.selectJobType}
  
          />






        </div>
        <div className="col">
          <div className="row">
          <h4 className="col-8"> Jobs : </h4>
          <div className="col-4">
          <div className="input-group">
  <div className="form-outline">
    <Form.Control
                  type="text"
                  value={this.state.search}
                  required
                  placeholder="Search"
                  onChange={this.handleSearch}
                />
  </div>
  <button onClick={this.handleSearchButton} type="button" className="btn btn-primary">
    <i ><FontAwesomeIcon icon={faSearch} /></i>
  </button>
</div>
</div>
          </div>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Company:</th>
                <th onClick={() => this.handleSort("jobname")} style={{"cursor":"pointer"}}>Jobname:</th>
                <th>Jobtype:</th>
                <th onClick={() => this.handleSort("deadline")} style={{"cursor":"pointer"}}>Deadline:</th>
                {this.state.userData && this.state.userData['seekername'] && <th>Actions:</th>}
                {!this.state.userData && <th></th>}
              
              </tr>
            </thead>
            <tbody>
              {jobs.map((currentJobs) => {
                return (
                  <Jobs
                    jobs={currentJobs}
                    userData={this.state.userData}
          
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


          
          {this.state.showNewJobs &&
            <React.Fragment>
              <b>New Jobs</b>

              <NewJobsList />
            </React.Fragment>
          }
       
        </div>
        
      </div>
      </React.Fragment>
    );
  }
}