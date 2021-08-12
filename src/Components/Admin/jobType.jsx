import React, { Component } from 'react';
import { select, Form } from 'react-bootstrap'
import axios from 'axios';

class jobtype extends Component {
    constructor() {
        super();

        this.state = {
            jobtypes: ['Others'],
            newjobtype: ""
        }
    }

     componentDidMount() {
         axios.get('http://localhost:5000/jobtypes')
            .then((response)=>{
                
                this.setState({jobtypes:response.data})
            }).catch(err=> console.log(err));
    }

    setNewJobType = (e) => {

        this.setState({
            newjobtype: e.currentTarget.value
        })
    }

    handleNewJobType = () => {
        const newJobType = {
            jobtype: this.state.newjobtype,

        }
        axios.post('http://localhost:5000/jobtypes/add', newJobType)
            .then(response => {
                this.setState({jobtypes: response.data,
                newjobtype: ""});
            }).catch(err => console.log(err))
    }
    

    render() {

        return (

            <div>
                JobTypes:

                <select class="form-select" aria-label="Default select example">
                    {
                        this.state.jobtypes.map((jobtype) => {
                            return (
                                <React.Fragment>
                                    <option key={jobtype['_id']} value={jobtype['jobtype']}>{jobtype['jobtype']}</option>

                                </React.Fragment>
                            )
                        })
                    }
                </select>

                <div class="input-group mb-3">
                    <Form.Label>Add new JobType</Form.Label>
                    <Form.Control
                        type="text"
                        value={this.state.newjobtype}
                        required
                        placeholder="Enter new job type"
                        onChange={this.setNewJobType}
                    />
                    <button type="submit" className="button" onClick={this.handleNewJobType}>Add job </button>
                </div>

            </div>
        );
    }
}

export default jobtype;