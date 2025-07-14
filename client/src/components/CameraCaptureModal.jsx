// // import React, { useRef } from 'react';
// // import Webcam from 'react-webcam';
// // import { FiX, FiCamera } from 'react-icons/fi';

// // const videoConstraints = {
// //   facingMode: "environment"
// // };

// // const FullCameraCapture = ({ onCapture, onClose }) => {
// //   const webcamRef = useRef(null);

// //   const handleCapture = () => {
// //     const imageSrc = webcamRef.current.getScreenshot();
// //     if (imageSrc) onCapture(imageSrc);
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black z-50 flex flex-col">
// //       <div className="relative flex-grow">
// //         <Webcam
// //           audio={false}
// //           ref={webcamRef}
// //           screenshotFormat="image/jpeg"
// //           videoConstraints={videoConstraints}
// //           className="w-full h-full object-cover"
// //         />

// //         {/* Top Close Button */}
// //         <button
// //           onClick={onClose}
// //           className="absolute top-5 right-5 bg-white text-black p-2 rounded-full shadow-md"
// //         >
// //           <FiX className="text-xl" />
// //         </button>
// //       </div>

// //       {/* Bottom Capture Button */}
// //       <div className="p-4 bg-black/70 flex justify-center">
// //         <button
// //           onClick={handleCapture}
// //           className="bg-teal-500 text-white p-4 rounded-full shadow-lg"
// //         >
// //           <FiCamera className="text-2xl" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FullCameraCapture;


// import React, { useRef } from 'react';
// import Webcam from 'react-webcam';
// import { FiX } from 'react-icons/fi';

// const videoConstraints = {
//   facingMode: 'environment',
// };

// const ShutterIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="white"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="w-10 h-10"
//   >
//     <path d="M12 12L20.59 5.41A9.97 9.97 0 0 1 21 12h-9zM12 12l-4.24 7.32A9.97 9.97 0 0 0 12 21v-9zm0 0l7.32-4.24A9.97 9.97 0 0 1 21 12h-9zm0 0L4.41 3.41A9.97 9.97 0 0 0 3 12h9z" />
//   </svg>
// );

// const FullCameraCapture = ({ onCapture, onClose }) => {
//   const webcamRef = useRef(null);

//   const handleCapture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) onCapture(imageSrc);
//   };

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex flex-col">
//       {/* Webcam Preview */}
//       <div className="relative flex-grow">
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           className="w-full h-full object-cover"
//         />

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-5 right-5 bg-white text-black p-2 rounded-full shadow-md"
//         >
//           <FiX className="text-xl" />
//         </button>

//         {/* Capture Button (Center Bottom) */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
//           <button
//             onClick={handleCapture}
//             className="w-20 h-20 rounded-full bg-black/70 flex items-center justify-center shadow-xl active:scale-95 transition"
//           >
//             <ShutterIcon />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullCameraCapture;
