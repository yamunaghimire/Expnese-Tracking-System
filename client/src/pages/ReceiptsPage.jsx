import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReceiptDetailModal from '../components/ReceiptDetailModal'; 
import BottomNavbar from '../components/BottomNavbar';
import { FiSearch, FiTrash2, FiCalendar } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';

const ReceiptsPage = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/get-receipts', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setReceipts(res.data.receipts);
    } catch (err) {
      console.error(err);
      alert('Failed to load receipts.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/receipts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    setReceipts(receipts.filter(r => r.id !== id));
    if (selectedReceipt?.id === id) setSelectedReceipt(null);
  } catch (err) {
    console.error(err);
    alert('Failed to delete receipt.');
  }
};


  const filteredReceipts = receipts.filter(receipt => {
    const query = searchQuery.toLowerCase().trim();

    const merchantMatch = receipt.merchant_name?.toLowerCase().includes(query);
    const dateMatch = new Date(receipt.bill_date).toLocaleDateString().toLowerCase().includes(query);
    const itemsMatch = receipt.items?.some(item =>
      item.name?.toLowerCase().includes(query)
    );

    return merchantMatch || dateMatch || itemsMatch;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      <PageHeader
        title="My Receipts"
        subtitle="View and manage your scanned receipts"
      />

      <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="relative mb-6">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <FiSearch className="w-6 h-6" />
          </span>
          <input
            type="text"
            placeholder="Search by date, vendor, or item..."
            className="w-full border border-gray-300 rounded-full pl-12 pr-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center text-gray-500">Loading...</div>
        ) : filteredReceipts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            {filteredReceipts.map(receipt => (
              <div
                key={receipt.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative"
              >
                <div onClick={() => setSelectedReceipt(receipt)} className="cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{receipt.merchant_name}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          {new Date(receipt.bill_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">Rs {receipt.total_amount}</div>
                      <div className="text-xs text-gray-500 font-medium">Total Amount</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        Receipt ID: #{receipt.id}
                      </div>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(receipt.id);
                        }}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No results found.</div>
        )}
      </div>

      {selectedReceipt && (
        <ReceiptDetailModal
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          onDelete={() => handleDelete(selectedReceipt.id)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default ReceiptsPage;
