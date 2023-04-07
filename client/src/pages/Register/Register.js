import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../components/Spiner/Spiner"
import { registerfunc } from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "./register.css"
import { addData } from '../../components/context/ContextProvider';

const Register = () => {

  const [inputdata, setInputData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    hobbies: ""
  });


  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData);


  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  //submit userdata
  const submitUserData = async (e) => {
    e.preventDefault();

    const { fullname, email, mobile, hobbies } = inputdata;

    if (fullname === "") {
      toast.error("Full name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (hobbies === "") {
      toast.error("Gender is Required !")
    }

    const data = new FormData();
    data.append("fullname", fullname)
    data.append("email", email)
    data.append("mobile", mobile)
    data.append("hobbies", hobbies)

    const config = {
      "Content-Type": "multipart/form-data"
    }

    const response = await registerfunc(data, config);

    if (response.status === 200) {
      setInputData({
        ...inputdata,
        fullname: "",
        email: "",
        mobile: "",
        hobbies: "",
      });
      setUseradd(response.data)
      navigate("/");
    } else {
      toast.error("Error!")
    }

  }





  return (
    <>

      <h2 className='text-center mt-1'>Register Your Details</h2>
      <Card className='shadow mt-3 p-3'>

        <Form>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" name='fullname' value={inputdata.fullname} onChange={setInputValue} placeholder='Enter Full Name' />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Mobile' />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Hobbies</Form.Label>
              <Form.Control type="text" name='hobbies' value={inputdata.hobbies} onChange={setInputValue} placeholder='Enter hobbies' />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitUserData}>
              Submit
            </Button>
          </Row>

        </Form>
      </Card>
      <ToastContainer position="top-center" />



    </>
  )
}

export default Register