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
import { NavBar } from "../LandingPage";
import TemplateCard from "./Template-Card/TemplateCard"; // Import TemplateCard component

function DiaryEntryPage() {
  const authState = useSelector((state) => state.auth);
  const templates = [
    {
      id: 1,
      name: "Template 1",
      image:
        "https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?t=st=1716304359~exp=1716307959~hmac=9ea04bf2aac38d80398687c37510c8e7b90a76c58a809c08ef53f11a9de84d5d&w=826",
      description: "Description for Template 1",
    },
    {
      id: 2,
      name: "Template 2",
      image:
        "https://img.freepik.com/free-vector/purple-pink-halftone-background-vector_53876-67278.jpg?t=st=1716357499~exp=1716361099~hmac=33ed745c972c7275829accedb5f9252c457323220458da0bddcad62d28b6f92d&w=740",
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
        "https://img.freepik.com/free-vector/grunge-watercolor-background-using-pastel-colours_1048-6530.jpg?t=st=1716357569~exp=1716361169~hmac=d423ea2a6c3191d1c00d2839a14be9a3f8239154f78bd20c0a9e7cb5490cc91d&w=740",
      description: "Description for Template 4",
    },
    {
      id: 5,
      name: "Template 5",
      image:
        "https://img.freepik.com/free-vector/abstract-orange-background_698452-1400.jpg?t=st=1716357688~exp=1716361288~hmac=d44dc791dc02d20e1b1c2d5dbfbccbb97452369c3ef01f96b8b7aad1ea6f27ca&w=996",
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
  const [charLimit, setCharLimit] = useState(350);
  const [remainingChars, setRemainingChars] = useState(charLimit);
  const [diarySaved, setDiarySaved] = useState(false);

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

  const getBase64ImageFromURL = (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    let yPos = 10;

    for (let index = 0; index < diaryEntries.length; index++) {
      const entry = diaryEntries[index];
      if (index !== 0) {
        doc.addPage();
      }

      doc.setFontSize(16);
      doc.text(20, yPos, `Page ${entry.pageNumber}`);
      yPos += 10;

      doc.setFontSize(14);
      doc.text(20, yPos, `Title: ${entry.title}`);
      yPos += 10;

      if (selectedTemplate && selectedTemplate.image) {
        try {
          const imgData = await getBase64ImageFromURL(selectedTemplate.image);
          doc.addImage(imgData, "JPEG", 20, yPos, 170, 100);
          yPos += 110;
        } catch (error) {
          console.error("Error adding image:", error);
        }
      }

      doc.setFontSize(12);
      const splitContent = doc.splitTextToSize(entry.content, 170);
      doc.text(20, yPos, splitContent);
      yPos += splitContent.length * 5 + 10;

      yPos = 10;
    }

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const values = {
        diaryEntries,
        selectedTemplate,
      };
      await DiaryEntry(values);
      setDiarySaved(true);
      setTimeout(() => {
        setDiarySaved(false);
      }, 2000);
    } catch (error) {console.log("What")}
  };

  return (
    <>
      <div className="page-container">
        <div>
          <NavBar />
        </div>

        <SideBar
          toggleSidebar={toggleSidebar}
          sidebarExpanded={sidebarExpanded}
        />
        <div className="page-content">
          <div className="entry-header">
            <h1 style={{ fontWeight: "bold" }}>Welcome to your Diary 📚</h1>
            <p
              className="entry-subtitle"
              style={{ fontWeight: "bold", color: "grey" }}
            >
              Write your most cherished memories here
            </p>
          </div>
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
              height: "140%",
              width: "63%",
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
                    top: "26%",
                    left: "55%",
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
                    top: "49%",
                    left: "51%",
                    transform: "translate(-50%, -50%)",
                    width: "49%",
                    height: "31%",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "1.5rem",
                    color: "white",
                    resize: "auto",
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
                <h4 style={{ fontWeight:"bolder", textAlign:"center", marginRight:"100px" }} >Page {currentPage}</h4>
                <div className="pagination-buttons">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{ 
                      marginRight: "75%",
                     }}
                     className="page-button"
                  >
                    &lt; Prev
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={currentPage >= diaryEntries.length}
                    className="page-button"
                  >
                    Next &gt;
                  </button>
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
            <div className="replace-template-button"  >
              <button className="page-buttons" onClick={handleReplaceTemplate}>Replace Template</button>
              <button className="page-buttons" onClick={handleDownloadPDF}>Download Diary</button>
              <button className="page-buttons" type="submit">Save Diary</button>
            </div>
          )}
          {diarySaved && <p>Diary Saved</p>}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="choose-template-heading">Choose a Template</h2>
            <div className="template-thumbnails">
              {/* Map through the templates and render a TemplateCard for each */}
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  thumbnail={template.image}
                  name={template.name}
                  description={template.description}
                  onSelect={() => handleTemplateSelect(template)}
                />
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
