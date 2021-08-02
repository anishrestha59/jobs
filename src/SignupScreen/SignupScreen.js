import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import Loading from '../Components/Loading';
import ErrorMessage from '../Components/ErrorMessage';


const SignupScreen = () => {

    const [companyname, setCompanyName] = useState("");
    const [contact, setContact] = useState("");
    const [companyaddress, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [errorPassword, setErrorMessage] = useState(null);
    const [errorBack, setErrorBack] = useState(false);
    const [loading, setLoading] = useState(false);

    //const [picMessage, setPicMessage] = useState(null);


    function checkPassword(event) {

        if (password === event.target.value) {
            setPasswordMatchError(false);
        }
        else {
            setPasswordMatchError(true);
        }
    }

    // const passwordCheck = () =>{

    //     if(password !== confirmPassword){
    //         setPasswordMatchError(true);
    //     }
    //     else{
    //         setPasswordMatchError(false);
    //     }
    // }

    const submitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("password doesnot match");
        } else {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
                setLoading(true)

                const { data } = await axios.post("http://localhost:5000/company/",
                    {
                        companyname,
                        contact,
                        companyaddress,
                        password,
                    },
                    config,
                );

                setLoading(false);

                localStorage.setItem("UserData", JSON.stringify(data));
                window.location = "/";

            } catch (error) {
                setErrorBack('phone already exist');
                setLoading(false);
            }
        }

    }


    // const postDetails= ( pics ) => {

    //     if(!pics){
    //         return setPicMessage("please select an image");
    //     }else{
    //     setPicMessage(null);
    //     }

    // }


    return (
        <div>
            <div className="container" >
                {errorPassword && <ErrorMessage variant="danger">{errorPassword}</ErrorMessage>}

                {loading && <Loading />}

                <div className="py-5" style={{ backgroundColor: "#e9ecef" }}>
                    <div className="py-3 mx-auto justify-content-center bg-light col-xl-5 col-lg-4 col-md-5 col-sm-6 col-12 ">


                        <Form onSubmit={submitHandler}>

                            <div className="d-flex justify-content-center" style={{ backgroundColor: "#e9ecef" }}>
                                <h1 className="text-primary display-5">Company Signup</h1>
                            </div>

                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={companyname}
                                    placeholder="Enter Company Name"
                                    onChange={(event) => setCompanyName(event.target.value)}
                                />
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={contact}
                                    placeholder="Enter Phone"
                                    onChange={(event) => setContact(event.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your phone with anyone else.
                                </Form.Text>
                                {errorBack && <ErrorMessage variant="danger">{errorBack}</ErrorMessage>}
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={companyaddress}
                                    placeholder="Enter Address"
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    onInput={checkPassword}
                                />
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={checkPassword}
                                    onInput={(event) => setConfirmPassword(event.target.value)}

                                />

                                {passwordMatchError &&
                                    <React.Fragment>
                                        <Form.Text style={{ textColor: "red" }} className="text-muted ">
                                            Password doesn't match!!
                                        </Form.Text>
                                    </React.Fragment>
                                }

                            </Form.Group>
                            <div className="d-flex justify-content-center d-grid gap-2 col-12 mx-auto">
                                <button type="submit" class="btn btn-outline-primary btn-lg btn-block">REGISTER</button>

                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupScreen;