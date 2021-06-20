import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Form, Button} from 'react-bootstrap';

import Loading from '../Components/Loading';
import ErrorMessage from '../Components/ErrorMessage';


const SignupScreen = () => {

    const [companyname, setCompanyName] = useState("");
    const [contact, setContact] = useState("");
    const [companyaddress, setAddress] = useState("");
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
                console.log(data);
                localStorage.setItem("companyInfo", JSON.stringify(data));

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

export default SignupScreen;
