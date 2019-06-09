import React, { useState, useMemo } from "react";
import uuid from "uuid/v4";

const NotesContext = React.createContext();
const NOTES = "NOTES";
export const NotesProvider = function(props) {
  const [notes, setNotes] = useState(null);
  const value = useMemo(() => {
    let currentNotes;
    if (!notes) {
      const existing = localStorage.getItem(NOTES);
      if (existing) setNotes(JSON.parse(existing));
      currentNotes = existing;
    }
    currentNotes = notes || {};
    return {
      notes: currentNotes,
      get: function() {
        return Object.keys(currentNotes).map(x => ({ ...currentNotes[x] }));
      },
      delete: function(id) {
        if (!id || !currentNotes[id])
          //check invariant.
          throw new Error("Cannot delete a non existent note");
        currentNotes = Object.keys(currentNotes).reduce((acc, x) => {
          if (x == id) return acc;
          acc[x] = currentNotes[x];
          return acc;
        }, {});
        localStorage.setItem(NOTES, JSON.stringify(currentNotes)); // store in localStorage
        setNotes(currentNotes); //store locally
      },
      add: function(note) {
        const id = uuid();
        currentNotes[id] = { ...note, id };
        localStorage.setItem(NOTES, JSON.stringify(currentNotes));
        setNotes({ ...currentNotes });
        return id;
      },
      edit: function(id, note) {
        if (!id || !currentNotes[id])
          //check invariant.
          throw new Error("Cannot edit a non existent note");
        currentNotes[id] = { ...note, id };
        localStorage.setItem(NOTES, JSON.stringify(currentNotes)); // store in localStorage
        setNotes({ ...currentNotes }); //store locally
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
