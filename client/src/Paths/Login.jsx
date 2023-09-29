import React from 'react'
import { useState, useContext } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../userContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState('')
  const {setUserInfo} = useContext(UserContext)

  async function login(event){
    event.preventDefault();
    const response = await fetch("http://localhost:5656/login",{
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {"Content-Type": "application/json"},
      credentials: 'include',
    });
    if (response.ok){
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
        setRedirect(true)
      })
    }else{
      alert("Wrong credentials")
    }

  }

  if (redirect){
    return <Navigate to  ={"/"} />
  }

  return (
    <form className='Login' onSubmit={login}>
    <h1> Login </h1>
    <input type='text' placeholder='Username' value = {username} onChange={event => setUsername(event.target.value)}/>
    <input type='text' placeholder='Password' value = {password} onChange={event => setPassword(event.target.value)}/>
    <button>Login</button>
    </form>
  )
}

export default Login