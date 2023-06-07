import React, { useRef, useState } from 'react';

function Displayname(props){

    const inputRef = props.nickname;
    const [showBubble, setShowBubble] = useState('');


    function Checkname(event){
        
         if (inputRef && inputRef.current.value.length<4){
            setShowBubble("Display name must have at least 4 characters");
        }
        else{
            setShowBubble("");
        }
    }

    return(
        <div>
             {/* <label for="exampleInputEmail1" className="form-label">Display name</label> */}
             Display name
          <input type="text" className="form-control shaisformcontrol" id="exampleInputEmail1" aria-describedby="emailHelp"
          ref={inputRef}  onChange={Checkname}></input>
          <div className="bubble">{showBubble}</div>
        </div>
    );

}

export default Displayname;