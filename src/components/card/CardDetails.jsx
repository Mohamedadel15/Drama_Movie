import { useContext } from "react";
import StarRating from "../../utils/StarRating";
import { CircularProgressbar } from "react-circular-progressbar";

import Card from "react-bootstrap/Card";

// function to handle the path url to navigate for the specific component
import { handleGetPath } from "../../utils/Handelers";

import "./CardDetails.scss";
import { useNavigate, useResolvedPath } from "react-router-dom";
import MoveIdContext from "../../store/MoveIdContext";

export default function CardDetails({
  rating,
  title,
  timing,
  srcImg,
  desplay,
  data,
}) {
  const { setContextId, setType } = useContext(MoveIdContext);
  const path = useResolvedPath();
  const navigate = useNavigate();
  function handleIdClicked() {
    if (!data?.character) {
      setContextId(data?.id);
      setType(data?.origin_country ? "tv" : "movie");
      navigate(
        `/${data?.origin_country ? "tv" : "movie"}/TargetFilm/${data?.id}`
      );
    }
  }
  return (
    <div className="p-1 AllCard">
      <Card
        style={{ width: "18rem" }}
        className=" border-0 CardDetails pointer"
        onClick={handleIdClicked}
      >
        <Card.Img src={srcImg} className="CardDetails__img " />
        <Card.Body className="CardDetails__Text">
          <Card.Text
            className=" m-0 flex-fill"
            style={{ maxHeight: "50px", overflow: "hidden" }}
          >
            {title}
          </Card.Text>
          <Card.Text className=" m-0">{timing}</Card.Text>
          <StarRating rating={rating} Desplay={desplay} />
        </Card.Body>
        <div className={`CardDetails__circular--progressBar ${desplay}`}>
          <CircularProgressbar
            value={rating}
            maxValue={10}
            text={+rating.toFixed(1) * 10 + "%"}
            strokeWidth={7}
          />
        </div>
      </Card>
    </div>
  );
}
