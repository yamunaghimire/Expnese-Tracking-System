// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import { MdDocumentScanner } from 'react-icons/md';
// import { FaCloudUploadAlt } from 'react-icons/fa';
// import { FiCamera } from 'react-icons/fi';
// import LoadingIndicator from './LoadingIndicator'; // Keep this if you have a spinner component

// const ScanActionButton = () => {
//   const [showOptions, setShowOptions] = useState(false);
//   const [image, setImage] = useState(null);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fileInputRef = useRef(null);
//   const token = localStorage.getItem('access_token');

//   // Trigger file input click when upload option is clicked
//   const triggerUpload = () => {
//     setShowOptions(false);
//     fileInputRef.current.click();
//   };

//   // Handle actual file selection and upload to backend
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImage(file);

//     const formData = new FormData();
//     formData.append('image', file);

//     setLoading(true);
//     setData(null);

//     try {
//       const res = await axios.post('http://localhost:5000/api/upload', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });

//       setData(res.data.data);
//       alert('Image processed!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to process image.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle the scan button click — currently just alert, you can extend with camera logic later
//   const handleScanClick = () => {
//     setShowOptions(false);
//     alert('Scan Receipt clicked');
//   };

//   // Save edited receipt data back to backend
//   const handleConfirm = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/confirm-receipt', data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       });
//       alert('Receipt saved!');
//       // Optional: reset form after save
//       setImage(null);
//       setData(null);
//     } catch (err) {
//       console.error(err);
//       alert('Save failed.');
//     }
//   };

//   // Render editable fields for the extracted receipt data
//   const renderEditableForm = () => (
//     <div className="mt-20 max-w-xl mx-auto bg-white p-4 shadow rounded">
//       <h2 className="font-bold text-center mb-4">Review Extracted Data</h2>

//       {['merchantName', 'address', 'billDate', 'billNumber', 'totalAmount'].map((key) => (
//         <div key={key} className="mb-2">
//           <label className="block text-sm">{key}</label>
//           <input
//             className="w-full border px-2 py-1 rounded"
//             value={data[key]}
//             onChange={(e) =>
//               setData({ ...data, [key]: key === 'totalAmount' ? parseFloat(e.target.value) : e.target.value })
//             }
//           />
//         </div>
//       ))}

//       <h3 className="mt-4 font-semibold">Items</h3>
//       {data.items?.map((item, idx) => (
//         <div key={idx} className="border p-2 my-2 rounded">
//           <input
//             value={item.name}
//             placeholder="Item name"
//             onChange={(e) => {
//               const updated = [...data.items];
//               updated[idx].name = e.target.value;
//               setData({ ...data, items: updated });
//             }}
//             className="w-full mb-1 px-2 py-1 border rounded"
//           />
//           <div className="flex gap-2">
//             <input
//               type="number"
//               value={item.quantity}
//               onChange={(e) => {
//                 const updated = [...data.items];
//                 updated[idx].quantity = parseFloat(e.target.value);
//                 setData({ ...data, items: updated });
//               }}
//               className="w-full px-2 py-1 border rounded"
//             />
//             <input
//               type="number"
//               value={item.rate}
//               onChange={(e) => {
//                 const updated = [...data.items];
//                 updated[idx].rate = parseFloat(e.target.value);
//                 setData({ ...data, items: updated });
//               }}
//               className="w-full px-2 py-1 border rounded"
//             />
//             <input
//               type="number"
//               value={item.amount}
//               onChange={(e) => {
//                 const updated = [...data.items];
//                 updated[idx].amount = parseFloat(e.target.value);
//                 setData({ ...data, items: updated });
//               }}
//               className="w-full px-2 py-1 border rounded"
//             />
//           </div>
//         </div>
//       ))}

//       <button
//         className="w-full mt-4 bg-green-500 text-white py-2 rounded"
//         onClick={handleConfirm}
//       >
//         Confirm & Save
//       </button>
//     </div>
//   );

//   return (
//     <div className="relative">
//       {/* Hidden file input */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//       />

//       {/* Central Scan Button */}
//       <button
//         className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-500 p-4 rounded-full text-white shadow-lg z-10"
//         onClick={() => setShowOptions(!showOptions)}
//       >
//         <MdDocumentScanner className="text-2xl" />
//       </button>

//       {/* Popup Upload / Scan Options */}
//       {showOptions && (
//         <div className="absolute bottom-11 left-1/2 transform -translate-x-1/2 w-52 bg-white rounded-xl shadow-xl p-1 z-20">
//           <button
//             onClick={triggerUpload}
//             className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-purple-50 transition"
//           >
//             <FaCloudUploadAlt className="text-purple-500 text-lg" />
//             <span className="text-sm font-medium text-gray-700">Upload Receipt</span>
//           </button>
//           <button
//             onClick={handleScanClick}
//             className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-purple-50 transition"
//           >
//             <FiCamera className="text-purple-500 text-lg" />
//             <span className="text-sm font-medium text-gray-700">Scan Receipt</span>
//           </button>
//         </div>
//       )}

//       {/* Show loading spinner */}
//       {loading && <LoadingIndicator />}

//       {/* Show extracted & editable receipt data */}
//       {data && !loading && renderEditableForm()}
//     </div>
//   );
// };

// export default ScanActionButton;


import React, { useState, useRef } from 'react';
import axios from 'axios';
import { MdDocumentScanner } from 'react-icons/md';
import UploadScanOptions from './UploadScanOptions';
import EditableForm from './EditableForm';
import LoadingIndicator from './LoadingIndicator';

const ScanActionButton = () => {
  const [showOptions, setShowOptions] = useState(false);
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

      // setData(res.data.data);
      setData({
      ...res.data.data,
      image_path: res.data.image_path
    });
      alert('Image processed!');
    } catch (err) {
      console.error(err);
      alert('Failed to process image.');
    } finally {
      setLoading(false);
    }
  };

  const handleScanClick = () => {
    setShowOptions(false);
    alert('Scan Receipt clicked');
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
      alert('Receipt saved!');
      setImage(null);
      setData(null);
    } catch (err) {
      console.error(err);
      alert('Save failed.');
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

      {loading && <LoadingIndicator />}

      {data && !loading && (
        <EditableForm data={data} setData={setData} handleConfirm={handleConfirm} handleClose={() => {
    setData(null);
  }} />
      )}
    </div>
  );
};

export default ScanActionButton;






