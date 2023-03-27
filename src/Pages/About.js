import React, { useContext } from 'react'
import {LoginContext} from '../Helper/Context'

function About() {
  const {LoggedIn,setLoggedIn}=useContext(LoginContext)

  return (
    <div>About
        {LoggedIn ? <h1>you are in rocket</h1>: <h1>you are still here???</h1>}
</div>
  )
}

export default About