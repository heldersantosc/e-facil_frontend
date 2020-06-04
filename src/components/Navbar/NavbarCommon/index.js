import React, { useEffect, useState } from "react";

import "./styles.scss";
import logo1 from "../../../assets/logo-ser-branca.png";
import logo2 from "../../../assets/e-facil_white.png";
import logo3 from "../../../assets/ion_arrow-back-circle-sharp.png";
import { Link } from "react-router-dom";

export default function NavbarCommon(props) {
  const [unitName, setUnitName] = useState();

  useEffect(() => {
    if (localStorage.getItem("unitName")) {
      setUnitName(localStorage.getItem("unitName").toUpperCase());
    }
  }, []);
  return (
    <nav className="navbarcommon">
      <Link className="backButton" to={props.path ? props.path : "/login"}>
        <img height="100%" src={logo3} alt="" />
      </Link>
      <h1 className="unit-info">UNIDADE {unitName}</h1>
      <img className="navbar-logo" src={logo1} alt="" />
      <img className="navbar-logo" src={logo2} alt="" />
    </nav>
  );
}
