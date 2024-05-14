import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./notes.css";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="notes-note">
      <h1 className="notes-note-title">{props.title}</h1>
      <p className="notes-note-content">{props.content}</p>
      <button className="notes-note-delete" onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
