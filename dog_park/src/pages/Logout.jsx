import { Navigate } from "react-router-dom"

export default function Logout({setUserToken, userToken}) {

  const handleLogout = (e) => {
    e.preventDefault()
    setUserToken(null)
    localStorage.removeItem("token")
  }

  if(!userToken) {
    return <Navigate to="/"/>
  } else {
    return(
      <>
        <p>Are you sure you want to logout?</p>
        <button onClick={handleLogout}>Logout</button>
      </>
    )
  }

}