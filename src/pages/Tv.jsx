import React from "react";
import TrilerHero from "../components/trilerHero/TrilerHero";
import Categories from "../components/categories/Categories";

export default function Tv() {
  return (
    <div>
      <TrilerHero url="/trending/tv/day" />
      <Categories Header={"Popular_TV_Shows"} url={"/tv/popular"} />
      <Categories Header={"Top_Rated_TV_Shows"} url={"/tv/top_rated"} />
      <Categories Header={"TV_Shows_Airing_Today"} url={"/tv/airing_today"}/>
      <Categories Header={"Currently_Airing_TV_Shows"} url={"/tv/on_the_air"} />
    </div>
  );
}
