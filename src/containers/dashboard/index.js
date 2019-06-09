import React, { useContext, useMemo, useCallback, useState } from "react";
import NotesContext from "../../contexts/notes";
import Note from "../../components/note-preview";
import FabButton from "../../components/fab-button";
import classes from "./style.scss";

const Dashboard = function(props) {
  const notesContext = useContext(NotesContext);
  const notes = useMemo(() => notesContext.get(), [notesContext]);
  const [query, setQuery] = useState("");
  const filteredNodes = useMemo(() => {
    if (!query) return notes;
    const queryExpression = new RegExp(query, "igm");
    return notes.reduce((acc, x) => {
      if (queryExpression.test(x.title) || queryExpression.test(x.content)) {
        acc.push(x);
      }
      return acc;
    }, []);
  }, [notes, query]);
  const onDelete = useCallback(
    noteId => {
      const note = notesContext.notes[noteId];
      if (confirm(`Are you sure you want to delete "${note.title}" ?`)) {
        notesContext.delete(noteId);
      }
    },
    [notes]
  );
  const onEdit = useCallback(
    noteId => {
      props.history.push(`/note/${noteId}`);
    },
    [notes]
  );

  const createNewNote = useCallback(() => {
    const id = notesContext.add({});
    props.history.push(`/note/${id}`);
  }, [notes]);
  return (
    <div className={classes.container}>
      <div className={classes.search_bar}>
        <i className="fas fa-search" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a note"
        />
      </div>
      <div className={classes.notes_container}>
        {filteredNodes.map(note => {
          return (
            <Note {...note} onDelete={onDelete} onEdit={onEdit} key={note.id} />
          );
        })}
      </div>
      <FabButton icon="plus" onClick={createNewNote} />
    </div>
  );
};

export default Dashboard;
