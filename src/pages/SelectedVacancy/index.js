import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "./styles.scss";
import Navbarcommon from "../../components/Navbar/NavbarCommon";
import FooterLine from "../../components/FooterLine";
import wheelchair from "../../assets/wheelchair.png";

export default function SelectedVacancy() {
  const [floor, setFloor] = useState();
  const [vacancy, setVacancy] = useState();
  const [status, setStatus] = useState();
  const [accessibilityStatus, setAccessibilityStatus] = useState("");
  const history = useHistory();

  useEffect(() => {
    setFloor(localStorage.getItem("floorSelected"));
    setVacancy(localStorage.getItem("vacancySelected"));
    setStatus(localStorage.getItem("vacancyStatus"));
    if (status === "wheelchair") {
      setAccessibilityStatus(true);
    }
    const timer = setTimeout(() => {
      history.push("/login");
    }, 5000);
    return () => clearTimeout(timer);
  }, [history, floor, vacancy, status, accessibilityStatus]);

  return (
    <div className="selectedvacancy">
      <Navbarcommon path="/selectfloor" />
      <div className="container">
        <div className="panel">
          <div className="panel-item">
            <div className="card">
              <h1 className="title">Andar</h1>
              <div className="btn">{floor}</div>
            </div>
            <div className="card">
              <div className="title"></div>
              <div className="arrow">
                <FiArrowRight size="100" />
              </div>
            </div>
            <div className="card">
              <h1 className="title">Vaga</h1>
              <div className={`btn ${status}`}>
                {accessibilityStatus ? (
                  <img
                    className="wheelchair-logo"
                    src={wheelchair}
                    alt="Accessibilidade"
                  ></img>
                ) : (
                  ""
                )}
                {vacancy}
              </div>
            </div>
          </div>
          <div className="info">
            <h1>Dirija-se até a sua vaga.</h1>
          </div>
        </div>
      </div>
      <FooterLine />
    </div>
  );
}
