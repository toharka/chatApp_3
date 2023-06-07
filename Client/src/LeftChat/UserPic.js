import React from 'react';
import './UserPic.css'
function UserPic({ user }) {

    return (
        <ul className="list-group">
            <li className="list-group-item">
            <img className="circular-image" src={user?.profilePic || "./unknown.png"} alt="profile pic" width="30px" />
                <span style={{ fontSize: '8px' }}></span>
            </li>
        </ul>
    )
}

export default UserPic;
