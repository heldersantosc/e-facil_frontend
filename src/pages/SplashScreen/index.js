import React from "react";
/** é uma hook que é executado toda vez que a pagina é aberta */
import { useEffect } from "react";
/** é um hook de controle de navegação entre as paginas */
import { useHistory } from "react-router-dom";

/** importação de estilos */
import "./styles.scss";
/** importação de logo */
import logo from "../../../src/assets/logo.png";
/** importação de barrinhas de loading */
import Loading from "../../components/Loading";

/** inicio da função */
export default function SplashScreen() {
  /** constante que tem as rotas (endpoints) */
  const history = useHistory();

  /** executado sempre que a pagina for aberta */
  useEffect(() => {
    /** limpa o localstorage */
    localStorage.clear();

    /** função de tempo - delay */
    const timer = setTimeout(() => {
      /** rota de autenticação de colaborador */
      history.push("/employee-login");
    }, 5000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="splashscreen">
      <div className="container">
        <img className="logo" src={logo} alt="e-Fácil" />
        {/* componente de barra de loading */}
        <Loading />
      </div>
    </div>
  );
}
