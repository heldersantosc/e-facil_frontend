import React, { useState, useEffect } from "react";
import { IoMdPerson } from "react-icons/io";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.scss";

import NavbarLarge from "../../components/Navbar/NavbarLarge";
import NumberButton from "../../components/NumberButton";
import KeyboardOption from "../../components/KeyboardOption";

/** ininico da função de login do aluno */
export default function Login() {
  const [matricula, setMatricula] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [aluno, setAluno] = useState({});
  const history = useHistory();

  /** função para inserir a matricula */
  function handleKeyboard(numberValue) {
    if (matricula.length < 8) {
      setMatricula(matricula + numberValue);
      /** exibe o input */
      setInputVisible(true);
    }
  }

  /** deleta a matricula de tras pra frente */
  function deleteCharacter() {
    setMatricula(matricula.slice(0, -1));
    if (matricula.length <= 1) {
      setInputVisible(false);
      setAluno({ auth: "", access: false, name: "" });
    }
  }

  /** verifica se a matricula informada é valida ou nao   */
  async function checkAccess() {
    /** verifica se o tamanho da matricula tem 8 digitos */
    if (matricula.length === 8) {
      /** executa função que chama o backend */
      await api
        .post("/authorization", {
          acesso: "aluno",
          matricula: matricula,
        })
        .then((response) => {
          setAluno(response.data);
          localStorage.setItem("aluno", response.data.name);
          localStorage.setItem("matricula", matricula);
          /** delay de 3 segundos */
          setTimeout(() => {
            goToSelectFloor();
          }, 3000);
        })
        .catch((err) => {
          setAluno({ auth: "", access: false, name: "ACESSO NEGADO" });
          localStorage.setItem("permissionAccess", false);
          setMatricula("");
          setInputVisible(false);
        });
    } else {
      /** oculta o input de matricula */
      setInputVisible(true);
    }
  }

  /** informa que a matricula é valida */
  function goToSelectFloor() {
    history.push("/checkaccess");
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
            <IoMdPerson size={200} color="#fa733b" />
          </div>
          <h1>ALUNO</h1>
          <h1>{aluno.name}</h1>
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
