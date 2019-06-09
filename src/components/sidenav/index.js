import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import NotesContext from "../../contexts/notes";
import classes from "./style.scss";

function SideNav() {
  const notesContext = useContext(NotesContext);
  const notes = useMemo(() => notesContext.get(), [notesContext]);
  return (
    <ul className={classes.side_notes}>
      {notes.map(note => (
        <li className={classes.menu_item} key={note.id}>
          <Link to={`/note/${note.id}`}>{note.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default SideNav;
