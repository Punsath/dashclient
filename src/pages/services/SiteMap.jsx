import { Footer } from "../../components/layouts/Footer";
import { Header } from "../../components/layouts/Header";
import { Description } from "./Description";
import { Hero } from "./Hero";
import { HistoricalBackground } from "./HistoricalBackground";

import React, { useEffect } from "react";

export const SiteMap = () => {

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []); 

  return (
    <>
      <Header />
      <Hero />
      <Description />
      {/* <TipsAndTricks /> */}
      <HistoricalBackground />
    
   
      {/* <SimilarAttractions /> */}
      <Footer />
    </>
  );
};
