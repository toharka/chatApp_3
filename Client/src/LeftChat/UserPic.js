import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../Users/UserContext";
import './UserPic.css'
import {useNavigate, useLocation } from 'react-router-dom';
import { getUserInfo } from '../api';

function UserPic() {
    const [ user, setUser ] = useState({})
    const location = useLocation();
    // const { currentUser } = useContext(UserContext);

    useEffect(()=> {
        getUserInfo(location.state.username).then((response) => {
            setUser(response)
        })
    },[])


    return (
        
        <ul className="list-group">
            <li className="list-group-item">
            {/* <img className="circular-image" src={currentUser.photo ?currentUser.photo  : '/unknown.png'} alt="description of the image" width="30px" /> */}
            <img className="circular-image" src={user?.profilePic || "./unknown.png"} alt="description of the image" width="30px" />
                <span style={{ fontSize: '8px' }}></span>
            </li>
        </ul>
    )
}

export default UserPic;
