"use client";
import React from "react";
import HomeComponent from "./LandingPage/DrawerAppBar";
import ProgramComponent from "./LandingPage/ProgramComponent";
import CommitmentSection from "./LandingPage/CommitmentSection";
import ChooseClassSection from "./LandingPage/ChooseClassSection";
import OurTrainersSection from "./LandingPage/OurTrainersSection";
import VisionSection from "./LandingPage/VisionSection";
import Footer from "./LandingPage/Footer";
import { useLocale, useTranslations } from "next-intl";

const page = () => {
  return (
    <div>
      <HomeComponent />
      <ProgramComponent />
      <CommitmentSection />
      <ChooseClassSection />
      <OurTrainersSection />
      <VisionSection />
      <Footer />
    </div>
  );
};

export default page;
