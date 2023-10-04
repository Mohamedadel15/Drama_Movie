import React, { useContext, useEffect, useState } from "react";
import MoveIdContext from "../store/MoveIdContext";
import { useParams } from "react-router-dom";
import UseFetchData from "../hooks/UseFetchData";
import CardDetails from "../components/card/CardDetails";
import LoadingPagination from "../components/skilton/Loadingpagination/LoadingPagination";

export default function All() {
  const { Type, contextId } = useContext(MoveIdContext);
  const { FilmId, AllHeader } = useParams();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  const allUrls = {
    Trending_Movies: `/movie/upcoming?page=${page}`,
    Trending_TV_Shows: `/trending/tv/day?page=${page}`,
    Popular_Movies: `/movie/popular?page=${page}`,
    Top_Rated_Movies: `/movie/top_rated?page=${page}`,
    Upcoming_Movies: `/movie/upcoming?page=${page}`,
    Now_Playing_Movies: `/movie/now_playing?page=${page}`,
    Popular_TV_Shows: `/tv/popular?page=${page}`,
    Top_Rated_TV_Shows: `/tv/top_rated?page=${page}`,
    TV_Shows_Airing_Today: `/tv/airing_today?page=${page}`,
    Currently_Airing_TV_Shows: `/tv/on_the_air?page=${page}`,
    More_like_this:
      localStorage.getItem("Type") === "movie"
        ? `/movie/${contextId}/similar?page=${page}`
        : `/tv/${contextId}/similar?page=${page}`,
  };
  const { data, loading } = UseFetchData(allUrls[AllHeader]);
  useEffect(() => {
    if (data?.results.length >= 1) {
      setItems([...items, ...data?.results]);
    }
  }, [data]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200
    ) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container">
      <p className="px-3 pt-5 pb-5 fs-4">{AllHeader}</p>
      <div className="d-flex flex-wrap justify-content-center gap-5">
        {items?.length >= 1 &&
          items.map((value) => {
            return (
              <CardDetails
                key={value.id}
                rating={value.vote_average}
                title={value.title}
                timing={value.first_air_date || value.release_date}
                srcImg={
                  `https://image.tmdb.org/t/p/w500` + value?.backdrop_path
                }
                data={value}
              />
            );
          })}

      </div>
      <div
          className={`${
            loading ? "visible" : "invisible"
          } d-flex justify-content-center mt-5`}
        >
          <LoadingPagination />
        </div>
    </div>
  );
}
