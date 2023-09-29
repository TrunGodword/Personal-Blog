import React from 'react'
import Home from "./Paths/Home"
import Login from "./Paths/Login"
import Register from "./Paths/Register"
import {Routes, Route} from 'react-router-dom'
import { UserContextProvider } from './userContext'
import Header from "./Paths/Header.jsx"
import CreatePost from './Paths/CreatePost'

const App = () => {
  return (
    <UserContextProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/create" element={<CreatePost/>}></Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App