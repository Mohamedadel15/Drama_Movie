import TrilerHero from "../components/trilerHero/TrilerHero";
import Categories from "../components/categories/Categories";
export default function Film() {

  return (
    <div>
      <TrilerHero url="/movie/upcoming" />
      <Categories Header={"Popular_Movies"}  url="/movie/popular"  />
      <Categories Header={"Top_Rated_Movies"}  url="/movie/top_rated" />
      <Categories Header={"Upcoming_Movies"}  url="/movie/upcoming" />
      <Categories Header={"Now_Playing_Movies"} url="/movie/now_playing"  />
    </div>
  );
}
