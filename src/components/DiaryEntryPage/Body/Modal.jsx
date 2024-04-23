// // Modal.js

// import React from 'react';

// const Modal = ({ isOpen, onClose, handleTemplateSelect }) => {
//   const templateOptions = ['template1.jpg', 'template2.jpg']; // Add your template image URLs here

//   return (
//     <>
//       {isOpen && (
//         <div className="modal-overlay" onClick={onClose}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>Choose Template</h2>
//             <div className="template-options">
//               {templateOptions.map((template, index) => (
//                 <div className="template-option" key={index} onClick={() => handleTemplateSelect(template)}>
//                   <img src={template} alt={`Template ${index + 1}`} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Modal;
