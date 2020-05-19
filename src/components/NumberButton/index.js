import React from "react";

import "./styles.scss";

export default function NumberButton(props) {
  return (
    <div className="numberButton">
      <div className="number">{props.number}</div>
    </div>
  );
}
