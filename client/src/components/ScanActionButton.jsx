import React, { useState, useRef } from 'react';
import axios from 'axios';
import { MdDocumentScanner } from 'react-icons/md';
import UploadScanOptions from './UploadScanOptions';
import EditableForm from './EditableForm';
import LoadingIndicator from './LoadingIndicator';
import { toast } from 'react-toastify';
import FullCameraCapture from './FullCameraCapture';

const ScanActionButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const token = localStorage.getItem('access_token');

  const triggerUpload = () => {
    setShowOptions(false);
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    setData(null);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setData({
        ...res.data.data,
        image_path: res.data.image_path
      });
      toast.success('Image processed!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to process image.');
    } finally {
      setLoading(false);
    }
  };

  const handleScanClick = () => {
    setShowOptions(false);
    setShowCamera(true);
  };

  const handleWebcamCapture = async (base64) => {
    const blob = await (await fetch(base64)).blob();
    const file = new File([blob], "receipt.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    setData(null);
    setShowCamera(false);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setData({
        ...res.data.data,
        image_path: res.data.image_path
      });
      toast.success("Image processed!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to process image.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post('http://localhost:5000/api/save-receipt', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      toast.success('Receipt saved!');
      setImage(null);
      setData(null);
    } catch (err) {
      console.error(err);
      toast.error('Save failed.');
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <button
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-500 p-4 rounded-full text-white shadow-lg z-10"
        onClick={() => setShowOptions(!showOptions)}
      >
        <MdDocumentScanner className="text-2xl" />
      </button>

      {showOptions && (
        <UploadScanOptions
          triggerUpload={triggerUpload}
          handleScanClick={handleScanClick}
        />
      )}

      {showCamera && (
        <FullCameraCapture
          onCapture={handleWebcamCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      {loading && <LoadingIndicator />}

      {data && !loading && (
        <EditableForm
          data={data}
          setData={setData}
          handleConfirm={handleConfirm}
          handleClose={() => setData(null)}
        />
      )}
    </div>
  );
};

export default ScanActionButton;



