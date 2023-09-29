import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import React from "react";
import { UserContext } from "../userContext";

const Header = ()=> {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:5656/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:5656/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <div className='Header'>
        <div className='Logo'>
        <Link to="/">Blog</Link>
        </div>
        <div className='Navigation'>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Log out</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        </div>
    </div>
  )
}

export default Header