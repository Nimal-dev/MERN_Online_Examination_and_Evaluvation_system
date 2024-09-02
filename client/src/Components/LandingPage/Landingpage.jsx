import React from "react";
import Header from "./Common/Header";
import MainBanner from "./LandingPageComponents/MainBanner";
import Services from "./LandingPageComponents/Services";
import Footer from "./Common/Footer";
import About from "./LandingPageComponents/About";

function Landingpage() {
  return (
    <>
   
      <Header />
      <MainBanner/>
      <About/>
      <Services/>
      <Footer/>
    </>
  );
}

export default Landingpage;
