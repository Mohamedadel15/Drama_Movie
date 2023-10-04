import React, { useContext, useState } from "react";
import { Row } from "react-bootstrap";
import "./videoView.scss";
import { AiOutlinePlayCircle } from "react-icons/ai";
import UseFetchData from "../../hooks/UseFetchData";
import MoveIdContext from "../../store/MoveIdContext";
import { useParams } from "react-router-dom";
import VideoPopup from "../videoPopup/VideoPopup";
import LoadingPagination from "../skilton/Loadingpagination/LoadingPagination";
export default function VideoView() {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { Type } = useContext(MoveIdContext);
  const { FilmId } = useParams();
  const { data, loading } = UseFetchData(`/${Type}/${FilmId}/videos`);
  return (
    <div>
      {data?.results.length === 0 && (
        <h1 className="d-flex justify-content-center">No Have Video</h1>
      )}
      <Row className="m-0 gap-3 gap-md-2 gap-lg-0 d-flex justify-content-center align-item-center">
        {data?.results.map((value) => {
          return (
            <div
              onClick={() => {
                setVideoId(value.key);
                setShow(true);
              }}
              className="col-12 col-lg-3 col-md-5 my-2 VideoView"
              key={value.id}
            >
              <AiOutlinePlayCircle className="PlayVideo" />
              <img
                src={`https://img.youtube.com/vi/${value.key}/mqdefault.jpg`}
                className="w-100 pointer"
              />
              <h6 className=" fw-light mt-2">{value.name}</h6>
              <p className=" fw-lighter m-0" style={{ opacity: 0.6 }}>
                {value.type}
              </p>
            </div>
          );
        })}
        <div
        className={loading ?`d-flex justify-content-center mt-5`:`invisible`}
      >
        <LoadingPagination />
      </div>
      </Row>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
}
