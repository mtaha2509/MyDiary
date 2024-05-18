import React, { useState, useEffect } from "react";
import "./page.css";
import { SideBar, MainNavBar } from "../DiaryEntryPage"; // Import SideBar and MainNavBar
import {
  Diary_temp1,
  TimeCapsule,
  phool,
  horrortheme,
  lighttheme,
} from "./../../assets"; // Import templates
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { DiaryEntry } from "../../../api/auth";

function DiaryEntryPage() {
  const authState = useSelector((state) => state.auth);
  const templates = [
    {
      id: 1,
      name: "Template 1",
      image: horrortheme,
      description: "Description for Template 1",
    },
    {
      id: 2,
      name: "Template 2",
      image: lighttheme,
      description: "Description for Template 2",
    },
    {
      id: 3,
      name: "Template 3",
      image:
        "https://img.freepik.com/free-photo/nature-design-with-bokeh-effect_1048-1882.jpg?t=st=1715464851~exp=1715468451~hmac=2076d9dbb05699da4c06a753588179fde54f14abecd72256ca6c8ccec6d65c36&w=826",
      description: "Description for Template 3",
    },
    {
      id: 4,
      name: "Template 4",
      image:
        "https://img.freepik.com/free-photo/blue-wall-background_53876-88663.jpg?t=st=1715464876~exp=1715468476~hmac=e60797571a897a4de61ef6b428ec4599590192007dc1ac8194fe2ac97b8970e6&w=740",
      description: "Description for Template 4",
    },
    {
      id: 5,
      name: "Template 5",
      image:
        "https://img.freepik.com/free-vector/blue-curve-background_53876-113112.jpg?t=st=1715464915~exp=1715468515~hmac=c26c04fb46c8ccd474a8a1b9e33224fb58c303443bc7fe6d93c44ff98f80ef9c&w=1380",
      description: "Description for Template 5",
    },
    {
      id: 6,
      name: "Template 6",
      image:
        "https://img.freepik.com/free-vector/yellow-comic-zoom-lines-background_1017-15136.jpg?t=st=1715464965~exp=1715468565~hmac=34c4e8c67651b95461462c80385b56fd1a4b4c84d764c07d05acad3ec6d65c36&w=740",
      description: "Description for Template 6",
    },
    {
      id: 7,
      name: "Template 7",
      image:
        "https://img.freepik.com/free-vector/abstract-organic-pattern-design-background_1048-19286.jpg?t=st=1715465022~exp=1715468622~hmac=aa40c462b208f2ecc0df158e15c9322ea2f740d279cbd0c3f9b5e01c25574207&w=740",
      description: "Description for Template 7",
    },
    {
      id: 8,
      name: "Template 8",
      image:
        "https://img.freepik.com/free-photo/dark-blue-product-background_53876-92801.jpg?t=st=1715465092~exp=1715468692~hmac=9dadad91de91df1e59a03fb6c6aac4d7c71b5b50d04b640855e20e81665d1dfd&w=1380",
      description: "Description for Template 8",
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [charLimit, setCharLimit] = useState(200); // Character limit per page
  const [remainingChars, setRemainingChars] = useState(charLimit);

  // State for diary entries
  const [diaryEntries, setDiaryEntries] = useState([
    { pageNumber: 1, title: "", content: "" },
  ]);

  useEffect(() => {
    // Calculate remaining characters
    const contentLength = diaryContent.length;
    const remaining = charLimit - contentLength;
    setRemainingChars(remaining);
  }, [diaryContent, charLimit]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    diaryEntries.forEach((entry, index) => {
      if (index !== 0) {
        doc.addPage(); // Add a new page for each diary entry except the first one
      }

      // Add page number
      doc.setFontSize(16);
      doc.text(20, yPos, `Page ${entry.pageNumber}`);
      yPos += 10;

      // Add title
      doc.setFontSize(14);
      doc.text(20, yPos, `Title: ${entry.title}`);
      yPos += 10;

      // Add selected template image
      if (selectedTemplate && selectedTemplate.image) {
        console.log("Whaa");
        doc.addImage(selectedTemplate.image, "JPEG", 20, yPos, 170, 100);
        yPos += 110;
      }

      doc.setFontSize(12);
      const splitContent = doc.splitTextToSize(entry.content, 170);
      doc.text(20, yPos, splitContent);
      yPos += splitContent.length * 5 + 10;

      yPos = 10;
    });

    doc.save("diary.pdf");
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

  // Function to handle typing in the diary content
  const handleDiaryContentChange = (e) => {
    const content = e.target.value;
    const contentLength = content.length;

    if (contentLength <= charLimit) {
      const updatedEntries = diaryEntries.map((entry) => {
        if (entry.pageNumber === currentPage) {
          return { ...entry, content };
        }
        return entry;
      });
      setDiaryEntries(updatedEntries);
      setDiaryContent(content);
      setRemainingChars(charLimit - contentLength);
    } else {
      const updatedEntries = diaryEntries.map((entry) => {
        if (entry.pageNumber === currentPage) {
          return { ...entry, content: content.slice(0, charLimit) };
        }
        return entry;
      });
      setDiaryEntries(updatedEntries);

      // Move to the next page
      setCurrentPage(currentPage + 1);
      setDiaryContent(content.slice(charLimit));
      setRemainingChars(charLimit - content.slice(charLimit).length);

      // Add a new page to the diary entries
      setDiaryEntries([
        ...updatedEntries,
        {
          pageNumber: currentPage + 1,
          title: diaryTitle,
          content: content.slice(charLimit),
        },
      ]);
    }
  };

  const handleNextPage = () => {
    if (currentPage < diaryEntries.length) {
      setCurrentPage(currentPage + 1);
      setDiaryContent(diaryEntries[currentPage].content);
      setDiaryTitle(diaryEntries[currentPage].title);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setDiaryContent(diaryEntries[currentPage - 2].content);
      setDiaryTitle(diaryEntries[currentPage - 2].title);
    }
  };

  const handleBackButtonClick = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  // Function to save diary entries
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const values = {
        diaryEntries,
        selectedTemplate,
      };
      await DiaryEntry(values);
    } catch (error) {}
  };

  return (
    <>
      <div className="page-container">
        <SideBar
          toggleSidebar={toggleSidebar}
          sidebarExpanded={sidebarExpanded}
        />
        <div className="page-content">
          {/* <Navbar/> */}
          <div className="entry-header">
            <h1 style={{ fontWeight: "bold" }}>Welcome to your Diary 📚</h1>
            <p
              className="entry-subtitle"
              style={{ fontWeight: "bold", color: "grey" }}
            >
              Write your most cherished memories here
            </p>
          </div>
          <div className="template-content">
            <div
              className="template-slot"
              style={{
                backgroundImage: selectedTemplate
                  ? `url(${selectedTemplate.image})`
                  : "none",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                position: "relative", // Ensure the positioning context for the text input
              }}
            >
              {selectedTemplate ? (
                // Render the selected template here
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="diary-title"
                    placeholder="Title"
                    value={diaryTitle}
                    onChange={(e) => {
                      const title = e.target.value;
                      setDiaryTitle(title);
                      const updatedEntries = diaryEntries.map((entry) => {
                        if (entry.pageNumber === currentPage) {
                          return { ...entry, title };
                        }
                        return entry;
                      });
                      setDiaryEntries(updatedEntries);
                    }}
                    style={{
                      position: "absolute",
                      top: "10%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  />
                  <textarea
                    className="diary-content"
                    placeholder="Content"
                    value={diaryContent}
                    onChange={handleDiaryContentChange}
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
                      resize: "none",
                    }}
                  />
                  <p
                    style={{
                      position: "absolute",
                      bottom: "10%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {remainingChars >= 0
                      ? `Remaining characters: ${remainingChars}`
                      : ""}
                  </p>
                  <div className="pagination-buttons">
                    <button
                      type="button"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      &lt; Prev
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                      type="button"
                      onClick={handleNextPage}
                      disabled={currentPage >= diaryEntries.length}
                    >
                      Next &gt;
                    </button>
                  </div>
                  <div className="replace-template-button">
                    <button type="submit">Save Diary</button>
                  </div>
                </form>
              ) : (
                // Render placeholder content if no template is selected
                <div className="empty-slot">
                  <p>First you need to select a Template</p>
                  <div>
                    <button
                      onClick={openModal}
                      className="choose-template-button"
                    >
                      Choose A template
                    </button>
                  </div>
                </div>
              )}
            </div>
            {selectedTemplate && ( // Render the replace button only if a template is selected
              <div className="replace-template-button">
                <button onClick={handleReplaceTemplate}>
                  Replace Template
                </button>
                <button onClick={handleDownloadPDF}>Download Diary</button>
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
                  <button onClick={() => handleTemplateSelect(template)}>
                    Select
                  </button>
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
