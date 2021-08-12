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
import SeekerUserProfile from './Components/Seeker/SeekerUserProfile'
import Admin from './Components/Admin/adminHeader'
import JobType from './Components/Admin/jobType'
import Recommendation from './Components/Recommendation'
import SearchJobs from './Components/SearchJobs';
import AdminShowSeeker from './Components/Admin/AdminShowSeeker';
import ShowCompany  from './Components/ShowCompany';
import ManageSeekers from './Components/Admin/ManageSeekers';
import ManageCompany from './Components/Admin/ManageCompany';
import ManageJobs  from './Components/Admin/ManageJobs';
import AdminShowJobs from './Components/Admin/AdminShowJob';
 

import './App.css';



export default class App extends Component {

  state={
  };

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
            <Route path = "/showseeker/:id" component = { ShowSeeker }/>
            <Route path = "/seeker/userprofile/" component = { SeekerUserProfile } />
            <Route path = "/seeker/recommendation/" component = { Recommendation }/>
            <Route path = "/searchjobs" component ={ SearchJobs }/>
            <Route path = "/admin"  component = { Admin } />
            <Route path =  "/admin/jobtype/" exact component = { JobType } />
            <Route path = "/admin/adminshowseeker/:id" exact component={AdminShowSeeker}/>
            <Route path = "/showcompany/:id" exact component={ ShowCompany }/>
            <Route path = "/admin/adminshowjobs/:id" exact component={ AdminShowJobs }/>         
            <Route path = "/admin/manageseekers" exact component={ ManageSeekers }/>
            <Route path = "/admin/managecompany" exact component={ ManageCompany }/>
            <Route path = "/admin/managejobs" exact component={ ManageJobs }/>

            {/* render = { (props) =><ShowSeeker {...props} /> } */}
            
            
            </Container>
           </main>
            
          </Switch>
  
 
      </Router>
      </React.Fragment>
    );
  }
}
