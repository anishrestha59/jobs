import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button} from 'react-bootstrap';
import "./login.css";
import Loading from '../Components/Loading';
import ErrorMessage from '../Components/ErrorMessage';


const LoginScreen = () => {
    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


    

    const submitHandler = async (event) =>{
        
        event.preventDefault();
        
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            setLoading(true)

            const { data } = await axios.post("http://localhost:5000/company/login",
                {
                    contact,
                    password,
                },
                config

            );

            setLoading(false);
            console.log(data);
            localStorage.setItem("UserData", JSON.stringify(data));
            window.location="/";

        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    }

    return (
        <div className="container" >
            {error && <ErrorMessage variant ="danger">{error}</ErrorMessage>}
            {loading && <Loading />}

            <Form onSubmit= { submitHandler }>
                <Form.Group className="mb-3" controlId="formBasicPhone">
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
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginScreen;
