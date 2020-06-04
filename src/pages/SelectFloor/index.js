import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//import api from "../../services/api";

import "./styles.scss";
import Navbarcommon from "../../components/Navbar/NavbarCommon";
import FooterLine from "../../components/FooterLine";
import api from "../../services/api";

export default function SelectFloor() {
  const [floor, setFloor] = useState();
  const [unit] = useState(`${localStorage.getItem("unitName")}`);
  const [floorList, setFloorList] = useState([]);
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
    async function getFloor() {
      await api.get(`/floor/${unit}`, {}).then((response) => {
        setFloorList(response.data.floor);
      });
    }
    getFloor();
    setPermission(localStorage.getItem("permissionAccess"));
  }, [history, floor, unit]);

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
              {floorList.map((floor) => (
                <button
                  key={floor.id_unidade_andar}
                  className={`btn ${floor.status}`}
                  onClick={() => handleOption(floor.andar)}
                >
                  {floor.andar} | {floor.status.slice(0, 4).toUpperCase()}.
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterLine />
    </>
  );
}
