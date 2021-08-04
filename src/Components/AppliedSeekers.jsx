import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes  } from '@fortawesome/free-solid-svg-icons'
const Seekers= (props) =>{
    const appliedid = props.seekers['appliedid']
    return (
        <tr>
            <td><img className="rounded-circle" 
            src={`/${props.seekers['profile']}`} 
            width="40" height="35" 
            alt={props.seekers['profile']} 
            /> </td>
            <td>{props.seekers['seekername']}</td>
            <td>{props.seekers['skills']}</td>
            <td>{props.seekers['age']}</td>
            <td>
            <button name={appliedid} id="showseeker" style= { { backgroundColor: "Green", margin: "5px" } } onClick={ props.handleButton }><FontAwesomeIcon icon ={ faCheck } />View Seeker</button>
                
                <button name={appliedid} id ="accept" style= { { backgroundColor: "Green", margin: "5px" } } onClick={ props.handleButton }><FontAwesomeIcon icon ={ faCheck } /></button>
                <button name={appliedid} id ="reject" style= { { backgroundColor: "Red" } }  onClick={ props.handleButton }><FontAwesomeIcon icon = { faTimes } /></button>

            </td>
        </tr>
    )
}

export default class AppliedSeekers extends Component {
    constructor(){
        super();
        this.state = {
            seekerLists: [],
            seekers: []
        };

    }
    async componentDidMount() {
        let jobId = this.props.match.params.id;
        let appliedDetails = [];
        await axios.get(`http://localhost:5000/appliedjobs/appliedseekers/${ jobId }`)
        .then(response => {
            appliedDetails = response.data;
        })
        .catch((err) =>{
            console.log(err);
        });

        const seekerLists = appliedDetails.map((appliedJobs) => { 
            let obj;
            obj = {'seekerid': appliedJobs.seekerid, 'appliedid': appliedJobs._id}
            return(obj); 
        });
        this.setState({
            seekerLists
        });
        this.seekerListing();

    }
    
        seekerListing = async() => {
            console.log('seekerlisting');
        let a=[];
        let seekers = [];
         a = await this.state.seekerLists.map( (seeker) => {
             axios.get(`http://localhost:5000/seeker/${seeker['seekerid']}`)
             .then(response => {
            //    jobs.push(response.data);
               const obj = Object.assign(response.data, { appliedid: seeker['appliedid'] })
                console.log(obj);
                seekers = [...this.state.seekers, response.data];
                this.setState({ seekers });
            })
            .catch((err) =>{
                console.log(err);
            });
           
        });
    
        
    }

    seekersList(){
        console.log(this.state.seekers);
        return this.state.seekers.map( (seeker) => {
            return<Seekers seekers={seeker} key={seeker._id} handleButton={ this.handleButton } />;
        })
        }

    handleButton = (e) => {
        if(e.currentTarget.id === "showseeker")
        { 
               this.props.history.push('/showseeker/'+ e.currentTarget.name);
        }
        else if(e.currentTarget.id === "accept")
        {
           console.log(e.currentTarget.name);
        }
        else if(e.currentTarget.id === "reject")
        {    
            console.log(e.currentTarget.name);
        }
    }
    
    render() {
        return (
         <React.Fragment>
                <div>
                <h4>  Applicants :</h4>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th></th>
                            <th>SeekerName:</th>
                            <th>Expert in:</th>
                            <th>Age:</th>
                            <th>Actions:</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.seekersList() }
                    </tbody>
                </table>
            </div>

         </React.Fragment>
        )
    }
}
