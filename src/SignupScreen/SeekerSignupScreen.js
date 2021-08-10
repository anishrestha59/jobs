import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Loading from '../Components/Loading';
import ErrorMessage from '../Components/ErrorMessage';
import { Image } from 'react-bootstrap';


const SeekerSignupScreen = () => {
    const [jobtype, setJobType] = useState([]);
    const [selectedjobtype, setSelectedJobType] = useState('Others')
    const [seekername, setSeekerName] = useState("");
    const [gender, setGender] = useState("Male");
    const [seekeraddress, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");
    const [resume, setResume] = useState("");
    const [education, setEducation] = useState("");
    const [bestat, setBestAt] = useState("");

    const [salary, setSalary] = useState("");
    const [experience, setExperience] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPassword, setErrorMessage] = useState(null);
    const [errorBack, setErrorBack] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profilePic, setProfilePic] = useState();
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [dummyProfilePic, setDummyProfile] = useState();
    //const [picMessage, setPicMessage] = useState(null);


    useEffect(async () => {
        setDummyProfile('loginman.png')

        await axios.get('http://localhost:5000/jobtypes')
            .then((response) => {
                console.log(response)
                setJobType(response.data);
            }).catch(err => console.log(err));
    }, []);

    const imageUpload = (event) => {
        setDummyProfile('');
        setProfilePic(event.target.files[0]);
    }


    const submitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("password doesnot match");
        }
        else {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
                setLoading(true)

                const formdata = new FormData();
                formdata.append('myFile', profilePic, profilePic.name)
                formdata.append('seekername', seekername)
                formdata.append('gender', gender)
                formdata.append('seekeraddress', seekeraddress)
                formdata.append('age', age)
                formdata.append('contact', contact)
                formdata.append('currentskill', selectedjobtype)
                formdata.append('resume', resume)
                formdata.append('education', education)
                formdata.append('bestat', bestat)
                formdata.append('salary', salary)
                formdata.append('experience', experience)
                formdata.append('password', password)


                const { data } = await axios.post("http://localhost:5000/seeker/", formdata
                    ,
                    config,
                ).then((response) => {
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
                // setErrorBack(error.response.data.message); 
                setLoading(false);

            }
        }

    }

    function checkPassword(event) {

        if (password === event.target.value) {
            setPasswordMatchError(false);
        }
        else {
            setPasswordMatchError(true);
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

                <div className="py-5" style={{ backgroundColor: "#e9ecef" }}>
                    {errorBack && <ErrorMessage variant="danger">{errorBack}</ErrorMessage>}
                    {loading && <Loading />}
                    <div className="py-3 mx-auto justify-content-center bg-light col-xl-5 col-lg-4 col-md-5 col-sm-6 col-12 ">
                        <Form onSubmit={submitHandler}>

                            <div className="d-flex justify-content-center" style={{ backgroundColor: "#e9ecef" }}>
                                <h1 className="text-primary display-5">Seeker Signup</h1>
                            </div>


                            {dummyProfilePic &&
                                <img src={dummyProfilePic} height='200px' width="150px" />}
                            {profilePic
                                &&
                                <React.Fragment>
                                    <Image src={URL.createObjectURL(profilePic)}
                                        alt={profilePic} rounded fluid width="150px" height="200" />
                                </React.Fragment>
                            }
                            <Form.Group className="mb-3" controlId="formBasicPhone">

                                <input type="file" className="form-control" name="myFile" onChange={imageUpload} />
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={seekername}
                                    placeholder="Enter Your Name"
                                    onChange={(event) => setSeekerName(event.target.value)}
                                    required
                                />
                                <Form.Label>Gender</Form.Label>
                                <div className="form-check">
                                    <input  onClick={(event) => {
                                        setGender(event.target.id)
                        
                                    }} className="form-check-input" type="radio" name="flexRadioDefault" id="Female" />
                                    <label className="form-check-label" htmlFor="Female">
                                        Female
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input onClick={(event) => setGender(event.target.id)} 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="flexRadioDefault" 
                                    id="Male" 
                                    checked/>
                                    <label className="form-check-label" htmlFor="Male">
                                        Male
                                    </label>
                                </div>

                
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={seekeraddress}
                                    placeholder="Enter Your Address"
                                    onChange={(event) => setAddress(event.target.value)}
                                    required

                                />
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={age}
                                    placeholder="Enter age"
                                    onChange={(event) => setAge(event.target.value)}
                                    required

                                />
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={contact}
                                    placeholder="Enter Phone"
                                    onChange={(event) => setContact(event.target.value)}
                                    required

                                />
                                <Form.Text className="text-muted">
                                    We'll never share your phone with anyone else.
                                </Form.Text>
                                <Form.Label>Skills</Form.Label>


                                <select onClick={(e) =>{
                                  
                             setSelectedJobType(e.target.value)}
                                         } className="form-select" aria-label="Default select example">
                                <option selected>Others</option>
                                    {
                                        jobtype.map((jobtype) => {
                                            return (
                                                <React.Fragment>
                                                    <option 
                                                    key={jobtype['_id']}
                                                        value={jobtype['jobtype']}
                                                    >{jobtype['jobtype']}</option>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </select>

                                <Form.Label>Resume link:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={resume}
                                    placeholder="Resume link:  "
                                    onChange={(event) => setResume(event.target.value)}
                                    required

                                />

                                <Form.Label>Education</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={education}
                                    placeholder="Highest education achieved "
                                    onChange={(event) => setEducation(event.target.value)}
                                    required

                                />
                                <Form.Label>Best at</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={bestat}
                                    placeholder="Best at "
                                    onChange={(event) => setBestAt(event.target.value)}
                                    required

                                />

                                <Form.Label>Current Salary</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={salary}
                                    placeholder="Enter Salary"
                                    onChange={(event) => setSalary(event.target.value)}
                                    required

                                />

                                <Form.Label>Experience</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={experience}
                                    placeholder="Enter Experience"
                                    onChange={(event) => {
                                        setExperience(event.target.value)
                                    }}
                                    required

                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onInput={(e) => checkPassword(e)}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required

                                />
                                {errorPassword && <ErrorMessage variant="danger">{errorPassword}</ErrorMessage>}

                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    placeholder="Confirm Password"
                                    onInput={(e) => checkPassword(e)}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required

                                />
                                {passwordMatchError &&
                                    <React.Fragment>
                                        <Form.Text className="text-danger">
                                            Password doesn't match!!
                                        </Form.Text>
                                    </React.Fragment>}
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

export default SeekerSignupScreen;