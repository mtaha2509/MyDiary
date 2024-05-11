// SelectionModal.jsx
import React from "react";
import "./Modal.css"; // Add CSS for styling the modal
import { TemplateCard } from "../../DiaryEntryPage";// Import the TemplateCard component
import { Diary_temp1, TimeCapsule } from "../../../assets";


function SelectionModal({ onClose, onSelectTemplate }) {
  // List of templates (you can replace this with your actual template data)
  const templates = [
    { id: 1, name: "Template 1", thumbnail: Diary_temp1, description: "Description for Template 1", backgroundImage: "url($(Diary_temp1))"},
    { id: 2, name: "Template 2", thumbnail: Diary_temp1, description: "Description for Template 2" },
    { id: 3, name: "Template 3", thumbnail: Diary_temp1, description: "Description for Template 3" },
    { id: 4, name: "Template 4", thumbnail: TimeCapsule, description: "Description for Template 4" },
    { id: 4, name: "Template 4", thumbnail: TimeCapsule, description: "Description for Template 4" },
    { id: 4, name: "Template 4", thumbnail: TimeCapsule, description: "Description for Template 4" },
    { id: 4, name: "Template 4", thumbnail: TimeCapsule, description: "Description for Template 4" },
    { id: 4, name: "Template 4", thumbnail: TimeCapsule, description: "Description for Template 4" },
    { id: 4, name: "Template 4", thumbnail: TimeCapsule, description: "Description for Template 4" },
    { id: 4, name: "Template 4", thumbnail: TimeCapsule, description: "Description for Template 4" },
    // Add more templates as needed
  ];

  // Function to handle template selection
  const handleTemplateSelect = (templateId) => {
    // Call the onSelectTemplate function passed from the parent component
    onSelectTemplate(templateId);
    // Close the modal
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="choose-template-heading">Choose a Template</h2>
        <div className="template-thumbnails">
          {/* Map through the templates and render a TemplateCard for each */}
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              thumbnail={template.thumbnail}
              name={template.name}
              description={template.description}
              onSelect={() => handleTemplateSelect(template.id)}
            />
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SelectionModal;
