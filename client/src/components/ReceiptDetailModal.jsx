import React from 'react';
import { FiX } from 'react-icons/fi';

const ReceiptDetailModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg p-6">
        {/* Close Button
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close Modal"
        >
          <FiX className="text-2xl" />
        </button> */}

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-black mb-4">
          {receipt.merchant_name}
        </h2>

        {/* Receipt Image */}
        {receipt.image_path && (
          <div className="mb-4">
            <img
              src={`http://localhost:5000/${receipt.image_path}`}
              alt="Receipt"
              className="w-full rounded-md border shadow-sm"
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}

        {/* Details */}
        <div className="text-sm text-gray-700 space-y-1 mb-6">
          <p><span className="font-medium">Address:</span> {receipt.address}</p>
          <p><span className="font-medium">Bill Number:</span> {receipt.bill_number}</p>
          <p><span className="font-medium">Date:</span> {new Date(receipt.bill_date).toLocaleDateString()}</p>
          <p><span className="font-medium">Total Amount:</span> Rs {receipt.total_amount}</p>
        </div>

        {/* Items Table */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Items</h3>
          <div className="overflow-x-auto rounded-md shadow border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3 font-medium text-gray-700">Item</th>
                  <th className="py-2 px-3 font-medium text-gray-700">Qty</th>
                  <th className="py-2 px-3 font-medium text-gray-700">Rate</th>
                  <th className="py-2 px-3 font-medium text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {receipt.items && receipt.items.length > 0 ? (
                  receipt.items.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2 px-3">{item.name}</td>
                      <td className="py-2 px-3">{item.quantity}</td>
                      <td className="py-2 px-3">Rs {item.rate}</td>
                      <td className="py-2 px-3">Rs {item.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td className="py-2 px-3" colSpan="4">No items found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Optional Footer Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptDetailModal;
