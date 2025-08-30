import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { FiArrowLeft, FiCamera } from 'react-icons/fi';

const videoConstraints = {
  facingMode: "environment"
};

const FullCameraCapture = ({ onCapture, onClose }) => {
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) onCapture(imageSrc);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="w-full max-w-md h-screen relative overflow-hidden">
        {/* Full Screen Camera */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />

        {/* Overlaid Header with Back Button */}
        <div className="absolute top-0 left-0 p-4">
          <button
            onClick={onClose}
            className="text-white p-2 bg-black/30 rounded-full backdrop-blur-sm"
          >
            <FiArrowLeft className="text-2xl" />
          </button>
        </div>

        {/* Overlaid Footer with Capture Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center">
          <button
            onClick={handleCapture}
            className="bg-white text-black p-5 rounded-full shadow-lg"
          >
            <FiCamera className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullCameraCapture;