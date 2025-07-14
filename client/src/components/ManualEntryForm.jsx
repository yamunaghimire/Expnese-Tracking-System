// import React, { useState } from 'react';
// import axios from 'axios';
// import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

// const ManualEntryForm = () => {
//   const navigate = useNavigate();
//   const [billNo, setBillNo] = useState('');
//   const [billDate, setBillDate] = useState('');
//   const [store, setStore] = useState('');
//   const [address, setAddress] = useState('');

//   const [items, setItems] = useState([]);
//   const [item, setItem] = useState({ name: '', qty: '', rate: '', amt: '' });
//   const [editIndex, setEditIndex] = useState(null);

//   const [totalAmount, setTotalAmount] = useState(0);

//   const calculateAmount = (qty, rate) => {
//     const q = parseFloat(qty);
//     const r = parseFloat(rate);
//     return !isNaN(q) && !isNaN(r) ? q * r : 0;
//   };

//   const handleAddOrUpdateItem = () => {
//     const amt = calculateAmount(item.qty, item.rate);
//     const newItem = { ...item, amt };

//     if (editIndex !== null) {
//       // Update existing item
//       const updatedItems = [...items];
//       const prevAmt = updatedItems[editIndex].amt;
//       updatedItems[editIndex] = newItem;
//       setItems(updatedItems);
//       setTotalAmount((prev) => prev - prevAmt + amt);
//       setEditIndex(null);
//     } else {
//       // Add new item
//       setItems((prev) => [...prev, newItem]);
//       setTotalAmount((prev) => prev + amt);
//     }

//     setItem({ name: '', qty: '', rate: '', amt: '' });
//   };

//   const handleEdit = (index) => {
//     setItem(items[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const amt = items[index].amt;
//     const newItems = items.filter((_, i) => i !== index);
//     setItems(newItems);
//     setTotalAmount((prev) => prev - amt);
//     if (editIndex === index) setEditIndex(null);
//   };

//   const handleSaveReceipt = async () => {
//     const payload = {
//       bill_no: billNo,
//       bill_date: billDate,
//       store,
//       address,
//       items,
//       total: totalAmount,
//     };

//     try {
//       const token = localStorage.getItem('access_token');
//       await axios.post('http://localhost:5000/api/save-receipt', payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert('Receipt saved successfully!');
//     } catch (error) {
//       console.error('Failed to save receipt:', error);
//       alert('Error saving receipt');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-green-100 text-black">
//       <div className="flex items-center px-5 pt-6 text-white font-semibold text-lg">
//         <FiArrowLeft className="mr-4 text-xl text-black" onClick={() => navigate('/')} />
//         MANUAL ENTRY
//       </div>

//       <div className="bg-white rounded-t-3xl px-5 py-6 mt-6">
//         {/* Bill Info */}
//         <label className="text-sm text-gray-600">Bill No.:</label>
//         <input
//           type="text"
//           value={billNo}
//           onChange={(e) => setBillNo(e.target.value)}
//           className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-4"
//         />

//         <label className="text-sm text-gray-600">Bill Date</label>
//         <div className="relative mb-4">
//           <input
//             type="date"
//             value={billDate}
//             onChange={(e) => setBillDate(e.target.value)}
//             className="w-full bg-gray-100 rounded-lg px-4 py-2 pr-10"
//           />
          
//         </div>

//         <label className="text-sm text-gray-600">Store</label>
//         <select
//           value={store}
//           onChange={(e) => setStore(e.target.value)}
//           className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-4"
//         >
//           <option value="">Select store</option>
//           <option value="Grocery">Grocery</option>
//           <option value="Pharmacy">Pharmacy</option>
//         </select>

//         <label className="text-sm text-gray-600">Address</label>
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-4"
//         />

//         {/* Item Fields */}
//         <label className="text-sm text-gray-600">Item Name</label>
//         <input
//           type="text"
//           placeholder="Input Text"
//           value={item.name}
//           onChange={(e) => setItem({ ...item, name: e.target.value })}
//           className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-2"
//         />

//         <div className="flex gap-2 mb-4">
//           <input
//             type="number"
//             placeholder="Qty"
//             value={item.qty}
//             onChange={(e) => setItem({ ...item, qty: e.target.value })}
//             className="w-1/2 bg-gray-100 rounded-lg px-3 py-2"
//           />
//           <input
//             type="number"
//             placeholder="Rate"
//             value={item.rate}
//             onChange={(e) => setItem({ ...item, rate: e.target.value })}
//             className="w-1/2 bg-gray-100 rounded-lg px-3 py-2"
//           />
//         </div>

//         <button
//           onClick={handleAddOrUpdateItem}
//           className="flex items-center text-teal-500 font-semibold text-sm mb-6"
//         >
//           {editIndex !== null ? 'Update Item' : 'Add Item'}
//           <FiPlus className="ml-2" />
//         </button>

