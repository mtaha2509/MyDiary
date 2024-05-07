import React, { useState } from "react";
import "./page.css";
import { SideBar, MainNavBar, SelectionModal } from "../DiaryEntryPage";

function DiaryEntryPage() {
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
  };

  return (
    <>
      <div
        className="page-container"
        style={{
          backgroundImage: selectedTemplate
            ? `url(${selectedTemplate.backgroundImage})`
            : "none",
        }}
      >
        <SideBar
          toggleSidebar={toggleSidebar}
          sidebarExpanded={sidebarExpanded}
        />
        <div className="page-content">
          <MainNavBar />

          {/* Slot for the selected template */}
          <div className="className template-content">
            <div className="template-slot">
              {selectedTemplate ? (
                // Render the selected template here
                <div>
                  <h3>Template {selectedTemplate.id}</h3>
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
        <SelectionModal
          onClose={closeModal}
          onSelectTemplate={handleTemplateSelect}
        />
      )}
    </>
  );
}

export default DiaryEntryPage;
