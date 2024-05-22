import React, { useState } from "react";
import { NavBar } from "../LandingPage";
import Sidebar from "../DiaryEntryPage/SideBar/Sidebar";
import { Timecapsule } from "../../../api/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./TimeCapsule.css";

const TimeCapsule = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    overview: "",
    messageToFutureSelf: "",
    imageURL: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3;

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

      setEntries((prevEntries) => [...prevEntries, updatedEntry]);

      try {
        await Timecapsule(updatedEntry);
      } catch (err) {
        console.error(err);
      }

      setNewEntry({
        overview: "",
        messageToFutureSelf: "",
        imageURL: "",
      });
      setSelectedFile(null);
    }
  };

  const totalPages = Math.ceil(entries.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              />
              <div className="form-group mt-3">
                <textarea
                  name="messageToFutureSelf"
                  placeholder="A message to your future self..."
                  value={newEntry.messageToFutureSelf}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="4"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
        <div className="diary-entry">
          <h2 className="text-center">Time Capsules</h2>
          <div className="diary-entries">
            {currentEntries.map((entry, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">
                    Capsule {index + indexOfFirstEntry + 1}
                  </h5>
                  <p className="card-text">Overview: {entry.overview}</p>
                  <p className="card-text">
                    Message: {entry.messageToFutureSelf}
                  </p>
                  {entry.imageURL && (
                    <img
                      src={entry.imageURL}
                      alt="Uploaded"
                      className="img-fluid"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {[...Array(totalPages).keys()].map((page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      page + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(page + 1)}
                      className="page-link"
                    >
                      {page + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeCapsule;
