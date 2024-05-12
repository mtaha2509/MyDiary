import React, { useState } from "react";
import "./page.css";
import { SideBar, MainNavBar } from "../DiaryEntryPage"; // Import SideBar and MainNavBar
import { Diary_temp1, TimeCapsule } from "./../../assets"; // Import templates

function DiaryEntryPage() {
  // Define templates array with IDs starting from 1
  const templates = [
    { id: 1, name: "Template 1", image: "https://img.freepik.com/free-photo/abstract-uv-ultraviolet-light-composition_23-2149243965.jpg?t=st=1715459506~exp=1715463106~hmac=5e664728824588fd753a23dbf3836488c146aad664f6f2108d1c6e8d828586f7&w=1380", description: "Description for Template 1" },
    { id: 2, name: "Template 2", image: "https://img.freepik.com/free-photo/blue-smooth-wall-textured-background_53876-106133.jpg?t=st=1715459690~exp=1715463290~hmac=8207a29193ae4dfe44b85d8cc8c1399016bd1cf6b464c0040e2a4eb9c1e99de7&w=1380", description: "Description for Template 2" },
    { id: 3, name: "Template 3", image: "https://img.freepik.com/free-photo/nature-design-with-bokeh-effect_1048-1882.jpg?t=st=1715464851~exp=1715468451~hmac=2076d9dbb05699da4c06a753588179fde54f14abecd72256ca6c8ccec6d65c36&w=826", description: "Description for Template 3" },
    { id: 4, name: "Template 4", image: "https://img.freepik.com/free-photo/blue-wall-background_53876-88663.jpg?t=st=1715464876~exp=1715468476~hmac=e60797571a897a4de61ef6b428ec4599590192007dc1ac8194fe2ac97b8970e6&w=740", description: "Description for Template 4" },
    { id: 5, name: "Template 5", image: "https://img.freepik.com/free-vector/blue-curve-background_53876-113112.jpg?t=st=1715464915~exp=1715468515~hmac=c26c04fb46c8ccd474a8a1b9e33224fb58c303443bc7fe6d93c44ff98f80ef9c&w=1380", description: "Description for Template 5" },
    { id: 6, name: "Template 6", image: "https://img.freepik.com/free-vector/yellow-comic-zoom-lines-background_1017-15136.jpg?t=st=1715464965~exp=1715468565~hmac=34c4e8c67651b95461462c80385b56fd1a4b4c84d764c07d05acad3ecfe116b0&w=740", description: "Description for Template 6"},
    { id: 7, name: "Template 7", image: "https://img.freepik.com/free-vector/abstract-organic-pattern-design-background_1048-19286.jpg?t=st=1715465022~exp=1715468622~hmac=aa40c462b208f2ecc0df158e15c9322ea2f740d279cbd0c3f9b5e01c25574207&w=740", description: "Description for Template 7"},
    { id: 8, name: "Template 8", image: "https://img.freepik.com/free-photo/dark-blue-product-background_53876-92801.jpg?t=st=1715465092~exp=1715468692~hmac=9dadad91de91df1e59a03fb6c6aac4d7c71b5b50d04b640855e20e81665d1dfd&w=1380", description: "Description for Template 8"}
  ];

  // State for tracking selected template
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // State for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // State for diary title and content
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");

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

  // Function to handle replacing the template
  const handleReplaceTemplate = () => {
    setSelectedTemplate(null); // Clear selected template
    // No need to clear userInput state
    openModal(); // Open modal for selecting a new template
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
                  <input
                    type="text"
                    className="diary-title"
                    placeholder="Title"
                    value={diaryTitle}
                    onChange={(e) => setDiaryTitle(e.target.value)}
                    style={{
                      position: "absolute",
                      top: "10%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "white"
                    }}
                  />
                  <textarea
                    className="diary-content"
                    placeholder="Content"
                    value={diaryContent}
                    onChange={(e) => setDiaryContent(e.target.value)}
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "70%",
                      height: "70%",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "1.5rem",
                      color: "white",
                      resize: "none"
                    }}
                  />
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
            {selectedTemplate && ( // Render the replace button only if a template is selected
              <div className="replace-template-button">
                <button onClick={handleReplaceTemplate}>Replace Template</button>
              </div>
            )}
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
