import React, { useEffect, useRef, useState } from "react";
import CardDetails from "../components/card/CardDetails";

import { AiOutlineClose } from "react-icons/ai";

import "./Search.scss";
import UseFetchData from "../hooks/UseFetchData";

import noPoster from "../assets/no-poster.png";
import LoadingPagination from "../components/skilton/Loadingpagination/LoadingPagination";
export default function Search() {
  const [SearchResult, setSearchResult] = useState("");
  const [page, setPage] = useState(1);
  const { data, loading, error } = UseFetchData(
    `/search/movie?query=${SearchResult}&page=${page}`
  );
  const [items, setItems] = useState([]);

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
    <div
      className=" d-flex flex-column page__Search"
      style={{ minHeight: "70vh" }}
    >
      <div className="SearchInputBar open ">
        <input
          onChange={(event) => {
            setSearchResult(event.target.value);
            setPage(1);
            setItems([]);
          }}
          value={SearchResult}
          type="text"
          className="page__Search--input"
          placeholder="Search for a movie, tv show or person..."
        ></input>
        <AiOutlineClose
          className="closeIcone pointer"
          onClick={() => {
            setSearchResult("");
            setPage(1);
            setItems([]);
          }}
        />
      </div>
      <div className="page__Search--card d-flex">
        <p
          className="page__Search--Paragraph"
        >
          Results For:{" "}
          <span className="page__Search--SearchName">{SearchResult}</span>
        </p>
        {SearchResult.length <= 0 && <h2>No Have Result</h2>}
        {items?.length >= 1 &&
          items.map((result) => {
            return (
              <CardDetails
                key={result.id}
                rating={result.vote_average}
                title={result.title}
                timing={result.release_date}
                srcImg={
                  result?.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${result?.backdrop_path}`
                    : noPoster
                }
                data={result}
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
