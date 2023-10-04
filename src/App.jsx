import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import TargetFilmLayout from "./layouts/TargetFilmLayout";
import Favourite from "./pages/Favourite";
import AppLayout from "./layouts/AppLayout";
import FilmTvLayout from "./layouts/FilmTvLayout";
import Film from "./pages/Film";
import Tv from "./pages/Tv";
import OverView from "./components/overView/OverView";
import Episodes from "./components/EPISODES/Episodes";
import PHOTOS from "./components/PHOTOS/PHOTOS";
import VideoView from "./components/videoView/VideoView";
import All from "./pages/All";
import LoadingPagination from "./components/skilton/Loadingpagination/LoadingPagination";
import {initLightboxJS} from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={"page is Not found"}>
      <Route index="true" element={<Home />} />
      <Route path="/:AllHeader" element={<All />} />
      <Route path="Search" element={<Search />} />
      <Route path="tv" element={<FilmTvLayout />}>
        <Route index element={<Tv />} />
        <Route path="TargetFilm/:FilmId" element={<TargetFilmLayout />}>
          <Route path="OverView" element={<OverView />} />
          <Route path="EPISODES" element={<Episodes />} />
          <Route path="PHOTOS" element={<PHOTOS />} />
          <Route path="video" element={<VideoView />} />
        </Route>
      </Route>
      <Route path="movie" element={<FilmTvLayout />}>
        <Route index element={<Film />} />
        <Route path="TargetFilm/:FilmId" element={<TargetFilmLayout />}>
          <Route path="OverView" element={<OverView />} />
          <Route path="EPISODES" element={<Episodes />} />
          <Route path="PHOTOS" element={<PHOTOS />} />
          <Route path="video" element={<VideoView />} />
        </Route>
      </Route>
      <Route path="Favorites" element={<Favourite />} />
    </Route>
  )
);

export default function App() {
  useEffect(() => {
    initLightboxJS("Insert your License Key here", "Insert plan type here");
  }, []);
  return (
    <div className="App">
      <RouterProvider router={router} fallbackElement={<LoadingPagination />} />
    </div>
  );
}
