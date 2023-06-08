import React, { useState } from 'react';

function Password(props) {
    const [showBubble, setShowBubble] = useState('');

    function Check() {
        if (props.password && props.password.current.value.length < 4) {
            return setShowBubble("invalid password");
        }
        setShowBubble("");
    };

    return (
        <div>
            password
            <input type="password" className="form-control shaisformcontrol" id="exampleInputPassword1" ref={props.password} onChange={Check}/>
            <div className="bubble">{showBubble}</div>
        </div>

    );


}

export default Password;
