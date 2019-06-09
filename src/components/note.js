import React, { useCallback } from "react";
import { Link } from "react-router-dom";

const Note = function(props) {
  const onDelete = useCallback(() => props.onDelete(props.id), [props.id]);
  const onEdit = useCallback(() => props.onEdit(props.id), [props.id]);
  return (
    <div className="note" onClick={onEdit}>
      <h4 className="title">{props.title}</h4>
      <span className="preview">{props.content}</span>
      <div className="actions">
        <Link href={`/note/${props.id}`}>edit</Link>
        <button onClick={onDelete}>delete</button>
      </div>
    </div>
  );
};

export default Note;
