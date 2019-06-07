import React, { useContext } from "react";
import NotesContext from "../../contexts/notes";

const Note = function(props) {
  const notes = useContext(NotesContext);
  const note = notes.notes[props.match.params.id];
  if (!note) return <h1>Unknown Note</h1>;
};

export default Note;
