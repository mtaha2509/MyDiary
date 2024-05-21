import React from "react";
import "./Modal.css"; // Add CSS for styling the modal
import { TemplateCard } from "../../DiaryEntryPage"; // Import the TemplateCard component
import { Diary_temp1, TimeCapsule } from "../../../assets";

function SelectionModal({ onClose, onSelectTemplate, selectedTemplateId }) {
  // List of templates (you can replace this with your actual template data)

  // Function to handle template selection
  const handleTemplateSelect = (templateId) => {
    // Call the onSelectTemplate function passed from the parent component
    onSelectTemplate(templateId);
    // Close the modal
    onClose();
  };

  // Function to handle closing the modal without selecting any template
  const handleClose = () => {
    // Close the modal without selecting any template
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
              isSelected={template.id === selectedTemplateId} // Highlight the selected template
            />
          ))}
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default SelectionModal;
