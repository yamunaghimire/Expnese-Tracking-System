import React, { useState, useRef } from 'react';
import { MdDocumentScanner } from 'react-icons/md';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';
import axios from 'axios';

const ScanActionButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('access_token');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Upload failed.');
    }
  };

  const triggerUpload = () => {
    setShowOptions(false);
    fileInputRef.current.click();
  };

  const handleScanClick = () => {
    setShowOptions(false);
    alert('Scan Receipt clicked');
  };

  return (
    <div className="relative">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Central Scan Button */}
      <button
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-500 p-4 rounded-full text-white shadow-lg z-10"
        onClick={() => setShowOptions(!showOptions)}
      >
        <MdDocumentScanner className="text-2xl" />
      </button>

      {/* Compact Popup */}
      {showOptions && (
        <div className="absolute bottom-11 left-1/2 transform -translate-x-1/2 w-52 bg-white rounded-xl shadow-xl p-1 z-20">
          <button
            onClick={triggerUpload}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-purple-50 transition"
          >
            <FaCloudUploadAlt className="text-purple-500 text-lg" />
            <span className="text-sm font-medium text-gray-700">Upload Receipt</span>
          </button>
          <button
            onClick={handleScanClick}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-purple-50 transition"
          >
            <FiCamera className="text-purple-500 text-lg" />
            <span className="text-sm font-medium text-gray-700">Scan Receipt</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ScanActionButton;
