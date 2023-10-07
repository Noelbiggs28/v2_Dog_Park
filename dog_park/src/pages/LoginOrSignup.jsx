
import { Button, outlinedInputClasses } from "@mui/material"

import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function LoginOrSignup({url, handleInputChange, formData, handleToken}) {
    const userToken = useContext(UserContext)
    const [isDisplayingQuestion, setIsDisplayingQuestion] = useState(true)
    const [isDisplayingLogin, setIsDisplayingLogin] = useState(false)
    const [isDisplayingSignup, setIsDisplayingSignup] = useState(false)
    const handleLoginButton =()=>{
      setIsDisplayingQuestion(false)
      setIsDisplayingLogin(true)
    }
    const handleSignupButton =()=>{
      setIsDisplayingQuestion(false)
      setIsDisplayingSignup(true)
    }
    const handleSignupSubmit =()=>{
      setIsDisplayingQuestion(true)
      setIsDisplayingSignup(false)
    }

    const handleLoginSubmit =()=>{
      setIsDisplayingQuestion(true)
      setIsDisplayingLogin(false)

    }

    return(
      <>
{/* display all the time */}
<h1>Welcome to the dog park</h1>

{/* display if not logged in */}

      {!userToken && isDisplayingQuestion &&<div>
        <p>Must login or signup to continue</p>
            <Button onClick={handleLoginButton} variant={"outlined"} >Login</Button>
            <Button onClick={handleSignupButton} variant={"outlined"} >Signup</Button>
            </div>}
        {isDisplayingLogin && <Login handleLoginSubmit={handleLoginSubmit} url={url} handleInputChange={handleInputChange} formData={formData} handleToken={handleToken}/>}
        {isDisplayingSignup && <Signup handleSignupSubmit={handleSignupSubmit} url={url} handleInputChange={handleInputChange} formData={formData} />}

      </>)}

