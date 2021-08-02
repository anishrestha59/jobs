import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button} from 'react-bootstrap';
import "./login.css";
import Loading from '../Components/Loading';
import ErrorMessage from '../Components/ErrorMessage';
import PropTypes from 'prop-types';

const LoginScreen = ( {jobid} ) => {

    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


    
console.log(jobid);
    const submitHandler = async (event) =>{
        
        event.preventDefault();
        
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            setLoading(true)

            const { data } = await axios.post("http://localhost:5000/seeker/login",
                {
                    contact,
                    password,
                },
                config

            );

            setLoading(false);
            
            localStorage.setItem("UserData", JSON.stringify(data));
            window.location="/";

        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    }

    return (
        <div className="container" >
            
            <div className="py-5" style={{ backgroundColor: "#e9ecef"  }}>
            <div className="py-3 mx-auto justify-content-center bg-light col-xl-5 col-lg-4 col-md-5 col-sm-6 col-12 ">
    
            <Form onSubmit= { submitHandler }>
                <div className=" d-flex justify-content-center" style={{ backgroundColor: "#e9ecef"  }}>
                    <h1 class="text-primary display-5">Seeker Login </h1>
                    
                </div>
                
            
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>seeker Phone</Form.Label>
                    <Form.Control
                        type="number"
                        value={ contact }
                        placeholder="Enter Phone"
                        onChange={(event) => setContact(event.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your phone with anyone else.
                    </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I accept Term of use" />
                </Form.Group>
                <div class="d-grid gap-2 col-12 mx-auto  d-flex justify-content-center">
                <button type="submit" class="btn btn-outline-primary btn-lg btn-block">LOGIN</button>
                </div>
               
            </Form>
            <a
              className="d-flex d-xl-flex justify-content-center  text-center"
              href="/"
            >
              <br />
              Forgot password?
            </a>
            <div className="mt-3">
              <p className="text-center">
                Don't have an account&nbsp;<a href="/register">Sign up</a>
              </p>
            </div>
            </div>
            </div>
        </div>
    )
}


 LoginScreen.propTypes = {
    jobid: PropTypes.string
 };
 
export default LoginScreen;