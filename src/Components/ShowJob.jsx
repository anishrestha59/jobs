import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBuilding } from '@fortawesome/free-solid-svg-icons';



export default class ShowJob extends Component {
  state = {
    currentUser: {},
    jobDetail: {},
    jobId: "",
    companyDetails: {},
    alreadyApplied: false
  };

 async componentDidMount() {
    const user = localStorage.getItem("UserData");
    let parsedData = JSON.parse(user);
    this.setState({
      currentUser: parsedData
    })
    
    let jobId = this.props.match.params.id;
    let jobDetail
    await axios.get(`http://localhost:5000/jobs/${jobId}`)
      .then((response) => {
        jobDetail = response.data;
        this.setState({  
          jobDetail: response.data,
          jobId,
        });
      })
      .catch((err) => {
        console.log(err,"this is err")
      })
      this.getCompanyData(jobDetail.companyid);
      this.checkAlreadyApplied(jobId, parsedData._id )
  }


  getCompanyData = (companyid) => {
    axios.get(`http://localhost:5000/company/getdetails/${companyid}`)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          companyDetails: response.data,
        });
      });
      
  };

  checkAlreadyApplied = (jobid, seekerid) => {
    axios.get(`http://localhost:5000/appliedjobs/checkappliedjob/${jobid}/${seekerid}`)
      .then((response)=>{
        if(response.data.length === 0 ){
          console.log("yeah there are no applied jobs")
          this.setState({ alreadyApplied: false });
        }else{
          console.log("applied jobs true")
          this.setState({ alreadyApplied: true});
        }
      
      }).catch((err) => {
        console.log(err);
      })
  }

  handleApply = async () => {
      if(!this.state.alreadyApplied){  
        const applyJob = {
            jobid: this.state.jobId,
            seekerid: this.state.currentUser._id,
            message: "wait",
        }
       

        // console.log(this.props.history);
        
    await axios.post('http://localhost:5000/appliedjobs/add', applyJob)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        toast.error("already saved");
      })
    this.props.history.push("/jobs/appliedjobs");
  }
  else{
    toast.error("already applied");
  }
}
            
  render() {
    let Company = this.state.companyDetails;
    let Job = this.state.jobDetail;

    const { alreadyApplied } = this.state;
    return (
      <React.Fragment>
        <Link className='btn btn-dark my-3' to='/'>
                GO Back
        </Link>
        <Row>
          <Col md={6} >
            {console.log(this.state.companyDetails)}
            <Image src= {`/${this.state.companyDetails['profile']}`} alt={this.state.companyDetails['profile']} rounded  fluid alt={this.state.companyDetails['profile']} />   

            <Card className='my-5'>
            <Card.Body>
              <Card.Title className="bg-dark text-white">Company Details</Card.Title>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faBuilding} /> Company name : {this.state.companyDetails['companyname']} </Card.Subtitle>
              <Card.Subtitle className="mb-2 my-3 text-muted"> <FontAwesomeIcon icon={faPhone} /> Contact : {this.state.companyDetails.contact} </Card.Subtitle>
        
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Link className='btn btn-dark my-3' to='/'>
                COMPANY PROFILE
              </Link>
              
            </Card.Body>
              
              
            </Card>
          </Col>


          <Col md={6} >
            <div className="d-grid gap-2">
              <Button variant="outline-dark" className={ (alreadyApplied)? "disabled" : ""} size="lg" onClick={this.handleApply}>
                APPLY FOR JOB
              </Button>
           
            </div>
            <Card className='my-5'>
            <Card.Header className="bg-dark text-white d-flex justify-content-center" as="h5">Basic job information</Card.Header>
              
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row >
                    <Col >
                    <strong>Job Name : {this.state.jobDetail['jobname']}</strong>
                    </Col>
                    
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                    <strong> Job Type:  {this.state.jobDetail['jobtype']}</strong> 
                    </Col>
                  </Row>
                </ListGroup.Item>   
                <ListGroup.Item>
                  <Row>
                    <Col>
                    <strong> Monthly Salary:   {this.state.jobDetail['salary']}</strong> 
                    </Col>
                  </Row>
                </ListGroup.Item> 
                <ListGroup.Item>
                  <Row >
                    <Col >
                    <strong>jobshift : {this.state.jobDetail['jobshift']}</strong>
                    </Col>
                    
                  </Row>
                </ListGroup.Item>

              </ListGroup>  
            </Card>

            <Card className='my-5'>
            <Card.Header className="bg-dark text-white d-flex justify-content-center" as="h5">Basic specification</Card.Header>
              
              <ListGroup variant='flush'>
              <ListGroup.Item>
                  <Row >
                    <Col >
                    <strong>Education Degree : {this.state.jobDetail['jobname']}</strong>
                    </Col>
                    
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row >
                    <Col >
                    <strong>Experience : {this.state.jobDetail['experience']}</strong>
                    </Col>
                    
                  </Row>
                </ListGroup.Item>
                

              </ListGroup>  
            </Card>
            
            <div className="d-grid gap-2">
              <Button variant="outline-dark"
              className={ (alreadyApplied)? "disabled" : ""}
                size="lg" onClick={this.handleApply}>
                APPLY FOR JOB
              </Button>
              
            </div>
          </Col>
        </Row>    
      </React.Fragment>
    );
  }
}