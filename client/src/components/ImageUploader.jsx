// import React, { useState } from 'react';
// import axios from 'axios';

// function ImageUploader() {
//   const [image, setImage] = useState(null);

//   const token = localStorage.getItem('access_token'); // JWT stored after login

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]); // store selected file in state
//   };

//   const handleUpload = async () => {
//     if (!image) return alert("Please select an image.");

//     const formData = new FormData();
//     formData.append('image', image); // append file to form data

//     try {
//       await axios.post('http://localhost:5000/api/upload', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         withCredentials: true
//       });
//       alert('Image uploaded successfully!');
//     } catch (error) {
//       console.error(error);
//       alert('Upload failed.');
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button className='border-2 p-3 hover:bg-amber-200' onClick={handleUpload}>Upload Image</button>
//     </div>
//   );
// }

// export default ImageUploader;


import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('access_token'); // JWT stored after login

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // store selected file in state
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");

    const formData = new FormData();
    formData.append('image', image); // append file to form data

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Upload failed.');
    }
  };

  // Trigger the hidden file input click when icon clicked
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />

      {/* Upload icon */}
      <FaCloudUploadAlt
        size={50}
        color={image ? '#4caf50' : '#555'}
        onClick={handleIconClick}
        style={{ cursor: 'pointer', marginBottom: '10px' }}
        title="Click to select an image"
      />

      {/* Show selected file name */}
      {image && <p>Selected file: {image.name}</p>}

      {/* Upload button */}
      <button
        className='border-2 p-3 hover:bg-amber-200'
        onClick={handleUpload}
      >
        Upload Image
      </button>
    </div>
  );
}

export default ImageUploader;

