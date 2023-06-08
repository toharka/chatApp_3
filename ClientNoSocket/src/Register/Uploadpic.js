import { useState } from "react";

function Uploadpic({ onImageUpload }) {
  const [photo, setPhoto] = useState('unknown.png');

  function handle(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e)=> {
      const imageBlob = e.target.result;
      onImageUpload(imageBlob);
      setPhoto(imageBlob);
    }

    reader.readAsDataURL(file)
  }

  return (
    <div>
      <div className="mb3shai mb-3 upload-container shaiupload">
        Upload image
        <input className=" shaisformcontrol form-control " type="file" id="exampleInputFile exampleInputFileshai" aria-label="File upload" onChange={handle}></input>
        <div className="upload-image"></div>
        <div className="image-preview"></div>
      </div>
      <div className="pic">
        <img className="photo" src={photo} alt="profilePic"/>
      </div>
    </div>
  );
}

export default Uploadpic;
