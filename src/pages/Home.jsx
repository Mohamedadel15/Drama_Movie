import TrilerHero from "../components/trilerHero/TrilerHero";
import Categories from "../components/categories/Categories";
import getData from "../utils/api";
import LoadingPagination from "../components/skilton/Loadingpagination/LoadingPagination";
export default function Home() {

  return (
    <div>
      <TrilerHero url="/trending/all/day" />
      <Categories Header={"Trending_Movies"}  url="/movie/upcoming"/>
      <Categories Header={"Trending_TV_Shows"} url="/trending/tv/day" />
    </div>
  );
}
