import React, { useState, useEffect } from "react";
//import ReactCSSTransitionGroup from "react-transition-group";
import { FiLock } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.scss";

import NavbarLarge from "../../components/Navbar/NavbarLarge";
import NumberButton from "../../components/NumberButton";
import KeyboardOption from "../../components/KeyboardOption";

export default function EmployeeLogin() {
  const [matricula, setMatricula] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const history = useHistory();

  function handleKeyboard(numberValue) {
    if (matricula.length < 8) {
      setMatricula(matricula + numberValue);
      setInputVisible(true);
    }
  }
  function deleteCharacter() {
    setMatricula(matricula.slice(0, -1));
    if (matricula.length <= 1) {
      setInputVisible(false);
      setColaborador({ auth: "", access: false, name: "" });
    }
  }

  async function checkAccess() {
    if (matricula.length === 8) {
      await api
        .post("/authorization", {
          acesso: "colaborador",
          matricula: matricula,
        })
        .then((response) => {
          setColaborador(response.data);
          localStorage.setItem("permissionAccess", true);
          localStorage.setItem("colaborador", response.data.name);
          setTimeout(() => {
            goToUnitPage();
          }, 3000);
        })
        .catch((err) => {
          setColaborador({ auth: "", access: false, name: "ACESSO NEGADO" });
          localStorage.setItem("permissionAccess", false);
          setMatricula("");
          setInputVisible(false);
        });
    } else {
      setColaborador({ auth: "", access: false, name: "ACESSO NEGADO" });
      localStorage.setItem("permissionAccess", false);
    }
  }

  function goToUnitPage() {
    history.push("/selectunit");
  }

  useEffect(() => {}, []);

  return (
    <div className="login">
      <NavbarLarge />
      <div className="container">
        <div className="card">
          <h1>Digite sua Matricula</h1>
          <div className="keyboard">
            <div className="row">
              <button className="no-button" onClick={() => handleKeyboard(1)}>
                <NumberButton number={1} />
              </button>
              <button className="no-button" onClick={() => handleKeyboard(2)}>
                <NumberButton number={2} />
              </button>
              <button className="no-button" onClick={() => handleKeyboard(3)}>
                <NumberButton number={3} />
              </button>
            </div>
            <div className="row">
              <button className="no-button" onClick={() => handleKeyboard(4)}>
                <NumberButton number={4} />
              </button>
              <button className="no-button" onClick={() => handleKeyboard(5)}>
                <NumberButton number={5} />
              </button>
              <button className="no-button" onClick={() => handleKeyboard(6)}>
                <NumberButton number={6} />
              </button>
            </div>
            <div className="row">
              <button className="no-button" onClick={() => handleKeyboard(7)}>
                <NumberButton number={7} />
              </button>
              <button className="no-button" onClick={() => handleKeyboard(8)}>
                <NumberButton number={8} />
              </button>
              <button className="no-button" onClick={() => handleKeyboard(9)}>
                <NumberButton number={9} />
              </button>
            </div>
            <div className="row">
              <button className="no-button" onClick={() => deleteCharacter()}>
                <KeyboardOption option="x" />
              </button>
              <button className="no-button" onClick={() => handleKeyboard(0)}>
                <NumberButton number={0} />
              </button>
              <button className="no-button" onClick={() => checkAccess()}>
                <KeyboardOption option="o" />
              </button>
            </div>
          </div>
        </div>
        <div className="card user">
          <div className="round">
            <FiLock size={200} color="#fa733b" />
          </div>
          <h1>Acesso Restrito</h1>
          <h1>{colaborador.name}</h1>
          {inputVisible ? (
            <>
              <input
                className={`inputMatricula`}
                type="text"
                name=""
                id=""
                placeholder="Matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                readOnly
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
