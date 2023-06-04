import React, { useContext } from 'react';
import UserContext from "../Users/UserContext";
import './UserPic.css'

function UserPic() {
    const { currentUser } = useContext(UserContext);

    console.log(currentUser ? currentUser.photo : 'No current user');  // Log outside of JSX

    return (
        <ul className="list-group">
            <li className="list-group-item">
            <img className="circular-image" src={currentUser.photo ?currentUser.photo  : '/unknown.png'} alt="description of the image" width="30px" />

                <span style={{ fontSize: '8px' }}></span>
            </li>
        </ul>
    )
}

export default UserPic;
