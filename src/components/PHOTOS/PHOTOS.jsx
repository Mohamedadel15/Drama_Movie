import React, { useContext, useState } from "react";
import { Row } from "react-bootstrap";
import "./PHOTOS.scss";
import MoveIdContext from "../../store/MoveIdContext";
import { useParams } from "react-router-dom";
import UseFetchData from "../../hooks/UseFetchData";
import LoadingPagination from "../skilton/Loadingpagination/LoadingPagination";
import hero from "../../assets/NoImage.png";
import { SlideshowLightbox } from "lightbox.js-react";

export default function PHOTOS() {
  const { Type } = useContext(MoveIdContext);
  const { FilmId } = useParams();
  const { data, loading } = UseFetchData(`/${Type}/${FilmId}/images`);
  return (
    <div>
      <p className="px-3 fs-4">
        Back Droop{" "}
        <span className="fs-6 fw-lighter opacity-50 ms-2">
          {data?.backdrops.length} Images
        </span>
      </p>
      <Row className="m-0  gap-0  d-flex align-item-center">
        {data?.backdrops.map((image, indx) => {
          return (
            <div
              className="col-6 col-lg-2 col-md-3 my-2 VideoView"
              key={image.file_path}
            >
              <SlideshowLightbox>
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  className="w-100 pointer PHOTOS__img"
                />
              </SlideshowLightbox>
            </div>
          );
        })}
        <div
          className={
            loading ? `d-flex justify-content-center mt-5` : `invisible`
          }
        >
          <LoadingPagination />
        </div>
      </Row>
      <p className="px-3 fs-4 mt-5">
        Posters
        <span className="fs-6 fw-lighter opacity-50 ms-2">
          {data?.posters.length} Images
        </span>
      </p>
      <Row className="m-0 gap-0  d-flex align-item-center">
        {data?.posters.map((image) => {
          return (
            <div
              className="col-6 col-lg-2 col-md-3 my-2 VideoView mx-0"
              key={image.file_path}
            >
              <SlideshowLightbox>
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  className="w-100 pointer PHOTOS__img"
                  style={{ height: "350px", objectFit: "cover" }}
                />
              </SlideshowLightbox>
            </div>
          );
        })}
        <div
          className={
            loading ? `d-flex justify-content-center mt-5` : `invisible`
          }
        >
          <LoadingPagination />
        </div>
      </Row>
    </div>
  );
}
