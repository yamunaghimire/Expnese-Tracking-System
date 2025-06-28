import React from 'react';
import { FiTrash2, FiX } from 'react-icons/fi';

const EditableForm = ({ data, setData, handleConfirm, handleClose }) => {
  const handleAddItem = () => {
    const newItem = { name: '', quantity: 1, rate: 0, amount: 0 };
    setData({ ...data, items: [...(data.items || []), newItem] });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = data.items.filter((_, idx) => idx !== index);
    setData({ ...data, items: updatedItems });
  };

  return (
    <div className="fixed inset-0 bg-white p-9 overflow-y-auto z-50">
      {/* Close Button */}
      <button className="absolute top-4 right-4 text-black" onClick={handleClose}>
        <FiX size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-6">Receipt Details</h2>

      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Basic Receipt Details in Grey Boxes */}
        <div>
          {['merchantName', 'address', 'billDate', 'billNumber', 'totalAmount'].map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input
                className="w-full bg-gray-200 px-3 py-2  focus:outline-none"
                value={data[key]}
                onChange={(e) =>
                  setData({ ...data, [key]: key === 'totalAmount' ? parseFloat(e.target.value) : e.target.value })
                }
              />
            </div>
          ))}
        </div>

        {/* Items Section in Grey Box with Scroll */}
        <div className="  overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Items</h3>

          {data.items?.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-3">
              <input
                value={item.name}
                placeholder="Item name"
                onChange={(e) => {
                  const updated = [...data.items];
                  updated[idx].name = e.target.value;
                  setData({ ...data, items: updated });
                }}
                className="flex-1 bg-gray-200 px-1 text-center py-2  focus:outline-none"
              />
              <input
                type="number"
                value={item.quantity}
                placeholder="Qty"
                onChange={(e) => {
                  const updated = [...data.items];
                  updated[idx].quantity = parseFloat(e.target.value);
                  setData({ ...data, items: updated });
                }}
                className="w-20 bg-gray-200 px-1 text-center py-2  focus:outline-none"
              />
              <input
                type="number"
                value={item.rate}
                placeholder="Rate"
                onChange={(e) => {
                  const updated = [...data.items];
                  updated[idx].rate = parseFloat(e.target.value);
                  setData({ ...data, items: updated });
                }}
                className="w-20 bg-gray-200 px-1 text-center py-2  focus:outline-none"
              />
              <input
                type="number"
                value={item.amount}
                placeholder="Amount"
                onChange={(e) => {
                  const updated = [...data.items];
                  updated[idx].amount = parseFloat(e.target.value);
                  setData({ ...data, items: updated });
                }}
                className="w-24 bg-gray-200 px-1 text-center py-2  focus:outline-none"
              />
              <button onClick={() => handleRemoveItem(idx)} className="text-gray-500 hover:text-gray-200">
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}

          <button
            onClick={handleAddItem}
            className="w-[100px] mt-4  bg-gray-200  text-center py-2  hover:bg-blue-600 transition"
          >
            + Add Item
          </button>
        </div>

        {/* Confirm Button */}
        <button
          className="w-full bg-green-500 text-white py-3  text-lg hover:bg-green-600 transition"
          onClick={handleConfirm}
        >
          Confirm & Save
        </button>
      </div>
    </div>
  );
};

export default EditableForm;
