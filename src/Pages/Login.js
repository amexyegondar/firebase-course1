import React, { useContext } from 'react'
import {LoginContext} from '../Helper/Context'
function Login() {
  const {LoggedIn,setLoggedIn}=useContext(LoginContext)
  return (
    <div>Login
    <button onClick={()=>{setLoggedIn(true)}}>CLick Me</button>
    
    {LoggedIn ? <h1>you are in rocket</h1>: <h1>you are still here???</h1>}
    </div>
  )
}

export default Login 