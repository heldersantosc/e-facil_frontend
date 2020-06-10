import React, { useState, useEffect } from "react";
/** importando icones do pacote */
import { FiLock } from "react-icons/fi";
import { useHistory } from "react-router-dom";
/** */

/** importando o serviço ( backend ) */
import api from "../../services/api";

/** importação dos estilos */
import "./styles.scss";

/** importação dos componentes */
import NavbarLarge from "../../components/Navbar/NavbarLarge";
import NumberButton from "../../components/NumberButton";
import KeyboardOption from "../../components/KeyboardOption";

/** exporta função de login do colaborador */
export default function EmployeeLogin() {
  const [matricula, setMatricula] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const history = useHistory();

  //** pega o numero que está sendo digitado */
  function handleKeyboard(numberValue) {
    if (matricula.length < 8) {
      setMatricula(matricula + numberValue);
      setInputVisible(true);
    }
  }

  /** apaga a matricula que está sendo digitada */
  function deleteCharacter() {
    /** exclui matricula */
    setMatricula(matricula.slice(0, -1));
    if (matricula.length <= 1) {
      /** oculta o input */
      setInputVisible(false);
      /** apaga o status do colaborador */
      setColaborador({ auth: "", access: false, name: "" });
    }
  }

  /** verifica se a matricula informada é valida ou nao   */
  async function checkAccess() {
    /** verifica se a matrica tem 8 digitos */
    if (matricula.length === 8) {
      /** chama a API do backend */
      await api
        .post("/authorization", {
          acesso: "colaborador",
          matricula: matricula,
        })
        .then((response) => {
          /** aqui retorna o status do backend */
          setColaborador(response.data);
          localStorage.setItem("permissionAccess", true);
          localStorage.setItem("colaborador", response.data.name);
          setTimeout(() => {
            /** redireciona para a pagina de unidade */
            goToUnitPage();
          }, 3000);
        })
        .catch((err) => {
          /** retorna o status de erro do backend */
          setColaborador({ auth: "", access: false, name: "ACESSO NEGADO" });
          localStorage.setItem("permissionAccess", false);
          setMatricula("");
          setInputVisible(false);
        });
    } else {
      /** se a matricula nao tiver 8 digitos ACESSO NEGADO */
      setColaborador({ auth: "", access: false, name: "ACESSO NEGADO" });
      localStorage.setItem("permissionAccess", false);
    }
  }

  /** redireciona para a pagina de unidade */
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
          {/* se o inputVisible for true ele entra aqui */}
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
