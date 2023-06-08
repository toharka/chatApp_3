import React, { useState } from 'react';

function Username(props) {
    const [showBubble, setShowBubble] = useState('');
    function Checkname() {
        if (props.username && props.username.current.value.length < 4) {
            return setShowBubble("invalid username");
        }
        setShowBubble("");
    };


    return (
        <div>
            Username
            <input type="text" className="form-control shaisformcontrol"  id="exampleInputEmail1"
                aria-describedby="emailHelp" ref={props.username} onChange={Checkname}></input>
                <div className="bubble">{showBubble}</div>
            <br></br>
        </div>

    );

}


export default Username;
