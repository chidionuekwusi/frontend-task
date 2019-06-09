import React from "react";
import classes from "./style.scss";
function FabButton(props) {
  return (
    <button className={classes["fab-button"]} onClick={props.onClick}>
      <i className={`fas fa-${props.icon}`} />
    </button>
  );
}

export default FabButton;
