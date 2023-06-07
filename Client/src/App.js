import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Conect from './Conect/Conect';
import Register from './Register/Register';
import './DisplayChat'
import DisplayChat from './DisplayChat';
import users from './Users/Users';
import UserContext from './Users/UserContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <Routes>
            <Route path='/' element={<Conect/>}></Route>
            <Route path='/Register' element={<Register/>}></Route>
            <Route path='/DisplayChat' element={<DisplayChat/>}></Route>
            {/* <Route path='/DisplayChat' element={currentUser ? <DisplayChat/> : <Navigate to="/" />}></Route> */}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
