import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

class ShowSeeker extends Component {
    constructor(){
        super();
        this.state={
            textmessage: "",
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

updateMessage = async (message) => {
    const updateData = {
        seekerid: this.state.appliedinfo.seekerid,
        jobid: this.state.appliedinfo.jobid,
        message
      }
      

      await axios.post(`http://localhost:5000/appliedjobs/update/${this.state.appliedinfo._id}`, updateData)
        .then((res) => {
          console.log(res.data);
          toast.success("sent");
        }).catch((err) => {
            console.log(err);
            toast.error("error occured sending");
        })
        
    
}

handleMessage = (e) => {
    if(e.currentTarget.id === "invite"){
        this.updateMessage(e.currentTarget.id);
        
 
    }else if(e.currentTarget.id === "reject"){
        this.updateMessage(e.currentTarget.id);

    } 
    else if(e.currentTarget.id === "wait"){
        this.updateMessage(e.currentTarget.id);
    }
    else{
        this.updateMessage(this.state.textmessage);
        this.setState({ textmessage: ""});
    }
}
handleTextMessage = (e) => {
    this.setState({textmessage: e.currentTarget.value})
}

    render() {
        return (
        <React.Fragment>
            <div>
        
            <img className="rounded-circle" src= {'/' + this.state.seekerinfo.profile} width="300" height="200" alt={this.state.seekerinfo.profile}/>

                <br/>
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
            <div>
              <b>  Response to seeker:</b>
                <button id="invite" onClick={ this.handleMessage }>Invite to interview</button>
                <button id="reject" onClick={ this.handleMessage }>Reject</button>
                <button id="wait" onClick={ this.handleMessage }>Wait</button>
                <div class="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Short message</span>
                        </div>
                        <textarea onChange={this.handleTextMessage} value={this.state.textmessage} className="form-control" aria-label="With textarea"></textarea>
                    <Button onClick={this.handleMessage}>Send</Button>
                    </div>

            </div>

        </React.Fragment>
        );
    }
}

export default ShowSeeker;