import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload, FiPlus } from 'react-icons/fi';

const ScannedEntryForm = () => {
  const [billNo, setBillNo] = useState('');
  const [billDate, setBillDate] = useState('');
  const [store, setStore] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('receipt', file);

    try {
      const response = await axios.post('http://localhost:5000/api/parse-receipt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;
      setBillNo(data.bill_no || '');
      setBillDate(data.bill_date || '');
      setStore(data.store || '');
      setAddress(data.address || '');
      setItems(data.items || []);

      const sum = data.items.reduce((acc, item) => acc + parseFloat(item.amt), 0);
      setTotal(sum);
    } catch (err) {
      console.error('Error parsing receipt:', err);
      alert('Failed to process receipt.');
    }
  };

  return (
    <div className="bg-white min-h-screen p-5 rounded-t-3xl">
      <label className="block text-sm font-medium mb-1 text-gray-600">Upload Receipt</label>
      <div className="flex items-center mb-4">
        <input type="file" accept="image/*" onChange={handleUpload} className="w-full" />
        <FiUpload className="ml-2 text-xl text-gray-500" />
      </div>

      {/* Form Fields */}
      <label className="text-sm text-gray-600">Bill No.:</label>
      <input value={billNo} className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-4" readOnly />

      <label className="text-sm text-gray-600">Bill Date</label>
      <input value={billDate} className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-4" readOnly />

      <label className="text-sm text-gray-600">Store</label>
      <input value={store} className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-4" readOnly />

      <label className="text-sm text-gray-600">Address</label>
      <input value={address} className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-4" readOnly />

      {items.map((item, idx) => (
        <div key={idx} className="mb-4 bg-gray-50 p-3 rounded-lg text-sm">
          <div className="mb-1 font-medium">{item.name}</div>
          <div className="flex justify-between text-gray-700">
            <span>Qty: {item.qty}</span>
            <span>Rate: Rs. {item.rate}</span>
            <span>Amt: Rs. {item.amt}</span>
          </div>
        </div>
      ))}

      <label className="text-sm text-gray-600">Total Amount</label>
      <input value={`Rs. ${total.toFixed(2)}`} readOnly className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-6" />

      <button className="w-full bg-gray-100 text-black font-medium py-3 rounded-lg flex items-center justify-center">
        Save Receipt <FiPlus className="ml-2" />
      </button>
    </div>
  );
};

export default ScannedEntryForm;
