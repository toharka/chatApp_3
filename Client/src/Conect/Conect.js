import { BrowserRouter, Routes, Rout, Route, useNavigate } from 'react-router-dom';
import Bottoncon from './Bottoncon';
import Linktoreg from './Linktoreg';
import Password from './Password';
import Username from './Username';
import React, { useRef, useState, useContext } from 'react';  // Notice useContext is now imported here
import users from "../Users/Users";
import UserContext from '../Users/UserContext';
import { Connection } from '../api';

function Conect() {
    const password = useRef();
    const username = useRef();
    const [showBubble, setShowBubble] = useState('');
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(UserContext);

    async function check(event) {
        event.preventDefault()
        const token = await Connection(username.current.value,password.current.value);
        console.log('דקה לפני הsetItem',token);
        if (!(token === 0)){
           localStorage.setItem('token',token);
            navigate('../DisplayChat', { state: { username: username.current.value } });
        }
        // if (users && users.length > 0) {
        //     users.forEach((user) => {
        //         if (user.username === username.current.value && user.password === password.current.value) {
                    
        //         }
        //     });
        // }
        setShowBubble("user info incorrect");
        event.preventDefault()
    };

    return (
        <form className='shaisform' onSubmit={check}>
            <div className="mb-3 mb3shai">
                <Username username={username} />
                <Password password={password} />
                <div className="bubble">{showBubble}</div>
                <br></br>
                <Linktoreg />
                <br></br>
                <Bottoncon />
            </div>
        </form>
    );
}

export default Conect;
