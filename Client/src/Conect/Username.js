import React, { useState } from 'react';

function Username(props) {
    const [showBubble, setShowBubble] = useState('');
    function Checkname(event) {

        if (props.username && props.username.current.value.length < 4) {
            setShowBubble("invalid username");
        }
        else {
            setShowBubble("");
        }
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
