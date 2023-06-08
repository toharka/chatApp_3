import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Conect from './Conect/Conect';
import Register from './Register/Register';
import DisplayChat from './DisplayChat';
import { useUser } from './UserContext';
import { SocketProvider } from './SocketContext';

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={user?.username ? <SocketProvider><DisplayChat/></SocketProvider> :<Conect/>}
          />
          <Route path='/Register' element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
