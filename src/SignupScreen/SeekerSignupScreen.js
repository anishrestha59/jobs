import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Form, Button} from 'react-bootstrap';

import Loading from '../Components/Loading';
import ErrorMessage from '../Components/ErrorMessage';


const SeekerSignupScreen = () => {

    const [seekername, setSeekerName] = useState("");
    const [gender, setGender] = useState("");
    const [seekeraddress, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");
    const [skills, setSkills] = useState("");
    const [salary, setSalary] = useState("");
    const [experience, setExperience] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPassword, setErrorMessage] = useState(null);
    const [errorBack, setErrorBack] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [picMessage, setPicMessage] = useState(null);

    const submitHandler = async(event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            setErrorMessage("password doesnot match");
        }else{

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
                setLoading(true)

                const { data } = await axios.post("http://localhost:5000/seeker/",
                    {
                        seekername, 
                        gender, 
                        seekeraddress, 
                        age, 
                        contact, 
                        skills, 
                        salary, 
                        experience, 
                        password,
                    },
                    config,
                );

                setLoading(false);
                console.log(data);
                localStorage.setItem("UserData", JSON.stringify(data));

          } catch (error) {
                setErrorBack(error.response.data.message);
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
                {errorBack && <ErrorMessage variant="danger">{errorBack}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit= { submitHandler }>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={seekername}
                            placeholder="Enter Your Name"
                        onChange={(event) => setSeekerName(event.target.value)}
                        />
                          <Form.Label>Gender</Form.Label>
                        <Form.Control
                            type="text"
                            value={gender}
                            placeholder="Enter Your gender"
                        onChange={(event) => setGender(event.target.value)}
                        />
                          <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={seekeraddress}
                            placeholder="Enter Your Address"
                        onChange={(event) => setAddress(event.target.value)}
                        />
                           <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            value={age}
                            placeholder="Enter age"
                        onChange={(event) => setAge(event.target.value)}
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
                     <Form.Label>Skills</Form.Label>
                              <Form.Control
                            type="text"
                            value={skills}
                            placeholder="Enter Your skills"
                        onChange={(event) => setSkills(event.target.value)}
                        />
                           <Form.Label>Current Salary</Form.Label>
                        <Form.Control
                            type="number"
                            value={salary}
                            placeholder="Enter Salary"
                        onChange={(event) => setSalary(event.target.value)}
                        />

                        <Form.Label>Experience</Form.Label>
                        <Form.Control
                            type="text"
                            value={experience}
                            placeholder="Enter Experience"
                        onChange={(event) => setExperience(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                          <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default SeekerSignupScreen;
