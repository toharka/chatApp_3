import { useState } from "react";

function Uploadpic({ onImageUpload }) {
  const [photo, setPhoto] = useState('unknown.png');
  
  function handle(event) {
    const file = event.target.files[0];
    const imageUrl = file ? URL.createObjectURL(file) : '/unknown.png';
    setPhoto(imageUrl);
    onImageUpload(imageUrl); // Pass the image url back to the parent component
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
        <img className="photo" src={photo}></img>
      </div>
    </div>
  );
}

export default Uploadpic;
