import React, { useContext, useCallback, useState, useMemo } from "react";
import classes from "./style.scss";
import NotesContext from "../../contexts/notes";
import FabButton from "../../components/fab-button/button";

const Note = function(props) {
  const notes = useContext(NotesContext);
  const id = props.match.params.id;
  const note = notes.notes[id];
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  useMemo(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [id]);
  const onSave = useCallback(() => {
    notes.edit(id, { id, title, content });
    props.history.replace("/");
  }, [title, content]);
  if (!note) return <h1>Sorry we can't find that note</h1>;

  return (
    <div className={classes.new_note_container}>
      <div className={classes.note_card}>
        <input
          className={classes.title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          value={title || ""}
        />
        <textarea
          value={content || ""}
          className={classes.content}
          onChange={e => setContent(e.target.value)}
          placeholder="Note"
        />
      </div>
      <FabButton icon="save" onClick={onSave} />
    </div>
  );
};

export default Note;
