import React from "react";
import { FiDelete } from "react-icons/fi";

import "./styles.scss";
import { useState, useEffect } from "react";

export default function KeyboardOption(props) {
  const [option] = useState(props.option);
  const [icon, setIcon] = useState();
  const [iconClass, setIconClass] = useState(false);

  useEffect(() => {
    if (option === "x") {
      setIcon(<FiDelete />);
      setIconClass(true);
    }
    if (option === "o") {
      setIcon("OK");
    }
  }, [option]);

  return (
    <div className={`optionButton ${iconClass ? "" : "ok"}`}>
      <div className={`optionCharacter ${iconClass ? "icon text-black" : ""}`}>
        {icon}
      </div>
    </div>
  );
}
