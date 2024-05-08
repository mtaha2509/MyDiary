// page.jsx
import React, { useState } from "react";
import "./page.css";
import { SideBar, MainNavBar } from "../DiaryEntryPage"; // Import SideBar and MainNavBar
import { Diary_temp1, TimeCapsule } from "./../../assets"; // Import templates

function DiaryEntryPage() {
  // Define templates array with IDs starting from 1
  const templates = [
    { id: 1, name: "Template 1", thumbnail: Diary_temp1, description: "Description for Template 1", backgroundImage: `url(${Diary_temp1})` },
    { id: 2, name: "Template 2", thumbnail: Diary_temp1, description: "Description for Template 2", backgroundImage: `url(${Diary_temp1})` },
    { id: 3, name: "Template 3", thumbnail: Diary_temp1, description: "Description for Template 3", backgroundImage: `url(${Diary_temp1})` },
    { id: 4, name: "Template 4", thumbnail: TimeCapsule, description: "Description for Template 4", backgroundImage: `url(${TimeCapsule})` },
    // Add more templates as needed
  ];

  // State for tracking selected template
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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
                backgroundImage: selectedTemplate ? selectedTemplate.backgroundImage : "none",
              }}
            >
              {selectedTemplate ? (
                // Render the selected template here
                <div>
                  
                  {/* Additional content of the selected template */}
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
                  <img src={template.thumbnail} alt={template.name} />
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
