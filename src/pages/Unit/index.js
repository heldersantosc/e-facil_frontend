import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import api from "../../services/api";

import "./styles.scss";

import NavbarLarge from "../../components/Navbar/NavbarLarge";

/** inicio da função de escolher a unidade */
export default function Unit() {
  const [visible, setVisible] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const history = useHistory();

  /** exibe ou oculta um componete */
  function unitListVisible() {
    setVisible(!visible);
  }

  /** insere no localstorage a unidade que foi clicada */
  function chooseUnit(unitName) {
    localStorage.setItem("unitName", unitName);

    history.push("/login");
  }

  /** função para listar as unidades */
  async function getUnit() {
    await api.get("/unit", {}).then((response) => {
      setUnitList(response.data);
    });
  }

  /** hook executado toda vez que a página for aberta */
  useEffect(() => {
    /** verifica se tem permissão */
    if (localStorage.getItem("permissionAccess") === "true") {
      getUnit();
    } else {
      /** retorna pro login de colaborador */
      history.push("/employee-login");
    }
  }, [history]);

  return (
    <div className="unit">
      <NavbarLarge />
      <div className="container" onClick={() => unitListVisible()}>
        <div className="btn">
          Selecione a Unidade
          {/* exibe o icone */}
          {visible ? <FiMinus /> : <FiPlus />}
        </div>
      </div>
      <div className={`container content-list ${visible ? "collapse" : ""}`}>
        <ul className={"unit-list"}>
          {unitList.map((unit) => (
            <button
              className="no-button"
              key={unit.id_unidade_andar}
              onClick={() => chooseUnit(unit.unidade)}
            >
              <li>
                <strong> Unidade {unit.unidade} </strong>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
