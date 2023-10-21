
import './App.css'
import MiniDrawer from './components/mini_drawer'
import { useState, useEffect } from 'react';
import {createBrowserRouter,  RouterProvider} from "react-router-dom";
import UserContext from './contexts/UserContext';
import LoginOrSignup from './pages/LoginOrSignup';
import Logout from './pages/Logout';
import MyProfile from './pages/my_profile';
import Parks from './pages/parks';
function App() {
  const url="http://localhost:8000/api/"
  // const url= `${import.meta.env.VITE_BASE_URL}`
 
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [userToken, setUserToken] = useState(null)
  const [user, setUser] = useState(null)
  useEffect( () => {
    const token = localStorage.getItem("token")

    if(token) {
      setUserToken(token)
    }

  }, [])

  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    localStorage.setItem("token", token)
    setUserToken(token)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // url, handleInputChange, formData, handleToken
const router = createBrowserRouter([
  {
    path:"/",
    element:<MiniDrawer userToken={userToken}/>,
    children:[
      {index: true, element: <LoginOrSignup url={url} handleInputChange={handleInputChange} formData={formData} handleToken={handleToken}/>},
      {
        path:"/Logout",
        element:<Logout setUserToken={setUserToken} userToken={userToken} />
      },
      {
        path: "/MyProfile",
        element:<MyProfile url={url} user={user} setUser={setUser}/>
      },
      {
        path:"/Parks",
        element:<Parks url={url}/>
      },
    ]
  }
])
const router2 = createBrowserRouter([
  {
    path:"/",
    element:<LoginOrSignup url={url} handleInputChange={handleInputChange} formData={formData} handleToken={handleToken}/>
  },      
  {
    path:"/Logout",
    element:<Logout setUserToken={setUserToken} userToken={userToken} />
  },
])

  return (
    <>
    <UserContext.Provider value={userToken}>
      <RouterProvider router={userToken? router: router2} />
    </UserContext.Provider>
    </>
  )
}

export default App
