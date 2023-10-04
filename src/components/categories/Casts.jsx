import CardDetails from "../card/CardDetails";

import { Swiper, SwiperSlide } from "swiper/react";
import { useContext, useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import getData from "../../utils/api";
import "./Categories.scss";
import MoveIdContext from "../../store/MoveIdContext";
import { useParams } from "react-router-dom";

import NoImage from "../../assets/NoImage.png";
export default function Casts() {
  const [Data, setData] = useState(null);
  const {  Type } = useContext(MoveIdContext);
  const { FilmId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!Data) {
          const response = await getData(
            Type === "tv" ? `/tv/${FilmId}/credits` : `/movie/${FilmId}/credits`
          );
          setData(response?.cast);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Data]);
  return (
    <div className="Categories  d-flex flex-column gap-5">
      <h3 className="Categories__Title">
        Cast
        <span className={`Categories__Title--Explore pointer d-none`}>
          Explore All
        </span>
      </h3>
      <div className=" d-flex">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination]}
          navigation
          slidesPerView={1}
          className="Swiper ps-2"
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
                    rating={data.popularity}
                    title={data.title || data.name}
                    timing={data.release_date || data.first_air_date}
                    srcImg={
                      data?.profile_path
                        ? `https://image.tmdb.org/t/p/w500${data?.profile_path}`
                        : NoImage
                    }
                    desplay="d-none"
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
