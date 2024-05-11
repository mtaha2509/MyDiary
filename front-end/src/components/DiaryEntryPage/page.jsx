// page.jsx
import React, { useState } from "react";
import "./page.css";
import { SideBar, MainNavBar } from "../DiaryEntryPage"; // Import SideBar and MainNavBar
import { Diary_temp1, TimeCapsule } from "./../../assets"; // Import templates
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

function DiaryEntryPage() {
  // Define templates array with IDs starting from 1
  const templates = [
    { id: 1, name: "Template 1", image: Diary_temp1, description: "Description for Template 1" },
    { id: 2, name: "Template 2", image: Diary_temp1, description: "Description for Template 2" },
    { id: 3, name: "Template 3", image: Diary_temp1, description: "Description for Template 3" },
    { id: 4, name: "Template 4", image: TimeCapsule, description: "Description for Template 4" },
    // Add more templates as needed
  ];

  // State for tracking selected template
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  // State for tracking user input
  const [userInput, setUserInput] = useState("");

  // State for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Close the modal
    closeModal();
  };

  // Function to handle user input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const handleProcedureContentChange = (content) => {
    console.log("content---->", content);
  };


  return (
    <>
      <div className="page-container">
        <SideBar toggleSidebar={toggleSidebar} sidebarExpanded={sidebarExpanded} />
        <div className="page-content">
          <MainNavBar />

          {/* Slot for the selected template */}
          <div className="template-content">
            <div
              className="template-slot"
              style={{
                backgroundImage: selectedTemplate ? `url(${selectedTemplate.image})` : "none",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                position: "relative", // Ensure the positioning context for the text input
              }}
            >
              {selectedTemplate ? (
                // Render the selected template here
                <div>
                  {/* Additional content of the selected template */}
                  <ReactQuill className="quill-editor"
                    modules={modules}
                    formats={formats}
                    value={userInput}
                    onChange={handleProcedureContentChange}
                    placeholder="Write here..."
                  >
                </ReactQuill>
                </div>
              ) : (
                // Render placeholder content if no template is selected
                <div className="empty-slot">
                  <p>First you need to select a Template</p>
                  <div>
                    <button onClick={openModal} className="choose-template-button">
                      Choose A template
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="choose-template-heading">Choose a Template</h2>
            <div className="template-thumbnails">
              {/* Map through the templates and render a TemplateCard for each */}
              {templates.map((template) => (
                <div key={template.id} className="template-card">
                  <img src={template.image} alt={template.name} />
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <button onClick={() => handleTemplateSelect(template)}>Select</button>
                </div>
              ))}
            </div>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DiaryEntryPage;
