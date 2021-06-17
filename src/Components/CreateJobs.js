import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateJobs extends Component {
    constructor(){
        super()
        this.state = {
            jobname: '',
            description: '',
            date: new Date()
        }

        this.changeJobname = this.changeJobname.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeDate = this.changeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeJobname(event){
        this.setState({
            jobname:event.target.value
        });
    }
    
    
    changeDescription(event){
        this.setState({
            description: event.target.value
        });
    }


    changeDate(Date) {
        this.setState({
            date: Date
        });
    }
   
 

    
    onSubmit(event){
        event.preventDefault();

        const registered = {
            jobname: this.state.jobname,
            description: this.state.description,
            date: this.state.date
        }
        console.log(registered);
        axios.post('http://localhost:5000/jobs/add', registered)
            .then(response => console.log(response.data))
            
    }


    render() {
        return( 
            <div>
                <div className= 'container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Jobname: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.jobname}
                                    onChange={this.changeJobname}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.changeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>Date: </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.changeDate}
                                    />
                                </div>
                            </div>

                            <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}
