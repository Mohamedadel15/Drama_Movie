import CardDetails from "../card/CardDetails";

import { Swiper, SwiperSlide } from "swiper/react";
import { useContext, useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import getData from "../../utils/api";
import "./Categories.scss";
import MoveIdContext from "../../store/MoveIdContext";
import { useNavigate } from "react-router-dom";

import NoImage from "../../assets/NoImage.png";
import CardSkelton from "../skilton/cardskelton/CardSkelton";
import UseFetchData from "../../hooks/UseFetchData";
export default function Categories({ Header, Desplay = "", url }) {
  const [Data, setData] = useState(null);
  const [test, setTest] = useState(null);
  const navigate = useNavigate();
  const { data, loading } = UseFetchData(url);

  useEffect(() => {
    if (data) {
      setData(data?.results);
    }
  }, [data]);
  function handleIdClicked() {
    setIdAndType({
      id: Data?.id,
      type: Data?.media_type || "movie",
    });
    navigate(handleGetPath(path.pathname, idAndType.type, idAndType.id));
  }

  return (
    <div className="Categories  d-flex flex-column gap-5">
      <h3 className="Categories__Title">
        {Header}{" "}
        <span
          className={`Categories__Title--Explore pointer ${Desplay}`}
          onClick={() => {
            navigate(`/${Header}`);
          }}
        >
          Explore All
        </span>
      </h3>
      <div className=" d-flex">
        <div
          className={
            loading
              ? `d-flex align-items-center justify-content-center gap-2`
              : `d-none gap-2`
          }
        >
          <CardSkelton />
          
          <div className="d-none d-lg-flex gap-2">
          <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
          </div>
        </div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination]}
          navigation
          slidesPerView={1}
          className={loading ? `d-none` : `Swiper ps-2 `}
          breakpoints={{
            500: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            900: {
              slidesPerView: 4,
            },
            1100: {
              slidesPerView: 5,
            },
            1400: {
              slidesPerView: 6,
            },
            1500: {
              slidesPerView: 7,
            },
          }}
        >
          {Data &&
            Data.map((data) => {
              return (
                <SwiperSlide key={data.id}>
                  <CardDetails
                    rating={data.vote_average}
                    title={data.title || data.name}
                    timing={data.release_date || data.first_air_date}
                    srcImg={
                      data?.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${data?.backdrop_path}`
                        : NoImage
                    }
                    desplay={Desplay}
                    data={data}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}
