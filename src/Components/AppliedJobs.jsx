import React, { Component } from 'react';
import axios from 'axios';


class AppliedJobs extends Component {
    constructor(){
        super();
        this.state = {
            currentUser: {},
            jobslist: []
        }

    }

    async componentDidMount() {
        const user = localStorage.getItem("UserData");
        let parsedData = JSON.parse(user);
        this.setState({
          currentUser: parsedData
        });

        let allDetails = [];

        await axios.get(`http://localhost:5000/appliedjobs/${parsedData['_id']}`)
        .then(response => {
            allDetails = response.data;
            
        })
        .catch((err) =>{
            console.log(err);
        });

        const jobslist = allDetails.map((job) => { return(job.jobid) });
        this.setState({
            jobslist
        });
    }
    
    jobListing = async() => {
        let a=[];
         a = this.state.jobslist.map((jobid) => {
             axios.get(`http://localhost:5000/jobs/${jobid}`)
             .then(response => {
                return 'a'
            })
            .catch((err) =>{
                return 'b';
            });
           console.log(a)

        });
        
    }
    render() {
        {this.jobListing()}
        return (
            <React.Fragment>
                <div>
                    <h4>Jobs:</h4>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Jobname:</th>
                                <th>Description:</th>
                                <th>Deadline:</th>
                                <th>Status:</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

            </React.Fragment>
        );
    }
}

export default AppliedJobs;