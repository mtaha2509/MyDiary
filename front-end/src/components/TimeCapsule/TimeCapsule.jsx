import React, { useState } from "react";
import { NavBar } from "../LandingPage";
import Sidebar from "../DiaryEntryPage/SideBar/Sidebar";
import { Timecapsule } from "../../../api/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./TimeCapsule.css";

const TimeCapsule = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [newEntry, setNewEntry] = useState({
    overview: "",
    messageToFutureSelf: "",
    imageURL: "",
    openDate: "", // Updated to store date and time
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const storage = getStorage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      const storageRef = ref(storage, `images/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      const updatedEntry = {
        ...newEntry,
        imageURL: downloadURL,
      };

      try {
        await Timecapsule(updatedEntry);
        setSuccessMessage("Successfully set!"); // Show success message
      } catch (err) {
        console.error(err);
      }

      setNewEntry({
        overview: "",
        messageToFutureSelf: "",
        imageURL: "",
        openDate: "",
      });
      setSelectedFile(null);
    }
  };

  return (
    <div
      className={`timeCapsule-container ${sidebarExpanded ? "expanded" : ""}`}
    >
      <NavBar />
      <Sidebar
        toggleSidebar={toggleSidebar}
        sidebarExpanded={sidebarExpanded}
      />
      <div className="timeCapsule-content">
        <div className="timeCapsule">
          <h1 className="page-title">Welcome to Time Capsule 💊</h1>
          <p className="page-subtitle">
            Plant your Time Capsule and let it revive your beloved memories
          </p>
        </div>
        <div className="planting-contain">
          <div className="time-capsule-header">
            <h2 className="text-center">Plant a Time Capsule</h2>
          </div>
          <div className="card-body">
            <form
              onSubmit={handleSubmit}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="text"
                placeholder="Type"
                name="overview"
                value={newEntry.overview}
                onChange={handleInputChange}
                className="fun-input"
              />
              <div className="form-group mt-3">
                <textarea
                  name="messageToFutureSelf"
                  placeholder="A message to your future self..."
                  value={newEntry.messageToFutureSelf}
                  onChange={handleInputChange}
                  className="form-control fun-input"
                  rows="4"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="fun-input"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="datetime-local"
                  name="openDate"
                  value={newEntry.openDate}
                  onChange={handleInputChange}
                  className="fun-input"
                />
              </div>
              <div className="form-group mt-3 text-center">
                <button type="submit" className="timecapsule-button">
                  Set Time Capsule
                </button>
              </div>
            </form>
          </div>
        </div>
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
            <div className="fringe-animation">🎉</div>{" "}
            {/* Add some animation */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeCapsule;
