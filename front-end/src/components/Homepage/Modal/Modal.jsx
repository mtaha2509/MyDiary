import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ show, onClose, content, title, templateUrl }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pagedContent, setPagedContent] = useState([]);

  useEffect(() => {
    if (content) {
      const pages = [];
      for (let i = 0; i < content.length; i += 200) {
        pages.push(content.slice(i, i + 200));
      }
      setPagedContent(pages);
    }
  }, [content]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, pagedContent.length - 1)
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  if (!show) {
    return null;
  }

  return (
    <div className="homepage-modal-overlay" onClick={onClose}>
      <div
        className="homepage-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: `url(${templateUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <button className="homepage-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="homepage-modal-body">
          <h2 className="modal-title">{title}</h2>
          <p className="modal-content">{pagedContent[currentPage]}</p>
          <div className="modal-pagination-buttons">
            <button onClick={handlePrevPage} disabled={currentPage === 0}>
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === pagedContent.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
