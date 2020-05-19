import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import NavbarLarge from "../../components/Navbar/NavbarLarge";

import "./styles.scss";

import availableLogo from "../../assets/ic_baseline-done-outline.png";
import notAvailableLogo from "../../assets/mdi_close-outline.png";

export default function CheckAccess() {
  const [option, setOption] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setOption(localStorage.getItem("permissionAccess"));
    if (option === "false" || option === null) {
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
    if (option === "true") {
      setTimeout(() => {
        history.push("/selectfloor");
      }, 2000);
    }
  }, [option, history]);

  return (
    <div className="checkaccess">
      <NavbarLarge />
      <div className="container ">
        {option ? (
          <>
            <h1>Acesso Permitido</h1>
            <img className="checkLogo " src={availableLogo} alt="Available" />
          </>
        ) : (
          <>
            <h1>Acesso Negado</h1>
            <img
              className="checkLogo "
              src={notAvailableLogo}
              alt="Available"
            />
          </>
        )}
      </div>
    </div>
  );
}
