import React from 'react';
import { FiX } from 'react-icons/fi';

const ReceiptDetailModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 ">
      <div className="relative bg-white rounded-lg max-w-md w-full mx-4 shadow-lg p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FiX className="text-xl" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-4 pr-8">
          {receipt.merchant_name}
        </h2>

        {/* Receipt Image */}
        {receipt.image_path && (
          <div className="mb-4">
            <img
              src={`http://localhost:5000/${receipt.image_path}`}
              alt="Receipt"
              className="w-full rounded border"
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}

        {/* Bill Details */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date(receipt.bill_date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bill Number:</span>
            <span className="font-medium">{receipt.bill_number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-bold text-lg text-green-600">Rs {receipt.total_amount}</span>
          </div>
        </div>

        {/* Items */}
        {receipt.items && receipt.items.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Items</h3>
            <div className="space-y-2">
              {receipt.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-600">Rs {item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptDetailModal;
