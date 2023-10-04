import React, { useState, useEffect, useContext } from "react";
import MoveIdContext from "../../store/MoveIdContext";
import "./trilerHero.scss";
import { Button } from "react-bootstrap";
import { VscDebugStart } from "react-icons/vsc";
import { AiFillHeart } from "react-icons/ai";
import StarRating from "../../utils/StarRating";
import { useNavigate, useResolvedPath } from "react-router-dom";

// function to handle the path url to navigate for the specific component
import { handleGetPath } from "../../utils/Handelers";
import getData from "../../utils/api";
import VideoPopup from "../videoPopup/VideoPopup";

import NoPoster from "../../assets/no-poster.png";
export default function TrilerHero({ url }) {
  const [propps, setpropps] = useState(Math.floor(Math.random() * 20));
  const [Data, setData] = useState(null);
  const [test, setTest] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [show, setShow] = useState(false);
  const {
    setContextId,
    setType,
    setNumberOfSeason,
    Type,
    favIcons,
    setFavIcons,
  } = useContext(MoveIdContext);
  const path = useResolvedPath();
  const navigate = useNavigate();

  const [activeIcon, setActiveIcon] = useState("Fav__Icon--light");
  const [DataKey, setDataKey] = useState(null);
  url &&
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!Data || !test) {
            const response = await getData(url);
            if (
              path.pathname === `/` ||
              path.pathname === `/tv` ||
              path.pathname === `/movie`
            ) {
              setData(response.results[propps]);
            } else {
              setData(response);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [url]);
  useEffect(() => {
    setNumberOfSeason(Data?.seasons);
    const fetchData = async () => {
      if (Data) {
        try {
          if (!test) {
            const response = await getData(
              Data?.origin_country
                ? `/tv/${Data?.id}/videos`
                : `/movie/${Data?.id}/videos`
            );
            setDataKey(response);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [Data]);

  useEffect(() => {
    setActiveIcon("Fav__Icon--light");
    if (
      favIcons.find((items) => items.id === Data?.id) &&
      setActiveIcon("Fav__Icon--Dark")
    ) {
      return setActiveIcon("Fav__Icon--Dark");
    }
  }, [Data]);

  // add film to Favorite component
  function handleFavIcon() {
    if (activeIcon === "Fav__Icon--light") {
      setActiveIcon("Fav__Icon--Dark");
      setFavIcons([
        {
          id: Data?.id,
          average: Data.vote_average,
          title: Data.title || Data.name,
          timing: Data.release_date || Data.first_air_date,
          srcImg:Data?.backdrop_path,
          data:Data,
          Type:(Data?.origin_country ? "tv": "movie"),
        },
        ...favIcons
      ]);
    } else {
      setActiveIcon("Fav__Icon--light");
      setFavIcons(favIcons.filter((item) => item.id !== Data?.id));
    }
  }
  // console.log("favIcons", localStorage.getItem("favIcons"));
  function handleIdClicked() {
    setContextId(Data?.id);
    setType(Data?.origin_country ? "tv" : "movie");

    navigate(handleGetPath(path.pathname, Type, Data?.id));
  }

  return (
    <div className="TrilerHero">
      <div className="row">
        <div className="col-lg-5 col-12 TrilerHero_text order-0 order-last order-lg-first ">
          <h1 className="pointer" onClick={handleIdClicked}>
            {Data?.name || Data?.title}
          </h1>
          <div className=" my-4 TrilerHero_Rating d-flex gap-3 ">
            <div className="d-flex align-items-center gap-3">
              <StarRating rating={Data?.vote_average || 0} />
              <span>{Data?.vote_count} Reviews</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span>{Data?.release_date || Data?.first_air_date}</span>
            </div>
          </div>
          <p className="TrilerHero__OverFlow">{Data?.overview}</p>
          <div className="d-flex align-items-center gap-3">
            <Button
              className="btn  TrilerHero_Btn  d-inline-flex align-items-center gap-2 p-2 px-3"
              onClick={() => {
                setVideoId(DataKey?.results[0].key);
                setShow(true);
              }}
            >
              <VscDebugStart />
              Watch Trailer
            </Button>
            <span
              className={`pointer fs-3 Fav__Icon ${activeIcon}`}
              title="Add TO Favorite Films"
              onClick={handleFavIcon}
            >
              <AiFillHeart />
            </span>
          </div>
        </div>
        <div className=" col-lg-7 col-12  TrilerHero_img ">
          <img
            src={
              Data && Data?.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${Data?.backdrop_path}`
                : NoPoster
            }
            className="TrilerHero"
          />
        </div>
      </div>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
}
