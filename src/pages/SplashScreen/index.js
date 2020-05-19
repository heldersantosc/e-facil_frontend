import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styles.scss";
import logo from "../../../src/assets/logo.png";
import Loading from "../../components/Loading";

export default function SplashScreen() {
  const history = useHistory();

  useEffect(() => {
    localStorage.clear();
    const timer = setTimeout(() => {
      history.push("/selectunit");
    }, 5000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="splashscreen">
      <div className="container">
        <img className="logo" src={logo} alt="e-Fácil" />
        <Loading />
      </div>
    </div>
  );
}
