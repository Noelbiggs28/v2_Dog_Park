import Form from "../components/Form"
import { useState } from 'react';
import { signup } from '../api/authApi';
import {Navigate} from 'react-router-dom';



export default function Signup({url, handleSignupSubmit, handleInputChange, formData}) {
  const [responseMsg, setResponseMsg] = useState("")



  const handleSubmit = async (e) => {
    e.preventDefault()
    const context = {username: formData.username, password: formData.password}
    const response = await signup(context, url)
    if(response.password) {
      handleSignupSubmit()
    } else {
      setResponseMsg(response.username)
    }
  }
    return <Form formType={"Signup"} handleInputChange={handleInputChange} formData={formData} handleSubmit={handleSubmit} responseMsg={responseMsg}/>


}