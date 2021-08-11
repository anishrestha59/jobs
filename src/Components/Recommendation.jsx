import React, { Component } from 'react';
import authService from './Services/authService';
import MyJobsGrid from './Designedmodeljoblist/MyJobsGrid';
import axios from 'axios';

class recommendation extends Component {
    constructor(){
        super();
        const user = authService.getCurrentUser();
        this.state={
            userDetail:user,
            jobs:[],
    
        }
    }
    
    async componentDidMount() {
        await axios.get(`http://localhost:5000/jobs/jobtype/${this.state.userDetail['currentskill']}`)
        .then((response) => {
          console.log(response.data)
            this.setState({  
            jobs:response.data
          });
        })
        .catch((err) => {
          console.log(err,"cannot fetch")
        })
    }
    
    render() {
        return (
          <React.Fragment>
            <MyJobsGrid jobs={this.state.jobs}/>
          </React.Fragment>
        );
    }
}

export default recommendation;