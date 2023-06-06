import React, { useRef, useState, useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import users from "../Users/Users";
import UserContext from '../Users/UserContext';
import Uploadpic from "./Uploadpic";
import Username from "./Username";
import Passconf from "./Passconf";
import Displayname from "./Displayname";
import Linktocon from "./Linktocon";
import Bottonreg from "./Bottonreg";
import '../Conect/connect.css'
import { Registration } from '../api';

function Register() {
  const pass = useRef('');
  const passconf = useRef('');
  const username = useRef('');
  const nickname = useRef('');
  const [showBubble, setShowBubble] = useState('');
  const [photoUrl, setPhotoUrl] = useState('public/unknown.png');
  const { setCurrentUser } = useContext(UserContext);
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
          //users.push(user);

          //לשלוח בקשה לשרת אם עבר בהצלחה
          setCurrentUser(user);
          navigate('/');
        }
      
    }
  };

  return (
    <form className='shaisform' onSubmit={check}>
      <div className="mb3shai mb-3">
        <Username username={username} />
        <div className="bubble">{showBubble}</div>
        <Passconf pass={pass} passconf={passconf} />
        <Displayname nickname={nickname} />
        <br></br>
        <Linktocon />
        <br></br>
        <Uploadpic onImageUpload={setPhotoUrl} />
        <br />
        <Bottonreg />
      </div>
    </form>
  );
}

export default Register;
