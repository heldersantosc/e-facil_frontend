import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styles.scss";
import Navbarcommon from "../../components/Navbar/NavbarCommon";
import VacancyButton from "../../components/VancancyButton";
import FooterLine from "../../components/FooterLine";
import api from "../../services/api";
import bkg from "./UNIDADE 11 - S1.jpg";

export default function SelectVacancy() {
  const [floor, setFloor] = useState();
  const [id_unidade_andar, setUnidadeAndar] = useState();
  const [vacancyList, setVacancyList] = useState([]);
  const history = useHistory();

  async function selectVacancy(
    id_vaga,
    vacancySelected,
    vacancyStatus,
    vacancyAccessibility
  ) {
    if (vacancyStatus === "blocked" || vacancyStatus === "indisponible") {
      alert("Vaga Indisponível");
    } else {
      localStorage.setItem("vacancySelected", vacancySelected);
      localStorage.setItem("vacancyStatus", vacancyStatus);
      localStorage.setItem("vacancyAccessibility", vacancyAccessibility);

      await api
        .post(`/vacancy/`, {
          data: {
            vaga: id_vaga,
            matricula: localStorage.getItem("matricula"),
            status: 12,
            data: "2020-06-01",
            hora: "20:34:00",
          },
        })
        .then((response) => {
          console.log(response);
          history.push("/selectedvacancy");
        });
    }
  }

  useEffect(() => {
    async function getVacancy() {
      await api.get(`/vacancies/${id_unidade_andar}`, {}).then((response) => {
        setVacancyList(response.data);
      });
    }

    localStorage.setItem(
      "id_unidade_andar",
      `${localStorage.getItem("unitName")}-${localStorage.getItem(
        "floorSelected"
      )}`
    );
    setUnidadeAndar(localStorage.getItem("id_unidade_andar"));
    setFloor(localStorage.getItem("floorSelected"));
    getVacancy();
  }, [history, floor, id_unidade_andar]);

  return (
    <div className="selectvacancy">
      <Navbarcommon path="/selectfloor" />
      <div className="container">
        <div className="header">
          <div className="board txt-white">
            <h1>{floor}</h1>
            <hr />
            <h1>VAGAS: 42 </h1>
          </div>
          <div className="subtitle txt-white">
            <div className="subtitle-item">
              <VacancyButton
                status={"disponible"}
                number={""}
                accessibility={0}
              />
              Disponível
            </div>
            <div className="subtitle-item">
              <VacancyButton
                status={"indisponible"}
                number={""}
                accessibility={0}
              />
              Indisponível
            </div>
            <div className="subtitle-item">
              <VacancyButton
                status={"wheelchair"}
                number={""}
                accessibility={1}
              />
              Acessibilidade
            </div>
          </div>
        </div>
        <div
          className="vacancy-container"
          style={{
            backgroundImage: `url("${bkg}")`,
          }}
        >
          <div className="vacancy-group">
            <div className="vacancy-row">
              {vacancyList.map((vacancy) => (
                <button
                  // key={`${vacancy.id_unidade_andar}-${vacancy.vaga}`}
                  key={vacancy.id_vaga}
                  type="button"
                  className="no-button"
                  onClick={() =>
                    selectVacancy(
                      vacancy.id_vaga,
                      vacancy.vaga,
                      vacancy.status,
                      vacancy.acessibilidade
                    )
                  }
                >
                  <VacancyButton
                    number={vacancy.vaga}
                    status={vacancy.status}
                    accessibility={vacancy.acessibilidade}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterLine />
    </div>
  );
}
