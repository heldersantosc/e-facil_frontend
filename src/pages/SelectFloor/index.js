import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styles.scss";

import Navbarcommon from "../../components/Navbar/NavbarCommon";
import FooterLine from "../../components/FooterLine";

import api from "../../services/api";

/** inicio da função de selecionar o andar */
export default function SelectFloor() {
  const [floor, setFloor] = useState();
  const [unit] = useState(`${localStorage.getItem("unitName")}`);
  const [floorList, setFloorList] = useState([]);
  const [permission] = useState(localStorage.getItem("permissionAccess"));
  const history = useHistory();

  /** função pra selecionar o andar  */
  function handleOption(floorSelected) {
    if (permission === "true") {
      setFloor(floorSelected);
      localStorage.setItem("floorSelected", floorSelected);
      history.push("/selectvacancy");
    }
    if (permission === null) {
      localStorage.clear();
      history.push("/employee-login");
    }
  }

  /** primeira função a ser executada  */
  useEffect(() => {
    if (permission === "true") {
      /** função que pesquisa no banco os andares da unidade */
      async function getFloor() {
        await api.get(`/floor/${unit}`, {}).then((response) => {
          setFloorList(response.data.floor);
        });
      }
      /** chama a função acima  */
      getFloor();
    }
  }, [history, floor, unit]);

  return (
    // inicio de frangmento
    <>
      <div className="selectfloor">
        <Navbarcommon />
        <div className="container">
          <div>
            <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
              Escolha o andar
            </h1>
            <div className="floor">
              {/* for numa lista de andares */}
              {floorList.map((floor) => (
                <button
                  key={floor.id_unidade_andar}
                  className={`btn ${floor.status}`}
                  onClick={() => handleOption(floor.andar)}
                >
                  {/* exibir o valor das variaveis no floor */}
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
