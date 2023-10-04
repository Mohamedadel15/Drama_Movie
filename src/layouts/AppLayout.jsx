import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/sideNav/SideNav";
import Footer from "../components/footer/Footer";

export default function AppLayout() {
  return (
    <>
      <SideNav />
      <Outlet />
      <Footer />
    </>
  );
}
