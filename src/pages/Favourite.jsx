import React, { useContext, useState } from "react";
import MoveIdContext from "../store/MoveIdContext";
import CardDetails from "../components/card/CardDetails";
import NoImage from "../assets/NoImage.png";

import { AiFillCloseCircle } from "react-icons/ai";

export default function Favourite() {
  const [FilmType, setFilmType] = useState("All");
  const { favIcons, setFavIcons } = useContext(MoveIdContext);
  favIcons.filter((item) => {
    return item.Type === FilmType;
  });
  return (
    <div
      style={{ minHeight: "600px", padding: "40px" }}
      className="d-flex flex-column gap-5"
    >
      <div className="d-flex justify-content-between align-items-center">
        <h3 className=" fs-6 ">
          Number of Favourite{" "}
          <span className=" fw-lighter fs-5">{favIcons.length}</span>
        </h3>
        <select
          id="Episodes"
          onChange={(e) => setFilmType(e.target.value)}
          className="Episodes-select"
        >
          <option value={"All"}>All</option>
          <option value={"movie"}>Movie</option>
          <option value={"tv"}>Tv</option>
        </select>
        <label htmlFor="Episodes"></label>
      </div>

      <div className="d-flex flex-wrap gap-3 justify-content-lg-start  justify-content-center">
        {favIcons
          .filter((item) => {
            return item.Type=== FilmType || FilmType === "All";
          })
          .map((item) => {
            return (
              <div className=" position-relative" key={item.id}>
                <AiFillCloseCircle
                  className="Close__Favorite--card"
                  onClick={() => {
                    setFavIcons(
                      favIcons.filter((itemone) => itemone.id !== item.id)
                    );
                  }}
                />
                <CardDetails
                  rating={item.average}
                  title={item.title}
                  timing={item.timing}
                  srcImg={
                    item?.srcImg
                      ? `https://image.tmdb.org/t/p/w500${item?.srcImg}`
                      : NoImage
                  }
                  data={item.data}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
