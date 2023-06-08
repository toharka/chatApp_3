import React, { useState } from 'react';

function Username(props){

    const [showBubble, setShowBubble] = useState('');

    function Checkname(){
        if (props.username && props.username.current.value.length<4){
            return setShowBubble("user name must have at least 4 characters");
        }
        return setShowBubble("");
    }

    return(
        <div>
            Username
          <input type="text" className="shaisformcontrol form-control" id="exampleInputEmail1"
           aria-describedby="emailHelp" ref={props.username} onChange={Checkname}></input>
             <div className="bubble">{showBubble}</div>
        </div>
    );
}

export default Username;
