// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import ReceiptDetailModal from '../components/ReceiptDetailModal'; 

// // const ReceiptsPage = () => {
// //   const [receipts, setReceipts] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedReceipt, setSelectedReceipt] = useState(null);

// //   const token = localStorage.getItem('access_token');

// //   useEffect(() => {
// //     fetchReceipts();
// //   }, []);

// //   const fetchReceipts = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/receipts', {
// //         headers: { Authorization: `Bearer ${token}` },
// //         withCredentials: true,
// //       });
// //       setReceipts(res.data.receipts);
// //     } catch (err) {
// //       console.error(err);
// //       alert('Failed to load receipts.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filteredReceipts = receipts.filter(receipt => {
// //     const query = searchQuery.toLowerCase().trim();

// //     const merchantMatch = receipt.merchant_name?.toLowerCase().includes(query);
// //     const dateMatch = new Date(receipt.bill_date).toLocaleDateString().toLowerCase().includes(query);
// //     const itemsMatch = receipt.items?.some(item =>
// //       item.name?.toLowerCase().includes(query)
// //     );

// //     return merchantMatch || dateMatch || itemsMatch;
// //   });

// //   return (
// //     <div className="p-6 max-w-4xl mx-auto">
// //       <h1 className="text-3xl font-bold mb-6">My Receipts</h1>

// //       <input
// //         type="text"
// //         placeholder="Search by date, vendor, or item name..."
// //         className="border border-gray-300 rounded px-4 py-2 mb-6 w-full"
// //         value={searchQuery}
// //         onChange={e => setSearchQuery(e.target.value)}
// //       />

// //       {loading ? (
// //         <div className="flex justify-center items-center text-gray-500">Loading...</div>
// //       ) : filteredReceipts.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {filteredReceipts.map(receipt => (
// //             <div
// //               key={receipt.id}
// //               onClick={() => setSelectedReceipt(receipt)}
// //               className="border rounded p-4 cursor-pointer hover:shadow-lg transition"
// //             >
// //               <h2 className="text-xl font-semibold mb-1">{receipt.merchant_name}</h2>
// //               <p className="text-gray-700 mb-1">Total: NPR {receipt.total_amount}</p>
// //               <p className="text-gray-500 text-sm">
// //                 Date: {new Date(receipt.bill_date).toLocaleDateString()}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="text-center text-gray-500">No results found.</div>
// //       )}

// //       {selectedReceipt && (
// //         <ReceiptDetailModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
// //       )}
// //     </div>
// //   );
// // };

// // export default ReceiptsPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ReceiptDetailModal from '../components/ReceiptDetailModal'; 
// import BottomNavBar from '../components/BottomNavBar';

// const ReceiptsPage = () => {
//   const [receipts, setReceipts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedReceipt, setSelectedReceipt] = useState(null);

//   const token = localStorage.getItem('access_token');

//   useEffect(() => {
//     fetchReceipts();
//   }, []);

//   const fetchReceipts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/receipts', {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       setReceipts(res.data.receipts);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load receipts.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredReceipts = receipts.filter(receipt => {
//     const query = searchQuery.toLowerCase().trim();

//     const merchantMatch = receipt.merchant_name?.toLowerCase().includes(query);
//     const dateMatch = new Date(receipt.bill_date).toLocaleDateString().toLowerCase().includes(query);
//     const itemsMatch = receipt.items?.some(item =>
//       item.name?.toLowerCase().includes(query)
//     );

//     return merchantMatch || dateMatch || itemsMatch;
//   });

//   return (
//     <div className="min-h-screen bg-white flex flex-col pb-24">
//       <div className="px-4 pt-6 pb-2 bg-teal-500 text-white shadow-md">
//         <h1 className="text-2xl font-bold text-center pb-3">My Receipts</h1>
//       </div>

//       <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
//         <input
//           type="text"
//           placeholder="Search by date or vendor ..."
//           className="border border-gray-300 rounded-full px-4 py-2 mb-6 w-full shadow-sm  "
//           value={searchQuery}
//           onChange={e => setSearchQuery(e.target.value)}
//         />

//         {loading ? (
//           <div className="flex justify-center items-center text-gray-500">Loading...</div>
//         ) : filteredReceipts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {filteredReceipts.map(receipt => (
//               <div
//                 key={receipt.id}
//                 onClick={() => setSelectedReceipt(receipt)}
//                 className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer"
//               >
//                 <h2 className="text-lg font-semibold text-gray-800 mb-1">{receipt.merchant_name}</h2>
//                 <p className="text-sm text-gray-700 mb-1">Total: Rs {receipt.total_amount}</p>
//                 <p className="text-xs text-gray-500">{new Date(receipt.bill_date).toLocaleDateString()}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No results found.</div>
//         )}
//       </div>

//       {selectedReceipt && (
//         <ReceiptDetailModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
//       )}

//       <div className="fixed bottom-0 left-0 right-0 z-50">
//         <BottomNavBar />
//       </div>
//     </div>
//   );
// };

// export default ReceiptsPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReceiptDetailModal from '../components/ReceiptDetailModal'; 
import BottomNavBar from '../components/BottomNavBar';
import { FiSearch } from 'react-icons/fi';

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
      <div className="bg-teal-500 text-white px-4 py-4 text-center font-bold text-xl shadow-sm rounded-b-2xl sticky top-0 z-40">
  My Receipts
</div>

      <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="relative mb-6">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <FiSearch className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search by date, vendor, or item..."
            className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center text-gray-500">Loading...</div>
        ) : filteredReceipts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredReceipts.map(receipt => (
              <div
                key={receipt.id}
                onClick={() => setSelectedReceipt(receipt)}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{receipt.merchant_name}</h2>
                <p className="text-sm text-gray-700 mb-1">Total: Rs {receipt.total_amount}</p>
                <p className="text-xs text-gray-500">{new Date(receipt.bill_date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No results found.</div>
        )}
      </div>

      {selectedReceipt && (
        <ReceiptDetailModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default ReceiptsPage;
