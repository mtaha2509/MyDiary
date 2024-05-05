import React, { useState } from "react";
import "./page.css";
import { SideBar, MainNavBar, SelectionModal } from "../DiaryEntryPage";

function DiaryEntryPage() {
  // State for tracking selected template ID
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
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  return (
    <>
      <div className="page-container">
        <SideBar  toggleSidebar={toggleSidebar} sidebarExpanded={sidebarExpanded} />
        <div className="page-content">
          <MainNavBar />
          <div>
            <a href="#" onClick={openModal} className="choose-template-button">
              Choose A template
            </a>
          </div>
          {/* Slot for the selected template */}
          <div className="template-slot">
            {selectedTemplate ? (
              // Render the selected template here
              <div>
                {/* Replace this with your template component */}
                <h3>Template {selectedTemplate}</h3>
                {/* Additional content of the selected template */}
              </div>
            ) : (
              // Render placeholder content if no template is selected
              <div className="empty-slot">
                <p>First you need to select a Template</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SelectionModal
          onClose={closeModal}
          onSelectTemplate={handleTemplateSelect}
        />
      )}
    </>
  );
}

export default DiaryEntryPage;
