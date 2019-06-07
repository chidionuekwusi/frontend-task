import React, { useState, useMemo } from "react";
import uuid from "uuid/v4";

const NotesContext = React.createContext();
const NOTES = "NOTES";
export const NotesProvider = function(props) {
  const [notes, setNotes] = useState(null);
  const value = useMemo(() => {
    if (!notes) {
      const existing = localStorage.getItem(NOTES);
      if (existing) setNotes(JSON.parse(existing));
    }
    return {
      notes: notes || {},
      get: function() {
        return Object.keys(notes).map(x => ({ ...notes[x] }));
      },
      add: function(note) {
        const id = uuid();
        notes[id] = { ...note, id };
        localStorage.setItem(NOTES, JSON.stringify(notes));
        setNotes(notes);
      },
      edit: function(id, note) {
        if (!id || !notes[id])
          //check invariant.
          throw new Error("Cannot edit a non existent note");
        notes[id] = { ...note, id };
        localStorage.setItem(NOTES, JSON.stringify(notes)); // store in localStorage
        setNotes(notes); //store locally
      }
    };
  }, [notes]);
  return (
    <NotesContext.Provider value={value}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
