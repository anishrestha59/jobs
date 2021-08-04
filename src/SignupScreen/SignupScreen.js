import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import toast from 'react-toastify';
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
    const [profilePic, setProfilePic] = useState();
    const [country, setCountry] = useState();
    const [postalcode, setPostalCode] = useState();
    const [email, setEmail] = useState();
    const [companywebsite, setWebsite] = useState();
    

    //const [picMessage, setPicMessage] = useState(null);

    const imageUpload = (event) => {
          
        setProfilePic(event.target.files[0]);
    }

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
                const formdata = new FormData();
                formdata.append('myFile', profilePic, profilePic.name)
                formdata.append('companyname', companyname)
                formdata.append('contact', contact)
                formdata.append('companyaddress', companyaddress)
                formdata.append('country', country)
                formdata.append('email', email)
                formdata.append('companywebsite', companywebsite)
                formdata.append('postalcode', postalcode)
                formdata.append('password', password)
              

                const {data} = await axios.post("http://localhost:5000/company/",formdata,
                    config,
                )
                .then((response)=>{
                    
                    localStorage.setItem("UserData", JSON.stringify(response.data));
                    window.location = '/'
                    
                
                }).catch((err) => {
                    toast.error('phone already exist');
                    setErrorBack('phone already exist');
                    console.log(err);
                });
                
                localStorage.setItem("UserData", JSON.stringify(data));
                window.location = '/'

            } catch (error) {
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
                            <input type="file" className="form-control" name="myFile" onChange={imageUpload} />
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
                                 <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={country}
                                    placeholder="Country name"
                                    onChange={(event) => setCountry(event.target.value)}
                                />
                                 <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    placeholder="Enter email address"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                 <Form.Label>Website</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={companywebsite}
                                    placeholder="Enter Company Website"
                                    onChange={(event) => setWebsite(event.target.value)}
                                />
                                 <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={postalcode}
                                    placeholder="Enter Postal code"
                                    onChange={(event) => setPostalCode(event.target.value)}
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