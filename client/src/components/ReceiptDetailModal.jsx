import React from 'react';

const ReceiptDetailModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">{receipt.merchant_name}</h2>

        {receipt.image_path && (
          <img
            src={`http://localhost:5000/${receipt.image_path}`}
            alt="Receipt"
            className="w-full rounded mb-4"
          />
        )}

        <p><strong>Address:</strong> {receipt.address}</p>
        <p><strong>Bill Number:</strong> {receipt.bill_number}</p>
        <p><strong>Date:</strong> {new Date(receipt.bill_date).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> NPR {receipt.total_amount}</p>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Items:</h3>
          <ul className="list-disc list-inside max-h-48 overflow-y-auto">
            {receipt.items && receipt.items.length > 0 ? (
              receipt.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.quantity} × NPR {item.rate} = NPR {item.amount}
                </li>
              ))
            ) : (
              <li>No items found.</li>
            )}
          </ul>
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptDetailModal;
