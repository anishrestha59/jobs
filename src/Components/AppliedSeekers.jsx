import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes  } from '@fortawesome/free-solid-svg-icons'
const Seekers= (props) =>{
    
    return (
        <tr>
            <td>{props.seekers['seekername']}</td>
            <td>{props.seekers['skills']}</td>
            <td>{props.seekers['age']}</td>
            <td>
                <button style= { { backgroundColor: "Green", margin: "5px" } }><FontAwesomeIcon icon ={ faCheck } /></button>
                <button style= { { backgroundColor: "Red" } }><FontAwesomeIcon icon = { faTimes } /></button>

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

        const seekerLists = appliedDetails.map((appliedJobs) => { return(appliedJobs.seekerid) });
        this.setState({
            seekerLists
        });
        this.seekerListing();

    }
    
        seekerListing = async() => {
            console.log('seekerlisting');
        let a=[];
        let seekers = [];
         a = await this.state.seekerLists.map( (seekerid) => {
             axios.get(`http://localhost:5000/seeker/${seekerid}`)
             .then(response => {
            //    jobs.push(response.data);
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
            return<Seekers seekers={seeker} key={seeker._id} />;
        })
        }
    
    render() {
        return (
         <React.Fragment>
                <div>
                <h4>  Applicants :</h4>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
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
