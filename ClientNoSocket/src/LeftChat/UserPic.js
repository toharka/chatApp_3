import React from 'react';
import './UserPic.css'
import { useUser } from '../UserContext';

function UserPic() {
    const { user } = useUser();

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <img className="circular-image" src={user?.profilePic || "./unknown.png"} alt="profile pic" width="130px" />
                <div > {user?.displayName}</div>
            </li>
        </ul>
    )
}

export default UserPic;
