import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styles.scss";
import bkg from "./UNIDADE 11 - S1.jpg";

import Navbarcommon from "../../components/Navbar/NavbarCommon";
import VacancyButton from "../../components/VancancyButton";
import FooterLine from "../../components/FooterLine";

import api from "../../services/api";

/** inicio da função de selecionar a vaga */
export default function SelectVacancy() {
  const [floor] = useState(localStorage.getItem("floorSelected"));
  const [id_unidade_andar, setUnidadeAndar] = useState();
  const [vacancyList, setVacancyList] = useState([]);
  const history = useHistory();

  /** função para selecionar a vaga */
  async function selectVacancy(
    id_vaga,
    vacancySelected,
    vacancyStatus,
    vacancyAccessibility
  ) {
    if (vacancyStatus === "blocked" || vacancyStatus === "indisponible") {
      alert("Vaga Indisponível");
    } else {
      /** define as vagss escolhidas */
      localStorage.setItem("vacancySelected", vacancySelected);
      localStorage.setItem("vacancyStatus", vacancyStatus);
      localStorage.setItem("vacancyAccessibility", vacancyAccessibility);

      /** envia pra rota via post os dados escolhidos */
      await api
        .post(`/reservations/`, {
          data: {
            vaga: id_vaga,
            matricula: localStorage.getItem("matricula"),
          },
        })
        .then((response) => {
          console.log(response);
          /** se tudo der certo, ele mostra a tela da vaga escolhida */
          history.push("/selectedvacancy");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  /** função que é executada quando a pagina é acessada */
  useEffect(() => {
    /** função pra chamada do backend */
    async function getVacancy() {
      /** recebe uma lista de vagas */
      await api.get(`/vacancies/${id_unidade_andar}`, {}).then((response) => {
        setVacancyList(response.data);
      });
    }
    /** concatena a unidade com o andar */
    localStorage.setItem(
      "id_unidade_andar",
      `${localStorage.getItem("unitName")}-${localStorage.getItem(
        "floorSelected"
      )}`
    );
    /** pega a variavel id_unidade_andar do navegador */
    setUnidadeAndar(localStorage.getItem("id_unidade_andar"));

    /** chama a função pra listar as vagas */
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
