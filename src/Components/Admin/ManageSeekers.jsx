import React, { Component } from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSearch, faTrash  } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
const Seekers= (props) =>{
    return (
        <tr>
            <td><img className="rounded-circle"
                src={`/${props.seekers['profile']}`}
                width="40" height="35"
                alt={props.seekers['profile']}
            /> </td>
            <td>{props.seekers['_id']}</td>
            <td>{props.seekers['seekername']}</td>
            <td>{props.seekers['contact']}</td>
            <td>
            <Link className="btn btn-dark" to={`/admin/adminshowseeker/${props.seekers['_id']}`}>View</Link>
            
                <div onClick={props.handleDelete.bind(this, props.seekers._id)} type="button" class="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash}/></div>

            </td>
        </tr>
    )
}

export default class ManageSeekers extends Component {
    constructor(){
        super();
        this.state = {
            seekerLists: [],
            seekers: [],
            search:'',
            totalseekers:''
            
        };

    }
     componentDidMount() {
        axios.get(`http://localhost:5000/seeker/getall`)
        .then(response => {
            console.log(response.data)
           this.setState({ seekers:response.data,
            totalseekers:response.data.length

        });

       })
       .catch((err) =>{
           console.log(err);
       });
      

    }
        

    seekersList(){
        
        return this.state.seekers.map( (seeker) => {
            return<Seekers seekers={seeker} key={seeker._id} handleDelete={ this.handleDelete } />;
        })
        }

    handleDelete = (seekerid) => {
   
            axios.delete('http://localhost:5000/seeker/delete/'+seekerid)
                .then(response => console.log(response.data));
                
            this.setState({
                seekers: this.state.seekers.filter(element => element._id !== seekerid)
            })
        
    }
    
    handleSearch = (e)=>{
        this.setState({search:e.target.value})
        const filtered = this.state.seekers.filter((seeker)=>{
            console.log(seeker._id,e.target.value)
            if(seeker._id === e.target.value){
                return seeker;
    }})
    this.setState({seekers:filtered});
    }



    


    handleSearchButton = ()=>{
        const filtered = this.state.seekers.filter((seeker)=>{
            console.log(seeker._id,this.state.search)
            if(seeker._id === this.state.search){
                return seeker;
    }})
    this.setState({seekers:filtered});
    
}
    
    render() {
        return (
         <React.Fragment>
                <div>
                <h4>  Total Seekers :  {this.state.totalseekers}</h4>
                <div className="form-outline">
    <Form.Control
                  type="text"
                  value={this.state.search}
                  required
                  placeholder="Search by seekerid"
                  onChange={this.handleSearch}
                />
  </div>
  <button  type="button" className="btn btn-primary">
    <i ><FontAwesomeIcon icon={faSearch} /></i>
  </button>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th></th>
                            <th>Seeker ID:</th>
                            <th>SeekerName:</th>
                            <th>Contact:</th>
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
