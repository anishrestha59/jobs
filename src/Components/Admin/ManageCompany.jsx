import React, { Component } from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSearch, faTrash  } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
const Companies= (props) =>{
    return (
        <tr>
            <td><img className="rounded-circle"
                src={`/${props.companies['profile']}`}
                width="40" height="35"
                alt={props.companies['profile']}
            /> </td>
            <td>{props.companies['_id']}</td>
            <td>{props.companies['companyname']}</td>
            <td>{props.companies['contact']}</td>
            <td>
            <Link className="btn btn-dark" to={`/showcompany/${props.companies['_id']}`}>View</Link>
            
                <div onClick={props.handleDelete.bind(this, props.companies._id)} type="button" class="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash}/></div>

            </td>
        </tr>
    )
}

export default class ManageCompany extends Component {
    constructor(){
        super();
        this.state = {
            companyLists: [],
            companies: [],
            search:'',
            
        };

    }
     componentDidMount() {
        axios.get(`http://localhost:5000/company/getall`)
        .then(response => {
            console.log(response.data)
           this.setState({ companies:response.data });
       })
       .catch((err) =>{
           console.log(err);
       });
      

    }
        

    
    handleDelete = (companyid) => {
        
        axios.delete('http://localhost:5000/company/delete/'+companyid)
        .then(response => console.log(response.data));
        
        this.setState({
            companies: this.state.companies.filter(element => element._id !== companyid)
        })
        
    }
    
    handleSearch = (e)=>{
        this.setState({search:e.target.value})
        const filtered = this.state.companies.filter((company)=>{
            console.log(company._id,e.target.value)
            if(company._id === e.target.value){
                return company;
            }})
            this.setState({companies:filtered});
        }
        
        
        
        
        
        
        handleSearchButton = ()=>{
            const filtered = this.state.companies.filter((company)=>{
                console.log(company._id,this.state.search)
                if(company._id === this.state.search){
                    return company;
                }})
                this.setState({companies:filtered});
                
            }
            
            companyList(){
                
                return this.state.companies.map( (company) => {
                    return<Companies companies={company} key={company._id} handleDelete={ this.handleDelete } />;
                })
                }
            render() {
                return (
                    <React.Fragment>
                <div>
                <h4>  Applicants :</h4>
                <div className="form-outline">
    <Form.Control
                  type="text"
                  value={this.state.search}
                  required
                  placeholder="Search by companyid"
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
                            <th>Company ID:</th>
                            <th>CompanyName:</th>
                            <th>Contact:</th>
                            <th>Actions:</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.companyList() }
                    </tbody>
                </table>
            </div>

         </React.Fragment>
        )
    }
}
