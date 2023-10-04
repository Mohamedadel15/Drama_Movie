import React, { useContext, useEffect, useState } from "react";
import "./OverView.scss";
import { Col, Row } from "react-bootstrap";
import getData from "../../utils/api";
import MoveIdContext from "../../store/MoveIdContext";
import Casts from "../categories/Casts";
import { useParams } from "react-router-dom";


import NoPoster from "../../assets/no-poster.png";

export default function OverView() {
  const { Type } = useContext(MoveIdContext);
  const [Data, setData] = useState(null);
  const { FilmId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!Data) {
          const response = await getData(`/${Type}/${FilmId}`);
          setData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Data]);

  const text = [
    {
      name: "First Aired",
      describe: Data?.first_air_date,
    },
    {
      name: "Last Aired",
      describe: Data?.last_air_date,
    },
    {
      name: "Runtime",
      describe: Data?.runtime && Data?.runtime + " min",
    },
    {
      name: "Released",
      describe: Data?.release_date,
    },
    {
      name: "Genre",
      describe: Data && Data?.genres.map((d) => d.name + " ,   "),
    },
    {
      name: "status",
      describe: Data?.status,
    },
    {
      name: "Language",
      describe: Data && Data?.spoken_languages.map((d) => d.name + " , "),
    },
    {
      name: "Production",
      describe: Data && Data?.production_countries.map((d) => d.name + " , "),
    },
    {
      name: "revenue",
      describe: `$ ` + Data?.revenue && Data?.revenue,
    },
    {
      name: "runtime",
      describe: Data?.episode_run_time,
    },
    {
      name: "created_by",
      describe: Data?.created_by && Data?.created_by.map((d) => d.name + " , "),
    },
    {
      name: "Seasons",
      describe: Data?.number_of_seasons,
    },
    {
      name: "Network",
      describe: Data?.networks && Data?.networks.map((d) => d.name + " , "),
    },
  ];

  return (
    <div className="OverView">
      <Row className="m-0">
        <Col className=" ">
          <img
            src={Data?.backdrop_path?`https://image.tmdb.org/t/p/w500${Data?.backdrop_path}`:NoPoster}
            className="OverView__image w-100 pointer p-0"
          />
        </Col>
        <Col xs={12} xxl={9} className="OverView__Text">
          <h3 className="my-2">{Data?.name || Data?.title}</h3>
          <p className=" my-4">{Data?.overview}</p>
          {text.map((value, indx) => {
            return (
              value.describe && (
                <Row className="m-0 mb-3" key={indx}>
                  <Col xs={4}>{value.name}</Col>
                  <Col>{value.describe}</Col>
                </Row>
              )
            );
          })}
        </Col>
      </Row>

      {/* Casts people that relate  with this film or Tv */}
      <Casts />
    </div>
  );
}
