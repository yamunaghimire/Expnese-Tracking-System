import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';

const UploadScanOptions = ({ triggerUpload, handleScanClick }) => {
  return (
    <div className="absolute bottom-11 left-1/2 transform -translate-x-1/2 w-52 bg-white rounded-xl shadow-xl p-1 z-20">
      <button
        onClick={triggerUpload}
        className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-50 transition"
      >
        <FaCloudUploadAlt className="text-green-500 text-lg" />
        <span className="text-sm font-medium text-gray-700">Upload Receipt</span>
      </button>
      <button
        onClick={handleScanClick}
        className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-50 transition"
      >
        <FiCamera className="text-green-500 text-lg" />
        <span className="text-sm font-medium text-gray-700">Scan Receipt</span>
      </button>
    </div>
  );
};

export default UploadScanOptions;
