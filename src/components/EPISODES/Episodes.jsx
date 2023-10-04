import { Row, Col } from "react-bootstrap";
import UseFetchData from "../../hooks/UseFetchData";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import noPoster from "../../assets/no-poster.png";
import MoveIdContext from "../../store/MoveIdContext";
import "./Episodes.scss";

export default function Episodes() {
  const { FilmId } = useParams();
  const { numberOfSeason } = useContext(MoveIdContext);
  const [seasonNum, setSeasonNum] = useState(1);
  const { data, loading, error } = UseFetchData(
    `/tv/${FilmId}/season/${seasonNum}`
  );
  return (
    <div>
      <Row>
        <Col className="col-12 d-flex gap-3">
          <select
            id="Episodes"
            onChange={(e) => setSeasonNum(e.target.value)}
            className="Episodes-select"
          >
            {numberOfSeason &&
              numberOfSeason.map((seasonNum, i) => {
                return (
                  <option value={i + 1} key={i}>
                    Season {i + 1}{" "}
                  </option>
                );
              })}
          </select>
          <label htmlFor="Episodes">{data?.episodes.length} Episodes</label>
        </Col>
      </Row>
      <Row className="m-0 gap-3 gap-md-2 gap-lg-0 d-flex align-item-center">
        {data?.episodes.map((value) => {
          return (
            <div
              className="col-12 col-lg-3 col-md-5 my-2 "
              key={value.episode_number}
            >
              <img
                src={
                  value.still_path
                    ? `https://image.tmdb.org/t/p/w500${value.still_path}`
                    : noPoster
                }
                className="w-100 pointer"
                style={{ height: "250px" }}
              />
              <h4 className=" fw-light my-2 fs-6">
                <span className="me-3 text-danger">
                  E
                  {value.episode_number < 10
                    ? `0${value.episode_number}`
                    : value.episode_number}
                </span>
                {value.name}
              </h4>
              <div className="vertical-ellipsis">
                <p className=" fw-lighter ">{value.overview}</p>
              </div>
              <p className=" fw-lighter m-0" style={{ opacity: 0.6 }}>
                {value.air_date}
              </p>
            </div>
          );
        })}
      </Row>
    </div>
  );
}
