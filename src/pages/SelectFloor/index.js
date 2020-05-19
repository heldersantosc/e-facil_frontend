import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//import api from "../../services/api";

import "./styles.scss";
import Navbarcommon from "../../components/Navbar/NavbarCommon";
import FooterLine from "../../components/FooterLine";

export default function SelectFloor() {
  const [floor, setFloor] = useState();
  const [permission, setPermission] = useState();
  const history = useHistory();

  function handleOption(floorSelected) {
    if (permission === "true") {
      setFloor(floorSelected);
      localStorage.setItem("floorSelected", floorSelected);
      history.push("/selectvacancy");
    }
    if (permission === null) {
      localStorage.clear();
      history.push("/login");
    }
  }

  useEffect(() => {
    setPermission(localStorage.getItem("permissionAccess"));
  }, [history, floor]);

  return (
    <>
      <div className="selectfloor">
        <Navbarcommon />
        <div className="container">
          <div>
            <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
              Escolha o andar
            </h1>
            <div className="floor">
              <button
                className="btn no-button"
                onClick={() => handleOption("S1")}
                style={{ cursor: "pointer" }}
              >
                S1 | VAGAS: 42
              </button>
              <button
                className="btn no-button"
                onClick={() => handleOption("S2")}
                style={{ cursor: "pointer" }}
              >
                S2 | VAGAS: 35
              </button>
              <button
                className="btn no-button"
                style={{ backgroundColor: "gray", cursor: "pointer" }}
              >
                S3 | INDISP.
              </button>
            </div>
          </div>
          {/* <div>
            <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
              Vagas Disponíveis
            </h1>
            <div className="building">
              <div className="board bg-black">
                <h1>S1</h1>
                <hr />
                <h1>VAGAS: 42</h1>
              </div>
              <div className="board bg-black">
                <h1>S1</h1>
                <hr />
                <h1>VAGAS: 42</h1>
              </div>
              <div className="board bg-black">
                <h1>S1</h1>
                <hr />
                <h1>VAGAS: 42</h1>
              </div>
              <div className="entrance"></div>
            </div>
          </div> */}
        </div>
      </div>
      <FooterLine />
    </>
  );
}
