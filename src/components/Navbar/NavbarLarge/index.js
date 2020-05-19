import React, { useEffect, useState } from "react";

import "./styles.scss";
import logo1 from "../../../assets/logo-ser-branca.png";
import logo2 from "../../../assets/e-facil_white.png";

export default function NavbarLarge() {
  const [unitName, setUnitName] = useState();

  useEffect(() => {
    if (localStorage.getItem("unitName")) {
      setUnitName(localStorage.getItem("unitName").toUpperCase());
    }
  }, []);
  return (
    <nav className="navbar">
      <img className="navbar-logo" src={logo1} alt="" />
      <h1>{unitName}</h1>
      <img className="navbar-logo" src={logo2} alt="" />
    </nav>
  );
}
