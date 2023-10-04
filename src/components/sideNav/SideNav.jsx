import { SlHome } from "react-icons/sl";
import { PiFilmSlateDuotone } from "react-icons/pi";
import { PiTelevisionSimple } from "react-icons/pi";
import { BsSearch } from "react-icons/bs";
import { PiHeartDuotone } from "react-icons/pi";


import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "./SideNav.scss";
import { NavLink } from "react-router-dom";

const icons = [
  {
    name: <SlHome />,
    title: "Home",
  },
  {
    name: <PiFilmSlateDuotone />,
    title: "movie",
  },
  {
    name: <PiTelevisionSimple />,
    title: "tv",
  },
  {
    name: <BsSearch />,
    title: "Search",
  },
  {
    name: <PiHeartDuotone className="Favourite"></PiHeartDuotone>,
    title: "Favorites",
  },
];

function SideNav() {
  console.log();
  return (
    <div className="d-flex SideNav">
      {icons.map((icon, indx) => (
        <OverlayTrigger
          key={indx}
          placement="top"
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>{icon.title}</strong>
            </Tooltip>
          }
        >
          <NavLink
            className="m40 pointer SideNav_icone"
            to={icon.title === "Home" ? "/" : icon.title}
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(68, 111, 191)" : "",
              };
            }}
          >
            {icon.name}
          </NavLink>
        </OverlayTrigger>
      ))}
    </div>
  );
}

export default SideNav;
