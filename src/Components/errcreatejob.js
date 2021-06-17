import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateJobs extends Component {
    constructor(){
        super()

        this.onChangeJobname = this.onChangeJobname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit =this.onSubmit.bind(this);


        this.state ={
            jobname:'',
            description:'',
            date:new Date(),
            //users:[]
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         users: ['test user'],
    //         username: 'test user'
    //     })
    // }



    onChangeJobname(e){
        this.setState({
            jobname: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(Date){
        this.setState({
            date: Date
        });
    }
    

    onSubmit(e){
        e.prevent.default();
        const jobs = {
            jobname: this.state.jobname,
            description: this.state.description,
            Date: this.state.date
        }
        
        console.log(jobs);
        

    }

    render() {
        return (
            <div>
                <h3>Create new job</h3>
                <form onSubmit= {this.onSubmit}>
                    {/* <div className="form-group">
                        <label>Username: </label>
                        <select ref="userName"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                    key={user}
                                    value={user}> {user} </option>
                                })
                            } 
                        </select>
                    </div> */}
                    <div className="form-group">
                        <label>Jobname: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.jobname}
                            onChange={this.onChangeJobname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}
