import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Conect from './Conect/Conect';
import Register from './Register/Register';
import './DisplayChat'
import DisplayChat from './DisplayChat';
import users from './Users/Users';
import UserContext from './Users/UserContext';
import { getUserInfo } from './api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ user, setUser ] = useState({})

  useEffect(()=> {
    // if we dont have a user, OR if we dont have ALL USER DATA
    if (!user || !user.profilePic) {
      getUserInfo(localStorage.getItem('username')).then((response) => {
          setUser(response)
      })
    }
  },[user])

  console.log("user?", user)

  const updateCurrentUser = (newUser) => {
    setUser(newUser)
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <Routes>
          <Route path='/' element={user?.username ? <DisplayChat user={user}/> :<Conect updateCurrentUser={updateCurrentUser}/>} />
          <Route path='/Register' element={<Register/>}></Route>
          {/* <Route path='/DisplayChat' element={user ? <DisplayChat/> : <Navigate to="/" />}/> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
