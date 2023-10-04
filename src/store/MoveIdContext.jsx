import { useState, createContext } from "react";

const MoveIdContext = createContext();

export function MoveIdContextProvider(props) {
  const [contextId, setContextId] = useState(null);
  const [Type, setType] = useState(localStorage.getItem("Type"));
  const [numberOfSeason, setNumberOfSeason] = useState([0]);

  const [favIcons, setFavIcons] = useState([
    ...JSON.parse(localStorage.getItem("favIcons") || "[]"),
  ]);
  localStorage.setItem("favIcons", JSON.stringify(favIcons));

  localStorage.setItem("Type", Type);

  return (
    <MoveIdContext.Provider
      value={{
        contextId,
        setContextId,
        Type,
        setType,
        numberOfSeason,
        setNumberOfSeason,
        favIcons,
        setFavIcons,
      }}
    >
      {props.children}
    </MoveIdContext.Provider>
  );
}

export default MoveIdContext;
