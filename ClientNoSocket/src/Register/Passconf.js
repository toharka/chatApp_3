import React, { useState } from 'react';

function Passconf(props) {
    const pass = props.pass;
    const passconf = props.passconf;
    const [showBubble, setShowBubble] = useState('');
    const [showBubble2, setShowBubble2] = useState('');

    function Checkname() {
        if (pass && pass.current.value.length < 4) {
            return setShowBubble("password must have at least 4 characters");
        }
        return setShowBubble("");
    }

    function Checkpassword() {
        if (pass && passconf && passconf.current.value !== pass.current.value) {
            setShowBubble2("passwords does not match");
        }
        setShowBubble2("");
    }

    return (
        <div>
            password
            <input type="password" className="form-control shaisformcontrol" id="exampleInputPassword1"
                ref={pass} onChange={Checkname}></input>
            <div className="bubble">{showBubble}</div>
            password confirmation
            <input type="password" className="form-control shaisformcontrol" id="exampleInputPassword1"
                ref={passconf} onChange={Checkpassword}></input>
            <div className="bubble">{showBubble2}</div>
        </div>
    );
}

export default Passconf;
