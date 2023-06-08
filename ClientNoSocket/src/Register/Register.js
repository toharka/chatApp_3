import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Uploadpic from "./Uploadpic";
import Username from "./Username";
import Passconf from "./Passconf";
import Displayname from "./Displayname";
import '../Conect/connect.css'
import { Registration } from '../api';

function Register() {
  const pass = useRef('');
  const passconf = useRef('');
  const username = useRef('');
  const nickname = useRef('');
  const [showBubble, setShowBubble] = useState('');
  const [photoUrl, setPhotoUrl] = useState('./unknown.png');
  const navigate = useNavigate();

  function check(event) {
    event.preventDefault();

    if ((username && username.current.value.length >= 4) &&
     (pass && passconf && passconf.current.value === pass.current.value)
      && (nickname && nickname.current.value.length >= 4) && (pass && pass.current.value.length >= 4)) {

        const user = {
          username: username.current.value,
          password: pass.current.value,
          photo: photoUrl,
          nickname: nickname.current.value,
          contacts: [],
          messages: []
        }
        //users.push(user);
        const error = Registration(user);
        if(error === 1){
          setShowBubble("username is taken");
        }
        else {
          setShowBubble("");
          //לשלוח בקשה לשרת אם עבר בהצלחה
          navigate('/');
        }

    }
  };

  return (
    <form className='shaisform' onSubmit={check}>
      <div className="mb3shai mb-3">
        <Username username={username} />
        <div className="text-danger">{showBubble}</div>
        <Passconf pass={pass} passconf={passconf} />
        <Displayname nickname={nickname} />
        <br></br>
        <div>
             Already registered? <Link to="/">Click here</Link> to login
        </div>
        <br></br>
        <Uploadpic onImageUpload={setPhotoUrl} />
        <br />
        <button type="submit" className="btn btn-primary shaisbtn">Register</button>
      </div>
    </form>
  );
}

export default Register;
