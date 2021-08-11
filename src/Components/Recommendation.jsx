import React, { Component } from 'react';
import authService from './Services/authService';

class recommendation extends Component {
    constructor(){
        super();
        const user = authService.getCurrentUser();
        console.log(typeof(user));
        this.state={
            userDetail:user,
    
        }
    }
    
    render() {
        return (
          <React.Fragment>
     {this.state.userDetail['seekername']}

          </React.Fragment>
        );
    }
}

export default recommendation;