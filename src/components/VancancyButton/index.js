import React, { useState, useEffect } from "react";

import "./styles.scss";
import wheelchair from "../../assets/wheelchair.png";

export default function VacancyButton(props) {
  const [status, setStatus] = useState("indisponible");
  const [number, setNumber] = useState("");
  const [accessibilityStatus, setAccessibilityStatus] = useState("");

  useEffect(() => {
    setStatus(props.status);
    setNumber(props.number);
    if (props.accessibility === 1) {
      setAccessibilityStatus(true);
    }
  }, [status, number, props]);

  return (
    <div className="vacancybutton">
      <div className={`btn ${accessibilityStatus ? "wheelchair" : status}`}>
        {accessibilityStatus ? (
          <>
            <img className="wheelchair-logo" src={wheelchair} alt="" />
          </>
        ) : (
          <></>
        )}
        {number}
      </div>
    </div>
  );
}
