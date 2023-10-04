import "./CardSkelton.scss";

export default function CardSkelton({ display }) {
  return (
    <div className="card-mi">
      <div className="card__skeleton card__description mb-4 "> </div>
      <div className="card__skeleton card__title"></div>
    </div>
  );
}
