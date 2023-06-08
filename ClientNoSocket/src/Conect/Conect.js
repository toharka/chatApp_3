import { Link } from 'react-router-dom';
import Password from './Password';
import Username from './Username';
import React, { useRef, useState } from 'react';  // Notice useContext is now imported here
import { Connection } from '../api';
import { useUser } from '../UserContext';

function Conect() {
    const password = useRef();
    const username = useRef();
    const [showBubble, setShowBubble] = useState('');
    const { updateUser } = useUser();

    async function check(event) {
        event.preventDefault()
        const token = await Connection(username.current.value, password.current.value);
        if (!(token === 0)){
           localStorage.setItem('token',token);
           localStorage.setItem('username', username.current.value);
           updateUser({ username: username.current.value })
        }
        setShowBubble("User info incorrect");
        event.preventDefault()
    };

    return (
        <form className='shaisform' onSubmit={check}>
            <div className="mb-3 mb3shai">
                <Username username={username} />
                <Password password={password} />
                <div className="bubble">{showBubble}</div>
                <br></br>
                <div className="pt-1 pb-1">
                    Not registered? <Link to="../Register">Click here</Link>
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary shaisbtn">Login</button>
            </div>
        </form>
    );
}

export default Conect;
