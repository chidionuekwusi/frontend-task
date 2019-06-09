import React from "react";
import classes from "./style.scss";
function Preview(props) {
  return (
    <div className={classes.note} onClick={() => props.onEdit(props.id)}>
      <p className={classes.title}>{props.title}</p>
      <span className={classes.content}>{props.content}</span>
      <button
        className={classes.delete}
        onClick={e => {
          e.stopPropagation();
          props.onDelete(props.id);
        }}
      >
        <i className="fas fa-trash" />
      </button>
    </div>
  );
}

export default Preview;
