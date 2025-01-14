import { useEffect } from "react";
import { Hero } from "./Hero";
import { HeroOld } from "./HeroOld";
import { Header } from "../../components/layouts/Header";
import { Welcome } from "./Welcome";


import { UpcomingEvents } from "./UpcomingEvents";
import { MapView } from "./MapView";

import { Footer } from "../../components/layouts/Footer";
import { TravelPackages } from "./TravelPackages";

export const Home = () => {
  // Scroll to the top when the component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="hero-section overflow-x-hidden">
        <HeroOld />
        {/* <Hero/> */}
      </div>
      <Welcome />
      <MapView />
      <TravelPackages />
    
     
      <UpcomingEvents />
     
      
      <Footer />
    </>
  );
};