//         {/* Item List */}
//         {items.length > 0 && (
//           <div className="mb-6">
//             <div className="font-medium text-sm mb-2">Added Items:</div>
//             <ul className="space-y-2 text-sm">
//               {items.map((it, idx) => (
//                 <li key={idx} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md">
//                   <span>
//                     {it.name} – Qty: {it.qty}, Rate: {it.rate}, Amt: {it.amt.toFixed(2)}
//                   </span>
//                   <div className="flex gap-2 text-teal-500 text-lg">
//                     <button onClick={() => handleEdit(idx)}><FiEdit2 /></button>
//                     <button onClick={() => handleDelete(idx)}><FiTrash2 /></button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Total */}
//         <label className="text-sm text-gray-600">Total Amount</label>
//         <input
//           type="number"
//           readOnly
//           value={totalAmount.toFixed(2)}
//           className="w-full bg-gray-100 rounded-lg px-4 py-2 mt-1 mb-6"
//         />

//         {/* Save Receipt */}
//         <button
//           onClick={handleSaveReceipt}
//           className="w-full bg-gray-100 text-black font-medium py-3 rounded-lg"
//         >
//           Save Receipt
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ManualEntryForm;



import React, { useState } from 'react';
import axios from 'axios';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomNavBar from '../components/BottomNavBar';

const ManualEntryPage = () => {
  const [billNo, setBillNo] = useState('');
  const [billDate, setBillDate] = useState('');
  const [store, setStore] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ name: '', qty: '', rate: '', amt: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const calculateAmount = (qty, rate) => {
    const q = parseFloat(qty);
    const r = parseFloat(rate);
    return !isNaN(q) && !isNaN(r) ? q * r : 0;
  };

  const handleAddOrUpdateItem = () => {
    const amt = calculateAmount(item.qty, item.rate);
    const newItem = { ...item, amt };

    if (editIndex !== null) {
      const updatedItems = [...items];
      const prevAmt = updatedItems[editIndex].amt;
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setTotalAmount((prev) => prev - prevAmt + amt);
      setEditIndex(null);
    } else {
      setItems((prev) => [...prev, newItem]);
      setTotalAmount((prev) => prev + amt);
    }

    setItem({ name: '', qty: '', rate: '', amt: '' });
  };

  const handleEdit = (index) => {
    setItem(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const amt = items[index].amt;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setTotalAmount((prev) => prev - amt);
    if (editIndex === index) setEditIndex(null);
  };

  const handleSaveReceipt = async () => {
    if (!billNo || !billDate || !store || !address) {
      toast.error('Please fill all bill fields.');
      return;
    }
    if (items.length === 0) {
      toast.error('Please add at least one item.');
      return;
    }

    const payload = {
      bill_no: billNo,
      bill_date: billDate,
      store,
      address,
      items,
      total: totalAmount,
    };

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:5000/api/save-receipt', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Receipt saved successfully!');
    } catch (error) {
      console.error('Error saving receipt:', error);
      toast.error('Failed to save receipt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />

      {/* Header */}
      <div className="bg-teal-500 text-white px-4 py-4 text-center font-bold text-xl shadow-sm rounded-b-2xl">
  Manual Entry
</div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Section: Bill Info */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Bill Details</h2>
          <input
            type="text"
            placeholder="Bill No."
            value={billNo}
            onChange={(e) => setBillNo(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="date"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            placeholder="Store name"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Section: Add Item */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Add Item</h2>
          <input
            type="text"
            placeholder="Item name"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none"
          />

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Qty"
              value={item.qty}
              onChange={(e) => setItem({ ...item, qty: e.target.value })}
              className="w-1/2 px-4 py-2 rounded-xl bg-gray-100 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) => setItem({ ...item, rate: e.target.value })}
              className="w-1/2 px-4 py-2 rounded-xl bg-gray-100 focus:outline-none"
            />
          </div>

          <button
            onClick={handleAddOrUpdateItem}
            className="text-sm text-teal-600 font-medium flex items-center gap-2"
          >
            {editIndex !== null ? 'Update Item' : 'Add Item'} <FiPlus />
          </button>
        </div>

        {/* Section: Item List */}
        {items.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
            <h2 className="text-sm font-semibold text-gray-700">Added Items</h2>
            {items.map((it, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm bg-gray-50 px-3 py-2 rounded-xl"
              >
                <span>
                  {it.name} – Qty: {it.qty}, Rate: {it.rate}, Amt: {it.amt.toFixed(2)}
                </span>
                <div className="flex gap-2 text-teal-600 text-lg">
                  <button onClick={() => handleEdit(idx)}><FiEdit2 /></button>
                  <button onClick={() => handleDelete(idx)}><FiTrash2 /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section: Total Amount */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <label className="text-sm text-gray-600">Total Amount</label>
          <input
            type="number"
            readOnly
            value={totalAmount.toFixed(2)}
            className="w-full mt-1 px-4 py-2 rounded-xl bg-gray-100 text-gray-800 font-medium"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-20 left-4 right-4 z-40">
        <button
          onClick={handleSaveReceipt}
          disabled={loading}
          className="w-full bg-teal-500 text-white py-3 rounded-xl font-semibold shadow hover:bg-teal-600"
        >
          {loading ? 'Saving...' : 'Save Receipt'}
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default ManualEntryPage;
