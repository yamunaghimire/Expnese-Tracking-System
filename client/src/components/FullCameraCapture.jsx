import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { FiX, FiCamera } from 'react-icons/fi';

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
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative flex-grow">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />

        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-white text-black p-2 rounded-full shadow-md"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      {/* Bottom Capture Button */}
      <div className="p-4 bg-black/70 flex justify-center">
        <button
          onClick={handleCapture}
          className="bg-white text-black p-4 rounded-full shadow-lg"
        >
          <FiCamera className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default FullCameraCapture;