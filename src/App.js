import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from "./Components/Header";
import JobsList from "./Components/JobsList";
import CreateJobs from "./Components/CreateJobs";
import EditJobs from "./Components/EditJobs";
import CreateUsers from "./Components/CreateUsers";
import SignupCompany from './SignupScreen/SignupScreen';
import LoginCompany from "./LoginScreen/LoginScreen";

import './App.css';

function App() {
  return (
    <Router>
    <div className="container">
       <Header />
       <Switch> 
          <Route path = "/" exact component = { JobsList } />
          <Route path = "/jobs/update" component = { EditJobs } />
          <Route path = "/jobs/create" component = { CreateJobs } />
          <Route path = "/users/add"  component = { CreateUsers } />
          <Route path = "/company" exact component = { SignupCompany } />
          <Route path = "/company/login" component = { LoginCompany } />
          
        </Switch>

      </div>
    </Router>
  );
}

export default App;
