import React, { useState } from "react";
import Note from "./Note";
import { NavBar } from "../LandingPage";
import SideBar from "../DiaryEntryPage/SideBar/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import "./notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 3;

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== id));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const submitNote = (event) => {
    addNote(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  };

  const expand = () => {
    setExpanded(true);
  };

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className="notes-container">
      <NavBar />
      <div className="sidebar-and-content">
        <SideBar 
          toggleSidebar={toggleSidebar}
          sidebarExpanded={sidebarExpanded}
        />
        <div className="notes-content">
          <div className="notes">
            <h1 className="notes-title">Welcome to Sticky Notes 📝</h1>
            <p className="notes-subtitle" style={{ marginLeft: "15%" }}>
              Take Notes and never forget anything!
            </p>
          </div>
          <div className="content">
            <form className="notes-create-note">
              {isExpanded && (
                <input
                  name="title"
                  onChange={handleChange}
                  value={note.title}
                  placeholder="Title"
                />
              )}
              <textarea
                name="content"
                onClick={expand}
                onChange={handleChange}
                value={note.content}
                placeholder="Take a note..."
                rows={isExpanded ? 3 : 1}
              />
              <Zoom in={isExpanded}>
                <Fab onClick={submitNote}>
                  <AddIcon />
                </Fab>
              </Zoom>
            </form>
            {notes.length > 0 && (
              <div>
                <h2 style={{ fontWeight: "bold" }}>Your Sticky Notes</h2>
                <div className="notes-list">
                  {currentNotes.map((noteItem, index) => (
                    <Note
                      key={indexOfFirstNote + index}
                      id={indexOfFirstNote + index}
                      title={`Note ${indexOfFirstNote + index + 1}: ${noteItem.title}`}
                      content={noteItem.content}
                      onDelete={deleteNote}
                    />
                  ))}
                </div>
                {notes.length > notesPerPage && (
                  <Pagination
                    count={Math.ceil(notes.length / notesPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    className="pagination"
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
