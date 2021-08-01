import React, { Component } from 'react';
import axios from 'axios';

class ShowSeeker extends Component {
    constructor(){
        super();
        this.state={
            appliedid:"",
            appliedinfo: {},
            seekerinfo: {}
        }

    }

componentDidMount() {
    const appliedid = this.props.match.params.id;
    this.getAppliedInfo(appliedid);
    this.setState({
        appliedid
    });
  
}


getAppliedInfo = async(appliedid) =>{
   
        console.log('Getting applied info');

         await axios.get(`http://localhost:5000/appliedjobs/getdetail/${appliedid}`)
         .then(response => {
            this.setState({ appliedinfo: response.data});
            this.getSeekerInfo(response.data.seekerid);
        
        })

        .catch((err) =>{
            console.log(err);
        });

}

getSeekerInfo = (seekerid) =>{
    axios.get('http://localhost:5000/seeker/'+seekerid)
        .then(response => {
            this.setState({ seekerinfo: response.data });
        })
        .catch((err) => {
            console.log(err);
        })
}


    render() {
        return (
        <React.Fragment>
            <div>
                {console.log(this.state.seekerinfo.profile)}
            <img className="rounded-circle" src= {'/' + this.state.seekerinfo.profile} width="300" height="200" alt={this.state.seekerinfo.profile}/>

                SeekerName:{this.state.seekerinfo['seekername']}
                <br/>
                Gender:{this.state.seekerinfo['seekername']}
                <br/>

                Age:{this.state.seekerinfo['age']}
                <br/>
                Address:{this.state.seekerinfo['seekeraddress']}
                <br/>
                Contact:{this.state.seekerinfo['contact']}
                <br/>
                Skills:{this.state.seekerinfo['skills']}
                <br/>
                Experience:{this.state.seekerinfo['experience']}
                <br/>
                Current Salary:{this.state.seekerinfo['salary']}
            </div>

        </React.Fragment>
        );
    }
}

export default ShowSeeker;