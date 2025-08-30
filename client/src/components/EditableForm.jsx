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
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Receipt Details</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Receipt Details */}
          <div className="space-y-4">
            {['merchantName', 'address', 'billDate', 'billNumber', 'totalAmount'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  className="w-full bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={data[key]}
                  onChange={(e) =>
                    setData({ ...data, [key]: key === 'totalAmount' ? parseFloat(e.target.value) : e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          {/* Items Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Items</h3>

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
                  className="flex-1 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-20 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-20 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-24 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button 
                  onClick={() => handleRemoveItem(idx)} 
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddItem}
              className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
            >
              + Add Item
            </button>
          </div>

          {/* Confirm Button */}
          <button
            className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition-colors"
            onClick={handleConfirm}
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableForm;


