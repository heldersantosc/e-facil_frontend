import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import api from "../../services/api";

import "./styles.scss";

import NavbarLarge from "../../components/Navbar/NavbarLarge";

export default function Unit() {
  const [visible, setVisible] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const history = useHistory();

  function unitListVisible() {
    setVisible(!visible);
  }

  function chooseUnit(unitName) {
    localStorage.setItem("unitName", unitName);
    history.push("/login");
  }

  async function getUnit() {
    await api.get("/unit", {}).then((response) => {
      setUnitList(response.data);
    });
  }

  useEffect(() => {
    getUnit();
  }, []);

  return (
    <div className="unit">
      <NavbarLarge />
      <div className="container" onClick={() => unitListVisible()}>
        <div className="btn">
          Selecione a Unidade
          {visible ? <FiMinus /> : <FiPlus />}
        </div>
      </div>
      <div className={`container content-list ${visible ? "collapse" : ""}`}>
        <ul className={"unit-list"}>
          {unitList.map((unit) => (
            <button
              className="no-button"
              key={unit.id}
              onClick={() => chooseUnit(unit.name)}
            >
              <li>
                <strong> {unit.name} </strong>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
