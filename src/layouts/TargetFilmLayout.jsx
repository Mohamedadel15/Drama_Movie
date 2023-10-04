import React, { useContext } from "react";
import TrilerHero from "../components/trilerHero/TrilerHero";
import Categories from "../components/categories/Categories";
import { NavLink, Outlet, useParams } from "react-router-dom";
import MoveIdContext from "../store/MoveIdContext";

export default function TargetFilmLayout() {
  const { Type } = useContext(MoveIdContext);
  const { FilmId } = useParams();

  return (
    <div>
      <TrilerHero url={Type === "tv" ? `/tv/${FilmId}` : `/movie/${FilmId}`} />
      <div className="my-5 TargetFilmLayout">
        <ul className=" d-flex w-100 m-auto justify-content-center my-4 text-capitalize align-items-center">
          <li>
            <NavLink className={" p-2 p-lg-3 fs-6 text-white "} to={`OverView`}>
              Over view
            </NavLink>
          </li>
          <li className={Type === "tv" ? "" : "d-none"}>
            <NavLink
              className={" p-2 p-lg-3 fs-6 text-white   "}
              to={"EPISODES"}
            >
              EPISODES
            </NavLink>
          </li>
          <li>
            <NavLink className={" p-2 p-lg-3 fs-6 text-white "} to={"video"}>
              VIDEOS
            </NavLink>
          </li>
          <li>
            <NavLink className={" p-2 p-lg-3 fs-6  text-white"} to={"PHOTOS"}>
              PHOTOS
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
      <Categories
        Header={"More_like_this"}
        url={
          localStorage.getItem("Type") === "movie"
            ? `/movie/${FilmId}/similar`
            : `/tv/${FilmId}/similar`
        }
      />
    </div>
  );
}
