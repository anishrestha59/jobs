import React, { Component,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import jwtDecode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';


import Header from "./Components/Header";
import JobsList from "./Components/JobsList";
import CreateJobs from "./Components/CreateJobs";
import EditJobs from "./Components/EditJobs";
import CreateUsers from "./Components/CreateUsers";
import SignupCompany from './SignupScreen/SignupScreen';
import LoginCompany from "./LoginScreen/LoginScreen";
import LoginSeeker from "./LoginScreen/seekerLoginScreen";
import SignupSeeker from "./SignupScreen/SeekerSignupScreen";
import UserProfile from "./Components/UserProfile";
import MyJobs from './Components/MyJobs';
import ShowJob from './Components/ShowJob';
import AppliedJobs from './Components/AppliedJobs';
import AppliedSeekers from './Components/AppliedSeekers';
import ShowSeeker from './Components/ShowSeeker';

import './App.css';



export default class App extends Component {

  state={};

  componentDidMount() {
  
    let userData = (localStorage.getItem('UserData'));
    let parsedData = JSON.parse(userData);//converting string json to object
    
    this.setState({ parsedData });
  }
    
    render() {
      return (
      <React.Fragment>
      <Router>

         <Header user={this.state.parsedData}/>
        <ToastContainer/>
         <Switch> 
           <main className='py-3'>
             <Container>
           
            <Route path = "/" exact component = { JobsList }/>
            <Route path = "/jobs/update" component = { EditJobs }/>
            <Route path = "/jobs/create" component = { CreateJobs }/>
            <Route path = "/users/add"  component = { CreateUsers }/>
            <Route path = "/company" exact component = { SignupCompany }/>
            <Route path = "/company/login" component = { LoginCompany }/>
            <Route path = "/seeker/login" component = { LoginSeeker }/>
            <Route path = "/seeker/" exact component = { SignupSeeker }/>
            <Route path = "/userprofile/" component = { UserProfile }/>
            <Route path = "/company/myjobs/" exact component = { MyJobs }/>
            <Route path = "/job/:id" component = { ShowJob }/>
            <Route path = "/jobs/appliedjobs" component = { AppliedJobs }/>
            <Route path = "/jobs/appliedseekers/:id" component = { AppliedSeekers }/>
            <Route path = "/showseeker/:id" render = { (props) =><ShowSeeker {...props} /> } 
             component = { ShowSeeker}/>

            </Container>
           </main>
            
          </Switch>
  
 
      </Router>
      </React.Fragment>
    );
  }
}
