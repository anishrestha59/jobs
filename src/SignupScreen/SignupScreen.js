import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import toast from "react-toastify";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import { Row, Col, Image, ListGroup, Card, Container } from "react-bootstrap";

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
  const [dummyProfilePic, setDummyProfile] = useState();

  //const [picMessage, setPicMessage] = useState(null);
  useEffect(() => {
    setDummyProfile("loginman.png");
  }, []);

  const imageUpload = (event) => {
    setDummyProfile("");
    setProfilePic(event.target.files[0]);
  };

  function checkConfirmPassword(event) {
    if (confirmPassword === event.target.value) setPasswordMatchError(false);
    else setPasswordMatchError(true);
  }

  function checkPassword(event) {
    if (password === event.target.value) {
      setPasswordMatchError(false);
    } else {
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

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("password doesnot match");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const formdata = new FormData();
        formdata.append("myFile", profilePic, profilePic.name);
        formdata.append("companyname", companyname);
        formdata.append("contact", contact);
        formdata.append("companyaddress", companyaddress);
        formdata.append("country", country);
        formdata.append("email", email);
        formdata.append("companywebsite", companywebsite);
        formdata.append("postalcode", postalcode);
        formdata.append("password", password);

        const { data } = axios
          .post("http://localhost:5000/company/", formdata, config)
          .then((response) => {
            localStorage.setItem("UserData", JSON.stringify(response.data));
            window.location = "/company/myjobs";
          })
          .catch((err) => {
            toast.error("phone already exist");
            setErrorBack("phone already exist");
            console.log(err);
          });
          localStorage.setItem("UserData", JSON.stringify(data));
          window.location = "/company/myjobs";

        // localStorage.setItem("UserData", JSON.stringify(data));
        // window.location = '/'
      } catch (error) {
        setLoading(false);
      }
    }
  };

  // const postDetails= ( pics ) => {

  //     if(!pics){
  //         return setPicMessage("please select an image");
  //     }else{
  //     setPicMessage(null);
  //     }

  // }

  return (
    <div>
      <div className="container">
        {errorPassword && (
          <ErrorMessage variant="danger">{errorPassword}</ErrorMessage>
        )}

        {loading && <Loading />}

        <div
          className="py-5"
          style={{ backgroundColor: "#696969", borderRadius: "25px" }}
        >
          <div
            className="py-3 mx-auto justify-content-center bg-light col-xl-5 col-lg-4 col-md-5 col-sm-6 col-12 "
            style={{ borderRadius: "25px" }}
          >
            <Form onSubmit={submitHandler}>
              <div
                className="d-flex justify-content-center py-3"
                style={{ backgroundColor: "#696969", borderRadius: "25px" }}
              >
                <div className=" display-5 fw-bold" style={{ color: " white" }}>
                  Company Signup
                </div>
              </div>
              <div className="d-flex justify-content-center  py-3">
                {dummyProfilePic && (
                  <img
                    src={dummyProfilePic}
                    className="d-flex justify-content-center "
                    style={{
                      backgroundColor: "#696969",
                      borderRadius: "150px",
                      maxHeight: 90,
                    }}
                  />
                )}

                {profilePic && (
                  <React.Fragment>
                    <Image
                      src={URL.createObjectURL(profilePic)}
                      alt={profilePic}
                      className="d-flex justify-content-center "
                      style={{
                        backgroundColor: "#696969",
                        borderRadius: "150%",
                        maxHeight: 90,
                        maxWidth: 90,
                      }}
                    />
                  </React.Fragment>
                )}
              </div>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <input
                  type="file"
                  reqired
                  className="form-control"
                  name="myFile"
                  accept="myFile/png, myFile/jpeg, myFile/jpg"
                  onChange={imageUpload}
                />
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={companyname}
                  required
                  placeholder="Enter Company Name"
                  onChange={(event) => setCompanyName(event.target.value)}
                />
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={contact}
                  required
                  placeholder="Enter Phone"
                  onChange={(event) => setContact(event.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your phone with anyone else.
                </Form.Text>
                {errorBack && (
                  <ErrorMessage variant="danger">{errorBack}</ErrorMessage>
                )}
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={companyaddress}
                  required
                  placeholder="Enter Address"
                  onChange={(event) => setAddress(event.target.value)}
                />
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  value={country}
                  required
                  placeholder="Country name"
                  onChange={(event) => setCountry(event.target.value)}
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  value={email}
                  required
                  placeholder="Enter email address"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  value={companywebsite}
                  required
                  placeholder="Enter Company Website"
                  onChange={(event) => setWebsite(event.target.value)}
                />
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="number"
                  value={postalcode}
                  required
                  placeholder="Enter Postal code"
                  onChange={(event) => setPostalCode(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  required
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  onInput={checkConfirmPassword}
                />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  required
                  placeholder="Confirm Password"
                  onChange={checkPassword}
                  onInput={(event) => setConfirmPassword(event.target.value)}
                />

                {passwordMatchError && (
                  <React.Fragment>
                    <Form.Text className="text-danger">
                      Password doesn't match!!
                    </Form.Text>
                  </React.Fragment>
                )}
              </Form.Group>
              <div className="d-flex justify-content-center d-grid gap-2 col-12 mx-auto">
                <button
                  type="submit"
                  class="btn btn-outline-primary btn-lg btn-block"
                >
                  REGISTER
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;